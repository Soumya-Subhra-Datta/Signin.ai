import { useMemo } from "react";

export type PageFont = {
  value: string;
  label: string;
  stack: string;
  /** Google Fonts css2 family spec. Absent for a face the page already carries. */
  google?: string;
};

/** Resolved, clamped values plus the colour helpers a recipe writes its CSS with. */
export type PageTypography = {
  heading: string;
  body: string;
  headingWeight: string;
  bodyWeight: string;
  primary: string;
  headingSize: number;
  bodySize: number;
  headingLetterSpacing: number;
  /**
   * Move one of the page's authored colours by the same shift the primary
   * took. Keeps a palette's internal relationships — a lighter tint stays
   * the lighter tint — instead of flattening every accent onto one hex.
   */
  retone: (hex: string) => string;
  /** The same shift applied to an authored `rgb()` / `rgba()` string, alpha kept. */
  retoneRgba: (color: string) => string;
  /**
   * A filter that carries an authored colour onto the primary, for the parts
   * of a page painted in WebGL where no CSS variable can reach.
   * Returns "none" while the primary is untouched.
   */
  filter: (baseHex?: string) => string;
};

export type PageInlineStyleOverride = {
  selector: string;
  styles: Readonly<Record<string, string>>;
};

export type PageTypographyRecipe = {
  headingFonts: readonly PageFont[];
  bodyFonts: readonly PageFont[];
  /** Offered weights, in slider order, and the one the page is authored at. */
  headingWeights: readonly string[];
  headingWeight: string;
  bodyWeights: readonly string[];
  bodyWeight: string;
  /** The page's authored primary, and the base every retone and filter is measured from. */
  primaryColor: `#${string}`;
  /** [min, default, max] */
  headingSize: readonly [number, number, number];
  bodySize: readonly [number, number, number];
  headingLetterSpacing: readonly [number, number, number];
  css: (type: PageTypography) => string;
  inlineStyles?: (type: PageTypography) => readonly PageInlineStyleOverride[];
};

export type LandingPageCustomization = {
  css: string;
  /** Set only when a chosen face has to be fetched. */
  fontHref?: string;
  /**
   * Used only by preserved pages whose authored typography lives in element
   * style attributes. Appended CSS cannot outrank those attributes without
   * priority overrides, so these values are applied to the loaded DOM while the
   * packaged HTML file itself remains byte-exact.
   */
  inlineStyles?: readonly PageInlineStyleOverride[];
};

export type PageTypographyProps = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

/**
 * Opaque srcDoc frames cannot expose contentDocument to React. This bridge is
 * appended only to the derived srcDoc string and applies the same live style
 * contract from inside the sandbox, leaving the packaged HTML file untouched.
 */
export const PAGE_CUSTOMIZATION_BRIDGE =
  '<script>\nwindow.addEventListener("message", function (event) {\n  var detail = event.data;\n  if (!detail || detail.type !== "threeui-page-customization") return;\n  var head = document.head;\n  if (!head) return;\n\n  var link = document.getElementById("threeui-page-typography-fonts");\n  if (detail.fontHref) {\n    if (!link) {\n      link = document.createElement("link");\n      link.id = "threeui-page-typography-fonts";\n      link.rel = "stylesheet";\n      head.appendChild(link);\n    }\n    if (link.getAttribute("href") !== detail.fontHref) link.href = detail.fontHref;\n  } else if (link) {\n    link.remove();\n  }\n\n  var style = document.getElementById("threeui-page-typography");\n  if (!detail.css) {\n    if (style) style.remove();\n    return;\n  }\n  if (!style) {\n    style = document.createElement("style");\n    style.id = "threeui-page-typography";\n  }\n  if (style.textContent !== detail.css) style.textContent = detail.css;\n  head.appendChild(style);\n});\n</script>';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function normalizeHex(value: string, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const match = value.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return fallback;
  const inner = match[1].toLowerCase();
  return `#${inner.length === 3 ? inner.replace(/./g, (c) => c + c) : inner}`;
}

type HSL = { h: number; s: number; l: number };

function hexToHsl(hex: string): HSL {
  const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const delta = max - min;
  if (delta === 0) return { h: 0, s: 0, l };
  const s = delta / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  return { h: (h * 60 + 360) % 360, s, l };
}

function hslToHex({ h, s, l }: HSL): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return `#${[r, g, b]
    .map((v) => Math.round(clamp(v + m) * 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function colorShift(from: string, to: string): { hue: number; saturation: number; lightness: number } {
  const a = hexToHsl(from);
  const b = hexToHsl(to);
  return {
    hue: b.h - a.h,
    saturation: a.s > 0.01 ? Math.min(3, b.s / a.s) : 1,
    lightness: a.l > 0.01 ? Math.min(3, b.l / a.l) : 1,
  };
}

function findFont(value: string | undefined, fonts: readonly PageFont[]): PageFont {
  return fonts.find((f) => f.value === value) ?? fonts[0];
}

function keepOrFallback(value: string | undefined, allowed: readonly string[], fallback: string): string {
  return value !== undefined && allowed.includes(value) ? value : fallback;
}

function clampNumber(value: number | undefined, [min, fallback, max]: readonly [number, number, number]): number {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value as number)) : fallback;
}

function googleFontsHref(fonts: readonly PageFont[]): string | undefined {
  const families = [...new Set(fonts.map((f) => f.google).filter((g): g is string => !!g))];
  if (families.length === 0) return undefined;
  return `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`;
}

/**
 * Peel the eight control props off a page's props so the rest can go straight
 * to the frame. Keeps each page component down to the two lines that differ.
 */
export function splitTypographyProps<T extends PageTypographyProps>(props: T): readonly [PageTypographyProps, Omit<T, keyof PageTypographyProps>] {
  const { headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing, ...rest } = props;
  return [{ headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing }, rest];
}

export function usePageTypography(recipe: PageTypographyRecipe, props: PageTypographyProps): LandingPageCustomization {
  const { headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing } = props;
  return useMemo(() => {
    const heading = findFont(headingFont, recipe.headingFonts);
    const body = findFont(bodyFont, recipe.bodyFonts);
    const primary = normalizeHex(primaryColor ?? recipe.primaryColor, recipe.primaryColor);
    const untouched = primary === recipe.primaryColor;
    const shift = colorShift(recipe.primaryColor, primary);

    const retone = (hex: string) => {
      if (untouched) return hex;
      const hsl = hexToHsl(normalizeHex(hex, hex));
      return hslToHex({
        h: (hsl.h + shift.hue + 360) % 360,
        s: clamp(hsl.s * shift.saturation),
        l: clamp(hsl.l * shift.lightness),
      });
    };

    const retoneRgba = (color: string) => {
      if (untouched) return color;
      const matched = color.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i);
      if (!matched) return color;
      const hex = `#${[matched[1], matched[2], matched[3]]
        .map((v) => Math.round(Number(v)).toString(16).padStart(2, "0"))
        .join("")}`;
      const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(retone(hex).slice(i, i + 2), 16));
      return matched[4] === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${matched[4]})`;
    };

    const filter = (baseHex: string = recipe.primaryColor) => {
      if (untouched) return "none";
      const carried = colorShift(baseHex, retone(baseHex));
      return [
        `hue-rotate(${carried.hue.toFixed(2)}deg)`,
        `saturate(${Math.max(0, carried.saturation).toFixed(3)})`,
        `brightness(${Math.min(2, Math.max(0.2, carried.lightness)).toFixed(3)})`,
      ].join(" ");
    };

    const resolved: PageTypography = {
      heading: heading.stack,
      body: body.stack,
      headingWeight: keepOrFallback(headingWeight, recipe.headingWeights, recipe.headingWeight),
      bodyWeight: keepOrFallback(bodyWeight, recipe.bodyWeights, recipe.bodyWeight),
      primary,
      headingSize: clampNumber(headingSize, recipe.headingSize),
      bodySize: clampNumber(bodySize, recipe.bodySize),
      headingLetterSpacing: clampNumber(headingLetterSpacing, recipe.headingLetterSpacing),
      retone,
      retoneRgba,
      filter,
    };

    return {
      css: recipe.css(resolved),
      fontHref: googleFontsHref([heading, body]),
      inlineStyles: recipe.inlineStyles?.(resolved),
    };
  }, [recipe, headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing]);
}

const TYPOGRAPHY_STYLE_ID = "threeui-page-typography";
const TYPOGRAPHY_FONTS_ID = "threeui-page-typography-fonts";

/**
 * Appended to the frame's own head rather than written into the document, so
 * the packaged file stays byte-exact. Re-appending on every update keeps the
 * sheet last in the head, which is what lets it win against the page's own
 * rules at equal specificity without a single !important.
 */
export function applyPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization): void {
  const document = frame?.contentDocument;
  if (!document?.head) return;

  const fontsElement = document.getElementById(TYPOGRAPHY_FONTS_ID);
  if (customization?.fontHref) {
    const link = (fontsElement ?? document.createElement("link")) as HTMLLinkElement;
    link.id = TYPOGRAPHY_FONTS_ID;
    link.rel = "stylesheet";
    if (link.getAttribute("href") !== customization.fontHref) link.href = customization.fontHref;
    if (!fontsElement) document.head.append(link);
  } else {
    fontsElement?.remove();
  }

  if (!customization?.css) {
    document.getElementById(TYPOGRAPHY_STYLE_ID)?.remove();
    return;
  }

  const styleElement = document.getElementById(TYPOGRAPHY_STYLE_ID) ?? document.createElement("style");
  styleElement.id = TYPOGRAPHY_STYLE_ID;
  if (styleElement.textContent !== customization.css) styleElement.textContent = customization.css;
  document.head.append(styleElement);

  for (const override of customization.inlineStyles ?? []) {
    for (const element of document.querySelectorAll(override.selector)) {
      for (const [property, value] of Object.entries(override.styles)) {
        (element as HTMLElement).style.setProperty(property, value);
      }
    }
  }
}

export function postPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization): void {
  applyPageCustomization(frame, customization);
}
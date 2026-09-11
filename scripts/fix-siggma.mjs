import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(here, "..", "public", "landing-pages", "siggma-ai.html");
let html = fs.readFileSync(target, "utf8");
html = html.replace(/^\uFEFF+/, "");

// True when the earlier passes already ran; those sections are then skipped
// so the script is idempotent (safe to run repeatedly).
const alreadyFixed = html.includes("const SIGGMA_LOG =") && html.includes("FOUNDED ....... 2024");

const art = (() => {
  const dot = ".";
  const hash = "#";
  const S = [".####", "#....", ".###.", "....#", "####."];
  const I = ["#####", "..#..", "..#..", "..#..", "#####"];
  const G = [".###.", "#....", "#.###", "#...#", ".###."];
  const M = ["#...#", "##.##", "#.#.#", "#...#", "#...#"];
  const A = [".##..", "#..#.", "#####", "#..#.", "#..#."];
  const glyphs = [S, I, G, G, M, A];
  const rows = [];
  for (let r = 0; r < 5; r++) {
    rows.push(glyphs.map((g) => g[r].replaceAll(dot, " ").replaceAll(hash, "█")).join(" "));
  }
  return rows;
})();

console.log("SIGGMA banner preview:");
for (const row of art) console.log(`  |${row}|`);

function replaceOnce(source, find, replace, label) {
  if (!source.includes(find)) {
    console.warn(`WARN: pattern missing for ${label}`);
    return source;
  }
  if (source.split(find).length - 1 !== 1) {
    console.warn(`WARN: pattern not unique for ${label} (${source.split(find).length - 1} hits)`);
  }
  return source.replace(find, replace);
}

// ── Meta description ─────────────────────────────────────────────
if (!alreadyFixed) {
  html = replaceOnce(
    html,
    'content="sublevel. is a digital studio & brand workshop building the stuff people remember. A single-file Three.js experience."',
    'content="siggma.ai is an AI-powered sales support and sales intelligence platform. A single-file Three.js experience."',
    "meta description",
  );

  // ── Nav brand aria-label ───────────────────────────────────────
  html = replaceOnce(html, 'aria-label="sublevel.studio"', 'aria-label="siggma.ai"', "nav aria-label");

  // ── Footer copy (handles both literal © and &copy; encodings) ───
  const footerOld = /(&copy;|\u00a9) sublevel\.studio LLC 2026 all rights reserved/;
  if (footerOld.test(html)) {
    html = html.replace(footerOld, "&copy; siggma.ai 2024 &mdash; AI-powered sales intelligence");
  } else {
    console.warn("WARN: footer copy pattern missing");
  }
}

// ── Regenerate the machine index <pre> block ─────────────────────
if (!alreadyFixed) {
const preStartTag = '<pre class="sr-only">';
const preOpen = html.indexOf(preStartTag);
const preClose = html.indexOf("</pre>", preOpen);
if (preOpen === -1 || preClose === -1) throw new Error("pre block not found");
let preInner = html.slice(preOpen + preStartTag.length, preClose);

// banner art (the first five text rows)
preInner = preInner.replace(/^[^\n]*?( ████[^\n]*?)(\n[^\n]*?\n[^\n]*?\n[^\n]*?\n[^\n]*?\n)/s, (_m, first, rest) => art[0] + "\n" + art.slice(1).join("\n") + rest);
if (!preInner.startsWith(art[0])) {
  // fallback: strip the original ASCII block, which is exactly the first 6 lines after the open tag
  const lines = preInner.split("\n");
  preInner = art.concat(lines.slice(6)).join("\n");
}

preInner = replaceOnce(preInner, "FOUNDED ....... 2021", "FOUNDED ....... 2024", "pre FOUNDED");
preInner = replaceOnce(preInner, "LOCATION ...... PORTO, PORTUGAL (PT)", "LOCATION ...... WORLDWIDE", "pre LOCATION");
preInner = replaceOnce(
  preInner,
  "SERVICES ...... WEBSITE DESIGN AND ENGINEERING, VISUAL BRAND IDENTITY, REAL-TIME 3D EXPERIENCES, MARKETING EXECUTION, PRODUCT ENGINEERING",
  "SERVICES ...... SALES FORECASTING, OPPORTUNITY INTELLIGENCE, CUSTOMER INTELLIGENCE, AI SALES ASSISTANT, PIPELINE INTELLIGENCE, REVENUE ANALYTICS",
  "pre SERVICES",
);
preInner = replaceOnce(
  preInner,
  "CLIENTS ....... NORTHWIND LABS, HALIDE, QUILLWORKS, LUMENARY, KESTREL, VANTAGEFIELD, COBALTINE, MOONRAKE, HARBORLIGHT",
  "CLIENTS ....... B2B SALES TEAMS, SAAS COMPANIES, E-COMMERCE, FINANCIAL SERVICES, RETAIL, MANUFACTURING, TECHNOLOGY COMPANIES",
  "pre CLIENTS",
);
preInner = replaceOnce(
  preInner,
  "KNOWS_ABOUT ... WEB DESIGN, BRAND IDENTITY, WEBGL, THREE.JS, MOTION, TYPEFACE DESIGN, GROWTH MARKETING",
  "KNOWS_ABOUT ... SALES INTELLIGENCE, PREDICTIVE ANALYTICS, CUSTOMER BEHAVIOR, PIPELINE MANAGEMENT, REVENUE FORECASTING, AI/ML",
  "pre KNOWS_ABOUT",
);

// The four mixed capability paragraphs produced by partial regex matches
preInner = replaceOnce(
  preInner,
  "PREDICT FUTURE SALES USING HISTORICAL DATA, TRENDS, SEASONALITY, AND EARN ATTENTION AND TURN IT INTO ACTION.",
  "PREDICT FUTURE SALES USING HISTORICAL DATA, TRENDS, SEASONALITY, AND AI-POWERED ANALYSIS TO GUIDE REVENUE PLANNING.",
  "pre cap 1",
);
preInner = replaceOnce(
  preInner,
  "IDENTIFY AND PRIORITIZE HIGH-VALUE OPPORTUNITIES WITH STRONGER LEADERS, WE BUILD SYSTEMS THAT SCALE WITHOUT GOING STALE.",
  "IDENTIFY AND PRIORITIZE HIGH-VALUE OPPORTUNITIES WITH STRONGER CONVERSION POTENTIAL USING AI-DRIVEN SCORING.",
  "pre cap 2",
);
preInner = replaceOnce(
  preInner,
  "UNDERSTAND CUSTOMER BEHAVIOR, PURCHASING PATTERNS, AND ENGAGEMENT REMEMBER LONG AFTER THE DOORS CLOSE.",
  "UNDERSTAND CUSTOMER BEHAVIOR, PURCHASING PATTERNS, AND ENGAGEMENT ACROSS YOUR ENTIRE CUSTOMER BASE.",
  "pre cap 3",
);
preInner = replaceOnce(
  preInner,
  "ANALYZE THE SALES PIPELINE AND HIGHLIGHT BOTTLENECKS, STALLED DEALS, AND ASSETS THAT DRIVE AWARENESS, DEMAND AND CONVERSION.",
  "ANALYZE THE SALES PIPELINE AND HIGHLIGHT BOTTLENECKS, STALLED DEALS, AND POTENTIAL REVENUE OPPORTUNITIES.",
  "pre cap 4",
);

// Section header labels (keep the original dash runs)
preInner = preInner.replace(/── SELECTED_WORK ─+/, (m) => m.replace("SELECTED_WORK", "AI CAPABILITIES"));
preInner = preInner.replace(/── LAB ─+/, (m) => m.replace("LAB", "DEMO"));
preInner = preInner.replace(/── OPEN_POSITIONS ─+/, (m) => m.replace("OPEN_POSITIONS", "TEAM"));
preInner = replaceOnce(preInner, "- SBLVL SHOT — DRAG-TO-THROW BASKETBALL ON THE LOBBY HOOP (CLICK THE BACKBOARD).", "- SIGGMA SHOT — DRAG-TO-THROW BASKETBALL ON THE LOBBY HOOP (CLICK THE BACKBOARD).", "pre SBLVL SHOT");
preInner = replaceOnce(preInner, "GENERAL ....... hello@siggma.ai", "GENERAL ....... HELLO@SIGGMA.AI", "pre GENERAL");
preInner = replaceOnce(preInner, "NEW BUSINESS .. SALES@SUBLEVEL.STUDIO", "NEW BUSINESS .. SALES@SIGGMA.AI", "pre NEW BUSINESS");

html = html.slice(0, preOpen + preStartTag.length) + preInner + html.slice(preClose);

// ── Rename any remaining SUBLEVEL_LOG identifiers ────────────────
html = html.replaceAll("SUBLEVEL_LOG", "SIGGMA_LOG");
}

// ── Rebrand leftover project lines in the machine index <pre> ────
function matchBracketEnd(doc, from) {
  // doc[from] must be '['. Returns index just past the matching ']' or -1.
  let depth = 0;
  for (let i = from; i < doc.length; i++) {
    const c = doc[i];
    if (c === '"') { i = doc.indexOf('"', i + 1); if (i === -1) return -1; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) return i + 1; }
  }
  return -1;
}
function matchParenEnd(doc, from) {
  // doc[from] must be '('. Returns index just past the matching ')' or -1.
  let depth = 0;
  for (let i = from; i < doc.length; i++) {
    const c = doc[i];
    if (c === '"') { i = doc.indexOf('"', i + 1); if (i === -1) return -1; continue; }
    if (c === "'") { i = doc.indexOf("'", i + 1); if (i === -1) return -1; continue; }
    if (c === '(') depth++;
    else if (c === ')') { depth--; if (depth === 0) return i + 1; }
  }
  return -1;
}
function declarationEnd(doc, arrStart) {
  const open = arrStart + "const SIGGMA_LOG = ".length;
  if (doc[open] !== '[') return arrStart + "const SIGGMA_LOG = []".length;
  const arrEnd = matchBracketEnd(doc, open);
  if (arrEnd === -1) return -1;
  let i = arrEnd;
  if (doc.startsWith(".map(", i)) {
    const parenEnd = matchParenEnd(doc, i + ".map(".length - 1);
    if (parenEnd === -1) return -1;
    i = parenEnd;
    if (doc[i] === ';') i += 1;
  } else if (doc[i] === ';') {
    i += 1;
  }
  return i;
}
function rebuildTerminalArray(doc, preText) {
  const arrStart = doc.indexOf("const SIGGMA_LOG = [");
  if (arrStart === -1) {
    console.warn("WARN: SIGGMA_LOG array not found; skipping terminal rebuild");
    return doc;
  }
  const declEnd = declarationEnd(doc, arrStart);
  if (declEnd === -1) {
    console.warn("WARN: SIGGMA_LOG declaration unterminated; skipping terminal rebuild");
    return doc;
  }
  function wrapTo(line, width) {
    if (line.length <= width) return [line];
    const words = line.split(" ");
    const segments = [];
    let cur = "";
    for (const word of words) {
      if ((cur.length > 0 ? cur.length + 1 : 0) + word.length > width) {
        segments.push(cur);
        cur = word;
      } else {
        cur = cur.length > 0 ? `${cur} ${word}` : word;
      }
    }
    if (cur.length > 0) segments.push(cur);
    return segments.map((seg, i) => (i === 0 ? seg : `  ${seg}`));
  }
  const indexLines = preText.split("\n");
  const terminalLines = [];
  for (let i = 0; i < indexLines.length; i++) {
    const line = indexLines[i];
    if (i < 5 && line === art[i]) {
      terminalLines.push([line, "p"]);
      continue;
    }
    let role = "p";
    if (/^\* /.test(line)) role = "h";
    else if (/^── /.test(line)) role = "d";
    else if (/^# /.test(line)) role = "d";
    else if (/^\/AI\//.test(line)) role = "a";
    for (const seg of wrapTo(line, 55)) {
      terminalLines.push([seg, role]);
    }
  }
  const arraySource = `const SIGGMA_LOG = ${JSON.stringify(terminalLines)}.map(([text, role]) => text === '' ? [] : [seg(text, role)]);`;
  return doc.slice(0, arrStart) + arraySource + doc.slice(declEnd);
}

const preTag = '<pre class="sr-only">';
const pOpen = html.indexOf(preTag);
if (pOpen !== -1) {
  const pClose = html.indexOf("</pre>", pOpen);
  if (pClose !== -1) {
    let preInner = html.slice(pOpen + preTag.length, pClose);
    const projLines = [
      [
        /- HALIDE LAUNCH [\u2010-\u2015-] A REAL-TIME SUMMIT SITE WITH LIVE SCHEDULES, SPEAKER REVEALS AND A TICKET DROP BUILT FOR LAUNCH-DAY TRAFFIC\./,
        "- SALES FORECASTING — PREDICT FUTURE SALES USING HISTORICAL DATA, TRENDS, SEASONALITY, AND AI-POWERED ANALYSIS.",
      ],
      [
        /- LUMENARY [\u2010-\u2015-] A STORY-DRIVEN LAUNCH SITE FOR A FIRST HARDWARE RELEASE THAT SOLD THROUGH IN A WEEKEND\./,
        "- OPPORTUNITY INTELLIGENCE — IDENTIFY AND PRIORITIZE HIGH-VALUE OPPORTUNITIES WITH STRONGER CONVERSION POTENTIAL.",
      ],
      [
        /- KESTREL STUDIOS [\u2010-\u2015-] A SEASONAL LOOKBOOK TURNED INTO A BROWSABLE, SHAREABLE WORLD\./,
        "- CUSTOMER INTELLIGENCE — UNDERSTAND CUSTOMER BEHAVIOR, PURCHASING PATTERNS, AND ENGAGEMENT SIGNALS.",
      ],
      [
        /- SHOP MOONRAKE [\u2010-\u2015-] A CREATOR STOREFRONT THAT FEELS LIKE THE VIDEOS: FAST, LOUD, IMPOSSIBLE TO SCROLL PAST\./,
        "- PIPELINE INTELLIGENCE — ANALYZE THE SALES PIPELINE AND HIGHLIGHT BOTTLENECKS, STALLED DEALS, AND RISKS.",
      ],
    ];
    for (const [re, rep] of projLines) {
      if (re.test(preInner)) preInner = preInner.replace(re, rep);
    }
    html = html.slice(0, pOpen + preTag.length) + preInner + html.slice(pClose);
    html = rebuildTerminalArray(html, preInner);
  }
}

// ── Rebrand the PORTFOLIO canvas reel ────────────────────────────
const newPortfolio = `const PORTFOLIO = [
  { title: 'Sales Forecasting', kind: 'Forecasting · AI', desc: 'Predict revenue with confidence.', draw(g, w, h, t) {
    g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#ff9d2e'; g.fillRect(0, 0, w, 3);
    g.fillStyle = '#e6e6e6'; g.font = '700 56px "Geist"'; g.textBaseline = 'top'; g.textAlign = 'left';
    g.fillText('SALES', 24, 120); g.fillText('FORECASTING', 24, 178);
    g.fillStyle = '#9a9a9a'; g.font = '600 20px "Geist"'; g.fillText('Predict revenue with confidence.', 24, 264);
    g.font = '600 13px "Geist Mono"';
    ['HISTORICAL DATA', 'AI MODELS', 'SEASONALITY', 'TREND DETECTION'].forEach((s, i) => g.fillText(s, 24, 326 + i * 26));
    g.fillStyle = '#1c1c1c'; g.fillRect(24, h - 60, w - 48, 34);
    g.fillStyle = '#e6e6e6'; g.font = '600 12px "Geist Mono"'; g.fillText('SIGGMA.AI // SALES', 40, h - 46);
  } },
  { title: 'Opportunity Intelligence', kind: 'Scoring · AI', desc: 'Score and prioritize deals.', draw(g, w, h, t) {
    g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#7a4bff'; g.fillRect(0, 0, w, 3);
    g.fillStyle = '#e6e6e6'; g.font = '700 56px "Geist"'; g.textBaseline = 'top'; g.textAlign = 'left';
    g.fillText('OPPORTUNITY', 24, 120); g.fillText('INTELLIGENCE', 24, 178);
    g.fillStyle = '#9a9a9a'; g.font = '600 20px "Geist"'; g.fillText('Score and prioritize deals.', 24, 264);
    g.font = '600 13px "Geist Mono"';
    ['AI SCORING', 'PRIORITIZATION', 'CONVERSION ODDS'].forEach((s, i) => g.fillText(s, 24, 326 + i * 26));
    g.fillStyle = '#1c1c1c'; g.fillRect(24, h - 60, w - 48, 34);
    g.fillStyle = '#e6e6e6'; g.font = '600 12px "Geist Mono"'; g.fillText('SIGGMA.AI // PIPELINE', 40, h - 46);
  } },
  { title: 'Customer Intelligence', kind: 'Behavior · Engagement', desc: 'Know every customer.', draw(g, w, h, t) {
    g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#2fd46b'; g.fillRect(0, 0, w, 3);
    g.fillStyle = '#e6e6e6'; g.font = '700 56px "Geist"'; g.textBaseline = 'top'; g.textAlign = 'left';
    g.fillText('CUSTOMER', 24, 120); g.fillText('INTELLIGENCE', 24, 178);
    g.fillStyle = '#9a9a9a'; g.font = '600 20px "Geist"'; g.fillText('Know every customer.', 24, 264);
    g.font = '600 13px "Geist Mono"';
    ['BEHAVIOR', 'SEGMENTS', 'ENGAGEMENT', 'PATTERNS'].forEach((s, i) => g.fillText(s, 24, 326 + i * 26));
    g.fillStyle = '#1c1c1c'; g.fillRect(24, h - 60, w - 48, 34);
    g.fillStyle = '#e6e6e6'; g.font = '600 12px "Geist Mono"'; g.fillText('SIGGMA.AI // CUSTOMERS', 40, h - 46);
  } },
  { title: 'Pipeline Intelligence', kind: 'Deals · Risk', desc: 'Spot risk before it stalls.', draw(g, w, h, t) {
    g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#ff4d00'; g.fillRect(0, 0, w, 3);
    g.fillStyle = '#e6e6e6'; g.font = '700 56px "Geist"'; g.textBaseline = 'top'; g.textAlign = 'left';
    g.fillText('PIPELINE', 24, 120); g.fillText('INTELLIGENCE', 24, 178);
    g.fillStyle = '#9a9a9a'; g.font = '600 20px "Geist"'; g.fillText('Spot risk before it stalls.', 24, 264);
    g.font = '600 13px "Geist Mono"';
    ['BOTTLENECKS', 'DEAL RISK', 'REVENUE'].forEach((s, i) => g.fillText(s, 24, 326 + i * 26));
    g.fillStyle = '#1c1c1c'; g.fillRect(24, h - 60, w - 48, 34);
    g.fillStyle = '#e6e6e6'; g.font = '600 12px "Geist Mono"'; g.fillText('SIGGMA.AI // PIPELINE', 40, h - 46);
  } },
  { title: 'Revenue Analytics', kind: 'Data · Metrics', desc: 'Metrics that matter.', draw(g, w, h, t) {
    g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#35b6ff'; g.fillRect(0, 0, w, 3);
    g.fillStyle = '#e6e6e6'; g.font = '700 56px "Geist"'; g.textBaseline = 'top'; g.textAlign = 'left';
    g.fillText('REVENUE', 24, 120); g.fillText('ANALYTICS', 24, 178);
    g.fillStyle = '#9a9a9a'; g.font = '600 20px "Geist"'; g.fillText('Metrics that matter.', 24, 264);
    g.font = '600 13px "Geist Mono"';
    ['FORECASTS', 'TRENDS', 'INSIGHTS'].forEach((s, i) => g.fillText(s, 24, 326 + i * 26));
    g.fillStyle = '#1c1c1c'; g.fillRect(24, h - 60, w - 48, 34);
    g.fillStyle = '#e6e6e6'; g.font = '600 12px "Geist Mono"'; g.fillText('SIGGMA.AI // REVENUE', 40, h - 46);
  } },
  { title: 'Performance Intelligence', kind: 'Teams · Coaching', desc: 'Coaching for every rep.', draw(g, w, h, t) {
    g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#ff5ca8'; g.fillRect(0, 0, w, 3);
    g.fillStyle = '#e6e6e6'; g.font = '700 56px "Geist"'; g.textBaseline = 'top'; g.textAlign = 'left';
    g.fillText('PERFORMANCE', 24, 120); g.fillText('INTELLIGENCE', 24, 178);
    g.fillStyle = '#9a9a9a'; g.font = '600 20px "Geist"'; g.fillText('Coaching for every rep.', 24, 264);
    g.font = '600 13px "Geist Mono"';
    ['TEAMS', 'COVERAGE', 'TRENDS'].forEach((s, i) => g.fillText(s, 24, 326 + i * 26));
    g.fillStyle = '#1c1c1c'; g.fillRect(24, h - 60, w - 48, 34);
    g.fillStyle = '#e6e6e6'; g.font = '600 12px "Geist Mono"'; g.fillText('SIGGMA.AI // TEAMS', 40, h - 46);
  } },
];`;
const portfolioStart = html.indexOf("const PORTFOLIO = [");
if (portfolioStart !== -1) {
  // The original array's draw() bodies contain inner "];" tokens, so anchor the
  // end of the region on the section comment that immediately follows it.
  const nextSection = html.indexOf("/* ---------- neon sign", portfolioStart);
  const portfolioEnd = nextSection !== -1 ? nextSection : html.indexOf("];", portfolioStart);
  if (portfolioEnd !== -1) {
    html = html.slice(0, portfolioStart) + newPortfolio + html.slice(portfolioEnd);
  } else {
    console.warn("WARN: PORTFOLIO terminator not found");
  }
}

// ── Fix the featured section intro paragraph ─────────────────────
html = html.replace(
  /Eight selected builds from the last eighteen months [\u2010-\u2015-] brand systems, product launches and a few experiments that got out of hand\./,
  "Eight core capabilities that transform how sales teams understand their customers, forecast revenue, and make better decisions.",
);
if (!html.includes("Eight core capabilities")) console.warn("WARN: featured intro not fixed");

// ── Fix the eight featured masonry cards ─────────────────────────
const CARD_CONTENT = {
  "Halide Launch": {
    label: "Sales Forecasting",
    cats: "Forecasting · AI · Analytics",
    desc: "Predict future sales using historical data, trends, seasonality, and AI-powered analysis to guide revenue planning.",
  },
  "Northwind Labs": {
    label: "Opportunity Intelligence",
    cats: "Prioritization · AI · Conversion",
    desc: "Identify and prioritize opportunities with stronger conversion potential using AI-driven scoring.",
  },
  "Lumenary": {
    label: "Customer Intelligence",
    cats: "Behavior · Engagement · Analysis",
    desc: "Understand customer behavior, purchasing patterns, and engagement signals across your entire customer base.",
  },
  "Quillworks": {
    label: "AI Sales Assistant",
    cats: "Insights · Recommendations · AI",
    desc: "Provide sales teams with contextual answers, insights, recommendations, and deal summaries on demand.",
  },
  "Kestrel Studios": {
    label: "Pipeline Intelligence",
    cats: "Deals · Risk · Revenue",
    desc: "Analyze the sales pipeline and highlight bottlenecks, stalled deals, and potential revenue opportunities.",
  },
  "Cobaltine": {
    label: "Revenue Analytics",
    cats: "Data · Metrics · Insights",
    desc: "Transform sales data into clear business insights and actionable revenue metrics for better planning.",
  },
  "Shop Moonrake": {
    label: "Performance Intelligence",
    cats: "Teams · Metrics · Coaching",
    desc: "Help sales managers understand team performance, identify coaching opportunities, and improve results.",
  },
  "Signalhaus": {
    label: "Decision Support",
    cats: "Strategy · Risk · Planning",
    desc: "Assist sales teams and managers in making data-backed decisions with confidence and clarity.",
  },
};

if (!html.includes('<h3 class="f-h3" data-ps>Halide Launch</h3>')) {
  // cards already rebranded on a previous run
} else {
for (const [oldTitle, content] of Object.entries(CARD_CONTENT)) {
  const titleTag = `<h3 class="f-h3" data-ps>${oldTitle}</h3>`;
  const at = html.indexOf(titleTag);
  if (at === -1) {
    console.warn(`WARN: card h3 not found: ${oldTitle}`);
    continue;
  }
  const blockStart = html.lastIndexOf('<article class="card">', at);
  const blockEnd = html.indexOf("</article>", at);
  if (blockStart === -1 || blockEnd === -1) {
    console.warn(`WARN: card bounds not found: ${oldTitle}`);
    continue;
  }
  let block = html.slice(blockStart, blockEnd);
  const catsOld = block.match(/<p class="cats" data-ps>[^<]*<\/p>/)?.[0];
  const descOld = block.match(/<p class="desc f-p" data-ps>[^<]*<\/p>/)?.[0];
  block = block.replace(/aria-label="[^"]*"/, `aria-label="${content.label}"`);
  if (catsOld) block = block.replace(catsOld, `<p class="cats" data-ps>${content.cats}</p>`);
  else console.warn(`WARN: cats not found in card ${oldTitle}`);
  block = block.replace(titleTag, `<h3 class="f-h3" data-ps>${content.label}</h3>`);
  if (descOld) block = block.replace(descOld, `<p class="desc f-p" data-ps>${content.desc}</p>`);
  else console.warn(`WARN: desc not found in card ${oldTitle}`);
  html = html.slice(0, blockStart) + block + html.slice(blockEnd);
}
}

html = html.replace(/\s+$/, "") + "\n";
fs.writeFileSync(target, html, "utf8");
console.log("Wrote", target, `(${Buffer.byteLength(html, "utf8")} bytes)`);

// ── Verification ─────────────────────────────────────────────────
const leftover = html.toLowerCase().match(/sublevel|sblvl/g);
if (leftover) {
  console.warn(`LEFTOVER SIGNS: ${JSON.stringify(leftover)}`);
  process.exitCode = 1;
} else {
  console.log("OK: no sublevel/sblvl text remains in siggma-ai.html");
}
for (const marker of [
  "siggma.ai is an AI-powered sales support",
  'aria-label="siggma.ai"',
  "AI-powered sales intelligence",
  "SIGGMA.AI :: MACHINE-READABLE INDEX",
  "FOUNDED ....... 2024",
  "LOCATION ...... WORLDWIDE",
  "const SIGGMA_LOG =",
  "SIGGMA DEFENDER",
  "SIGGMA SHOT",
  "── AI CAPABILITIES",
  "── DEMO ─",
  "── TEAM ─",
  "NEW BUSINESS .. SALES@SIGGMA.AI",
]) {
  if (!html.includes(marker)) console.warn(`MISSING MARKER: ${marker}`);
}
console.log("Done.");
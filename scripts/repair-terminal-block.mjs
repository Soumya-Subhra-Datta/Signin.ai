import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const CAN = "public/sublevel-studio.html";
const OUR = "public/landing-pages/signin-ai.html";

const canRaw = fs.readFileSync(CAN, "utf8").replace(/^\uFEFF+/, "");
const ourRaw = fs.readFileSync(OUR, "utf8").replace(/^\uFEFF+/, "");

const cl = canRaw.split("\n");
let lastOpen = -1;
for (let i = cl.length - 1; i >= 0; i--) if (/^\s*<script/.test(cl[i])) { lastOpen = i; break; }
let lastClose = -1;
for (let i = lastOpen; i < cl.length; i++) if (cl[i].includes("</script>")) { lastClose = i; break; }
if (lastOpen === -1 || lastClose === -1) throw new Error("could not locate canonical last script block");

const cont = cl.slice(lastOpen + 1, lastClose).join("\n");

// ---- transforms ---------------------------------------------------
let s = cont.replaceAll("SUBLEVEL_LOG", "signin_LOG");

function matchBracketEnd(str, from) {
  let depth = 0;
  for (let i = from; i < str.length; i++) {
    const c = str[i];
    if (c === '"') { i = str.indexOf('"', i + 1); if (i === -1) return -1; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) return i + 1; }
  }
  return -1;
}

// Rebuild the signin_LOG declaration exactly like the canonical one:
//   const signin_LOG = [ ...rows... ].map(([text, role]) => text === '' ? [] : [seg(text, role)]);
// using OUR (already-rebranded) terminal rows from the current file.
const ol = ourRaw.split("\n");
let arrLine = null;
for (const l of ol) if (/^\s*const signin_LOG = \[\[/.test(l)) { arrLine = l; break; }
if (!arrLine) throw new Error("our signin_LOG declaration line not found");
const openB = arrLine.indexOf("[");
const endB = matchBracketEnd(arrLine, openB);
if (endB === -1) throw new Error("our signin_LOG array is unterminated");
const arrJSON = arrLine.slice(openB, endB);
JSON.parse(arrJSON); // validate
const newDecl = "  const signin_LOG = " + arrJSON + ".map(([text, role]) => text === '' ? [] : [seg(text, role)]);";

s = s.replace(/^\s*const signin_LOG = \[.*$/m, () => newDecl);
s = s.replaceAll("hello@sublevel.studio", "hello@signin.ai");

// ---- branding sweep on rebuilt block ------------------------------
const brands = ["SUBLEVEL","SBLVL","sublevel","sublvl","Northwind","Halide","Lumenary","Kestrel","Cobaltine","Quillworks","Moonrake","Signalhaus","Vantagefield","Harborlight","Eight selected","Storefront"];
let leaked = 0;
for (const b of brands) {
  const c = (s.match(new RegExp(b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig")) || []).length;
  if (c) { leaked += c; console.log("LEAK", JSON.stringify(b), "x", c); }
}
if (leaked) throw new Error("branding leaked in rebuilt block");

// ---- splice (using OUR file's last block boundaries) --------------
let ourOpen = -1;
for (let i = ol.length - 1; i >= 0; i--) if (/^\s*<script/.test(ol[i])) { ourOpen = i; break; }
let ourClose = -1;
for (let i = ourOpen; i < ol.length; i++) if (ol[i].includes("</script>")) { ourClose = i; break; }
if (ourOpen === -1 || ourClose === -1) throw new Error("could not locate our last script block");
const newLines = ["<script>", ...s.split("\n"), "</script>"];
const rebuilt = [...ol.slice(0, ourOpen), ...newLines, ...ol.slice(ourClose + 1)];
const out = rebuilt.join("\n").replace(/\s+$/, "") + "\n";
fs.writeFileSync(OUR, out, "utf8");

// ---- syntax check rebuilt block ------------------------------------
const tmp = path.join(process.env.TEMP || ".", "opencode", "lastblock.mjs");
fs.writeFileSync(tmp, s, "utf8");
try {
  execFileSync("node", ["--check", tmp], { encoding: "utf8" });
  console.log("SYNTAX OK — rebuilt last script block");
} catch (e) {
  console.error("SYNTAX FAIL:\n" + e.stdout + e.stderr);
  process.exit(1);
}

// ---- whole-file side effects ----------------------------------------
const fin = fs.readFileSync(OUR, "utf8");
let totalLeak = 0;
for (const b of brands) {
  const c = (fin.match(new RegExp(b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig")) || []).length;
  if (c) { totalLeak += c; console.log("FILE LEAK", JSON.stringify(b), "x", c); }
}
const bytes = Buffer.byteLength(fin, "utf8");
console.log("rebuilt file lines:", fin.split("\n").length);
console.log("rebuilt file bytes:", bytes);
console.log(totalLeak ? `FILE LEAKS total: ${totalLeak}` : "FILE BRANDING SWEEP: 0");
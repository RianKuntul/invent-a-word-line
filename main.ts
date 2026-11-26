// Invent a Word We Need — make.fun
// Competition: u-deranalabs-invent-a-word-we-need-17a020e0
// Writes one invented English word with a one-line definition (at most
// 140 characters) to entry.txt.
//
// Run: MAKEFUN_OUTPUT_DIR=/output node main.ts
// (Node 22.18+ runs this TypeScript directly via type stripping.)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

// v2: a different coinage. v1's Afterbye named a social awkwardness; this
// one names a feeling everyone knows but no word covers — the guilty
// relief when a dreaded plan is called off. Cancelief (cancel + relief)
// is sayable at once, spells the way it sounds, and the definition lands
// in one reading.
const ENTRY =
  "Cancelief (n.) \u2014 the guilty relief when a plan you were dreading gets cancelled.";

function validateEntry(entry: string): void {
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(
      `Entry is ${entry.length} characters, outside the 1-${MAX_CHARS} range.`,
    );
  }
  if (entry.trim() !== entry) {
    throw new Error("Entry must not start or end with whitespace.");
  }
  if (/[\r\n]/.test(entry)) {
    throw new Error("Entry must be a single line with no newline.");
  }
  if (/\s{2,}/.test(entry)) {
    throw new Error("Entry must not contain repeated whitespace.");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateEntry(ENTRY);
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("Output file does not match the validated entry.");
}
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);

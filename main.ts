import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Winning roast (candidate #6, 24/25): charger cable that only works at one angle.
// REVISION (self-edit, run 2): "one angle" -> "one sacred angle". "Sacred" makes the
// angle feel ritualistic and untouchable, so the peace-treaty twist lands harder and
// the line reads with a funnier, more deliberate rhythm when spoken aloud.
const ENTRY =
  "My charger cable only works at one sacred angle, like it's negotiating a peace treaty with gravity.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  // Validate: 1-200 code points, single line, not whitespace-only, no control chars.
  const codePoints = [...ENTRY];
  if (codePoints.length < 1 || codePoints.length > 200) {
    throw new Error(`ENTRY must be 1-200 characters, got ${codePoints.length}`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("ENTRY must be a single line");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("ENTRY must not be whitespace-only");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(ENTRY)) {
    throw new Error("ENTRY must not contain control characters");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");

  // Read back and verify byte-identical before exit.
  const written = readFileSync(OUT_PATH);
  const expected = Buffer.from(ENTRY, "utf8");
  if (!written.equals(expected)) {
    throw new Error("Verification failed: /output/entry.txt is not byte-identical to ENTRY");
  }
}

main();

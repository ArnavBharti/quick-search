/* 
- This script assumes the presence of a file called bangs.ts in the data directory
- This script will create a new file called bangs_filtered.ts in the data directory
*/

import fs from "fs";
import path from "path";
import { bangs } from "../data/bangs.ts";

type Bang = {
  c?: string;
  d: string;
  r: number;
  s: string;
  sc?: string;
  t: string;
  u: string;
};
const filtered_bangs: Bang[] = [];

// The filter removes any bang with non-ASCII characters.
for (const bang of bangs) {
  let valid = true;
  for (const c of bang.t) {
    // String should not contain backslash because it is being used to include non-ASCII characters such as \u0432.
    if (c.charCodeAt(0) > 127 || c === "\\") {
      valid = false;
      break;
    }
  }
  if (valid) {
    for (const c of bang.s) {
      if (c.charCodeAt(0) > 127) {
        valid = false;
        break;
      }
    }
  }
  if (valid) {
    filtered_bangs.push(bang);
  }
}

// I have not formatted the output to improve parsing speed.
const outputContent = `export const bangs_filtered = ${JSON.stringify(
  filtered_bangs
)} as const;`;

const outputPath = path.join("data", "bangs_filtered.ts");
fs.writeFileSync(outputPath, outputContent);

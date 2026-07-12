import { rmSync } from "node:fs";

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function clearAstroCache() {
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      rmSync(".astro", { recursive: true, force: true });
      return;
    } catch (error) {
      if (error?.code !== "EPERM" || attempt === 8) {
        throw error;
      }

      sleep(250);
    }
  }
}

clearAstroCache();
process.argv = [process.argv[0], "astro", "build"];
import("./node_modules/astro/dist/cli/index.js")
  .then(({ cli }) => cli(process.argv))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { rmSync } from "node:fs";

rmSync(".astro", { recursive: true, force: true });
process.argv = [process.argv[0], "astro", "build"];
import("./node_modules/astro/dist/cli/index.js")
  .then(({ cli }) => cli(process.argv))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

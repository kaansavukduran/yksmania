import { cp, mkdir } from "node:fs/promises";
await mkdir("public/licenses", { recursive: true });
await cp(
  "node_modules/@fontsource/lexend/LICENSE",
  "public/licenses/Lexend-OFL.txt",
);

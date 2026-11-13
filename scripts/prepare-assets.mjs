import { cp, mkdir } from "node:fs/promises";
for (const directory of ["cmaps", "standard_fonts", "wasm"]) {
  await mkdir(`public/pdfjs/${directory}`, { recursive: true });
  await cp(
    `node_modules/pdfjs-dist/${directory}`,
    `public/pdfjs/${directory}`,
    { recursive: true },
  );
}
await mkdir("public/licenses", { recursive: true });
await cp(
  "node_modules/@fontsource/lexend/LICENSE",
  "public/licenses/Lexend-OFL.txt",
);
await cp("node_modules/pdfjs-dist/LICENSE", "public/licenses/PDFjs-Apache.txt");

// Lægger site/css/styles.css ind i <style data-kilde="css/styles.css"> på siderne, så CSS ikke blokerer visningen.
// Kør efter hver ændring i styles.css: node scripts/inline-css.mjs
// Bloggen henter stadig filen /css/styles.css?v=<n>. Hæv tallet i templates/blog-side.html, og byg bloggen igen.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROD = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIDER = ["index.html", "tak.html", "404.html", "privatlivspolitik.html", "vilkaar.html"];

// Enkel og sikker formindskelse: kommentarer ud, mellemrum samlet, ingen mellemrum om { } ; og ,
const css = readFileSync(join(ROD, "site", "css", "styles.css"), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{};,])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();

const MARK = /<style data-kilde="css\/styles\.css">[\s\S]*?<\/style>/;
for (const side of SIDER) {
  const fil = join(ROD, "site", side);
  const html = readFileSync(fil, "utf8");
  if (!MARK.test(html)) throw new Error(`${side}: mangler <style data-kilde="css/styles.css">`);
  const ny = html.replace(MARK, () => `<style data-kilde="css/styles.css">${css}</style>`);
  if (ny !== html) writeFileSync(fil, ny);
}
console.log(`CSS lagt ind på ${SIDER.length} sider (${css.length} tegn).`);

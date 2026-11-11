// Bygger bloggen: site/_blog/*.txt (skrevet i Markdown) bliver til færdige HTML-sider i site/blog/.
//
//   node scripts/byg-blog.mjs            bygger det, der skal online
//   node scripts/byg-blog.mjs --udkast   tager også udkast med, til at læse korrektur lokalt
//
// GitHub kører scriptet af sig selv, når en indlægsfil bliver pushet til main
// (.github/workflows/byg-blog.yml), og committer resultatet. Netlify bygger ikke selv.
// Indlæggene er .txt-filer i site/, fordi Studio kun må udgive filer i site/ og ikke .md-filer.
// Scriptet bruger kun Node selv og har ingen pakker, så der er intet at installere.
// Teknisk vejledning står i docs/blog.md.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROD = join(dirname(fileURLToPath(import.meta.url)), "..");
const KILDE = join(ROD, "site", "_blog");
const SITE = join(ROD, "site");
const UD = join(SITE, "blog");
const SKABELON = readFileSync(join(ROD, "templates", "blog-side.html"), "utf8");
const DOMAENE = "https://heyotto.dk";
const MED_UDKAST = process.argv.includes("--udkast");
const DELINGSBILLEDE = { src: "/assets/deling.png", maal: [1200, 630], alt: "Robotten Otto ved siden af overskriften: Slip for de marketingopgaver, I løser i hånden hver uge." };

const FORFATTERE = JSON.parse(readFileSync(join(KILDE, "forfattere.json"), "utf8"));
const TYPER = { guide: "Guide", anmeldelse: "Anmeldelse" };

const advarsler = [];

function fejl(fil, besked) {
  console.error(`\nFejl i ${fil}: ${besked}\n`);
  process.exit(1);
}

// ---------- Hjælpere ----------

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugify = (s) => s.toLowerCase()
  .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
  .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const datoTekst = (iso) => new Intl.DateTimeFormat("da-DK", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
  .format(new Date(iso + "T00:00:00Z"));

const rfc822 = (iso) => new Date(iso + "T08:00:00Z").toUTCString();

const jsonld = (data) => `  <script type="application/ld+json">\n${JSON.stringify(data, null, 2).replace(/</g, "\\u003c")}\n  </script>\n`;

// Læser bredde og højde direkte fra billedfilen (PNG, JPEG, WebP, GIF og SVG), så billederne
// får width og height og siden ikke hopper, mens de hentes.
function billedMaal(src, fil) {
  if (!src.startsWith("/")) return null;
  const sti = join(SITE, decodeURI(src));
  if (!existsSync(sti)) fejl(fil, `billedet ${src} findes ikke. Læg det i site${src}`);
  const b = readFileSync(sti);
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.toString("ascii", 0, 3) === "GIF") return [b.readUInt16LE(6), b.readUInt16LE(8)];
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const type = b.toString("ascii", 12, 16);
    if (type === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (type === "VP8L") { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; }
    if (type === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m === 0xff) { i++; continue; }
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  if (extname(sti).toLowerCase() === ".svg") {
    const svg = b.toString("utf8").match(/<svg[^>]*>/)?.[0] || "";
    const w = svg.match(/\swidth="([\d.]+)"/), h = svg.match(/\sheight="([\d.]+)"/);
    if (w && h) return [Math.round(+w[1]), Math.round(+h[1])];
    const vb = svg.match(/viewBox="[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/);
    if (vb) return [Math.round(+vb[1]), Math.round(+vb[2])];
  }
  advarsler.push(`${fil}: kunne ikke læse størrelsen på ${src}`);
  return null;
}

function billedTag(src, alt, fil, { forrest = false } = {}) {
  const maal = billedMaal(src, fil);
  const wh = maal ? ` width="${maal[0]}" height="${maal[1]}"` : "";
  const hent = forrest ? ` fetchpriority="high"` : ` loading="lazy"`;
  return `<img src="${esc(src)}" alt="${esc(alt)}"${wh}${hent} decoding="async">`;
}

// ---------- Hovedet øverst i hver fil ----------

function laesHoved(tekst, fil) {
  const m = tekst.replace(/^\uFEFF/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) fejl(fil, "filen skal starte med et hoved mellem to linjer med ---");
  const data = {};
  const udenCitat = (v) => v.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
  for (const linje of m[1].split(/\r?\n/)) {
    if (!linje.trim() || linje.trim().startsWith("#")) continue;
    const i = linje.indexOf(":");
    if (i < 0) fejl(fil, `linjen "${linje}" i hovedet mangler et kolon`);
    const noegle = linje.slice(0, i).trim();
    let v = linje.slice(i + 1).trim();
    if (v.startsWith("[") && v.endsWith("]")) v = v.slice(1, -1).split(",").map((s) => udenCitat(s.trim())).filter(Boolean);
    else if (v === "true" || v === "false") v = v === "true";
    else v = udenCitat(v);
    data[noegle] = v;
  }
  return { data, krop: m[2] };
}

// ---------- Markdown ----------
// Understøtter det, et blogindlæg bruger: ## og ### overskrifter, afsnit, **fed**, *kursiv*,
// [links](/adresse), `kode`, lister, citater (>), billeder på egen linje, kodeblokke (```) og ---.
// Linjer, der starter med <, sendes uændret videre som HTML.

function inline(s) {
  const gemt = [];
  const gem = (html) => { gemt.push(html); return `\u0000${gemt.length - 1}\u0000`; };
  s = s.replace(/`([^`]+)`/g, (_, kode) => gem(`<code>${esc(kode)}</code>`));
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, tekst, href) => gem(`<a href="${esc(href)}">${inline(tekst)}</a>`));
  s = esc(s);
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\w)/g, "$1<em>$2</em>");
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => gemt[+i]);
}

const celler = (linje) => linje.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
const erTabelSkille = (linje) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(linje || "") && linje.includes("-") && linje.includes("|");

// Bokse, der skrives som :::navn ... ::: i teksten.
const BOKSE = {
  metode: "Sådan har jeg testet",
  tip: "Godt at vide",
};

function markdown(md, fil, ctx = { h2: [], ids: new Set() }) {
  const linjer = md.replace(/\r\n?/g, "\n").split("\n");
  const ud = [];
  const brugteId = ctx.ids;
  let afsnit = [];
  let sidste = null; // det seneste afsnit, så "Tabel: titel" kan blive til tabellens titel
  const tomAfsnit = () => {
    if (!afsnit.length) return;
    const tekst = afsnit.join("\n");
    ud.push(tekst.trimStart().startsWith("<") ? tekst : `<p>${inline(tekst.replace(/\n/g, " "))}</p>`);
    sidste = { tekst, plads: ud.length - 1 };
    afsnit = [];
  };

  for (let i = 0; i < linjer.length; i++) {
    const linje = linjer[i];
    let m;

    if (!linje.trim()) { tomAfsnit(); continue; }

    if (linje.startsWith("```")) {
      tomAfsnit();
      const kode = [];
      while (++i < linjer.length && !linjer[i].startsWith("```")) kode.push(linjer[i]);
      ud.push(`<pre><code>${esc(kode.join("\n"))}</code></pre>`);
      continue;
    }

    if ((m = linje.match(/^(#{1,4})\s+(.+)$/))) {
      tomAfsnit();
      if (m[1].length === 1) fejl(fil, `"${linje}": brug ## til overskrifter i teksten. Titlen kommer fra hovedet.`);
      let id = slugify(m[2]) || "afsnit", n = 2;
      while (brugteId.has(id)) id = `${slugify(m[2])}-${n++}`;
      brugteId.add(id);
      const h = m[1].length;
      if (h === 2) ctx.h2.push({ id, html: inline(m[2]) });
      ud.push(`<h${h} id="${id}">${inline(m[2])}</h${h}>`);
      continue;
    }

    if ((m = linje.match(/^:::\s*(\w+)\s*$/))) {
      tomAfsnit();
      const navn = m[1];
      if (!BOKSE[navn]) fejl(fil, `boksen ":::${navn}" findes ikke. Brug ${Object.keys(BOKSE).map((k) => ":::" + k).join(" eller ")}. ":::kort" skal stå øverst.`);
      const indre = [];
      while (++i < linjer.length && !/^:::\s*$/.test(linjer[i])) indre.push(linjer[i]);
      if (i >= linjer.length) fejl(fil, `boksen ":::${navn}" mangler en afsluttende linje med :::`);
      ud.push(`<aside class="box box-${navn}"><p class="box-title">${BOKSE[navn]}</p>\n${markdown(indre.join("\n"), fil, { h2: [], ids: brugteId })}\n</aside>`);
      continue;
    }

    // Tabeller: en linje med | og en linje med |---| under. "Tabel: tekst" lige over bliver tabellens titel.
    if (linje.includes("|") && erTabelSkille(linjer[i + 1])) {
      let titel = "";
      tomAfsnit();
      if (sidste && sidste.plads === ud.length - 1 && /^Tabel:\s*/i.test(sidste.tekst)) {
        titel = sidste.tekst.replace(/^Tabel:\s*/i, "").replace(/\n/g, " ");
        ud.pop();
      }
      const hoved = celler(linje);
      const juster = celler(linjer[i + 1]).map((c) => (c.endsWith(":") ? (c.startsWith(":") ? "center" : "right") : ""));
      const stil = (k) => (juster[k] ? ` class="align-${juster[k]}"` : "");
      const raekker = [];
      i += 2;
      while (i < linjer.length && linjer[i].includes("|") && linjer[i].trim()) raekker.push(celler(linjer[i++]));
      i--;
      const etiket = titel ? esc(titel.replace(/[*`]/g, "")) : "Tabel";
      ud.push(`<div class="table-wrap" role="region" aria-label="${etiket}" tabindex="0">
<table>${titel ? `\n<caption>${inline(titel)}</caption>` : ""}
<thead><tr>${hoved.map((c, k) => (c ? `<th scope="col"${stil(k)}>${inline(c)}</th>` : `<td></td>`)).join("")}</tr></thead>
<tbody>
${raekker.map((r) => `<tr>${hoved.map((_, k) => (k === 0 ? `<th scope="row"${stil(k)}>${inline(r[k] || "")}</th>` : `<td${stil(k)}>${inline(r[k] || "")}</td>`)).join("")}</tr>`).join("\n")}
</tbody>
</table>
</div>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})\s*$/.test(linje)) { tomAfsnit(); ud.push("<hr>"); continue; }

    if ((m = linje.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)\s*$/))) {
      tomAfsnit();
      if (!m[1].trim()) fejl(fil, `billedet ${m[2]} mangler en alt-tekst: ![beskrivelse](${m[2]})`);
      const tekst = m[3] ? `<figcaption>${inline(m[3])}</figcaption>` : "";
      ud.push(`<figure>${billedTag(m[2], m[1], fil)}${tekst}</figure>`);
      continue;
    }

    if (linje.startsWith(">")) {
      tomAfsnit();
      const citat = [];
      while (i < linjer.length && linjer[i].startsWith(">")) citat.push(linjer[i++].replace(/^>\s?/, ""));
      i--;
      ud.push(`<blockquote>${markdown(citat.join("\n"), fil, { h2: [], ids: brugteId })}</blockquote>`);
      continue;
    }

    const liste = linje.match(/^\s{0,3}([-*]|\d+\.)\s+/);
    if (liste) {
      tomAfsnit();
      const tag = /\d/.test(liste[1]) ? "ol" : "ul";
      const punkter = [];
      while (i < linjer.length && linjer[i].trim()) {
        const p = linjer[i].match(/^\s{0,3}([-*]|\d+\.)\s+(.*)$/);
        if (p) punkter.push(p[2]);
        else punkter[punkter.length - 1] += " " + linjer[i].trim();
        i++;
      }
      i--;
      ud.push(`<${tag}>\n${punkter.map((p) => `  <li>${inline(p)}</li>`).join("\n")}\n</${tag}>`);
      continue;
    }

    afsnit.push(linje);
  }
  tomAfsnit();
  return ud.join("\n");
}

// ---------- Indlæggene ----------

function laesIndlaeg() {
  if (!existsSync(KILDE)) return [];
  const indlaeg = [];
  for (const navn of readdirSync(KILDE).filter((f) => f.endsWith(".txt") && !f.startsWith("_"))) {
    const fil = `site/_blog/${navn}`;
    const slug = navn.replace(/\.txt$/, "");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fejl(fil, "filnavnet må kun have små bogstaver a-z, tal og bindestreger, fx saadan-goer-i.txt");
    const { data, krop } = laesHoved(readFileSync(join(KILDE, navn), "utf8"), fil);
    for (const felt of ["titel", "beskrivelse", "dato"]) if (!data[felt]) fejl(fil, `hovedet mangler "${felt}"`);
    for (const felt of ["dato", "opdateret"]) {
      if (data[felt] && !/^\d{4}-\d{2}-\d{2}$/.test(data[felt])) fejl(fil, `"${felt}" skal skrives som år-måned-dag, fx 2026-11-11`);
    }
    if (data.billede && !data.billedtekst) fejl(fil, `"billede" skal have en "billedtekst", der beskriver billedet`);
    if (data.udkast && !MED_UDKAST) continue;

    const type = data.type || "guide";
    if (!TYPER[type]) fejl(fil, `"type" skal være ${Object.keys(TYPER).join(" eller ")}`);
    const forfatterNoegle = data.forfatter || "kasper";
    const forfatter = FORFATTERE[forfatterNoegle];
    if (!forfatter) fejl(fil, `forfatteren "${forfatterNoegle}" findes ikke i site/_blog/forfattere.json`);

    // Opsummeringen skal stå øverst i teksten som :::kort ... :::
    const kortMatch = krop.match(/^\s*:::\s*kort\s*\n([\s\S]*?)\n:::\s*(\n|$)/);
    if (!kortMatch) fejl(fil, `teksten skal starte med en opsummering:\n\n:::kort\n- Det vigtigste først\n:::`);
    const resten = krop.slice(kortMatch[0].length);
    if (type === "anmeldelse" && !/^:::\s*metode\s*$/m.test(resten)) fejl(fil, `en anmeldelse skal have en ":::metode"-boks, der fortæller, hvordan værktøjet er testet`);

    const tags = (Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : []).map((navn) => ({ navn, slug: slugify(navn) }));
    if (/[–—]/.test(krop + data.titel + data.beskrivelse)) advarsler.push(`${fil}: indeholder en tankestreg. Brug komma eller punktum.`);
    if (data.beskrivelse.length > 160) advarsler.push(`${fil}: beskrivelsen er ${data.beskrivelse.length} tegn. Google viser cirka 155.`);

    const ctx = { h2: [], ids: new Set(["kort-titel", "toc-titel", "forfatter", "forfatter-titel", "cta-titel"]) };
    const html = markdown(resten, fil, ctx);
    if (ctx.h2.length < 3) advarsler.push(`${fil}: har kun ${ctx.h2.length} overskrifter med ##. Indholdsfortegnelsen bliver tynd.`);
    if (!/\|\s*:?-{2,}/.test(resten)) advarsler.push(`${fil}: har ingen tabel. Retningslinjerne siger mindst én.`);

    const ord = krop.replace(/[#>*`\[\]()!_|:-]/g, " ").split(/\s+/).filter(Boolean).length;
    indlaeg.push({
      ...data,
      fil, slug, tags, type, forfatter,
      kort: markdown(kortMatch[1], fil, { h2: [], ids: new Set() }),
      toc: ctx.h2,
      ord,
      url: `${DOMAENE}/blog/${slug}`,
      sti: `/blog/${slug}`,
      udkast: Boolean(data.udkast),
      sidstRettet: data.opdateret || data.dato,
      minutter: Math.max(1, Math.round(ord / 200)),
      html,
    });
  }
  return indlaeg.sort((a, b) => b.dato.localeCompare(a.dato) || a.titel.localeCompare(b.titel, "da"));
}

// ---------- Sider ----------

function side({ titel, ogTitel = titel, beskrivelse, url, indhold, ogType = "website", billede, noindex = false, data }) {
  const og = billede || DELINGSBILLEDE;
  const felter = {
    titel: esc(titel),
    ogTitel: esc(ogTitel),
    beskrivelse: esc(beskrivelse),
    url: esc(url),
    ogType,
    ogBillede: esc(DOMAENE + og.src),
    ogBilledeAlt: esc(og.alt),
    ogBilledeMaal: og.maal ? `  <meta property="og:image:width" content="${og.maal[0]}">\n  <meta property="og:image:height" content="${og.maal[1]}">\n` : "",
    robots: noindex ? `  <meta name="robots" content="noindex, follow">\n` : "",
    jsonld: data ? jsonld(data) : "",
    indhold,
  };
  return SKABELON.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in felter)) throw new Error(`Skabelonen bruger {{${k}}}, som scriptet ikke kender`);
    return felter[k];
  });
}

const tagListe = (tags, aktiv) => tags.length
  ? `<ul class="tags" aria-label="Emner">${tags.map((t) => `<li><a class="tag" href="/blog/tag/${t.slug}"${t.slug === aktiv ? ` aria-current="page"` : ""}>${esc(t.navn)}</a></li>`).join("")}</ul>`
  : "";

const opdateretTekst = (p) => (p.opdateret && p.opdateret !== p.dato ? `, opdateret <time datetime="${p.opdateret}">${datoTekst(p.opdateret)}</time>` : "");

const meta = (p) => `<p class="post-meta">${TYPER[p.type]}, <time datetime="${p.dato}">${datoTekst(p.dato)}</time>${opdateretTekst(p)}, ${p.minutter} min. at læse</p>`;

const udgiver = { "@type": "Organization", name: "Hey Otto", url: `${DOMAENE}/`, logo: { "@type": "ImageObject", url: `${DOMAENE}/assets/favicon.svg` } };

const personData = (f) => ({
  "@type": "Person",
  name: f.navn,
  description: f.bio,
  image: f.billede ? DOMAENE + f.billede : undefined,
  url: f.linkedin || `${DOMAENE}/`,
  sameAs: f.linkedin ? [f.linkedin] : undefined,
  worksFor: udgiver,
});

function indlaegSide(p) {
  const billede = p.billede ? { src: p.billede, alt: p.billedtekst, maal: billedMaal(p.billede, p.fil) } : null;
  const f = p.forfatter;
  const foto = (str) => (f.billede ? `<img class="avatar-img" src="${esc(f.billede)}" alt="" width="${str}" height="${str}" loading="lazy" decoding="async">` : "");
  const indhold = `    <article class="section post">
      <p class="post-back"><a href="/blog/">Alle indlæg</a></p>
      <header class="post-head">
        ${p.udkast ? `<p class="udkast">Udkast, ikke online</p>\n        ` : ""}<p class="post-type">${TYPER[p.type]}</p>
        <h1>${inline(p.titel)}</h1>
        <div class="byline">
          ${foto(44)}
          <p>Af <a href="#forfatter" rel="author">${esc(f.navn)}</a><br><span class="post-meta"><time datetime="${p.dato}">${datoTekst(p.dato)}</time>${opdateretTekst(p)}, ${p.minutter} min. at læse</span></p>
        </div>
        ${tagListe(p.tags)}
      </header>
      <section class="box box-kort" aria-labelledby="kort-titel">
        <h2 id="kort-titel" class="box-title">Kort fortalt</h2>
${p.kort}
      </section>
      <nav class="toc" aria-labelledby="toc-titel">
        <h2 id="toc-titel" class="box-title">Indhold</h2>
        <ol>
${p.toc.map((h) => `          <li><a href="#${h.id}">${h.html}</a></li>`).join("\n")}
        </ol>
      </nav>
${billede ? `      <figure class="post-figure">${billedTag(billede.src, billede.alt, p.fil)}</figure>\n` : ""}      <div class="prose">
${p.html}
      </div>
      <aside class="author" id="forfatter" aria-labelledby="forfatter-titel">
        ${foto(72)}
        <div>
          <p class="author-label">Skrevet af</p>
          <h2 id="forfatter-titel">${esc(f.navn)}</h2>
          <p class="author-role">${esc(f.rolle)}</p>
          <p>${esc(f.bio)}</p>
          ${f.linkedin ? `<p><a href="${esc(f.linkedin)}" target="_blank" rel="noopener">${esc(f.navn.split(" ")[0])} på LinkedIn</a></p>` : ""}
        </div>
      </aside>
      <aside class="post-cta" aria-labelledby="cta-titel">
        <h2 id="cta-titel">Skal vi se på jeres opgaver?</h2>
        <p>På 30 minutter finder vi ud af, hvilke af jeres marketingopgaver Otto kan tage, og hvad det vil kræve. Mødet er gratis.</p>
        <a class="btn" href="/#book">Book en snak på 30 minutter</a>
      </aside>
    </article>`;
  return side({
    titel: `${p.titel} | Hey Otto`,
    ogTitel: p.titel,
    beskrivelse: p.beskrivelse,
    url: p.url,
    ogType: "article",
    billede,
    noindex: p.udkast,
    indhold,
    data: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.titel,
      description: p.beskrivelse,
      datePublished: p.dato,
      dateModified: p.sidstRettet,
      inLanguage: "da-DK",
      url: p.url,
      mainEntityOfPage: p.url,
      image: DOMAENE + (billede || DELINGSBILLEDE).src,
      keywords: p.tags.map((t) => t.navn).join(", ") || undefined,
      articleSection: TYPER[p.type],
      wordCount: p.ord,
      author: personData(f),
      publisher: udgiver,
    },
  });
}

function oversigt(indlaeg, { titel, intro, tags, aktivTag }) {
  const liste = indlaeg.length
    ? `<ol class="posts">\n${indlaeg.map((p) => `        <li>
          <article>
            ${meta(p)}
            <h2><a href="${p.sti}">${inline(p.titel)}</a>${p.udkast ? ` <span class="udkast">Udkast</span>` : ""}</h2>
            <p>${esc(p.beskrivelse)}</p>
            ${tagListe(p.tags, aktivTag)}
          </article>
        </li>`).join("\n")}\n      </ol>`
    : `<p class="muted">Det første indlæg er på vej.</p>`;
  return `    <section class="section blog-list" aria-labelledby="blog-titel">
      ${aktivTag ? `<p class="post-back"><a href="/blog/">Alle indlæg</a></p>\n      ` : ""}<h1 id="blog-titel">${esc(titel)}</h1>
      <p class="blog-lead">${intro}</p>
      ${tags.length > 1 ? `<nav class="blog-tags" aria-label="Emner">${tagListe(tags, aktivTag)}</nav>` : ""}
      ${liste}
    </section>`;
}

function feed(indlaeg) {
  const nyeste = indlaeg[0]?.sidstRettet;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hey Otto</title>
    <link>${DOMAENE}/blog/</link>
    <atom:link href="${DOMAENE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <description>AI og marketing uden raketvidenskab.</description>
    <language>da</language>
${nyeste ? `    <lastBuildDate>${rfc822(nyeste)}</lastBuildDate>\n` : ""}${indlaeg.map((p) => `    <item>
      <title>${esc(p.titel)}</title>
      <link>${p.url}</link>
      <guid>${p.url}</guid>
      <pubDate>${rfc822(p.dato)}</pubDate>
      <description>${esc(p.beskrivelse)}</description>
${p.tags.map((t) => `      <category>${esc(t.navn)}</category>\n`).join("")}    </item>`).join("\n")}
  </channel>
</rss>
`;
}

// Opdaterer kun blogdelen af sitemap.xml mellem to markeringer. Resten skrives stadig i hånden.
function opdaterSitemap(indlaeg) {
  const fil = join(SITE, "sitemap.xml");
  const xml = readFileSync(fil, "utf8");
  const start = "  <!-- blog:start, lavet af scripts/byg-blog.mjs -->";
  const slut = "  <!-- blog:slut -->";
  const urls = indlaeg.length
    ? [{ loc: `${DOMAENE}/blog/`, lastmod: indlaeg.map((p) => p.sidstRettet).sort().at(-1) }, ...indlaeg.map((p) => ({ loc: p.url, lastmod: p.sidstRettet }))]
    : [];
  const blok = [start, ...urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`), slut].join("\n");
  const ny = xml.includes(start)
    ? xml.replace(new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${slut}`), blok)
    : xml.replace("</urlset>", `${blok}\n</urlset>`);
  if (ny !== xml) writeFileSync(fil, ny);
}

// ---------- Byg ----------

const alle = laesIndlaeg();
const online = alle.filter((p) => !p.udkast);

const tagMap = new Map();
for (const p of alle) for (const t of p.tags) {
  if (!tagMap.has(t.slug)) tagMap.set(t.slug, { ...t, indlaeg: [] });
  tagMap.get(t.slug).indlaeg.push(p);
}
const alleTags = [...tagMap.values()].sort((a, b) => a.navn.localeCompare(b.navn, "da"));

rmSync(UD, { recursive: true, force: true });
mkdirSync(join(UD, "tag"), { recursive: true });

const intro = "Her skriver jeg om, hvordan mindre og mellemstore virksomheder kan få AI til at løse konkrete marketingopgaver, uden at det bliver endnu en ting at passe.";

writeFileSync(join(UD, "index.html"), side({
  titel: "Blog | Hey Otto",
  ogTitel: "Blog fra Hey Otto",
  beskrivelse: "Indlæg om, hvordan mindre og mellemstore virksomheder får AI til at løse konkrete marketingopgaver.",
  url: `${DOMAENE}/blog/`,
  noindex: online.length === 0,
  indhold: oversigt(alle, { titel: "Blog", intro, tags: alleTags }),
  data: { "@context": "https://schema.org", "@type": "Blog", name: "Hey Otto, blog", url: `${DOMAENE}/blog/`, inLanguage: "da-DK", publisher: udgiver },
}));

for (const p of alle) writeFileSync(join(UD, `${p.slug}.html`), indlaegSide(p));

// Emnesider hjælper læseren, men er for tynde til Google, så de får noindex og står ikke i sitemap.
for (const t of alleTags) {
  writeFileSync(join(UD, "tag", `${t.slug}.html`), side({
    titel: `Indlæg om ${t.navn} | Hey Otto`,
    beskrivelse: `Indlæg fra Hey Otto om ${t.navn}.`,
    url: `${DOMAENE}/blog/tag/${t.slug}`,
    noindex: true,
    indhold: oversigt(t.indlaeg, { titel: `Indlæg om ${t.navn}`, intro, tags: alleTags, aktivTag: t.slug }),
  }));
}

writeFileSync(join(UD, "feed.xml"), feed(online));
opdaterSitemap(online);

console.log(`Bloggen er bygget: ${online.length} indlæg online, ${alleTags.length} emner.`);
if (MED_UDKAST) console.log(`Udkast er taget med (${alle.length - online.length}). Kør uden --udkast, før du committer.`);
for (const a of advarsler) console.warn(`Advarsel: ${a}`);

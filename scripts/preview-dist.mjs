// Sirve dist/ imitando la config de nginx del VPS: try_files $uri $uri/index.html /index.html,
// con 404 real desde /404/index.html. Permite revisar el sitio tal como se publica.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const root = process.argv[2] ?? "dist";
const port = Number(process.argv[3] ?? 4173);
const TYPES = { ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".mjs":"text/javascript",
  ".css":"text/css", ".json":"application/json", ".svg":"image/svg+xml", ".ico":"image/x-icon",
  ".jpg":"image/jpeg", ".png":"image/png", ".xml":"application/xml", ".txt":"text/plain; charset=utf-8" };

const tryFile = async (p) => { try { return (await stat(p)).isFile() ? p : null; } catch { return null; } };

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  const hit = (await tryFile(join(root, path)))
    ?? (await tryFile(join(root, path, "index.html")));
  if (hit) {
    res.writeHead(200, { "Content-Type": TYPES[extname(hit)] ?? "application/octet-stream" });
    return res.end(await readFile(hit));
  }
  const notFound = await tryFile(join(root, "404", "index.html"));
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(notFound ? await readFile(notFound) : "404");
}).listen(port, () => console.log(`sirviendo ${root} en http://localhost:${port}`));

import fs from 'node:fs';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'index.html');
const html = fs.readFileSync(filePath, 'utf8');
const issues = [];

const anchors = [...html.matchAll(/<a\b([^>]*)>/gi)].map((match) => match[1]);

for (const attrs of anchors) {
  const hrefMatch = attrs.match(/href\s*=\s*(["'])(.*?)\1/i) ?? attrs.match(/href\s*=\s*(\S+)/i);
  if (!hrefMatch) continue;

  const href = hrefMatch[2] ?? hrefMatch[1];
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;

  const targetMatch = attrs.match(/target\s*=\s*(["'])(.*?)\1/i) ?? attrs.match(/target\s*=\s*(\S+)/i);
  const relMatch = attrs.match(/rel\s*=\s*(["'])(.*?)\1/i) ?? attrs.match(/rel\s*=\s*(\S+)/i);
  const target = targetMatch ? (targetMatch[2] ?? targetMatch[1]) : '';
  const rel = relMatch ? (relMatch[2] ?? relMatch[1]) : '';

  if (href.startsWith('http://')) {
    issues.push(`Enlace inseguro: "${href}" usa HTTP en lugar de HTTPS.`);
  }

  if (href.startsWith('https://') && target.toLowerCase() === '_blank' && !rel.toLowerCase().includes('noopener')) {
    issues.push(`Enlace externo con target="_blank" sin "noopener": "${href}".`);
  }

  if (href.startsWith('https://') && target.toLowerCase() === '_blank' && !rel.toLowerCase().includes('noreferrer')) {
    issues.push(`Enlace externo con target="_blank" sin "noreferrer": "${href}".`);
  }
}

if (issues.length > 0) {
  console.error('Errores en seguridad de enlaces:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log('Validación de enlaces externos: OK');

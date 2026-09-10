import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const errors = [];

const required = [
  { name: 'Doctype HTML5', check: /<!DOCTYPE html>/i },
  { name: 'Idioma del documento', check: /<html\s+lang=["'][^"']+["']/i },
  { name: 'Etiqueta main', check: /<main\b/i },
  { name: 'Etiqueta nav', check: /<nav\b/i },
  { name: 'Etiqueta header', check: /<header\b/i },
  { name: 'Etiqueta footer', check: /<footer\b/i },
  { name: 'Sección con contenido principal', check: /<section\b/i },
  { name: 'Navegación con aria-label', check: /<nav\b[^>]*aria-label=/i },
];

for (const item of required) {
  if (!item.check.test(html)) {
    errors.push(`Falta: ${item.name}`);
  }
}

const links = [...html.matchAll(/<a\b([^>]*)>/gi)];
for (const [, attrs] of links) {
  const href = attrs.match(/href\s*=\s*(["'])(.*?)\1|href\s*=\s*(\S+)/i);
  if (!href) continue;
  const hrefValue = (href[2] ?? href[3] ?? '').trim();
  if (!hrefValue || hrefValue.startsWith('#') || hrefValue.startsWith('mailto:') || hrefValue.startsWith('tel:')) continue;
  const target = attrs.match(/target\s*=\s*(["'])(.*?)\1|target\s*=\s*(\S+)/i);
  const rel = attrs.match(/rel\s*=\s*(["'])(.*?)\1|rel\s*=\s*(\S+)/i);
  if (target && target[2] && target[2].toLowerCase() === '_blank') {
    const relText = (rel?.[2] ?? rel?.[3] ?? '').toLowerCase();
    if (!relText.includes('noopener') || !relText.includes('noreferrer')) {
      errors.push(`Enlace externo con target="_blank" sin rel="noopener noreferrer": ${hrefValue}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Errores de validación HTML5 / semántica:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Validación HTML5 y semántica: OK');

import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.join(process.cwd(), 'index.html');
const cssPath = path.join(process.cwd(), 'styles.css');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const checks = [
  {
    name: 'viewport meta tag',
    pass: /<meta\s+name=["']viewport["']\s+content=["'][^"']*[width=device-width][^"']*["']/i.test(html),
  },
  {
    name: 'media queries',
    pass: /@media\s*\(/i.test(css),
  },
  {
    name: 'responsive layout foundations',
    pass: /grid-template-columns|flex-wrap\s*:\s*wrap/i.test(css),
  },
];

const failed = checks.filter((check) => !check.pass);

if (failed.length > 0) {
  console.error('Errores de adaptabilidad/responsividad:');
  for (const item of failed) {
    console.error(`- Faltó: ${item.name}`);
  }
  process.exit(1);
}

console.log('Validación responsiva: OK');

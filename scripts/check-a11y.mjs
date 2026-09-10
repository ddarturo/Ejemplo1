import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const url = 'http://127.0.0.1:8080';

try {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  const results = await new AxeBuilder({ page }).withTags(['wcag2a']).analyze();

  await browser.close();

  if (results.violations.length > 0) {
    console.error('Violaciones de accesibilidad WCAG 2A detectadas:');
    for (const violation of results.violations) {
      console.error(`- ${violation.id}: ${violation.help}`);
      for (const node of violation.nodes) {
        console.error(`  * ${node.target.join(', ')}`);
      }
    }
    process.exit(1);
  }

  console.log('Accesibilidad WCAG 2A: OK');
} catch (error) {
  console.error('Error durante la validación de accesibilidad:', error);
  process.exit(1);
}

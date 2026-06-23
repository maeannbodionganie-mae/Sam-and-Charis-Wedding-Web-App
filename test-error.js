import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('pageerror', error => {
    console.log(`Page error: ${error.message}`);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`Console error: ${msg.text()}`);
    }
  });

  try {
    await page.goto('http://localhost:3000');
    // Wait a bit for any asynchronous errors
    await page.waitForTimeout(6000);
  } catch (e) {
    console.error("Navigation failed", e);
  }

  await browser.close();
})();

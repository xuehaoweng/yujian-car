import { test, expect } from '@playwright/test';

test.describe('Desktop Smoke Test', () => {
  test('loads the app and displays cars', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('驭鉴');
    // Wait for cars to load (mock API delay)
    await page.waitForSelector('.car-card', { timeout: 10000 });
    const cards = await page.locator('.car-card').count();
    expect(cards).toBeGreaterThan(0);
  });

  test('applies brand filter via sidebar', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.car-card', { timeout: 10000 });

    // Check a brand checkbox in the sidebar
    await page.locator('.checkbox-item', { hasText: '丰田' }).click();
    await page.waitForTimeout(500);

    // Verify only Toyota cards are visible
    const cards = page.locator('.car-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.car-card-brand')).toContainText(
        '丰田',
      );
    }
  });

  test('opens car detail on card click', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.car-card', { timeout: 10000 });

    await page.locator('.car-card').first().click();
    await expect(page.locator('.detail-panel')).toBeVisible();
    await expect(page.locator('.detail-header h2')).toBeVisible();
  });
});

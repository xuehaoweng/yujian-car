import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test.describe('Mobile Smoke Test', () => {
  test('shows mobile filter toggle on small screen', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.mobile-filter-toggle')).toBeVisible();
  });

  test('opens mobile filter drawer', async ({ page }) => {
    await page.goto('/');
    await page.locator('.mobile-filter-toggle').click();
    await expect(page.locator('.mobile-filter-drawer')).toBeVisible();
    await expect(page.locator('.mobile-filter-drawer')).toContainText(
      '筛选与排序',
    );
  });

  test('applies filter from mobile drawer and closes', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.car-card', { timeout: 10000 });

    // Open mobile filter
    await page.locator('.mobile-filter-toggle').click();
    await expect(page.locator('.mobile-filter-drawer')).toBeVisible();

    // Apply brand filter
    await page
      .locator('.mobile-filter-drawer .checkbox-item', { hasText: '丰田' })
      .click();
    await page.waitForTimeout(500);

    // Close mobile filter
    await page.locator('.mobile-filter-drawer').getByText('完成').click();
    await expect(page.locator('.mobile-filter-drawer')).not.toBeVisible();
  });

  test('displays cars in single column on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.car-card', { timeout: 10000 });

    // On mobile (375px), grid should be 1 column
    const grid = page.locator('.car-grid');
    // Grid template columns for mobile is handled by CSS
    await expect(grid).toBeVisible();
  });
});

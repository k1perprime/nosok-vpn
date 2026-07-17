import { expect, test } from '@playwright/test';

test('opens the login dialog from the public header', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === 'mobile',
    'The compact public header deliberately exposes login through the account screen.',
  );

  await page.goto('/');

  await page.getByRole('button', { name: 'Войти' }).click();

  await expect(
    page.getByRole('dialog', { name: 'С возвращением' }),
  ).toBeVisible();
});

test('opens the login dialog from the account header', async ({ page }) => {
  await page.goto('/account');

  await page.getByRole('button', { name: 'Войти' }).click();

  await expect(
    page.getByRole('dialog', { name: 'С возвращением' }),
  ).toBeVisible();
});

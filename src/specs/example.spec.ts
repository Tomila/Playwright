//yle.spec.ts
import { test, expect } from '@playwright/test';
import { ExampleClass } from '../pages/example.page';
test('Navigate to areena.yle.fi', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv');
  const url = await page.url();
  expect(url).toContain('areena');
});
test('Navigate to areena.yle.fi/opas', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv/opas');
  const url = await page.url();
  expect(url).toContain('areena');
});
test('Search for Kymmenen uutiset', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv/opas');
  let exampletest = new ExampleClass(page);
  const url = await page.url();
  const text = await exampletest.searchResult();
});
test('Search Yle image', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv/opas');
  let exampletest = new ExampleClass(page);
  const url = await page.url();
  const text = await exampletest.searchImg();
});


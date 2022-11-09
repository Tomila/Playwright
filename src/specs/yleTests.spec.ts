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
test('"Luo YLE tunnus"- page visible', async ({ page,browserName }) => {
    await page.goto('https://areena.yle.fi/tv');
    if (browserName != 'chromium') {
        await page.getByRole('button', { name: 'Vain välttämättömät' }).click();
    }
    await page.getByRole('button', { name: 'Kirjaudu' }).click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByRole('link', { name: 'Luo Yle Tunnus' }).click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByRole('heading', { name: 'Luo Yle Tunnus' }).click();
});

test('page doesn`t accept emails in wrong format', async ({ page, browserName }) => {
    await page.goto('https://areena.yle.fi/tv');
    if (browserName != 'chromium') {
        await page.getByRole('button', { name: 'Vain välttämättömät' }).click();
    }
    await page.getByRole('button', { name: 'Kirjaudu' }).click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByRole('link', { name: 'Luo Yle Tunnus' }).click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByLabel('Sähköposti').click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByLabel('Sähköposti').fill('wrongformat.mail.com');
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByLabel('Salasana').click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByText('Tarkista sähköpostiosoitteen muoto.').click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByLabel('Sähköposti').click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByText('Luo Yle TunnusOnko sinulla jo Yle Tunnus? Kirjaudu sisäänKirjautuneena saat henk').click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByLabel('Sähköposti').fill('123mail.com');
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByText('Tarkista sähköpostiosoitteen muoto.').click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByLabel('Sähköposti').click();
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByLabel('Sähköposti').fill('@mail.com.com');
    await page.frameLocator('role=dialog[name="kirjaudu sisään"] >> iframe').getByText('Tarkista sähköpostiosoitteen muoto.').click();
});

test('"Kummeli" - series page visible', async ({ page , browserName}) => {
    await page.goto('https://areena.yle.fi/1-3339547');
    if (browserName != 'chromium') {
        await page.getByRole('button', { name: 'Vain välttämättömät' }).click();
    }
    await page.locator('section:has-text("KummeliKatso: K1, J17 kauttaTaattua Kummelihuumoria. Kummeli tavoittelee sitä su")').click();
});

test('"Kummeli" - series 3rd season, 5th episodes name and date can be found', async ({ page, browserName }) => {
    await page.goto('https://areena.yle.fi/1-3339547');
    if (browserName != 'chromium') {
        await page.getByRole('button', { name: 'Vain välttämättömät' }).click();
    }
    await page.locator('section:has-text("KummeliKatso: K1, J17 kauttaTaattua Kummelihuumoria. Kummeli tavoittelee sitä su")').click();
    await page.getByRole('button', { name: 'Kausi 3' }).click();
    await page.getByRole('link', { name: 'Jakso 5: Kummeli' }).click();
    await expect(page).toHaveURL('https://areena.yle.fi/1-1796319');
    await page.getByRole('heading', { name: 'K3, J5: Kummeli' }).click();
    await page.getByText('julkaistu ti 10.1.2006').click();
});

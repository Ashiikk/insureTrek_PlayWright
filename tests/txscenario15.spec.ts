const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://insuretrek.ui.foxsenseprojects.com/');
  await page.getByRole('textbox', { name: 'Enter Email address' }).click();
  await page.getByRole('textbox', { name: 'Enter Email address' }).fill('eip+uat@test.com');
  await page.getByRole('textbox', { name: 'Enter Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password *' }).fill('test@123');
  await page.getByRole('textbox', { name: 'Password *' }).press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://insuretrek.ui.foxsenseprojects.com/home');
  await page.getByText('Manage Producers').click();
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).click();
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).fill('Rodney Hayes');
  await page.locator('.ant-select-item-option-content').first().click();
  await page.getByRole('cell', { name: 'Rodney Hayes' }).locator('span').click();
  await page.getByText('Producer', { exact: true }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  await page.locator('.cursor-pointer.ant-tooltip-open').click();
  await page.getByRole('cell', { name: 'Not Assigned' }).getByRole('img').click();
  await page.getByText('Pending Applications').click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
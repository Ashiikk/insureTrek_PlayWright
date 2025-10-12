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
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://insuretrek.ui.foxsenseprojects.com/home');
  await page.getByText('Manage Producers').click();
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).click();
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).fill('Lisa');
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).press('Enter');
  await page.getByText('Lisa Chrysler').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell "Indiana active Missing LOA"`);
  // await expect(page.locator('tbody')).toContainText('Assigned');
  await page.getByRole('button', { name: 'Needs Attention (1)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell "Indiana active Missing LOA"`);
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('IN');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  // await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  //   - checkbox [checked]
  //   - text: /Producer - Individual \\(\\d+\\) Active/
  //   - checkbox
  //   - paragraph: /Accident & Health \\(\\d+\\)/
  //   - checkbox [checked]
  //   - paragraph: /Life, Accident & Health \\(\\d+\\)/
  //   - checkbox
  //   - paragraph: /Life \\(\\d+\\)/
  //   - checkbox [checked]
  //   - paragraph: /Personal lines \\(\\d+\\)/
  //   `);
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(1).uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.locator('.ant-select-item-option-content').first().click();
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell "Indiana active Missing LOA"`);
  // await expect(page.locator('tbody')).toContainText('Assigned');
  await page.getByRole('button', { name: 'Needs Attention (1)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell "Indiana active Missing LOA"`);
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('IN');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(2).check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- text: Indiana active`);
  // await expect(page.locator('tbody')).toContainText('Assigned');
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('No data');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`- img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI`);
  await page.locator('.ant-row.items-center').click();
  // await expect(page.locator('#ant-layout-container')).toContainText('IN');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('INIndiana').click();
  // await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  //   - checkbox [checked]
  //   - text: /Producer - Individual \\(\\d+\\) Active/
  //   - checkbox
  //   - paragraph: /Accident & Health \\(\\d+\\)/
  //   - checkbox [checked]
  //   - paragraph: /Life, Accident & Health \\(\\d+\\)/
  //   - checkbox
  //   - paragraph: /Life \\(\\d+\\)/
  //   - checkbox
  //   - paragraph: /Personal lines \\(\\d+\\)/
  //   `);
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toContainText('Assigned');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- text: Indiana active`);
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('No data');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('IN');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(2).check();
  await page.locator('div').filter({ hasText: /^Personal lines \(928\)$/ }).getByLabel('').check();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(1).uncheck();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').first().check();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(1).uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- text: active Missing LOA`);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell "Indiana active Missing LOA"`);
  // await expect(page.locator('tbody')).toContainText('Assigned');
  await page.getByRole('button', { name: 'Needs Attention (1)' }).click();
  await page.locator('#ant-layout-container').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- text: Indiana active Missing LOA`);
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('IN');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('india');
  await page.getByText('Indiana').nth(1).click();
  // await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  //   - checkbox [checked]
  //   - text: /Producer - Individual \\(\\d+\\) Active/
  //   - checkbox
  //   - paragraph: /Accident & Health \\(\\d+\\)/
  //   - checkbox [checked]
  //   - paragraph: /Life, Accident & Health \\(\\d+\\)/
  //   - checkbox
  //   - paragraph: /Life \\(\\d+\\)/
  //   - checkbox [checked]
  //   - paragraph: /Personal lines \\(\\d+\\)/
  //   `);
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- text: Indiana active`);
  // await expect(page.locator('tbody')).toContainText('Not Assigned');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toContainText('No Territories Assigned');
  // await expect(page.locator('#ant-layout-container')).toContainText('No States Assigned');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (0) Pending (0) Missing (0)
  //   `);
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- text: Indiana active Missing LOA`);
  // await expect(page.locator('tbody')).toContainText('Assigned');
  await page.getByRole('button', { name: 'Needs Attention (1)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('indiana');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`
  //   - img "activeLoa"
  //   - text: /Life, Accident & Health \\(\\d+\\)/
  //   - img "nonActiveLoa"
  //   - text: /Personal lines \\(\\d+\\)/
  //   `);
  // await expect(page.locator('tbody')).toMatchAriaSnapshot(`- text: Indiana active Missing LOA`);
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('IN');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('indiana');
  await page.getByRole('textbox', { name: 'Search States' }).press('Enter');
  await page.locator('div:nth-child(2) > .flex.items-center.cursor-pointer > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.locator('div').filter({ hasText: /^EIP Test$/ }).click();
  await page.getByText('Logout').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
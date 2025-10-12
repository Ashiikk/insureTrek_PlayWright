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
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).fill('Rodney Hayes');
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).press('Enter');
  await page.getByRole('cell', { name: 'Rodney Hayes' }).locator('span').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('Texas').click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.locator('div:nth-child(2) > div > .override-checkbox-bg > span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByText('in: State').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - table:
  //     - rowgroup:
  //       - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //         - columnheader "State"
  //         - columnheader "License No"
  //         - columnheader "License Class & LOAs"
  //         - columnheader "Expiration Date"
  //         - columnheader "Assignment Status"
  //         - columnheader "Fee"
  //         - columnheader "Status Graph"
  //         - cell
  //   - table:
  //     - rowgroup:
  //       - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Assigned"
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //       - row /Texas active \\d+ License Number copied to clipboard Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Assigned"
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //   - list:
  //     - listitem: 1-2 of 2 items
  //     - listitem "Previous Page":
  //       - button "left" [disabled]:
  //         - img "left"
  //     - listitem "1"
  //     - listitem "Next Page":
  //       - button "right" [disabled]:
  //         - img "right"
  //   `);
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('No data');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (2) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('TX');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('TXTexas').click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - table:
  //     - rowgroup:
  //       - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //         - columnheader "State"
  //         - columnheader "License No"
  //         - columnheader "License Class & LOAs"
  //         - columnheader "Expiration Date"
  //         - columnheader "Assignment Status"
  //         - columnheader "Fee"
  //         - columnheader "Status Graph"
  //         - cell
  //   - table:
  //     - rowgroup:
  //       - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Not Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Not Assigned":
  //           - img
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //       - row /Texas active \\d+ License Number copied to clipboard Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Assigned"
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //   - list:
  //     - listitem: 1-2 of 2 items
  //     - listitem "Previous Page":
  //       - button "left" [disabled]:
  //         - img "left"
  //     - listitem "1"
  //     - listitem "Next Page":
  //       - button "right" [disabled]:
  //         - img "right"
  //   `);
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('No data');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('TX');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('te');
  await page.getByText('TXTexas').click();
  // await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  //   - checkbox
  //   - text: /General Lines Agncy\\/Agnt \\(\\d+\\) Active/
  //   - checkbox
  //   - paragraph: /Life, Accident, Health and HMO \\(\\d+\\)/
  //   - checkbox [checked]
  //   - text: /Life Agt\\/Agy \\(\\d+\\) Active/
  //   - checkbox [checked]
  //   - paragraph: /Life \\(\\d+\\)/
  //   `);
  await page.locator('div:nth-child(2) > div > .override-checkbox-bg > span > .ant-checkbox-wrapper').click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - table:
  //     - rowgroup:
  //       - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //         - columnheader "State"
  //         - columnheader "License No"
  //         - columnheader "License Class & LOAs"
  //         - columnheader "Expiration Date"
  //         - columnheader "Assignment Status"
  //         - columnheader "Fee"
  //         - columnheader "Status Graph"
  //         - cell
  //   - table:
  //     - rowgroup:
  //       - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Assigned"
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //       - row /Texas active \\d+ License Number copied to clipboard Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Not Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Not Assigned":
  //           - img
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //   - list:
  //     - listitem: 1-2 of 2 items
  //     - listitem "Previous Page":
  //       - button "left" [disabled]:
  //         - img "left"
  //     - listitem "1"
  //     - listitem "Next Page":
  //       - button "right" [disabled]:
  //         - img "right"
  //   `);
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('No data');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('TX');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('TXTexas').click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - table:
  //     - rowgroup:
  //       - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //         - columnheader "State"
  //         - columnheader "License No"
  //         - columnheader "License Class & LOAs"
  //         - columnheader "Expiration Date"
  //         - columnheader "Assignment Status"
  //         - columnheader "Fee"
  //         - columnheader "Status Graph"
  //         - cell
  //   - table:
  //     - rowgroup:
  //       - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Not Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Not Assigned":
  //           - img
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //       - row /Texas active \\d+ License Number copied to clipboard Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Not Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Not Assigned":
  //           - img
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //   - list:
  //     - listitem: 1-2 of 2 items
  //     - listitem "Previous Page":
  //       - button "left" [disabled]:
  //         - img "left"
  //     - listitem "1"
  //     - listitem "Next Page":
  //       - button "right" [disabled]:
  //         - img "right"
  //   `);
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('No data');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (0) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('No States Assigned');
  // await expect(page.locator('#ant-layout-container')).toContainText('No Territories Assigned');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('Texas').click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.locator('div:nth-child(2) > div > .override-checkbox-bg > span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - table:
  //     - rowgroup:
  //       - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //         - columnheader "State"
  //         - columnheader "License No"
  //         - columnheader "License Class & LOAs"
  //         - columnheader "Expiration Date"
  //         - columnheader "Assignment Status"
  //         - columnheader "Fee"
  //         - columnheader "Status Graph"
  //         - cell
  //   - table:
  //     - rowgroup:
  //       - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Assigned"
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //       - row /Texas active \\d+ License Number copied to clipboard Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Assigned"
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //   - list:
  //     - listitem: 1-2 of 2 items
  //     - listitem "Previous Page":
  //       - button "left" [disabled]:
  //         - img "left"
  //     - listitem "1"
  //     - listitem "Next Page":
  //       - button "right" [disabled]:
  //         - img "right"
  //   `);
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (2) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('TX');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('Texas').click();
  await page.locator('div:nth-child(2) > .flex.items-center.cursor-pointer > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - table:
  //     - rowgroup:
  //       - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //         - columnheader "State"
  //         - columnheader "License No"
  //         - columnheader "License Class & LOAs"
  //         - columnheader "Expiration Date"
  //         - columnheader "Assignment Status"
  //         - columnheader "Fee"
  //         - columnheader "Status Graph"
  //         - cell
  //   - table:
  //     - rowgroup:
  //       - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Not Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Not Assigned":
  //           - img
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //       - row /Texas active \\d+ License Number copied to clipboard Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\) Sep \\d+, \\d+ \\(In \\d+ days\\) Not Assigned \\$ \\d+\\.\\d+ field-time file-text home Renew/:
  //         - cell "Texas active"
  //         - cell /\\d+ License Number copied to clipboard/:
  //           - img
  //           - img
  //         - cell /Life Agt\\/Agy \\(\\d+\\) activeLoa Life \\(\\d+\\)/:
  //           - img "activeLoa"
  //         - cell /Sep \\d+, \\d+ \\(In \\d+ days\\)/
  //         - cell "Not Assigned":
  //           - img
  //         - cell /\\$ \\d+\\.\\d+/
  //         - cell "field-time file-text home":
  //           - img
  //           - img "field-time"
  //           - img "file-text"
  //           - img "home"
  //         - cell "Renew":
  //           - button "Renew" [disabled]
  //   - list:
  //     - listitem: 1-2 of 2 items
  //     - listitem "Previous Page":
  //       - button "left" [disabled]:
  //         - img "left"
  //     - listitem "1"
  //     - listitem "Next Page":
  //       - button "right" [disabled]:
  //         - img "right"
  //   `);
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (0) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('No Territories Assigned');
  // await expect(page.locator('#ant-layout-container')).toContainText('No States Assigned');
  await page.getByText('EIP Test').click();
  await page.getByText('Logout').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
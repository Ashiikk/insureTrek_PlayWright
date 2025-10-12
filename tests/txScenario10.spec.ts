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
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).fill('Brandon Cahill');
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).press('Enter');
  await page.getByRole('cell', { name: 'Brandon Cahill' }).locator('span').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('Texas').click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.locator('div').filter({ hasText: /^Life Agt\/Agy \(882\)\( Estimated fees: \$55\.60 \) Life \(16\)$/ }).getByLabel('').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - main:
  //     - combobox "Search Licenses by State, LOAs, License Class or License Number"
  //     - button "search":
  //       - img "search"
  //     - button "Refresh":
  //       - img
  //     - button "filter Filters":
  //       - img "filter"
  //     - button "All"
  //     - button /Active \\(\\d+\\)/
  //     - button "Needs Attention (0)"
  //     - button "Upcoming Renewals (0)"
  //     - table:
  //       - rowgroup:
  //         - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //           - columnheader "State"
  //           - columnheader "License No"
  //           - columnheader "License Class & LOAs"
  //           - columnheader "Expiration Date"
  //           - columnheader "Assignment Status"
  //           - columnheader "Fee"
  //           - columnheader "Status Graph"
  //           - cell
  //     - table:
  //       - rowgroup:
  //         - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Dec \\d+, \\d+ \\(In 4 months\\) Assigned info-circle field-time file-text home/:
  //           - cell "Texas active"
  //           - cell /\\d+ License Number copied to clipboard/:
  //             - img
  //             - img
  //           - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //             - img "activeLoa"
  //           - cell /Dec \\d+, \\d+ \\(In 4 months\\)/
  //           - cell "Assigned"
  //           - cell "info-circle":
  //             - img "info-circle"
  //           - cell "field-time file-text home":
  //             - img
  //             - img "field-time"
  //             - img "file-text"
  //             - img "home"
  //           - cell
  //     - list:
  //       - listitem: 1-1 of 1 items
  //       - listitem "Previous Page":
  //         - button "left" [disabled]:
  //           - img "left"
  //       - listitem "1"
  //       - listitem "Next Page":
  //         - button "right" [disabled]:
  //           - img "right"
  //     - img
  //     - text: Auto Renew Disabled Undo
  //   `);
  await page.locator('#ant-layout-container').click();
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('No data');
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('tbody')).toContainText('Assigned');
  await page.getByText('Home').click();
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - img: AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI
  //   - text: Active (1) Pending (0) Missing (0)
  //   `);
  // await expect(page.locator('#ant-layout-container')).toContainText('TX');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('Texas').click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.locator('div').filter({ hasText: /^Life Agt\/Agy \(882\)\( Estimated fees: \$55\.60 \) Life \(16\)$/ }).getByLabel('').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - main:
  //     - combobox "Search Licenses by State, LOAs, License Class or License Number"
  //     - button "search":
  //       - img "search"
  //     - button "Refresh":
  //       - img
  //     - button "filter Filters":
  //       - img "filter"
  //     - button "All"
  //     - button /Active \\(\\d+\\)/
  //     - button "Needs Attention (0)"
  //     - button "Upcoming Renewals (0)"
  //     - table:
  //       - rowgroup:
  //         - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //           - columnheader "State"
  //           - columnheader "License No"
  //           - columnheader "License Class & LOAs"
  //           - columnheader "Expiration Date"
  //           - columnheader "Assignment Status"
  //           - columnheader "Fee"
  //           - columnheader "Status Graph"
  //           - cell
  //     - table:
  //       - rowgroup:
  //         - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Dec \\d+, \\d+ \\(In 4 months\\) Assigned info-circle field-time file-text home/:
  //           - cell "Texas active"
  //           - cell /\\d+ License Number copied to clipboard/:
  //             - img
  //             - img
  //           - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //             - img "activeLoa"
  //           - cell /Dec \\d+, \\d+ \\(In 4 months\\)/
  //           - cell "Assigned"
  //           - cell "info-circle":
  //             - img "info-circle"
  //           - cell "field-time file-text home":
  //             - img
  //             - img "field-time"
  //             - img "file-text"
  //             - img "home"
  //           - cell
  //     - list:
  //       - listitem: 1-1 of 1 items
  //       - listitem "Previous Page":
  //         - button "left" [disabled]:
  //           - img "left"
  //       - listitem "1"
  //       - listitem "Next Page":
  //         - button "right" [disabled]:
  //           - img "right"
  //     - img
  //     - text: Auto Renew Disabled Undo
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
  await page.getByText('Texas').click();
  // await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  //   - paragraph: "Current State:"
  //   - paragraph: Texas
  //   - button "left" [disabled]:
  //     - img "left"
  //   - button "right" [disabled]:
  //     - img "right"
  //   - checkbox [checked]
  //   - text: /General Lines Agncy\\/Agnt \\(\\d+\\) Active/
  //   - checkbox [checked]
  //   - paragraph: /Life, Accident, Health and HMO \\(\\d+\\)/
  //   - checkbox
  //   - text: "/Life Agt\\\\/Agy \\\\(\\\\d+\\\\) \\\\( Estimated fees: \\\\$\\\\d+\\\\.\\\\d+ \\\\)/"
  //   - checkbox
  //   - paragraph: /Life \\(\\d+\\)/
  //   `);
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - main:
  //     - combobox "Search Licenses by State, LOAs, License Class or License Number"
  //     - button "search":
  //       - img "search"
  //     - button "Refresh":
  //       - img
  //     - button "filter Filters":
  //       - img "filter"
  //     - button "All"
  //     - button /Active \\(\\d+\\)/
  //     - button "Needs Attention (0)"
  //     - button "Upcoming Renewals (0)"
  //     - table:
  //       - rowgroup:
  //         - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //           - columnheader "State"
  //           - columnheader "License No"
  //           - columnheader "License Class & LOAs"
  //           - columnheader "Expiration Date"
  //           - columnheader "Assignment Status"
  //           - columnheader "Fee"
  //           - columnheader "Status Graph"
  //           - cell
  //     - table:
  //       - rowgroup:
  //         - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Dec \\d+, \\d+ \\(In 4 months\\) Assigned info-circle field-time file-text home/:
  //           - cell "Texas active"
  //           - cell /\\d+ License Number copied to clipboard/:
  //             - img
  //             - img
  //           - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //             - img "activeLoa"
  //           - cell /Dec \\d+, \\d+ \\(In 4 months\\)/
  //           - cell "Assigned"
  //           - cell "info-circle":
  //             - img "info-circle"
  //           - cell "field-time file-text home":
  //             - img
  //             - img "field-time"
  //             - img "file-text"
  //             - img "home"
  //           - cell
  //     - list:
  //       - listitem: 1-1 of 1 items
  //       - listitem "Previous Page":
  //         - button "left" [disabled]:
  //           - img "left"
  //       - listitem "1"
  //       - listitem "Next Page":
  //         - button "right" [disabled]:
  //           - img "right"
  //     - img
  //     - text: Auto Renew Disabled Undo
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
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('Texas').click();
  // await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  //   - checkbox [checked]
  //   - text: /General Lines Agncy\\/Agnt \\(\\d+\\) Active/
  //   - checkbox [checked]
  //   - paragraph: /Life, Accident, Health and HMO \\(\\d+\\)/
  //   - checkbox
  //   - text: "/Life Agt\\\\/Agy \\\\(\\\\d+\\\\) \\\\( Estimated fees: \\\\$\\\\d+\\\\.\\\\d+ \\\\)/"
  //   - checkbox
  //   - paragraph: /Life \\(\\d+\\)/
  //   `);
  await page.locator('div:nth-child(2) > .flex.items-center.cursor-pointer > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - main:
  //     - combobox "Search Licenses by State, LOAs, License Class or License Number"
  //     - button "search":
  //       - img "search"
  //     - button "Refresh":
  //       - img
  //     - button "filter Filters":
  //       - img "filter"
  //     - button "All"
  //     - button /Active \\(\\d+\\)/
  //     - button "Needs Attention (0)"
  //     - button "Upcoming Renewals (0)"
  //     - table:
  //       - rowgroup:
  //         - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //           - columnheader "State"
  //           - columnheader "License No"
  //           - columnheader "License Class & LOAs"
  //           - columnheader "Expiration Date"
  //           - columnheader "Assignment Status"
  //           - columnheader "Fee"
  //           - columnheader "Status Graph"
  //           - cell
  //     - table:
  //       - rowgroup:
  //         - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Dec \\d+, \\d+ \\(In 4 months\\) Not Assigned info-circle field-time file-text home/:
  //           - cell "Texas active"
  //           - cell /\\d+ License Number copied to clipboard/:
  //             - img
  //             - img
  //           - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //             - img "activeLoa"
  //           - cell /Dec \\d+, \\d+ \\(In 4 months\\)/
  //           - cell "Not Assigned":
  //             - img
  //           - cell "info-circle":
  //             - img "info-circle"
  //           - cell "field-time file-text home":
  //             - img
  //             - img "field-time"
  //             - img "file-text"
  //             - img "home"
  //           - cell
  //     - list:
  //       - listitem: 1-1 of 1 items
  //       - listitem "Previous Page":
  //         - button "left" [disabled]:
  //           - img "left"
  //       - listitem "1"
  //       - listitem "Next Page":
  //         - button "right" [disabled]:
  //           - img "right"
  //     - img
  //     - text: Auto Renew Disabled Undo
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
  // await expect(page.locator('#ant-layout-container')).toContainText('No Territories Assigned');
  // await expect(page.locator('#ant-layout-container')).toContainText('No States Assigned');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('texas');
  await page.getByText('TXTexas').click();
  await page.locator('div').filter({ hasText: /^Life Agt\/Agy \(882\)\( Estimated fees: \$55\.60 \) Life \(16\)$/ }).getByLabel('').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('Pending Applications', { exact: true }).click();
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('texas');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  // await expect(page.locator('#ant-layout-container')).toMatchAriaSnapshot(`
  //   - main:
  //     - combobox "Search Licenses by State, LOAs, License Class or License Number"
  //     - button "search":
  //       - img "search"
  //     - button "Refresh":
  //       - img
  //     - button "filter Filters":
  //       - img "filter"
  //     - button "All"
  //     - button /Active \\(\\d+\\)/
  //     - button "Needs Attention (0)"
  //     - button "Upcoming Renewals (0)"
  //     - table:
  //       - rowgroup:
  //         - row "State License No License Class & LOAs Expiration Date Assignment Status Fee Status Graph":
  //           - columnheader "State"
  //           - columnheader "License No"
  //           - columnheader "License Class & LOAs"
  //           - columnheader "Expiration Date"
  //           - columnheader "Assignment Status"
  //           - columnheader "Fee"
  //           - columnheader "Status Graph"
  //           - cell
  //     - table:
  //       - rowgroup:
  //         - row /Texas active \\d+ License Number copied to clipboard General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\) Dec \\d+, \\d+ \\(In 4 months\\) Assigned info-circle field-time file-text home/:
  //           - cell "Texas active"
  //           - cell /\\d+ License Number copied to clipboard/:
  //             - img
  //             - img
  //           - cell /General Lines Agncy\\/Agnt \\(\\d+\\) activeLoa Life, Accident, Health and HMO \\(\\d+\\)/:
  //             - img "activeLoa"
  //           - cell /Dec \\d+, \\d+ \\(In 4 months\\)/
  //           - cell "Assigned"
  //           - cell "info-circle":
  //             - img "info-circle"
  //           - cell "field-time file-text home":
  //             - img
  //             - img "field-time"
  //             - img "file-text"
  //             - img "home"
  //           - cell
  //     - list:
  //       - listitem: 1-1 of 1 items
  //       - listitem "Previous Page":
  //         - button "left" [disabled]:
  //           - img "left"
  //       - listitem "1"
  //       - listitem "Next Page":
  //         - button "right" [disabled]:
  //           - img "right"
  //     - img
  //     - text: Auto Renew Disabled Undo
  //   `);
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
  // await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  //   - paragraph: "Current State:"
  //   - paragraph: Texas
  //   - button "left" [disabled]:
  //     - img "left"
  //   - button "right" [disabled]:
  //     - img "right"
  //   - checkbox [checked]
  //   - text: /General Lines Agncy\\/Agnt \\(\\d+\\) Active/
  //   - checkbox [checked]
  //   - paragraph: /Life, Accident, Health and HMO \\(\\d+\\)/
  //   - checkbox
  //   - text: "/Life Agt\\\\/Agy \\\\(\\\\d+\\\\) \\\\( Estimated fees: \\\\$\\\\d+\\\\.\\\\d+ \\\\)/"
  //   - checkbox
  //   - paragraph: /Life \\(\\d+\\)/
  //   `);
  await page.locator('div:nth-child(2) > .flex.items-center.cursor-pointer > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('EIP Test').click();
  await page.getByText('Logout').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
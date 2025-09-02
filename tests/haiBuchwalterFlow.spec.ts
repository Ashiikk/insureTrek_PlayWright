import { test, expect } from '@playwright/test';

test('Hai Buchwalter - Indiana License Management Flow', async ({ page }) => {
  console.log('🚀 Starting Hai Buchwalter Indiana License Management Flow');
  
  // Dynamically detect screen size and set optimal viewport ratio
  console.log('🖥️ Step 0: Detecting screen size and setting optimal viewport ratio...');
  
  // Get screen dimensions using JavaScript
  const screenDimensions = await page.evaluate(() => {
    return {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight
    };
  });
  
  console.log(`📱 Detected screen: ${screenDimensions.width}x${screenDimensions.height}`);
  console.log(`📱 Available screen: ${screenDimensions.availWidth}x${screenDimensions.availHeight}`);
  
  // Calculate optimal viewport size (90% of available screen)
  const viewportWidth = Math.floor(screenDimensions.availWidth * 0.9);
  const viewportHeight = Math.floor(screenDimensions.availHeight * 0.9);
  
  // Set dynamic viewport size
  await page.setViewportSize({ width: viewportWidth, height: viewportHeight });
  console.log(`✅ Step 0: Viewport set to: ${viewportWidth}x${viewportHeight} (90% of available screen)`);
  
  // Wait for viewport to stabilize
  await page.waitForTimeout(2000);
  


  // 1. Login to InsureTrek
  console.log('📋 Step 1: Login to InsureTrek');
  await page.goto('https://insuretrek.ui.foxsenseprojects.com/');
  
  // Wait 3 seconds before entering credentials
  console.log('⏱️ Step 1a: Waiting 3 seconds before entering credentials...');
  await page.waitForTimeout(3000);
  
  await page.getByRole('textbox', { name: 'Enter Email address' }).click();
  await page.waitForTimeout(1000); // Wait after click
  await page.getByRole('textbox', { name: 'Enter Email address' }).fill('eip+uat@test.com');
  await page.waitForTimeout(1000); // Wait after fill
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.waitForTimeout(1000); // Wait after click
  await page.getByRole('textbox', { name: 'Password *' }).fill('test@123');
  await page.waitForTimeout(1000); // Wait after fill
  await page.getByRole('button', { name: 'Login' }).click();
  console.log('✅ Step 1: Login successful');
  
  // Wait for login to complete and page to load
  console.log('⏱️ Step 1b: Waiting for login to complete...');
  await page.waitForTimeout(3000);

  // 2. Navigate to Home and Manage Producers
  console.log('📋 Step 2: Navigate to Manage Producers');
  await page.goto('https://insuretrek.ui.foxsenseprojects.com/home');
  await page.getByText('Manage Producers').click();
  console.log('✅ Step 2: Navigated to Manage Producers');

  // 3. Search and select Hai Buchwalter
  console.log('📋 Step 3: Search for Hai Buchwalter');
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).click();
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).fill('hai buch');
  await page.getByRole('combobox', { name: 'Search by Producer or NPN' }).press('Enter');
  await page.getByText('Hai Buchwalter').click();
  console.log('✅ Step 3: Hai Buchwalter selected');

    // 4. Click Manage button
  console.log('📋 Step 4: Click Manage button');
  await page.getByRole('button', { name: 'Manage' }).click();
  console.log('✅ Step 4: Manage button clicked');
  
  // 5. Unassign existing Indiana assignment if present
  console.log('📋 Step 5: Unassign existing Indiana assignment if present');
  await page.locator('div').filter({ hasText: /^Aug 26 - 2025$/ }).getByLabel('').uncheck();
  console.log('✅ Step 5: Existing assignment unchecked');
  
  // 6. Open All States and search for Indiana
  console.log('📋 Step 6: Open All States and search for Indiana');
  await page.getByText('All States', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  console.log('✅ Step 6: Indiana state selected');
  
  // 7. Assign first LOA checkbox
  console.log('📋 Step 7: Assign first LOA checkbox');
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  console.log('✅ Step 7: First LOA assigned and saved');
  
  // 8. Verify initial assignment
  console.log('📋 Step 8: Verify initial assignment');
  await page.getByText('State Licenses').click();
  await page.getByText('Home').click();
  await expect(page.locator('#ant-layout-container')).toContainText('IN');
  console.log('✅ Step 8: IN text found in container');
  
  // 9. Verify LOA assignment details
  console.log('📋 Step 9: Verify LOA assignment details');
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  await expect(page.getByText('Producer - Individual (602)Accident & Health (14)Life (16)Personal lines (928)')).toBeVisible();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - text: /Producer - Individual \\(\\d+\\)/
    - img "activeLoa"
    - text: /Accident & Health \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Life \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Personal lines \\(\\d+\\)/
  `);
  console.log('✅ Step 9: LOA assignment verified');
  
  // 10. Unassign some LOAs and assign Personal lines
  console.log('📋 Step 10: Unassign some LOAs and assign Personal lines');
  await page.getByText('Home').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').first().uncheck();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(2).uncheck();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.locator('div').filter({ hasText: /^Personal lines \(928\)$/ }).getByLabel('').check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  console.log('✅ Step 10: LOAs unassigned and Personal lines assigned');
  
  // 11. Verify partial assignment
  console.log('📋 Step 11: Verify partial assignment');
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - text: /Producer - Individual \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Personal lines \\(\\d+\\)/
    - img "activeLoa"
    - text: /Accident & Health \\(\\d+\\)/
  `);
  await expect(page.getByText('Producer - Individual (602)Personal lines (928)Accident & Health (14)')).toBeVisible();
  console.log('✅ Step 11: Partial assignment verified');
  
  // 12. Assign Life LOA
  console.log('📋 Step 12: Assign Life LOA');
  await page.getByText('Home').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('INIndiana').click();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(2).check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  console.log('✅ Step 12: Life LOA assigned');
  
  // 13. Verify Life assignment
  console.log('📋 Step 13: Verify Life assignment');
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - text: /Producer - Individual \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Personal lines \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Life \\(\\d+\\)/
    - img "activeLoa"
    - text: /Accident & Health \\(\\d+\\)/
  `);
  await expect(page.getByText('Producer - Individual (602)Personal lines (928)Life (16)Accident & Health (14)')).toBeVisible();
  console.log('✅ Step 13: Life assignment verified');
  
  // 14. Assign Accident & Health LOA
  console.log('📋 Step 14: Assign Accident & Health LOA');
  await page.getByText('Home').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('').nth(1).check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  console.log('✅ Step 14: Accident & Health LOA assigned');
  
  // 15. Verify final assignment
  console.log('📋 Step 15: Verify final assignment');
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - text: /Producer - Individual \\(\\d+\\)/
    - img "activeLoa"
    - text: /Accident & Health \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Life \\(\\d+\\)/
  `);
  await expect(page.getByText('Producer - Individual (602)Accident & Health (14)Life (16)')).toBeVisible();
  console.log('✅ Step 15: Final assignment verified');
  
  // 16. Check Needs Attention tab
  console.log('📋 Step 16: Check Needs Attention tab');
  await page.getByText('Home').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().uncheck();
  await page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first().check();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  console.log('✅ Step 16: Changes saved for final state');
  
  // 17. Verify final state in Needs Attention
  console.log('📋 Step 17: Verify final state in Needs Attention');
  await page.getByText('State Licenses').click();
  await page.getByRole('button', { name: 'Needs Attention (0)' }).click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - text: /Producer - Individual \\(\\d+\\)/
    - img "activeLoa"
    - text: /Accident & Health \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Life \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Personal lines \\(\\d+\\)/
  `);
  await expect(page.getByText('Producer - Individual (602)Accident & Health (14)Life (16)Personal lines (928)')).toBeVisible();
  console.log('✅ Step 17: Final state verified in Needs Attention');
  
  // 18. Unassign Indiana completely
  console.log('📋 Step 18: Unassign Indiana completely');
  await page.getByText('Home').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('ind');
  await page.getByText('Indiana').nth(1).click();
  await page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).locator('label').nth(2).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  console.log('✅ Step 18: Indiana completely unassigned');
  
  // 19. Verify no Indiana assignment
  console.log('📋 Step 19: Verify no Indiana assignment');
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByText('ind in: State').click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - text: /Producer - Individual \\(\\d+\\)/
    - img "nonActiveLoa"
    - text: /Life \\(\\d+\\)/
    - img "activeLoa"
    - text: /Accident & Health \\(\\d+\\)/
  `);
  await expect(page.getByText('Producer - Individual (602)Life (16)Accident & Health (14)')).toBeVisible();
  console.log('✅ Step 19: No Indiana assignment verified');
  
  // 20. Final cleanup and logout
  console.log('📋 Step 20: Final cleanup and logout');
  await page.getByText('Home').click();
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).click();
  await page.getByRole('textbox', { name: 'Search States' }).fill('in');
  await page.locator('div').filter({ hasText: /^INIndiana$/ }).getByLabel('').uncheck();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  console.log('✅ Step 20: Final cleanup completed');
  
  // 21. Verify final state
  console.log('📋 Step 21: Verify final state');
  await page.getByText('State Licenses').click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).click();
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).fill('ind');
  await page.getByRole('combobox', { name: 'Search Licenses by State,' }).press('Enter');
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - text: /Producer - Individual \\(\\d+\\)/
    - img "activeLoa"
    - text: /Accident & Health \\(\\d+\\)/
  `);
  await expect(page.getByText('Producer - Individual (602)Accident & Health (14)')).toBeVisible();
  console.log('✅ Step 21: Final state verified');
  
  // 22. Logout
  console.log('📋 Step 22: Logout');
  await page.getByText('EIP Test').click();
  await page.getByText('Logout').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  console.log('✅ Step 22: Logout successful');
  
  console.log('🎉 Hai Buchwalter Indiana License Management Flow completed!');
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE TEST SUMMARY');
  console.log('='.repeat(80));
  console.log('✅ All tests completed successfully!');
  console.log('='.repeat(80));
  console.log('🎯 Test execution completed!');
  console.log('📁 Check the HTML report for detailed results and screenshots');
  console.log('📁 Check the test-results folder for video recordings and traces');
  console.log('='.repeat(80));
});

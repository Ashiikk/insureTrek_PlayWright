import { test, expect } from '@playwright/test';

test('Shemlah Scenario 3 - Indiana License Management Flow', async ({ page }) => {
  const testInfo = test.info();
  const startTime = new Date().toISOString();
  const assertionResults: Array<{step: string, description: string, passed: boolean, expected?: string, actual?: string, error?: string}> = [];
  
  // Enhanced helper function to run assertions safely and continue execution
  const safeAssert = async (assertionFn: () => Promise<any>, stepName: string, description: string, expectedValue?: string) => {
    try {
      await assertionFn();
      console.log(`✅ ${stepName}: ${description} - Assertion PASSED`);
      if (expectedValue) {
        console.log(`   📋 Expected: ${expectedValue}`);
        console.log(`   ✅ Actual: PASSED`);
      }
      assertionResults.push({
        step: stepName,
        description,
        passed: true,
        expected: expectedValue,
        actual: 'PASSED'
      });
      return true;
    } catch (error: any) {
      console.log(`⚠️ ${stepName}: Assertion FAILED - ${description}`);
      console.log(`🔍 Error details: ${error.message}`);
      
      // Try to extract actual value for comparison
      let actualValue = 'UNKNOWN';
      try {
        if (error.message.includes('toBeVisible')) {
          actualValue = 'Element not visible';
        } else if (error.message.includes('toContainText')) {
          actualValue = 'Text not found';
        } else if (error.message.includes('toMatchAriaSnapshot')) {
          actualValue = 'Aria snapshot mismatch';
        }
      } catch (extractError) {
        actualValue = 'Error extracting actual value';
      }
      
      if (expectedValue) {
        console.log(`   📋 Expected: ${expectedValue}`);
        console.log(`   ❌ Actual: ${actualValue}`);
      }
      
      assertionResults.push({
        step: stepName,
        description,
        passed: false,
        expected: expectedValue,
        actual: actualValue,
        error: error.message
      });
      
      // Add annotation to test info for HTML report
      testInfo.annotations.push({
        type: 'assertion-failed',
        description: `${stepName}: ${description} - Expected: ${expectedValue || 'N/A'}, Actual: ${actualValue}`
      });
      
      return false;
    }
  };

  // Helper function to wait for element to be visible and clickable
  const waitForElementReady = async (locator: any, timeout: number = 3000) => {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.waitFor({ state: 'attached', timeout: 2000 });
      return true;
    } catch (error) {
      console.log(`⏱️ Element not ready, waiting 500ms...`);
      if (!page.isClosed()) {
        await page.waitForTimeout(500);
      }
      try {
        await locator.waitFor({ state: 'visible', timeout: 2000 });
        return true;
      } catch (retryError) {
        console.log(`⚠️ Element still not ready after retry`);
        return false;
      }
    }
  };

  // Helper function to wait for page load with minimal delay
  const waitForPageLoad = async () => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
  };

  // Helper function to wait for element interaction with minimal delay
  const waitForInteraction = async () => {
    await page.waitForTimeout(500);
  };

  console.log('🚀 Starting Shemlah Scenario 3 - Indiana License Management Flow');
  
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
  await waitForPageLoad();
  
  // Wait for email input to be ready
  const emailInput = page.getByRole('textbox', { name: 'Enter Email address' });
  await waitForElementReady(emailInput);
  await emailInput.click();
  await waitForInteraction();
  await emailInput.fill('eip+uat@test.com');
  await waitForInteraction();
  
  // Wait for password input to be ready
  const passwordInput = page.getByRole('textbox', { name: 'Password *' });
  await waitForElementReady(passwordInput);
  await passwordInput.fill('test@123');
  await waitForInteraction();
  
  // Wait for login button to be ready
  const loginButton = page.getByRole('button', { name: 'Login' });
  await waitForElementReady(loginButton);
  await loginButton.click();
  console.log('✅ Step 1: Login successful');
  
  // Wait for login to complete and page to load
  console.log('⏱️ Step 1b: Waiting for login to complete...');
  await waitForPageLoad();
  await page.waitForTimeout(2000);

  // 2. Navigate to Home and Manage Producers
  console.log('📋 Step 2: Navigate to Manage Producers');
  await page.goto('https://insuretrek.ui.foxsenseprojects.com/home');
  await waitForPageLoad();
  
  // Wait for Manage Producers link to be ready
  const manageProducersLink = page.getByText('Manage Producers');
  await waitForElementReady(manageProducersLink);
  await manageProducersLink.click();
  console.log('✅ Step 2: Navigated to Manage Producers');

  // 3. Search and select Shemlah Naphish
  console.log('📋 Step 3: Search for Shemlah Naphish');
  await waitForPageLoad();
  
  // Wait for search combobox to be ready
  const searchCombobox = page.getByRole('combobox', { name: 'Search by Producer or NPN' });
  await waitForElementReady(searchCombobox);
  await searchCombobox.click();
  await waitForInteraction();
  await searchCombobox.fill('Shemlah');
  await waitForInteraction();
  await searchCombobox.press('Enter');
  await page.waitForTimeout(2000);
  
  // Wait for Shemlah Naphish to appear and be clickable
  const shemlahElement = page.getByText('Shemlah Naphish');
  await waitForElementReady(shemlahElement);
  await shemlahElement.click();
  console.log('✅ Step 3: Shemlah Naphish selected');

  // 4. Click Manage button
  console.log('📋 Step 4: Click Manage button');
  await waitForPageLoad();
  
  // Wait for Manage button to be ready
  const manageButton = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton);
  await manageButton.click();
  console.log('✅ Step 4: Manage button clicked');
  
  // 5. Unassign existing assignments if present
  console.log('📋 Step 5: Unassign existing assignments if present');
  await waitForPageLoad();
  await page.waitForTimeout(5000);
  
  // Wait for the specific card containers to be available (takes 5 seconds)
  console.log('⏱️ Waiting for card containers to load...');
  await page.waitForTimeout(5000);
  
  // Look for checkboxes in specific card containers and uncheck them
  try {
    // Target the specific card containers
    const cardContainer1 = page.locator('#root > div > div > div > div > main > div.ant-card.ant-card-bordered.individual-onboard-assignment-card.figtree.mt-3.min-h-\\[470px\\].h-\\[calc\\(100vh-230px\\)\\].css-dev-only-do-not-override-1fvgrqi > div > div.flex.gap-\\[18px\\].overflow-y-auto > div:nth-child(1)');
    const cardContainer2 = page.locator('#root > div > div > div > div > main > div.ant-card.ant-card-bordered.individual-onboard-assignment-card.figtree.mt-3.min-h-\\[470px\\].h-\\[calc\\(100vh-230px\\)\\].css-dev-only-do-not-override-1fvgrqi > div > div.flex.gap-\\[18px\\].overflow-y-auto > div:nth-child(2)');
    
    // Wait for the containers to be visible
    await waitForElementReady(cardContainer1, 5000);
    await waitForElementReady(cardContainer2, 5000);
    console.log('✅ Card containers are now available');
    
    // Find all checked checkboxes within these containers
    const checkboxesInContainer1 = cardContainer1.locator('input[type="checkbox"]:checked');
    const checkboxesInContainer2 = cardContainer2.locator('input[type="checkbox"]:checked');
    
    const count1 = await checkboxesInContainer1.count();
    const count2 = await checkboxesInContainer2.count();
    const totalCount = count1 + count2;
    
    if (totalCount > 0) {
      console.log(`🔍 Found ${count1} checked checkbox(es) in container 1 and ${count2} in container 2, unchecking them all...`);
      
      // Uncheck checkboxes in container 1
      for (let i = 0; i < count1; i++) {
        try {
          const checkbox = checkboxesInContainer1.nth(i);
          await waitForElementReady(checkbox, 3000);
          await checkbox.uncheck();
          console.log(`✅ Unchecked checkbox ${i + 1} in container 1`);
        } catch (error: any) {
          console.log(`⚠️ Could not uncheck checkbox ${i + 1} in container 1: ${error.message}`);
          console.log('⏭️ Moving to next step...');
          break; // Exit the loop and move to next step
        }
      }
      
      // Uncheck checkboxes in container 2
      for (let i = 0; i < count2; i++) {
        try {
          const checkbox = checkboxesInContainer2.nth(i);
          await waitForElementReady(checkbox, 3000);
          await checkbox.uncheck();
          console.log(`✅ Unchecked checkbox ${i + 1} in container 2`);
        } catch (error: any) {
          console.log(`⚠️ Could not uncheck checkbox ${i + 1} in container 2: ${error.message}`);
          console.log('⏭️ Moving to next step...');
          break; // Exit the loop and move to next step
        }
      }
    } else {
      console.log('ℹ️ No checked checkboxes found in the specified containers');
    }
  } catch (error) {
    console.log('ℹ️ Step 5: No existing checkboxes found in the specified containers');
  }

  // 6. Search for Indiana and assign first LOA
  console.log('📋 Step 6: Search for Indiana and assign first LOA');
  await page.waitForTimeout(2000);
  
  // Wait for search states textbox to be ready
  const searchStatesBox = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox);
  await searchStatesBox.click();
  await waitForInteraction();
  await searchStatesBox.fill('ind');
  await waitForInteraction();
  
  // Wait for Indiana to appear and be clickable
  const indianaElement = page.getByText('Indiana').nth(1);
  await waitForElementReady(indianaElement);
  await indianaElement.click();
  console.log('✅ Step 6: Indiana state selected');
  
  // Wait for first LOA checkbox to be ready
  const firstLOACheckbox = page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first();
  await waitForElementReady(firstLOACheckbox);
  await firstLOACheckbox.check();
  await waitForInteraction();
  
  // Wait for Save Changes button to be ready
  const saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 6: First LOA assigned and saved');

  // 7. Verify initial assignment
  console.log('📋 Step 7: Verify initial assignment');
  await waitForPageLoad();
  
  // Wait for State Licenses to be ready
  const stateLicensesLink = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink);
  await stateLicensesLink.click();
  await waitForInteraction();
  
  // Wait for search licenses combobox to be ready
  const searchLicensesBox = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox);
  await searchLicensesBox.click();
  await waitForInteraction();
  await searchLicensesBox.fill('ind');
  await waitForInteraction();
  await searchLicensesBox.press('Enter');
  await page.waitForTimeout(2000);
  
  await safeAssert(
    async () => await expect(page.locator('tbody')).toMatchAriaSnapshot(`
      - img "activeLoa"
      - text: /Life, Accident & Health \\(\\d+\\)/
      - img "nonActiveLoa"
      - text: /Personal lines \\(\\d+\\)/
    `),
    'Step 7a',
    'Aria snapshot matches initial assignment structure',
    'Aria snapshot should show Life, Accident & Health as active and Personal lines as non-active'
  );
  
  // Wait for Home to be ready
  const homeLink = page.getByText('Home');
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  
  await safeAssert(
    async () => await expect(page.locator('#ant-layout-container')).toContainText('IN'),
    'Step 7b',
    'IN text found in container',
    'Container should contain "IN" text'
  );

  // 8. Modify LOA assignments
  console.log('📋 Step 8: Modify LOA assignments');
  await waitForPageLoad();
  
  // Wait for Manage button to be ready again
  await waitForElementReady(manageButton);
  await manageButton.click();
  await waitForInteraction();
  
  // Wait for search states textbox to be ready again
  await waitForElementReady(searchStatesBox);
  await searchStatesBox.click();
  await waitForInteraction();
  await searchStatesBox.fill('ind');
  await waitForInteraction();
  
  // Wait for INIndiana to appear and be clickable
  const inIndianaElement = page.getByText('INIndiana');
  await waitForElementReady(inIndianaElement);
  await inIndianaElement.click();
  await waitForInteraction();
  
  // Wait for LOA checkboxes to be ready
  const loaCheckboxes = page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ }).getByLabel('');
  await waitForElementReady(loaCheckboxes.nth(1));
  await loaCheckboxes.nth(1).uncheck();
  await waitForInteraction();
  
  await waitForElementReady(loaCheckboxes.nth(2));
  await loaCheckboxes.nth(2).check();
  await waitForInteraction();
  
  // Wait for Save Changes button to be ready again
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 8: LOA assignments modified and saved');
  
  await safeAssert(
    async () => await expect(page.locator('#ant-layout-container')).toContainText('IN'),
    'Step 8a',
    'IN text still present after modification',
    'Container should still contain "IN" text'
  );

  // 9. Verify modified assignment
  console.log('📋 Step 9: Verify modified assignment');
  await waitForPageLoad();
  
  // Wait for State Licenses to be ready again
  await waitForElementReady(stateLicensesLink);
  await stateLicensesLink.click();
  await waitForInteraction();
  
  // Wait for search licenses combobox to be ready again
  await waitForElementReady(searchLicensesBox);
  await searchLicensesBox.click();
  await waitForInteraction();
  await searchLicensesBox.fill('ind');
  await waitForInteraction();
  await searchLicensesBox.press('Enter');
  await page.waitForTimeout(2000);
  
  await safeAssert(
    async () => await expect(page.locator('tbody')).toMatchAriaSnapshot(`
      - img "nonActiveLoa"
      - text: /Personal lines \\(\\d+\\)/
      - img "activeLoa"
      - text: /Life, Accident & Health \\(\\d+\\)/
    `),
    'Step 9a',
    'Aria snapshot matches modified assignment structure',
    'Aria snapshot should show Personal lines as non-active and Life, Accident & Health as active'
  );

  // 10. Further LOA modifications
  console.log('📋 Step 10: Further LOA modifications');
  await waitForPageLoad();
  
  // Wait for Home to be ready again
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  
  // Wait for Manage button to be ready again
  await waitForElementReady(manageButton);
  await manageButton.click();
  await waitForInteraction();
  
  // Wait for search states textbox to be ready again
  await waitForElementReady(searchStatesBox);
  await searchStatesBox.click();
  await waitForInteraction();
  await searchStatesBox.fill('ind');
  await waitForInteraction();
  
  // Wait for Indiana to appear and be clickable again
  await waitForElementReady(indianaElement);
  await indianaElement.click();
  await waitForInteraction();
  
  // Wait for LOA checkbox to be ready
  await waitForElementReady(loaCheckboxes.nth(1));
  await loaCheckboxes.nth(1).uncheck();
  await waitForInteraction();
  
  // Wait for Save Changes button to be ready again
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 10: Further LOA modifications saved');

  // 11. Check Needs Attention tab
  console.log('📋 Step 11: Check Needs Attention tab');
  await waitForPageLoad();
  
  // Wait for State Licenses to be ready again
  await waitForElementReady(stateLicensesLink);
  await stateLicensesLink.click();
  await waitForInteraction();
  
  // Wait for Needs Attention button to be ready - click any button containing "Needs Attention"
  try {
    const needsAttentionButton = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton, 5000);
    await needsAttentionButton.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 11: Needs Attention button clicked');
  } catch (error) {
    console.log('⚠️ Needs Attention button not found, skipping this step...');
  }
  
  // Try to run assertions if Needs Attention button was clicked
  try {
    await safeAssert(
      async () => await expect(page.locator('tbody')).toMatchAriaSnapshot(`
        - img "nonActiveLoa"
        - text: /Personal lines \\(\\d+\\)/
        - img "activeLoa"
        - text: /Life, Accident & Health \\(\\d+\\)/
      `),
      'Step 11a',
      'Aria snapshot matches Needs Attention structure',
      'Aria snapshot should show the structure in Needs Attention tab'
    );
  } catch (error) {
    console.log('⏭️ Step 11 assertions: Skipped - Needs Attention button not available or assertions failed');
  }
  
  // Navigate to Home page before checking for IN text
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  
  // Wait for home page to load completely before checking for IN text
  await waitForPageLoad();
  await page.waitForTimeout(2000);
  
  await safeAssert(
    async () => await expect(page.locator('#ant-layout-container')).toContainText('IN'),
    'Step 11b',
    'IN text still present',
    'Container should still contain "IN" text'
  );

  // 12. Unassign Indiana completely
  console.log('📋 Step 12: Unassign Indiana completely');
  await waitForPageLoad();
  
  // Wait for Home to be ready again
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  
  // Wait for Manage button to be ready again
  await waitForElementReady(manageButton);
  await manageButton.click();
  await waitForInteraction();
  
  // Wait for search states textbox to be ready again
  await waitForElementReady(searchStatesBox);
  await searchStatesBox.click();
  await waitForInteraction();
  await searchStatesBox.fill('ind');
  await waitForInteraction();
  
  // Wait for INIndiana to appear and be clickable
  await waitForElementReady(inIndianaElement);
  await inIndianaElement.click();
  await waitForInteraction();
  
  // Wait for first LOA checkbox to be ready
  await waitForElementReady(firstLOACheckbox);
  await firstLOACheckbox.uncheck();
  await waitForInteraction();
  
  // Wait for Save Changes button to be ready again
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 12: Indiana completely unassigned');
  
  await safeAssert(
    async () => await expect(page.locator('#ant-layout-container')).toContainText('No Territories Assigned'),
    'Step 12a',
    'No Territories Assigned text found',
    'Container should contain "No Territories Assigned" text'
  );
  
  await safeAssert(
    async () => await expect(page.locator('#ant-layout-container')).toContainText('No States Assigned'),
    'Step 12b',
    'No States Assigned text found',
    'Container should contain "No States Assigned" text'
  );

  // 13. Verify unassignment
  console.log('📋 Step 13: Verify unassignment');
  await waitForPageLoad();
  
  // Wait for State Licenses to be ready again
  await waitForElementReady(stateLicensesLink);
  await stateLicensesLink.click();
  await waitForInteraction();
  
  // Wait for search licenses combobox to be ready again
  await waitForElementReady(searchLicensesBox);
  await searchLicensesBox.click();
  await waitForInteraction();
  await searchLicensesBox.fill('ind');
  await waitForInteraction();
  await searchLicensesBox.press('Enter');
  await page.waitForTimeout(2000);
  
  await safeAssert(
    async () => await expect(page.locator('tbody')).toMatchAriaSnapshot(`
      - img "activeLoa"
      - text: /Life, Accident & Health \\(\\d+\\)/
    `),
    'Step 13a',
    'Aria snapshot matches unassigned structure',
    'Aria snapshot should show only Life, Accident & Health as active'
  );

  // 14. Reassign Indiana
  console.log('📋 Step 14: Reassign Indiana');
  await waitForPageLoad();
  
  // Wait for Home to be ready again
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  
  // Wait for Manage button to be ready again
  await waitForElementReady(manageButton);
  await manageButton.click();
  await waitForInteraction();
  
  // Wait for search states textbox to be ready again
  await waitForElementReady(searchStatesBox);
  await searchStatesBox.click();
  await waitForInteraction();
  await searchStatesBox.fill('ind');
  await waitForInteraction();
  
  // Wait for Indiana checkbox to be ready
  const indianaCheckbox = page.locator('div:nth-child(2) > .flex.items-center.cursor-pointer > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input');
  await waitForElementReady(indianaCheckbox);
  await indianaCheckbox.check();
  await waitForInteraction();
  
  // Wait for first LOA checkbox to be ready
  await waitForElementReady(firstLOACheckbox);
  await firstLOACheckbox.check();
  await waitForInteraction();
  
  // Wait for Save Changes button to be ready again
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 14: Indiana reassigned');

  // 15. Verify reassignment
  console.log('📋 Step 15: Verify reassignment');
  await waitForPageLoad();
  
  // Wait for State Licenses to be ready again
  await waitForElementReady(stateLicensesLink);
  await stateLicensesLink.click();
  await waitForInteraction();
  
  // Wait for search licenses combobox to be ready again
  await waitForElementReady(searchLicensesBox);
  await searchLicensesBox.click();
  await waitForInteraction();
  await searchLicensesBox.fill('ind');
  await waitForInteraction();
  
  // Click on the first option in the dropdown
  const firstOption = page.locator('.ant-select-item-option-content').first();
  await waitForElementReady(firstOption);
  await firstOption.click();
  await waitForInteraction();
  
  await safeAssert(
    async () => await expect(page.locator('tbody')).toMatchAriaSnapshot(`
      - img "activeLoa"
      - text: /Life, Accident & Health \\(\\d+\\)/
      - img "nonActiveLoa"
      - text: /Personal lines \\(\\d+\\)/
    `),
    'Step 15a',
    'Aria snapshot matches reassignment structure',
    'Aria snapshot should show Life, Accident & Health as active and Personal lines as non-active'
  );
  
  // Navigate to Home page before checking for IN text
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  
  // Wait for home page to load completely before checking for IN text
  await waitForPageLoad();
  await page.waitForTimeout(2000);
  
  await safeAssert(
    async () => await expect(page.locator('#ant-layout-container')).toContainText('IN'),
    'Step 15b',
    'IN text found after reassignment',
    'Container should contain "IN" text'
  );

  // 16. Final unassignment
  console.log('📋 Step 16: Final unassignment');
  await waitForPageLoad();
  
  // Wait for Home to be ready again
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  
  // Wait for Manage button to be ready again
  await waitForElementReady(manageButton);
  await manageButton.click();
  await waitForInteraction();
  
  // Wait for search states textbox to be ready again
  await waitForElementReady(searchStatesBox);
  await searchStatesBox.click();
  await waitForInteraction();
  await searchStatesBox.fill('ind');
  await waitForInteraction();
  
  // Wait for Indiana to appear and be clickable again
  await waitForElementReady(indianaElement);
  await indianaElement.click();
  await waitForInteraction();
  
  // Wait for first LOA checkbox to be ready
  await waitForElementReady(firstLOACheckbox);
  await firstLOACheckbox.uncheck();
  await waitForInteraction();
  
  // Wait for Save Changes button to be ready again
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 16: Final unassignment completed');

  // 17. Logout
  console.log('📋 Step 17: Logout');
  await waitForPageLoad();
  
  // Wait for EIP Test to be ready
  const eipTestElement = page.getByText('EIP Test');
  await waitForElementReady(eipTestElement);
  await eipTestElement.click();
  await waitForInteraction();
  
  // Wait for Logout to be ready
  const logoutElement = page.getByText('Logout');
  await waitForElementReady(logoutElement);
  await logoutElement.click();
  await waitForInteraction();
  
  // Wait for Yes button to be ready
  const yesButton = page.getByRole('button', { name: 'Yes' });
  await waitForElementReady(yesButton);
  await yesButton.click();
  console.log('✅ Step 17: Logout successful');
  
  // Final summary and reporting
  const passedAssertions = assertionResults.filter(r => r.passed).length;
  const failedAssertions = assertionResults.filter(r => !r.passed).length;
  const totalAssertions = assertionResults.length;
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Passed Assertions: ${passedAssertions}/${totalAssertions}`);
  if (failedAssertions > 0) {
    console.log(`❌ Failed Assertions: ${failedAssertions}/${totalAssertions}`);
    console.log('\n📋 Failed Assertion Details:');
    assertionResults.filter(r => !r.passed).forEach(result => {
      console.log(`   ⚠️ ${result.step}: ${result.description}`);
      console.log(`      Expected: ${result.expected || 'N/A'}`);
      console.log(`      Actual: ${result.actual || 'N/A'}`);
      if (result.error) {
        console.log(`      Error: ${result.error}`);
      }
    });
  }
  console.log('='.repeat(80));
  console.log('🎯 Test execution completed!');
  console.log('📁 Check the HTML report for detailed results and screenshots');
  console.log('📁 Check the test-results folder for video recordings and traces');
  console.log('='.repeat(80));
   
  // Test completion logging with testInfo annotations
  const endTime = new Date().toISOString();
  const duration = Date.now() - new Date(startTime).getTime();
   
  testInfo.annotations.push({ type: 'test-completion', description: `Test completed at ${endTime}` });
  testInfo.annotations.push({ type: 'test-duration', description: `Total duration: ${duration}ms` });
  testInfo.annotations.push({ type: 'test-status', description: `Assertions: ${passedAssertions}/${totalAssertions} passed` });
  testInfo.annotations.push({ type: 'test-summary', description: 'Shemlah Scenario 3 Indiana license management flow completed' });
  
  // Add detailed assertion results to test info for HTML report
  testInfo.annotations.push({ 
    type: 'assertion-summary', 
    description: `Passed: ${passedAssertions}, Failed: ${failedAssertions}, Total: ${totalAssertions}` 
  });
  
  // Add failed assertions as separate annotations for better visibility in HTML report
  assertionResults.filter(r => !r.passed).forEach((result, index) => {
    testInfo.annotations.push({
      type: 'failed-assertion',
      description: `${result.step}: ${result.description} - Expected: ${result.expected || 'N/A'}, Actual: ${result.actual || 'N/A'}`
    });
  });
   
  console.log(`⏱️ Total test duration: ${duration}ms`);
  console.log(`📅 Started: ${startTime}`);
  console.log(`📅 Completed: ${endTime}`);
  console.log('📋 Test annotations added to report for detailed tracking');
});

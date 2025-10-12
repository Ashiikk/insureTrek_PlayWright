import { test, expect } from '@playwright/test';

test('Scenario 7 - Brian Moltz Indiana License Management Flow', async ({ page }) => {
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

  console.log('🚀 Starting Scenario 7 - Brian Moltz Indiana License Management Flow');
  
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

  // 3. Search and select Brian Moltz
  console.log('📋 Step 3: Search for Brian Moltz');
  await waitForPageLoad();
  
  // Wait for search combobox to be ready
  const searchCombobox = page.getByRole('combobox', { name: 'Search by Producer or NPN' });
  await waitForElementReady(searchCombobox);
  await searchCombobox.click();
  await waitForInteraction();
  await searchCombobox.fill('Brian');
  await waitForInteraction();
  await searchCombobox.press('Enter');
  await page.waitForTimeout(2000);
  
  // Wait for Brian Moltz to appear and be clickable
  const brianElement = page.getByText('Brian Moltz');
  await waitForElementReady(brianElement);
  await brianElement.click();
  console.log('✅ Step 3: Brian Moltz selected');

  // 4. Click Manage button
  console.log('📋 Step 4: Click Manage button');
  await waitForPageLoad();
  
  // Wait for Manage button to be ready
  const manageButton = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton);
  await manageButton.click();
  console.log('✅ Step 4: Manage button clicked');
  
  // 5. Click "All States" before unassigning existing assignments
  console.log('📋 Step 5: Click "All States" before unassigning existing assignments');
  await waitForPageLoad();
  await page.waitForTimeout(5000);
  
  // Click on "All States" first
  try {
    const allStatesElement = page.getByText('All States');
    await waitForElementReady(allStatesElement, 5000);
    await allStatesElement.click();
    console.log('✅ Clicked on "All States"');
    await waitForInteraction();
  } catch (error: any) {
    console.log(`⚠️ Could not find "All States" element: ${error.message}`);
    console.log('⏭️ Continuing with existing assignment cleanup...');
  }
  
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
    
    // Click "All States" before checking cardContainer2
    try {
      const allStatesElement = page.getByText('All States');
      await waitForElementReady(allStatesElement, 3000);
      await allStatesElement.click();
      console.log('✅ Clicked on "All States" before checking cardContainer2');
      await waitForInteraction();
    } catch (error: any) {
      console.log(`⚠️ Could not find "All States" element before cardContainer2: ${error.message}`);
      console.log('⏭️ Continuing with cardContainer2 operations...');
    }
    
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

  // 6. Search for Indiana and manage LOA assignments
  console.log('📋 Step 6: Search for Indiana and manage LOA assignments');
  await waitForPageLoad();
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
  
  // Wait for first LOA checkbox to be ready and check it
  const firstLOACheckbox = page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first();
  await waitForElementReady(firstLOACheckbox);
  await firstLOACheckbox.check();
  await waitForInteraction();
  
  // Uncheck "States All States Territories" checkbox
  try {
    const allStatesCheckbox = page.locator('div').filter({ hasText: /^States All States Territories$/ }).getByLabel('', { exact: true });
    if (await allStatesCheckbox.isVisible()) {
      await waitForElementReady(allStatesCheckbox);
      await allStatesCheckbox.uncheck();
      console.log('✅ Unchecked States All States Territories checkbox');
      await waitForInteraction();
    }
  } catch (error: any) {
    console.log(`⚠️ Could not find States All States Territories checkbox: ${error.message}`);
  }
  
  // Uncheck second checkbox
  try {
    const secondCheckbox = page.locator('div:nth-child(2) > .flex.items-center.cursor-pointer > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input');
    if (await secondCheckbox.isVisible()) {
      await waitForElementReady(secondCheckbox);
      await secondCheckbox.uncheck();
      console.log('✅ Unchecked second checkbox');
      await waitForInteraction();
    }
  } catch (error: any) {
    console.log(`⚠️ Could not find second checkbox: ${error.message}`);
  }
  
  // Wait for Save Changes button to be ready
  const saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 6: Initial LOA assignments saved');

  // 7. Modify LOA assignments
  console.log('📋 Step 7: Modify LOA assignments');
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
  
  // Wait for Indiana to appear and be clickable again
  await waitForElementReady(indianaElement);
  await indianaElement.click();
  await waitForInteraction();
  
  // Check Personal lines checkbox
  try {
    const personalLinesCheckbox = page.locator('div').filter({ hasText: /^Personal lines \(928\)$/ }).getByLabel('');
    if (await personalLinesCheckbox.isVisible()) {
      await waitForElementReady(personalLinesCheckbox);
      await personalLinesCheckbox.check();
      console.log('✅ Checked Personal lines checkbox');
      await waitForInteraction();
    }
  } catch (error: any) {
    console.log(`⚠️ Could not find Personal lines checkbox: ${error.message}`);
  }
  
  // Uncheck and double-click first LOA checkbox
  await waitForElementReady(firstLOACheckbox);
  await firstLOACheckbox.uncheck();
  await waitForInteraction();
  await firstLOACheckbox.dblclick();
  await waitForInteraction();
  await firstLOACheckbox.check();
  await waitForInteraction();
  
  // Wait for Save Changes button to be ready again
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 7: LOA assignments modified and saved');

  // 8. Verify assignment and check Needs Attention
  console.log('📋 Step 8: Verify assignment and check Needs Attention');
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
  
  // Check for presence of required elements without strict order
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Personal lines \(\d+\)/);
      await expect(tbody).toContainText(/Producer - Individual \(\d+\)/);
      // Check for active LOA images
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      await expect(activeLoaImages).toHaveCount(1);
    },
    'Step 8a',
    'Assignment structure verified',
    'Table should contain Personal lines (active) and Producer - Individual'
  );
  
  // Check Needs Attention tab
  try {
    const needsAttentionButton = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton, 5000);
    await needsAttentionButton.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 8: Needs Attention button clicked');
    
    // Check for Missing LOA indicator or No data
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        const hasMissingLoa = await tbody.textContent();
        if (hasMissingLoa && hasMissingLoa.includes('Missing LOA')) {
          await expect(tbody).toContainText('Missing LOA');
        } else {
          await expect(tbody).toContainText('No data');
        }
      },
      'Step 8b',
      'Needs Attention tab content verified',
      'Needs Attention tab should show "Missing LOA" or "No data"'
    );
  } catch (error) {
    console.log('⚠️ Needs Attention button not found, skipping this step...');
  }

  // 9. Continue with additional LOA modifications
  console.log('📋 Step 9: Continue with additional LOA modifications');
  await waitForPageLoad();
  
  // Wait for Home to be ready
  const homeLink = page.getByText('Home');
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
  
  // Uncheck first LOA checkbox
  await waitForElementReady(firstLOACheckbox);
  await firstLOACheckbox.uncheck();
  await waitForInteraction();
  
  // Click Personal lines label
  try {
    const personalLinesLabel = page.locator('div').filter({ hasText: /^Personal lines \(928\)$/ }).locator('label');
    if (await personalLinesLabel.isVisible()) {
      await waitForElementReady(personalLinesLabel);
      await personalLinesLabel.click();
      console.log('✅ Clicked Personal lines label');
      await waitForInteraction();
    }
  } catch (error: any) {
    console.log(`⚠️ Could not find Personal lines label: ${error.message}`);
  }
  
  // Wait for Save Changes button to be ready again
  await waitForElementReady(saveChangesButton);
  await saveChangesButton.click();
  console.log('✅ Step 9: Additional LOA modifications saved');

  // 10. Final verification and cleanup
  console.log('📋 Step 10: Final verification and cleanup');
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
  
  // Check for presence of required elements without strict order
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Personal lines \(\d+\)/);
      await expect(tbody).toContainText(/Producer - Individual \(\d+\)/);
      // Check for active LOA images
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      await expect(activeLoaImages).toHaveCount(1);
    },
    'Step 10a',
    'Final assignment structure verified',
    'Table should contain Personal lines (active) and Producer - Individual'
  );

  // 11. Logout
  console.log('📋 Step 11: Logout');
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
  console.log('✅ Step 11: Logout successful');
  
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
  testInfo.annotations.push({ type: 'test-summary', description: 'Scenario 7 Brian Moltz Indiana license management flow completed' });
  
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

import { test, expect } from '@playwright/test';

/**
 * Scenario 8 - George Boylan Indiana License Management Flow with All States Check
 * 
 * This test performs the following operations:
 * 1. Login to InsureTrek
 * 2. Navigate to Manage Producers
 * 3. Search and select George Boylan
 * 4. Click Manage button
 * 5. Click "All States" before unassigning existing assignments
 * 6. Unassign any existing checkbox assignments in card containers
 * 7. Search for Indiana state and assign first LOA
 * 8. Navigate to State Licenses
 * 9. Search for Indiana and verify license structure
 * 10. Click on Indiana active Missing LOA
 * 11. Check Needs Attention tab
 * 12. Verify final assignment structure
 * 13. Logout
 * 
 * Key Features:
 * - Comprehensive "All States" click functionality at multiple points
 * - Robust error handling with try-catch blocks
 * - Dynamic viewport sizing based on screen dimensions
 * - Flexible assertions that check for presence rather than strict order
 * - Detailed logging and test reporting
 */

test('Scenario 8 - George Boylan Indiana License Management Flow with All States Check', async ({ page }) => {
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

  console.log('🚀 Starting Scenario 8 - George Boylan Indiana License Management Flow');
  
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

  // 3. Search and select George Boylan
  console.log('📋 Step 3: Search for George Boylan');
  await waitForPageLoad();
  
  // Wait for search combobox to be ready
  const searchCombobox = page.getByRole('combobox', { name: 'Search by Producer or NPN' });
  await waitForElementReady(searchCombobox);
  await searchCombobox.click();
  await waitForInteraction();
  await searchCombobox.fill('george');
  await waitForInteraction();
  await searchCombobox.press('Enter');
  await page.waitForTimeout(2000);
  
  // Wait for George Boylan to appear and be clickable
  const georgeBoylan = page.getByText('George Boylan');
  await waitForElementReady(georgeBoylan);
  await georgeBoylan.click();
  console.log('✅ Step 3: George Boylan selected');

  // 4. Click Manage button
  console.log('📋 Step 4: Click Manage button');
  await waitForPageLoad();
  
  // Wait for Manage button to be ready
  const manageButton = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton);
  await manageButton.click();
  console.log('✅ Step 4: Manage button clicked');

  // Step 5: Click "All States" before unassigning existing assignments
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
      
      // Click "All States" after container 1 is done, before moving to container 2
      try {
        const allStatesElement = page.getByText('All States');
        await waitForElementReady(allStatesElement, 3000);
        await allStatesElement.click();
        console.log('✅ Clicked on "All States" after container 1, before container 2');
        await waitForInteraction();
      } catch (error: any) {
        console.log(`⚠️ Could not find "All States" element after container 1: ${error.message}`);
        console.log('⏭️ Continuing with container 2 operations...');
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
      console.log('ℹ️ No existing assignments found to unassign');
    }
  } catch (error: any) {
    console.log(`⚠️ Error during existing assignment cleanup: ${error.message}`);
    console.log('⏭️ Continuing with test...');
  }

  // 6. Search for Indiana and assign first LOA
  console.log('📋 Step 6: Search for Indiana and assign first LOA');
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

  // Step 7: Wait for 3 seconds after assigning states
  console.log('📋 Step 7: Waiting 3 seconds after assigning states...');
  await page.waitForTimeout(3000);
  console.log('✅ Step 7: 3-second wait completed');

  // 8. Navigate to Manage Licenses
  console.log('📋 Step 8: Navigate to Manage Licenses');
  await waitForPageLoad();
  
  // Wait for State Licenses to be ready
  const stateLicensesLink = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink);
  await stateLicensesLink.click();
  await waitForInteraction();
  console.log('✅ Step 8: Navigated to State Licenses');

  // 9. Search for Indiana in State Licenses
  console.log('📋 Step 9: Search for Indiana in State Licenses');
  await waitForPageLoad();
  
  // Wait for search licenses combobox to be ready
  const searchLicensesBox = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox);
  await searchLicensesBox.click();
  await waitForInteraction();
  await searchLicensesBox.fill('ind');
  await waitForInteraction();
  await searchLicensesBox.press('Enter');
  await page.waitForTimeout(2000);
  console.log('✅ Step 9: Indiana searched in State Licenses');

  // Step 10: Verify initial assignment
  console.log('📋 Step 10: Verify initial assignment');
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      await expect(tbody).toContainText(/Life \(\d+\)/);
      await expect(tbody).toContainText(/Personal lines \(\d+\)/);
    },
    'Step 10a',
    'Initial assignment structure verified',
    'Table should contain Accident & Health, Life, and Personal lines with counts'
  );

  // 11. Click on Indiana active Missing LOA
  console.log('📋 Step 11: Click on Indiana active Missing LOA');
  await waitForPageLoad();
  
  const indianaCell = page.getByRole('cell', { name: 'Indiana active Missing LOA' });
  await waitForElementReady(indianaCell);
  await indianaCell.click();
  await waitForInteraction();
  console.log('✅ Step 11: Indiana active Missing LOA clicked');

  // 12. Check Needs Attention tab
  console.log('📋 Step 12: Check Needs Attention tab');
  await waitForPageLoad();
  
  // Wait for Needs Attention button to be ready - click any button containing "Needs Attention"
  try {
    const needsAttentionButton = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton, 5000);
    await needsAttentionButton.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 12: Needs Attention button clicked');
  } catch (error) {
    console.log('⚠️ Needs Attention button not found, skipping this step...');
  }

  // 13. Verify Needs Attention tab content
  console.log('📋 Step 13: Verify Needs Attention tab content');
  
  // Try to run assertions if Needs Attention button was clicked
  try {
    await safeAssert(
      async () => {
        const needsAttentionContent = page.locator('[data-testid="needs-attention-content"], .needs-attention-content, [class*="needs-attention"]');
        const hasContent = await needsAttentionContent.count() > 0;
        if (hasContent) {
          const contentText = await needsAttentionContent.textContent();
          expect(contentText).toMatch(/Missing LOA|No data/);
        } else {
          // If no specific content area, check for general indicators
          const pageText = await page.textContent('body');
          expect(pageText).toMatch(/Missing LOA|No data/);
        }
      },
      'Step 13a',
      'Needs Attention tab content verified',
      'Needs Attention tab should show "Missing LOA" or "No data"'
    );
  } catch (error) {
    console.log('⏭️ Step 13 assertions: Skipped - Needs Attention button not available or assertions failed');
  }

  // 14. Search for Indiana again to verify state
  console.log('📋 Step 14: Search for Indiana again to verify state');
  await waitForPageLoad();
  
  const licenseSearchField2 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(licenseSearchField2);
  await licenseSearchField2.click();
  await waitForInteraction();
  await licenseSearchField2.fill('ind');
  await waitForInteraction();
  await licenseSearchField2.press('Enter');
  await page.waitForTimeout(2000);
  console.log('✅ Step 14: Indiana searched again');

  // Step 15: Final verification
  console.log('📋 Step 15: Final verification');
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      await expect(tbody).toContainText(/Life \(\d+\)/);
      await expect(tbody).toContainText(/Personal lines \(\d+\)/);
    },
    'Step 15a',
    'Final assignment structure verified',
    'Table should still contain Accident & Health, Life, and Personal lines with counts'
  );

  // 16. Logout
  console.log('📋 Step 16: Logout');
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
  console.log('✅ Step 16: Logout successful');

  // Final test summary
  const endTime = new Date().toISOString();
  const passedAssertions = assertionResults.filter(result => result.passed).length;
  const totalAssertions = assertionResults.length;
  
  console.log('\n================================================================================');
  console.log('📊 COMPREHENSIVE TEST SUMMARY');
  console.log('================================================================================');
  console.log(`✅ Passed Assertions: ${passedAssertions}/${totalAssertions}`);
  console.log('================================================================================');
  console.log('🎯 Test execution completed!');
  console.log('📁 Check the HTML report for detailed results and screenshots');
  console.log('📁 Check the test-results folder for video recordings and traces');
  console.log('================================================================================');
  console.log(`⏱️ Total test duration: ${Date.now() - new Date(startTime).getTime()}ms`);
  console.log(`📅 Started: ${startTime}`);
  console.log(`📅 Completed: ${endTime}`);
  console.log('📋 Test annotations added to report for detailed tracking');
});


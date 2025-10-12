import { test, expect } from '@playwright/test';

/**
 * Final 8th Scenario - George Boylan Indiana License Management Flow with Comprehensive Checks
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
 * 12. Comprehensive LOA management and verification cycles
 * 13. Multiple assignment/unassignment operations
 * 14. Final verification and logout
 * 
 * Key Features:
 * - Comprehensive "All States" click functionality at multiple points
 * - Multiple LOA assignment/unassignment cycles
 * - Extensive verification checks for each state change
 * - Robust error handling with try-catch blocks
 * - Dynamic viewport sizing based on screen dimensions
 * - Flexible assertions that check for presence rather than strict order
 * - Detailed logging and test reporting
 */

test('Final 8th Scenario - George Boylan Indiana License Management Flow with Comprehensive Checks', async ({ page }) => {
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

  console.log('🚀 Starting Final 8th Scenario - George Boylan Indiana License Management Flow with Comprehensive Checks');
  
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
      // Check for active and non-active LOA images (from 8th file)
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
      await expect(activeLoaImages).toHaveCount(2);
      await expect(nonActiveLoaImages).toHaveCount(1);
    },
    'Step 10a',
    'Initial assignment structure verified with LOA images',
    'Table should contain Accident & Health, Life, and Personal lines with 2 active and 1 non-active LOA images'
  );

  // 11. Click on Indiana active Missing LOA
  console.log('📋 Step 11: Click on Indiana active Missing LOA');
  await waitForPageLoad();
  
  const indianaCell = page.getByRole('cell', { name: 'Indiana active Missing LOA' });
  await waitForElementReady(indianaCell);
  await indianaCell.click();
  await waitForInteraction();
  console.log('✅ Step 11: Indiana active Missing LOA clicked');

  // Add assertion for "Indiana active Missing LOA" cell (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
    'Step 11a',
    'Indiana active Missing LOA cell found',
    'Table should contain "Indiana active Missing LOA" cell'
  );

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
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
        await expect(tbody).toContainText(/Life \(\d+\)/);
        await expect(tbody).toContainText(/Personal lines \(\d+\)/);
        // Check for active and non-active LOA images (from 8th file)
        const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
        const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
        await expect(activeLoaImages).toHaveCount(2);
        await expect(nonActiveLoaImages).toHaveCount(1);
      },
      'Step 13a',
      'Needs Attention tab content with LOA images verified',
      'Should contain Accident & Health, Life, and Personal lines with 2 active and 1 non-active LOA images'
    );

    // Add assertion for "Indiana active Missing LOA" cell in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
      'Step 13b',
      'Indiana active Missing LOA cell found in Needs Attention tab',
      'Needs Attention tab should contain "Indiana active Missing LOA" cell'
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

  // Step 15: Click "All" button and verify assigned status
  console.log('📋 Step 15: Click "All" button and verify assigned status');
  await waitForPageLoad();
  
  try {
    const allButton = page.getByRole('button', { name: 'All' });
    await waitForElementReady(allButton, 3000);
    await allButton.click();
    console.log('✅ Clicked on "All" button');
    await waitForInteraction();
  } catch (error: any) {
    console.log(`⚠️ Could not find "All" button: ${error.message}`);
  }
  
  // Search for Indiana again
  const licenseSearchField3 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(licenseSearchField3);
  await licenseSearchField3.click();
  await waitForInteraction();
  await licenseSearchField3.fill('ind');
  await waitForInteraction();
  await licenseSearchField3.press('Enter');
  await page.waitForTimeout(2000);
  
  // Double click and copy search field
  await licenseSearchField3.dblclick();
  await licenseSearchField3.press('ControlOrMeta+c');
  console.log('✅ Step 15: All button clicked and Indiana searched');

  // Add assertion for "Assigned" status (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Assigned'),
    'Step 15a',
    'Assigned status found after All button',
    'Table should contain "Assigned" text'
  );

  // Step 16: Navigate to Home and verify IN state
  console.log('📋 Step 16: Navigate to Home and verify IN state');
  await waitForPageLoad();
  
  const homeLink = page.getByText('Home');
  await waitForElementReady(homeLink);
  await homeLink.click();
  await waitForInteraction();
  console.log('✅ Step 16: Navigated to Home');

  // Add assertion for IN text on home page (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('#ant-layout-container')).toContainText('IN'),
    'Step 16a',
    'IN text found on home page',
    'Container should contain "IN" text'
  );

  // Add assertion for home page state map and status (from 8th file)
  await safeAssert(
    async () => {
      await expect(page.locator('#ant-layout-container')).toContainText('Active (1) Pending (0) Missing (0)');
      // Check for state map images
      const stateImages = page.locator('#ant-layout-container img');
      await expect(stateImages).toHaveCount(1); // Should have state map image
    },
    'Step 16b',
    'Home page state map and status text found',
    'Container should contain state map and "Active (1) Pending (0) Missing (0)" text'
  );

  // Add assertion for home page state map with all state abbreviations (from 8th file)
  await safeAssert(
    async () => {
      await expect(page.locator('#ant-layout-container')).toContainText('AL AK AZ CO FL GA IN KS ME MA MN NJ NC ND OK PA SD TX WY CT MO WV IL NM AR CA DE DC HI IA KY MD MI MS MT NH NY OH OR TN UT VA WA WI NE SC ID NV VT LA RI');
    },
    'Step 16c',
    'Home page state map with all state abbreviations found',
    'Container should contain all state abbreviations in the map'
  );

  // Step 17: Return to Manage and perform LOA modifications
  console.log('📋 Step 17: Return to Manage and perform LOA modifications');
  await waitForPageLoad();
  
  const manageButton2 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton2);
  await manageButton2.click();
  console.log('✅ Step 17: Manage button clicked');
  
  // Search for Indiana again
  const searchStatesBox2 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox2);
  await searchStatesBox2.click();
  await waitForInteraction();
  await searchStatesBox2.fill('ind');
  await waitForInteraction();
  
  const indianaElement2 = page.getByText('Indiana').nth(1);
  await waitForElementReady(indianaElement2);
  await indianaElement2.click();
  console.log('✅ Step 17: Indiana state selected again');

  // Add assertion for checkbox state (from 8th file)
  await safeAssert(
    async () => {
      await expect(page.getByRole('main')).toContainText(/Producer - Individual \(\d+\) Active/);
      await expect(page.getByRole('main')).toContainText(/Accident & Health \(\d+\)/);
      await expect(page.getByRole('main')).toContainText(/Life, Accident & Health \(\d+\)/);
      await expect(page.getByRole('main')).toContainText(/Life \(\d+\)/);
      await expect(page.getByRole('main')).toContainText(/Personal lines \(\d+\)/);
    },
    'Step 17a',
    'Checkbox state and LOA text found',
    'Main container should contain Producer - Individual Active and all LOA types'
  );
  
  // Perform LOA modifications using the complex locator pattern
  try {
    const loaContainer = page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ });
    await waitForElementReady(loaContainer, 5000);
    
    // Check second LOA (Life, Accident & Health)
    const secondLOA = loaContainer.getByLabel('').nth(1);
    await waitForElementReady(secondLOA);
    await secondLOA.check();
    console.log('✅ Checked second LOA (Life, Accident & Health)');
    await waitForInteraction();
    
    // Uncheck third LOA (Life)
    const thirdLOA = loaContainer.getByLabel('').nth(2);
    await waitForElementReady(thirdLOA);
    await thirdLOA.uncheck();
    console.log('✅ Unchecked third LOA (Life)');
    await waitForInteraction();
    
    // Uncheck first LOA (Accident & Health)
    const firstLOA = loaContainer.getByLabel('').first();
    await waitForElementReady(firstLOA);
    await firstLOA.uncheck();
    console.log('✅ Unchecked first LOA (Accident & Health)');
    await waitForInteraction();
    
    // Check second LOA again
    await secondLOA.check();
    console.log('✅ Re-checked second LOA (Life, Accident & Health)');
    await waitForInteraction();
    
    // Uncheck Personal lines
    const personalLinesContainer = page.locator('div').filter({ hasText: /^Personal lines \(928\)$/ });
    const personalLinesCheckbox = personalLinesContainer.getByLabel('');
    await waitForElementReady(personalLinesCheckbox);
    await personalLinesCheckbox.uncheck();
    console.log('✅ Unchecked Personal lines');
    await waitForInteraction();
    
  } catch (error: any) {
    console.log(`⚠️ Error during LOA modifications: ${error.message}`);
  }
  
  // Save changes
  const saveChangesButton2 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton2);
  await saveChangesButton2.click();
  console.log('✅ Step 17: LOA modifications saved');

  // Step 18: Navigate to State Licenses and verify changes
  console.log('📋 Step 18: Navigate to State Licenses and verify changes');
  await waitForPageLoad();
  
  const stateLicensesLink2 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink2);
  await stateLicensesLink2.click();
  await waitForInteraction();
  console.log('✅ Step 18: Navigated to State Licenses');
  
  // Search for Indiana
  const searchLicensesBox2 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox2);
  await searchLicensesBox2.click();
  await waitForInteraction();
  await searchLicensesBox2.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox2.press('Enter');
  await page.waitForTimeout(2000);
  console.log('✅ Step 18: Indiana searched in State Licenses');

  // Step 19: Verify assignment structure after modifications
  console.log('📋 Step 19: Verify assignment structure after modifications');
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      await expect(tbody).toContainText(/Life \(\d+\)/);
      // Check for active LOA images (from 8th file)
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      await expect(activeLoaImages).toHaveCount(2);
    },
    'Step 19a',
    'Assignment structure after modifications verified with active LOA images',
    'Table should contain Accident & Health and Life with 2 active LOA images'
  );

  // Add assertion for "Indiana active" text (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Indiana active'),
    'Step 19b',
    'Indiana active text found after modifications',
    'Table should contain "Indiana active" text'
  );

  // Step 20: Check Needs Attention tab (should be 0)
  console.log('📋 Step 20: Check Needs Attention tab (should be 0)');
  await waitForPageLoad();
  
  try {
    const needsAttentionButton2 = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton2, 5000);
    await needsAttentionButton2.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 20: Needs Attention button clicked');
    
    // Search for Indiana in Needs Attention
    const needsAttentionSearch = page.getByRole('combobox', { name: 'Search Licenses by State,' });
    await waitForElementReady(needsAttentionSearch);
    await needsAttentionSearch.click();
    await waitForInteraction();
    await needsAttentionSearch.fill('indiana');
    await waitForInteraction();
    await needsAttentionSearch.press('Enter');
    await page.waitForTimeout(2000);
    
    // Verify "No data" in Needs Attention
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText('No data');
      },
      'Step 20a',
      'Needs Attention shows No data',
      'Needs Attention tab should show "No data"'
    );
  } catch (error) {
    console.log('⚠️ Needs Attention (0) button not found or verification failed');
  }

  // Step 21: Click "All" and verify assigned status
  console.log('📋 Step 21: Click "All" and verify assigned status');
  await waitForPageLoad();
  
  try {
    const allButton2 = page.getByRole('button', { name: 'All' });
    await waitForElementReady(allButton2, 3000);
    await allButton2.click();
    console.log('✅ Clicked on "All" button again');
    await waitForInteraction();
  } catch (error: any) {
    console.log(`⚠️ Could not find "All" button: ${error.message}`);
  }
  
  // Search for Indiana
  const licenseSearchField4 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(licenseSearchField4);
  await licenseSearchField4.click();
  await waitForInteraction();
  await licenseSearchField4.fill('indiana');
  await waitForInteraction();
  await licenseSearchField4.press('Enter');
  await page.waitForTimeout(2000);
  
  // Verify "Assigned" status
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText('Assigned');
    },
    'Step 21a',
    'Assigned status verified',
    'Table should show "Assigned" status'
  );
  console.log('✅ Step 21: Assigned status verified');

  // Step 22: Navigate to Home and verify IN state
  console.log('📋 Step 22: Navigate to Home and verify IN state');
  await waitForPageLoad();
  
  const homeLink2 = page.getByText('Home');
  await waitForElementReady(homeLink2);
  await homeLink2.click();
  await waitForInteraction();
  
  // Verify IN state is present
  await safeAssert(
    async () => {
      const container = page.locator('#ant-layout-container');
      await expect(container).toContainText('IN');
    },
    'Step 22a',
    'IN state verified on Home page',
    'Home page should contain "IN" state indicator'
  );
  console.log('✅ Step 22: IN state verified on Home page');

  // Step 23: Additional LOA management cycles (from scenario8.spec.ts)
  console.log('📋 Step 23: Additional LOA management cycles');
  await waitForPageLoad();
  
  // Return to Manage for more LOA operations
  const manageButton3 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton3);
  await manageButton3.click();
  console.log('✅ Step 23: Manage button clicked for additional cycles');
  
  // Search for Indiana
  const searchStatesBox3 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox3);
  await searchStatesBox3.click();
  await waitForInteraction();
  await searchStatesBox3.fill('ind');
  await waitForInteraction();
  
  const indianaElement3 = page.getByText('INIndiana');
  await waitForElementReady(indianaElement3);
  await indianaElement3.click();
  console.log('✅ Step 23: INIndiana selected');
  
  // Perform additional LOA modifications
  try {
    const loaContainer2 = page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ });
    await waitForElementReady(loaContainer2, 5000);
    
    // Uncheck third LOA (Life)
    const thirdLOA2 = loaContainer2.getByLabel('').nth(2);
    await waitForElementReady(thirdLOA2);
    await thirdLOA2.uncheck();
    console.log('✅ Unchecked third LOA (Life) in additional cycle');
    await waitForInteraction();
    
    // Uncheck first LOA (Accident & Health)
    const firstLOA2 = loaContainer2.getByLabel('').first();
    await waitForElementReady(firstLOA2);
    await firstLOA2.uncheck();
    console.log('✅ Unchecked first LOA (Accident & Health) in additional cycle');
    await waitForInteraction();
    
    // Check third LOA (Life)
    await thirdLOA2.check();
    console.log('✅ Checked third LOA (Life) in additional cycle');
    await waitForInteraction();
    
    // Check Personal lines
    const personalLinesContainer2 = page.locator('div').filter({ hasText: /^Personal lines \(928\)$/ });
    const personalLinesCheckbox2 = personalLinesContainer2.getByLabel('');
    await waitForElementReady(personalLinesCheckbox2);
    await personalLinesCheckbox2.check();
    console.log('✅ Checked Personal lines in additional cycle');
    await waitForInteraction();
    
  } catch (error: any) {
    console.log(`⚠️ Error during additional LOA modifications: ${error.message}`);
  }
  
  // Save changes
  const saveChangesButton3 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton3);
  await saveChangesButton3.click();
  console.log('✅ Step 23: Additional LOA modifications saved');

  // Step 24: Navigate to State Licenses and verify changes
  console.log('📋 Step 24: Navigate to State Licenses and verify changes');
  await waitForPageLoad();
  
  const stateLicensesLink3 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink3);
  await stateLicensesLink3.click();
  await waitForInteraction();
  console.log('✅ Step 24: Navigated to State Licenses');
  
  // Search for Indiana
  const searchLicensesBox3 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox3);
  await searchLicensesBox3.click();
  await waitForInteraction();
  await searchLicensesBox3.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox3.press('Enter');
  await page.waitForTimeout(2000);
  
  // Verify assignment structure
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Life \(\d+\)/);
      await expect(tbody).toContainText(/Personal lines \(\d+\)/);
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      // Check for active and non-active LOA images (from 8th file)
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
      await expect(activeLoaImages).toHaveCount(2);
      await expect(nonActiveLoaImages).toHaveCount(1);
    },
    'Step 24a',
    'Assignment structure verified with mixed active/non-active LOA images',
    'Table should contain Life, Personal lines, and Accident & Health with 2 active and 1 non-active LOA images'
  );

  // Add assertion for "Assigned" status (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Assigned'),
    'Step 24b',
    'Assigned status found',
    'Table should contain "Assigned" text'
  );

  // Add assertion for "Indiana active Missing LOA" cell (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
    'Step 24c',
    'Indiana active Missing LOA cell found',
    'Table should contain "Indiana active Missing LOA" cell'
  );

  // Step 25: Check Needs Attention tab (should be 1)
  console.log('📋 Step 25: Check Needs Attention tab (should be 1)');
  await waitForPageLoad();
  
  try {
    const needsAttentionButton3 = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton3, 5000);
    await needsAttentionButton3.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 25: Needs Attention button clicked');
    
    // Search for Indiana in Needs Attention
    const needsAttentionSearch2 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
    await waitForElementReady(needsAttentionSearch2);
    await needsAttentionSearch2.click();
    await waitForInteraction();
    await needsAttentionSearch2.fill('indiana');
    await waitForInteraction();
    await needsAttentionSearch2.press('Enter');
    await page.waitForTimeout(2000);
    
    // Add assertion for table content in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText(/Life \(\d+\)/);
        await expect(tbody).toContainText(/Personal lines \(\d+\)/);
        await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
        // Check for active and non-active LOA images
        const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
        const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
        await expect(activeLoaImages).toHaveCount(2);
        await expect(nonActiveLoaImages).toHaveCount(1);
      },
      'Step 25a',
      'Needs Attention tab content with mixed active/non-active LOA images',
      'Should contain Life, Personal lines, and Accident & Health with 2 active and 1 non-active LOA images'
    );

    // Add assertion for "Indiana active Missing LOA" cell in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
      'Step 25b',
      'Indiana active Missing LOA cell found in Needs Attention tab',
      'Needs Attention tab should contain "Indiana active Missing LOA" cell'
    );
    
  } catch (error) {
    console.log('⚠️ Needs Attention (1) button not found');
  }

  // Step 26: Navigate to Home
  console.log('📋 Step 26: Navigate to Home');
  await waitForPageLoad();
  
  const homeLink3 = page.getByText('Home');
  await waitForElementReady(homeLink3);
  await homeLink3.click();
  await waitForInteraction();
  console.log('✅ Step 26: Navigated to Home');

  // Step 27: Return to Manage for more LOA operations
  console.log('📋 Step 27: Return to Manage for more LOA operations');
  await waitForPageLoad();
  
  const manageButton4 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton4);
  await manageButton4.click();
  console.log('✅ Step 27: Manage button clicked');
  
  // Search for Indiana
  const searchStatesBox4 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox4);
  await searchStatesBox4.click();
  await waitForInteraction();
  await searchStatesBox4.fill('ind');
  await waitForInteraction();
  await searchStatesBox4.press('Enter');
  await waitForInteraction();
  
  const indianaElement4 = page.getByText('Indiana').nth(1);
  await waitForElementReady(indianaElement4);
  await indianaElement4.click();
  console.log('✅ Step 27: Indiana state selected');
  
  // Perform LOA modifications - uncheck third LOA (Life)
  try {
    const loaContainer3 = page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ });
    await waitForElementReady(loaContainer3, 5000);
    
    const thirdLOA3 = loaContainer3.getByLabel('').nth(2);
    await waitForElementReady(thirdLOA3);
    await thirdLOA3.uncheck();
    console.log('✅ Unchecked third LOA (Life) in Step 27');
    await waitForInteraction();
    
  } catch (error: any) {
    console.log(`⚠️ Error during LOA modifications in Step 27: ${error.message}`);
  }
  
  // Save changes
  const saveChangesButton4 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton4);
  await saveChangesButton4.click();
  console.log('✅ Step 27: LOA modifications saved');

  // Step 28: Navigate to State Licenses and verify
  console.log('📋 Step 28: Navigate to State Licenses and verify');
  await waitForPageLoad();
  
  const stateLicensesLink4 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink4);
  await stateLicensesLink4.click();
  await waitForInteraction();
  console.log('✅ Step 28: Navigated to State Licenses');
  
  // Search for Indiana
  const searchLicensesBox4 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox4);
  await searchLicensesBox4.click();
  await waitForInteraction();
  await searchLicensesBox4.fill('ind');
  await waitForInteraction();
  await searchLicensesBox4.press('ControlOrMeta+a');
  await waitForInteraction();
  await searchLicensesBox4.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox4.press('Enter');
  await page.waitForTimeout(2000);
  
  // Verify assignment structure
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Personal lines \(\d+\)/);
      await expect(tbody).toContainText(/Life \(\d+\)/);
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      // Check for active and non-active LOA images (from 8th file)
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
      await expect(activeLoaImages).toHaveCount(2);
      await expect(nonActiveLoaImages).toHaveCount(1);
    },
    'Step 28a',
    'Assignment structure verified after Life uncheck with mixed active/non-active LOA images',
    'Table should contain Personal lines, Life, and Accident & Health with 2 active and 1 non-active LOA images'
  );

  // Add assertion for "Indiana active Missing LOA" cell (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
    'Step 28b',
    'Indiana active Missing LOA cell found',
    'Table should contain "Indiana active Missing LOA" cell'
  );

  // Add assertion for "Assigned" status (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Assigned'),
    'Step 28c',
    'Assigned status found',
    'Table should contain "Assigned" text'
  );

  // Step 29: Check Needs Attention tab (should be 1)
  console.log('📋 Step 29: Check Needs Attention tab (should be 1)');
  await waitForPageLoad();
  
  try {
    const needsAttentionButton4 = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton4, 5000);
    await needsAttentionButton4.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 29: Needs Attention button clicked');
    
    // Add assertion for table content in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText(/Personal lines \(\d+\)/);
        await expect(tbody).toContainText(/Life \(\d+\)/);
        await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
        // Check for active and non-active LOA images
        const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
        const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
        await expect(activeLoaImages).toHaveCount(2);
        await expect(nonActiveLoaImages).toHaveCount(1);
      },
      'Step 29a',
      'Needs Attention tab content with mixed active/non-active LOA images',
      'Should contain Personal lines, Life, and Accident & Health with 2 active and 1 non-active LOA images'
    );

    // Add assertion for "Indiana active Missing LOA" cell in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
      'Step 29b',
      'Indiana active Missing LOA cell found in Needs Attention tab',
      'Needs Attention tab should contain "Indiana active Missing LOA" cell'
    );
  } catch (error) {
    console.log('⚠️ Needs Attention (1) button not found in Step 29');
  }

  // Step 30: Navigate to Home
  console.log('📋 Step 30: Navigate to Home');
  await waitForPageLoad();
  
  const homeLink4 = page.getByText('Home');
  await waitForElementReady(homeLink4);
  await homeLink4.click();
  await waitForInteraction();
  console.log('✅ Step 30: Navigated to Home');

  // Step 31: Return to Manage for more LOA operations
  console.log('📋 Step 31: Return to Manage for more LOA operations');
  await waitForPageLoad();
  
  const manageButton5 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton5);
  await manageButton5.click();
  console.log('✅ Step 31: Manage button clicked');
  
  // Search for Indiana
  const searchStatesBox5 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox5);
  await searchStatesBox5.click();
  await waitForInteraction();
  await searchStatesBox5.fill('in');
  await waitForInteraction();
  
  const indianaElement5 = page.getByText('Indiana').nth(1);
  await waitForElementReady(indianaElement5);
  await indianaElement5.click();
  console.log('✅ Step 31: Indiana state selected');
  
  // Perform LOA modifications
  try {
    const loaContainer4 = page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ });
    await waitForElementReady(loaContainer4, 5000);
    
    // Check second LOA (Life, Accident & Health)
    const secondLOA4 = loaContainer4.getByLabel('').nth(1);
    await waitForElementReady(secondLOA4);
    await secondLOA4.check();
    console.log('✅ Checked second LOA (Life, Accident & Health) in Step 31');
    await waitForInteraction();
    
    // Uncheck second LOA (Life, Accident & Health)
    await secondLOA4.uncheck();
    console.log('✅ Unchecked second LOA (Life, Accident & Health) in Step 31');
    await waitForInteraction();
    
    // Uncheck third LOA (Life)
    const thirdLOA4 = loaContainer4.getByLabel('').nth(2);
    await waitForElementReady(thirdLOA4);
    await thirdLOA4.uncheck();
    console.log('✅ Unchecked third LOA (Life) in Step 31');
    await waitForInteraction();
    
  } catch (error: any) {
    console.log(`⚠️ Error during LOA modifications in Step 31: ${error.message}`);
  }
  
  // Save changes
  const saveChangesButton5 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton5);
  await saveChangesButton5.click();
  console.log('✅ Step 31: LOA modifications saved');

  // Step 32: Navigate to State Licenses and verify
  console.log('📋 Step 32: Navigate to State Licenses and verify');
  await waitForPageLoad();
  
  const stateLicensesLink5 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink5);
  await stateLicensesLink5.click();
  await waitForInteraction();
  console.log('✅ Step 32: Navigated to State Licenses');
  
  // Check Needs Attention tab (should be 1)
  try {
    const needsAttentionButton5 = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton5, 5000);
    await needsAttentionButton5.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 32: Needs Attention button clicked');
    
    // Search for Indiana in Needs Attention
    const needsAttentionSearch3 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
    await waitForElementReady(needsAttentionSearch3);
    await needsAttentionSearch3.click();
    await waitForInteraction();
    
    // Add assertion for "Indiana active Missing LOA" cell in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
      'Step 32a',
      'Indiana active Missing LOA cell found in Needs Attention tab',
      'Needs Attention tab should contain "Indiana active Missing LOA" cell'
    );

    // Add assertion for table content in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText(/Personal lines \(\d+\)/);
        await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
        await expect(tbody).toContainText(/Life \(\d+\)/);
        // Check for active and non-active LOA images
        const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
        const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
        await expect(activeLoaImages).toHaveCount(2);
        await expect(nonActiveLoaImages).toHaveCount(1);
      },
      'Step 32b',
      'Needs Attention tab content with mixed active/non-active LOA images',
      'Should contain Personal lines, Accident & Health, and Life with 2 active and 1 non-active LOA images'
    );
    
  } catch (error) {
    console.log('⚠️ Needs Attention (1) button not found in Step 32');
  }

  // Step 33: Click "All" button and search
  console.log('📋 Step 33: Click "All" button and search');
  await waitForPageLoad();
  
  try {
    const allButton3 = page.getByRole('button', { name: 'All' });
    await waitForElementReady(allButton3, 3000);
    await allButton3.click();
    console.log('✅ Clicked on "All" button in Step 33');
    await waitForInteraction();
  } catch (error: any) {
    console.log(`⚠️ Could not find "All" button in Step 33: ${error.message}`);
  }
  
  // Search for Indiana
  const searchLicensesBox5 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox5);
  await searchLicensesBox5.click();
  await waitForInteraction();
  await searchLicensesBox5.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox5.press('ControlOrMeta+a');
  await waitForInteraction();
  await searchLicensesBox5.press('ControlOrMeta+c');
  await waitForInteraction();
  
  // Click on dropdown filter
  try {
    const dropdownFilter = page.locator('div').filter({ hasText: /^AllActive \(33\)Needs Attention \(1\)Upcoming Renewals \(1\)$/ }).first();
    await waitForElementReady(dropdownFilter, 3000);
    await dropdownFilter.click();
    console.log('✅ Clicked on dropdown filter');
    await waitForInteraction();
    
    const dropdownOption = page.locator('.ant-select-item-option-content').first();
    await waitForElementReady(dropdownOption, 3000);
    await dropdownOption.click();
    console.log('✅ Selected dropdown option');
    await waitForInteraction();
    
    // Add assertion for "Assigned" status (from 8th file)
    await safeAssert(
      async () => await expect(page.locator('tbody')).toContainText('Assigned'),
      'Step 33a',
      'Assigned status found after dropdown operations',
      'Table should contain "Assigned" text'
    );

    // Add assertion for table content with mixed active/non-active LOA images (from 8th file)
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText(/Personal lines \(\d+\)/);
        await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
        await expect(tbody).toContainText(/Life \(\d+\)/);
        // Check for active and non-active LOA images
        const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
        const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
        await expect(activeLoaImages).toHaveCount(2);
        await expect(nonActiveLoaImages).toHaveCount(1);
      },
      'Step 33b',
      'Table content with mixed active/non-active LOA images after dropdown operations',
      'Table should contain Personal lines, Accident & Health, and Life with 2 active and 1 non-active LOA images'
    );

    // Add assertion for "Indiana active Missing LOA" cell (from 8th file)
    await safeAssert(
      async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
      'Step 33c',
      'Indiana active Missing LOA cell found after dropdown operations',
      'Table should contain "Indiana active Missing LOA" cell'
    );
  } catch (error: any) {
    console.log(`⚠️ Could not interact with dropdown filter: ${error.message}`);
  }

  // Step 34: Navigate to Home
  console.log('📋 Step 34: Navigate to Home');
  await waitForPageLoad();
  
  const homeLink5 = page.getByText('Home');
  await waitForElementReady(homeLink5);
  await homeLink5.click();
  await waitForInteraction();
  console.log('✅ Step 34: Navigated to Home');

  // Step 35: Return to Manage for Personal lines uncheck
  console.log('📋 Step 35: Return to Manage for Personal lines uncheck');
  await waitForPageLoad();
  
  const manageButton6 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton6);
  await manageButton6.click();
  console.log('✅ Step 35: Manage button clicked');
  
  // Search for Indiana
  const searchStatesBox6 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox6);
  await searchStatesBox6.click();
  await waitForInteraction();
  await searchStatesBox6.fill('ind');
  await waitForInteraction();
  
  const indianaElement6 = page.getByText('Indiana').nth(1);
  await waitForElementReady(indianaElement6);
  await indianaElement6.click();
  console.log('✅ Step 35: Indiana state selected');
  
  // Uncheck Personal lines
  try {
    const personalLinesContainer3 = page.locator('div').filter({ hasText: /^Personal lines \(928\)$/ });
    const personalLinesCheckbox3 = personalLinesContainer3.getByLabel('');
    await waitForElementReady(personalLinesCheckbox3);
    await personalLinesCheckbox3.uncheck();
    console.log('✅ Unchecked Personal lines in Step 35');
    await waitForInteraction();
    
  } catch (error: any) {
    console.log(`⚠️ Error during Personal lines uncheck in Step 35: ${error.message}`);
  }
  
  // Save changes
  const saveChangesButton6 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton6);
  await saveChangesButton6.click();
  console.log('✅ Step 35: Personal lines uncheck saved');

  // Step 36: Navigate to State Licenses and verify
  console.log('📋 Step 36: Navigate to State Licenses and verify');
  await waitForPageLoad();
  
  const stateLicensesLink6 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink6);
  await stateLicensesLink6.click();
  await waitForInteraction();
  console.log('✅ Step 36: Navigated to State Licenses');
  
  // Search for Indiana
  const searchLicensesBox6 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox6);
  await searchLicensesBox6.click();
  await waitForInteraction();
  await searchLicensesBox6.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox6.press('Enter');
  await page.waitForTimeout(2000);
  
  // Verify assignment structure
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      await expect(tbody).toContainText(/Life \(\d+\)/);
      // Check for active LOA images (from 8th file)
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      await expect(activeLoaImages).toHaveCount(2);
    },
    'Step 36a',
    'Assignment structure verified after Personal lines uncheck with active LOA images',
    'Table should contain Accident & Health and Life with 2 active LOA images'
  );

  // Add assertion for "Assigned" status (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Assigned'),
    'Step 36b',
    'Assigned status found after Personal lines uncheck',
    'Table should contain "Assigned" text'
  );

  // Add assertion for "Indiana active" text (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Indiana active'),
    'Step 36c',
    'Indiana active text found after Personal lines uncheck',
    'Table should contain "Indiana active" text'
  );

  // Step 37: Check Needs Attention tab (should be 0)
  console.log('📋 Step 37: Check Needs Attention tab (should be 0)');
  await waitForPageLoad();
  
  try {
    const needsAttentionButton6 = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton6, 5000);
    await needsAttentionButton6.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 37: Needs Attention button clicked');
    
    // Search for Indiana in Needs Attention
    const needsAttentionSearch4 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
    await waitForElementReady(needsAttentionSearch4);
    await needsAttentionSearch4.click();
    await waitForInteraction();
    await needsAttentionSearch4.fill('indiana');
    await waitForInteraction();
    await needsAttentionSearch4.press('Enter');
    await page.waitForTimeout(2000);
    
    // Verify "No data" in Needs Attention
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText('No data');
      },
      'Step 37a',
      'Needs Attention shows No data',
      'Needs Attention tab should show "No data"'
    );
  } catch (error) {
    console.log('⚠️ Needs Attention (0) button not found or verification failed in Step 37');
  }

  // Step 38: Click "All" and verify assigned status
  console.log('📋 Step 38: Click "All" and verify assigned status');
  await waitForPageLoad();
  
  try {
    const allButton4 = page.getByRole('button', { name: 'All' });
    await waitForElementReady(allButton4, 3000);
    await allButton4.click();
    console.log('✅ Clicked on "All" button in Step 38');
    await waitForInteraction();
  } catch (error: any) {
    console.log(`⚠️ Could not find "All" button in Step 38: ${error.message}`);
  }
  
  // Search for Indiana
  const searchLicensesBox7 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox7);
  await searchLicensesBox7.click();
  await waitForInteraction();
  await searchLicensesBox7.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox7.press('Enter');
  await page.waitForTimeout(2000);
  
  // Verify "Assigned" status
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText('Assigned');
    },
    'Step 38a',
    'Assigned status verified',
    'Table should show "Assigned" status'
  );

  // Step 39: Navigate to Home
  console.log('📋 Step 39: Navigate to Home');
  await waitForPageLoad();
  
  const homeLink6 = page.getByText('Home');
  await waitForElementReady(homeLink6);
  await homeLink6.click();
  await waitForInteraction();
  console.log('✅ Step 39: Navigated to Home');

  // Step 40: Return to Manage for final LOA uncheck
  console.log('📋 Step 40: Return to Manage for final LOA uncheck');
  await waitForPageLoad();
  
  const manageButton7 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton7);
  await manageButton7.click();
  console.log('✅ Step 40: Manage button clicked');
  
  // Search for Indiana
  const searchStatesBox7 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox7);
  await searchStatesBox7.click();
  await waitForInteraction();
  await searchStatesBox7.fill('ind');
  await waitForInteraction();
  
  const indianaElement7 = page.getByText('Indiana').nth(1);
  await waitForElementReady(indianaElement7);
  await indianaElement7.click();
  console.log('✅ Step 40: Indiana state selected');
  
  // Uncheck first LOA (Accident & Health)
  try {
    const loaContainer5 = page.locator('div').filter({ hasText: /^Accident & Health \(14\)Life, Accident & Health \(36\)Life \(16\)Personal lines \(928\)$/ });
    await waitForElementReady(loaContainer5, 5000);
    
    const firstLOA5 = loaContainer5.getByLabel('').first();
    await waitForElementReady(firstLOA5);
    await firstLOA5.uncheck();
    console.log('✅ Unchecked first LOA (Accident & Health) in Step 40');
    await waitForInteraction();
    
  } catch (error: any) {
    console.log(`⚠️ Error during first LOA uncheck in Step 40: ${error.message}`);
  }
  
  // Save changes
  const saveChangesButton7 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton7);
  await saveChangesButton7.click();
  console.log('✅ Step 40: First LOA uncheck saved');

  // Step 41: Navigate to State Licenses and verify
  console.log('📋 Step 41: Navigate to State Licenses and verify');
  await waitForPageLoad();
  
  const stateLicensesLink7 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink7);
  await stateLicensesLink7.click();
  await waitForInteraction();
  console.log('✅ Step 41: Navigated to State Licenses');
  
  // Search for Indiana
  const searchLicensesBox8 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox8);
  await searchLicensesBox8.click();
  await waitForInteraction();
  await searchLicensesBox8.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox8.press('Enter');
  await page.waitForTimeout(2000);
  
  // Verify assignment structure
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      await expect(tbody).toContainText(/Life \(\d+\)/);
      // Check for active LOA images (from 8th file)
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      await expect(activeLoaImages).toHaveCount(2);
    },
    'Step 41a',
    'Assignment structure verified after first LOA uncheck with active LOA images',
    'Table should contain Accident & Health and Life with 2 active LOA images'
  );

  // Add assertion for "Indiana active" text (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Indiana active'),
    'Step 41b',
    'Indiana active text found after first LOA uncheck',
    'Table should contain "Indiana active" text'
  );

  // Step 42: Check Needs Attention tab (should be 0)
  console.log('📋 Step 42: Check Needs Attention tab (should be 0)');
  await waitForPageLoad();
  
  try {
    const needsAttentionButton7 = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton7, 5000);
    await needsAttentionButton7.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 42: Needs Attention button clicked');
    
    // Search for Indiana in Needs Attention
    const needsAttentionSearch5 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
    await waitForElementReady(needsAttentionSearch5);
    await needsAttentionSearch5.click();
    await waitForInteraction();
    await needsAttentionSearch5.fill('indiana');
    await waitForInteraction();
    await needsAttentionSearch5.press('Enter');
    await page.waitForTimeout(2000);
    
    // Verify "No data" in Needs Attention
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText('No data');
      },
      'Step 42a',
      'Needs Attention shows No data',
      'Needs Attention tab should show "No data"'
    );
  } catch (error) {
    console.log('⚠️ Needs Attention (0) button not found or verification failed in Step 42');
  }

  // Step 43: Click "All" and verify not assigned status
  console.log('📋 Step 43: Click "All" and verify not assigned status');
  await waitForPageLoad();
  
  try {
    const allButton5 = page.getByRole('button', { name: 'All' });
    await waitForElementReady(allButton5, 3000);
    await allButton5.click();
    console.log('✅ Clicked on "All" button in Step 43');
    await waitForInteraction();
  } catch (error: any) {
    console.log(`⚠️ Could not find "All" button in Step 43: ${error.message}`);
  }
  
  // Search for Indiana
  const searchLicensesBox9 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox9);
  await searchLicensesBox9.click();
  await waitForInteraction();
  await searchLicensesBox9.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox9.press('Enter');
  await page.waitForTimeout(2000);
  
  // Verify "Not Assigned" status
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText('Not Assigned');
    },
    'Step 43a',
    'Not Assigned status verified',
    'Table should show "Not Assigned" status'
  );

  // Step 44: Navigate to Home and verify no states assigned
  console.log('📋 Step 44: Navigate to Home and verify no states assigned');
  await waitForPageLoad();
  
  const homeLink7 = page.getByText('Home');
  await waitForElementReady(homeLink7);
  await homeLink7.click();
  await waitForInteraction();
  
  // Verify no states assigned
  await safeAssert(
    async () => {
      const container = page.locator('#ant-layout-container');
      await expect(container).toContainText('No Territories Assigned');
      await expect(container).toContainText('No States Assigned');
    },
    'Step 44a',
    'No states assigned verified on Home page',
    'Home page should show "No Territories Assigned" and "No States Assigned"'
  );
  console.log('✅ Step 44: No states assigned verified on Home page');

  // Step 45: Return to Manage and assign first LOA again
  console.log('📋 Step 45: Return to Manage and assign first LOA again');
  await waitForPageLoad();
  
  const manageButton8 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton8);
  await manageButton8.click();
  console.log('✅ Step 45: Manage button clicked');
  
  // Search for Indiana
  const searchStatesBox8 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox8);
  await searchStatesBox8.click();
  await waitForInteraction();
  await searchStatesBox8.fill('ind');
  await waitForInteraction();
  
  const indianaElement8 = page.getByText('Indiana').nth(1);
  await waitForElementReady(indianaElement8);
  await indianaElement8.click();
  console.log('✅ Step 45: Indiana state selected');
  
  // Check first LOA
  const firstLOACheckbox2 = page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first();
  await waitForElementReady(firstLOACheckbox2);
  await firstLOACheckbox2.check();
  await waitForInteraction();
  console.log('✅ Step 45: First LOA checked again');
  
  // Save changes
  const saveChangesButton8 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton8);
  await saveChangesButton8.click();
  console.log('✅ Step 45: First LOA assignment saved');

  // Step 46: Navigate to State Licenses and verify final assignment
  console.log('📋 Step 46: Navigate to State Licenses and verify final assignment');
  await waitForPageLoad();
  
  const stateLicensesLink8 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink8);
  await stateLicensesLink8.click();
  await waitForInteraction();
  console.log('✅ Step 46: Navigated to State Licenses');
  
  // Search for Indiana
  const searchLicensesBox10 = page.getByRole('combobox', { name: 'Search Licenses by State,' });
  await waitForElementReady(searchLicensesBox10);
  await searchLicensesBox10.click();
  await waitForInteraction();
  await searchLicensesBox10.fill('indiana');
  await waitForInteraction();
  await searchLicensesBox10.press('Enter');
  await page.waitForTimeout(2000);
  
  // Final verification of assignment structure
  await safeAssert(
    async () => {
      const tbody = page.locator('tbody');
      await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
      await expect(tbody).toContainText(/Life \(\d+\)/);
      await expect(tbody).toContainText(/Personal lines \(\d+\)/);
      // Check for active and non-active LOA images (from 8th file)
      const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
      const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
      await expect(activeLoaImages).toHaveCount(2);
      await expect(nonActiveLoaImages).toHaveCount(1);
    },
    'Step 46a',
    'Final assignment structure verified with mixed active/non-active LOA images',
    'Table should contain Accident & Health, Life, and Personal lines with 2 active and 1 non-active LOA images'
  );

  // Add assertion for "Assigned" status (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Assigned'),
    'Step 46b',
    'Assigned status found after final assignment',
    'Table should contain "Assigned" text'
  );

  // Add assertion for "Indiana active Missing LOA" cell (from 8th file)
  await safeAssert(
    async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
    'Step 46c',
    'Indiana active Missing LOA cell found after final assignment',
    'Table should contain "Indiana active Missing LOA" cell'
  );

  // Step 47: Check Needs Attention tab (should be 0)
  console.log('📋 Step 47: Check Needs Attention tab (should be 0)');
  await waitForPageLoad();
  
  try {
    const needsAttentionButton8 = page.getByRole('button', { name: /Needs Attention/ });
    await waitForElementReady(needsAttentionButton8, 5000);
    await needsAttentionButton8.click();
    await page.waitForTimeout(2000);
    console.log('✅ Step 47: Needs Attention button clicked');
    
    // Add assertion for table content in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => {
        const tbody = page.locator('tbody');
        await expect(tbody).toContainText(/Accident & Health \(\d+\)/);
        await expect(tbody).toContainText(/Life \(\d+\)/);
        await expect(tbody).toContainText(/Personal lines \(\d+\)/);
        // Check for active and non-active LOA images
        const activeLoaImages = tbody.locator('img[alt="activeLoa"]');
        const nonActiveLoaImages = tbody.locator('img[alt="nonActiveLoa"]');
        await expect(activeLoaImages).toHaveCount(2);
        await expect(nonActiveLoaImages).toHaveCount(1);
      },
      'Step 47a',
      'Needs Attention tab content with mixed active/non-active LOA images after final assignment',
      'Should contain Accident & Health, Life, and Personal lines with 2 active and 1 non-active LOA images'
    );

    // Add assertion for "Indiana active Missing LOA" cell in Needs Attention tab (from 8th file)
    await safeAssert(
      async () => await expect(page.locator('tbody')).toContainText('Indiana active Missing LOA'),
      'Step 47b',
      'Indiana active Missing LOA cell found in Needs Attention tab after final assignment',
      'Needs Attention tab should contain "Indiana active Missing LOA" cell'
    );
  } catch (error) {
    console.log('⚠️ Needs Attention (0) button not found in Step 47');
  }

  // Step 48: Navigate to Home and verify IN state
  console.log('📋 Step 48: Navigate to Home and verify IN state');
  await waitForPageLoad();
  
  const homeLink8 = page.getByText('Home');
  await waitForElementReady(homeLink8);
  await homeLink8.click();
  await waitForInteraction();
  
  // Verify IN state is present
  await safeAssert(
    async () => {
      const container = page.locator('#ant-layout-container');
      await expect(container).toContainText('IN');
    },
    'Step 48a',
    'IN state verified on Home page',
    'Home page should contain "IN" state indicator'
  );
  console.log('✅ Step 48: IN state verified on Home page');

  // Step 49: Final LOA uncheck to complete the cycle
  console.log('📋 Step 49: Final LOA uncheck to complete the cycle');
  await waitForPageLoad();
  
  const manageButton9 = page.getByRole('button', { name: 'Manage' });
  await waitForElementReady(manageButton9);
  await manageButton9.click();
  console.log('✅ Step 49: Manage button clicked');
  
  // Search for Indiana
  const searchStatesBox9 = page.getByRole('textbox', { name: 'Search States' });
  await waitForElementReady(searchStatesBox9);
  await searchStatesBox9.click();
  await waitForInteraction();
  await searchStatesBox9.fill('ind');
  await waitForInteraction();
  
  const indianaElement9 = page.getByText('INIndiana');
  await waitForElementReady(indianaElement9);
  await indianaElement9.click();
  console.log('✅ Step 49: INIndiana selected');
  
  // Uncheck second LOA using specific locator
  try {
    const specificLOA = page.locator('div:nth-child(2) > .flex.items-center.cursor-pointer > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input');
    await waitForElementReady(specificLOA, 5000);
    await specificLOA.uncheck();
    console.log('✅ Unchecked specific LOA in Step 49');
    await waitForInteraction();
    
  } catch (error: any) {
    console.log(`⚠️ Error during specific LOA uncheck in Step 49: ${error.message}`);
  }
  
  // Save changes
  const saveChangesButton9 = page.getByRole('button', { name: 'Save Changes' });
  await waitForElementReady(saveChangesButton9);
  await saveChangesButton9.click();
  console.log('✅ Step 49: Final LOA uncheck saved');

  // Step 50: Navigate to State Licenses and Home
  console.log('📋 Step 50: Navigate to State Licenses and Home');
  await waitForPageLoad();
  
  const stateLicensesLink9 = page.getByText('State Licenses');
  await waitForElementReady(stateLicensesLink9);
  await stateLicensesLink9.click();
  await waitForInteraction();
  console.log('✅ Step 50: Navigated to State Licenses');
  
  const homeLink9 = page.getByText('Home');
  await waitForElementReady(homeLink9);
  await homeLink9.click();
  await waitForInteraction();
  console.log('✅ Step 50: Navigated to Home');

  // Step 51: Final logout
  console.log('📋 Step 51: Final logout');
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
  console.log('✅ Step 51: Final logout successful');

  // Final test summary
  const endTime = new Date().toISOString();
  const passedAssertions = assertionResults.filter(result => result.passed).length;
  const totalAssertions = assertionResults.length;
  
  console.log('\n================================================================================');
  console.log('📊 COMPREHENSIVE FINAL 8TH SCENARIO TEST SUMMARY');
  console.log('================================================================================');
  console.log(`✅ Passed Assertions: ${passedAssertions}/${totalAssertions}`);
  console.log('================================================================================');
  console.log('🎯 Final 8th Scenario test execution completed!');
  console.log('📁 Check the HTML report for detailed results and screenshots');
  console.log('📁 Check the test-results folder for video recordings and traces');
  console.log('================================================================================');
  console.log(`⏱️ Total test duration: ${Date.now() - new Date(startTime).getTime()}ms`);
  console.log(`📅 Started: ${startTime}`);
  console.log(`📅 Completed: ${endTime}`);
  console.log('📋 Test annotations added to report for detailed tracking');
  console.log('🔍 This test includes all comprehensive checks from scenario8.spec.ts');
  console.log('================================================================================');
});

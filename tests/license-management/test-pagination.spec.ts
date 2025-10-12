import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Pagination Test', () => {
  let page: Page;

  // Helper function to wait for element to be visible and clickable
  const waitForElementReady = async (locator: any, timeout: number = 3000) => {
    try {
      if (page.isClosed()) {
        console.log('⚠️ Page is closed, cannot wait for element');
        return false;
      }
      
      await locator.waitFor({ state: 'visible', timeout });
      await locator.waitFor({ state: 'attached', timeout: 2000 });
      return true;
    } catch (error) {
      console.log(`⏱️ Element not ready, waiting 500ms...`);
      if (!page.isClosed()) {
        await page.waitForTimeout(500);
      }
      try {
        if (!page.isClosed()) {
          await locator.waitFor({ state: 'visible', timeout: 2000 });
          return true;
        }
      } catch (retryError) {
        console.log(`⚠️ Element still not ready after retry`);
        return false;
      }
      return false;
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

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    
    // Login
    await page.goto('https://insuretrek.dev.ui.foxsenseprojects.com/');
    await waitForPageLoad();
    
    // Wait for email input to be ready
    const emailInput = page.getByRole('textbox', { name: 'Enter Email address' });
    await waitForElementReady(emailInput);
    await emailInput.click();
    await waitForInteraction();
    await emailInput.fill('rolex+local@test.com');
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
    console.log('✅ Login successful');
    
    // Wait for login to complete and page to load
    await waitForPageLoad();
    await page.waitForTimeout(2000);
    
    // Navigate to State Licenses
    const adminButton = page.getByRole('button', { name: 'InsureTrek Agency, LLC Admin' });
    await waitForElementReady(adminButton);
    await adminButton.click();
    await waitForInteraction();
    
    const agencyLink = page.getByText('Jpatterson Agency LLC');
    await waitForElementReady(agencyLink);
    await agencyLink.click();
    await waitForInteraction();
    
    const manageProducersLink = page.getByText('Manage Producers');
    await waitForElementReady(manageProducersLink);
    await manageProducersLink.click();
    await waitForInteraction();
    
    const stateLicensesLink = page.getByText('State Licenses');
    await waitForElementReady(stateLicensesLink);
    await stateLicensesLink.click();
    await waitForInteraction();
    
    // Wait for the table to load
    await page.waitForSelector('table', { timeout: 10000 });
    await waitForPageLoad();
  });

  test('should test pagination XPath and save data', async () => {
    console.log('🔄 Testing pagination with XPath...');
    
    // First, let's check if the pagination element exists
    const paginationElement = page.locator("//ul[@class='ant-pagination css-dev-only-do-not-override-1fvgrqi']");
    const paginationExists = await paginationElement.count() > 0;
    console.log(`📄 Pagination element exists: ${paginationExists}`);
    
    if (paginationExists) {
      // Get current page number
      const currentPageElement = page.locator("//ul[@class='ant-pagination css-dev-only-do-not-override-1fvgrqi']//li[@class='ant-pagination-item ant-pagination-item-active']");
      const currentPageText = await currentPageElement.textContent();
      console.log(`📄 Current page: ${currentPageText}`);
      
      // Check next button
      const nextBtn = page.locator("//ul[@class='ant-pagination css-dev-only-do-not-override-1fvgrqi']//li[@class='ant-pagination-next']");
      const nextBtnExists = await nextBtn.count() > 0;
      console.log(`➡️ Next button exists: ${nextBtnExists}`);
      
      if (nextBtnExists) {
        const isDisabled = await nextBtn.evaluate(el => el.classList.contains('ant-pagination-disabled'));
        console.log(`➡️ Next button disabled: ${isDisabled}`);
        
        if (!isDisabled) {
          console.log('🔄 Clicking next button...');
          await nextBtn.click();
          await waitForInteraction();
          await waitForPageLoad();
          
          // Check new page number
          const newPageText = await currentPageElement.textContent();
          console.log(`📄 New page: ${newPageText}`);
        }
      }
    }
    
    // Scrape current page data
    const rows = await page.$$eval('table tbody tr', (trs) =>
      trs.map(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        return cells.map(td => td.textContent?.trim() || '');
      })
    );
    
    console.log(`📊 Scraped ${rows.length} rows from current page`);
    
    // Save test data
    const dataDir = path.join(__dirname, '..', '..', 'scraped-data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `pagination-test-${timestamp}.json`;
    const filePath = path.join(dataDir, filename);
    
    const testData = {
      timestamp: new Date().toISOString(),
      paginationExists,
      currentPage: currentPageText,
      totalRows: rows.length,
      sampleData: rows.slice(0, 3) // First 3 rows as sample
    };
    
    fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));
    console.log(`💾 Test data saved to: ${filePath}`);
    
    expect(rows.length).toBeGreaterThan(0);
  });
});

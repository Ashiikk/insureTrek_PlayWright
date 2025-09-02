import { Page, expect } from '@playwright/test';

export class StateLicensesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToStateLicenses() {
    // Wait for State Licenses element to be visible and clickable
    const stateLicensesElement = this.page.getByText('State Licenses');
    await stateLicensesElement.waitFor({ state: 'visible', timeout: 30000 });
    await stateLicensesElement.click();
    
    // Wait for the page to load instead of arbitrary timeout
    await this.page.waitForSelector('table', { timeout: 30000 });
  }

  async filterByState(state: string) {
    // Wait for search box to be visible
    const searchBox = this.page.getByRole('combobox', { name: 'Search Licenses by State,' });
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    
    // Clear existing content and fill
    await searchBox.clear();
    await searchBox.fill(state);
    
    // Wait for search results to appear instead of arbitrary timeout
    await this.page.waitForSelector('text=ind in: State', { timeout: 30000 });
    
    await searchBox.press('Enter');
    
    // Wait for actual data rows (exclude hidden measurement rows)
    await this.page.waitForSelector('table tbody tr:not([aria-hidden="true"]):has(td)', { timeout: 30000 });
  }

  async verifyLOA(expectedText: string) {
    // Wait for LOA text to be visible before verification
    const loaElement = this.page.getByText(expectedText);
    await loaElement.waitFor({ state: 'visible', timeout: 30000 });
    
    // Take a screenshot before verification
    await this.page.screenshot({ 
      path: `test-results/loa-verification-before-${Date.now()}.png`,
      fullPage: true 
    });
    
    // Perform the assertion
    await expect(loaElement).toBeVisible();
    
    // Take a screenshot after successful verification
    await this.page.screenshot({ 
      path: `test-results/loa-verification-after-${Date.now()}.png`,
      fullPage: true 
    });
    
    console.log(`✅ LOA verification successful: "${expectedText}"`);
  }

  // Method to take screenshots at key points
  async takeVerificationScreenshot(description: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `test-results/verification-${description}-${timestamp}.png`;
    
    await this.page.screenshot({ 
      path: filename,
      fullPage: true 
    });
    
    console.log(`📸 Screenshot saved: ${filename}`);
    return filename;
  }
}

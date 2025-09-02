import { Page } from '@playwright/test';

export class ManageProducersPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchAndOpenProducer(name: string) {
    // Wait for search box to be visible
    const searchBox = this.page.getByRole('combobox', { name: 'Search by Producer or NPN' });
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    
    // Check if search box is enabled, if not, skip search and find producer directly
    const isDisabled = await searchBox.isDisabled();
    
    if (!isDisabled) {
      await searchBox.fill(name);
      await this.page.waitForTimeout(2000);
      await searchBox.press('Enter');
      await this.page.waitForTimeout(2000);
    }
    
    // Wait for producer name to be visible and clickable - use the first clickable span
    const producerElement = this.page.locator('span.cursor-pointer').filter({ hasText: name }).first();
    await producerElement.waitFor({ state: 'visible', timeout: 30000 });
    await producerElement.click();
    await this.page.waitForTimeout(2000);
  }

  async clickManageButton() {
    // Wait for Manage button to be visible and clickable
    const manageButton = this.page.getByRole('button', { name: 'Manage' });
    await manageButton.waitFor({ state: 'visible', timeout: 30000 });
    await manageButton.click();
    await this.page.waitForTimeout(2000);
  }

  async selectState(stateName: string) {
    console.log(`🗺️ Searching and selecting state: ${stateName}`);
    
    // Always clear and search for the state - this ensures we can find it
    const stateSearchBox = this.page.getByRole('textbox', { name: 'Search States' });
    await stateSearchBox.waitFor({ state: 'visible', timeout: 30000 });
    
    // Clear any existing text first
    await stateSearchBox.clear();
    await this.page.waitForTimeout(1000);
    
    // Fill with the state name
    await stateSearchBox.fill(stateName);
    await this.page.waitForTimeout(2000);
    
    // Wait for state name to be visible and clickable
    // Use a more specific selector to find the state in the dropdown
    const stateElement = this.page.getByText(stateName, { exact: true }).first();
    
    try {
      await stateElement.waitFor({ state: 'visible', timeout: 10000 });
      await stateElement.click();
      console.log(`✅ State ${stateName} selected successfully`);
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log(`⚠️ Could not find exact match for ${stateName}, trying alternative selector...`);
      
      // Fallback: try to find state with partial text match
      const fallbackStateElement = this.page.locator('div').filter({ hasText: stateName }).first();
      await fallbackStateElement.waitFor({ state: 'visible', timeout: 10000 });
      await fallbackStateElement.click();
      console.log(`✅ State ${stateName} selected using fallback selector`);
      await this.page.waitForTimeout(2000);
    }
  }

  async toggleLOA(index: number) {
    // Wait for LOA checkbox to be visible
    const loaCheckbox = this.page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').nth(index);
    await loaCheckbox.waitFor({ state: 'visible', timeout: 30000 });
    
    // Check if checkbox is enabled before clicking
    const isDisabled = await loaCheckbox.isDisabled();
    
    if (!isDisabled) {
      await loaCheckbox.click();
      await this.page.waitForTimeout(2000);
    } else {
      // Log or handle disabled checkbox - skip this LOA
      console.log(`LOA checkbox at index ${index} is disabled, skipping...`);
    }
  }

  // New method to toggle only enabled LOAs
  async toggleEnabledLOA(index: number) {
    // More specific selector for enabled checkboxes only
    const enabledCheckboxes = this.page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input:not([disabled])');
    
    // Count how many enabled checkboxes exist
    const count = await enabledCheckboxes.count();
    
    if (index < count) {
      // Get the enabled checkbox at the specified index
      const targetCheckbox = enabledCheckboxes.nth(index);
      await targetCheckbox.waitFor({ state: 'visible', timeout: 30000 });
      await targetCheckbox.click();
      await this.page.waitForTimeout(2000);
    } else {
      // Skip if not enough enabled checkboxes
      console.log(`Only ${count} enabled checkboxes available, skipping index ${index}`);
    }
  }

  // Helper method to get count of enabled checkboxes
  async getEnabledLOACount(): Promise<number> {
    const enabledCheckboxes = this.page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input:not([disabled])');
    return await enabledCheckboxes.count();
  }

  // Method to toggle all available enabled LOAs
  async toggleAllEnabledLOAs() {
    const enabledCheckboxes = this.page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input:not([disabled])');
    const count = await enabledCheckboxes.count();
    
    console.log(`Found ${count} enabled LOA checkboxes, toggling all...`);
    
    for (let i = 0; i < count; i++) {
      const checkbox = enabledCheckboxes.nth(i);
      await checkbox.waitFor({ state: 'visible', timeout: 30000 });
      await checkbox.click();
      await this.page.waitForTimeout(1000); // Shorter delay between multiple clicks
    }
  }

  // New method to assign LOAs to Indiana license
  async assignLOAsToIndiana() {
    console.log('🔍 Assigning LOAs to Indiana license...');
    
    // Wait for LOAs to be visible
    await this.page.waitForTimeout(2000);
    
    // Find all available LOA checkboxes
    const loaCheckboxes = this.page.locator('span > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input:not([disabled])');
    const loaCount = await loaCheckboxes.count();
    console.log(`📊 Found ${loaCount} available LOA checkboxes`);
    
    if (loaCount > 0) {
      // Select the first available LOA
      const firstLOA = loaCheckboxes.first();
      await firstLOA.waitFor({ state: 'visible', timeout: 10000 });
      await firstLOA.check();
      console.log('✅ First LOA assigned');
      
      // Also try to select additional LOAs if available
      if (loaCount > 1) {
        try {
          const secondLOA = loaCheckboxes.nth(1);
          await secondLOA.waitFor({ state: 'visible', timeout: 5000 });
          await secondLOA.check();
          console.log('✅ Second LOA assigned');
        } catch (error) {
          console.log('⚠️ Could not assign second LOA, continuing with first...');
        }
      }
      
      return true;
    } else {
      console.log('⚠️ No available LOA checkboxes found, checking for alternative selectors...');
      
      // Try alternative selector for LOAs
      try {
        const alternativeLOAs = this.page.locator('input[type="checkbox"]:not([disabled])');
        const altCount = await alternativeLOAs.count();
        console.log(`📊 Found ${altCount} alternative checkboxes`);
        
        if (altCount > 0) {
          const firstAltLOA = alternativeLOAs.first();
          await firstAltLOA.waitFor({ state: 'visible', timeout: 10000 });
          await firstAltLOA.check();
          console.log('✅ First LOA assigned using alternative selector');
          return true;
        }
      } catch (error) {
        console.log('❌ Could not assign any LOAs');
      }
      
      return false;
    }
  }

  async saveChanges() {
    // Wait for Save Changes button to be visible and clickable
    const saveButton = this.page.getByRole('button', { name: 'Save Changes' });
    await saveButton.waitFor({ state: 'visible', timeout: 30000 });
    await saveButton.click();
    await this.page.waitForTimeout(3000);
  }

  // New method to handle Indiana state management
  async manageIndianaState(action: 'assign' | 'unassign' | 'toggle') {
    console.log(`🔄 Managing Indiana state: ${action}`);
    
    if (action === 'unassign') {
      // Find and uncheck Indiana if it's already assigned
      try {
        const indianaCheckbox = this.page.locator('div').filter({ hasText: /^Aug 26 - 2025$/ }).getByLabel('');
        const isChecked = await indianaCheckbox.isChecked();
        if (isChecked) {
          console.log('⚠️ Indiana is already assigned, unassigning first...');
          await indianaCheckbox.uncheck();
          await this.page.waitForTimeout(1000);
          console.log('✅ Indiana unassigned');
        } else {
          console.log('ℹ️ Indiana is not assigned, proceeding...');
        }
      } catch (error) {
        console.log('ℹ️ Could not find Indiana assignment checkbox, proceeding...');
      }
    }
    
    if (action === 'assign' || action === 'toggle') {
      // Always search and select Indiana
      await this.selectState('Indiana');
    }
  }
}

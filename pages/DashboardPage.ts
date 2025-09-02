import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHome() {
    // Wait for Home element to be visible and clickable
    const homeElement = this.page.getByText('Home');
    await homeElement.waitFor({ state: 'visible', timeout: 30000 });
    await homeElement.click();
    await this.page.waitForTimeout(2000);
  }

  async openManageProducers() {
    // Wait for Manage Producers element to be visible and clickable
    const manageProducersElement = this.page.getByText('Manage Producers');
    await manageProducersElement.waitFor({ state: 'visible', timeout: 30000 });
    await manageProducersElement.click();
    await this.page.waitForTimeout(2000);
  }

  async logout() {
    // Wait for EIP Test element to be visible and clickable
    const eipTestElement = this.page.getByText('EIP Test');
    await eipTestElement.waitFor({ state: 'visible', timeout: 30000 });
    await eipTestElement.click();
    await this.page.waitForTimeout(2000);
    
    // Wait for Logout element to be visible and clickable
    const logoutElement = this.page.getByText('Logout');
    await logoutElement.waitFor({ state: 'visible', timeout: 30000 });
    await logoutElement.click();
    await this.page.waitForTimeout(2000);
    
    // Wait for Yes button to be visible and clickable
    const yesButton = this.page.getByRole('button', { name: 'Yes' });
    await yesButton.waitFor({ state: 'visible', timeout: 30000 });
    await yesButton.click();
    await this.page.waitForTimeout(2000);
  }
}

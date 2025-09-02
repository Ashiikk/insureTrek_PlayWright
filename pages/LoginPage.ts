import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Enter Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  // Utility method to maximize browser window
  async maximizeWindow() {
    // MacBook Pro 14-inch optimized viewport
    const macBookPro14 = { width: 1512, height: 982 };
    
    // Set viewport to MacBook Pro 14-inch size
    await this.page.setViewportSize(macBookPro14);
    
    // Try to enter fullscreen mode
    try {
      await this.page.evaluate(() => {
        if (document.documentElement.requestFullscreen) {
          return document.documentElement.requestFullscreen();
        }
      });
    } catch (error) {
      console.log('Fullscreen not available, using maximized window');
    }
  }

  // Method to set custom viewport size
  async setCustomViewport(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
    console.log(`Viewport set to ${width}x${height}`);
  }

  // Method to dynamically fit Mac 14-inch screen
  async fitMacBookPro14() {
    // MacBook Pro 14-inch native resolution
    const viewport = { width: 1512, height: 982 };
    
    // Set the viewport
    await this.page.setViewportSize(viewport);
    
    // Try to maximize the window
    try {
      await this.page.evaluate(() => {
        // Request fullscreen if available
        if (document.documentElement.requestFullscreen) {
          return document.documentElement.requestFullscreen();
        }
        // Fallback: try to maximize window
        if (window.screen && window.screen.availWidth) {
          window.moveTo(0, 0);
          window.resizeTo(window.screen.availWidth, window.screen.availHeight);
        }
      });
    } catch (error) {
      console.log('Fullscreen/maximize not available, using viewport sizing');
    }
    
    console.log(`✅ MacBook Pro 14-inch viewport set: ${viewport.width}x${viewport.height}`);
  }

  // Method to auto-detect and fit screen size
  async autoFitScreen() {
    try {
      // Get actual screen dimensions
      const screenInfo = await this.page.evaluate(() => {
        return {
          availWidth: window.screen.availWidth,
          availHeight: window.screen.availHeight,
          width: window.screen.width,
          height: window.screen.height
        };
      });
      
      // Calculate optimal viewport (leave some space for browser UI)
      const optimalWidth = Math.min(screenInfo.availWidth - 50, 1512);
      const optimalHeight = Math.min(screenInfo.availHeight - 100, 982);
      
      // Set the viewport
      await this.page.setViewportSize({ width: optimalWidth, height: optimalHeight });
      
      console.log(`🖥️ Screen detected: ${screenInfo.availWidth}x${screenInfo.availHeight}`);
      console.log(`📐 Viewport set to: ${optimalWidth}x${optimalHeight}`);
      
      return { width: optimalWidth, height: optimalHeight };
    } catch (error) {
      console.log('Could not detect screen size, using default MacBook Pro 14-inch size');
      await this.fitMacBookPro14();
    }
  }

  async goto() {
    await this.page.goto('https://insuretrek.ui.foxsenseprojects.com/');
    // Wait for page to load with a more reliable approach
    await this.page.waitForLoadState('domcontentloaded');
    
    // Auto-detect and fit the screen size dynamically
    await this.autoFitScreen();
    
    // Wait for the login form to be visible
    await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });
  }

  async login(email: string, password: string) {
    // Wait 5 seconds before starting login process
    await this.page.waitForTimeout(5000);
    
    // Fill email with delay
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(2000);
    
    // Fill password with delay
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(2000);
    
    // Click login button with delay
    await this.loginBtn.waitFor({ state: 'visible' });
    await this.loginBtn.click();
    await this.page.waitForTimeout(3000);
  }
}

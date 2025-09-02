// Test Configuration for InsureTrek
export const TEST_CONFIG = {
  // Base URLs
  BASE_URL: 'https://insuretrek.ui.foxsenseprojects.com',
  LOGIN_URL: 'https://insuretrek.ui.foxsenseprojects.com/',
  HOME_URL: 'https://insuretrek.ui.foxsenseprojects.com/home',
  
  // Test Credentials
  CREDENTIALS: {
    VALID_EMAIL: 'eip+uat@test.com',
    VALID_PASSWORD: 'test@123',
    INVALID_EMAIL: 'invalid@test.com',
    INVALID_PASSWORD: 'wrongpassword'
  },
  
  // Test Data
  PRODUCERS: {
    HAI_BUCHWALTER: 'hai buch',
    FULL_NAME: 'Hai Buchwalter'
  },
  
  // States
  STATES: {
    INDIANA: 'ind',
    INDIANA_FULL: 'Indiana'
  },
  
  // LOA Types
  LOA_TYPES: {
    ACCIDENT_HEALTH: 'Accident & Health (14)',
    LIFE: 'Life (16)',
    PERSONAL_LINES: 'Personal lines (928)',
    PRODUCER_INDIVIDUAL: 'Producer - Individual (602)'
  },
  
  // Timeouts
  TIMEOUTS: {
    ELEMENT: 30000,
    PAGE_LOAD: 60000,
    TEST: 120000
  },
  
  // Test Users
  USERS: {
    ADMIN: {
      email: 'eip+uat@test.com',
      password: 'test@123',
      role: 'Admin'
    }
  }
};

// Test Utilities
export class TestUtils {
  static async waitForPageLoad(page: any) {
    await page.waitForLoadState('domcontentloaded');
  }
  
  static async takeScreenshot(page: any, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `test-results/${name}-${timestamp}.png`;
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`📸 Screenshot saved: ${filename}`);
    return filename;
  }
  
  static logStep(step: string, description: string) {
    console.log(`📋 ${step}: ${description}`);
  }
  
  static logSuccess(message: string) {
    console.log(`✅ ${message}`);
  }
  
  static logError(message: string) {
    console.log(`❌ ${message}`);
  }
  
  static logInfo(message: string) {
    console.log(`ℹ️ ${message}`);
  }
}

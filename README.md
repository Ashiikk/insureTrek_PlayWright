# 🚀 InsureTrek Playwright Automation Project

## 📋 Project Overview

This project contains comprehensive Playwright automation tests for the **InsureTrek** application. It provides extensive test coverage for license management workflows, producer management, and state-specific compliance testing across multiple scenarios and producers.

### 🎯 **Key Features**
- **Multi-Scenario Testing**: Hai Buchwalter, Shemlah Naphish, and additional test scenarios
- **License Management Suite**: Comprehensive filtering, pagination, and data validation tests
- **State-Specific Testing**: Indiana and Texas license management workflows
- **Data-Driven Testing**: Baseline data snapshots and regression testing capabilities
- **Comprehensive Reporting**: HTML reports, video recordings, and detailed trace files
- **Page Object Model**: Maintainable and reusable test architecture

## 🏗️ Project Structure

```
insuretrek/
├── tests/                           # Test Suite
│   ├── haiBuchwalterFlow.spec.ts   # 🎯 Original Hai Buchwalter flow
│   ├── haiBuchwalterScenario3.spec.ts # 🎯 Enhanced Hai Buchwalter scenario
│   ├── shemlahScenario4.spec.ts    # 🎯 Shemlah Naphish scenario
│   ├── license-management/          # License management test suite
│   │   ├── manage_license_filter.spec.ts # License filtering tests
│   │   └── test-pagination.spec.ts # Pagination functionality tests
│   ├── scenario5.spec.ts           # Additional test scenarios
│   ├── scenario6.spec.ts           # Additional test scenarios
│   ├── scenario7.spec.ts           # Additional test scenarios
│   ├── scenario8.spec.ts           # Additional test scenarios
│   ├── scenario9.spec.ts           # Additional test scenarios
│   ├── txScenario10.spec.ts        # Texas-specific scenarios
│   ├── txScenario11.spec.ts        # Texas-specific scenarios
│   ├── txScenario12.spec.ts        # Texas-specific scenarios
│   ├── txscenario14.spec.ts        # Texas-specific scenarios
│   ├── txscenario15.spec.ts        # Texas-specific scenarios
│   └── scenario13.spec.ts          # Additional test scenarios
├── pages/                           # Page Object Models (POM)
│   ├── LoginPage.ts                # Login page interactions
│   ├── DashboardPage.ts            # Dashboard navigation
│   ├── ManageProducersPage.ts      # Producer management
│   └── StateLicensesPage.ts        # State license management
├── scraped-data/                    # Test data and baselines
│   ├── baseline-license-data-*.csv # CSV test data files
│   └── baseline-license-data-*.json # JSON test data files
├── playwright.config.ts             # Playwright configuration
├── test-config.ts                   # Test configuration
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── SHEMLAH_SCENARIO3_TEST_CASES.md # Shemlah scenario documentation
├── SHEMLAH_SCENARIO4_TEST_CASES.md # Shemlah scenario documentation
├── TEST_CASES_DOCUMENTATION.md     # Comprehensive test documentation
└── README.md                        # This file
```

## 🚀 Quick Start

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Install Playwright Browsers**
```bash
npx playwright install
```

### 3. **Run the Test**
```bash
npm run test:hai-buchwalter
```

## 📊 Available Test Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `test:hai-buchwalter` | Run Hai Buchwalter Scenario 3 with browser open | `npm run test:hai-buchwalter` |
| `test:hai-buchwalter:headless` | Run Hai Buchwalter Scenario 3 without browser UI | `npm run test:hai-buchwalter:headless` |
| `test:shemlah-scenario4` | Run Shemlah Scenario 4 with browser open | `npm run test:shemlah-scenario4` |
| `test:shemlah-scenario4:headless` | Run Shemlah Scenario 4 without browser UI | `npm run test:shemlah-scenario4:headless` |
| `test:scenarios` | Run both main scenarios (Hai Buchwalter + Shemlah) | `npm run test:scenarios` |
| `test:all` | Run all tests with browser open | `npm run test:all` |
| `test:all:headless` | Run all tests without browser UI | `npm run test:all:headless` |
| `test:headed` | Run tests with browser UI (default) | `npm run test:headed` |
| `test:debug` | Run tests in debug mode | `npm run test:debug` |
| `codegen` | Generate new test code | `npm run codegen` |
| `report` | Open HTML test report | `npm run report` |
| `report:open` | Open HTML report on network | `npm run report:open` |
| `clean` | Clean test results and reports | `npm run clean` |
| `clean:all` | Clean everything including node_modules | `npm run clean:all` |

## 🎯 Test Scenarios Overview

This project includes comprehensive test scenarios covering various aspects of the InsureTrek application:

### 🎯 **Primary Test Scenarios**

#### **1. Hai Buchwalter Scenario 3** (`haiBuchwalterScenario3.spec.ts`)
- **Producer**: Hai Buchwalter
- **Focus**: Indiana License Management Flow
- **Duration**: ~5 minutes (300 seconds timeout)
- **Features**: Complete license assignment, modification, and cleanup workflow

#### **2. Shemlah Scenario 4** (`shemlahScenario4.spec.ts`)
- **Producer**: Shemlah Naphish  
- **Focus**: Indiana License Management Flow
- **Duration**: ~5 minutes (300 seconds timeout)
- **Features**: Comprehensive license management with detailed verification

### 🔧 **License Management Test Suite**

#### **License Filtering Tests** (`license-management/manage_license_filter.spec.ts`)
- **Focus**: License filtering and search functionality
- **Features**: Advanced filtering, search validation, data verification

#### **Pagination Tests** (`license-management/test-pagination.spec.ts`)
- **Focus**: Pagination functionality across license data
- **Features**: Page navigation, data consistency, UI responsiveness

### 🌟 **Additional Test Scenarios**

#### **General Scenarios** (scenario5-9, scenario13)
- Various application workflows and edge cases
- UI interaction testing
- Data validation scenarios

#### **Texas-Specific Scenarios** (txScenario10-12, txscenario14-15)
- Texas state-specific license management
- Regional compliance testing
- State-specific workflow validation

### 📊 **Test Data Management**

#### **Scraped Data** (`scraped-data/`)
- **CSV Files**: Baseline license data in CSV format
- **JSON Files**: Structured test data for validation
- **Timestamps**: Versioned data snapshots for regression testing

## 🎯 Detailed Test Flow - Hai Buchwalter Scenario 3

The **Hai Buchwalter Indiana License Management Flow** test covers:

### **Phase 1: Setup & Initial Assignment**
1. **Login** → InsureTrek application
2. **Navigate** → Home → Manage Producers
3. **Search** → Hai Buchwalter producer
4. **Manage** → Click manage button
5. **Unassign** → Remove existing Indiana assignment
6. **Select State** → Open All States → Search Indiana
7. **Assign LOA** → Check first LOA checkbox
8. **Save** → Save changes

### **Phase 2: Verification & Modifications**
9. **Verify Initial** → Check IN text in container
10. **Verify LOA Details** → Check all LOA assignments
11. **Modify Assignments** → Unassign some LOAs, assign Personal lines
12. **Verify Partial** → Confirm partial assignment state
13. **Assign Life LOA** → Add Life license
14. **Verify Life** → Confirm Life assignment
15. **Assign Accident & Health** → Add Accident & Health license
16. **Verify Final** → Confirm complete assignment

### **Phase 3: Advanced Features & Cleanup**
17. **Check Needs Attention** → Verify in Needs Attention tab
18. **Unassign Indiana** → Remove all Indiana assignments
19. **Verify Unassigned** → Confirm no Indiana assignments
20. **Final Cleanup** → Reset to original state
21. **Verify Final State** → Confirm cleanup completed
22. **Logout** → Complete the test

## 🔧 Configuration

### **Playwright Configuration** (`playwright.config.ts`)
- **Browser**: Chromium (primary)
- **Viewport**: Dynamic Mac 14-inch screen detection
- **Video Recording**: Enabled for all tests
- **Screenshots**: On failure and success
- **Trace Files**: Enabled for debugging
- **Timeout**: 120 seconds per test
- **Reporters**: HTML + List

### **Environment Variables**
- **Base URL**: `https://insuretrek.ui.foxsenseprojects.com/`
- **Test Credentials**: 
  - Email: `eip+uat@test.com`
  - Password: `test@123`

## 📱 Dynamic Screen Sizing

The project automatically detects your Mac 14-inch screen and sets the optimal viewport:
- **Width**: 1512px
- **Height**: 982px
- **Device Scale Factor**: 2
- **Browser**: Maximized for best visibility

## 📊 Test Reporting

### **HTML Report**
- **Location**: `playwright-report/index.html`
- **Features**: 
  - Step-by-step execution details
  - Screenshots for each step
  - Video recordings
  - Test results summary
  - Error details with context

### **Test Results**
- **Location**: `test-results/` directory
- **Contents**:
  - Screenshots (before/after each assertion)
  - Video recordings
  - Trace files for debugging
  - Error context information

## 🐛 Debugging

### **Debug Mode**
```bash
npm run test:debug
```
- Opens browser in debug mode
- Step-by-step execution
- Interactive debugging console

### **Code Generation**
```bash
npm run codegen
```
- Opens Playwright Inspector
- Record new test actions
- Generate test code automatically

### **Trace Files**
- Located in `test-results/` directory
- Open with: `npx playwright show-trace <trace-file>`
- Step-by-step execution replay

## 📚 Documentation

### **Test Case Documentation**
- **`TEST_CASES_DOCUMENTATION.md`**: Comprehensive documentation for Hai Buchwalter test cases
- **`SHEMLAH_SCENARIO3_TEST_CASES.md`**: Detailed Shemlah Scenario 3 test cases
- **`SHEMLAH_SCENARIO4_TEST_CASES.md`**: Detailed Shemlah Scenario 4 test cases

### **Test Data**
- **`scraped-data/`**: Contains baseline license data in CSV and JSON formats
- **Timestamped Files**: Versioned data snapshots for regression testing
- **Data Validation**: Structured test data for comprehensive validation

## 📝 Adding New Tests

### **1. Create New Test File**
```bash
# Create new test file
touch tests/newTest.spec.ts
```

### **2. Use Page Object Models**
```typescript
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ManageProducersPage } from '../pages/ManageProducersPage';
import { StateLicensesPage } from '../pages/StateLicensesPage';

test('New Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const manageProducersPage = new ManageProducersPage(page);
  const stateLicensesPage = new StateLicensesPage(page);
  
  await loginPage.login('email', 'password');
  await dashboardPage.navigateToSection('Manage Producers');
  await manageProducersPage.searchProducer('Producer Name');
  await stateLicensesPage.verifyLicenseData();
});
```

### **3. Add to Package.json Scripts**
```json
{
  "scripts": {
    "test:new-test": "npx playwright test tests/newTest.spec.ts --project=chromium --headed --timeout=300000 --reporter=html,list && npx playwright show-report"
  }
}
```

## 🧹 Maintenance

### **Clean Test Results**
```bash
npm run clean          # Remove test results and reports
npm run clean:all      # Remove everything including node_modules
```

### **Update Dependencies**
```bash
npm update             # Update all dependencies
npx playwright install # Update Playwright browsers
```

### **Test Data Management**
```bash
# View scraped data
ls -la scraped-data/

# Compare baseline data versions
diff scraped-data/baseline-license-data-*.json

# Clean old test data (keep latest 3 versions)
find scraped-data/ -name "baseline-license-data-*" | sort | head -n -3 | xargs rm -f
```

### **Test Execution Monitoring**
```bash
# Run specific scenario with detailed output
npm run test:hai-buchwalter

# Run all scenarios
npm run test:scenarios

# Generate and view reports
npm run report
```

## 🚨 Troubleshooting

### **Common Issues**

1. **Viewport Issues**
   - Ensure Mac 14-inch screen detection is working
   - Check `playwright.config.ts` viewport settings
   - Verify dynamic viewport sizing is functioning

2. **Login Failures**
   - Verify credentials are correct (`eip+uat@test.com` / `test@123`)
   - Check network connectivity to `https://insuretrek.ui.foxsenseprojects.com/`
   - Ensure application is accessible and responsive

3. **Element Not Found**
   - Check if UI has changed since last test run
   - Verify selectors are still valid in page objects
   - Use `npx playwright codegen` to update selectors
   - Check for dynamic content loading issues

4. **Timeout Issues**
   - Increase timeout in `playwright.config.ts` (current: 300 seconds)
   - Check application performance and response times
   - Verify network stability and server availability
   - Review wait strategies in test files

5. **Test Data Issues**
   - Verify scraped data files are up to date
   - Check baseline data consistency
   - Ensure test data matches current application state

6. **Scenario-Specific Issues**
   - **Hai Buchwalter**: Check producer availability and license states
   - **Shemlah**: Verify producer data and Indiana assignments
   - **License Management**: Ensure filtering and pagination functionality

### **Getting Help**

1. **Check Test Results**: Review `test-results/` directory for detailed logs
2. **View HTML Report**: Open `playwright-report/index.html` for visual analysis
3. **Debug Mode**: Use `npm run test:debug` for step-by-step execution
4. **Trace Files**: Analyze execution with `npx playwright show-trace <trace-file>`
5. **Documentation**: Review test case documentation files for detailed scenarios
6. **Console Logs**: Check browser console for JavaScript errors
7. **Network Logs**: Review network requests in browser dev tools

## 📈 Performance Tips

1. **Run Headless**: Use `:headless` scripts for faster execution
2. **Parallel Execution**: Configure parallel test execution in config
3. **Selective Testing**: Run specific test files instead of all tests
4. **Clean Environment**: Regularly clean test results and reports

## 🔒 Security Notes

- **Credentials**: Stored in test files (consider environment variables for production)
- **Base URL**: Hardcoded (consider configuration files for different environments)
- **Test Data**: Uses production-like data (ensure test environment isolation)

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review test results and error logs
3. Use debug mode to step through failing tests
4. Check Playwright documentation: https://playwright.dev/

---

## 🎉 Ready to Test!

Your InsureTrek automation project is now fully configured and ready to run comprehensive tests. Choose from multiple test scenarios:

### **Quick Start Options**

```bash
# Run primary Hai Buchwalter scenario
npm run test:hai-buchwalter

# Run Shemlah scenario
npm run test:shemlah-scenario4

# Run both main scenarios
npm run test:scenarios

# Run license management tests
npm run test:all
```

### **What You'll Get**

- **Comprehensive Test Coverage**: Multiple scenarios covering different producers and workflows
- **Detailed Reporting**: HTML reports with screenshots, videos, and trace files
- **Data Validation**: Baseline data comparison and regression testing
- **State-Specific Testing**: Indiana and Texas license management workflows
- **Maintainable Architecture**: Page Object Model for easy maintenance and updates

This project provides enterprise-grade test automation for the InsureTrek application with extensive coverage and detailed reporting capabilities.

# 🚀 InsureTrek Playwright Automation Project

## 📋 Project Overview

This project contains comprehensive Playwright automation tests for the **InsureTrek** application. It focuses on testing the Indiana License Management Flow for producer "Hai Buchwalter" with detailed step-by-step verification and comprehensive reporting.

## 🏗️ Project Structure

```
insuretrek/
├── tests/
│   └── haiBuchwalterFlow.spec.ts   # 🎯 Main test file with complete Indiana license flow
├── pages/                           # Page Object Models (POM)
│   ├── LoginPage.ts                # Login page interactions
│   └── DashboardPage.ts            # Dashboard navigation
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
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
| `test:hai-buchwalter` | Run Hai Buchwalter flow with browser open | `npm run test:hai-buchwalter` |
| `test:hai-buchwalter:headless` | Run test without browser UI | `npm run test:hai-buchwalter:headless` |
| `test:all` | Run all tests with browser open | `npm run test:all` |
| `test:all:headless` | Run all tests without browser UI | `npm run test:all:headless` |
| `test:debug` | Run tests in debug mode | `npm run test:debug` |
| `codegen` | Generate new test code | `npm run codegen` |
| `report` | Open HTML test report | `npm run report` |
| `clean` | Clean test results | `npm run clean` |

## 🎯 Test Flow Overview

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

test('New Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  
  await loginPage.login('email', 'password');
  await dashboardPage.navigateToSection('Manage Producers');
});
```

### **3. Add to Package.json Scripts**
```json
{
  "scripts": {
    "test:new-test": "npx playwright test tests/newTest.spec.ts --project=chromium --headed"
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

## 🚨 Troubleshooting

### **Common Issues**

1. **Viewport Issues**
   - Ensure Mac 14-inch screen detection is working
   - Check `playwright.config.ts` viewport settings

2. **Login Failures**
   - Verify credentials are correct
   - Check network connectivity
   - Ensure application is accessible

3. **Element Not Found**
   - Check if UI has changed
   - Verify selectors are still valid
   - Use `npx playwright codegen` to update selectors

4. **Timeout Issues**
   - Increase timeout in `playwright.config.ts`
   - Check application performance
   - Verify network stability

### **Getting Help**

1. **Check Test Results**: Review `test-results/` directory
2. **View HTML Report**: Open `playwright-report/index.html`
3. **Debug Mode**: Use `npm run test:debug`
4. **Trace Files**: Analyze execution with trace viewer

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

Your InsureTrek automation project is now fully configured and ready to run comprehensive tests. Start with:

```bash
npm run test:hai-buchwalter
```

This will execute the complete Indiana License Management Flow and generate detailed reports for analysis.

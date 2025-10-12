# Shemlah Scenario 3 - Indiana License Management Flow Test Cases

## Overview
This document outlines the comprehensive test cases for Shemlah Scenario 3, which tests the Indiana license management flow for the producer "Shemlah Naphish" in the InsureTrek application.

## Test Information
- **Test File**: `tests/shemlahScenario3.spec.ts`
- **Test Name**: "Shemlah Scenario 3 - Indiana License Management Flow"
- **Producer**: Shemlah Naphish
- **State**: Indiana (IN)
- **Duration**: ~5 minutes (300 seconds timeout)

## Test Environment Setup
- **URL**: https://insuretrek.ui.foxsenseprojects.com/
- **Credentials**: eip+uat@test.com / test@123
- **Browser**: Chromium (headed mode)
- **Viewport**: Dynamic (90% of available screen)

## Detailed Test Steps

### Step 0: Environment Setup
**Objective**: Configure optimal test environment
- **Action**: Detect screen dimensions and set viewport
- **Expected**: Viewport set to 90% of available screen size
- **Validation**: Console log shows viewport dimensions

### Step 1: Login to InsureTrek
**Objective**: Authenticate user access
- **Actions**:
  - Navigate to login page
  - Enter email: `eip+uat@test.com`
  - Enter password: `test@123`
  - Click Login button
- **Expected**: Successful login and navigation to home page
- **Validation**: Login button click successful

### Step 2: Navigate to Manage Producers
**Objective**: Access producer management section
- **Actions**:
  - Navigate to home page
  - Click "Manage Producers" link
- **Expected**: Successfully navigate to producer management
- **Validation**: "Manage Producers" link click successful

### Step 3: Search for Shemlah Naphish
**Objective**: Locate the target producer
- **Actions**:
  - Enter "Shemlah" in search combobox
  - Press Enter to search
  - Click on "Shemlah Naphish" from results
- **Expected**: Shemlah Naphish producer selected
- **Validation**: Producer selection successful

### Step 4: Click Manage Button
**Objective**: Access producer management interface
- **Actions**:
  - Click "Manage" button for selected producer
- **Expected**: Management interface opens
- **Validation**: Manage button click successful

### Step 5: Unassign Existing Assignments
**Objective**: Clear any existing state assignments
- **Actions**:
  - Wait for card containers to load (5 seconds)
  - Locate specific card containers
  - Find and uncheck all checked checkboxes in containers
- **Expected**: All existing assignments cleared
- **Validation**: 
  - Card containers available
  - Checkboxes unchecked (if any existed)
  - Graceful handling if no checkboxes found

### Step 6: Search for Indiana and Assign First LOA
**Objective**: Assign initial Indiana license
- **Actions**:
  - Search for "ind" in states
  - Select "Indiana" (nth(1))
  - Check first LOA checkbox
  - Click "Save Changes"
- **Expected**: First LOA assigned to Indiana
- **Validation**: Save Changes successful

### Step 7: Verify Initial Assignment
**Objective**: Confirm initial assignment is correct
- **Actions**:
  - Navigate to "State Licenses"
  - Search for "ind" in licenses
  - Check aria snapshot
  - Navigate to Home and verify "IN" text
- **Expected**: 
  - Life, Accident & Health LOA active
  - Personal lines LOA non-active
  - "IN" text visible on home page
- **Validation**: 
  - Aria snapshot matches expected structure
  - Home page contains "IN" text

### Step 8: Modify LOA Assignments
**Objective**: Change LOA assignments
- **Actions**:
  - Click Manage button
  - Search for "ind" and select "INIndiana"
  - Uncheck second LOA (Accident & Health)
  - Check third LOA (Life)
  - Save changes
- **Expected**: LOA assignments modified
- **Validation**: 
  - Save Changes successful
  - "IN" text still present after modification

### Step 9: Verify Modified Assignment
**Objective**: Confirm LOA modifications
- **Actions**:
  - Navigate to "State Licenses"
  - Search for "ind" in licenses
  - Check aria snapshot
- **Expected**: 
  - Personal lines LOA non-active
  - Life, Accident & Health LOA active
- **Validation**: Aria snapshot matches modified structure

### Step 10: Further LOA Modifications
**Objective**: Make additional LOA changes
- **Actions**:
  - Navigate to Home
  - Click Manage button
  - Search for "ind" and select "Indiana"
  - Uncheck second LOA (Accident & Health)
  - Save changes
- **Expected**: Further modifications saved
- **Validation**: Save Changes successful

### Step 11: Check Needs Attention Tab
**Objective**: Verify Needs Attention functionality
- **Actions**:
  - Navigate to "State Licenses"
  - Click "Needs Attention" button (if available)
  - Check aria snapshot
  - Navigate to Home and verify "IN" text
- **Expected**: 
  - Needs Attention tab accessible (if available)
  - Proper aria snapshot structure
  - "IN" text still present
- **Validation**: 
  - Graceful handling if Needs Attention not available
  - Home page contains "IN" text

### Step 12: Unassign Indiana Completely
**Objective**: Remove all Indiana assignments
- **Actions**:
  - Navigate to Home
  - Click Manage button
  - Search for "ind" and select "INIndiana"
  - Uncheck first LOA
  - Save changes
- **Expected**: Indiana completely unassigned
- **Validation**: 
  - Save Changes successful
  - "No Territories Assigned" text visible
  - "No States Assigned" text visible

### Step 13: Verify Unassignment
**Objective**: Confirm complete unassignment
- **Actions**:
  - Navigate to "State Licenses"
  - Search for "ind" in licenses
  - Check aria snapshot
- **Expected**: Only Life, Accident & Health LOA active
- **Validation**: Aria snapshot shows unassigned structure

### Step 14: Reassign Indiana
**Objective**: Re-establish Indiana assignments
- **Actions**:
  - Navigate to Home
  - Click Manage button
  - Search for "ind"
  - Check Indiana checkbox (nth-child(2))
  - Check first LOA checkbox
  - Save changes
- **Expected**: Indiana reassigned
- **Validation**: Save Changes successful

### Step 15: Verify Reassignment
**Objective**: Confirm reassignment is correct
- **Actions**:
  - Navigate to "State Licenses"
  - Search for "ind" in licenses
  - Click first dropdown option
  - Check aria snapshot
  - Navigate to Home and verify "IN" text
- **Expected**: 
  - Life, Accident & Health LOA active
  - Personal lines LOA non-active
  - "IN" text visible on home page
- **Validation**: 
  - Aria snapshot matches reassignment structure
  - Home page contains "IN" text

### Step 16: Final Unassignment
**Objective**: Complete final cleanup
- **Actions**:
  - Navigate to Home
  - Click Manage button
  - Search for "ind" and select "Indiana"
  - Uncheck first LOA
  - Save changes
- **Expected**: Final unassignment completed
- **Validation**: Save Changes successful

### Step 17: Logout
**Objective**: Complete test session
- **Actions**:
  - Click "EIP Test" dropdown
  - Click "Logout"
  - Confirm with "Yes" button
- **Expected**: Successful logout
- **Validation**: Logout process completed

## Test Data

### Producer Information
- **Name**: Shemlah Naphish
- **Search Term**: "Shemlah"

### State Information
- **State**: Indiana
- **State Code**: IN
- **Search Term**: "ind"

### LOA (Line of Authority) Types
1. **Life, Accident & Health**: Combined LOA
2. **Personal lines**: Property and casualty
3. **Accident & Health**: Health insurance
4. **Life**: Life insurance

## Error Handling

### Graceful Degradation
- **Needs Attention Button**: Test continues if button not found
- **Checkbox Operations**: Continues if individual checkbox fails
- **Element Not Found**: Uses retry mechanisms with timeouts

### Timeout Management
- **Global Timeout**: 300 seconds (5 minutes)
- **Element Timeout**: 3-5 seconds with retries
- **Page Load**: Waits for DOM content loaded

### Assertion Handling
- **Safe Assertions**: Uses `safeAssert` function for non-blocking failures
- **Detailed Logging**: Comprehensive error messages and expected vs actual values
- **Test Continuation**: Failed assertions don't stop test execution

## Performance Considerations

### Wait Strategies
- **Element Ready**: Waits for visibility and attachment
- **Page Load**: Waits for DOM content loaded
- **Interaction Delays**: 500ms between interactions
- **Smart Waits**: Conditional waiting based on element state

### Viewport Optimization
- **Dynamic Sizing**: 90% of available screen
- **Responsive Design**: Adapts to different screen sizes
- **Stability**: 2-second viewport stabilization

## Maintenance Notes

### Selector Updates
- **Card Containers**: Specific CSS selectors for checkbox containers
- **LOA Checkboxes**: Dynamic selectors based on text content
- **State Elements**: nth-child selectors for multiple Indiana options

### Test Stability
- **Retry Mechanisms**: Built-in retry logic for element interactions
- **Fallback Strategies**: Alternative approaches when primary methods fail
- **Robust Waiting**: Multiple wait strategies for different scenarios

## Reporting

### Console Output
- **Step-by-Step Logging**: Detailed progress tracking
- **Success Indicators**: ✅ for successful operations
- **Warning Indicators**: ⚠️ for non-critical issues
- **Information Indicators**: ℹ️ for informational messages

### Test Annotations
- **Assertion Results**: Pass/fail status for each assertion
- **Error Details**: Detailed error messages and context
- **Performance Metrics**: Test duration and timing information
- **Summary Statistics**: Overall pass/fail counts

### HTML Report
- **Screenshots**: Automatic screenshots on failures
- **Video Recording**: Full test execution recording
- **Trace Files**: Detailed execution traces for debugging
- **Assertion Details**: Comprehensive assertion results

## Expected Outcomes

### Successful Test Run
- **All Steps Completed**: 17 steps executed successfully
- **Assertions Passed**: All critical assertions pass
- **Clean Logout**: Proper session termination
- **No Critical Errors**: Only non-blocking warnings

### Test Completion
- **Duration**: Approximately 3-5 minutes
- **Memory Usage**: Stable throughout execution
- **Browser State**: Clean browser state maintained
- **Session Management**: Proper login/logout cycle

## Troubleshooting

### Common Issues
1. **Element Not Found**: Check selector updates and page structure
2. **Timeout Errors**: Verify network connectivity and server response
3. **Assertion Failures**: Review expected vs actual values
4. **Navigation Issues**: Ensure proper page load states

### Debug Information
- **Console Logs**: Detailed step-by-step execution logs
- **Screenshots**: Visual confirmation of page states
- **Network Logs**: API call tracking and response times
- **Element States**: Detailed element interaction logs

## Version History
- **v1.0**: Initial test case creation
- **v1.1**: Added comprehensive error handling
- **v1.2**: Enhanced assertion reporting
- **v1.3**: Improved wait strategies and stability

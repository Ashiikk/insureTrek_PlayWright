# Hai Buchwalter Indiana License Management Flow - Test Cases Documentation

## Overview
This document provides comprehensive test case documentation for the Hai Buchwalter Indiana License Management Flow automation test. The test covers the complete end-to-end workflow of managing Indiana state license assignments for the Hai Buchwalter producer.

## Test Information
- **Test Name**: `Hai Buchwalter - Indiana License Management Flow`
- **Test File**: `tests/haiBuchwalterFlow.spec.ts`
- **Test Type**: End-to-End (E2E) Automation Test
- **Framework**: Playwright with TypeScript
- **Timeout**: 5 minutes (300,000ms)
- **Browser**: Chromium (headed mode)

## Test Environment
- **Base URL**: `https://insuretrek.ui.foxsenseprojects.com/`
- **Test Credentials**: 
  - Email: `eip+uat@test.com`
  - Password: `test@123`
- **Target Producer**: Hai Buchwalter
- **Target State**: Indiana (IN)

## Test Cases

### Test Case 1: Viewport Configuration
**Step**: 0  
**Description**: Dynamic viewport setup based on screen size  
**Objective**: Ensure optimal viewport size for different screen resolutions  

**Preconditions**:
- Test environment is accessible
- Browser is launched

**Test Steps**:
1. Detect screen dimensions using JavaScript
2. Calculate optimal viewport size (90% of available screen)
3. Set dynamic viewport size
4. Wait for viewport to stabilize

**Expected Results**:
- Viewport is set to 90% of available screen size
- Console logs show detected screen dimensions
- Viewport stabilizes successfully

**Assertions**:
- Viewport size is calculated correctly
- Console confirmation of viewport setup

---

### Test Case 2: User Authentication
**Step**: 1  
**Description**: Login to InsureTrek application  
**Objective**: Authenticate user with valid credentials  

**Preconditions**:
- Application is accessible
- Valid test credentials are available

**Test Steps**:
1. Navigate to InsureTrek login page
2. Wait for page to load completely
3. Wait 3 seconds before entering credentials
4. Enter email address: `eip+uat@test.com`
5. Enter password: `test@123`
6. Click Login button
7. Wait for login to complete

**Expected Results**:
- Login page loads successfully
- Credentials are entered correctly
- Login is successful
- User is redirected to home page

**Assertions**:
- Login button is clickable
- No authentication errors
- Successful navigation to home page

---

### Test Case 3: Navigation to Manage Producers
**Step**: 2  
**Description**: Navigate to Manage Producers section  
**Objective**: Access the producer management interface  

**Preconditions**:
- User is logged in successfully
- Home page is loaded

**Test Steps**:
1. Navigate to home page
2. Wait for page to load
3. Locate and click "Manage Producers" link
4. Verify navigation success

**Expected Results**:
- Home page loads successfully
- Manage Producers link is visible and clickable
- Navigation to Manage Producers page is successful

**Assertions**:
- Manage Producers link is present
- Click action is successful
- Page navigation completes

---

### Test Case 4: Producer Search and Selection
**Step**: 3  
**Description**: Search for and select Hai Buchwalter producer  
**Objective**: Locate and select the target producer  

**Preconditions**:
- User is on Manage Producers page
- Search functionality is available

**Test Steps**:
1. Wait for page to load
2. Locate search combobox
3. Click on search field
4. Enter search term: "hai buch"
5. Press Enter to search
6. Wait for search results
7. Click on "Hai Buchwalter" from results

**Expected Results**:
- Search combobox is accessible
- Search term is entered correctly
- Search results display Hai Buchwalter
- Producer selection is successful

**Assertions**:
- Search combobox is visible and clickable
- Search results contain Hai Buchwalter
- Producer selection completes successfully

---

### Test Case 5: Access Producer Management
**Step**: 4  
**Description**: Click Manage button to access producer management  
**Objective**: Enter the producer management interface  

**Preconditions**:
- Hai Buchwalter producer is selected
- Manage button is available

**Test Steps**:
1. Wait for page to load
2. Locate Manage button
3. Click Manage button
4. Verify access to management interface

**Expected Results**:
- Manage button is visible and clickable
- Management interface loads successfully
- User can access producer settings

**Assertions**:
- Manage button is present and functional
- Management interface loads correctly

---

### Test Case 6: Cleanup Existing Assignments
**Step**: 5  
**Description**: Unassign existing Indiana assignments if present  
**Objective**: Ensure clean state before new assignments  

**Preconditions**:
- User is in producer management interface
- Card containers are loaded

**Test Steps**:
1. Wait for page load (5 seconds)
2. Wait for card containers to load (5 seconds)
3. Target specific card containers using CSS selectors
4. Wait for containers to be visible (5 seconds)
5. Find all checked checkboxes in both containers
6. Uncheck all found checkboxes
7. Handle errors gracefully and continue if needed

**Expected Results**:
- Card containers load within expected time
- All existing checkboxes are identified
- Checkboxes are successfully unchecked
- Test continues even if some checkboxes fail

**Assertions**:
- Card containers are accessible
- Checkboxes are found and processed
- Error handling works correctly

**Error Handling**:
- If checkbox unchecking fails, log error and move to next step
- Break out of loops on timeout errors
- Continue test execution regardless of individual checkbox failures

---

### Test Case 7: State Selection and Search
**Step**: 6  
**Description**: Open All States and search for Indiana  
**Objective**: Access Indiana state for license assignment  

**Preconditions**:
- User is in producer management interface
- All States functionality is available

**Test Steps**:
1. Wait 2 seconds for interface stability
2. Locate and click "All States" link
3. Wait for states interface to load
4. Locate search states textbox
5. Click on search field
6. Enter search term: "ind"
7. Wait for search results
8. Click on "Indiana" from results

**Expected Results**:
- All States link is accessible
- States search interface loads
- Indiana appears in search results
- Indiana selection is successful

**Assertions**:
- All States link is clickable
- Search functionality works
- Indiana is selectable

---

### Test Case 8: Initial LOA Assignment
**Step**: 7  
**Description**: Assign first LOA checkbox  
**Objective**: Create initial license assignment  

**Preconditions**:
- Indiana state is selected
- LOA checkboxes are available

**Test Steps**:
1. Wait 2 seconds for interface stability
2. Locate first LOA checkbox
3. Check the first LOA checkbox
4. Wait for Save Changes button
5. Click Save Changes button
6. Verify assignment success

**Expected Results**:
- First LOA checkbox is accessible
- Checkbox is successfully checked
- Save Changes button is functional
- Assignment is saved successfully

**Assertions**:
- LOA checkbox is clickable
- Save operation completes
- Assignment is confirmed

---

### Test Case 9: Initial Assignment Verification
**Step**: 8  
**Description**: Verify initial assignment in State Licenses  
**Objective**: Confirm the initial assignment was successful  

**Preconditions**:
- Initial LOA assignment is completed
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Navigate back to Home
4. Verify IN text is present in container

**Expected Results**:
- State Licenses navigation works
- Home navigation works
- IN text is visible in container

**Assertions**:
- Container contains "IN" text
- Navigation between sections works

---

### Test Case 10: LOA Assignment Details Verification
**Step**: 9  
**Description**: Verify detailed LOA assignment information  
**Objective**: Confirm specific LOA details are displayed correctly  

**Preconditions**:
- Initial assignment is verified
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Locate search licenses combobox
4. Search for "ind"
5. Press Enter to execute search
6. Verify producer text with LOA details
7. Verify aria snapshot structure

**Expected Results**:
- Search functionality works
- Producer text displays with LOA details
- Aria snapshot matches expected structure

**Assertions**:
- Text contains "Producer - Individual (602)Accident & Health (14)Life (16)Personal lines (928)"
- Aria snapshot matches expected table structure with LOA images

---

### Test Case 11: LOA Modification
**Step**: 10  
**Description**: Unassign some LOAs and assign Personal lines  
**Objective**: Modify existing assignments to test partial assignment  

**Preconditions**:
- Initial assignment is complete
- LOA modification interface is accessible

**Test Steps**:
1. Navigate to Home
2. Access Manage button
3. Search for Indiana again
4. Select Indiana
5. Uncheck first LOA checkbox
6. Uncheck third LOA checkbox
7. Toggle first LOA checkbox (uncheck then check then uncheck)
8. Check Personal lines checkbox
9. Save changes

**Expected Results**:
- Navigation works correctly
- LOA checkboxes can be modified
- Personal lines assignment is successful
- Changes are saved

**Assertions**:
- LOA modifications are applied
- Personal lines is assigned
- Save operation completes

---

### Test Case 12: Partial Assignment Verification
**Step**: 11  
**Description**: Verify partial assignment state  
**Objective**: Confirm modified assignments are displayed correctly  

**Preconditions**:
- LOA modifications are completed
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Search for "ind"
4. Verify partial assignment structure
5. Verify partial assignment text

**Expected Results**:
- Partial assignment is displayed
- Aria snapshot shows correct structure
- Text reflects current assignments

**Assertions**:
- Aria snapshot shows Personal lines as active and others as non-active
- Text shows "Producer - Individual (602)Personal lines (928)Accident & Health (14)"

---

### Test Case 13: Life LOA Assignment
**Step**: 12  
**Description**: Assign Life LOA to existing assignments  
**Objective**: Add Life LOA to current assignments  

**Preconditions**:
- Partial assignment is verified
- LOA assignment interface is accessible

**Test Steps**:
1. Navigate to Home
2. Access Manage button
3. Search for Indiana
4. Select INIndiana
5. Check Life LOA checkbox
6. Save changes

**Expected Results**:
- Life LOA is successfully assigned
- Changes are saved
- Assignment is confirmed

**Assertions**:
- Life LOA checkbox is checked
- Save operation completes
- Assignment is successful

---

### Test Case 14: Life Assignment Verification
**Step**: 13  
**Description**: Verify Life LOA assignment  
**Objective**: Confirm Life LOA is properly assigned  

**Preconditions**:
- Life LOA assignment is completed
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Search for "ind"
4. Verify Life assignment structure
5. Verify Life assignment text

**Expected Results**:
- Life assignment is displayed
- Aria snapshot shows correct structure
- Text reflects Life assignment

**Assertions**:
- Aria snapshot shows Life as active and others as non-active
- Text shows "Producer - Individual (602)Personal lines (928)Life (16)Accident & Health (14)"

---

### Test Case 15: Accident & Health LOA Assignment
**Step**: 14  
**Description**: Assign Accident & Health LOA  
**Objective**: Add Accident & Health LOA to assignments  

**Preconditions**:
- Life LOA assignment is verified
- LOA assignment interface is accessible

**Test Steps**:
1. Navigate to Home
2. Access Manage button
3. Search for Indiana
4. Select Indiana
5. Toggle first LOA checkbox
6. Check Accident & Health LOA checkbox
7. Save changes

**Expected Results**:
- Accident & Health LOA is assigned
- Changes are saved
- Assignment is confirmed

**Assertions**:
- Accident & Health LOA checkbox is checked
- Save operation completes
- Assignment is successful

---

### Test Case 16: Final Assignment Verification
**Step**: 15  
**Description**: Verify final assignment state  
**Objective**: Confirm all assignments are displayed correctly  

**Preconditions**:
- Accident & Health LOA assignment is completed
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Search for "ind"
4. Verify final assignment structure
5. Verify final assignment text

**Expected Results**:
- Final assignment is displayed
- Aria snapshot shows correct structure
- Text reflects final assignments

**Assertions**:
- Aria snapshot shows Accident & Health as active and Life as non-active
- Text shows "Producer - Individual (602)Accident & Health (14)Life (16)"

---

### Test Case 17: Final State Preparation
**Step**: 16  
**Description**: Prepare final state for Needs Attention check  
**Objective**: Set up final state for verification  

**Preconditions**:
- Final assignment is verified
- LOA assignment interface is accessible

**Test Steps**:
1. Navigate to Home
2. Access Manage button
3. Search for Indiana
4. Select Indiana
5. Toggle first LOA checkbox
6. Save changes

**Expected Results**:
- Final state is prepared
- Changes are saved
- State is ready for verification

**Assertions**:
- LOA toggle works correctly
- Save operation completes
- Final state is set

---

### Test Case 18: Needs Attention Verification
**Step**: 17  
**Description**: Check Needs Attention tab and verify final state  
**Objective**: Verify final state in Needs Attention section  

**Preconditions**:
- Final state is prepared
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Locate Needs Attention button (flexible matching)
4. Click Needs Attention button if found
5. Verify final state structure (if button found)
6. Verify final state text (if button found)

**Expected Results**:
- Needs Attention button is found and clicked (if available)
- Final state is verified (if button available)
- Test continues regardless of button availability

**Assertions**:
- Needs Attention button is handled gracefully
- Final state verification works (if applicable)
- Test continues on button unavailability

**Error Handling**:
- If Needs Attention button is not found, skip verification
- Continue test execution regardless of button availability

---

### Test Case 19: Complete Indiana Unassignment
**Step**: 18  
**Description**: Unassign Indiana completely  
**Objective**: Remove all Indiana assignments  

**Preconditions**:
- Final state is verified
- LOA assignment interface is accessible

**Test Steps**:
1. Navigate to Home
2. Access Manage button
3. Search for Indiana
4. Select Indiana
5. Click Life LOA checkbox to uncheck
6. Save changes

**Expected Results**:
- Indiana assignments are removed
- Changes are saved
- Unassignment is confirmed

**Assertions**:
- LOA checkbox is unchecked
- Save operation completes
- Unassignment is successful

---

### Test Case 20: Unassignment Verification
**Step**: 19  
**Description**: Verify no Indiana assignment exists  
**Objective**: Confirm Indiana is completely unassigned  

**Preconditions**:
- Indiana unassignment is completed
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Search for "ind"
4. Click on "ind in: State" element
5. Verify unassigned structure
6. Verify unassigned text

**Expected Results**:
- Indiana is shown as unassigned
- Aria snapshot shows correct structure
- Text reflects unassigned state

**Assertions**:
- Aria snapshot shows Indiana as unassigned
- Text shows "Producer - Individual (602)Life (16)Accident & Health (14)"

---

### Test Case 21: Final Cleanup
**Step**: 20  
**Description**: Perform final cleanup operations  
**Objective**: Clean up any remaining assignments  

**Preconditions**:
- Unassignment is verified
- LOA assignment interface is accessible

**Test Steps**:
1. Navigate to Home
2. Access Manage button
3. Search for "in"
4. Uncheck INIndiana checkbox
5. Save changes

**Expected Results**:
- Final cleanup is completed
- Changes are saved
- Cleanup is confirmed

**Assertions**:
- INIndiana checkbox is unchecked
- Save operation completes
- Cleanup is successful

---

### Test Case 22: Final State Verification
**Step**: 21  
**Description**: Verify final state after cleanup  
**Objective**: Confirm final state after all operations  

**Preconditions**:
- Final cleanup is completed
- State Licenses section is accessible

**Test Steps**:
1. Wait for page load
2. Navigate to State Licenses
3. Search for "ind"
4. Verify final cleanup structure
5. Verify final cleanup text

**Expected Results**:
- Final state is displayed
- Aria snapshot shows correct structure
- Text reflects final state

**Assertions**:
- Aria snapshot shows final cleanup structure
- Text shows "Producer - Individual (602)Accident & Health (14)"

---

### Test Case 23: User Logout
**Step**: 22  
**Description**: Logout from the application  
**Objective**: Complete the test session with proper logout  

**Preconditions**:
- All test operations are completed
- User is logged in

**Test Steps**:
1. Wait for page load
2. Click on "EIP Test" element
3. Click on "Logout" element
4. Click "Yes" button to confirm logout

**Expected Results**:
- Logout process is initiated
- Confirmation dialog appears
- Logout is completed successfully

**Assertions**:
- EIP Test element is clickable
- Logout element is accessible
- Yes button confirms logout
- Logout completes successfully

---

## Test Data

### Input Data
- **Email**: `eip+uat@test.com`
- **Password**: `test@123`
- **Producer Search**: `hai buch`
- **State Search**: `ind`
- **State**: `Indiana`

### Expected Output Data
- **Producer**: Hai Buchwalter
- **State**: Indiana (IN)
- **LOAs**: Accident & Health (14), Life (16), Personal lines (928)
- **Producer Type**: Individual (602)

## Error Handling

### Timeout Handling
- **Element Timeout**: 3-10 seconds depending on element type
- **Page Load Timeout**: 2-5 seconds
- **Test Timeout**: 5 minutes (300,000ms)

### Error Recovery
- **Checkbox Failures**: Log error and continue to next step
- **Element Not Found**: Use fallback selectors and continue
- **Navigation Failures**: Retry with increased timeout
- **Assertion Failures**: Log detailed error information and continue

### Graceful Degradation
- **Needs Attention Button**: Skip if not found
- **Checkbox Operations**: Continue if individual checkboxes fail
- **Search Operations**: Use alternative selectors if primary fails

## Performance Considerations

### Wait Strategies
- **Fixed Waits**: 1-5 seconds for page stability
- **Dynamic Waits**: Element-specific timeouts
- **Smart Waits**: Conditional waiting based on element state

### Optimization
- **Viewport**: Dynamic sizing based on screen resolution
- **Timeouts**: Optimized for different operations
- **Error Handling**: Minimal impact on test execution time

## Maintenance Notes

### Selector Updates
- **CSS Selectors**: May need updates if UI changes
- **Text Selectors**: More stable but may need updates
- **Role Selectors**: Most stable, preferred when possible

### Test Updates
- **Assertion Text**: Update if UI text changes
- **Aria Snapshots**: Update if table structure changes
- **Navigation**: Update if page structure changes

### Environment Updates
- **URLs**: Update if application URLs change
- **Credentials**: Update if test credentials change
- **Timeouts**: Adjust based on application performance

## Reporting

### Console Output
- **Step Progress**: Detailed logging for each step
- **Error Details**: Comprehensive error information
- **Assertion Results**: Pass/fail status with details
- **Performance Metrics**: Execution time and duration

### HTML Report
- **Test Results**: Visual test execution results
- **Screenshots**: Captured during test execution
- **Video Recording**: Full test execution video
- **Trace Files**: Detailed execution traces

### Test Annotations
- **Assertion Results**: Detailed assertion information
- **Error Details**: Failed assertion details
- **Performance Data**: Execution timing information
- **Test Summary**: Overall test completion status

## Conclusion

This comprehensive test suite covers the complete Hai Buchwalter Indiana License Management Flow, ensuring robust testing of all critical functionality while maintaining flexibility for error handling and graceful degradation. The test is designed to be maintainable, reliable, and provide detailed reporting for debugging and verification purposes.

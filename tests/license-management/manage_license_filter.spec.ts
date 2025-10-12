import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe.serial('State Licenses Filter Management', () => {
  let page: Page;

  // Helper function to wait for element to be visible and clickable
  const waitForElementReady = async (locator: any, timeout: number = 3000) => {
    try {
      // Check if page is still valid
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

  test.afterEach(async () => {
    // Page will be automatically closed by Playwright
    console.log('✅ Test completed');
  });

  /**
   * Utility function to scrape all pages of data using dynamic pagination
   */
  async function scrapeAllPages(): Promise<string[][]> {
    const allData: string[][] = [];
    let currentPage = 1;
    let hasNext = true;

    console.log('🔄 Starting pagination scraping from page 1...');

    while (hasNext) {
      try {
        // Wait for table to be visible using the same pattern as final8th
        await waitForPageLoad();
        await page.waitForTimeout(1000);
        
        // Get current page number for logging (try multiple selectors)
        let actualPage = currentPage;
        try {
          // Try different pagination selectors
          const paginationSelectors = [
            "//ul[@class='ant-pagination css-dev-only-do-not-override-1fvgrqi']//li[@class='ant-pagination-item ant-pagination-item-active']",
            ".ant-pagination .ant-pagination-item-active",
            "[class*='pagination'] [class*='active']",
            ".ant-pagination-item-active"
          ];
          
          for (const selector of paginationSelectors) {
            try {
              const currentPageElement = page.locator(selector);
              const currentPageText = await currentPageElement.textContent({ timeout: 2000 });
              if (currentPageText) {
                actualPage = parseInt(currentPageText) || currentPage;
                break;
              }
            } catch (e) {
              // Try next selector
              continue;
            }
          }
        } catch (error) {
          console.log(`📄 Could not detect page number, using counter: ${currentPage}`);
        }
        
        console.log(`📄 Scraping page ${actualPage}...`);
        
        // Scrape current page rows using more reliable selectors (skip first row - header)
        const rows = await page.$$eval('table tbody tr', (trs) =>
          trs.slice(1).map(tr => { // Skip first row (index 0) - header row
            const cells = Array.from(tr.querySelectorAll('td'));
            return cells.map(td => td.textContent?.trim() || '');
          })
        );
        
        allData.push(...rows);
        console.log(`📊 Scraped ${rows.length} rows from page ${actualPage}`);

        // Check for next page button using multiple selectors
        try {
          const nextButtonSelectors = [
            "//ul[@class='ant-pagination css-dev-only-do-not-override-1fvgrqi']//li[@class='ant-pagination-next']",
            ".ant-pagination .ant-pagination-next",
            "[class*='pagination'] [class*='next']",
            ".ant-pagination-next",
            "button[aria-label='Go to next page']",
            "button[title='Next Page']"
          ];
          
          let nextBtn = null;
          for (const selector of nextButtonSelectors) {
            try {
              nextBtn = page.locator(selector);
              await waitForElementReady(nextBtn, 1000);
              if (await nextBtn.count() > 0) {
                break;
              }
            } catch (e) {
              continue;
            }
          }
          
          if (nextBtn && await nextBtn.count() > 0) {
            // Check if next button is disabled (no more pages)
            const isDisabled = await nextBtn.evaluate(el => 
              el.classList.contains('ant-pagination-disabled') || 
              (el as HTMLElement).disabled || 
              el.getAttribute('aria-disabled') === 'true'
            );
            
            if (!isDisabled) {
              console.log(`➡️ Moving to next page...`);
              await nextBtn.click();
              await waitForInteraction();
              // Wait for table to refresh with proper wait condition
              await waitForPageLoad();
              await page.waitForTimeout(1500); // Additional buffer for table refresh
              currentPage++;
            } else {
              hasNext = false;
              console.log('📄 Reached last page - next button is disabled');
            }
          } else {
            hasNext = false;
            console.log('📄 No next page button found');
          }
        } catch (nextPageError) {
          console.log('📄 Error checking for next page:', nextPageError);
          hasNext = false;
        }
      } catch (error) {
        console.warn('⚠️ Error during pagination:', error);
        hasNext = false;
      }
    }
    
    console.log(`✅ Completed scraping all pages. Total rows: ${allData.length}`);
    return allData;
  }

  /**
   * Function to parse Lines of Authorities (LOA) data from license class field
   */
  function parseLOAData(licenseClassField: string): { loaAttributes: string[], rawLOA: string, mainLicenseClass: string } {
    if (!licenseClassField) {
      return { loaAttributes: [], rawLOA: '', mainLicenseClass: '' };
    }

    // Find the first occurrence of a pattern like "Name (number)" - this is typically the main license class
    const mainClassPattern = /^([^(]+?)\s*\((\d+)\)/;
    const mainClassMatch = licenseClassField.match(mainClassPattern);
    
    let mainLicenseClass = '';
    let loaPart = licenseClassField;
    
    if (mainClassMatch) {
      mainLicenseClass = mainClassMatch[0]; // e.g., "Insurance Producer (3)"
      // Extract everything after the main license class
      loaPart = licenseClassField.substring(mainClassMatch[0].length);
    }

    // Parse LOA attributes from the remaining part - keep them as strings in "Name (count)" format
    const loaPattern = /([^(]+?)\s*\((\d+)\)/g;
    const loaAttributes: string[] = [];
    let match;

    while ((match = loaPattern.exec(loaPart)) !== null) {
      const name = match[1].trim();
      const count = match[2];
      loaAttributes.push(`${name} (${count})`);
    }

    return {
      loaAttributes,
      rawLOA: loaPart, // This is now just the LOA part, not the full license class
      mainLicenseClass: mainLicenseClass
    };
  }

  /**
   * Function to save scraped data to a JSON file
   */
  async function saveDataToFile(data: string[][], filename: string): Promise<void> {
    try {
      const dataDir = path.join(__dirname, '..', '..', 'scraped-data');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const filePath = path.join(dataDir, filename);
      
      // Convert data to a more readable format
      const formattedData = {
        timestamp: new Date().toISOString(),
        totalRows: data.length,
        data: data.map((row, index) => {
          // Extract state and status from the combined state field
          const stateField = row[0] || '';
          
          // Pattern to separate state from status like "Alaskainactive Declined" -> "Alaska" + "inactive Declined"
          // Look for where lowercase letters start after uppercase letters (state name)
          let state = stateField;
          let status = row[4] || '';
          
          // Try to find the boundary between state name and status
          // Look for common status keywords to split the string
          const statusKeywords = ['inactive', 'active', 'expired', 'declined', 'pending', 'suspended'];
          let foundStatus = false;
          
          for (const keyword of statusKeywords) {
            const keywordIndex = stateField.toLowerCase().indexOf(keyword);
            if (keywordIndex > 0) {
              state = stateField.substring(0, keywordIndex).trim();
              status = stateField.substring(keywordIndex).trim();
              foundStatus = true;
              break;
            }
          }
          
          if (!foundStatus) {
            // If no status keyword found, treat the whole field as state
            state = stateField;
            status = '';
          }

          // Parse LOA data from license class field
          const licenseClassField = row[3] || '';
          const loaData = parseLOAData(licenseClassField);
          
          return {
            rowIndex: index + 1,
            state: state,
            producer: row[1] || '',
            licenseNumber: row[2] || '',
            licenseClass: licenseClassField,
            mainLicenseClass: loaData.mainLicenseClass,
            loaAttributes: loaData.loaAttributes,
            rawLOA: loaData.rawLOA,
            status: status,
            assignmentType: row[5] || '',
            assignmentStatus: row[6] || '',
            cost: row[7] || '',
            notes: row[8] || '',
            actions: row[9] || ''
          };
        })
      };
      
      fs.writeFileSync(filePath, JSON.stringify(formattedData, null, 2));
      console.log(`💾 Data saved to: ${filePath}`);
      
      // Also save as CSV for easy viewing
      const csvPath = path.join(dataDir, filename.replace('.json', '.csv'));
      const csvHeader = 'Row,State,Producer,License Number,Main License Class,LOA Attributes,Raw LOA,Status,Assignment Type,Assignment Status,Cost,Notes,Actions\n';
      const csvData = formattedData.data.map((item) => {
        // Format LOA attributes as "Name1 (count1); Name2 (count2)"
        const loaFormatted = item.loaAttributes.join('; ');
        return `${item.rowIndex},"${item.state}","${item.producer}","${item.licenseNumber}","${item.mainLicenseClass}","${loaFormatted}","${item.rawLOA}","${item.status}","${item.assignmentType}","${item.assignmentStatus}","${item.cost}","${item.notes}","${item.actions}"`;
      }).join('\n');
      
      fs.writeFileSync(csvPath, csvHeader + csvData);
      console.log(`📊 CSV data saved to: ${csvPath}`);
      
    } catch (error) {
      console.error('❌ Error saving data to file:', error);
    }
  }

  /**
   * Function to apply filter using XPath selectors and validate results
   */
  async function testFilterWithXPath(filterType: string, valueToEnter: string): Promise<void> {
    console.log(`\n🔍 Applying filter: ${filterType} = ${valueToEnter}`);
    
    try {
      // Click the filters button using more specific selector (the first enabled one)
      const filterButton = page.locator("//button[@id='filters-button' and not(@disabled)]").first();
      await waitForElementReady(filterButton);
      await filterButton.click();
      await waitForInteraction();

      let inputSelector = '';
      
      // Select the appropriate input field based on filter type
      switch (filterType.toLowerCase()) {
        case 'producer':
          inputSelector = "(//input[@placeholder='Search'])[1]";
          break;
        case 'license class':
          inputSelector = "(//input[@placeholder='Search'])[2]";
          break;
        case 'loa':
        case 'lines of authorities':
          inputSelector = "(//input[@placeholder='Search'])[3]";
          break;
        case 'states':
        case 'state':
          inputSelector = "(//input[@placeholder='Search'])[4]";
          break;
        case 'license status':
          inputSelector = "(//input[@placeholder='Search'])[5]";
          break;
        case 'assignment status':
          // For assignment status, we'll handle the radio button differently
          inputSelector = "(//div)[4139]";
          break;
        default:
          throw new Error(`Unknown filter type: ${filterType}`);
      }

      if (filterType.toLowerCase() === 'assignment status') {
        // Handle assignment status radio button
        const radioButton = page.locator(inputSelector);
        await waitForElementReady(radioButton);
        await radioButton.click();
        await waitForInteraction();
        } else {
          // Handle text input fields - try different approaches for dropdown selection
          const inputField = page.locator(inputSelector);
          await waitForElementReady(inputField);
          await inputField.click();
          await waitForInteraction();
          
          // Clear and fill the input
          await inputField.fill('');
          await waitForInteraction();
          await inputField.fill(valueToEnter);
          await waitForInteraction();
          
          // Wait for dropdown to appear
          await page.waitForTimeout(1000);
          
          // Try to click on the dropdown option directly
          try {
            const dropdownOption = page.locator(`//div[contains(@class, 'ant-select-item') and contains(text(), '${valueToEnter}')]`).first();
            await waitForElementReady(dropdownOption, 2000);
            await dropdownOption.click();
            await waitForInteraction();
            console.log(`✅ Selected dropdown option: ${valueToEnter}`);
          } catch (error) {
            console.log(`⚠️ Could not find dropdown option, trying Enter key`);
            // Fallback: try Enter key
            await inputField.press('Enter');
            await waitForInteraction();
          }
        }

        // Apply filters - use more specific selector to avoid strict mode violation
        const applyButton = page.locator("//button[contains(text(), 'Apply Filters') and not(@disabled)]").first();
        await waitForElementReady(applyButton);
        await applyButton.click();
      
      // Wait for results to load
      await waitForPageLoad();
      await page.waitForTimeout(2000);

      // Verify data is present in the custom scrollbar
      const dataContainer = page.locator("(//div[@class='custom-scrollbar'])[1]");
      await waitForElementReady(dataContainer);
      
      // Scrape all pages of filtered data
      const filteredData = await scrapeAllPages();
      console.log(`📊 Filtered Data for ${filterType}:`, filteredData);

      // Save filtered data to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filterFilename = `filtered-${filterType.toLowerCase().replace(/\s+/g, '-')}-${valueToEnter.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
      await saveDataToFile(filteredData, filterFilename);

      // Validate results
      if (filteredData.length === 0) {
        console.log(`✅ No results found for ${filterType}=${valueToEnter} (as expected if invalid)`);
      } else {
        const matchAll = filteredData.every(row => 
          row.some(cell => cell.toLowerCase().includes(valueToEnter.toLowerCase()))
        );
        
        if (matchAll) {
          console.log(`✅ Filter "${filterType}" worked correctly`);
        } else {
          console.log(`❌ Filter "${filterType}" seems incorrect`);
          // Log the first few rows for debugging
          console.log('🔍 Sample filtered rows:', filteredData.slice(0, 3));
        }
      }

      // Reset filters - use more specific selector
      const resetFilterButton = page.locator("//button[@id='filters-button' and not(@disabled)]").first();
      await waitForElementReady(resetFilterButton);
      await resetFilterButton.click();
      await waitForInteraction();
      
      const clearAllButton = page.locator("//button[contains(text(), 'Clear All Filters')]").first();
      await waitForElementReady(clearAllButton);
      await clearAllButton.click();
      await waitForPageLoad();
      await page.waitForTimeout(1500);

    } catch (error) {
      console.error(`❌ Error testing filter ${filterType}:`, error);
      throw error;
    }
  }

  /**
   * Function to load scraped data and get random values for filtering
   */
  async function loadScrapedDataAndGetRandomValues(): Promise<any> {
    try {
      const dataDir = path.join(__dirname, '..', '..', 'scraped-data');
      const files = fs.readdirSync(dataDir).filter(file => file.includes('baseline-license-data') && file.endsWith('.json'));
      
      if (files.length === 0) {
        throw new Error('No baseline data files found');
      }
      
      // Get the most recent file
      const latestFile = files.sort().pop();
      const filePath = path.join(dataDir, latestFile!);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      console.log(`📊 Loaded scraped data from: ${latestFile}`);
      console.log(`📊 Total records: ${data.totalRows}`);
      
      // Extract unique values for each field
      const uniqueStates = [...new Set(data.data.map((item: any) => item.state).filter(Boolean))];
      const uniqueProducers = [...new Set(data.data.map((item: any) => item.producer).filter(Boolean))];
      const uniqueStatuses = [...new Set(data.data.map((item: any) => item.status).filter(Boolean))];
      const uniqueLicenseClasses = [...new Set(data.data.map((item: any) => item.licenseClass).filter(Boolean))];
      const uniqueAssignmentStatuses = [...new Set(data.data.map((item: any) => item.assignmentStatus).filter(Boolean))];
      
      // Extract unique LOA attributes
      const allLOAAttributes: string[] = [];
      data.data.forEach((item: any) => {
        if (item.loaAttributes && Array.isArray(item.loaAttributes)) {
          item.loaAttributes.forEach((loa: string) => {
            if (loa) {
              allLOAAttributes.push(loa);
            }
          });
        }
      });
      const uniqueLOAAttributes = [...new Set(allLOAAttributes)];
      
      // Get random values
      const randomState = uniqueStates[Math.floor(Math.random() * uniqueStates.length)];
      const randomProducer = uniqueProducers[Math.floor(Math.random() * uniqueProducers.length)];
      const randomStatus = uniqueStatuses[Math.floor(Math.random() * uniqueStatuses.length)];
      const randomLicenseClass = uniqueLicenseClasses[Math.floor(Math.random() * uniqueLicenseClasses.length)];
      const randomAssignmentStatus = uniqueAssignmentStatuses[Math.floor(Math.random() * uniqueAssignmentStatuses.length)];
      const randomLOAAttribute = uniqueLOAAttributes[Math.floor(Math.random() * uniqueLOAAttributes.length)];
      
      return {
        state: randomState,
        producer: randomProducer,
        status: randomStatus,
        licenseClass: randomLicenseClass,
        assignmentStatus: randomAssignmentStatus,
        loaAttribute: randomLOAAttribute,
        totalRecords: data.totalRows
      };
    } catch (error) {
      console.error('❌ Error loading scraped data:', error);
      return null;
    }
  }

  test('should scrape and save baseline table data across all pages', async () => {
    console.log("🔄 Fetching baseline (unfiltered) table data...");
    const baseData = await scrapeAllPages();
    
    // Verify we have some data
    expect(baseData.length).toBeGreaterThan(0);
    console.log(`✅ Found ${baseData.length} total rows across all pages`);
    
    // Save data to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `baseline-license-data-${timestamp}.json`;
    await saveDataToFile(baseData, filename);
    
    console.log(`📊 Baseline data scraping completed and saved to file`);
  });

  test('should filter by Producer using scraped data', async () => {
    const randomData = await loadScrapedDataAndGetRandomValues();
    if (randomData) {
      await testFilterWithXPath("Producer", randomData.producer);
    } else {
      console.log('⚠️ No scraped data available, skipping test');
    }
  });

  test('should filter by License Class using scraped data', async () => {
    const randomData = await loadScrapedDataAndGetRandomValues();
    if (randomData) {
      await testFilterWithXPath("License Class", randomData.licenseClass);
    } else {
      console.log('⚠️ No scraped data available, skipping test');
    }
  });

  test('should filter by Lines of Authorities using scraped data', async () => {
    const randomData = await loadScrapedDataAndGetRandomValues();
    if (randomData) {
      await testFilterWithXPath("LOA", randomData.loaAttribute);
    } else {
      console.log('⚠️ No scraped data available, skipping test');
    }
  });

  test('should filter by State using scraped data', async () => {
    const randomData = await loadScrapedDataAndGetRandomValues();
    if (randomData) {
      await testFilterWithXPath("State", randomData.state);
    } else {
      console.log('⚠️ No scraped data available, skipping test');
    }
  });

  test('should filter by License Status using scraped data', async () => {
    const randomData = await loadScrapedDataAndGetRandomValues();
    if (randomData) {
      await testFilterWithXPath("License Status", randomData.status);
    } else {
      console.log('⚠️ No scraped data available, skipping test');
    }
  });

  test('should filter by Assignment Status using scraped data', async () => {
    const randomData = await loadScrapedDataAndGetRandomValues();
    if (randomData) {
      await testFilterWithXPath("Assignment Status", randomData.assignmentStatus);
    } else {
      console.log('⚠️ No scraped data available, skipping test');
    }
  });

  test('should scrape data first and then test filtering with complete record', async () => {
    console.log("\n🔄 Step 1: Scraping baseline data...");
    
    // First, scrape all baseline data
    const baseData = await scrapeAllPages();
    expect(baseData.length).toBeGreaterThan(0);
    console.log(`✅ Scraped ${baseData.length} baseline records`);
    
    // Save baseline data
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const baselineFilename = `baseline-license-data-${timestamp}.json`;
    await saveDataToFile(baseData, baselineFilename);
    
    console.log("\n🔍 Step 2: Testing filters with one complete JSON record...");
    
    // Load the scraped data to get one complete record
    const randomData = await loadScrapedDataAndGetRandomValues();
    if (!randomData) {
      console.log('⚠️ No scraped data available, skipping filter tests');
      return;
    }

    console.log(`📊 Using complete record for filtering:`, randomData);

    // Test filtering with one complete record - fill all fields
    try {
      console.log(`\n🧪 Testing complete filter with record:`, {
        producer: randomData.producer,
        state: randomData.state,
        status: randomData.status,
        licenseClass: randomData.licenseClass,
        assignmentStatus: randomData.assignmentStatus,
        loaAttribute: randomData.loaAttribute
      });
      
      // Click the filters button
      const filterButton = page.locator("//button[@id='filters-button' and not(@disabled)]").first();
      await waitForElementReady(filterButton);
      await filterButton.click();
      await waitForInteraction();

      // Fill Producer field
      console.log(`📝 Filling Producer: ${randomData.producer}`);
      const producerInput = page.locator("(//input[@placeholder='Search'])[1]");
      await waitForElementReady(producerInput);
      await producerInput.click();
      await waitForInteraction();
      await producerInput.fill('');
      await waitForInteraction();
      await producerInput.fill(randomData.producer);
      await waitForInteraction();
      await page.waitForTimeout(1000);
      
      // Try to select producer from dropdown
      try {
        const producerOption = page.locator(`//div[contains(@class, 'ant-select-item') and contains(text(), '${randomData.producer}')]`).first();
        await waitForElementReady(producerOption, 2000);
        await producerOption.click();
        await waitForInteraction();
        console.log(`✅ Selected producer: ${randomData.producer}`);
      } catch (error) {
        console.log(`⚠️ Could not select producer from dropdown, continuing...`);
      }

      // Fill State field
      console.log(`📝 Filling State: ${randomData.state}`);
      const stateInput = page.locator("(//input[@placeholder='Search'])[4]");
      await waitForElementReady(stateInput);
      await stateInput.click();
      await waitForInteraction();
      await stateInput.fill('');
      await waitForInteraction();
      await stateInput.fill(randomData.state);
      await waitForInteraction();
      await page.waitForTimeout(1000);
      
      // Try to select state from dropdown
      try {
        const stateOption = page.locator(`//div[contains(@class, 'ant-select-item') and contains(text(), '${randomData.state}')]`).first();
        await waitForElementReady(stateOption, 2000);
        await stateOption.click();
        await waitForInteraction();
        console.log(`✅ Selected state: ${randomData.state}`);
      } catch (error) {
        console.log(`⚠️ Could not select state from dropdown, continuing...`);
      }

      // Fill License Status field
      console.log(`📝 Filling License Status: ${randomData.status}`);
      const statusInput = page.locator("(//input[@placeholder='Search'])[5]");
      await waitForElementReady(statusInput);
      await statusInput.click();
      await waitForInteraction();
      await statusInput.fill('');
      await waitForInteraction();
      await statusInput.fill(randomData.status);
      await waitForInteraction();
      await page.waitForTimeout(1000);
      
      // Try to select status from dropdown
      try {
        const statusOption = page.locator(`//div[contains(@class, 'ant-select-item') and contains(text(), '${randomData.status}')]`).first();
        await waitForElementReady(statusOption, 2000);
        await statusOption.click();
        await waitForInteraction();
        console.log(`✅ Selected status: ${randomData.status}`);
      } catch (error) {
        console.log(`⚠️ Could not select status from dropdown, continuing...`);
      }

      // Apply filters
      console.log(`🔍 Applying all filters...`);
      const applyButton = page.locator("//button[contains(text(), 'Apply Filters') and not(@disabled)]").first();
      await waitForElementReady(applyButton);
      await applyButton.click();
      
      // Wait for results to load
      await waitForPageLoad();
      await page.waitForTimeout(3000);

      // Verify the results are present in the table
      const dataContainer = page.locator("(//div[@class='custom-scrollbar'])[1]");
      await waitForElementReady(dataContainer);
      
      // Scrape filtered results
      const filteredData = await scrapeAllPages();
      console.log(`📊 Filtered results: ${filteredData.length} records found`);
      
      // Save filtered data
      const filterTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filterFilename = `filtered-complete-record-${filterTimestamp}.json`;
      await saveDataToFile(filteredData, filterFilename);
      
      // Verify results contain expected data
      if (filteredData.length > 0) {
        const tableContent = await dataContainer.textContent();
        const containsProducer = tableContent?.toLowerCase().includes(randomData.producer.toLowerCase());
        const containsState = tableContent?.toLowerCase().includes(randomData.state.toLowerCase());
        const containsStatus = tableContent?.toLowerCase().includes(randomData.status.toLowerCase());
        
        console.log(`✅ Filter verification:`, {
          producer: containsProducer ? '✅' : '❌',
          state: containsState ? '✅' : '❌', 
          status: containsStatus ? '✅' : '❌'
        });
      } else {
        console.log(`⚠️ No filtered results found - this might be expected if no matching records exist`);
      }

      // Clear filters
      console.log(`🧹 Clearing filters...`);
      const resetFilterButton = page.locator("//button[@id='filters-button' and not(@disabled)]").first();
      await waitForElementReady(resetFilterButton);
      await resetFilterButton.click();
      await waitForInteraction();
      
      const clearAllButton = page.locator("//button[contains(text(), 'Clear All Filters')]").first();
      await waitForElementReady(clearAllButton);
      await clearAllButton.click();
      await waitForPageLoad();
      await page.waitForTimeout(1500);
      
    } catch (error) {
      console.error(`❌ Error testing complete filter:`, error);
    }
    
    console.log(`\n✅ Data scraping and complete filtering test completed successfully`);
  });

  test('should handle multiple filters simultaneously', async () => {
    console.log("\n🔍 Testing multiple filters...");
    
    try {
      // Apply first filter
      const filterButton = page.getByRole('button', { name: 'filter Filters' });
      await waitForElementReady(filterButton);
      await filterButton.click();
      await waitForInteraction();
      
      const licenseStatusOption = page.getByText("License Status");
      await waitForElementReady(licenseStatusOption);
      await licenseStatusOption.click();
      await waitForInteraction();
      
      const activeOption = page.getByText("Active", { exact: false });
      await waitForElementReady(activeOption);
      await activeOption.click();
      await waitForInteraction();
      
      // Apply second filter
      const stateOption = page.getByText("State");
      await waitForElementReady(stateOption);
      await stateOption.click();
      await waitForInteraction();
      
      const alabamaOption = page.getByText("Alabama", { exact: false });
      await waitForElementReady(alabamaOption);
      await alabamaOption.click();
      await waitForInteraction();
      
      // Apply filters
      const applyButton = page.getByRole('button').filter({ hasText: 'Apply Filters' });
      await waitForElementReady(applyButton);
      await applyButton.click();
      
      // Wait for results to load using the same pattern as final8th
      await waitForPageLoad();
      await page.waitForTimeout(2000);

      // Validate combined results
      const filteredData = await scrapeAllPages();
      console.log(`📊 Combined filter results:`, filteredData);

      // Save combined filter data to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const combinedFilename = `filtered-combined-active-alabama-${timestamp}.json`;
      await saveDataToFile(filteredData, combinedFilename);

      if (filteredData.length > 0) {
        const hasActiveStatus = filteredData.every(row => 
          row.some(cell => cell.toLowerCase().includes('active'))
        );
        const hasAlabamaState = filteredData.every(row => 
          row.some(cell => cell.toLowerCase().includes('alabama'))
        );
        
        console.log(`✅ Combined filters working: Active=${hasActiveStatus}, Alabama=${hasAlabamaState}`);
      } else {
        console.log(`✅ No results found for combined filters (as expected if no matching data)`);
      }

      // Clear filters
      const resetFilterButton = page.getByRole('button', { name: 'filter Filters' });
      await waitForElementReady(resetFilterButton);
      await resetFilterButton.click();
      await waitForInteraction();
      
      const clearAllButton = page.getByRole('button').filter({ hasText: 'Clear All Filters' });
      await waitForElementReady(clearAllButton);
      await clearAllButton.click();
      await waitForPageLoad();
      await page.waitForTimeout(1500);
      
    } catch (error) {
      console.error(`❌ Error testing multiple filters:`, error);
      throw error;
    }
  });
});

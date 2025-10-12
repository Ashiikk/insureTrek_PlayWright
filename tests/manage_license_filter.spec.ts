const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login
  await page.goto('https://insuretrek.dev.ui.foxsenseprojects.com/');
  await page.getByRole('textbox', { name: 'Enter Email address' }).fill('rolex+local@test.com');
  await page.getByRole('textbox', { name: 'Password *' }).fill('test@123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://insuretrek.dev.ui.foxsenseprojects.com/home');

  // Navigate to State Licenses
  await page.getByRole('button', { name: 'InsureTrek Agency, LLC Admin' }).click();
  await page.getByText('Jpatterson Agency LLC').click();
  await page.getByText('Manage Producers').click();
  await page.getByText('State Licenses').click();

  // Utility: scrape all pages
  async function scrapeAllPages() {
    let allData = [];
    let hasNext = true;

    while (hasNext) {
      // scrape current page rows
      const rows = await page.$$eval("//div[@class='relative'][1]//table//tr", trs =>
        trs.map(tr => Array.from(tr.querySelectorAll('td')).map(td => td.innerText.trim()))
      );
      allData.push(...rows);

      // try to go next page
      const nextBtn = await page.locator("button[aria-label='Go to next page']");
      if (await nextBtn.isEnabled()) {
        await nextBtn.click();
        await page.waitForTimeout(1000); // wait for table to refresh
      } else {
        hasNext = false;
      }
    }
    return allData;
  }

  // Function: apply filter and validate result
  async function testFilter(filterName, valueToSelect) {
    console.log(`\nApplying filter: ${filterName} = ${valueToSelect}`);
    await page.getByRole('button', { name: 'filter Filters' }).click();

    // Pick the right filter dynamically
    await page.getByText(filterName).click();
    await page.getByText(valueToSelect, { exact: false }).click();

    await page.getByRole('button').filter({ hasText: 'Apply Filters' }).click();
    await page.waitForTimeout(1500);

    // Scrape ALL pages of filtered data
    let filteredData = await scrapeAllPages();
    console.log(`Filtered Data for ${filterName}:`, filteredData);

    // Validate
    if (filteredData.length === 0) {
      console.log(`✅ No results found for ${filterName}=${valueToSelect} (as expected if invalid)`);
    } else {
      let matchAll = filteredData.every(row => row.join(" ").includes(valueToSelect));
      console.log(matchAll
        ? `✅ Filter "${filterName}" worked correctly`
        : `❌ Filter "${filterName}" seems incorrect`);
    }

    // Reset filters
    await page.getByRole('button', { name: 'filter Filters' }).click();
    await page.getByRole('button').filter({ hasText: 'Clear All Filters' }).click();
  }

  // Get baseline table across all pages
  console.log("Fetching baseline (unfiltered) table data...");
  let baseData = await scrapeAllPages();
  console.log("Base Data (all pages):", baseData);

  // Test filters
  await testFilter("Producer", "Ademechia D");
  await testFilter("License Class", "Agent");
  await testFilter("Lines of Authorities", "Accident");
  await testFilter("State", "Alabama");
  await testFilter("License Status", "Active");
  await testFilter("Assignment Status", "Assigned");

  console.log("\n✅ Filter + Pagination testing completed.");

  await page.close();
  await context.close();
  await browser.close();
})();

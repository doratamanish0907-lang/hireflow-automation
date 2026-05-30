const { chromium } = require("playwright");

async function searchJobs() {

  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // OPEN NAUKRI

  await page.goto("https://www.naukri.com");

  // SEARCH JOB ROLE

  await page.fill(
    'input[placeholder="Enter skills / designations / companies"]',
    "React Developer"
  );

  // SEARCH LOCATION

  await page.fill(
    'input[placeholder="Enter location"]',
    "Bangalore"
  );

  // CLICK SEARCH

  await page.click(".qsbSubmit");

  // WAIT

  await page.waitForTimeout(5000);

  // GET JOB TITLES

  const jobs = await page.$$eval(
    ".title",
    elements =>
      elements.map(el => el.innerText)
  );

  console.log("Fetched Jobs:");

  console.log(jobs);

}

module.exports = {
  searchJobs,
};
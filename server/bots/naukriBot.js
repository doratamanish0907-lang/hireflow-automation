const { chromium } = require("playwright");

async function searchJobs() {
  // LAUNCH BROWSER

  const browser = await chromium.launch({
    headless: false,
    args: [
      "--start-maximized",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  // CREATE CONTEXT

  const context = await browser.newContext({
    viewport: null,
  });

  // CREATE PAGE

  const page = await context.newPage();

  try {

    console.log("Opening Naukri...");

    // OPEN NAUKRI

    await page.goto("https://www.naukri.com", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    // WAIT

    await page.waitForTimeout(5000);

    // CLOSE POPUPS IF ANY

    try {
      await page.click(".crossIcon", { timeout: 3000 });
    } catch (err) {}

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

    // CLICK SEARCH BUTTON

    await page.click(".qsbSubmit");

    // WAIT FOR RESULTS

    await page.waitForTimeout(7000);

    // GET JOB TITLES

    const jobs = await page.$$eval(
      ".title",
      (elements) =>
        elements.map((el) => ({
          title: el.innerText,
          link: el.href,
        }))
    );

    console.log("Fetched Jobs:");
    console.log(jobs);

    // AUTO OPEN JOBS

    for (let i = 0; i < Math.min(jobs.length, 5); i++) {

      console.log(`Opening Job ${i + 1}`);

      const jobPage = await context.newPage();

      await jobPage.goto(jobs[i].link, {
        waitUntil: "domcontentloaded",
        timeout: 0,
      });

      await jobPage.waitForTimeout(4000);

      try {

        // TRY APPLY BUTTON

        const applyButton = await jobPage.locator(
          'button:has-text("Apply")'
        );

        if (await applyButton.count()) {

          console.log(`Applying for: ${jobs[i].title}`);

          await applyButton.first().click();

          await jobPage.waitForTimeout(3000);

        } else {

          console.log("No Apply Button Found");

        }

      } catch (err) {

        console.log("Apply Error:", err.message);

      }

      await jobPage.close();
    }

  } catch (error) {

    console.log("Bot Error:", error.message);

  }

  // KEEP BROWSER OPEN

  // await browser.close();
}

module.exports = {
  searchJobs,
};
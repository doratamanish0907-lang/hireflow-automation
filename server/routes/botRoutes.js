const express = require("express");

const router = express.Router();

const puppeteer = require("puppeteer");

const path = require("path");

const Profile = require("../models/Profile");

// ==============================
// SEARCH JOBS
// ==============================

router.get("/search-jobs", async (req, res) => {

  let browser;

  try {

    const latestProfile =
      await Profile.findOne().sort({
        _id: -1,
      });

    let preferredRole =
      "react developer";

    if (
      latestProfile &&
      latestProfile.preferredRole
    ) {

      preferredRole =
        latestProfile.preferredRole;

    }

    console.log(
      "Preferred Role:",
      preferredRole
    );

    const searchUrl =
      `https://www.naukri.com/${preferredRole
        .replace(/\s+/g, "-")
        .toLowerCase()}-jobs`;

    browser =
      await puppeteer.launch({

        headless: false,

        defaultViewport: null,

        args: [
          "--start-maximized",
        ],

      });

    const page =
      await browser.newPage();

    await page.goto(searchUrl, {

      waitUntil:
        "networkidle2",

    });

    console.log(
      "Naukri Opened"
    );

    await new Promise(resolve =>
      setTimeout(resolve, 6000)
    );

    // CLOSE POPUP

    try {

      const closeBtn =
        await page.$(".crossIcon");

      if (closeBtn) {

        await closeBtn.click();

        console.log(
          "Popup Closed"
        );

      }

    } catch (error) {

      console.log(
        "Popup Not Found"
      );

    }

    await page.waitForSelector(
      ".srp-jobtuple-wrapper",
      {
        timeout: 20000,
      }
    );

    const jobs =
      await page.evaluate(() => {

        const cards =
          document.querySelectorAll(
            ".srp-jobtuple-wrapper"
          );

        let jobList = [];

        cards.forEach((card) => {

          const title =
            card.querySelector(
              "a.title"
            )?.innerText;

          const company =
            card.querySelector(
              ".comp-name"
            )?.innerText ||
            "Naukri";

          const text =
            card.innerText.toLowerCase();

          let type =
            "External";

          if (

            text.includes("easy apply") ||
            text.includes("apply") ||
            text.includes("apply now") ||
            text.includes("login to apply") ||
            text.includes("register to apply")

          ) {

            type =
              "Apply Available";

          }

          if (title) {

            jobList.push({

              title,

              company,

              type,

            });

          }

        });

        return jobList;

      });

    console.log(
      "Fetched Jobs:",
      jobs
    );

    await browser.close();

    res.json(jobs);

  } catch (error) {

    console.log(
      "SEARCH ERROR:",
      error
    );

    if (browser) {

      await browser.close();

    }

    res.status(500).json({

      success: false,

      error:
        error.message,

    });

  }

});

// ==============================
// REAL AUTO APPLY
// ==============================

router.post(
  "/real-auto-apply",
  async (req, res) => {

    let browser;

    try {

      const latestProfile =
        await Profile.findOne().sort({
          _id: -1,
        });

      let preferredRole =
        "react developer";

      if (
        latestProfile &&
        latestProfile.preferredRole
      ) {

        preferredRole =
          latestProfile.preferredRole;

      }

      console.log(
        "Preferred Role:",
        preferredRole
      );

      const searchUrl =
        `https://www.naukri.com/${preferredRole
          .replace(/\s+/g, "-")
          .toLowerCase()}-jobs`;

      browser =
        await puppeteer.launch({

          headless: false,

          defaultViewport: null,

          userDataDir:
            "./chrome-data",

          args: [
            "--start-maximized",
          ],

        });

      const page =
        await browser.newPage();

      await page.goto(searchUrl, {

        waitUntil:
          "networkidle2",

      });

      console.log(
        "Naukri Opened"
      );

      await new Promise(resolve =>
        setTimeout(resolve, 8000)
      );

      // CLOSE POPUP

      try {

        const closeBtn =
          await page.$(".crossIcon");

        if (closeBtn) {

          await closeBtn.click();

          console.log(
            "Popup Closed"
          );

        }

      } catch (error) {

        console.log(
          "Popup Not Found"
        );

      }

      await page.waitForSelector(
        ".srp-jobtuple-wrapper",
        {
          timeout: 20000,
        }
      );

      const cards =
        await page.$$(
          ".srp-jobtuple-wrapper"
        );

      console.log(
        "Total Jobs:",
        cards.length
      );

      for (
        let i = 0;
        i < Math.min(cards.length, 20);
        i++
      ) {

        let jobPage;

        try {

          console.log(
            "Opening Job:",
            i + 1
          );

          await page.bringToFront();

          const freshCards =
            await page.$$(
              ".srp-jobtuple-wrapper"
            );

          const currentCard =
            freshCards[i];

          if (!currentCard) {

            continue;

          }

          const titleLink =
            await currentCard.$(
              "a.title"
            );

          if (!titleLink) {

            continue;

          }

          const href =
            await page.evaluate(
              el => el.href,
              titleLink
            );

          if (!href) {

            continue;

          }

          // OPEN JOB PAGE

          jobPage =
            await browser.newPage();

          await jobPage.goto(href, {

            waitUntil:
              "networkidle2",

          });

          console.log(
            "Job Opened"
          );

          await new Promise(resolve =>
            setTimeout(resolve, 7000)
          );

          // CLOSE POPUP AGAIN

          try {

            const popupClose =
              await jobPage.$(
                ".crossIcon"
              );

            if (popupClose) {

              await popupClose.click();

              console.log(
                "Popup Closed"
              );

            }

          } catch (error) {

            console.log(
              "Popup Not Found"
            );

          }

          await new Promise(resolve =>
            setTimeout(resolve, 4000)
          );

          // FIND APPLY BUTTON

          const buttons =
            await jobPage.$$(
              "button, a"
            );

          let applyClicked =
            false;

          for (let button of buttons) {

            try {

              const text =
                await jobPage.evaluate(
                  el =>
                    el.innerText,
                  button
                );

              if (!text) {

                continue;

              }

              console.log(
                "Button:",
                text
              );

              const lower =
                text.toLowerCase();

              if (

                (

                  lower.includes("apply") ||
                  lower.includes("easy apply") ||
                  lower.includes("login to apply") ||
                  lower.includes("register to apply")

                ) &&

                !lower.includes("already applied") &&
                !lower.includes("company site") &&
                !lower.includes("save")

              ) {

                console.log(
                  "Apply Button Found"
                );

                await button.evaluate(
                  el =>
                    el.scrollIntoView({
                      behavior:
                        "smooth",
                      block:
                        "center",
                    })
                );

                await new Promise(resolve =>
                  setTimeout(resolve, 3000)
                );

                try {

                  await button.click();

                } catch {

                  await jobPage.evaluate(
                    el => el.click(),
                    button
                  );

                }

                console.log(
                  "Apply Button Clicked"
                );

                applyClicked =
                  true;

                await new Promise(resolve =>
                  setTimeout(resolve, 7000)
                );

                // =========================
                // RESUME UPLOAD
                // =========================

                try {

                  const uploadSelectors = [

                    "input[type='file']",
                    "#attachCV",
                    ".upload-resume input",
                    "input[name='resume']",
                    "input[name='file']",
                    "#file_upload",
                    ".resume-upload input",
                    ".resume-upload-container input",

                  ];

                  let uploaded =
                    false;

                  for (let selector of uploadSelectors) {

                    try {

                      const fileInput =
                        await jobPage.$(
                          selector
                        );

                      if (fileInput) {

                        await fileInput.uploadFile(

                          path.join(
                            __dirname,
                            "../resumes/resume.pdf"
                          )

                        );

                        console.log(
                          "Resume Uploaded"
                        );

                        uploaded =
                          true;

                        break;

                      }

                    } catch (error) {

                      console.log(
                        "Upload Selector Failed:",
                        selector
                      );

                    }

                  }

                  if (!uploaded) {

                    console.log(
                      "Resume Upload Input Not Found"
                    );

                  }

                } catch (error) {

                  console.log(
                    "Resume Upload Failed"
                  );

                }

                // =========================
                // FINAL SUBMIT BUTTON
                // =========================

                try {

                  await new Promise(resolve =>
                    setTimeout(resolve, 5000)
                  );

                  const finalButtons =
                    await jobPage.$$(
                      "button"
                    );

                  let submitted =
                    false;

                  for (let finalBtn of finalButtons) {

                    try {

                      const finalText =
                        await jobPage.evaluate(
                          el =>
                            el.innerText,
                          finalBtn
                        );

                      console.log(
                        "Final Button:",
                        finalText
                      );

                      if (
                        finalText &&
                        (
                          finalText
                            .toLowerCase()
                            .includes("submit") ||

                          finalText
                            .toLowerCase()
                            .includes("apply")
                        )
                      ) {

                        await finalBtn.evaluate(
                          el =>
                            el.scrollIntoView({
                              behavior:
                                "smooth",
                              block:
                                "center",
                            })
                        );

                        await new Promise(resolve =>
                          setTimeout(resolve, 3000)
                        );

                        try {

                          await finalBtn.click();

                        } catch {

                          await jobPage.evaluate(
                            el => el.click(),
                            finalBtn
                          );

                        }

                        console.log(
                          "Final Submit Clicked"
                        );

                        submitted =
                          true;

                        break;

                      }

                    } catch (err) {

                      console.log(
                        "Final Button Error"
                      );

                    }

                  }

                  if (submitted) {

                    return res.json({

                      success: true,

                      message:
                        "Auto Apply Success",

                    });

                  } else {

                    console.log(
                      "Final Submit Failed"
                    );

                  }

                } catch (error) {

                  console.log(
                    "Final Submit Failed"
                  );

                }

              }

            } catch (error) {

              console.log(
                "Button Error"
              );

            }

          }

          if (!applyClicked) {

            console.log(
              "Apply Button Not Found"
            );

          }

          await jobPage.close();

          await page.bringToFront();

        } catch (error) {

          console.log(
            "Job Error:",
            error.message
          );

          if (jobPage) {

            try {

              await jobPage.close();

            } catch {}

          }

        }

      }

      return res.status(400).json({

        success: false,

        message:
          "No Apply Jobs Found",

      });

    } catch (error) {

      console.log(
        "AUTO APPLY ERROR:",
        error
      );

      if (browser) {

        await browser.close();

      }

      res.status(500).json({

        success: false,

        error:
          error.message,

      });

    }

  }
);

module.exports = router;
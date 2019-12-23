// Here's the hooks file, hooks are code that runs before/after a test in the following order:
// Before hooks from top to bottom, After hooks from the bottom to the top.

// Here we set globals for our page objects and utility pages
// so we can access them from anywhere in the code.
// If a new PageObject is added to the PageManager it should be pointed to in here.
global.jsUtils = require('./js-utilities.js');
global.customUntil = require('./custom-until.js');

const otpLib = require('otplib');

// Get the Browser's name and whether it's mobile or not.
Before({}, async () => {
    browser.waitForAngularEnabled(false);
    global.carnivalSearchPage = pageManager.getCarnivalSearchPage();
    global.tripDetailsPage = pageManager.getTripDetailsPage();
    global.tripBookingPage = pageManager.getTripBookingPage();
    await browser.driver.getCapabilities().then((caps) => {
        browser.browserName = caps.get('browserName');
    });
    browser.isMobile = await /Android|iPad|iPhone/i.test(await browser.executeScript('return navigator.userAgent;'));
    if (!(await browser.isMobile)) {
        await browser.driver.manage()
        .window()
        .maximize();
    }
});

// Here we set the skip restart variable base on the tags of the test
// in order to be later evaluated.
Before({ tags: '@skip_restart' }, async function () {
    this.skipRestart = true;
});

// Here we either restart the browser instance or go back to the homepage
// of our application depending on whether skipRestart was set.
After({ timeout: 90000 }, async function () {
    if (!this.skipRestart) {
        await browser.restart();
    } else {
        await browser.get(process.env.URL);
    }
});

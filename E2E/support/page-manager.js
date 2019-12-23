// PageManager class, works by reinstancing pageObjects everytime they are called.
// This avoids sync issues with Protractor and could be considered a workaround.
// Anytime a new page object is created it should be added here with its own methods and in hooks.

const decache = require('decache');

function getCarnivalSearchPage() {
  decache('../pages/carnivalSearch.page.js');
  const CarnivalSearchPage = require('../pages/carnivalSearch.page.js');
  return new CarnivalSearchPage();
}

function getTripDetailsPage() {
  decache('../pages/tripDetails.page.js');
  const TripDetailsPage = require('../pages/tripDetails.page.js');
  return new TripDetailsPage();
}

function getTripBookingPage() {
  decache('../pages/tripBooking.page.js');
  const TripBookingPage = require('../pages/tripBooking.page.js');
  return new TripBookingPage();
}

module.exports = function () {
};

module.exports.getCarnivalSearchPage = getCarnivalSearchPage;
module.exports.getTripDetailsPage = getTripDetailsPage;
module.exports.getTripBookingPage = getTripBookingPage;
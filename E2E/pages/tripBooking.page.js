class TripBookingPage {
    constructor() {
        const until = protractor.ExpectedConditions;
    
        const numOfTravelers = element(by.css('#selecteddNumTavelers1'));

        this.areWeInTripBookingPage = async function () {
            return browser
              .wait(until.visibilityOf(numOfTravelers), 5000)
              .then(() => true, () => false);
        };
    }
}
  
module.exports = TripBookingPage;
class TripDetailsPage {
    constructor() {
        const until = protractor.ExpectedConditions;
    
        const cruiseDescrGlance = element(by.css('#cruiseDescrGlance'));
        const learnMoreItinerary = element.all(by.css('button.about-cta'));
        const dayNSlideImage = element.all(by.css('.hero-image'));
        const dayNTitle = element.all(by.css('.slide > h2'));
        const dayNDescription = element.all(by.css('.description-content'));
        const dayNClose = element(by.css('button.overlay-close-wrapper'));
        const bookNow = element(by.css('booking-button.ng-scope'));

        this.areWeInTripDetailsPage = async function () {
            return browser
              .wait(until.visibilityOf(cruiseDescrGlance), 5000)
              .then(() => true, () => false);
        };

        this.reviewItinerary = async function () {
            const tripDays = await learnMoreItinerary.count();
            for (let i = 0; i < tripDays; i += 1) {
                await this.clickDayNLearnMore(i);
                await this.isAllDayNDetailsVisible();
            }
        };

        this.clickDayNLearnMore = async function (day) {
            await browser.wait(until.elementToBeClickable(learnMoreItinerary.get(day))).then(
                learnMoreItinerary.get(day).click(),
            );
        };

        this.clickDayNClose = async function () {
            await browser.wait(until.elementToBeClickable(dayNClose)).then(
                dayNClose.click(),
            );
        };

        this.isAllDayNDetailsVisible = async function (day) {
            await browser.wait(until.visibilityOf(dayNSlideImage.get(0)));
            await browser.wait(until.visibilityOf(dayNTitle.get(0)));
            await browser.wait(until.visibilityOf(dayNDescription.get(0)));
        };

        this.clickBookNow = async function () {
            await browser.wait(until.elementToBeClickable(bookNow)).then(
                bookNow.click(),
            );
        };
    }
}
  
module.exports = TripDetailsPage;
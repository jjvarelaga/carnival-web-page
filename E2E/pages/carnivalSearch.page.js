class CarnivalSearchPage {
    constructor() {

        const until = protractor.ExpectedConditions;
        
        const singUpModal = element(by.css('.vifp-sweeps-modal-close'));
        const sailToMenu = element(by.css('li[class*="destinations"]'));
        const durationMenu = element(by.css('li[class*="durations"]'));
        const optionByName = function optionByName(destinyPort){
            return element(by.css(`button[aria-label*="${destinyPort}"]`));
        }
        const searchFilterActive = element(by.css('.cdc-filter-button-active'));
        const priceFilterActive = element(by.css('.rz-active'));
        const resultsLearnMoreButton = element.all(by.css('.vrgf-learn-more'));
        const resultsGridView = element(by.css('i[style*="icon-search-view-grid-active"]'));
        const pricingFilter = element(by.css('#sfn-nav-pricing'));
        const minPriceFilter = element(by.css('.rz-pointer-min'));
        const maxPriceFilter = element(by.css('.rz-pointer-max'));
        const arrayCruisePrices = element.all(by.css('.vrgf-price-box__price'));

        // looks if the home page is ready to go, also checks if there is an initial pop up that must be closed
        this.areWeInSearchPage = async function () {
            if(await this.isSingUpModalVisible()){
                await this.clickCloseSingUpModal();
            }
            return browser
              .wait(until.visibilityOf(sailToMenu), 5000)
              .then(() => true, () => false);
        };

        // check if the initial pop up is present
        this.isSingUpModalVisible = async function () {
            return browser
              .wait(until.presenceOf(singUpModal), 5000)
              .then(() => true, () => false);
        };

        // closed the initial pop up
        this.clickCloseSingUpModal = async function () {
            await browser.wait(until.elementToBeClickable(singUpModal)).then(
                singUpModal.click(),
            );
        };

        // it opens the destination menu
        this.clickSailToMenu = async function () {
            await browser.wait(until.elementToBeClickable(sailToMenu)).then(
                sailToMenu.click(),
            );
        };

        // it opens the duration to allow the selection one of the available options
        this.clickDurationMenu = async function () {
            await browser.wait(until.elementToBeClickable(durationMenu)).then(
                durationMenu.click(),
            );
        };

        // either if the option is from destination or duration it will allow to select the option needed using part or the full name
        this.isOptionByNamePrensent = async function (optionName) {
            return browser
              .wait(until.presenceOf(optionByName(optionName)), 5000)
              .then(() => true, () => false);
        }

        // either if the option is from destination or duration it will allow to select the option needed using part or the full name
        this.selectOptionByName = async function (optionName) {
            let optionSelected = false;
            await this.isOptionByNamePrensent(optionName);
            do{
                await this.mouseMoveAndClick(optionByName(optionName));
                optionSelected = await this.isSearchFilterActivePresent();
            }while(!optionSelected);
        };

        // after the selection of an option inside destination/duration menu it confirms that the option selected changes its status to active
        this.isSearchFilterActivePresent = async function () {
            return browser
              .wait(until.presenceOf(searchFilterActive), 2000)
              .then(() => true, () => false);
        };

        // it validate that there is search results
        this.isSearchResultVisible = async function () {
            return browser
              .wait(until.visibilityOf(resultsLearnMoreButton.get(0)), 5000)
              .then(() => true, () => false);
        };

        // it validates that the default view is a grid by checking the class of the display mode
        this.isDefaultViewGrid = async function () {
            await browser.wait(until.visibilityOf(resultsGridView));
            if(await resultsGridView.getAttribute('class')==""){
                return true;
            }else{
                return false;
            } 
        };

        // it displays the pricing filters
        this.clickPricingFilter = async function () {
            await browser.wait(until.elementToBeClickable(pricingFilter)).then(
                pricingFilter.click(),
            );
        };

        // it allows to select the min price filter
        this.clickMinPricingFilter = async function () {
            await browser.wait(until.visibilityOf(minPriceFilter));
            await browser.wait(until.visibilityOf(priceFilterActive));
            await this.mouseMoveAndClick(minPriceFilter);
        };

        // it allows to select the max price filter
        this.clickMaxPricingFilter = async function () {
            await browser.wait(until.visibilityOf(maxPriceFilter));
            await browser.wait(until.visibilityOf(priceFilterActive));
            await this.mouseMoveAndClick(maxPriceFilter);
        };

        // Move mouse to an element and perform a click - this will overcome scroll issue (bugtracker issue 1)
        this.mouseMoveAndClick = async function (element){
            let actionsSeq = await browser.actions();
            await actionsSeq
                .mouseMove(element)
                .click();
            await actionsSeq.perform();
        };

        // Move to the Left/Right x number of times (each time its a 10 usd step)
        this.moveLeftRightKey = async function (keyDirection,numberOfMoves){
            numberOfMoves = numberOfMoves/10;
            if(keyDirection == 'left'){
                for (let i = 1; i <= numberOfMoves; i += 1) {
                    browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
                    await browser.sleep(500);
                }
            }else if(keyDirection == 'right'){
                for (let i = 1; i <= numberOfMoves; i += 1) {
                    browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
                    await browser.sleep(500);
                }
            }
        };

        // it check one by one the price to confirm that default sort is the cheapest first
        this.checkLowesPriceSort = async function (){
            const cruisesCount = await arrayCruisePrices.count();
            let minPrice = await this.getPriceValue(arrayCruisePrices.get(0));
            let nextPrice = 0

            for (let i = 1; i < cruisesCount; i += 1) {
                nextPrice = await this.getPriceValue(arrayCruisePrices.get(i));
                if(nextPrice < minPrice){
                    return false
                }
            }

            return true;
        };

        // it takes from the innerText attribute the price value using a regular expresion
        this.getPriceValue = async function (element){
            const strValue = await element.getAttribute('innerText');
            const minPrice = strValue.match(/(\d+)/);
            return minPrice;
        };

        // it opens the first trip result
        this.clickFirsTripResult = async function(){
            await browser.wait(until.elementToBeClickable(resultsLearnMoreButton.get(0))).then(
                resultsLearnMoreButton.get(0).click(),
            );
        }
    }
}
  
module.exports = CarnivalSearchPage;
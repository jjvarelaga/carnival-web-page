Given('The user opens Carnival home page', async () => {
    await browser.get(`${process.env.URL}`);
    expect(await carnivalSearchPage.areWeInSearchPage()).to.be.true;
});

When('The user clicks over SAIL TO menu', async () => {
    await carnivalSearchPage.clickSailToMenu();
});

When('The user selects {string} as destiny port', async (departurePort) => {
    await carnivalSearchPage.selectOptionByName(departurePort);
});

When('The user clicks over DURATION menu', async () => {
    await carnivalSearchPage.clickDurationMenu();
});

When('The user selects {string} as trip duration', async (duration) => {
    await carnivalSearchPage.selectOptionByName(duration);
});

Given('The search performed by the user returns at least one result', async () => {
    expect(await carnivalSearchPage.isSearchResultVisible()).to.be.true;
});

Then('The default view will be a grid', async () => {
    await carnivalSearchPage.isDefaultViewGrid();
});

When('The user clicks over Pricing filter', async () => {
    await carnivalSearchPage.clickPricingFilter();
});

Then('The user will be able clicks lowest price filter', async () => {
    await carnivalSearchPage.clickMinPricingFilter();
});

Then('The user will be able clicks highest price filter', async () => {
    await carnivalSearchPage.clickMaxPricingFilter();
});

Then('The user will be able to increase the lowest price by {int} usd', async (moneyMoves) => {
    await carnivalSearchPage.moveLeftRightKey('right',moneyMoves);
});

Then('The user will be able to decrease the highest price by {int} usd', async (moneyMoves) => {
    await carnivalSearchPage.moveLeftRightKey('left',moneyMoves);
});

Then('The default price sort will be cheapest first', async () => {
    expect(await carnivalSearchPage.checkLowesPriceSort()).to.be.true;
});

When('The user opens the first result', async () => {
    await carnivalSearchPage.clickFirsTripResult();
});

Then('The user is redirected to the trip details page', async () => {
    expect(await tripDetailsPage.areWeInTripDetailsPage()).to.be.true;
});

Then('The user can open each day detail by clicking in each read more button', async () => {
    await tripDetailsPage.reviewItinerary();
});

Then('The user can book now that trip', async () => {
    await tripDetailsPage.clickBookNow();
});

Then('The user is redirected to booking page', async () => {
    expect(await tripBookingPage.areWeInTripBookingPage()).to.be.true;
});
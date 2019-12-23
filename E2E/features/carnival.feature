Feature: Carnival - Booking flow
    This will test the functionality to search for a trip, filter results, pick one, take a sigh of the Itinery and attemp to book it

    Background:
        Given The user opens Carnival home page
        When The user clicks over SAIL TO menu
        And The user selects "Bahamas" as destiny port
        And The user clicks over DURATION menu
        And The user selects "6 - 9 Days" as trip duration

    Scenario: Carnival - search bahamas cruises - default view
        Given The search performed by the user returns at least one result
        Then The default view will be a grid
    
    Scenario: Carnival - search bahamas cruises - increase lowest price filter
        Given The search performed by the user returns at least one result
        When The user clicks over Pricing filter
        Then The user will be able clicks lowest price filter
        And The user will be able to increase the lowest price by 50 usd
    
    Scenario: Carnival - search bahamas cruises - decrease highest price filter
        Given The search performed by the user returns at least one result
        When The user clicks over Pricing filter
        Then The user will be able clicks highest price filter
        And The user will be able to decrease the highest price by 50 usd

    Scenario: Carnival - search bahamas cruises - default sort cheapest first
        Given The search performed by the user returns at least one result
        Then The default price sort will be cheapest first
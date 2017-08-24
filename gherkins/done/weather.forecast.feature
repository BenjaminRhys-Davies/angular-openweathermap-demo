Feature: User can see forecast weather conditions for each city

  Background:
    Given cities with the following data
    | name       | id     |
    | Bristol    | 100001 |
    | Cardiff    | 100002 |
    | Birmingham | 100003 |
    | Leeds      | 100004 |
    | Sheffield  | 100005 |

  Scenario: User can see which city is in focus
    Given I have loaded the app
    And no city is selected
    When I focus `Bristol`
    When I see that `Bristol` is highlighted

  Scenario: User can see which city is selected
    Given I have loaded the app
    And no city is selected
    When I select a `Bristol`
    Then I see that the `Bristol` is highlighted
    And I see that the Url includes the `100001` id
    And I see the forecast for `Bristol`

  Scenario: User can selected a different city
    Given I have loaded the app
    And I have selected `Sheffield`
    When I select a `Bristol`
    When I see that the `Sheffield` is not highlighted
    And I do not see the forecast for `Sheffield`

  Scenario: User can deselected a city
    Given I have loaded the app
    And I have selected `Bristol`
    When I select `Bristol`
    When I see that the `Bristol` is not highlighted
    And I do not see the forecast for `Bristol`

  Scenario: User can select a city from the Url
    Given I have loaded the app
    And I navigate to `/#/forecast/100004`
    When I see that `Leeds` is highlighted

  Scenario: User can see a 5-day weather forecast for a city
    Given I have loaded the app
    And today's date is the 23/7/2017
    And `Cardiff` has the following forecast data
      | date      | pressure at sea-level at 0900 |
      | 24/7/2017 | 100.1                         |
      | 25/7/2017 | 100.2                         |
      | 26/7/2017 | 100.3                         |
      | 27/7/2017 | 100.4                         |
      | 28/7/2017 | 100.5                         |
    And no city is selected
    When I select `Cardiff`
    Then I see the atmospheric pressure at sea level for the next 5 days at 09:00

  Scenario: User can see a 4-day weather forecast for a city
    Given I have loaded the app
    And today's date is the 23/7/2017
    And the time is after 900hrs
    And `Bristol` has the following forecast data
      | date      | pressure at sea-level at 0900 |
      | 24/7/2017 | 100.1                         |
      | 25/7/2017 | 100.2                         |
      | 26/7/2017 | 100.3                         |
      | 27/7/2017 | 100.4                         |
    And no city is selected
    When I select city `Bristol`
    Then I see the atmospheric pressure on the sea level for the next 4 days at 09:00

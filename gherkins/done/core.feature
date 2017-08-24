Feature: User can see a list of my 5 favourite european cities

  Scenario: User can see list of european cities
    Given I have loaded the app
    Then I see a simple list of 5 european cities
    And I see a name for each city
    And I see the country flag for each city
    And I see a visually appealing image for each city

  Scenario: User can see the source of weather information
    Given I have loaded the app
    Then I see a link to OpenWeatherMap in the footer

  Scenario: User can see the author
    Given I have loaded the app
    Then I see the author's first name in the header
    And I see the author's full name in the footer
    And I see a link to the author's linkedin profile

  Scenario: User can navigate to the home
    Given I have loaded the app
    When I select my first name in the header
    And I see a simple list of 5 european cities
    And no cities are selected

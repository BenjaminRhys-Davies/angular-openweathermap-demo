Feature: User can see current weather conditions for each city

  Scenario: User can see when weather information is loading
    Given I have loaded the app
    When the weather information has not yet loaded
    Then I see each city is transparent

  Scenario: User can see when weather information has loaded
    Given I have loaded the app
    When the weather information has been loaded for a city
    Then I see each city is not transparent

  Scenario: User can see an overview of the current weather
    Given I have loaded the app
    When the weather information has been loaded for a city
    Then I see an icon of the current weather conditions
    And I see the current temperature in degrees celsius
    And I see a word describing current weather parameters

  Scenario: User can see when the sun will rise
    Given I have loaded the app
    When the weather information has been loaded for a city
    Then I see the local time that the sun will rise

  Scenario: User can see whether the sun has already risen
    Given I have loaded the app
    When the weather information has been loaded for a city
    And the local time is after sunrise
    Then I see the time the sun rose in past tense

  Scenario: User can see whether the sun has not yet risen
    Given I have loaded the app
    When the weather information has been loaded for a city
    And the local time is before sunrise
    Then I see the time the sun will rise in future tense

  Scenario: User can see when the sun will set
    Given I have loaded the app
    When the weather information has been loaded for a city
    Then I see the local time that the sun will rise

  Scenario: User can see whether the sun has already set
    Given I have loaded the app
    When the weather information has been loaded for a city
    And the local time is after sunset
    Then I see the time the sun set in past tense

  Scenario: User can see whether the sun has not yet set for a city
    Given I have loaded the app
    When the weather information has been loaded for a city
    And the local time is before sunrise
    Then I see the time sun will set in future tense

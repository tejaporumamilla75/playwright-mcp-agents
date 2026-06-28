Feature: Login functionality
  As a user
  I want to be able to log in to the application
  So that I can access my account and its features

  @smoke @login
  Scenario Outline: Login validation
    Given the user navigates to the login page
    When the user enters username "<username>"
    And the user enters password "<password>"
    And the user clicks the login button
    Then the user should see "<expectedResult>"

    Examples:
      | username        | password      | expectedResult      |
      | Admin           | admin123      | Dashboard           |
      | InvalidUser     | admin123      | Invalid credentials |
      | Admin           | WrongPassword | Invalid credentials |
      | InvalidUser     | WrongPassword | Invalid credentials |
      |                 | admin123      | Required            |
      | Admin           |               | Required            |
      |                 |               | Required            |
      | ' OR '1'='1     | ' OR '1'='1   | Invalid credentials |
      | <script>alert() | admin123      | Invalid credentials |

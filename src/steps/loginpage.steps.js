const { Given,When,Then} = require('@cucumber/cucumber');

Given('the user navigates to the login page', async function () {
        
});

When('the user enters username {string}', async function (username) {
    
    await this.pages.loginPage.enterUsername(username); 
});

When('the user enters password {string}',async function (password) {
    await this.pages.loginPage.enterPassword(password);

});

When('the user clicks the login button', async function () {
    await this.pages.loginPage.clickLogin();

});

Then('the user should see {string}',async  function (expectedMessage) {
    await this.pages.loginPage.verifyLogin(expectedMessage);
}); 

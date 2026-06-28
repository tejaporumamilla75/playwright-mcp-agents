const { expect } = require('@playwright/test');
const Helper = require('../utils/Helper');
class LoginPage {
    helper
    constructor(page) {
        this.page = page;
        this.helper = new Helper(page);
    }
    //Locators
    elements = {
        usernameInput: 'input[name="username"]',
        passwordInput: 'input[name="password"]',
        loginButton: 'button[type="submit"]',
        errorMessage: '//p[text()="Invalid credentials"]',
        requiredFieldError:'//span[text()="Required"]'
    };


    async enterUsername(username) {
        await this.helper.fillElement(this.elements.usernameInput, username);
    }

    async enterPassword(password) {
        await this.helper.fillElement(this.elements.passwordInput, password);
    }

    async clickLogin() {
        await this.helper.clickElement(this.elements.loginButton);
    }

    async login(username, password) {
        await this.helper.fillElement(this.elements.usernameInput, username);
        await this.helper.fillElement(this.elements.passwordInput, password);
        await this.helper.clickElement(this.elements.loginButton); 
    }

    async verifyLoginSuccess() {
        await this.helper.waitForUrl(/.*dashboard\/index/);
        await expect(this.page).toHaveURL(/dashboard\/index/);
    }

    async verifyLogin(expectedMessage) {
        switch(expectedMessage) {
            case 'Dashboard':
                await this.verifyLoginSuccess();
                break;
            case 'Invalid credentials':
                await expect(await this.helper.getElementText(this.elements.errorMessage)).toBe(expectedMessage);
                break;
            case 'Required':
                await expect(await this.helper.getElementText(this.elements.requiredFieldError)).toBe(expectedMessage);
                break;
        }
    }

}

module.exports = LoginPage;

const logger = require('./logger');
class Helper {
    #page
    constructor(page) {
        this.#page = page;
    }
    async clickElement(selector) {
        try {
            await this.#page.locator(selector).click();
            logger.info(`Clicked element with selector: ${selector}`);
        }
        catch (error) {
            logger.error(`Error clicking element with locator ${selector}:`, error.message);
            throw error;
        }
    }
    async fillElement(selector, text) {
        try {
            await this.#page.locator(selector).fill(text);
            logger.info(`Filled element with selector: ${selector} with text: ${text}`);
        }
        catch (error) {
            logger.error(`Error filling element with locator ${selector}:`, error.message);
            throw error;
        }
    }


    async getElementText(selector) {
        try {
            const text = await this.#page.locator(selector).first().textContent();
            logger.info(`Retrieved text from element with selector: ${selector}`);
            return text;
        }
        catch (error) {
            logger.error(`Error retrieving text from element with locator ${selector}:`, error.message);
            throw error;
        }

    }
    async waitForUrl(url){
        try {
            await this.#page.waitForURL(url, { waitUntil: "load" });
            logger.info(`Successfully navigated to the URL: ${url}`);
        }
        catch (error) {
            logger.error(`Error waiting for URL:`, error.message);
            throw error;
        }
    }
}
module.exports = Helper;
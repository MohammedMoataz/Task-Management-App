import { Injectable } from '@nestjs/common'
import { Builder, until, WebDriver } from 'selenium-webdriver/';
import { By } from 'selenium-webdriver/lib/by';
import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class LinkedInScraperService {
  static scrapeProfile = async (url: string): Promise<any> => {
    const options: chrome.Options = new chrome.Options();
    options.addArguments('--headless')
    options.addArguments('--disable-extensions')
    options.addArguments('--disable-popup-blocking')
    options.addArguments('--disable-notifications')
    options.addArguments('--disable-permissions')
    options.addArguments('--profile-directory=Default')
    options.addArguments('--disable-plugins-discovery')

    const driver: WebDriver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {
      await driver.get(url);
      try {
        // Wait for the sign-in pop-up to be visible
        const signInPopupDismissButton = await driver.wait(
          until.elementLocated(By.css('button.modal__dismiss')),
          10000 // Timeout in milliseconds
        );

        // Check if the dismiss button is displayed
        if (await signInPopupDismissButton.isDisplayed()) {
          // Click the dismiss button to close the sign-in pop-up
          await signInPopupDismissButton.click();
        }
      } catch (error) {
        console.error('Sign-in pop-up handling failed:', error);
      }

      await driver.wait(until.titleContains('LinkedIn'), 10000);

      await driver.get(url);

      const fullName = await driver.findElement(By.css('.text-heading-xlarge')).getText();
      const profilePicture = await driver.findElement(By.css('.profile-photo-edit__preview')).getAttribute('src');
      console.log({ fullName, profilePicture });
    } finally {
      await driver.quit();
    }
  }
}
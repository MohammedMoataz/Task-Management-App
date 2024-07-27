import { Injectable } from '@nestjs/common';
import * as WebDriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class LinkedInScraperService {
  private driver: WebDriver;

  constructor() {
    this.driver = new WebDriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options())
      .build();
  }

  async scrapeProfile(url: string): Promise<any> {
    await this.driver.get(url);

    // Wait for the profile name element to be loaded
    const nameElement = await this.driver.wait(
      WebDriver.until.elementLocated(WebDriver.By.css('.text-heading-xlarge')),
      10000,
    );
    const name = await nameElement.getText();

    // Extract headline
    const headlineElement = await this.driver.wait(
      WebDriver.until.elementLocated(
        WebDriver.By.css('.text-body-medium.break-words'),
      ),
      10000,
    );
    const headline = await headlineElement.getText();

    // Extract location
    const locationElement = await this.driver.wait(
      WebDriver.until.elementLocated(
        WebDriver.By.css('.text-body-small.inline.t-black--light.break-words'),
      ),
      10000,
    );
    const location = await locationElement.getText();

    // Extract education
    const educationElement = await this.driver.wait(
      WebDriver.until.elementLocated(
        WebDriver.By.css('.WEXImBnPdRlAqDtIDKjpcvExRsSlTfsNlubgdqbgo'),
      ),
      10000,
    );
    const education = await educationElement.getText();

    // Extract connections
    const connectionsElement = await this.driver.wait(
      WebDriver.until.elementLocated(WebDriver.By.css('.t-bold')),
      10000,
    );
    const connections = await connectionsElement.getText();

    // Close the driver
    await this.driver.quit();

    console.log({
      name,
      headline,
      location,
      education,
      connections,
    });

    return {
      name,
      headline,
      location,
      education,
      connections,
    };
  }
}

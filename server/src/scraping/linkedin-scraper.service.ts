import { Injectable } from '@nestjs/common';
import * as WebDriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class LinkedInScraperService {
  private driver: WebDriver;

  constructor() {
    const options = new chrome.Options();
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-popup-blocking');
    options.addArguments('--profile-directory=Default');
    options.addArguments('--disable-plugins-discovery');

    this.driver = new WebDriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }

  async scrapeProfile(url: string): Promise<any> {
    await this.driver.get(url);
    await this.driver.manage().setTimeouts({ implicit: 1000000 });
    const profileSection = await this.driver.findElement(
      WebDriver.By.css('.pv-top-card'),
    );
    const name = await profileSection
      .findElement(
        WebDriver.By.css(
          '.text-heading-xlarge inline t-24 v-align-middle break-words h1',
        ),
      )
      .getText();
    const title = await profileSection
      .findElement(
        WebDriver.By.css(
          '.ph5 .relative .pv-text-details__left-panel .text-body-medium',
        ),
      )
      .getText();
    const location = await profileSection
      .findElement(WebDriver.By.css('.ph5 .relative .mt2 span'))
      .getText();

    console.log({ name, title, location });
    return { name, title, location };
  }
}

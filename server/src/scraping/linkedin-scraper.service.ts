import { Injectable } from '@nestjs/common';
import { Builder, By, key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class LinkedInScraperService {
  static async scrapeProfile(url: string): Promise<any> {
    const options = new Options();
    // Add any necessary options (e.g., headless mode, user agent, etc.)
    // options.addArguments('--headless');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {
      await driver.get(url);

      // Extract profile picture URL
      const profilePictureUrl = await driver
        .findElement(By.id('ember39'))
        .getAttribute('src');

      // Extract name
      const name = await driver.findElement(By.id('ember39 h1')).getText();

      // Extract title
      const title = await driver
        .findElement(By.css('.vTwcZlYkxdVMszpfvmBbNysvhMylChWQuIs div'))
        .getText();

      return { profilePictureUrl, name, title };
    } finally {
      await driver.quit();
    }
  }
}

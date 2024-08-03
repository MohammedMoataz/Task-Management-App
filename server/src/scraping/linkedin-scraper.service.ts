import { Injectable } from '@nestjs/common'
import { Builder, Key, until, WebDriver } from 'selenium-webdriver/'
import { By } from 'selenium-webdriver/lib/by'
import * as chrome from 'selenium-webdriver/chrome'

@Injectable()
export class LinkedInScraperService {
  /**
   * Scrapes a LinkedIn profile given its URL.
   * @param url The URL of the LinkedIn profile.
   * @returns An object containing the full name, profile picture URL, and about section of the profile.
   * @throws An error if the profile cannot be scraped.
   */
  static scrapeProfile = async (url: string): Promise<any> => {
    // Configure the Chrome driver options
    const options: chrome.Options = new chrome.Options()
    options.addArguments('--disable-extensions') // Disable browser extensions
    options.addArguments('--disable-popup-blocking') // Disable popup blocking
    options.addArguments('--profile-directory=Default') // Use the default Chrome profile
    options.addArguments('--disable-plugins-discovery') // Disable plugin discovery
    options.addArguments('--incognito') // Open in incognito mode
    options.addArguments("--headless") // Run in headless mode

    const driver: WebDriver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()

    // Login to LinkedIn
    await driver.get('https://www.linkedin.com/login')
    await driver.manage().setTimeouts({ implicit: 10000 }) // Set the implicit wait timeout to 10 seconds
    const emailInput = await driver.findElement(By.id('username')) // Find the email input field
    const passwordInput = await driver.findElement(By.id('password')) // Find the password input field
    await emailInput.sendKeys('') // Send an empty string to the email input field (to clear it)
    await passwordInput.sendKeys('', Key.RETURN) // Send an empty string to the password input field and press Enter

    // Wait until the page title contains "LinkedIn" (indicating successful login)
    await driver.wait(until.titleContains('LinkedIn'), 20000)

    // Navigate to the profile page
    await driver.get(url)

    // Find and extract the full name, profile picture URL, and about section of the profile
    const fullName = await driver.findElement(By.css('.text-heading-xlarge')).getText() // Find the full name element and get its text
    const profilePicture = await driver.findElement(By.css('.profile-photo-edit__preview')).getAttribute('src') // Find the profile picture element and get its source URL
    const about = await driver.findElement(By.css("section:has(#about) .pv-shared-text-with-see-more span")).getText() // Find the about section element and get its text

    console.log({ fullName, profilePicture, about })
  }
}

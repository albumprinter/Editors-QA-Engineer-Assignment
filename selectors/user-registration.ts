import {Locator, Page} from '@playwright/test';

export class UserRegistration {
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly confirmPassInout: Locator
  readonly registrationBtn: Locator


  constructor(private page: Page) {
    // bellow locators sounds like cypress dedicated
    // should be aligned and greed on one schema , or it is 3rd party responsibility
    this.emailInput = page.locator("[data-cy=EmailInput]");
    this.passwordInput = page.locator("[data-cy=PasswordInput]")
    this.confirmPassInout = page.locator("[data-cy=ConfirmPasswordInput]")
    this.registrationBtn = page.locator("[data-cy=RegisterButton]")
  }

}
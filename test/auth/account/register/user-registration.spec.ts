import {test} from '../../../../setup';
import {UserRegistration} from '../../../../selectors/user-registration';
import {faker} from '@faker-js/faker';
import {expect} from '@playwright/test';


test.describe("User registration", () => {
  test.beforeEach(async ({ page,getLoginRegisterUrl  }) => {

    const registerUrl = getLoginRegisterUrl("register");
    await page.goto(registerUrl);

  })
  test("Given user wants to register himself", async ({ page }) => {
    const userRegistrationSelectors = new UserRegistration(page)

    await test.step("When type valid email address", async () => {
    await userRegistrationSelectors.emailInput.type(faker.internet.email())
    });

    await test.step("And type his valid password", async () => {
      await userRegistrationSelectors.passwordInput.type('Password!02')

    });
    await test.step("And confirm pass", async () => {
      await userRegistrationSelectors.confirmPassInout.type('Password!02')

    });

    await test.step("Then user is registered", async () => {
      await page.route('https://t-dtap.login.albelli.com/api/register', (route) => {
        route.fulfill({
          status: 200
        });
      });
    })

    await test.step("And submit", async () => {
      await userRegistrationSelectors.registrationBtn.click()
    });
  });
});
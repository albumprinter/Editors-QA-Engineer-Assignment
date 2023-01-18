import {test} from '../../../../setup';

test.describe("User registration", () => {
  test.beforeEach(async ({ page,getLoginRegisterUrl  }) => {
    const registerUrl = getLoginRegisterUrl("register");
    await page.goto(registerUrl);

  })
  test("Given user wants to register himself", async ({ page }) => {

    await test.step("When type valid email address", async () => {
      console.log('Typing email address')
    });

    await test.step("And type his valid password", async () => {
      console.log('type pass')
    });
    await test.step("And submit", async () => {
      console.log('submit')
    });
    await test.step("Then user is registered", async () => {
      console.log('registration summary')
    })
  });
});
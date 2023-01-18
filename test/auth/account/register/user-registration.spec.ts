import {test} from '../../../../setup';


test.describe("User registration", () => {
  test.beforeEach(async ({ page,getLoginRegisterUrl  }) => {
    const registerUrl = getLoginRegisterUrl("register");
    await page.goto(registerUrl);

  })
  test("Given user wants to register himself", async ({ page }) => {

    await test.step("And ", async () => {
   console.log('Here IM')
    });

    await test.step("And type his valid email adress", async () => {
      console.log('type email')
    });
    await test.step("And type his valid password", async () => {
      console.log('type pass')
    });
    await test.step("And submit", async () => {
      console.log('submit')
    });

  });
});
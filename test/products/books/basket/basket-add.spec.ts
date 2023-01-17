import { expect } from "@playwright/test";
import { test } from "../../../../setup";
import { PhotoSelectorLayout } from "../../../../selectors/layouts";
import {EditorStep3} from '../../../../selectors/editor-step-3';
import {ProductConfig} from '../../../../selectors/product-config';

test.describe("Photobook Basket - Adding selected photos to Basket, setting Title, Canceling and Confirming", () => {
  test.beforeEach(async ({ page,getInstantEditorUrl  }) => {
    let photoSelector = new PhotoSelectorLayout(page);
    const editorUrl = getInstantEditorUrl("bonusprint.co.uk", "HardCoverPhotoBook", "PAP_360");
    await page.goto(editorUrl);
    await photoSelector.createAndUploadRandomPhotos(1);
    await photoSelector.waitForUploadsComplete();
    await photoSelector.clickOnUsePhotos();
  })

  test.skip("Given Client wants to add selected photos to basket", async ({page}) => {
    const editorSelectors = new EditorStep3(page);

    await test.step("When click Add to basket button", async () => {
      await editorSelectors.clickAddToBasketBtn();
    });

    await test.step("Then I can see Editing Dialogue Window", async () => {
      await expect(editorSelectors.editingDialogueTitle).toBeVisible()
      await expect(editorSelectors.editingDialogueCancel).toBeVisible()
      await expect(editorSelectors.editingDialogueConfirm).toBeVisible()
    });
  });

  test.skip("Given Client wants to Confirm Basket without setting Title", async ({page}) => {
    let editorSelectors = new EditorStep3(page);

    await test.step("When click Confirm without setting Title", async () => {
      await editorSelectors.clickAddToBasketBtn();
      await editorSelectors.clickConfirmEdtDialogue();

      // await editorSelectors.editingDialogueTitle.type('');
    });

    await test.step("Then Error message is shown", async () => {
      await expect(editorSelectors.editingDialogueTitleErr).toBeVisible();

    });
  });


  test.skip("Given Client wants to Confirm Basket, set valid Title and finalise Editing Dialogue", async ({page}) => {
    const editorSelectors = new EditorStep3(page);


    await test.step("When Client set a valid Title", async () => {
      await editorSelectors.clickAddToBasketBtn();
      await editorSelectors.editingDialogueTitle.type('Valid Title');
    });

    await test.step("And click Confirm button", async () => {
      await editorSelectors.editingDialogueConfirm.click();
    });

    await test.step("Then Error message is not shown", async () => {
      // await expect(editorSelectors.editingDialogueWindow).toBeVisible();

      // await editorSelectors.editingDialogueConfirm.click();

      // await expect(editorSelectors.editingDialogueWindow).not.toBeVisible();

    });

    //This step is not valid anymore - was chown only once
    // await test.step("And The Feedback Form is visible ", async () => {
    //   await expect(editorSelectors.campaignForm).toBeVisible();
    // });
  });


  test("Given Client wants to finalise his choices and confirm basket", async ({page}) => {
    const editorSelectors = new EditorStep3(page);
    const productConfig = new ProductConfig(page)


    await test.step("And Client do not want to change anything", async () => {
      await editorSelectors.clickAddToBasketBtn();
      await editorSelectors.editingDialogueTitle.type('Valid Title');

      // scenario
      // await editorSelectors.editingDialogueTitle.press('Enter');
      // await editorSelectors.editingDialogueConfirm.isVisible()
      // await page.locator('[data-tam="cover"]').click()
      // await page.locator('[class="edit-cover-button save-button"]').click({force:true})
      // await page.locator('[data-tam="cancel-cover-edit"]').click({force:true})


      await page.locator('header>span[class="edit-cover-button save-button"]').isVisible()
      await page.locator('header>span[class="edit-cover-button save-button"]').click({force:true})

    });


    await test.step("When click Add to Basket button", async () => {
      await editorSelectors.clickAddToBasketBtn();
      await editorSelectors.finaliseDialogueWindow.isVisible()



    });

    await test.step("And click Continue anyway button", async () => {
      await editorSelectors.finaliseDialogueContinue.click()
    });

    await test.step("And product config page is visible ", async () => {
      await expect(productConfig.productLoading).not.toBeVisible()
    await expect(productConfig.yourPhotoBookTitle).toBeVisible()
    });
  });
});

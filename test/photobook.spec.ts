import { test } from "../setup";
import { PhotoSelectorLayout } from "../src/pages/layouts";

test.describe("Photobook", () => {
  test.beforeEach(async ({ page, getInstantEditorUrl }) => {
    await test.step("open photobook", async () => {
      const editorUrl = getInstantEditorUrl("bonusprint.co.uk", "HardCoverPhotoBook", "PAP_360");
      await page.goto(editorUrl);
    });
  });

  test("upload photos", async ({ page }) => {
    const photoSelector = new PhotoSelectorLayout(page);

    await test.step("upload images", async () => {
      await photoSelector.createAndUploadRandomPhotos(24);
      await photoSelector.waitForUploadsComplete();
      await photoSelector.clickOnUsePhotos();
    });
  });

  test("user photo book creation flow", async ({ page }) => {
    const photoSelector = new PhotoSelectorLayout(page);

    await test.step("upload images", async () => {
      await photoSelector.createAndUploadRandomPhotos(2);
      await photoSelector.waitForUploadsComplete();
      await photoSelector.clickOnUsePhotos();
      await photoSelector.waitForPhotoBookIsReady();
    });

    await test.step("edit photobook title", async () => {
      await photoSelector.clickOnEditYourBookTitle();
      await photoSelector.titleCreationModal.enterTitle("My Family Album");
      await photoSelector.titleCreationModal.clickOnApplyBtn();
    });

    await test.step("complete creation flow with empty pages modal", async () => {
      await photoSelector.clickOnAddToBasket();
      await photoSelector.emptyPagesModal.clickOnContinueAnywayButton();
      await photoSelector.checkPhotoBookIsCreated();
    });
  });
});

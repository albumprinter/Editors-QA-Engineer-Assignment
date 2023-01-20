import { test } from "../../../setup";
import { PhotoSelectorLayout } from "../../../helpers/photosGenerator";

test.describe("Photobook", () => {
  test("happy path", async ({ page, getInstantEditorUrl }) => {
    await test.step("open photobook", async () => {
      const editorUrl = getInstantEditorUrl("bonusprint.co.uk", "HardCoverPhotoBook", "PAP_360");
      await page.goto(editorUrl);
    });

    await test.step("upload photos", async () => {
      const photoSelector = new PhotoSelectorLayout(page);
      await photoSelector.createAndUploadRandomPhotos(24);
      await photoSelector.waitForUploadsComplete();
      await photoSelector.clickOnUsePhotos();
    });

  });
});

import { writeFile, mkdir } from "fs/promises";
import { expect, Page } from "@playwright/test";
import { toPng } from "jdenticon";
import TitleCreationModal from "../modals/titleCreationModal";
import EmptyPagesModal from "../modals/emptyPagesModal";

export class PhotoSelectorLayout {
  readonly completeTitle = 'h2:has-text("Check out the options for your photo book!")';
  readonly headerTitle = 'h3:has-text("Your photo book is ready")';
  readonly addPhotosButton = "[data-tam=add-photos-button]";
  readonly addToBasketButton = "[data-tam=add-to-basket]";
  readonly browsePhotosInput = "[data-tam=browse-photos]";
  readonly uploadStatsText = "[data-tam=upload-stats]";
  readonly editYourBookTitleBtn = ".edit-btn";

  readonly titleCreationModal = new TitleCreationModal(this.page);
  readonly emptyPagesModal = new EmptyPagesModal(this.page);

  constructor(private page: Page) { }

  /**
   * Create and upload a certain amount of PNG photos.
   * @param amount
   */
  async createAndUploadRandomPhotos(amount = 24, resolution = 2000): Promise<number> {
    const path = `./node_modules/.temp/${String(Math.random()).slice(2)}/`;
    await mkdir(path, { recursive: true });
    const images = await Promise.all(
      // Generate PNG images.
      new Array(amount).fill(0).map(async () => {
        const file = `${path}/${String(Math.random()).slice(2)}.png`;
        const png = toPng(file, resolution);
        await writeFile(file, png);
        return file;
      })
    );
    // Set the photos as input to the test.
    await this.page.setInputFiles(this.browsePhotosInput, images);
    return images.length;
  }

  async waitForUploadsComplete(): Promise<void> {
    await this.page.waitForSelector(this.uploadStatsText, { state: "visible" });
    await this.page.waitForSelector(this.uploadStatsText, { state: "detached" });
  }

  async waitForPhotoBookIsReady(): Promise<void> {
    await this.page.waitForSelector(this.headerTitle, { state: "visible" });
  }

  async clickOnUsePhotos(): Promise<void> {
    await this.page.click(this.addPhotosButton);
  }

  async clickOnEditYourBookTitle(): Promise<void> {
    await this.page.click(this.editYourBookTitleBtn);
  }

  async clickOnAddToBasket(): Promise<void> {
    await this.page.click(this.addToBasketButton);
  }

  async checkPhotoBookIsCreated(): Promise<void> {
    await this.page.waitForSelector(this.completeTitle, { state: "visible" });
    await expect(this.page).toHaveURL(/ProductConfiguration/);
  }
}

import { writeFile, mkdir } from "fs/promises";
import type { Page } from "@playwright/test";
import { toPng } from "jdenticon";

export class PhotoSelectorLayout {
  readonly browsePhotosInput = "[data-tam=browse-photos]";
  readonly uploadStatsText = "[data-tam=upload-stats]";
  readonly addPhotosButton = "[data-tam=add-photos-button]";

  constructor(private page: Page) {}

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

  async clickOnUsePhotos(): Promise<void> {
    await this.page.click(this.addPhotosButton);
  }
}

import {Locator, Page} from '@playwright/test';

export class ProductConfig {
  readonly yourPhotoBookTitle: Locator
  readonly productLoading: Locator



  constructor(private page: Page) {
    //bellow CSS selector is anitpatern and should be replaced with data-testid
    this.yourPhotoBookTitle = page.locator("h1.container-title");
    this.productLoading = page.locator("[data-testid=loading]");

  }
}

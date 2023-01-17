import {expect, Locator, Page} from '@playwright/test';

export class EditorStep3 {
  readonly addToBasketBtn: Locator
  readonly stepIndicator: Locator
  readonly dataPrintSurface: Locator
  readonly editingDialogueWindow: Locator
  readonly editingDialogueCancel: Locator
  readonly editingDialogueConfirm: Locator
  readonly editingDialogueTitle: Locator
  readonly editingDialogueTitleErr: Locator
  readonly campaignForm: Locator
  readonly finaliseDialogueWindow: Locator
  readonly finaliseDialogueContinue: Locator
  readonly finaliseDialogueBack: Locator



  constructor(private page: Page) {
    this.addToBasketBtn = page.locator("[data-tam=add-to-basket]");
    this.stepIndicator = page.locator("[data-tam=step-indicator]");
    this.dataPrintSurface= page.locator("[data-tam=print-surface]");

    this.editingDialogueWindow = page.locator("[data-testid=dialog-window]");
    this.editingDialogueCancel = page.locator("[data-tam=cancel-cover-edit]");
    // this.editingDialogueConfirm = page.locator("[data-tam=confirm-cover-edit]");
    this.editingDialogueConfirm = page.locator("[data-tam=\"confirm-cover-edit\"]");
    //TODO add data-testid for bellow selector
    this.editingDialogueTitle = page.locator("[placeholder=\"Enter a title\"]:required");
    this.editingDialogueTitleErr = page.locator(".status-container");
    this.campaignForm = page.locator("form[campaign-form]");
    this.finaliseDialogueContinue = page.locator("[data-testid=dialog-button][data-tam=dismiss-warning]");
    this.finaliseDialogueBack = page.locator("[data-testid=dialog-button][data-tam=resolve-warning]");
    this.finaliseDialogueWindow = page.locator("[data-testid=dialog-window]");

  }

  async clickAddToBasketBtn() {
    await this.addToBasketBtn.click();
    await expect(this.editingDialogueWindow).toBeVisible();
  }

  async clickConfirmEdtDialogue() {
    await this.editingDialogueConfirm.click();
  }


}

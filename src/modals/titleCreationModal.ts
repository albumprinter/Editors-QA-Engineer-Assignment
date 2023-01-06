import type { Page } from "@playwright/test";

export default class TitleCreationModal {
    private readonly modalContainer = "[data-testid=dialog-window]";
    private readonly inputField = `${this.modalContainer} input`;
    private readonly applyButton = `${this.modalContainer} [data-tam=confirm-cover-edit]`;

    constructor(private page: Page) { }

    async enterTitle(title: string): Promise<void> {
        await this.page.type(this.inputField, title, { delay: 200 });
    }

    async clickOnApplyBtn(): Promise<void> {
        await this.page.click(this.applyButton);
    }
}

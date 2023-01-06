import type { Page } from "@playwright/test";

export default class EmptyPagesModal {
    private readonly modalContainer = "[data-testid=dialog-window]";
    private readonly continueAnywayButton = `${this.modalContainer} [data-tam=dismiss-warning]`;

    constructor(private page: Page) { }

    async clickOnContinueAnywayButton(): Promise<void> {
        await this.page.click(this.continueAnywayButton);
    }
}

import { Locator, Page, test } from '@playwright/test';

export class SandboxPage {
    //attributs
    readonly page: Page;     //Instance de la page Playwright
    readonly pastaCheckBox: Locator; //Localisateur pour la case à cocher "Pasta"


    //constructor
    constructor(page: Page) {
        this.page = page;
        this.pastaCheckBox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
    }

    //methods
    async checkPastaCheckbox() {
        await this.pastaCheckBox.check();
    }

    async uncheckPastaCheckbox() {
        await this.pastaCheckBox.uncheck();
    }
}


import { expect , Locator, Page, test } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

test.describe('Tests automatisées sur le Sandbox FreeRangeTesters', () => {
    test('Tester le comportement de Checkboxes', async ({ page }) => {
        const sandBox = new SandboxPage(page);
        
        await test.step('Je me rends sur le sandbox FreeRangeTesters', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })
        
        await test.step('Je selectionne le checkbox Pasta', async () => {
            await sandBox.checkPastaCheckbox();
            expect(await sandBox.pastaCheckBox.isChecked()).toBeTruthy();
        })
        
        //attendre 5 secondes avant de modifier  nouveau l'état du checkbox
        await page.waitForTimeout(5000);

        await test.step('Je décoche le checkbox pasta', async () => {
            await sandBox.uncheckPastaCheckbox();
            expect(await sandBox.pastaCheckBox.isChecked()).toBeFalsy();
        })
        
    })        
})
    


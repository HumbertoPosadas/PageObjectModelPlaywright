import { expect, test } from '@playwright/test';

/*
 L'exapmple suivant montre comment faire un mock d'une reponse API avec Playwright. 
 Il intercepte la requete avant qu'elle soie envoyée à l'API des fruits et renvoie une reponse personnalisee.
 Consiste a placer un listener dans le endpoint de l'API que l'on souhaite mocker pour en suite personaliser la reponse avec un 
 json custom.
 Dans cet example, la requete n'a pas été reçue par l'API des fruits, car elle a été interceptée par Playwright. Nous avons envoyé une reponse 
 completement differente a celle que l'API aurait renvoyée.
 */
test.describe('Fonctionnement Mocks avec Playwright', () => {
    test('Faire un mock d\'un fruit qui ne viens pas de l\' API', async ({ page }) => {
        await page.route('*/**/api/v1/fruits', async route => {
            const json = [{ name: 'Guanabana', id: 26}]
            await route.fulfill({json})
        })

        // Aller sur la page
        await page.goto('https://demo.playwright.dev/api-mocking');

        //Valider que le fruit est bien dans la liste
        await expect(page.getByText('Guanabana')).toBeVisible();
    })
    
})

/*
L'example suivant montre comment rajouter des fausses donnees à la reponse de l'API sans supprimer les donnees d'origine.
Consiste a placer un listener dans le endpoint de l'API que l'on souhaite mocker pour en suite recuperer la reponse d'origine,
sur la reponse recupérée on rajoute nos fausses données avant de renvoyer la reponse complete, de cette maniere 
les donnees d'origine sont conservées.
*/
test.describe('Rajouter des fausses donnees à la reponse de l\' API', () => {
    test('Je rajoute des elements dans la reponse originale', async ({ page }) => {
        await page.route('*/**/api/v1/fruits', async route => {
            const response = (await route.fetch()); // Recupere la reponse originale de l'API
            const originalJson = await response.json(); // Parse la reponse en JSON
            originalJson.push({ name: 'Dragon Fruit', id: 27 }, { name: 'Starfruit', id: 28 });

            await route.fulfill({response, json: originalJson}); // Renvoie la reponse complete avec les nouvelles donnees
        })

        // Aller sur la page
        await page.goto('https://demo.playwright.dev/api-mocking');

        //Valider que les nouveaux fruits sont bien dans la liste
        await expect(page.getByText('Dragon Fruit')).toBeVisible();
        await expect(page.getByText('Starfruit')).toBeVisible();
    })
    
    
})


import { test, expect } from '../fixtures/mainUserGaragePage'; 
import { usersList } from '../test-data/users';

test.describe('Profile Name Interception Test with Storage State', () => {

    test('Should display modified profile name on the Profile page', async ({ page }) => {

        await page.route('**/api/users/profile', async (route) => {
            const originalResponse = await route.fetch();
            const json = await originalResponse.json();

            json.data.name = 'Polar';
            json.data.lastName = 'Bear';

            await route.fulfill({
                response: originalResponse,
                body: JSON.stringify(json),
                headers: {
                    ...originalResponse.headers(),
                    'content-type': 'application/json',
                },
            });
        });


        await page.goto('https://qauto.forstudy.space');
        await page.getByRole('link', { name: 'Profile' }).click();


        const profileName = page.locator('.profile_name');
        await expect(profileName).toContainText('Polar Bear');
        await expect(profileName).not.toContainText(usersList.mainUser.email.split('@')[0]);
    });
});

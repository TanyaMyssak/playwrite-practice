import test, { expect, Locator } from "@playwright/test";
import { usersList } from "../../test-data/users";
import HomePage from "../../POM/pages/HomePage";
import SignInForm from "../../POM/forms/SignInForm";
import GaragePage from "../../POM/pages/GaragePage";

let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

test.describe('Login to users and save states', () => {

    test.beforeEach((async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.open();
        await homePage.clickSignInButton();
    }));

    test('Login mainUser and save storage state', async ({ page }) => {
        await signInForm.loginWithCredentials(usersList.mainUser.email, usersList.mainUser.password);
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: 'test-data/states/mainUserState.json' });
    });
    test('Login secondUser and save storage state', async ({ page }) => {
        await signInForm.loginWithCredentials(usersList.secondUser.email, usersList.secondUser.password);
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: 'test-data/states/secondUserState.json' });
    });
});
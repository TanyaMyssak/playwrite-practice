import test from "@playwright/test";
import GaragePage from "../POM/pages/GaragePage";
import SignInForm from "../POM/forms/SignInForm";
import HomePage from "../POM/pages/HomePage"; 
import { usersList } from "../test-data/users";

let garagePage: GaragePage;
let signinForm: SignInForm;
let homePage: HomePage;

test.describe('Garage Page tests', () => {
    
test.use({storageState: 'test-data/states/mainUserState.json'});
    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        signinForm = new SignInForm(page);
        homePage = new HomePage(page);

      /*   await homePage.open();
        await homePage.clickSignInButton();
        await signinForm.loginWithCredentials(usersList.mainUser.email, usersList.mainUser.password);
        await garagePage.verifyPageIsOpen(); */
        await garagePage.open();
    });

 /*  test.afterAll(async ({ page }) => {
        // Create fresh instances for cleanup
        const cleanupGaragePage = new GaragePage(page);
        const cleanupSigninForm = new SignInForm(page);
        const cleanupHomePage = new HomePage(page);

        await cleanupHomePage.open();
        await cleanupHomePage.clickSignInButton();
        await cleanupSigninForm.loginWithCredentials(usersList.mainUser.email, usersList.mainUser.password);
        await cleanupGaragePage.verifyPageIsOpen();
        await cleanupGaragePage.deleteAllCars();
    }) */;

    test('Add BMW X5 to Garage', async () => {
        await garagePage.addNewCar('BMW', 'X5', '133');
        await garagePage.verifyLastAddedCarName('BMW X5');
    });

    test('Add Porsche Panamera to Garage', async () => {
        await garagePage.addNewCar('Porsche', 'Panamera', '633');
        await garagePage.verifyLastAddedCarName('Porsche Panamera');
    });

    test('Add Audi A6 to Garage', async () => {
        await garagePage.addNewCar('Audi', 'A6', '7333');
        await garagePage.verifyLastAddedCarName('Audi A6'); 
    });

    test('Add Audi R8 to Garage', async () => {
        await garagePage.addNewCar('Audi', 'R8', '933');
        await garagePage.verifyLastAddedCarName('Audi R8');
    });

    test('Add Fiat Panda to Garage', async () => {
        await garagePage.addNewCar('Fiat', 'Panda', '1233');
        await garagePage.verifyLastAddedCarName('Fiat Panda');
    });
});

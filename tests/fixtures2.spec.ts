import { test } from '@playwright/test';
import GaragePage from '../POM/pages/GaragePage';
import { test as secondUserTest } from '../fixtures/secondUserGaragePage';

secondUserTest.describe('Second user Garage tests', () => {
  let secondUserGaragePage: GaragePage;

  secondUserTest.beforeEach(async ({ secondUserGaragePage }) => {
    await secondUserGaragePage.open();
  });

  secondUserTest.afterEach(async ({ secondUserGaragePage }) => {
    await secondUserGaragePage.deleteAllCars();
  });

  secondUserTest('Second user adds Porsche Panamera', async ({ secondUserGaragePage }) => {
    await secondUserGaragePage.addNewCar('Porsche', 'Panamera', '633');
    await secondUserGaragePage.verifyLastAddedCarName('Porsche Panamera');
  });
  secondUserTest('Second user adds Porsche 911', async ({ secondUserGaragePage }) => {
    await secondUserGaragePage.addNewCar('Porsche', '911', '9113');
    await secondUserGaragePage.verifyLastAddedCarName('Porsche 911');
  });
   secondUserTest('Second user adds Porsche Cayenne', async ({ secondUserGaragePage }) => {
    await secondUserGaragePage.addNewCar('Porsche', 'Cayenne', '23');
    await secondUserGaragePage.verifyLastAddedCarName('Porsche Cayenne');
  });
})
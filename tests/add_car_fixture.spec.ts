import { test } from '@playwright/test';
import { test as mainUserTest } from '../fixtures/mainUserGaragePage';
import { test as secondUserTest } from '../fixtures/secondUserGaragePage';

mainUserTest('Main user adds BMW X5', async ({ mainUserGaragePage }) => {
  await mainUserGaragePage.addNewCar('BMW', 'X5', '100');
  await mainUserGaragePage.verifyLastAddedCarName('BMW X5');
});

secondUserTest('Second user adds Porsche Panamera', async ({ secondUserGaragePage }) => {
  await secondUserGaragePage.addNewCar('Porsche', 'Panamera', '633');
  await secondUserGaragePage.verifyLastAddedCarName('Porsche Panamera');
});

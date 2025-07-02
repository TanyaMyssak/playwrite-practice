
import { test as secondUserTest } from '../fixtures/secondUserGaragePage';


secondUserTest('Second user adds Porsche Panamera', async ({ secondUserGaragePage }) => {
  await secondUserGaragePage.addNewCar('Porsche', 'Panamera', '633');
  await secondUserGaragePage.verifyLastAddedCarName('Porsche Panamera');
});


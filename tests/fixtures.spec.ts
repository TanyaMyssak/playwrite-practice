import { test as mainUserTest } from '../fixtures/mainUserGaragePage';


mainUserTest('Main user adds BMW X5', async ({ mainUserGaragePage }) => {
  await mainUserGaragePage.addNewCar('BMW', 'X5', '100');
  await mainUserGaragePage.verifyLastAddedCarName('BMW X5');
});




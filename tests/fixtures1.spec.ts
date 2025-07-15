import { test as mainUserTest } from '../fixtures/mainUserGaragePage';
import GaragePage from '../POM/pages/GaragePage';


mainUserTest.describe('Main user Garage tests', () => {
  let mainUserGaragePage: GaragePage;

  mainUserTest.beforeEach(async ({ mainUserGaragePage }) => {
    await mainUserGaragePage.open();
  });

  mainUserTest.afterEach(async ({ mainUserGaragePage }) => {
    await mainUserGaragePage.deleteAllCars();
  });

  mainUserTest('Main user adds BMW 3', async ({ mainUserGaragePage }) => {
    await mainUserGaragePage.addNewCar('BMW', '3', '633');
    await mainUserGaragePage.verifyLastAddedCarName('BMW 3');
  });
  mainUserTest('Main user adds BMW 5', async ({ mainUserGaragePage }) => {
    await mainUserGaragePage.addNewCar('BMW', '5', '9113');
    await mainUserGaragePage.verifyLastAddedCarName('BMW 5');
  });
   mainUserTest('Main user adds BMW X5', async ({ mainUserGaragePage }) => {
    await mainUserGaragePage.addNewCar('BMW', 'X5', '1023');
    await mainUserGaragePage.verifyLastAddedCarName('BMW X5');
  });
    mainUserTest('Main user adds BMW X6', async ({ mainUserGaragePage }) => {
    await mainUserGaragePage.addNewCar('BMW', 'X6', '123');
    await mainUserGaragePage.verifyLastAddedCarName('BMW X6');
  });
     mainUserTest('Main user adds BMW Z3', async ({ mainUserGaragePage }) => {
    await mainUserGaragePage.addNewCar('BMW', 'Z3', '23');
    await mainUserGaragePage.verifyLastAddedCarName('BMW Z3');
  });
})
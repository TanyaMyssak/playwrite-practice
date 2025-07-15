import { test as base } from '@playwright/test';
import GaragePage from '../POM/pages/GaragePage';

export const test = base.extend<{ mainUserGaragePage: GaragePage }>({
  mainUserGaragePage: async ({ page }, use) => {
    const mainUserGaragePage = new GaragePage(page);
    await mainUserGaragePage.open();
    await use(mainUserGaragePage);
  }
});

test.use({ storageState: 'test-data/states/mainUserState.json' });

export { expect } from '@playwright/test';

import { test as base } from '@playwright/test';
import GaragePage from '../POM/pages/GaragePage';

export const test = base.extend<{ secondUserGaragePage: GaragePage }>({
  secondUserGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});

test.use({ storageState: 'test-data/states/secondUserState.json' });

export { expect } from '@playwright/test';

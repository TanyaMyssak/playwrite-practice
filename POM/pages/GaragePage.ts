import { expect, Locator } from '@playwright/test'
import BasePage from './BasePage';


export default class GaragePage extends BasePage {
    [x: string]: any;
    private readonly pageHeader: Locator = this.page.locator('//h1', { hasText: 'Garage' });
    private readonly addNewCarButton = this.page.getByRole('button', { name: 'Add car' });
    private readonly brandDropdown: Locator = this.page.locator('//select[@id="addCarBrand"]');
    private readonly modelDropdown: Locator = this.page.locator('//select[@id="addCarModel"]');
    private readonly mileageField: Locator = this.page.locator('//input[@id="addCarMileage"]');
    private readonly submitAddingCarButton: Locator = this.page.locator('//app-add-car-modal//button[contains(@class, "btn-primary")]');
    private readonly allAddedCarNames: Locator = this.page.locator('//p[contains(@class,"car_name")]');

    async open(): Promise<void> {
        await this.page.goto('/panel/garage');
    }

    async addNewCar(brand: string, model: string, mileage: string): Promise<void> {
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.submitAddingCarButton.click();
        await this.page.waitForTimeout(500);
    }

    async verifyLastAddedCarName(expectedName: string): Promise<void> {
        await expect(this.allAddedCarNames.first()).toHaveText(expectedName);
    }

    async verifyPageIsOpen(): Promise<void> {
        await expect(this.pageHeader).toBeVisible();
    }

   async deleteAllCars(): Promise<void> {
  while (true) {
    // Re-fetch all edit icons on the page (one per car)
    const editIcons = await this.page.locator('span.icon.icon-edit').elementHandles();

    if (editIcons.length === 0) {
      // No more cars to delete
      break;
    }

    // Click the first edit icon (to remove cars one by one)
    await editIcons[0].click();

    // Click "Remove car" button
    await this.page.click('button.btn.btn-outline-danger:has-text("Remove car")');

    // Click "Remove" confirmation button
    await this.page.click('button.btn.btn-danger:has-text("Remove")');

    // Wait a little for UI to update after deletion
    await this.page.waitForTimeout(500);
  }
}
}

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

        /* async deleteAllCars(): Promise<void> {
        console.log('=== Starting deleteAllCars debug ===');
        
        const editIcons = this.page.locator('.car_edit');
        let initialCount = await editIcons.count();
        console.log(`Initial car count: ${initialCount}`);
        
        if (initialCount === 0) {
            console.log('No cars to delete');
            return;
        }
        
        let attempts = 0;
        const maxAttempts = 10;
        
        while (await editIcons.count() > 0 && attempts < maxAttempts) {
            attempts++;
            const currentCount = await editIcons.count();
            console.log(`\n--- Attempt ${attempts} ---`);
            console.log(`Cars remaining: ${currentCount}`);
            
            try {
                // Click edit icon
                console.log('Clicking edit icon...');
                await editIcons.first().click();
                await this.page.waitForTimeout(500);
                
                // Click "Remove car" button
                console.log('Looking for "Remove car" button...');
                const removeCarButton = this.page.getByRole('button', { name: 'Remove car' });
                await removeCarButton.waitFor({ state: 'visible', timeout: 5000 });
                console.log('Found "Remove car" button, clicking...');
                await removeCarButton.click();
                await this.page.waitForTimeout(500);
                
                // Click "Remove" confirmation button
                console.log('Looking for "Remove" confirmation button...');
                const removeButton = this.page.getByRole('button', { name: 'Remove' });
                await removeButton.waitFor({ state: 'visible', timeout: 5000 });
                console.log('Found "Remove" button, clicking...');
                await removeButton.click();
                
                // Wait for deletion
                console.log('Waiting for deletion to complete...');
                await this.page.waitForTimeout(2000);
                
                const newCount = await editIcons.count();
                console.log(`Cars after deletion: ${newCount}`);
                
                if (newCount === currentCount) {
                    console.log('⚠️  Car count did not decrease - deletion may have failed');
                    break;
                }
                
            } catch (error) {
                console.error(`Error in attempt ${attempts}:`, error);
                break;
            }
        }
        
        const finalCount = await editIcons.count();
        console.log(`\n=== Final result ===`);
        console.log(`Started with: ${initialCount} cars`);
        console.log(`Ended with: ${finalCount} cars`);
        console.log(`Total attempts: ${attempts}`);
    } */
}




const { expect } = require('@playwright/test');

class SignupModal {
    constructor(page) {
        this.page = page;
        
        // Locators
        this.signupButton = page.locator('button.hero-descriptor_btn.btn.btn-primary');
        this.modalContent = page.locator('.modal-content');
        this.modalTitle = page.locator('.modal-title');
        
        // Form fields
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.repeatPasswordField = page.locator('#signupRepeatPassword');
        
        // Error messages
        this.nameErrorMessage = page.locator('#signupName ~ .invalid-feedback');
        this.lastNameErrorMessage = page.locator('#signupLastName ~ .invalid-feedback');
        this.emailErrorMessage = page.locator('#signupEmail ~ .invalid-feedback');
        this.passwordErrorMessage = page.locator('#signupPassword ~ .invalid-feedback');
        this.repeatPasswordErrorMessage = page.locator('#signupRepeatPassword ~ .invalid-feedback');
        
        // Register button
        this.registerButton = page.locator('.modal-footer button.btn.btn-primary');
        
        // Success message
        this.garageText = page.getByText('GarageAdd car');
    }

    async navigateToSite() {
        await this.page.goto('https://qauto.forstudy.space', {
            httpCredentials: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });
    }

    async openSignupModal() {
        await this.signupButton.click();
        await this.waitForModal();
    }

    async waitForModal() {
        await this.modalContent.waitFor({ state: 'visible' });
    }

    // Field actions
    async fillName(name) {
        await this.nameField.clear();
        await this.nameField.fill(name);
    }

    async fillLastName(lastName) {
        await this.lastNameField.clear();
        await this.lastNameField.fill(lastName);
    }

    async fillEmail(email) {
        await this.emailField.clear();
        await this.emailField.fill(email);
    }

    async fillPassword(password) {
        await this.passwordField.clear();
        await this.passwordField.fill(password);
    }

    async fillRepeatPassword(password) {
        await this.repeatPasswordField.clear();
        await this.repeatPasswordField.fill(password);
    }

    // Focus and blur actions
    async focusField(fieldName) {
        const field = this.getField(fieldName);
        await field.focus();
    }

    async blurField(fieldName) {
        const field = this.getField(fieldName);
        await field.blur();
    }

    async triggerFieldValidation(fieldName) {
        await this.focusField(fieldName);
        await this.blurField(fieldName);
    }

    // Helper method to get field by name
    getField(fieldName) {
        const fields = {
            'name': this.nameField,
            'lastName': this.lastNameField,
            'email': this.emailField,
            'password': this.passwordField,
            'repeatPassword': this.repeatPasswordField
        };
        return fields[fieldName];
    }

    // Helper method to get error message by field name
    getErrorMessage(fieldName) {
        const errorMessages = {
            'name': this.nameErrorMessage,
            'lastName': this.lastNameErrorMessage,
            'email': this.emailErrorMessage,
            'password': this.passwordErrorMessage,
            'repeatPassword': this.repeatPasswordErrorMessage
        };
        return errorMessages[fieldName];
    }

    // Form submission
    async clickRegisterButton() {
        await this.registerButton.click();
    }

    // Fill complete valid form
    async fillValidForm(userData = {}) {
        const defaultData = {
            name: 'Tanya',
            lastName: 'Mysak',
            email: `tanyamyssak+autogen${Math.floor(Math.random() * 1000000)}@gmail.com`,
            password: 'Happy2025',
            repeatPassword: 'Happy2025'
        };
        
        const data = { ...defaultData, ...userData };
        
        await this.fillName(data.name);
        await this.fillLastName(data.lastName);
        await this.fillEmail(data.email);
        await this.fillPassword(data.password);
        await this.fillRepeatPassword(data.repeatPassword);
        
        return data;
    }

    // Clear all fields
    async clearAllFields() {
        await this.nameField.clear();
        await this.lastNameField.clear();
        await this.emailField.clear();
        await this.passwordField.clear();
        await this.repeatPasswordField.clear();
    }

    // Validation helper methods
    async expectFieldToHaveError(fieldName, errorMessage) {
        const field = this.getField(fieldName);
        const errorMsg = this.getErrorMessage(fieldName);
        
        await expect(errorMsg).toContainText(errorMessage);
        await expect(field).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }

    async expectFieldToBeValid(fieldName) {
        const field = this.getField(fieldName);
        const errorMsg = this.getErrorMessage(fieldName);
        
        await expect(errorMsg).not.toBeVisible();
        const borderColor = await field.evaluate(el => getComputedStyle(el).borderColor);
        expect(borderColor).not.toBe('rgb(220, 53, 69)');
    }

    async expectFieldValue(fieldName, expectedValue) {
        const field = this.getField(fieldName);
        await expect(field).toHaveValue(expectedValue);
    }

    async expectRegisterButtonToBeDisabled() {
        await expect(this.registerButton).toBeDisabled();
    }

    async expectRegisterButtonToBeEnabled() {
        await expect(this.registerButton).not.toBeDisabled();
    }

    async expectSuccessfulRegistration() {
        await expect(this.garageText).toBeVisible();
    }
}

module.exports = SignupModal;
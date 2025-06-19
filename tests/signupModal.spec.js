const { test, expect } = require('@playwright/test');
const SignupModal = require('../pages/SignupModal');

test.beforeEach(async ({ page }) => {
    const signupModal = new SignupModal(page);
    
    await signupModal.navigateToSite();
    await signupModal.openSignupModal();
    await expect(signupModal.modalContent).toBeVisible();
});

/* First name */
test.describe('Signup Modal - Name Field Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await expect(signupModal.modalTitle).toContainText('Registration');
    });

    test('Shows "Name required" when field is empty and red frame', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.triggerFieldValidation('name');
        await signupModal.expectFieldToHaveError('name', 'Name required');
    });

    test.skip('Should trim spaces from the name field', async ({ page }) => {
        const signupModal = new SignupModal(page);
        const trimmedName = 'Tanya';
        const untrimmedName = '   Tanya   ';
        
        await signupModal.fillName(untrimmedName);
        await signupModal.blurField('name');
        await signupModal.expectFieldValue('name', trimmedName);
    });

    const invalidNames = [
        { value: 'Sasha2', message: 'Name is invalid' },
        { value: 'Александр', message: 'Name is invalid' },
        { value: 'Anna-Maria', message: 'Name is invalid' },
        { value: 'Anna Maria', message: 'Name is invalid' },
        { value: '&%¤"', message: 'Name is invalid' },
    ];

    invalidNames.forEach(({ value, message }) => {
        test(`Shows validation for "${value}" with message: "${message}"`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillName(value);
            await signupModal.blurField('name');
            await signupModal.expectFieldToHaveError('name', message);
        });
    });

    const invalidNamesLength = [
        { value: 'A', message: 'Name has to be from 2 to 20 characters long' },
        { value: 'AnnaMariaGarciaElenaE', message: 'Name has to be from 2 to 20 characters long' },
    ];

    invalidNamesLength.forEach(({ value, message }) => {
        test(`Shows validation for length issue with "${value}"`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillName(value);
            await signupModal.blurField('name');
            await signupModal.expectFieldToHaveError('name', message);
        });
    });

    const validNames = [
        'Ed',
        'Ana',
        'AnnaMariaGarciaElena',
        'AnnaMariaGarciaHele',
        'AnnaMarie',
    ];

    validNames.forEach((name) => {
        test(`Should accept valid name: "${name}"`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillName(name);
            await signupModal.blurField('name');
            await signupModal.expectFieldToBeValid('name');
        });
    });
});

/* Last name */
test.describe('Signup Modal - Last Name Field Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await expect(signupModal.modalTitle).toContainText('Registration');
    });

    test('Shows "Last name required" and red border when field is empty', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.triggerFieldValidation('lastName');
        await signupModal.expectFieldToHaveError('lastName', 'Last name required');
    });

    const invalidLastNames = [
        { value: '1Smith', message: 'Last name is invalid' },
        { value: 'Коваленко', message: 'Last name is invalid' },
        { value: '%¤#', message: 'Last name is invalid' },
        { value: '1234', message: 'Last name is invalid' },
        { value: '1', message: 'Last name is invalid' },
    ];

    invalidLastNames.forEach(({ value, message }) => {
        test(`Shows validation for "${value}" with message: ${message} and red border`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillLastName(value);
            await signupModal.blurField('lastName');
            await signupModal.expectFieldToHaveError('lastName', message);
        });
    });

    const invalidLastNameLength = [
        { value: 'A', message: 'Last name has to be from 2 to 20 characters long' },
        { value: 'ThisIsVeryVeryLooongLastName', message: 'Last name has to be from 2 to 20 characters long' },
    ];

    invalidLastNameLength.forEach(({ value, message }) => {
        test(`Shows validation for "${value}" with message: ${message} and red border`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillLastName(value);
            await signupModal.blurField('lastName');
            await signupModal.expectFieldToHaveError('lastName', message);
        });
    });

    test.skip('Should trim spaces in the Last name field', async ({ page }) => {
        const signupModal = new SignupModal(page);
        const trimmedLastName = 'Lopez';
        const untrimmedLastName = '   Lopez   ';
        
        await signupModal.fillLastName(untrimmedLastName);
        await signupModal.blurField('lastName');
        await signupModal.expectFieldValue('lastName', trimmedLastName);
    });

    const validLastNames = [
        'Smith',
        'Bro',
        'TwentyCharactersLast',
        'Nineteenletterslong',
        'Lo',
    ];

    validLastNames.forEach((lastName) => {
        test(`Should accept valid last name: "${lastName}"`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillLastName(lastName);
            await signupModal.blurField('lastName');
            await signupModal.expectFieldToBeValid('lastName');
        });
    });
});

/* Email field validation */
test.describe('Signup Modal - Email Field Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await expect(signupModal.modalTitle).toContainText('Registration');
    });

    test('Shows "Email required" when field is empty and red frame', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.triggerFieldValidation('email');
        await signupModal.expectFieldToHaveError('email', 'Email required');
    });

    test('shows "Email is invalid" for incorrect email formats and red frame', async ({ page }) => {
        const signupModal = new SignupModal(page);
        const invalidEmails = ['emailaddress', 'test@', 'test@com', '@com.ua'];

        for (const email of invalidEmails) {
            await signupModal.fillEmail(email);
            await signupModal.blurField('email');
            await signupModal.expectFieldToHaveError('email', 'Email is incorrect');
        }
    });

    const validEmails = [
        'user@example.com',
        'user.name@example.co.uk',
        'user_name+tag@example.io',
        'user-name@example.org',
        'user123@example123.com',
    ];

    validEmails.forEach((email) => {
        test(`Should accept valid email: "${email}"`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillEmail(email);
            await signupModal.blurField('email');
            await signupModal.expectFieldToBeValid('email');
        });
    });
});

/* Password */
test.describe('Signup Modal - Password Fields Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await expect(signupModal.modalTitle).toContainText('Registration');
    });

    test('shows "Password required" when password is empty and red frame', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.triggerFieldValidation('password');
        await signupModal.expectFieldToHaveError('password', 'Password required');
    });

    const invalidPassword = [
        'short1A',
        'abcdefgh',
        'ABCDEFGH',
        '1212345678',
        'abcdefgh1',
        'ABCDEFGH1',
        'Abcdefgh',
        'ThisIsVeryVeryLooongLastPassword123',
    ];

    const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

    invalidPassword.forEach((value) => {
        test(`Shows validation for "${value}" and red frame`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillPassword(value);
            await signupModal.blurField('password');
            await signupModal.expectFieldToHaveError('password', errorMessage);
        });
    });

    test('shows "Re-enter password required" when empty and red frame', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.triggerFieldValidation('repeatPassword');
        await signupModal.expectFieldToHaveError('repeatPassword', 'Re-enter password required');
    });

    const invalidRepeatPassword = [
        'short1A',
        'abcdefgh',
        'ABCDEFGH',
        '1212345678',
        'abcdefgh1',
        'ABCDEFGH1',
        'Abcdefgh',
        'ThisIsVeryVeryLooongLastPassword123',
    ];

    const errorMessage2 = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

    invalidRepeatPassword.forEach((value) => {
        test(`Shows validation for repeat Password "${value}" and red frame`, async ({ page }) => {
            const signupModal = new SignupModal(page);
            
            await signupModal.fillRepeatPassword(value);
            await signupModal.blurField('repeatPassword');
            await signupModal.expectFieldToHaveError('repeatPassword', errorMessage2);
        });
    });

    test('shows "Passwords do not match" error and red frame if passwords do not match', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.fillPassword('Happy2025');
        await signupModal.fillRepeatPassword('Happy2024');
        await signupModal.blurField('repeatPassword');
        await signupModal.expectFieldToHaveError('repeatPassword', 'Passwords do not match');
    });
});

/* Register button */
test.describe('Signup Modal - Register Button validation', () => {
    test('Register button is disabled with empty fields', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.clearAllFields();
        await signupModal.triggerFieldValidation('name');
        await signupModal.triggerFieldValidation('lastName');
        await signupModal.triggerFieldValidation('email');
        await signupModal.triggerFieldValidation('password');
        await signupModal.triggerFieldValidation('repeatPassword');
        
        await signupModal.expectRegisterButtonToBeDisabled();
    });

    test('Register button is disabled with invalid name', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.fillValidForm({ name: '1Sasha' });
        await signupModal.expectRegisterButtonToBeDisabled();
    });

    test('Register button is disabled with invalid email', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.fillValidForm({ email: 'tanya@wrong' });
        await signupModal.expectRegisterButtonToBeDisabled();
    });

    test('Register button is disabled with invalid password', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.fillValidForm({ password: 'abc', repeatPassword: 'abc' });
        await signupModal.expectRegisterButtonToBeDisabled();
    });

    test('Register button is disabled with mismatched passwords', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        await signupModal.fillValidForm({ password: 'Happy2025', repeatPassword: 'Wrong2025' });
        await signupModal.expectRegisterButtonToBeDisabled();
    });

    test('Register button is enabled only with all valid fields', async ({ page }) => {
        const signupModal = new SignupModal(page);
        
        const userData = await signupModal.fillValidForm();
        console.log(userData.email);
        
        await signupModal.expectRegisterButtonToBeEnabled();
        await signupModal.clickRegisterButton();
        await signupModal.expectSuccessfulRegistration();
    });
});
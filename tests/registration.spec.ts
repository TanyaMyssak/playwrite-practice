import {test, expect} from '@playwright/test';

test.use({
  
  httpCredentials: {
    username: 'guest',
    password: 'welcome2qauto'
  }
});

test.beforeEach(async ({ page }) => {
  await page.goto('https://qauto.forstudy.space');

  await page.click('button.hero-descriptor_btn.btn.btn-primary');
  await expect(page.locator('.modal-content')).toBeVisible();
});

/* First name */
test.describe('Signup Modal - Name Field Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        await expect(page.locator('.modal-title')).toContainText('Registration');
    });

    test('Shows "Name required" when field is empty and red frame', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();
        
        await expect(page.locator('#signupName').locator('..').locator('.invalid-feedback'))
            .toContainText('Name required');
        await expect(page.locator('#signupName'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test.skip('Should trim spaces from the name field', async ({ page }) => {
        const trimmedName = 'Tanya';
        const untrimmedName = '   Tanya   ';
        
        await page.locator('#signupName').fill(untrimmedName);
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveValue(trimmedName);
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
            await page.locator('#signupName').clear();
            await page.locator('#signupName').fill(value);
            await page.locator('#signupName').blur();
            
            await expect(page.locator('#signupName ~ .invalid-feedback'))
                .toContainText(message);
            await expect(page.locator('#signupName'))
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    const invalidNamesLength = [
        { value: 'A', message: 'Name has to be from 2 to 20 characters long' },
        { value: 'AnnaMariaGarciaElenaE', message: 'Name has to be from 2 to 20 characters long' },
    ];

    invalidNamesLength.forEach(({ value, message }) => {
        test(`Shows validation for length issue with "${value}"`, async ({ page }) => {
            await page.locator('#signupName').clear();
            await page.locator('#signupName').fill(value);
            await page.locator('#signupName').blur();
            
            await expect(page.locator('#signupName ~ .invalid-feedback'))
                .toContainText(message);
            await expect(page.locator('#signupName'))
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
            await page.locator('#signupName').clear();
            await page.locator('#signupName').fill(name);
            await page.locator('#signupName').blur();
            
            await expect(page.locator('#signupName ~ .invalid-feedback')).not.toBeVisible();
            const borderColor = await page.locator('#signupName').evaluate(el => 
                getComputedStyle(el).borderColor
            );
            expect(borderColor).not.toBe('rgb(220, 53, 69)');
        });
    });
});

/* Last name */
test.describe('Signup Modal - Last Name Field Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        await expect(page.locator('.modal-title')).toContainText('Registration');
    });

    test('Shows "Last name required" and red border when field is empty', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
        
        await expect(page.locator('#signupLastName').locator('..').locator('.invalid-feedback'))
            .toContainText('Last name required');
        await expect(page.locator('#signupLastName'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
            await page.locator('#signupLastName').clear();
            await page.locator('#signupLastName').fill(value);
            await page.locator('#signupLastName').blur();
            
            await expect(page.locator('#signupLastName ~ .invalid-feedback'))
                .toContainText(message);
            await expect(page.locator('#signupLastName'))
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    const invalidLastNameLength = [
        { value: 'A', message: 'Last name has to be from 2 to 20 characters long' },
        { value: 'ThisIsVeryVeryLooongLastName', message: 'Last name has to be from 2 to 20 characters long' },
    ];

    invalidLastNameLength.forEach(({ value, message }) => {
        test(`Shows validation for "${value}" with message: ${message} and red border`, async ({ page }) => {
            await page.locator('#signupLastName').clear();
            await page.locator('#signupLastName').fill(value);
            await page.locator('#signupLastName').blur();
            
            await expect(page.locator('#signupLastName ~ .invalid-feedback'))
                .toContainText(message);
            await expect(page.locator('#signupLastName'))
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.skip('Should trim spaces in the Last name field', async ({ page }) => {
        const trimmedLastName = 'Lopez';
        const untrimmedLastName = '   Lopez   ';
        
        await page.locator('#signupLastName').fill(untrimmedLastName);
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveValue(trimmedLastName);
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
            await page.locator('#signupLastName').clear();
            await page.locator('#signupLastName').fill(lastName);
            await page.locator('#signupLastName').blur();
            
            await expect(page.locator('#signupLastName ~ .invalid-feedback')).not.toBeVisible();
            const borderColor = await page.locator('#signupLastName').evaluate(el => 
                getComputedStyle(el).borderColor
            );
            expect(borderColor).not.toBe('rgb(220, 53, 69)');
        });
    });
});

/* Email field validation */
test.describe('Signup Modal - Email Field Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        await expect(page.locator('.modal-title')).toContainText('Registration');
    });

    test('Shows "Email required" when field is empty and red frame', async ({ page }) => {
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').blur();
        
        await expect(page.locator('#signupEmail').locator('..').locator('.invalid-feedback'))
            .toContainText('Email required');
        await expect(page.locator('#signupEmail'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('shows "Email is invalid" for incorrect email formats and red frame', async ({ page }) => {
        const invalidEmails = ['emailaddress', 'test@', 'test@com', '@com.ua'];

        for (const email of invalidEmails) {
            await page.locator('#signupEmail').clear();
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupEmail').blur();
            
            await expect(page.locator('#signupEmail ~ .invalid-feedback'))
                .toContainText('Email is incorrect');
        }
        
        await expect(page.locator('#signupEmail'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
            await page.locator('#signupEmail').clear();
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupEmail').blur();
            
            await expect(page.locator('#signupEmail ~ .invalid-feedback')).not.toBeVisible();
            const borderColor = await page.locator('#signupEmail').evaluate(el => 
                getComputedStyle(el).borderColor
            );
            expect(borderColor).not.toBe('rgb(220, 53, 69)');
        });
    });
});

/* Password */
test.describe('Signup Modal - Password Fields Validation', () => {
    test('Finds Sign up modal title', async ({ page }) => {
        await expect(page.locator('.modal-title')).toContainText('Registration');
    });

    test('shows "Password required" when password is empty and red frame', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').blur();
        
        await expect(page.locator('#signupPassword ~ .invalid-feedback'))
            .toContainText('Password required');
        await expect(page.locator('#signupPassword'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
            await page.locator('#signupPassword').clear();
            await page.locator('#signupPassword').fill(value);
            await page.locator('#signupPassword').blur();

            await expect(page.locator('#signupPassword ~ .invalid-feedback'))
                .toContainText(errorMessage);
            await expect(page.locator('#signupPassword'))
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test('shows "Re-enter password required" when empty and red frame', async ({ page }) => {
        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupRepeatPassword').blur();
        
        await expect(page.locator('#signupRepeatPassword ~ .invalid-feedback'))
            .toContainText('Re-enter password required');
        await expect(page.locator('#signupRepeatPassword'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
            await page.locator('#signupRepeatPassword').clear();
            await page.locator('#signupRepeatPassword').fill(value);
            await page.locator('#signupRepeatPassword').blur();

            await expect(page.locator('#signupRepeatPassword ~ .invalid-feedback'))
                .toContainText(errorMessage2);
            await expect(page.locator('#signupRepeatPassword'))
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test('shows "Passwords do not match" error and red frame if passwords do not match', async ({ page }) => {
        await page.locator('#signupPassword').clear();
        await page.locator('#signupPassword').fill('Happy2025');
        await page.locator('#signupRepeatPassword').clear();
        await page.locator('#signupRepeatPassword').fill('Happy2024');
        await page.locator('#signupRepeatPassword').blur();
        
        await expect(page.locator('#signupRepeatPassword ~ .invalid-feedback'))
            .toContainText('Passwords do not match');
        await expect(page.locator('#signupRepeatPassword'))
            .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

/* Register button */
test.describe('Signup Modal - Register Button validation', () => {
    const registerBtn = '.modal-footer button.btn.btn-primary';

    test('Register button is disabled with empty fields', async ({ page }) => {
        await page.locator('#signupName').clear();
        await page.locator('#signupName').blur();
        await page.locator('#signupLastName').clear();
        await page.locator('#signupLastName').blur();
        await page.locator('#signupEmail').clear();
        await page.locator('#signupEmail').blur();
        await page.locator('#signupPassword').clear();
        await page.locator('#signupPassword').blur();
        await page.locator('#signupRepeatPassword').clear();
        await page.locator('#signupRepeatPassword').blur();

        await expect(page.locator(registerBtn)).toBeDisabled();
    });

    test('Register button is disabled with invalid name', async ({ page }) => {
        await page.locator('#signupName').clear();
        await page.locator('#signupName').fill('1Sasha');
        await page.locator('#signupLastName').clear();
        await page.locator('#signupLastName').fill('Kovalenko');
        await page.locator('#signupEmail').clear();
        await page.locator('#signupEmail').fill('tanya@example.com');
        await page.locator('#signupPassword').clear();
        await page.locator('#signupPassword').fill('Happy2025');
        await page.locator('#signupRepeatPassword').clear();
        await page.locator('#signupRepeatPassword').fill('Happy2025');

        await expect(page.locator(registerBtn)).toBeDisabled();
    });

    test('Register button is disabled with invalid email', async ({ page }) => {
        await page.locator('#signupName').clear();
        await page.locator('#signupName').fill('Tanya');
        await page.locator('#signupLastName').clear();
        await page.locator('#signupLastName').fill('Kovalenko');
        await page.locator('#signupEmail').clear();
        await page.locator('#signupEmail').fill('tanya@wrong');
        await page.locator('#signupPassword').clear();
        await page.locator('#signupPassword').fill('Happy2025');
        await page.locator('#signupRepeatPassword').clear();
        await page.locator('#signupRepeatPassword').fill('Happy2025');

        await expect(page.locator(registerBtn)).toBeDisabled();
    });

    test('Register button is disabled with invalid password', async ({ page }) => {
        await page.locator('#signupName').clear();
        await page.locator('#signupName').fill('Tanya');
        await page.locator('#signupLastName').clear();
        await page.locator('#signupLastName').fill('Kovalenko');
        await page.locator('#signupEmail').clear();
        await page.locator('#signupEmail').fill('tanya@example.com');
        await page.locator('#signupPassword').clear();
        await page.locator('#signupPassword').fill('abc');
        await page.locator('#signupRepeatPassword').clear();
        await page.locator('#signupRepeatPassword').fill('abc');

        await expect(page.locator(registerBtn)).toBeDisabled();
    });

    test('Register button is disabled with mismatched passwords', async ({ page }) => {
        await page.locator('#signupName').clear();
        await page.locator('#signupName').fill('Tanya');
        await page.locator('#signupLastName').clear();
        await page.locator('#signupLastName').fill('Kovalenko');
        await page.locator('#signupEmail').clear();
        await page.locator('#signupEmail').fill('tanya@example.com');
        await page.locator('#signupPassword').clear();
        await page.locator('#signupPassword').fill('Happy2025');
        await page.locator('#signupRepeatPassword').clear();
        await page.locator('#signupRepeatPassword').fill('Wrong2025'); 

        await expect(page.locator(registerBtn)).toBeDisabled();
    });

    test('Register button is enabled only with all valid fields', async ({ page }) => {
        const newEmail = `tanyamyssak+autogen${Math.floor(Math.random() * 1000000)}@gmail.com`;
        console.log(newEmail);

        await page.locator('#signupName').clear();
        await page.locator('#signupName').fill('Tanya');
        await page.locator('#signupLastName').clear();
        await page.locator('#signupLastName').fill('Mysak');
        await page.locator('#signupEmail').clear();
        await page.locator('#signupEmail').fill(newEmail);
        await page.locator('#signupPassword').clear();
        await page.locator('#signupPassword').fill('Happy2025');
        await page.locator('#signupRepeatPassword').clear();
        await page.locator('#signupRepeatPassword').fill('Happy2025');

        await expect(page.locator(registerBtn)).not.toBeDisabled();
        await page.locator(registerBtn).click();
        await expect(page.getByText('GarageAdd car')).toBeVisible(); 
    });
});
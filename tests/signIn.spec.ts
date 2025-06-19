import test from "@playwright/test";

test.describe("Sign in tests",()=>{
    test("Successful sign in",async({page})=>{
        await page.goto("");
        const signInButton = page.locator ('//button[contains(@class,"header_signin")]');

         await signInButton.click();

    })
})
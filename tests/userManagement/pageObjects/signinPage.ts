/*
Description: This file contains web elements and their corresponding
access methods related to each individual field/control present on 
the Sign in form of the balloon app.
*/

import { Locator, Page } from '@playwright/test';

export class SigninPage {

    constructor(readonly page: Page){

    }

    readonly emailInput: Locator = this.page.locator("//input[@id=':r0:-form-item']");
    readonly passwordInput: Locator = this.page.locator("//input[@id=':r1:-form-item']");
    readonly remembermeCheckbox: Locator = this.page.locator("//button[@id='rememberMe']");
    readonly signinButton: Locator = this.page.locator("//button[normalize-space()='Sign in']");
    readonly invalidSigninError: Locator = this.page.locator("//div[@class='mt-4 text-sm text-red-600']");

    async openSigninPage() {
        await this.page.goto('https://staging-app.balloon.xyz/');
    }

    async enterSigninCredentials(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async attemptSignin() {
        await this.signinButton.click();
    }

    async appSignin(email: string, password: string) {
        await this.openSigninPage();
        await this.enterSigninCredentials(email, password);
        await this.attemptSignin();
    }

}
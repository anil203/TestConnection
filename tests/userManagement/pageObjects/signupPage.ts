/*
Description: This file contains web elements and their corresponding
access methods related to each individual field/control present on 
the Signup form of the balloon app.
*/

import { Locator, Page } from '@playwright/test';

export class SignupPage {

    constructor(readonly page: Page) {

    }

    //Signup link
    readonly signupLink: Locator = this.page.locator("//a[normalize-space()='Sign up']");

    //Signup form
    readonly firstName: Locator = this.page.locator("//*[@id=':r2:-form-item']");
    readonly lastName: Locator = this.page.locator("//*[@id=':r3:-form-item']");
    readonly emailAddress: Locator = this.page.locator("//*[@id=':r4:-form-item']");
    readonly passwordInput: Locator = this.page.locator("//*[@id=':r5:-form-item']");

    //Email verification
    readonly verificationCode: Locator = this.page.locator("//*[@id=':r6:-form-item']");

    //Invite teammates
    readonly teamEmail: Locator = this.page.locator("//*[@id=':r7:-form-item']");

    //Links
    readonly signinLink: Locator = this.page.locator("//a[normalize-space()='Sign in']");
    readonly resendLink: Locator = this.page.locator("//button[normalize-space()='Resend code']");

    async openSignupPage() {
        await this.page.goto('https://staging-app.balloon.xyz/');
        await this.signupLink.click();
    }

    async signupForm(firstname: string, lastname: string, email: string, password: string) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.emailAddress.fill(email);
        await this.passwordInput.fill(password);
    }

    async emailVerification(code: string) {
        await this.verificationCode.fill(code);
    }

    async inviteTeammates(emailsList: string) {

        for (const email of emailsList) {
            await this.teamEmail.fill(email);
            await this.page.keyboard.press('Enter');
        }

    }

    async formNext() {
        await this.page.getByRole('button', { name: 'Next' });
    }

    async formBack() {
        await this.page.getByRole('button', { name: 'Back' });
    }

    async skipInvitee() {
        await this.page.getByRole('link', { name: 'Skip'});
    }

    async finishSignup(inviteeCount: string) {
        let inviteeRegex = new RegExp('^Invite \\(' + inviteeCount + '\\)$');
        await this.page.getByRole('button', { name: inviteeRegex}).click();
    }

}
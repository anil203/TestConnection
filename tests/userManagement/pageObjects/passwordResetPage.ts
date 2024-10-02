/*
Description: This file contains web elements and their corresponding
access methods related to each individual field/control present on 
the Password reset form of the balloon app.
*/

import { Locator, Page } from '@playwright/test';
//import { MailinatorPage } from '../../supportPageObjects/Mailinator';

export class PasswordReset {
    
    constructor(readonly page: Page){

    }
    //Password reset link
    readonly forgotpasswordLink: Locator = this.page.locator("//a[normalize-space()='Forgot your password?']");

    //Password reset request input fields
    readonly emailInput: Locator = this.page.locator("//input[@id=':r2:-form-item']");
    readonly signinLink: Locator = this.page.locator("//a[normalize-space()='Sign in']");
    readonly submitButton: Locator = this.page.locator("//button[normalize-space()='Submit email']");

    //Toaster message
    readonly toasterBox1: Locator = this.page.locator('div').filter({ hasText: 'Email submitted!We have sent' }).nth(2); //locator("//div[@class='group pointer-events-auto relative flex w-full gap-2 overflow-hidden rounded-md p-4 shadow-1 transition-all max-w-screen-sm bg-green-100']"); //div[@class='group pointer-events-auto relative flex w-full gap-2 overflow-hidden rounded-md p-4 shadow-1 transition-all max-w-screen-sm bg-green-100'])[1]
    readonly toasterMessageTitle1: Locator = this.page.getByText('Email submitted!'); //locator("//div[@class='text-sm font-medium text-slate-800']"); //div[@class='text-sm font-medium text-slate-800'])[1]
    readonly toasterMessageBody1: Locator = this.page.getByText('We have sent you an email'); //locator("//div[@class='text-sm text-slate-500']"); //div[@class='text-sm text-slate-500'])[1]
    readonly toasterMessageClose: Locator = this.page.getByRole('button').nth(1); //locator("//button[@class='absolute right-2 top-2 rounded-md p-1 text-slate-800 hover:opacity-80']//*[name()='svg']");
    
    readonly toasterBox2: Locator = this.page.locator('div').filter({ hasText: 'Password reset successfully' }).nth(2)
    readonly toasterMessageTitle2: Locator = this.page.getByText('Password reset successfully'); //locator("//div[@class='text-sm font-medium text-slate-800']"); //div[@class='text-sm font-medium text-slate-800'])[1]
    readonly toasterMessageBody2: Locator = this.page.getByText('You have successfully reset your password.');

    //New password setup page
    readonly createPassword: Locator = this.page.getByPlaceholder('Enter password', { exact: true });
    readonly confirmNewPassword: Locator = this.page.getByPlaceholder('Enter password again');
    readonly submitNewPassword: Locator = this.page.getByRole('button', { name: 'Set new password' });
    
    async openPasswordResetPage() {
        await this.page.goto('https://staging-app.balloon.xyz/');
        await this.forgotpasswordLink.click();
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }
    
    async submitResetRequest() {
        await this.submitButton.click();
    }

    async fillNewPassword(password: string, confirmPassword: string) {
        await this.createPassword.fill(password);
        await this.confirmNewPassword.fill(confirmPassword);
    }

    /*async passwordReset(email: string){//, context) {
        await this.openPasswordResetPage();
        await this.fillEmail(email);
        await this.submitResetRequest();
        
        const newPage = await context.newPage();
        const resetEmail = new MailinatorPage(newPage);
        const openResetPage = await resetEmail.accessResetEmail(email);
        const resetPage = new PasswordReset(openResetPage);
        
        //Provide new password
        await resetPage.fillNewPassword('ToblerOne2#', 'ToblerOne2#');

        let newPassword = 'ToblerOne2#';

        //Submit the new password
        await resetPage.submitNewPassword.click();

        await expect(openResetPage.locator("//h1[normalize-space()='Members']")).toBeVisible();

        //Sign out of the account
        await openResetPage.getByRole('link', { name: 'Sign out' }).click();

        await openResetPage.close();
        await newPage.close();

        return newPassword;
    }*/
}
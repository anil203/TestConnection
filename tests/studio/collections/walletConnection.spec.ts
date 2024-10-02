import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures, unlockForFixture } from "@synthetixio/synpress/playwright";

import basicSetup from "../../wallet-setup/basic.setup";
//import connectedSetup from "../../wallet-setup/connected.setup";

import { SigninPage } from "../../userManagement/pageObjects/signinPage"

const test = testWithSynpress(metaMaskFixtures(basicSetup));
const { expect } = test;

test('Sample test for wallet connection', async ({ context, page, extensionId }) => {

    const metamask: MetaMask = new MetaMask(context, page, basicSetup.walletPassword, extensionId);
    const signin: SigninPage = new SigninPage(page);
    
    await test.step("Step 1: Open Balloon app signin page on the browser.", async () => {
        await signin.openSigninPage();
    })

    await test.step("Verify that the fields to enter the sign in credentials are enabled for editing.", async () => {
        expect(await signin.emailInput.isEditable()).toBe(true);
        expect(await signin.passwordInput.isEditable()).toBe(true);
    })

    await test.step("Verify that the option to sign in is disabled when sign in credentials are not provided yet.", async () => {
        expect.soft(await signin.signinButton.isEnabled()).toBe(false);
    })

    await test.step("Step 2 & 3: Enter valid user credentials in the email and password fields.", async () => {
        await signin.enterSigninCredentials('test', 'test')
    })

    await test.step("Verify that the 'Sign in' option is enabled.", async () => {
        expect(await signin.signinButton.isEnabled()).toBe(true);
    })

    await test.step("Step 4: Select the 'Sign In' option.", async () => {
        await signin.attemptSignin();
    })

    await page.waitForLoadState();

    await test.step("Verify that the user sign-in is successful and is redirected to the user dashboard.", async () => {
        await expect(page).toHaveTitle('Dashboard | Balloon');
    })

    await test.step("Navigate to collections listing page.", async () => {
        
        await page.locator("//button[@id='navigation-item-studio']").click();
        await page.locator("//a[@id='studio-collections']").click();
    })

    await page.waitForTimeout(5000);

    await test.step("Navigate to add new NFT collection page.", async () => {
        
        await page.locator("//a[normalize-space()='Add collection']").click();
        await page.locator("//button[@id='nft-collection']").click();
    })

    await page.waitForTimeout(5000);
    
    await test.step("Connect the wallet", async () => {
        
        await page.locator("//button[normalize-space()='Connect wallet']").click();
    })

})
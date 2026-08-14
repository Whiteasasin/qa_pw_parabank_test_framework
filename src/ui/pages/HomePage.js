import { testStep, expect } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.customerLoginFormLocator = page
      .locator('#leftPanel')
      .filter({ hasText: 'Customer Login' });
    this.registerLink = this.customerLoginFormLocator.getByRole('link', {
      name: 'Register',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step('Open Home Page', async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async clickRegisterLink() {
    await this.step(`Click the Register link`, async () => {
      await this.registerLink.click();
    });
  }

  async clickLogOut() {
    await this.step(`Click the Log Out button`, async () => {
      await this.page.getByRole('link', { name: 'Log Out' }).click();
    });
  }

  async fillUsername(username) {
    await this.step(`Fill the username field`, async () => {
      await this.page.locator('input[name="username"]').fill(username);
    });
  }

  async fillPassword(password) {
    await this.step(`Fill the password field`, async () => {
      await this.page.locator('input[name="password"]').fill(password);
    });
  }

  async clickLoginButton() {
    await this.step(`Click the Login button`, async () => {
      await this.page.getByRole('button', { name: 'Log In' }).click();
    });
  }

  async assertLoginError(message) {
    await this.step(`Assert login error`, async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}

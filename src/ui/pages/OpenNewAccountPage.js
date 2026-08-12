import { expect, testStep } from '../../common/helpers/pwHelpers';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountTypeSelect = this.page.locator('#type');
    this.accountSelect = this.page.locator('#fromAccountId');
    this.newAccountId = this.page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertOpenNewAccountPageOpened() {
    await this.step(`Assert that Open New Account Page is opened`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: 'Open New Account',
          exact: true,
        }),
      ).toBeVisible();
      await expect(this.accountTypeSelect.locator('option')).not.toHaveCount(0);
      await expect(this.accountSelect.locator('option')).not.toHaveCount(0);
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select ${accountType} acount type`, async () => {
      await this.accountTypeSelect.selectOption({ label: accountType });
    });
  }

  async assertAccountOpenedMessageIsShown() {
    await this.step(
      `Assert that "Account Opened!" message is shown`,
      async () => {
        await expect(this.page.getByText('Account Opened!')).toBeVisible();
      },
    );
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click the Open New Account button`, async () => {
      await this.page.getByRole('button', { name: 'Open New Account' }).click();
    });
  }

  async getCreatedAccountId() {
    return await this.step(`Get created account id`, async () => {
      await expect(this.newAccountId).toBeVisible();
      const accountId = await this.newAccountId.textContent();
      return accountId;
    });
  }
}
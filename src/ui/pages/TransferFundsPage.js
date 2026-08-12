import { expect, testStep } from '../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountFromSelect = this.page.locator('#fromAccountId');
    this.accountToSelect = this.page.locator('#toAccountId');
    this.ammountField = this.page.locator('#amount');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  async selectFromAccountId(fromAccountId) {
    await this.step(`Select account that should send money`, async () => {
      await this.accountFromSelect.selectOption(fromAccountId);
    });
  }

  async selectToAccountId(toAccountId) {
    await this.step(`Select account that should recieve money`, async () => {
      await this.accountToSelect.selectOption(toAccountId);
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill amount to be transferred`, async () => {
      await this.ammountField.fill(amount.toString());
    });
  }

  async assertSuccessTransferMessageIsShown() {
    await this.step(
      `Assert that "Transfer Complete!" message is shown`,
      async () => {
        await expect(this.page.getByText('Transfer Complete!')).toBeVisible();
      },
    );
  }

  async clickTransferButton() {
    await this.step(`Click the Transfer button`, async () => {
      await this.page.getByRole('button', { name: 'Transfer' }).click();
    });
  }
}
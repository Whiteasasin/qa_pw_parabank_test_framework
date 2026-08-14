import { expect, testStep } from '../../common/helpers/pwHelpers';

export class TransactionDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.transactionDetailsHeader = page.getByRole('heading', {
      name: 'Transaction Details',
      exact: true,
    });
    this.transactionIdLocator =
      this.transactionPropertyLocator('Transaction ID:');
    this.transactionDateLocator =
      this.transactionPropertyLocator('Transaction Date:');
    this.transactionDescriptionLocator = this.transactionPropertyLocator(
      'Transaction Description:',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  transactionPropertyLocator(property) {
    return this.page
      .getByRole('row')
      .filter({ hasText: property })
      .getByRole('cell')
      .nth(1);
  }

  async assertTransactionIdIsShown() {
    await this.step(`Assert transaction ID is shown`, async () => {
      await expect(this.transactionIdLocator).not.toBeEmpty();
    });
  }

  async getTransactionId() {
    return await this.step(`Get transaction ID`, async () => {
      return await this.transactionIdLocator.textContent();
    });
  }
  async getTransactionDate() {
    return await this.step(`Get transaction date`, async () => {
      return await this.transactionDateLocator.textContent();
    });
  }
  async getTransactionDescription() {
    return await this.step(`Get transaction description`, async () => {
      return await this.transactionDescriptionLocator.textContent();
    });
  }

  async assertTransactionId(transactionId) {
    return await this.step(`Assert transaction ID`, async () => {
      await expect(this.transactionIdLocator).toHaveText(transactionId);
    });
  }
  async assertTransactionDate(transactionDate) {
    return await this.step(`Assert transaction date`, async () => {
      await expect(this.transactionDateLocator).toHaveText(transactionDate);
    });
  }
  async assertTransactionDescription(transactionDescription) {
    return await this.step(`Assert transaction description`, async () => {
      await expect(this.transactionDescriptionLocator).toHaveText(
        transactionDescription,
      );
    });
  }
}

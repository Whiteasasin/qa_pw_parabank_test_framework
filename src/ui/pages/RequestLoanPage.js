import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.applyNowButton = this.page.getByRole('button', {
      name: 'Apply Now',
    });
    this.newAccountIdLocator = this.page.locator('#newAccountId');
    this.accountFromSelect = this.page.locator('#fromAccountId');
  }

  inputTextLocator(inputName) {
    return this.page
      .getByRole('row')
      .filter({ hasText: inputName })
      .getByRole('textbox');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillLoanAmount(loanAmount) {
    await this.step(`Fill Loan Amount`, async () => {
      await this.inputTextLocator('Loan Amount:').fill(loanAmount);
    });
  }

  async fillDownPayment(downPayment) {
    await this.step(`Fill Down Payment`, async () => {
      await this.inputTextLocator('Down Payment:').fill(downPayment);
    });
  }
 
  async selectFromAccountId(fromAccountId) {
    await this.step(`Select From account #`, async () => {
      await this.accountFromSelect.selectOption({ value: fromAccountId });
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click Apply Now button`, async () => {
      await this.applyNowButton.click();
    });
  }
  async getNewAccountId() {
    return await this.step(`Get new account ID`, async () => {
      return await this.newAccountIdLocator.textContent();
    });
  }

  async assertSuccessRequestLoanMessageIsShown() {
    await this.step(`Assert request for loan is successful`, async () => {
      await expect(this.page.getByText('Loan Request Processed')).toBeVisible();
      await expect(
        this.page.getByText('Congratulations, your loan has been approved.'),
      ).toBeVisible();
      await expect(
        this.page.getByText('Your new account number:'),
      ).toBeVisible();
    });
  }
}
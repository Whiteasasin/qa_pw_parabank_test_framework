import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.sendPaymentButton = this.page
      .getByRole('button', { name: 'Send Payment' });
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

  async fillPayeeName(payeeName) {
    await this.step(`Fill the Payee Name`, async () => {
      await this.inputTextLocator('Payee Name:').fill(payeeName);
    });
  }

  async fillAddress(address) {
    await this.step(`Fill the address`, async () => {
      await this.inputTextLocator('Address:').fill(address);
    });
  }

  async fillCity(city) {
    await this.step(`Fill the city`, async () => {
      await this.inputTextLocator('City:').fill(city);
    });
  }

  async fillState(state) {
    await this.step(`Fill the state`, async () => {
      await this.inputTextLocator('State:').fill(state);
    });
  }

  async fillZipCode(zipCode) {
    await this.step(`Fill the Zip Code`, async () => {
      await this.inputTextLocator('Zip Code:').fill(zipCode);
    });
  }

  async fillPhone(phone) {
    await this.step(`Fill the Phone #`, async () => {
      await this.inputTextLocator('Phone #:').fill(phone);
    });
  }

  async fillAccountNumber(accountNumber) {
    await this.step(`Fill the Account #`, async () => {
      await this.page
        .getByRole('row')
        .filter({ hasText: 'Account #:' })
        .filter({ hasNotText: 'Verify' })
        .getByRole('textbox')
        .fill(accountNumber.toString());
    });
  }

  async fillVerifyAccountNumber(accountNumber) {
    await this.step(`Fill the Verify Account #`, async () => {
      await this.inputTextLocator('Verify Account #:')
      .fill(accountNumber.toString());
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill the amount`, async () => {
      await this.inputTextLocator('Amount: $').fill(amount.toString());
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account #${accountId}`, async () => {
      await this.page
        .getByRole('row')
        .filter({ hasText: 'From account #:' })
        .getByRole('combobox')
        .selectOption(accountId.toString());
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click Send Payment button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async submitBillPayForm(payment) {
    await this.step(`Submit Bill Pay form`, async () => {
      await this.fillPayeeName(payment.payeeName);
      await this.fillAddress(payment.address);
      await this.fillCity(payment.city);
      await this.fillState(payment.state);
      await this.fillZipCode(payment.zipCode);
      await this.fillPhone(payment.phone);
      await this.fillAccountNumber(payment.accountNumber);
      await this.fillVerifyAccountNumber(payment.accountNumber);
      await this.fillAmount(payment.amount);
      await this.selectFromAccount(payment.fromAccountId);
      await this.clickSendPaymentButton();
    });
  }

  async assertBillPayPageIsOpen() {
    await this.step(`Assert Bill Pay page is open`, async () => {
      expect(this.page.url()).toContain('/parabank/billpay.htm');
    });
  }

  async assertSuccessPaymentMessageIsShown(payeeName, amount) {
    await this.step(
      `Assert payment to ${payeeName} for $${amount} is successful`,
      async () => {
        await expect(this.page
          .getByText('Bill Payment Complete')).toBeVisible();
        await expect(this.page.getByText(payeeName)).toBeVisible();
        await expect(this.page.getByText(`$${amount}`)).toBeVisible();
      },
    );
  }

  async assertErrorMessageIsShown(errorMessageText) {
    await this.step(`Assert error "${errorMessageText}" is shown`, async () => {
      await expect(this.page.getByText(errorMessageText)).toBeVisible();
    });
  }
}
import { testStep, expect } from '../helpers/pwHelpers';

export class AccountNavigationMenu {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountFromSelect = this.page.locator('#fromAccountId');
    this.accountToSelect = this.page.locator('#toAccountId');
    this.accountSelect = this.page.locator('#accountId');
    this.accountNavigationMenuLocator = this.page
      .locator('#leftPanel')
      .filter({ hasText: 'Account Services' });
    this.accountsOverviewHeading = this.page
      .getByRole('heading', { name: 'Accounts Overview', exact: true });
    this.transferFundsHeading = this.page
      .getByRole('heading', { name: 'Transfer Funds', exact: true });
    this.findTransactionsHeading = this.page
      .getByRole('heading', { name: 'Find Transactions', exact: true });
    this.updateProfileHeading = this.page
      .getByRole('heading', { name: 'Update Profile', exact: true });
    this.updateProfileHeading = this.page
      .getByRole('heading', { name: 'Update Profile', exact: true });
    this.billPayHeading = this.page
      .getByRole('heading', { name: 'Bill Payment Service', exact: true });
    this.requestLoanHeading = this.page
      .getByRole('heading', { name: 'Apply for a Loan', exact: true });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  accountNavigationMenuItem(menuItemName) {
    return this.accountNavigationMenuLocator.getByRole('link', {
      name: menuItemName,
    });
  }

  async clickOpenNewAccount() {
    await this.step('Click "Open New Account" link', async () => {
      await this.accountNavigationMenuItem('Open New Account').click();
    });
  }


  async openAccountsOverviewPage() {
    await this.step('Open "Accounts Overview" page', async () => {
      await this.clickAccountsOverview();
      await this.assertAccountsOverviewPageOpened();
    });
  }

  async clickAccountsOverview() {
    await this.step('Click "Accounts Overview" link', async () => {
      await this.accountNavigationMenuItem('Accounts Overview').click();
    });
  }

  async assertAccountsOverviewPageOpened() {
    await this.step(`Assert the Account Overview page is open`, async () => {
      await expect(this.accountsOverviewHeading).toBeVisible();
      await expect(this.page.getByRole('row')).not.toHaveCount(2);
    });
  }


  async openTransferFundsPage() {
    await this.step('Open "Transfer Funds" page', async () => {
      await this.clickTransferFunds();
      await this.assertTransferPageOpened();
    });
  }

  async clickTransferFunds() {
    await this.step('Click "Transfer Funds" link', async () => {
      await this.accountNavigationMenuItem('Transfer Funds').click();
    });
  }

  async assertTransferPageOpened() {
    await this.step(`Assert that Transfer Funds Page is opened`, async () => {
      await expect(this.transferFundsHeading).toBeVisible();
      await expect(this.accountFromSelect.locator('option')).not.toHaveCount(0);
      await expect(this.accountToSelect.locator('option')).not.toHaveCount(0);
    });
  }


  async openBillPayPage() {
    await this.step('Open "Bill Pay" page', async () => {
      await this.clickBillPay();
      await this.assertBillPayPageIsOpen();
    });
  }

  async assertBillPayPageIsOpen() {
    await this.step(`Assert that Bill Pay Page is opened`, async () => {
      await expect(this.billPayHeading).toBeVisible();
      await expect(
        this.page
          .getByRole('row')
          .filter({ hasText: 'From account #:' })
          .getByRole('combobox')
          .locator('option'),
      ).not.toHaveCount(0);
    });
  }

  async clickBillPay() {
    await this.step('Click "Bill Pay" link', async () => {
      await this.accountNavigationMenuItem('Bill Pay').click();
    });
  }


  async openFindTransactionsPage() {
    await this.step('Open "Find Transactions" page', async () => {
      await this.clickFindTransactions();
      await this.assertFindTransactionsPageIsOpen();
    });
  }

  async assertFindTransactionsPageIsOpen() {
    await this.step(
      `Assert that Find Transactions Page is opened`,
      async () => {
        await expect(this.findTransactionsHeading).toBeVisible();
        await expect(this.accountSelect.locator('option')).not.toHaveCount(0);
      },
    );
  }

  async clickFindTransactions() {
    await this.step('Click "Find Transactions" link', async () => {
      await this.accountNavigationMenuItem('Find Transactions').click();
    });
  }


  async openUpdateContactInfoPage() {
    await this.step('Open "Update Contact Info" page', async () => {
      await this.clickUpdateContactInfo();
      await this.assertUpdateContactInfoPageIsOpen();
    });
  }

  async assertUpdateContactInfoPageIsOpen() {
  await this.step(
    `Assert that Update Contact Info Page is opened`,
    async () => {
      await expect(this.updateProfileHeading).toBeVisible();
    },
  );
}

  async clickUpdateContactInfo() {
    await this.step('Click "Update Contact Info" link', async () => {
      await this.accountNavigationMenuItem('Update Contact Info').click();
    });
  }


  async openRequestLoanPage() {
    await this.step('Open "Request Loan" page', async () => {
      await this.clickRequestLoan();
      await this.assertRequestLoanPageIsOpen();
    });
  }

  async assertRequestLoanPageIsOpen() {
    await this.step(`Assert that Request Loan Page is opened`, async () => {
      await expect(this.requestLoanHeading).toBeVisible();
    });
  }

  async clickRequestLoan() {
    await this.step('Click "Request Loan" link', async () => {
      await this.accountNavigationMenuItem('Request Loan').click();
    });
  }

  async clickLogOut() {
    await this.step('Click "Log Out" link"', async () => {
      await this.accountNavigationMenuItem('Log Out').click();
    });
  }
}

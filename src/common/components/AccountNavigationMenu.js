// import { testStep, expect } from '../common/helpers/pwHelpers';
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

  //Accoutns overview page
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
      await expect(
        this.page.getByRole('heading', {
          name: 'Accounts Overview',
          exact: true,
        }),
      ).toBeVisible();
      await expect(this.page.getByRole('row')).not.toHaveCount(2);
    });
  }

  //Transfer funds page
  async openTransferFundsPage() {
    await this.step('Open "Transfer Funds" page', async () => {
      await this.clickTransferFunds();
      await this.assertTransferPageOpened();
    });
  }

  async clickTransferFunds() {
    await this.step('Click "Transfer Funds" link', async () => {
      await this.accountNavigationMenuItem('Transfer Funds').click();
      await this.assertTransferPageOpened();
    });
  }

  async assertTransferPageOpened() {
    await this.step(`Assert that Transfer Funds Page is opened`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: 'Transfer Funds',
          exact: true,
        }),
      ).toBeVisible();
      await expect(this.accountFromSelect.locator('option')).not.toHaveCount(0);
      await expect(this.accountToSelect.locator('option')).not.toHaveCount(0);
    });
  }

  //bill pay page
  async openBillPayPage() {
    await this.step('Open "Bill Pay" page', async () => {
      await this.clickBillPay();
      await this.assertBillPayPageIsOpen();
    });
  }

  async assertBillPayPageIsOpen() {
    await this.step(`Assert that Bill Pay Page is opened`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: 'Bill Payment Service',
          exact: true,
        }),
      ).toBeVisible();
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

  //Find transactions page
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
        await expect(
          this.page.getByRole('heading', {
            name: 'Find Transactions',
            exact: true,
          }),
        ).toBeVisible();
        await expect(this.accountSelect.locator('option')).not.toHaveCount(0);
      },
    );
  }
  async clickFindTransactions() {
    await this.step('Click "Find Transactions" link', async () => {
      await this.accountNavigationMenuItem('Find Transactions').click();
    });
  }

  //Update contact info page
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
        await expect(
          this.page.getByRole('heading', {
            name: 'Update Profile',
            exact: true,
          }),
        ).toBeVisible();
      },
    );
  }

  async clickUpdateContactInfo() {
    await this.step('Click "Update Contact Info" link', async () => {
      await this.accountNavigationMenuItem('Update Contact Info').click();
    });
  }

  // Request loan page
  async openRequestLoanPage() {
    await this.step('Open "Request Loan" page', async () => {
      await this.clickRequestLoan();
      await this.assertRequestLoanPageIsOpen();
    });
  }

  async assertRequestLoanPageIsOpen() {
    await this.step(`Assert that Request Loan Page is opened`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: 'Apply for a Loan',
          exact: true,
        }),
      ).toBeVisible();
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
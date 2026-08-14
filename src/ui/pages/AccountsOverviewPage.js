import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.defaultAccountRow = page.getByRole('row').nth(1);
    this.defaultAccountId = this.defaultAccountRow.getByRole('cell').nth(0);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  accountRowLocatorById(accountId) {
    return this.page.getByRole('row').filter({ hasText: accountId });
  }

  async getDefaultAccountId() {
    return await this.step(`Get default account Id`, async () => {
      return await this.defaultAccountId.textContent();
    });
  }

  async getAccountBalanceByAccountId(accountId) {
    return await this.step(
      `Get balance for account:${accountId} and convert to number`,
      async () => {
        const textBalance = await this.accountRowLocatorById(accountId)
          .getByRole('cell')
          .nth(1)
          .textContent();
        console.log(textBalance);

        return parseFloat(textBalance.replace(/[^0-9.-]+/g, ''));
      },
    );
  }

  async getAvaliableAmountByAccountId(accountId) {
    return await this.step(
      `Get avaliable amount for account:${accountId} and convert to number`,
      async () => {
        const textBalance = await this.accountRowLocatorById(accountId)
          .getByRole('cell')
          .nth(2)
          .textContent();

        return parseFloat(textBalance.replace(/[^0-9.-]+/g, ''));
      },
    );
  }

  async clickOnAccountLink(accountId) {
    await this.step(
      `Open account details for ${accountId} account`,
      async () => {
        await this.accountRowLocatorById(accountId)
          .getByRole('link', { name: accountId })
          .click();
      },
    );
  }

  async assertAccountIdIsVisible(accountId) {
    await this.step(`Assert that ${accountId} is visible`, async () => {
      await expect(this.accountRowLocatorById(accountId)).toBeVisible();
    });
  }

  async assertValuesAreEqual(actualBalance, expectedBalance) {
    await this.step(
      `Assert balance for the account equals to ${expectedBalance}`,
      async () => {
        expect(actualBalance).toBe(expectedBalance);
      },
    );
  }

  async assertValueIsGreaterThanZero(actualBalance) {
    await this.step(`Assert value is greater than 0`, async () => {
      expect(actualBalance).toBeGreaterThan(0);
    });
  }

  async assertAccountsOverviewHasColumn(columnName) {
    await this.step(`Assert that ${columnName} column is visible`, async () => {
      await expect(
        this.page
          .locator('#overviewAccountsApp')
          .getByRole('row')
          .nth(0)
          .getByRole('cell')
          .filter({ hasText: columnName }),
      ).toBeVisible();
    });
  }
}

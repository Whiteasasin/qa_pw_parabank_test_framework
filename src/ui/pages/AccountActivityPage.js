import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountActivityPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountDetailsHeader = page.getByRole('heading', {
      name: 'Account Details',
      exact: true,
    });
    this.accountIdLocator = this.page.locator('#accountId');
    this.accountTypeLocator = this.page.locator('#accountType');
    this.accountBalanceLocator = this.page.locator('#balance');
    this.availableBalanceLocator = this.page.locator('#availableBalance');
    this.filterByTypeSelect = this.page.locator('#transactionType');
    this.filterByPeriodSelect = this.page.locator('#month');
    this.goButton = this.page.getByRole('button', { name: 'GO' });
    this.activityTableLocator = this.page.locator('#transactionTable');
    this.noTransactionsMessage = this.page.getByText('No transactions found.');
  }
  //Helpers
  async convertTextMoneyToFloat(textMoney) {
    return await this.step(
      `Convert money string ${textMoney} to float`,
      async () => {
        if (textMoney === '' || textMoney === null || textMoney === undefined) {
          return null;
        }
        return parseFloat(textMoney.replace(/[^0-9.-]+/g, ''));
      },
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async parseTransactionRowByOrder(rowNumber) {
    return await this.step(
      `Parse details for transaction ${rowNumber}`,
      async () => {
        let transaction = {
          date: '',
          type: '',
          debit: null,
          credit: null,
        };
        const transactionRow = this.activityTableLocator
          .getByRole('row')
          .nth(rowNumber);
        transaction.date = await transactionRow
          .getByRole('cell')
          .nth(0)
          .textContent();
        transaction.type = await transactionRow
          .getByRole('cell')
          .nth(1)
          .textContent();
        transaction.debit = await this.convertTextMoneyToFloat(
          await transactionRow.getByRole('cell').nth(2).textContent(),
        );
        transaction.credit = await this.convertTextMoneyToFloat(
          await transactionRow.getByRole('cell').nth(3).textContent(),
        );

        return transaction;
      },
    );
  }

  transactionTypeLocatorByOrder(rowNumber) {
    const transactionRow = this.activityTableLocator
      .getByRole('row')
      .nth(rowNumber);

    return transactionRow.getByRole('cell').nth(1);
  }

  //Actions

  async selectTypeToFilter(type) {
    await this.step(`Select ${type} type to filter transactins `, async () => {
      await this.filterByTypeSelect.selectOption(type);
    });
  }

  async selectMonthToFiterByPeriod(month) {
    await this.step(`Select ${month} to filter transactions`, async () => {
      await this.filterByPeriodSelect.selectOption(month);
    });
  }

  async clickGoButton() {
    await this.step(`Click Go button`, async () => {
      const transactionResponsePromise = this.page.waitForResponse(
        response =>
          response.url().includes('/transactions/') &&
          response.status() === 200,
      );
      await this.goButton.click();
      await transactionResponsePromise;
    });
  }

  async clickTransactionLinkByOrder(transactionOrder) {
    await this.step(
      `Click on transaction link for ${transactionOrder} transaction`,
      async () => {
        await this.transactionTypeLocatorByOrder(transactionOrder).click();
      },
    );
  }

  //Assetions

  async assertAccountDetailsHeaderIsShown() {
    await this.step(`Assert account details is shown`, async () => {
      await expect(this.accountDetailsHeader).toBeVisible();
    });
  }

  async assertTransactionsLoaded() {
    await this.step(`Assert at least one transaction is loaded`, async () => {
      await expect(this.activityTableLocator.getByRole('row')).not.toHaveCount(
        1,
      );
    });
  }

  async assertCountOfTransactions(expectedCount) {
    await this.step(
      `Assert ${expectedCount} of transactions is shown`,
      async () => {
        await expect(this.activityTableLocator.getByRole('row')).toHaveCount(
          expectedCount + 1,
        );
      },
    );
  }

  async assertAccountNumberIsCorrect(accountId) {
    await this.step(`Assert account number is ${accountId}`, async () => {
      await expect(this.accountIdLocator).toContainText(accountId);
    });
  }

  async assertAccountTypeIsCorrect(accountType) {
    await this.step(`Assert account type is ${accountType}`, async () => {
      await expect(this.accountTypeLocator).toContainText(accountType);
    });
  }

  async assertAccountBalanceIsCorrect(expectedAccountBalance) {
    await this.step(
      `Assert account balance is ${expectedAccountBalance}`,
      async () => {
        const actualBalance = await this.accountBalanceLocator.textContent();
        const floatActualBalance =
          await this.convertTextMoneyToFloat(actualBalance);
        expect(floatActualBalance).toEqual(expectedAccountBalance);
      },
    );
  }

  async assertAccountAvailableBalanceIsCorrect(expectedAvailableBalance) {
    await this.step(
      `Assert account avaliable amount is ${expectedAvailableBalance}`,
      async () => {
        const actualAvaliableBalance =
          await this.availableBalanceLocator.textContent();
        const floatactualAvaliableBalance = await this.convertTextMoneyToFloat(
          actualAvaliableBalance,
        );
        expect(floatactualAvaliableBalance).toEqual(expectedAvailableBalance);
      },
    );
  }

  async assertTransactionDate(transactionOrder, expectedDate) {
    await this.step(
      // eslint-disable-next-line max-len
      `Assert that transaction date for ${transactionOrder} transaction is ${expectedDate}`,
      async () => {
        const transaction =
          await this.parseTransactionRowByOrder(transactionOrder);
        expect(transaction.date).toContain(expectedDate);
      },
    );
  }

  async assertTransactionType(transactionOrder, expectedType) {
    await this.step(
      // eslint-disable-next-line max-len
      `Assert that transaction type for ${transactionOrder} transaction is ${expectedType}`,
      async () => {
        const transaction =
          await this.parseTransactionRowByOrder(transactionOrder);
        expect(transaction.type).toContain(expectedType);
      },
    );
  }

  async assertTransactionTypeNotShown(type) {
    await this.step(
      `Assert that type of transaction ${type} is not shown`,
      async () => {
        await expect(this.activityTableLocator).not.toHaveText(type);
      },
    );
  }

  async assertTransactionDebit(transactionOrder, expectedDebit) {
    await this.step(
      // eslint-disable-next-line max-len
      `Assert that transaction debit for ${transactionOrder} transaction is ${expectedDebit}`,
      async () => {
        const transaction =
          await this.parseTransactionRowByOrder(transactionOrder);
        expect(transaction.debit).toEqual(expectedDebit);
      },
    );
  }

  async assertTransactionCredit(transactionOrder, expectedCredit) {
    await this.step(
      // eslint-disable-next-line max-len
      `Assert that transaction credit for ${transactionOrder} transaction is ${expectedCredit}`,
      async () => {
        const transaction =
          await this.parseTransactionRowByOrder(transactionOrder);
        expect(transaction.credit).toEqual(expectedCredit);
      },
    );
  }

  async assertTransactionDetails({
    rowNumber,
    date,
    type,
    debit,
    credit,
  }) {
    await this.step(
      `Assert that transaction details for ${rowNumber}`,
      async () => {
        const transaction =
          await this.parseTransactionRowByOrder(rowNumber);
        expect(transaction.date).toEqual(date);
        expect(transaction.type).toEqual(type);
        expect(transaction.debit).toEqual(debit);
        expect(transaction.credit).toEqual(credit);
      },
    );
  }

  async assertNoTransactionsErrorIsShown() {
    await this.step(
      `Assert the "No transactions" message is shown`,
      async () => {
        await expect(this.activityTableLocator).toBeHidden();
        await expect(this.noTransactionsMessage).toBeVisible();
      },
    );
  }
}

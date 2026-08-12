import { expect, testStep } from '../../common/helpers/pwHelpers';

export class FindTransactionPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountSelect = this.page.locator('#accountId');
    this.transactionIdField = this.page.locator('#transactionId');
    this.transactionDateField = this.page.locator('#transactionDate');
    this.transactionDateFromField = this.page.locator('#fromDate');
    this.transactionDateToField = this.page.locator('#toDate');
    this.transactionAmountField = this.page.locator('#amount');
    this.findTransactionsByIdButton = this.page.locator('#findById');
    this.findTransactionsByDateButton = this.page.locator('#findByDate');
    this.findTransactionsByDateRangeButton =
      this.page.locator('#findByDateRange');
    this.findTransactionsByAmountButton = this.page.locator('#findByAmount');
    this.activityTableLocator = this.page.locator('#transactionTable');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
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

  async selectAccountId(fromAccountId) {
    await this.step(`Select account id`, async () => {
      await this.accountSelect.selectOption(fromAccountId);
    });
  }

  async fillTransactionIdField(transactionId) {
    await this.step(`Fill transaction id`, async () => {
      await this.transactionIdField.fill(transactionId.toString());
    });
  }

  async fillTransactionDateField(transactionDate) {
    await this.step(`Fill transaction date`, async () => {
      await this.transactionDateField.fill(transactionDate);
    });
  }
  async fillTransactionDateFromField(transactionDate) {
    await this.step(`Fill transaction date from`, async () => {
      await this.transactionDateFromField.fill(transactionDate);
    });
  }
  async fillTransactionDateToField(transactionDate) {
    await this.step(`Fill transaction date to`, async () => {
      await this.transactionDateToField.fill(transactionDate);
    });
  }

  async fillTransactionAmountField(transactionAmount) {
    await this.step(`Fill transaction amount`, async () => {
      await this.transactionAmountField.fill(transactionAmount.toString());
    });
  }

  async assertTransactionResultsPageIsShown() {
    await this.step(
      `Assert that Transaction Results page is shown`,
      async () => {
        await expect(this.page).toHaveURL(/.*findtrans\.htm/);
        await expect(this.page.getByText('Transaction Results')).toBeVisible();
      },
    );
  }

  async clickFindTransactionsByIdButton() {
    await this.step(`Click the Find Transactions by ID button`, async () => {
      await this.findTransactionsByIdButton.click();
    });
  }

  async clickFindTransactionsByDateButton() {
    await this.step(`Click the Find Transactions by Date button`, async () => {
      await this.findTransactionsByDateButton.click();
    });
  }
  async clickFindTransactionsByDateRangeButton() {
    await this.step(
      `Click the Find Transactions by Date Range button`,
      async () => {
        await this.findTransactionsByDateRangeButton.click();
      },
    );
  }
  async clickFindTransactionsByAmountButton() {
    await this.step(
      `Click the Find Transactions by Amount button`,
      async () => {
        await this.findTransactionsByAmountButton.click();
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
}
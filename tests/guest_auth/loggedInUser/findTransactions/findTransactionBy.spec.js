import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { openAdditionalAccount } from '../../../../src/ui/actions/openAdditionalAccount';
import { getTodayDateString } from '../../../../src/common/helpers/dateHelpers';
import * as allure from 'allure-js-commons';

let defaultAccount;
let additionalAccount;
const moneyToSend = 1000;
let dateOfTransaction, previousDay;
let transactionId;

test.beforeEach(
  async ({
    page,
    account,
    openNewAccountPage,
    accountNavigationMenu,
    accountsOverviewPage,
    transferFundsPage,
    accountActivityPage,
    transactionDetailsPage,
  }) => {
    await signUpAccount(page, account);
    await accountNavigationMenu.openAccountsOverviewPage();
    defaultAccount = await accountsOverviewPage.getDefaultAccountId();
    additionalAccount = await openAdditionalAccount(
      page,
      'SAVINGS',
      openNewAccountPage,
    );

    await accountNavigationMenu.openTransferFundsPage();
    await transferFundsPage.fillAmountField(moneyToSend);
    await transferFundsPage.selectFromAccountId(additionalAccount);
    await transferFundsPage.selectToAccountId(defaultAccount);
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertSuccessTransferMessageIsShown();
    dateOfTransaction = getTodayDateString('MM-DD-YYYY', 0);
    previousDay = getTodayDateString('MM-DD-YYYY', -2);
    await accountNavigationMenu.openAccountsOverviewPage();

    await accountsOverviewPage.clickOnAccountLink(additionalAccount);
    await accountActivityPage.assertAccountDetailsHeaderIsShown();
    await accountActivityPage.assertTransactionsLoaded();
    await accountActivityPage.clickTransactionLinkByOrder(2);
    transactionId = await transactionDetailsPage.getTransactionId();
  },
);

test('User is able to find transactions by Id', async ({
  accountNavigationMenu,
  findTransactionPage,
  page,
}) => {
  await allure.severity('major');
  await accountNavigationMenu.openFindTransactionsPage();
  await findTransactionPage.selectAccountId(additionalAccount);
  await findTransactionPage.fillTransactionIdField(transactionId);
  await findTransactionPage.clickFindTransactionsByIdButton();
  await findTransactionPage.assertTransactionResultsPageIsShown();
  await findTransactionPage.assertTransactionDebit(1, moneyToSend);
  await findTransactionPage.assertTransactionDate(1, dateOfTransaction);
  await findTransactionPage.assertTransactionType(1, 'Funds Transfer Sent');
});

test('User is able to find transactions by date', async ({
  accountNavigationMenu,
  findTransactionPage,
}) => {
  await allure.severity('normal');
  await accountNavigationMenu.openFindTransactionsPage();
  await findTransactionPage.selectAccountId(additionalAccount);
  await findTransactionPage.fillTransactionDateField(dateOfTransaction);
  await findTransactionPage.clickFindTransactionsByDateButton();
  await findTransactionPage.assertTransactionResultsPageIsShown();
  await findTransactionPage.assertCountOfTransactions(2);
  await findTransactionPage.assertTransactionDate(1, dateOfTransaction);
  await findTransactionPage.assertTransactionDate(2, dateOfTransaction);
});

test('User is able to find transactions by date range', async ({
  accountNavigationMenu,
  findTransactionPage,
}) => {
  await allure.severity('normal');
  await accountNavigationMenu.openFindTransactionsPage();
  await findTransactionPage.selectAccountId(additionalAccount);
  await findTransactionPage.fillTransactionDateFromField(previousDay);
  await findTransactionPage.fillTransactionDateToField(dateOfTransaction);
  await findTransactionPage.clickFindTransactionsByDateRangeButton();
  await findTransactionPage.assertTransactionResultsPageIsShown();
  await findTransactionPage.assertCountOfTransactions(2);
  await findTransactionPage.assertTransactionDate(1, dateOfTransaction);
  await findTransactionPage.assertTransactionDate(2, dateOfTransaction);
});

test('User is able to find transactions by amount', async ({
  accountNavigationMenu,
  findTransactionPage,
}) => {
  await allure.severity('normal');
  await accountNavigationMenu.openFindTransactionsPage();
  await findTransactionPage.selectAccountId(additionalAccount);
  await findTransactionPage.fillTransactionAmountField(moneyToSend);
  await findTransactionPage.clickFindTransactionsByAmountButton();
  await findTransactionPage.assertTransactionResultsPageIsShown();
  await findTransactionPage.assertTransactionDebit(1, moneyToSend);
  await findTransactionPage.assertTransactionDate(1, dateOfTransaction);
  await findTransactionPage.assertTransactionType(1, 'Funds Transfer Sent');
});
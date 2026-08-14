import { test } from '../../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../../src/ui/actions/signUpAccount';
import { openAdditionalAccount } from '../../../../../src/ui/actions/openAdditionalAccount';
import * as allure from 'allure-js-commons';

let defaultAccount;
let additionalAccount;
const moneyToSend = 1000;

test.beforeEach(
  async ({
    page,
    account,
    openNewAccountPage,
    accountNavigationMenu,
    accountsOverviewPage,
    transferFundsPage,
    accountActivityPage,
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
    await accountNavigationMenu.openAccountsOverviewPage();

    await accountsOverviewPage.clickOnAccountLink(defaultAccount);
    await accountActivityPage.assertAccountDetailsHeaderIsShown();
    await accountActivityPage.assertTransactionsLoaded();
  },
);

test('User is able to filter activities by transaction type Debit', async ({
  accountActivityPage,
}) => {
  await allure.severity('minor');
  await accountActivityPage.selectTypeToFilter('Debit');
  await accountActivityPage.clickGoButton();
  await accountActivityPage.assertCountOfTransactions(1);
  await accountActivityPage.assertTransactionType(1, 'Funds Transfer Sent');
  await accountActivityPage.assertTransactionTypeNotShown(
    'Funds Transfer Received',
  );
});

test('User is able to filter activities by transaction type Credit', async ({
  accountActivityPage,
}) => {
  await allure.severity('minor');
  await accountActivityPage.selectTypeToFilter('Credit');
  await accountActivityPage.clickGoButton();
  await accountActivityPage.assertCountOfTransactions(1);
  await accountActivityPage.assertTransactionType(1, 'Funds Transfer Received');
  await accountActivityPage.assertTransactionTypeNotShown(
    'Funds Transfer Sent',
  );
});

test('User is able to filter activities by transaction type All', async ({
  accountActivityPage,
}) => {
  await allure.severity('minor');
  await accountActivityPage.selectTypeToFilter('Credit');
  await accountActivityPage.clickGoButton();
  await accountActivityPage.assertCountOfTransactions(1);
  await accountActivityPage.selectTypeToFilter('All');
  await accountActivityPage.clickGoButton();
  await accountActivityPage.assertCountOfTransactions(2);
  await accountActivityPage.assertTransactionType(1, 'Funds Transfer Sent');
  await accountActivityPage.assertTransactionType(2, 'Funds Transfer Received');
});

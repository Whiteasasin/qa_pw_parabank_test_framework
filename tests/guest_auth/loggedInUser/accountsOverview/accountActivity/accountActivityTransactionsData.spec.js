import { test } from '../../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../../src/ui/actions/signUpAccount';
import { openAdditionalAccount } from '../../../../../src/ui/actions/openAdditionalAccount';
import { getTodayDateString } from '../../../../../src/common/helpers/dateHelpers';
import * as allure from 'allure-js-commons';

let defaultAccount;
let additionalAccount;
let defaultBalance;
let additionalBalance;
const moneyToSend = 1000;

test.beforeEach(
  async ({
    page,
    account,
    openNewAccountPage,
    accountNavigationMenu,
    accountsOverviewPage,
    transferFundsPage,
  }) => {
    await signUpAccount(page, account);
    await accountNavigationMenu.openAccountsOverviewPage();
    defaultAccount = await accountsOverviewPage.getDefaultAccountId();
    defaultBalance =
      await accountsOverviewPage.getAccountBalanceByAccountId(defaultAccount);
    additionalAccount = await openAdditionalAccount(
      page,
      'SAVINGS',
      openNewAccountPage,
    );
    await accountNavigationMenu.openAccountsOverviewPage();
    additionalBalance =
      await accountsOverviewPage.getAccountBalanceByAccountId(
        additionalAccount,
      );
    await accountNavigationMenu.openTransferFundsPage();
    await transferFundsPage.fillAmountField(moneyToSend);
    await transferFundsPage.selectFromAccountId(additionalAccount);
    await transferFundsPage.selectToAccountId(defaultAccount);
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertSuccessTransferMessageIsShown();
  },
);

test('Account activity table shows proper transaction data', async ({
  accountsOverviewPage,
  accountNavigationMenu,
  accountActivityPage,
}) => {
  await allure.severity('major');
  await accountNavigationMenu.openAccountsOverviewPage();

  await accountsOverviewPage.clickOnAccountLink(additionalAccount);
  await accountActivityPage.assertAccountDetailsHeaderIsShown();
  await accountActivityPage.assertTransactionsLoaded();
  const todayDate = getTodayDateString('MM-DD-YYYY');

  await accountActivityPage.assertTransactionDetails({
    rowNumber: 1,
    type: 'Funds Transfer Received',
    date: todayDate,
    debit: null,
    credit: additionalBalance,
});

  await accountActivityPage.assertTransactionDetails({
    rowNumber: 2,
    date: todayDate,
    type: 'Funds Transfer Sent',
    debit: null,
    credit: moneyToSend,
  });
});

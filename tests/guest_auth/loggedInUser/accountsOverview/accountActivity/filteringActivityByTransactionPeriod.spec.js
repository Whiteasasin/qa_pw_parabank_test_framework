import { test } from '../../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../../src/ui/actions/signUpAccount';
import { openAdditionalAccount } from '../../../../../src/ui/actions/openAdditionalAccount';
import { getCurrentMonth } from '../../../../../src/common/helpers/dateHelpers';
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

test('User is able to filter activities by current month', async ({
  accountActivityPage,
}) => {
  await allure.severity('major');
  const currentMonth = getCurrentMonth();
  await accountActivityPage.selectMonthToFiterByPeriod(currentMonth);
  await accountActivityPage.clickGoButton();
  await accountActivityPage.assertCountOfTransactions(2);
  await accountActivityPage.assertTransactionType(1, 'Funds Transfer Sent');
  await accountActivityPage.assertTransactionType(2, 'Funds Transfer Received');
});

test('User is able to filter activities by previous month', async ({
  accountActivityPage,
}) => {
  await allure.severity('normal');
  const currentMonth = getCurrentMonth(-1);
  await accountActivityPage.selectMonthToFiterByPeriod(currentMonth);
  await accountActivityPage.clickGoButton();
  await accountActivityPage.assertNoTransactionsErrorIsShown();
});

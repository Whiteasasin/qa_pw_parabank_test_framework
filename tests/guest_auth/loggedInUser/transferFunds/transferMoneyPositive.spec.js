import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { openAddtionalAccount } from '../../../src/ui/actions/openAdditionalAccount';
import * as allure from 'allure-js-commons';

const testParameters = [
  {
    accountType: 'SAVINGS',
  },
  {
    accountType: 'CHECKING',
  },
];

testParameters.forEach(({ accountType }) => {
  test.describe(`Tests for account type: ${accountType}`, () => {
    let newAccountId;
    test.beforeEach(async ({ page, account, openNewAccountPage }) => {
      await signUpAccount(page, account);
      newAccountId = await openAddtionalAccount(
        page,
        accountType,
        openNewAccountPage,
      );
    });

    // eslint-disable-next-line max-len
    test(`Transfer money to an ${accountType} account and check that account balance is updated`, async ({
      accountNavigationMenu,
      transferFundsPage,
      accountsOverviewPage,
      page,
    }) => {
      await allure.severity('major');
      await accountNavigationMenu.openAccountsOverviewPage();
      const initialBalance =
        await accountsOverviewPage.getAccountBalanceByAccountId(newAccountId);
      await accountNavigationMenu.openTransferFundsPage();
      await transferFundsPage.fillAmountField('100');
      await transferFundsPage.selectToAccountId(newAccountId);
      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertSuccessTransferMessageIsShown();
      await accountNavigationMenu.openAccountsOverviewPage();
      const finalBalance =
        await accountsOverviewPage.getAccountBalanceByAccountId(newAccountId);
      await accountsOverviewPage.assertValuesAreEqual(
        finalBalance,
        initialBalance + 100,
      );
    });
  });
});
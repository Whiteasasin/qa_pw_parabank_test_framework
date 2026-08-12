import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { openAdditionalAccount } from '../../../../src/ui/actions/openAdditionalAccount';
import * as allure from 'allure-js-commons';

let defaultAccountId, accountBalance, avaliableAmount;

test.beforeEach(
  async ({ page, account, openNewAccountPage, accountsOverviewPage }) => {
    await signUpAccount(page, account);
  },
);

test('Accounts overview shows default account and balances', async ({
  accountsOverviewPage,
  accountNavigationMenu,
}) => {
  await allure.severity('major');
  await accountNavigationMenu.openAccountsOverviewPage();
  defaultAccountId = await accountsOverviewPage.getDefaultAccountId();
  accountBalance =
    await accountsOverviewPage.getAccountBalanceByAccountId(defaultAccountId);
  await accountsOverviewPage.assertValueIsGreaterThanZero(accountBalance);
  avaliableAmount =
    await accountsOverviewPage.getAvaliableAmountByAccountId(defaultAccountId);
  await accountsOverviewPage.assertValueIsGreaterThanZero(avaliableAmount);
});
import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test('User is able to see account details', async ({
  accountsOverviewPage,
  accountNavigationMenu,
  accountActivityPage,
}) => {
  await allure.severity('critical');
  await accountNavigationMenu.openAccountsOverviewPage();
  const accountId = await accountsOverviewPage.getDefaultAccountId();
  const accountBalance =
    await accountsOverviewPage.getAccountBalanceByAccountId(accountId);
  console.log(accountBalance);
  const avaliableAmount =
    await accountsOverviewPage.getAvaliableAmountByAccountId(accountId);
  await accountsOverviewPage.clickOnAccountLink(accountId);
  await accountActivityPage.assertAccountDetailsHeaderIsShown();
  await accountActivityPage.assertAccountNumberIsCorrect(accountId);
  await accountActivityPage.assertAccountTypeIsCorrect('CHECKING');
  await accountActivityPage.assertAccountBalanceIsCorrect(accountBalance);
  await accountActivityPage.assertAccountAvailableBalanceIsCorrect(
    avaliableAmount,
  );
});
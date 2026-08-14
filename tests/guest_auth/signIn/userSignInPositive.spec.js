import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import * as allure from 'allure-js-commons';
let accountUsername, accountPassword;
test.beforeEach(async ({ page, account, accountNavigationMenu }) => {
  await signUpAccount(page, account);
  await accountNavigationMenu.clickLogOut();
  accountUsername = account.username;
  accountPassword = account.password;
});
test('User is able to sign in', async ({
  page,
  homePage,
  account,
  accountNavigationMenu,
}) => {
  await allure.severity('critical');
  await homePage.fillUsername(accountUsername);
  await homePage.fillPassword(accountPassword);
  await homePage.clickLoginButton();
  await accountNavigationMenu.assertAccountsOverviewPageOpened();
});

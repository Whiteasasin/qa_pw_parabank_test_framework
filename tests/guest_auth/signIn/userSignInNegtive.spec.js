import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import * as allure from 'allure-js-commons';

import {
  EMPTY_CREDS_MESSAGE,
  INCORRECT_CREDS_MESSAGE,
} from '../../../src/ui/constants/authErrorMasages';
let accountUsername, accountPassword;

test.beforeEach(async ({ page, account, accountNavigationMenu }) => {
  await signUpAccount(page, account);
  await accountNavigationMenu.clickLogOut();
  accountUsername = account.username;
  accountPassword = account.password;
});

test('User is not able to sign in with empty username', async ({
  homePage,
}) => {
  await allure.severity('critical');
  await homePage.fillUsername('');
  await homePage.fillPassword(accountPassword);
  await homePage.clickLoginButton();
  await homePage.assertLoginError(EMPTY_CREDS_MESSAGE);
});

test('User is not able to sign in with empty password', async ({
  homePage,
}) => {
  await homePage.fillUsername(accountUsername);
  await homePage.fillPassword('');
  await homePage.clickLoginButton();
  await homePage.assertLoginError(EMPTY_CREDS_MESSAGE);
});

test('User is not able to sign in with wrong username', async ({
  homePage,
}) => {
  await homePage.fillUsername('wrongUsername');
  await homePage.fillPassword(accountPassword);
  await homePage.clickLoginButton();
  await homePage.assertLoginError(INCORRECT_CREDS_MESSAGE);
});

test('User is not able to sign in with wrong password', async ({
  homePage,
}) => {
  await homePage.fillUsername(accountUsername);
  await homePage.fillPassword('wrongPassword');
  await homePage.clickLoginButton();
  await homePage.assertLoginError(INCORRECT_CREDS_MESSAGE);
});
import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test('User is able to log out', async ({ page, accountNavigationMenu }) => {
  await allure.severity('critical');
  await accountNavigationMenu.clickLogOut();
});
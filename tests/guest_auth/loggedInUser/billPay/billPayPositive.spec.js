import { test } from '../../../_fixtures/fixtures';
import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { generateBillPayData } from '../../../../src/common/helpers/testData/generateBillPayData';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test('User is able to make a bill payment', async ({
  accountNavigationMenu,
  billPayPage,
  accountsOverviewPage,
  accountActivityPage,
}) => {
  await allure.severity('critical');

  const billPayAmaunt= '100';
  await accountNavigationMenu.openBillPayPage();
  const billPayData = generateBillPayData();
  await billPayPage.fillPayeeName(billPayData.payeeName);
  await billPayPage.fillAddress(billPayData.address);
  await billPayPage.fillCity(billPayData.city);
  await billPayPage.fillState(billPayData.state);
  await billPayPage.fillZipCode(billPayData.zipCode);
  await billPayPage.fillPhone(billPayData.phone);
  await billPayPage.fillAccountNumber(billPayData.accountNumber);
  await billPayPage.fillVerifyAccountNumber(billPayData.accountNumber);
  await billPayPage.fillAmount(billPayAmaunt);
  await billPayPage.clickSendPaymentButton();
  await billPayPage.assertSuccessPaymentMessageIsShown(
    billPayData.payeeName,
    '100',
  );
  await accountNavigationMenu.openAccountsOverviewPage();
  const defaultAccountId = await accountsOverviewPage.getDefaultAccountId();
  await accountsOverviewPage.clickOnAccountLink(defaultAccountId);
  await accountActivityPage.assertAccountDetailsHeaderIsShown();
  await accountActivityPage.assertTransactionsLoaded();
  await accountActivityPage.assertTransactionType(
    1,
    `Bill Payment to ${billPayData.payeeName}`,
  );
  await accountActivityPage.assertTransactionDebit(1, billPayAmaunt);
});

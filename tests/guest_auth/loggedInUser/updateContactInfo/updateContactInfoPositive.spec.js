import { test } from '../../../_fixtures/fixtures';import { signUpAccount } from '../../../../src/ui/actions/signUpAccount';
import { generateNewAccountData } from '../../../../src/common/helpers/testData/generateNewAccountData';
import * as allure from 'allure-js-commons';
let defaultUser;
test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});
test('User is able to update Contact Information', async ({
  accountNavigationMenu,
  updateContactInfoPage,
  page,
  account,
}) => {
  await allure.severity('major');
  await accountNavigationMenu.openUpdateContactInfoPage();
  await updateContactInfoPage.assertFirstNameValue(account.firstname);
  const updateContactInfoData = generateNewAccountData();
  await updateContactInfoPage.fillFirstName(updateContactInfoData.firstname);
  await updateContactInfoPage.fillLastName(updateContactInfoData.lastname);
  await updateContactInfoPage.fillAddress(updateContactInfoData.address);
  await updateContactInfoPage.fillCity(updateContactInfoData.city);
  await updateContactInfoPage.fillState(updateContactInfoData.state);
  await updateContactInfoPage.fillZipCode(updateContactInfoData.zipcode);
  await updateContactInfoPage.fillPhone(updateContactInfoData.phone);
  await updateContactInfoPage.clickUpdateProfileButton();
  await updateContactInfoPage.assertUpdateProfileSuccessMessageIsShown();
  await accountNavigationMenu.openUpdateContactInfoPage();
  await updateContactInfoPage.assertFirstNameValue(
    updateContactInfoData.firstname,
  );
  await updateContactInfoPage.assertLastNameValue(
    updateContactInfoData.lastname,
  );
  await updateContactInfoPage.assertAddressValue(updateContactInfoData.address);
  await updateContactInfoPage.assertCityValue(updateContactInfoData.city);
  await updateContactInfoPage.assertStateValue(updateContactInfoData.state);
  await updateContactInfoPage.assertZipCodeValue(updateContactInfoData.zipcode);
  await updateContactInfoPage.assertPhoneValue(updateContactInfoData.phone);
});
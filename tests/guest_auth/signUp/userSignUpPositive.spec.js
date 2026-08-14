import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test('Successfull sign up flow test', async ({
  account,
  homePage,
  signUpPage,
}) => {
  await allure.severity('critical');
  await homePage.open();
  await homePage.clickRegisterLink();
  await signUpPage.assertSignUpPageIsOpen();
  await signUpPage.fillFirstName(account.firstname);
  await signUpPage.fillLastName(account.lastname);
  await signUpPage.fillAddress(account.address);
  await signUpPage.fillCity(account.city);
  await signUpPage.fillState(account.state);
  await signUpPage.fillZipCode(account.zipcode);
  await signUpPage.fillPhone(account.phone);
  await signUpPage.fillSSN(account.ssn);
  await signUpPage.fillUsername(account.username);
  await signUpPage.fillPassword(account.password);
  await signUpPage.fillConfirmPassword(account.password);

  await signUpPage.clickRegisterButton();
  await signUpPage.assertWelcomeMessageIsShown(account.username);
});

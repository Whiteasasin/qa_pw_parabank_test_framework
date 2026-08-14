import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

import {
  EMPTY_LASTNAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIPCODE_MESSAGE,
  EMPTY_SSN_MESSAGE,
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_CONFIRM_PASSWORD_MESSAGE,
} from '../../../src/ui/constants/authErrorMasages';

const testParameters = [
  {
    message: EMPTY_LASTNAME_MESSAGE,
    title: 'empty last name',
    fieldToEmpty: 'lastname',
  },
  {
    message: EMPTY_ADDRESS_MESSAGE,
    title: 'empty address',
    fieldToEmpty: 'address',
  },
  {
    message: EMPTY_CITY_MESSAGE,
    title: 'empty city',
    fieldToEmpty: 'city',
  },
  {
    message: EMPTY_STATE_MESSAGE,
    title: 'empty state',
    fieldToEmpty: 'state',
  },
  {
    message: EMPTY_ZIPCODE_MESSAGE,
    title: 'empty zip code',
    fieldToEmpty: 'zipcode',
  },
  {
    message: EMPTY_SSN_MESSAGE,
    title: 'empty ssn',
    fieldToEmpty: 'ssn',
  },
  {
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty username',
    fieldToEmpty: 'username',
  },
  {
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
    fieldToEmpty: 'password',
  },
  {
    message: EMPTY_CONFIRM_PASSWORD_MESSAGE,
    title: 'empty confirmpassword',
    fieldToEmpty: 'confirmpassword',
  },
];

testParameters.forEach(({ message, title, fieldToEmpty }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ signUpPage, account, homePage }) => {
      await allure.severity('critical');

      const payload = {
        firstname: account.firstname,
        lastname: fieldToEmpty === 'lastname' ? '' : account.lastname,
        address: fieldToEmpty === 'address' ? '' : account.address,
        city: fieldToEmpty === 'city' ? '' : account.city,
        state: fieldToEmpty === 'state' ? '' : account.state,
        zipcode: fieldToEmpty === 'zipcode' ? '' : account.zipcode,
        phone: account.phone,
        ssn: fieldToEmpty === 'ssn' ? '' : account.ssn,
        username: fieldToEmpty === 'username' ? '' : account.username,
        password: fieldToEmpty === 'password' ? '' : account.password,
        confirmpassword:
          fieldToEmpty === 'confirmpassword' ? '' : account.password,
      };

      await homePage.open();
      await homePage.clickRegisterLink();
      await signUpPage.assertSignUpPageIsOpen();
      await signUpPage.fillFirstName(payload.firstname);
      await signUpPage.fillLastName(payload.lastname);
      await signUpPage.fillAddress(payload.address);
      await signUpPage.fillCity(payload.city);
      await signUpPage.fillState(payload.state);
      await signUpPage.fillZipCode(payload.zipcode);
      await signUpPage.fillPhone(payload.phone);
      await signUpPage.fillSSN(payload.ssn);
      await signUpPage.fillUsername(payload.username);
      await signUpPage.fillPassword(payload.password);
      await signUpPage.fillConfirmPassword(payload.confirmpassword);

      await signUpPage.clickRegisterButton();

      await signUpPage.assertErrorMessageIsShown(message);
    });
  });
});

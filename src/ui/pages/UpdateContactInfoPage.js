import { expect, testStep } from '../../common/helpers/pwHelpers';

export class UpdateContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.updateProfileButton = this.page.getByRole('button', {
      name: 'Update Profile',
    });
  }

  inputTextLocator(inputName) {
    return this.page
      .getByRole('row')
      .filter({ hasText: inputName })
      .getByRole('textbox');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillFirstName(firstName) {
    await this.step(`Fill the First Name`, async () => {
      await this.inputTextLocator('First Name:').clear();
      await this.inputTextLocator('First Name:').fill(firstName);
    });
  }

  async fillLastName(lastName) {
    await this.step(`Fill the Last Name`, async () => {
      await this.inputTextLocator('Last Name:').clear();
      await this.inputTextLocator('Last Name:').fill(lastName);
    });
  }

  async fillAddress(address) {
    await this.step(`Fill the Address`, async () => {
      await this.inputTextLocator('Address:').clear();
      await this.inputTextLocator('Address:').fill(address);
    });
  }
  async fillCity(city) {
    await this.step(`Fill the city`, async () => {
      await this.inputTextLocator('City:').clear();
      await this.inputTextLocator('City:').fill(city);
    });
  }

  async fillState(state) {
    await this.step(`Fill the state`, async () => {
      await this.inputTextLocator('State:').clear();
      await this.inputTextLocator('State:').fill(state);
    });
  }

  async fillZipCode(zipCode) {
    await this.step(`Fill the Zip Code`, async () => {
      await this.inputTextLocator('Zip Code:').clear();
      await this.inputTextLocator('Zip Code:').fill(zipCode);
    });
  }

  async fillPhone(phone) {
    await this.step(`Fill the Phone #`, async () => {
      await this.inputTextLocator('Phone #:').clear();
      await this.inputTextLocator('Phone #:').fill(phone);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click Update Profile button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertUpdateProfilePageIsOpen() {
    await this.step(`Assert Update Profile page is open`, async () => {
      expect(this.page.url()).toContain('/parabank/updateprofile.htm');
    });
  }

  async assertUpdateProfileSuccessMessageIsShown() {
    await this.step(`Assert update profile is successful`, async () => {
      await expect(
        this.page.getByRole('heading', { name: 'Profile Updated' }),
      ).toBeVisible();
      await expect(
        this.page.getByText(
          // eslint-disable-next-line max-len
          'Your updated address and phone number have been added to the system.',
        ),
      ).toBeVisible();
    });
  }

  async assertErrorMessageIsShown(errorMessageText) {
    await this.step(`Assert error "${errorMessageText}" is shown`, async () => {
      await expect(this.page.getByText(errorMessageText)).toBeVisible();
    });
  }

  async assertFirstNameValue(expectedFirstName) {
    await this.step(
      `Assert First Name value is "${expectedFirstName}"`,
      async () => {
        await expect(this.inputTextLocator('First Name:')).toHaveValue(
          expectedFirstName,
        );
      },
    );
  }

  async assertLastNameValue(expectedLastName) {
    await this.step(
      `Assert Last Name value is "${expectedLastName}"`,
      async () => {
        await expect(this.inputTextLocator('Last Name:')).toHaveValue(
          expectedLastName,
        );
      },
    );
  }

  async assertAddressValue(expectedAddress) {
    await this.step(
      `Assert Address value is "${expectedAddress}"`,
      async () => {
        await expect(this.inputTextLocator('Address:')).toHaveValue(
          expectedAddress,
        );
      },
    );
  }

  async assertCityValue(expectedCity) {
    await this.step(`Assert City value is "${expectedCity}"`, async () => {
      await expect(this.inputTextLocator('City:')).toHaveValue(expectedCity);
    });
  }

  async assertStateValue(expectedState) {
    await this.step(`Assert State value is "${expectedState}"`, async () => {
      await expect(this.inputTextLocator('State:')).toHaveValue(expectedState);
    });
  }

  async assertZipCodeValue(expectedZipCode) {
    await this.step(
      `Assert Zip Code value is "${expectedZipCode}"`,
      async () => {
        await expect(this.inputTextLocator('Zip Code:')).toHaveValue(
          expectedZipCode,
        );
      },
    );
  }

  async assertPhoneValue(expectedPhone) {
    await this.step(`Assert Phone # value is "${expectedPhone}"`, async () => {
      await expect(this.inputTextLocator('Phone #:')).toHaveValue(
        expectedPhone,
      );
    });
  }
}
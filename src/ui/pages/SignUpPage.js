import { expect, testStep } from '../../common/helpers/pwHelpers';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.registerButton = this.page.getByRole('button', { name: 'Register' });
  }

  inputTextLocator(inputName) {
    return this.page
      .getByRole('row')
      .filter({ hasText: inputName })
      .getByRole('textbox');
  }

  errorMessageLocator(errorMessageText) {
    return this.page.getByText(errorMessageText);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillFirstName(firstName) {
    await this.step(`Fill the first name`, async () => {
      await this.inputTextLocator('First Name:').fill(firstName);
    });
  }

  async fillLastName(lastName) {
    await this.step(`Fill the last name`, async () => {
      await this.inputTextLocator('Last Name:').fill(lastName);
    });
  }

  async fillAddress(address) {
    await this.step(`Fill the address`, async () => {
      await this.inputTextLocator('Address:	').fill(address);
    });
  }

  async fillCity(city) {
    await this.step(`Fill the city`, async () => {
      await this.inputTextLocator('City:').fill(city);
    });
  }

  async fillState(state) {
    await this.step(`Fill the state`, async () => {
      await this.inputTextLocator('State:').fill(state);
    });
  }

  async fillZipCode(zipCode) {
    await this.step(`Fill the Zip Code`, async () => {
      await this.inputTextLocator('Zip Code:').fill(zipCode);
    });
  }

  async fillPhone(phone) {
    await this.step(`Fill the Phone #`, async () => {
      await this.inputTextLocator('Phone #:').fill(phone);
    });
  }
  async fillSSN(ssn) {
    await this.step(`Fill the SSN`, async () => {
      await this.inputTextLocator('SSN:').fill(ssn);
    });
  }
  async fillUsername(username) {
    await this.step(`Fill the Username`, async () => {
      await this.inputTextLocator('Username:').fill(username);
    });
  }
  async fillPassword(password) {
    await this.step(`Fill the Password`, async () => {
      await this.inputTextLocator('Password:').fill(password);
    });
  }
  async fillConfirmPassword(password) {
    await this.step(`Fill the confirm Password`, async () => {
      await this.inputTextLocator('Confirm:').fill(password);
    });
  }
  async clickRegisterButton() {
    await this.step(`Click Register button`, async () => {
      await this.registerButton.click();
    });
  }

  async submitSignUpForm(account) {
    await this.step(`Submit Sign Up form`, async () => {
      await this.fillFirstName(account.firstname);
      await this.fillLastName(account.lastname);
      await this.fillAddress(account.address);
      await this.fillCity(account.city);
      await this.fillState(account.state);
      await this.fillZipCode(account.zipcode);
      await this.fillPhone(account.phone);
      await this.fillSSN(account.ssn);
      await this.fillUsername(account.username);
      await this.fillPassword(account.password);
      await this.fillConfirmPassword(account.password);
      await this.clickRegisterButton();
    });
  }

  async assertErrorMessageIsShown(errorMessageText) {
    await this.step(`Assert error ${errorMessageText} is shown`, async () => {
      await expect(this.errorMessageLocator(errorMessageText)).toBeVisible();
    });
  }

  async assertSignUpPageIsOpen() {
    await this.step(`Assert Sign Up Page is open`, async () => {
      expect(this.page.url()).toContain('/parabank/register.htm');
    });
  }

  async assertWelcomeMessageIsShown(username) {
    await this.step(`Assert Welcome ${username} is shown`, async () => {
      await expect(
        this.page.getByRole('heading', { name: `Welcome ${username}` }),
      ).toBeVisible();
    });
  }
}

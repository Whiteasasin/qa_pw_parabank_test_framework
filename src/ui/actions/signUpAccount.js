import { SignUpPage } from '../pages/SignUpPage';
import { HomePage } from '../pages/HomePage';
import { testStep } from '../../common/helpers/pwHelpers';

export async function signUpAccount(page, account) {
  await testStep(`Sign up account`, async () => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.clickRegisterLink();
    await signUpPage.submitSignUpForm(account);

    await signUpPage.assertWelcomeMessageIsShown(account.username);
  });
}
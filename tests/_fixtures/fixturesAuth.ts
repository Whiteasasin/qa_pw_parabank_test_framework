import { test as base } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SignUpPage } from '../../src/ui/pages/SignUpPage';

export const test = base.extend<{
  homePage: HomePage;
  signUpPage: SignUpPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
});
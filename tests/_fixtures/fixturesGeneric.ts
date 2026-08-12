import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';
import { generateNewAccountData } from '../../src/common/helpers/testData/generateNewAccountData';
import { AccountNavigationMenu } from '../../src/common/components/AccountNavigationMenu';

export const test = base.extend<
  {
   
    infoTestLog: string;
    addAllureTestHierarchy: string;
    account: any;
    accountNavigationMenu: AccountNavigationMenu;
  },
  {
    
    logger: Logger;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
  account: async ({ logger }, use) => {
    const account = generateNewAccountData(logger);

    await use(account);
  },
  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file;

      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);
      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
  accountNavigationMenu: async ({ page }, use) => {
    const accountNavigationMenu = new AccountNavigationMenu(page);

    await use(accountNavigationMenu);
  },
});

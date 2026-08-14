import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { AccountNavigationMenu } from '../../common/components/AccountNavigationMenu';
import { testStep } from '../../common/helpers/pwHelpers';

export async function openAdditionalAccount(page, accountType) {
  return await testStep(`Open an addtional account`, async () => {
    const accountNavigationMenu = new AccountNavigationMenu(page);
    const openNewAccountPage = new OpenNewAccountPage(page);

    await accountNavigationMenu.clickOpenNewAccount();
    await openNewAccountPage.assertOpenNewAccountPageOpened();
    await openNewAccountPage.selectAccountType(accountType);
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpenedMessageIsShown();

    const accountId = await openNewAccountPage.getCreatedAccountId();
    return accountId;
  });
}

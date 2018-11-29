import { Module, Injectable } from '@zetapush/core';
import {
  StandardUserManagementModule,
  StandardUserWorkflow,
  ConfirmationUrlHttpHandler,
  AccountCreationDetails,
  StandardAccountStatus,
  AccountCreationManagerInjectable,
  Account,
  AccountCreationManager,
  LegacyAdapterUserRepository
} from '@zetapush/user-management';

@Injectable() // <1>
class MyAccountCreationManager implements AccountCreationManager {
  constructor(private userRepository: LegacyAdapterUserRepository) {} // <2>

  async createAccount(accountCreationDetails: AccountCreationDetails): Promise<Account | null> {
    const accountId = Math.random()
      .toString(36)
      .substring(2);
    return await this.userRepository.addUser(
      <any>accountCreationDetails.credentials,
      accountCreationDetails.profile || {},
      StandardAccountStatus.Active,
      accountId
    );
  }
}

@Module({
  imports: [StandardUserManagementModule],
  expose: {
    user: StandardUserWorkflow,
    http: ConfirmationUrlHttpHandler
  },
  providers: [
    { // <3>
      provide: AccountCreationManagerInjectable,
      useClass: MyAccountCreationManager
    }
  ]
})
export default class Api {}
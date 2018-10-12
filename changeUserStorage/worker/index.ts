import { Injectable, Module, Bootstrappable } from '@zetapush/core';
import { StandardUserManagementModule, StandardUserWorkflow, ConfirmationUrlHttpHandler, LoginPasswordCredentials, LegacySimpleError, UserProfile, AccountStatus, Account, StandardAccountStatus, AccountIdAssociationLoadError, UserRepository, UserRepositoryInjectable, LegacyAdapterUserRepositoryBootstrapError, LegacyUpdateAccountStatus } from '@zetapush/user-management';
import { Simple, Gda, GdaConfigurer, GdaDataType, Idempotence } from '@zetapush/platform-legacy';

@Injectable()
class MyUserStorage implements UserRepository, Bootstrappable { // <1>
  private NAME_TABLE_STORAGE_USERS = 'tableStorageUsers';
  private NAME_COLUMN_STORAGE_USERS = 'columnStorageUsers';

  constructor(
    private simple: Simple, 
    private gda: Gda, 
    private gdaConfigurer: GdaConfigurer) {}

  /**
   * Create the table to store the informations of the users
   */
  async onApplicationBootstrap() { // <2>
    try {
      await this.gdaConfigurer.createTable({
        name: this.NAME_TABLE_STORAGE_USERS,
        columns: [
          {
            name: this.NAME_COLUMN_STORAGE_USERS,
            type: GdaDataType.OBJECT,
            map: false
          }
        ],
        idempotence: Idempotence.IGNORE_IDENTICAL
      });
    } catch (e) {
      console.error(e);
      throw new LegacyAdapterUserRepositoryBootstrapError(`Failed to create table for associations`, e);
    }
  }

  /**
   * Check if a user exists
   * @param credentials Need to be implements Credentials interface
   */
  async exists(credentials: LoginPasswordCredentials) {
    try {
      const user = await this.simple.checkUser({ key: credentials.login });
      return !!user;
    } catch (e) {
      if (e.code) {
        return e.code !== 'NO_ACCOUNT';
      }
      throw new LegacySimpleError(`Failed to check if user ${credentials.login} exists`, e);
    }
  }

  /**
   * Create a new user account
   * @param credentials LoginPasswordCredentials
   * @param userProfile UserProfile
   * @param accountStatus AccountStatus
   * @param accountId string
   */
  async addUser(
    credentials: LoginPasswordCredentials,
    userProfile: UserProfile,
    accountStatus: AccountStatus,
    accountId: string
  ): Promise<Account> {
    try {
      const result = await this.simple.createAccount({
        fields: {
          login: credentials.login,
          password: credentials.password,
          userProfile,
          accountId
        },
        status: {
          data: accountStatus,
          active: accountStatus === StandardAccountStatus.Active
        }
      });

      if (result.userKey && result.fields && result.status) {
        await this.gda.put({
          table: this.NAME_TABLE_STORAGE_USERS,
          column: this.NAME_COLUMN_STORAGE_USERS,
          key: accountId,
          data: {
            userKey: result.userKey,
            login: result.fields.login
          }
        });
    
        return {
          accountId: result.fields.accountId,
          accountStatus: result.status.data,
          profile: userProfile
        };
      } else {
        throw new LegacySimpleError(`Account creation for '${credentials.login}' has failed`);
      }
    } catch(e) {
      throw "Error to create new user account";
    }
  }

  /**
   * Get the profile of a user
   * @param accountId string
   */
  async getProfile(accountId: string): Promise<UserProfile> {
    let columns;

    try {
      const { result } = await this.gda.get({
        table: this.NAME_TABLE_STORAGE_USERS,
        key: accountId
      });
      columns = result;
    } catch (e) {
      throw new AccountIdAssociationLoadError(`Failed to retrieve userKey/login from accountId`, accountId, e);
    }
    if (!columns) {
      throw new AccountIdAssociationLoadError(
        `Empty response while retrieving userKey/login from accountId`,
        accountId
      );
    }
    const userInfo = await this.simple.checkUser({ key: columns[this.NAME_COLUMN_STORAGE_USERS].login });

    return userInfo.userProfile;
  }

  /**
   * Update the status of an user (active of inactive)
   * @param accountId Unique ID of the user account
   * @param newStatus The new status of the user account (active or inactive)
   */
  async updateStatus(accountId: string, newStatus: AccountStatus): Promise<void> {
    // Get the user account from his ID

    try {
      const login = await this.getLoginFromAccountId(accountId);

      await this.simple.setStatus({
        status: {
          active: newStatus === StandardAccountStatus.Active,
          data: newStatus
        },
        key: login
      });
    } catch (e) {
      throw new LegacyUpdateAccountStatus(
        `Failed to update the status of the user (accountId: ${accountId}).`,
        accountId,
        e
      );
    }
  }
  
  /**
   * Get the login of a user from his ID
   * @param accountId unique ID of a user
   */
  private async getLoginFromAccountId(accountId: string): Promise<string> {
    let columns;
    try {
      const { result } = await this.gda.get({
        table: this.NAME_TABLE_STORAGE_USERS,
        key: accountId
      });
      columns = result;
    } catch (e) {
      throw new AccountIdAssociationLoadError(`Failed to retrieve userKey/login from accountId`, accountId, e);
    }
    if (!columns) {
      throw new AccountIdAssociationLoadError(
        `Empty response while retrieving userKey/login from accountId`,
        accountId
      );
    }

    return columns[this.NAME_COLUMN_STORAGE_USERS].login;
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
      provide: UserRepositoryInjectable,
      useClass: MyUserStorage
    }
  ]
})
export default class Api {}
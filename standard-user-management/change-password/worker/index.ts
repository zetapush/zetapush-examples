import { Module, Injectable } from '@zetapush/core';
import { StandardUserManagementModule, StandardUserWorkflow, ConfirmationUrlHttpHandler } from '@zetapush/user-management';
import { Simple } from '@zetapush/platform-legacy';

@Injectable()
class PasswordManagement {

  constructor(private simple: Simple) {}

  async changePassword(login: string, password: string) {
    
    // We ask to reset the password, an unique token is returned
    const { token } = await this.simple.requestReset({
      key: login
    });

    // We change the password using the generated token
    return await this.simple.changePassword({
      token,
      password
    });
  }
}


@Module({
  imports: [StandardUserManagementModule],
  expose: {
    user: StandardUserWorkflow,
    http: ConfirmationUrlHttpHandler,
    password: PasswordManagement
  }
})
export default class Api {}


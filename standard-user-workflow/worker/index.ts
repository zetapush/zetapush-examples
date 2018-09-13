import { Module } from '@zetapush/core';
import { StandardUserManagementModule, StandardUserWorkflow, ConfirmationUrlHttpHandler } from '@zetapush/user-management';

@Module({
  imports: [StandardUserManagementModule],
  expose: {
    user: StandardUserWorkflow,
    http: ConfirmationUrlHttpHandler
  }
})
export default class Api {}
















































// @Module({
//   imports: [StandardUserManagementModule],
//   expose: {
//     user: StandardUserWorkflow,
//     http: ConfirmationUrlHttpHandler
//   },
//   provide: [{provide: EmailSenderInjectable, MySender}]
// })
// export default class Api {}

// class MySender implements MessageSender {

// }
// export class MyConfigurer extends DefaultStandardUserWorkflowConfigurer {
//   configure(env: Environment) {
//     const default = super.configure();
//     default.confirmation().email().sender(new MySender());
//   }
// }

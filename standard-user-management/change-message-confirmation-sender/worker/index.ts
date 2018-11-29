import { Module } from '@zetapush/core';
import {
  StandardUserManagementModule,
  StandardUserWorkflow,
  ConfirmationUrlHttpHandler,
  MessageSender,
  Message,
  SentMessage,
  MessageSenderInjectable
} from '@zetapush/user-management';

class MyMessageSenderImpl implements MessageSender { // <1>
  send(message: Message): Promise<SentMessage> {
    console.log(`Confirmation message : ${JSON.stringify(message)}`);
    return Promise.resolve({ message });
  }
}

@Module({
  imports: [StandardUserManagementModule],
  expose: {
    user: StandardUserWorkflow,
    http: ConfirmationUrlHttpHandler
  },
  providers: [
    { // <2>
      provide: MessageSenderInjectable,
      useClass: MyMessageSenderImpl
    }
  ]
})
export default class Api {}
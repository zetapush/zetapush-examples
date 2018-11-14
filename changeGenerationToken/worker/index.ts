import { Module } from '@zetapush/core';
import {
  StandardUserManagementModule,
  StandardUserWorkflow,
  ConfirmationUrlHttpHandler,
  TokenGenerator,
  Token,
  TokenGeneratorInjectable
} from '@zetapush/user-management';

class MyTokenGenerator implements TokenGenerator { // <1>
  generate(): Promise<Token> {
    return Promise.resolve({ value: new Date().getTime().toString() });
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
      provide: TokenGeneratorInjectable,
      useClass: MyTokenGenerator
    }
  ]
})
export default class Api {}
import { Module } from '@zetapush/core';
import {
  StandardUserManagementModule,
  StandardUserWorkflow,
  ConfirmationUrlHttpHandler,
  UuidGenerator,
  Uuid,
  UuidGeneratorInjectable
} from '@zetapush/user-management';

class MyUuidGenerator implements UuidGenerator { // <1>
  generate(): Promise<Uuid> {
    return Promise.resolve({
      value: Math.random()
        .toString(36)
        .substring(2)
    });
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
      provide: UuidGeneratorInjectable,
      useClass: MyUuidGenerator
    }
  ]
})
export default class Api {}
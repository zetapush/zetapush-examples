import { 
  StandardUserWorkflow,
  StandardUserManagementModule,
  ConfirmationUrlHttpHandler,
  AccountConfirmationTemplateVariables,
  RegistrationConfigurer,
  DefaultUserWorkflowConfigurer
 } from '@zetapush/user-management';
 import { Module } from '@zetapush/core';
 
 
 
 export class MyStandardUserWorkflowConfigurer extends DefaultUserWorkflowConfigurer {
 
  getHtmlTemplate(variables: AccountConfirmationTemplateVariables) {
    return `Bonjour,<br />
 <br />
 Pour activer votre compte, merci de bien vouloir cliquer sur le lien ci-dessous :<br />
 ${variables.confirmationUrl}<br />`;
  }
 
  getTextTemplate(variables: AccountConfirmationTemplateVariables) {
    return this.getHtmlTemplate(variables).replace(/<br \/>/g, '\r\n');
  }
 
  configureAccountRegistration(registrationConfigurer: RegistrationConfigurer) {
    // apply default configuration provided by ZetaPush
    super.configureAccountRegistration(registrationConfigurer);
    // override default configuration with your needs
    registrationConfigurer
      /**/ .confirmation()
      /*  */ .email()
      /*    */ .htmlTemplate()
      /*      */ .template((variables: AccountConfirmationTemplateVariables) => this.getHtmlTemplate(variables))
      /*      */ .and()
      /*    */ .textTemplate()
      /*      */ .template((variables: AccountConfirmationTemplateVariables) => this.getTextTemplate(variables))
  }
 }
 
 
 @Module({
  imports: [StandardUserManagementModule],
  expose: {
    user: StandardUserWorkflow,
    http: ConfirmationUrlHttpHandler
  },
  configurers: [MyStandardUserWorkflowConfigurer]
 })
 export default class Api {}            
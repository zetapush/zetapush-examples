import { Injectable, ConfigurationProperties, Inject } from '@zetapush/core';

@Injectable()
export default class {
  constructor(private properties: ConfigurationProperties) {}

  hello() {
    return `Hello World from Worker at ${Date.now()} by ${this.properties.get('user.firstname')} ${this.properties.get('user.lastname')}`;
  };
}



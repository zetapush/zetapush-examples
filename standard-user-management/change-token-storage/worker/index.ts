import { Module } from '@zetapush/core';
import {
  StandardUserManagementModule,
  StandardUserWorkflow,
  ConfirmationUrlHttpHandler,
  TokenRepository,
  Token,
  AssociatedValueToToken,
  StoredToken,
  TokenRepositoryInjectable,
  ExpirableToken
} from '@zetapush/user-management';

class MyTokenStorage implements TokenRepository { // <1>
  tokens: Array<StoredToken> = [];

  store(token: Token, associatedValue?: AssociatedValueToToken): Promise<Token> {
    this.tokens.push({
      token: {
        value: token instanceof ExpirableToken ? token.original.value : token.value
      },
      associatedValue
    });
    console.log('store', this.tokens);
    return Promise.resolve(token);
  }

  async getFromToken(token: Token): Promise<StoredToken> {
    let resultToken;
    this.tokens.forEach(elt => {
      if (token.value === elt.token.value) {
        console.log('getFromToken');
        resultToken = elt;
      }
    });
    if (resultToken) {
      return resultToken;
    } else {
      throw 'no token';
    }
  }
  async delete(token: Token): Promise<Token> {
    let storedToken;
    this.tokens.forEach((elt, index) => {
      if (token.value === elt.token.value) {
        storedToken = elt.token;
        this.tokens.splice(index, 1);
      }
    });

    if (storedToken) {
      return storedToken;
    } else {
      throw 'no token';
    }
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
      provide: TokenRepositoryInjectable,
      useClass: MyTokenStorage
    }
  ]
})
export default class Api {}
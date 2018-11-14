import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { WeakClient } from '@zetapush/client';

@Injectable()
export class ConnectionResolver implements Resolve<WeakClient> {
  private client: WeakClient;
  constructor() {
    this.client = new WeakClient({
      platformUrl: 'https://celtia.zetapush.com/zbo/pub/business/',
      appName: 'evr_8xSt',
    });
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.client.connect()
                      .then(() => this.client);
  }
  getClient() {
    return this.client;
  }
}

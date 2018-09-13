import { Injectable } from '@angular/core';
import { WeakClient } from '@zetapush/client';
import { Messaging } from '@zetapush/platform-legacy';

import { ConnectionResolver } from '../connection-resolver.service';
import { getSecureUrl } from '../utils';

@Injectable()
export class AvatarCacheService {
  private api: any;
  private client: WeakClient;
  private cache = new Map<string, Promise<string>>();
  constructor(connection: ConnectionResolver) {
    this.client = connection.getClient();
    this.api = this.client.createProxyTaskService({
      namespace: 'profile'
    });
    this.client.createService({
      Type: Messaging,
      listener: {
        onChangeAvatar: ({ data }) => this.onChangeAvatar(data.data)
      }
    });
  }
  getAvatar(userKey): Promise<string> {
    if (!this.cache.has(userKey)) {
      const placeholder = `https://dummyimage.com/80x80/3b5898/fff.png&text=${userKey}`;
      this.cache.set(
        userKey,
        this.api.getAvatarFile(userKey)
                .then((file) => file.entry ? file.entry.url.url : placeholder)
                .then((url) => getSecureUrl(url))
      );
    }
    return this.cache.get(userKey);
  }
  onChangeAvatar(avatar: { userKey, file }) {
    const url = getSecureUrl(avatar.file.entry.url.url);
    this.cache.set(avatar.userKey, Promise.resolve(url));
  }
}

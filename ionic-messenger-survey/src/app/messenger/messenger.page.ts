import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messaging } from '@zetapush/platform-legacy';

import { AvatarCacheService } from '../tabs/avatar-cache.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.page.html',
  styleUrls: ['./messenger.page.scss']
})
export class MessengerPage implements OnInit {
  message: string;
  messages: any[] = [];
  api: any;
  userKey: string;
  constructor(
    private cache: AvatarCacheService,
    route: ActivatedRoute
  ) {
    route.parent.data.subscribe(({ connection }) => {
      this.api = connection.createProxyTaskService({
        namespace: 'messenger'
      });
      this.userKey = connection.getUserId();
      connection.createService({
        Type: Messaging,
        listener: {
          onAddConversationMessage: ({ data }) => this.onAddConversationMessage(data.data.message)
        }
      });
    });
  }
  formatRawMessage(raw: any) {
    return {
      guid: raw.guid,
      timestamp: raw.ts,
      message: {
        ...raw.data,
      },
      view: {
        mine: raw.data.author === this.userKey,
        slot: raw.data.author === this.userKey ? 'end' : 'start',
        username: raw.data.author === this.userKey ? 'me' : this.userKey,
      }
    };
  }
  async ngOnInit() {
    // await this.api.$onApplicationBootstrap();
    const { content } = await this.api.getConversationMessageList();
    this.messages = content
      .map((item) => this.formatRawMessage(item))
      .reverse();
  }
  loadData(event) {
    console.log('loadData', event);
  }
  async onKeyPress(event) {
    if (event.isTrusted && event.key === 'Enter') {
      console.log('submit', this.message);
      await this.api.addConversationMessage(this.message);
      this.message = '';
    }
  }
  onAddConversationMessage(raw: any) {
    console.log('onAddConversationMessage', raw);
    this.messages = [
      ...this.messages,
      this.formatRawMessage(raw),
    ];
  }
  getAvatar(userKey: string) {
    return this.cache.getAvatar(userKey);
  }
}

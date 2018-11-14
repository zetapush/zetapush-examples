import { Context, Injectable } from '@zetapush/core';
import { GroupExistence, GroupInfo, Groups, Messaging, Stack } from '@zetapush/platform-legacy';

@Injectable()
export class MessengerApi {
  private group: GroupInfo | null = null;
  private requestContext!: Context;
  constructor(
    private messaging: Messaging,
    private db: Stack,
    private groups: Groups
  ) {}
  async onApplicationBootstrap() {
    console.log('MessengerApi::onApplicationBootstrap');
    await this.db.purge({
      stack: 'messenger'
    });
    const { exists }: GroupExistence = await this.groups.exists({
      group: 'messenger'
    });
    if (exists) {
      await this.groups.delGroup({
        group: 'messenger'
      });
    }
    await this.groups.createGroup({
      group: 'messenger'
    });
    this.group = await this.groups.groupUsers({
      group: 'messenger'
    });
    return this.group;
  }
  async addConversationMessage(text: string) {
    await this.groups.addUser({
      group: 'messenger',
      user: this.requestContext.owner
    });
    const message = await this.db.push({
      stack: 'messenger',
      data: {
        text,
        author: this.requestContext.owner
      }
    });
    this.notify(message);
  }
  async getConversationMessageList() {
    const { result } = await this.db.list({
      stack: 'messenger'
    });
    return result;
  }
  private async getGroup() {
    if (this.group == null) {
      this.group = await this.groups.groupUsers({
        group: 'messenger'
      });
    }
    return this.group;
  }
  private async notify(message: any) {
    const group = await this.getGroup();
    const target = `${Groups.DEFAULT_DEPLOYMENT_ID}:${group.owner}:${group.group}`;
    this.messaging.send({
      channel: 'onAddConversationMessage',
      target,
      data: { message }
    });
  }
}

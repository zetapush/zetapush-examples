import { Context, Injectable } from '@zetapush/core';
import { GroupExistence, GroupInfo, Groups, Messaging, Zpfs_hdfs } from '@zetapush/platform-legacy';

const HACK = <any>(Zpfs_hdfs);
HACK.DEPLOYMENT_OPTIONS = {
  upload_user_provides_filename: true,
  upload_thumbnails: '80'
};

@Injectable()
export class ProfileApi {
  private group: GroupInfo | null = null;
  private requestContext!: Context;
  constructor(
    private messaging: Messaging,
    private hdfs: Zpfs_hdfs,
    private groups: Groups
  ) {}
  async onApplicationBootstrap() {
    console.log('ProfileApi::onApplicationBootstrap');
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
  async getAvatarFile(userKey?: string) {
    const file = this.hdfs.stat({
      path: `/${userKey || this.requestContext.owner}`
    });
    return file;
  }
  async requestAvatarFileUpload(contentType: string) {
    const file = await this.getAvatarFile();
    if (file.entry) {
      await this.hdfs.rm({
        path: `/${this.requestContext.owner}`
      });
    }
    const request = await this.hdfs.newUploadUrl({
      contentType,
      path: `/${this.requestContext.owner}`
    });
    return request;
  }
  async confirmAvatarFileUpload(guid: string) {
    const request = await this.hdfs.newFile({
      guid
    });
    this.notify();
    return request;
  }
  private async getGroup() {
    if (this.group == null) {
      this.group = await this.groups.groupUsers({
        group: 'messenger'
      });
    }
    return this.group;
  }
  private async notify() {
    const group =  await this.getGroup();
    const file = await this.getAvatarFile();
    const target = `${Groups.DEFAULT_DEPLOYMENT_ID}:${group.owner}:${group.group}`;
    this.messaging.send({
      channel: 'onChangeAvatar',
      target,
      data: {
        userKey: this.requestContext.owner,
        file
      }
    }).catch(() => {});
  }
}

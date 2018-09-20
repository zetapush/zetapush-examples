import { Injectable } from '@zetapush/core';
import { Zpfs_hdfs } from '@zetapush/platform-legacy';

@Injectable()
export class Filesystem {
  constructor(private fs: Zpfs_hdfs) { }
  clean() {
    return this.fs.rm({
      path: '/'
    })
  }
  requestUpload({ contentType, path }: { contentType: string, path: string }) {
    return this.fs.newUploadUrl({
      contentType, path
    });
  }
  confirmUpload({ guid, metadata, tags }: { guid: string, metadata: any, tags: any[] }) {
    return this.fs.newFile({
      guid, metadata, tags
    });
  }
  list({ folder = '/' } = {}) {
    return this.fs.ls({
      folder
    });
  }
}

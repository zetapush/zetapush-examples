const { Inject, Zpfs_hdfs } = require('@zetapush/platform');

class Filesystem {
  static get parameters() {
    return [
      new Inject(Zpfs_hdfs)
    ];
  }
  constructor(fs) {
    this.fs = fs;
  }
  clean() {
    return this.fs.rm({
      path: '/'
    })
  }
  requestUpload({ contentType, path } = {}) {
    return this.fs.newUploadUrl({
      contentType, path
    });
  }
  confirmUpload({ guid, metadata, tags } = {}) {
    return this.fs.newFile({
      guid, metadata, tags
    });
  }
  list({ folder = '/', page } = {}) {
    return this.fs.ls({
      folder, page
    });
  }
}

module.exports = { Filesystem };

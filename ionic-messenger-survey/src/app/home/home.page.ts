import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { getSecureUrl } from '../utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  api: any = null;
  avatarUrl: string;
  constructor(private route: ActivatedRoute) {
    route.parent.data.subscribe(({ connection }) => {
      this.api = connection.createProxyTaskService({
        namespace: 'profile'
      });
    });
  }
  async ngOnInit() {
    const file = await this.api.getAvatarFile();
    if (file.entry) {
      this.avatarUrl = file.entry.url.url;
    }
    console.log('getAvatarFile', file);
  }
  async requestAvatarFileUpload() {
    const request = await this.api.requestAvatarFileUpload();
    console.log('requestAvatarFileUpload', request);
  }
  async onUserSelectFiles(files) {
    console.log('onUserSelectFiles', files);
    const [ file ] = files;
    if (file) {
      console.log('will', 'requestAvatarFileUpload', file);
      const transfer = await this.api.requestAvatarFileUpload(file.type);
      console.log('requestAvatarFileUpload', transfer);
      await this.upload({ transfer, file });
      console.log('upload', transfer);
      const confirm = await this.api.confirmAvatarFileUpload(transfer.guid);
      console.log('confirmAvatarFileUpload', confirm);
      if (confirm) {
        this.avatarUrl = confirm.url.url;
      }
    }
  }
  async upload(request: {transfer: any, file: any}) {
    return new Promise<any>((resolve, reject) => {
      const { httpMethod, url } = request.transfer;
      const payload = request.file;
      const xhr = new XMLHttpRequest();
      xhr.addEventListener(
        'readystatechange',
        (e) => {
          if (4 === xhr.readyState) {
            if (200 <= xhr.status && xhr.status < 300) {
              resolve(request);
            } else {
              reject(request);
            }
          }
        },
        false,
      );
      xhr.upload.addEventListener(
        'progress',
        (e: any) => {
          const done = e.position || e.loaded;
          const total = e.totalSize || e.total;
          const progression = Math.floor(done / total * 1000) / 10;
          console.log(
            'xhr.upload progress: ' +
              done +
              ' / ' +
              total +
              ' = ' +
              Math.floor(done / total * 1000) / 10 +
              '%',
          );
        },
        false,
      );
      xhr.open(httpMethod, getSecureUrl(url), true);
      xhr.setRequestHeader('Content-Type', payload.type);
      xhr.send(payload);
    });
  }
}

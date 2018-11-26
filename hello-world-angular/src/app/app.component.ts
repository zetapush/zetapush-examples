import { Component, OnInit } from '@angular/core';

import { WeakClient, ProxyService } from '@zetapush/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  client: WeakClient;
  api: ProxyService;

  async onClick() {
    console.log(await this.api.hello());
  }

  async ngOnInit() {
    this.client = new WeakClient({
      appName: 'y3kmm74lq',
      platformUrl: 'https://celtia.zetapush.com/zbo/pub/business'
    });
    this.api = this.client.createProxyTaskService();
    this.client.connect().then(() =>
      document.getElementById('main').classList.add('connected')
    );
  }
}

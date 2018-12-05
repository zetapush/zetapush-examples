import { Component, OnInit } from '@angular/core';

import { WeakClient, ProxyTaskService } from '@zetapush/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  client: WeakClient;
  api: ProxyTaskService;

  async onClick() {
    console.log(await this.api.hello());
  }

  async ngOnInit() {
    this.client = new WeakClient({
      appName: 'willBeInject'
    });
    this.api = this.client.createProxyTaskService();
    this.client.connect().then(() =>
      document.getElementById('main').classList.add('connected')
    );
  }
}

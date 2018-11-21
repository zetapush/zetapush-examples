import React, { Component } from 'react';
import reactLogo from './logo.svg';
import zetapushLogo from './logo.png';
import './App.css';

import { WeakClient } from '@zetapush/client';

class App extends Component {

  constructor(client, api) {
    super(client, api)

    client = new WeakClient({
      platformUrl: 'https://celtia.zetapush.com/zbo/pub/business',
      appName: '2s6dq7oo1'
    });
    api = client.createProxyTaskService();
    client.connect().then(() =>
      document.body.classList.add('connected')
    );
  }

  async onClick() {
    console.log(await this.api.hello());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={reactLogo} className="App-logo" alt="reactLogo" />
          <img src={zetapushLogo} className="App-logo" alt="zetapushLogo" />
          <h1>Welcome to ZetaPush with React</h1>

          <h2>To get started, edit worker/index.ts and save to reload.</h2>
          <nav>
            <button class="js-Hello" onClick={this.onClick}>call hello()</button>
          </nav>

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

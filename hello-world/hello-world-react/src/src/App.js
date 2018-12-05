import React, { Component } from 'react';
import reactLogo from './logo.svg';
import zetapushLogo from './logo.png';
import './App.css';

import { WeakClient } from '@zetapush/client';

class App extends Component {

  constructor() {
    super()
    this.onClick = this.onClick.bind(this);

    this.client = new WeakClient();
    this.api = this.client.createProxyTaskService();
    this.client.connect().then(() => {
      document.getElementById('main').classList.add('connected')
    });
  }

  async onClick() {
    console.log(await this.api.hello());
  }

  render() {
    return (
      <div id="main">
        <header>
          <img className="ui-Logo" src={zetapushLogo} alt="zetapushLogo"/>
          <img className="App-logo" src={reactLogo} alt="reactLogo"/>
          <h1>Welcome to ZetaPush with React</h1>
        </header>
        <main>
          <h2>To get started, edit worker/index.ts and save to reload.</h2>
          <nav>
          <button className="js-Hello" onClick={this.onClick}>call hello()</button>
          </nav>
        </main>
      </div>
    );
  }
}

export default App;
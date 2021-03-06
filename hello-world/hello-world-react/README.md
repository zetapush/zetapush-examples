# ZetaPush Celtia Example

## Katacoda

You don't want to install anything ? Try it on [Katacoda](https://katacoda.com/zetapush/scenarios/hello-world-react) !

## Installation

```console
npm install
cd src && npm install
```

## React build

```console
npm run build
```

## Deployment

Push your code on ZetaPush platform

```console
npm run deploy -- --front src/build
```

## Development

Run your code on your local platform

```console
npm run start -- --front src/build
```

## Project structure

```console
.
└──
  ├── src (react application)
  │  ├── src
  │  ├── public
  │  ├── package.json
  ├── worker
  │  └── index.ts (api implementation)
  └── package.json
```

## How it works?

> Server side

Your server api in a plain old class defining your interface.

Example:

```js
export default class Api {
  hello() {
    return `Hello World from Worker ${Date.now()}`;
  }
}
```

This code expose an API called **hello** which returns a string "Hello World from Worker" concatened with server timestamp.

You can use injected platform services with to following.

> Dependency injection use [injection-js](https://github.com/mgechev/injection-js)

```js
const { Injectable } = require('@zetapush/core');
const { Stack } = require('@zetapush/platform-legacy');

export default class Api {
  constructor(private stack: Stack) {}
  push(item) {
    return this.stack.push({ stack: 'list', data: item });
  }
  list() {
    return this.stack.push({ stack: 'list' });
  }
}
```

To consume an API in your front-end application you have to create a **mapped** method.

> Client side

#### Register your API mapping class

```js
const api = client.createProxyTaskService();
```

#### Invoke your remote API method

```js
const message = await api.hello();
```

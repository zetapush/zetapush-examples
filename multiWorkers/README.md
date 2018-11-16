# ZetaPush Celtia Example

## Introduction

Before launch any command, you need to configure your workers and fronts in the `package.json` file like this :

```
"workers": {
      "myWorker1": "./worker1",
      "myWorker2": "./worker2"
  },
  "fronts": {
      "myFront1": "./front1",
      "myFront2": "./front2"
  }
```

**NB :** Each `package.json` in worker need to have scripts to be launched on the ZetaPush platform.

```
"scripts": {
    "deploy": "zeta push",
    "start": "zeta run",
    "troubleshoot": "zeta troubleshoot"
}
```

### Specify _deploymentId_

When you specify a specific worker with `--worker` or `--workers` commands, in the front part, you need to specify the deploymentId of the target worker like this :

```
const api = client.createProxyTaskService({
deploymentId: "myWorker2"
});
```

## One worker and one front

**Launch 2 workers and expose 2 fronts locally :**

```
$ npm run start -- --serve-front --worker myWorker2 --front myFront2
```

**Push 2 workers and 2 fronts to ZetaPush platform :**

```
$ npm run deploy -- --worker myWorker2 --front myFront2
```

## Many workers and fronts

**Launch 2 workers and expose 2 fronts locally :**

```
$ npm run start -- --serve-front --workers myWorker1,myWorker2 --fronts myFront1,myFront2
```

**Push 2 workers and 2 fronts to ZetaPush platform :**

```
$ npm run deploy -- --workers myWorker1,myWorker2 --fronts myFront1,myFront2
```

## Default worker and default front

In this case we use the defaults worker and front (In folders _worker/_ and _front/_).

**Default worker and default front locally :**

```
$ npm run start -- --serve-front
```

**Push default worker and default front to ZetaPush platform :**

```
$ npm run deploy
```

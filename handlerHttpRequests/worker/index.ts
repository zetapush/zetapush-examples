import { Injectable, Inject, ZetaPushContext } from '@zetapush/core';
const express = require('express');

@Injectable()
export default class {

 constructor() {}

 onApplicationBootstrap() {
   var app = express();

   // process.env.HTTP_PORT used when the application is deployed
   // Use port 3001 beacuse by default the port 3000 is used when a front is running locally
   const port = process.env.HTTP_PORT || 3001;

   app.get('/', function(req: any, res: any) {
     res.send(`Hello World from port ${port}`);
   });

   app.listen(port, () => {
     console.log(`Example app listening on port ${port}!`)
    });
 }
}
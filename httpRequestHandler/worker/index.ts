import { Injectable } from '@zetapush/core';
import express, { Request, Response } from 'express';
import cors from 'cors';

@Injectable()
export default class {
  onApplicationBootstrap() {
    
    // Create express instance
    const app = express()

    // Enable cors
    app.use(cors())

    // Handle http GET request at the root of the URL
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello world');
    });

    // The express instance listen on the default port
    app.listen(process.env.HTTP_PORT || 5000, () => {
      console.log(`App listening on port ${process.env.HTTP_PORT || 5000}!`)
    });
  }
}

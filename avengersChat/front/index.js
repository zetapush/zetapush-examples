import AvengersController from './utils/controller.js';
import dom from './utils/dom.js';

// Create the ZetaPush Client
const client = new ZetaPush.WeakClient({
  platformUrl: 'http://hq.zpush.io:9080/zbo/pub/business',
  appName: 'YjWMNzzF',
});
/**
 * Create service to listen incoming messages
 */
const service = client.createService({
  Type: ZetaPushPlatform.Messaging,
  listener: {
    avengersChannel: ({ data }) => controller.onAvengersMessage(data),
  },
});

const controller = new AvengersController(client, dom);

(async function main() {
  // Expose to template
  window.$controller = controller;
  // Connect to ZetaPush
  await client.connect();
  // Notify client connected
  controller.onConnectionEstablished();
})();
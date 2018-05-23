// Create new ZetaPush Client
const client = new ZetaPush.WeakClient({
    sandboxId: "<appname>",
});

const api = client.createProxyTaskService();

client.connect().then(() => (
    console.debug('onConnectionEstablished'),
    [...document.querySelectorAll('button')].forEach((node) =>
        node.removeAttribute('disabled'),
    )
));

const trace = async (section, behavior) => {
    const begin = Date.now();
    let output = null;
    let method = 'debug';
    try {
        output = await behavior();
    } catch (error) {
        output = error;
        method = 'error';
    }
    const end = Date.now();
    const duration = end - begin;
    console[method]({ section, begin, end, duration, output });
    return output;
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.js-Hello').addEventListener('click', (event) => {

        trace(`hello--`, () => api.hello());
    });
});
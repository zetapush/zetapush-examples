/**
 * Get the name of the current application
 */
const getApplicationName = () => {
    const PATTERN = /^#\/sandbox\/(.+)/;
    const [hash, sandboxId] = PATTERN.exec(location.hash) || [];
    if (sandboxId) {
        return sandboxId;
    } else {
        location.href = `#/sandbox/${prompt('Application name')}`;
        location.reload();
    }
}

/**
 * Define connection properties of client
 */
const getWeakClientOptions = () => {
    const { zpSandboxid, zpPlatformUrl } = document.documentElement.dataset;
    return {
        apiUrl: zpPlatformUrl || 'http://hq.zpush.io:9080/zbo/pub/business',
        sandboxId: zpSandboxid || getApplicationName()
    }
}


/// Create new ZetaPush Client
const client = new ZetaPush.WeakClient(getWeakClientOptions());

const api = client.createProxyTaskService();

client.connect().then(() => (
    console.debug('onConnectionEstablished'),
    [...document.querySelectorAll('button')].forEach((node) =>
        node.removeAttribute('disabled'),
    )
));

async function hello() {
    const output = await api.hello();

    const ul = document.querySelector('ul');
    const fragment = document.createDocumentFragment();
    const li = document.createElement('li');
    li.textContent = output;
    fragment.appendChild(li);
    ul.appendChild(fragment);
}
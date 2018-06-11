const getAppName = () => {
  const PATTERN = /^#\/sandbox\/(.+)/;
  const [hash, appName] = PATTERN.exec(location.hash) || [];
  if (appName) {
    return appName;
  } else {
    location.href = `#/sandbox/${prompt('sandbox')}`;
    location.reload();
  }
};

// Create new ZetaPush Client
const client = new ZetaPush.WeakClient({
  appName: document.documentElement.dataset.zpSandboxid || getAppName(),
  platformUrl: 'http://hq.zpush.io:9080/zbo/pub/business',
});

const api = client.createProxyTaskService();

const upload = ({ file, guid, httpMethod, url }) => {
  return fetch(url, {
    method: httpMethod,
    headers: new Headers({
      'Content-Type': file.type
    }),
    body: file,
    credentials: 'include'
  })
  .then(() => ({
    file, guid
  }));
}

client
  .connect()
  .then(
    () => (
      console.debug('onConnectionEstablished'),
      [...document.querySelectorAll('button')].forEach((node) =>
        node.removeAttribute('disabled'),
      )
    ),
  );

const uuid = ((id = 0) => () => ++id)();

const on = (cssClass, eventType, handler) =>
  document.querySelector(cssClass).addEventListener(eventType, handler);

const trace = async (section, behavior) => {
  const begin = Date.now();
  let output = null;
  let method = 'log';
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
  on('.js-Clean', 'click', async (event) => {
    await trace(`cleanFilesystem--${uuid()}`, () => api.clean());
    document.querySelector('.js-List').click();
  });
  on('.js-List', 'click', async (event) => {
    const { entries } = await trace(`listFilesystem--${uuid()}`, () => api.list());
    const ul = document.querySelector('ul');
    while (ul.firstChild) { ul.removeChild(ul.firstChild); }
    ul.appendChild(entries.content.reduce((fragment, file) =>{
      const image = document.createElement('img');
      image.src = file.url.url;
      image.alt = file.name;
      image.height = 100;
      fragment.appendChild(image);
      return fragment;
    }, document.createDocumentFragment()))
  });
  on('input[type="file"]', 'input', async (event) => {
    const files = Array.from(event.target.files);
    const id = uuid();
    const requests = await trace(`requestUpload--${id}`, () =>
      Promise.all(
        files.map((file) =>
          api.requestUpload({
            contentType: file.type,
            path: '/',
          }),
        ),
      ),
    );
    const uploads = await trace(`doUpload--${id}`, () =>
      Promise.all(
        requests.map((response, index) =>
        upload({
            ...response,
            file: files[index],
          }),
        ),
      ),
    );
    await trace(`confirmUpload--${id}`, () =>
    Promise.all(
      uploads.map((upload) =>
        api.confirmUpload(upload),
      ),
    ));
    document.querySelector('.js-List').click();
  });
});

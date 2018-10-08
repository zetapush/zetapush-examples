const client = new ZetaPushClient.WeakClient();
const api = client.createProxyTaskService();

client.connect().then(() =>
  document.body.classList.add('connected')
);
document.querySelector('.js-Hello').addEventListener('click', async () => {
  fetch('http://localhost:5000').then(async (res) => {
    console.log(await res.text());
  });
});

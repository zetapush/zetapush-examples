const client = new ZetaPushClient.WeakClient();
const api = client.createProxyTaskService({
    deploymentId: "myWorker1"
});
client.connect().then(() => document.body.classList.add("connected"));
document.querySelector(".js-Hello").addEventListener("click", async () => {
    console.log(await api.helloWorker1());
});

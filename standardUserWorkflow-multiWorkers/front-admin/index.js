const client = new ZetaPushClient.WeakClient();
const api = client.createProxyTaskService({
  deploymentId: "worker-admin"
});

client.connect().then(() => document.body.classList.add("connected"));
document.querySelector(".js-Admin").addEventListener("click", async () => {
  console.log(await api.adminAction());
});

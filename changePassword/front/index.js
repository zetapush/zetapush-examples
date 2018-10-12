// Client that can be connected as Anonymous or Authenticated user (if we set credentials)
const client = new ZetaPushClient.SmartClient();

// Create API about class exposed in worker
const apiUser = client.createProxyTaskService({
  namespace: 'user'
});
const apiPassword = client.createProxyTaskService({
  namespace: 'password'
});


client.connect().then(() =>
document.body.classList.add('connected')
);

// Connection as anonymous user and create an account
document.querySelector('.js-SignUp').addEventListener('click', async () => {
  const password = document.getElementById('password').value
  await client.connect();
  
  try {
    await apiUser.signup(
      {
        credentials: {
          login: 'user',
          password
        },
        profile: {
          email: 'user@yopmail.com'
        }
      }
      );
      console.log('Account created, confirmation link sent to user@yopmail.com');
    } catch (e) {
      console.error('Failed to create account : ', e);
    }
  });
  
  // Test your connection with the used password
  document.querySelector('.js-Connect').addEventListener('click', async () => {
    const password = document.getElementById('password').value;
    await client.setCredentials({ login: 'user', password });
    client
    .connect()
    .then(() => {
      console.log('Connected');
    })
    .catch((e) => {
      console.error('Connection failed');
    });
  });
  
  // Ask to change the password
  document.querySelector('.js-ChangePassword').addEventListener('click', async () => {
  const password = document.getElementById('currentPassword').value;
   const newPassword = document.getElementById('newPassword').value;
  await client.setCredentials({ login: 'user', password });
  await client.connect();
  apiPassword.changePassword('user', newPassword).then((res) => {
    console.log('Password changed : ', res);
  }).catch((err) => {
    console.error('Failed to change password : ', err);
  });
});

// Execute a disconnection
document.querySelector('.js-Disconnect').addEventListener('click', async () => {
  await client.disconnect();
  console.log('Disconnected');
});

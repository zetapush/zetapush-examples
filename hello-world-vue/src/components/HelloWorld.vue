<template>
  <div id="main">
    <header>
      <img class="ui-Logo" src="@/assets/vueLogo.png">
      <img class="ui-Logo" src="@/assets/zetapushLogo.png">
      <h1>Welcome to ZetaPush with Vue.js</h1>
    </header>
    <main>
      <h2>To get started, edit worker/index.ts and save to reload.</h2>
      <nav>
        <button :click="onClick">call hello()</button>
      </nav>
    </main>
    <button :click="onClick">call hello()</button>
  </div>
</template>

<script>

  // import { WeakClient } from '@zetapush/client';

  // const client = new WeakClient({
  //   platformUrl: 'https://celtia.zetapush.com/zbo/pub/business',
  //   appName: 'a9i002ef',
  // });
  // const api = client.createProxyTaskService();

  // client.connect().then(() => {
  //   console.log('mdr');
  //   document.getElementById('main').classList.add('connected')
  // });

  // var mdr = 'lol';

  export default {
    name: 'HelloWorld',
    data: () => {
      return {
        mdr: 'lol'
      };
    },
    methods: {
      onClick: async function() {
        console.log(await api.hello());
      }
    },
    created: function () {
      console.log(this.mdr);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
header {
  background-color: #222;
  height: 15rem;
  padding: 2rem;
  color: white;
  text-align: center;
  flex-direction: column;
}
img {
  margin: auto;
  max-height: 75%;
}
h1, h2 {
  font-weight: normal;
  text-align: center;
}
h1 {
  font-size: 1.5rem;
  padding: 1.5rem 0;
}
h2 {
  font-size: 1.25rem;
  padding: 1.25rem 0;
}
main, nav {
  display: flex;
  flex-direction: column;
}
main {
  padding: 1rem;
}
button, label {
  margin: 0.5rem 1rem;
  height: 3rem;
  font-size: calc(3rem/2);
  background: linear-gradient(rgb(216, 216, 216), rgb(186, 186, 186));
  border-color: rgb(117, 117, 117) rgb(107, 107, 107) rgb(97, 97, 97);
  border-style: solid;
  border-width: 1px;
  padding: 1px 7px 2px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  align-items: flex-start;
}
</style>

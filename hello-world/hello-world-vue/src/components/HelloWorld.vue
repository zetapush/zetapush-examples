<template>
  <div id="main">
    <header>
      <img class="ui-Logo" src="@/assets/zetapushLogo.png">
      <img class="ui-Logo" src="@/assets/vueLogo.png">
      <h1>Welcome to ZetaPush with Vue.js</h1>
    </header>
    <main>
      <h2>To get started, edit worker/index.ts and save to reload.</h2>
      <nav>
        <button v-on:click="onClick()">call hello()</button>
      </nav>
    </main>
  </div>
</template>

<script>
import { WeakClient } from '@zetapush/client';

export default {
  name: 'HelloWorld',
  methods: {
    onClick: async function() {
      console.log(await this.api.hello());
    }
  },
  created: function () {
    this.client = new WeakClient();
    this.api = this.client.createProxyTaskService();

    this.client.connect().then(() => {
      document.getElementById('main').classList.add('connected')
    });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background-color: #222;
  height: 15rem;
  padding: 2rem;
  color: white;
  text-align: center;
  flex-direction: column;
}
img {
  padding: 0 40px;
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
#main {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  height: 100%;
}
#main::before {
  display: block;
  content: "Open Your Console";
  background: #000;
  color: #FFF;
  position: fixed;
  transform: rotate(45deg) translate(60px, 0px);
  right: 0;
  top: 0;
  height: 2rem;
  padding: 5px 30px;
  line-height: 25px;
  font-family: Calibri, Helvetica, Arial;
  font-weight: bold;
  text-align: center;
}
#main:not(.connected) * {
  opacity: 0.85;
  pointer-events: none;
  cursor: not-allowed;
  color: graytext;
}
#main.connected .ui-Logo {
  animation: zoom 2s infinite;
}
</style>

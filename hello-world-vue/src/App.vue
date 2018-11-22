<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
html {
  box-sizing: border-box;
  height: 100%;
}
*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  height: 100%;
}
body::before {
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
body:not(.connected) * {
  opacity: 0.85;
  pointer-events: none;
  cursor: not-allowed;
  color: graytext;
}
body.connected .ui-Logo {
  animation: zoom 2s infinite;
}
@keyframes zoom {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>

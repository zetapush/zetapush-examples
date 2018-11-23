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
*, *::before, *::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}
@keyframes zoom {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>

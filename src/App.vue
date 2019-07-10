<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 @import "style/normally.css";
 #app {
    width: 100%;
    height: 100%;
  }
  html,body{
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: white;
  }
</style>

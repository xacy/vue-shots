<template>
  <div id="app">
    <!--<img src="./assets/iconovaso_hdpi.png">-->
    <img srcset="./assets/iconovaso_ldpi.png 320w,
             ./assets/iconovaso_ldpi.png 480w,
             ./assets/iconovaso_hdpi.png 800w"
         sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
         src="./assets/iconovaso_hdpi.png" alt="Shot glass" @click="mixShots">
    <h1>{{ shots[0] }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
  import Shots from './ShotsJson';

  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        shots: Shots
      }
    },
    methods: {
      mixShots() {
        var rand = Math.floor((Math.random() * this.shots.length) + 1);
        alert("prueba:" + this.shots[rand].drink);
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 5em;
  }

  img {
    cursor: pointer;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

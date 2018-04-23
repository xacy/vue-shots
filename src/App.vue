<template>
  <div id="app">
    <app-drawer :favourites="favourites">
    <switches v-model="hardcore" theme="bulma" color="red" type-bold="true" id="selector" style="z-index: 98"></switches>

    <div class="image">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 100 100"
          xml:space="preserve" x="0px" y="0px" viewBox="0 0 41 60" style="z-index:98" id="shotSVG" ref="svg" @click="animateShot()">
          <rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
          <g class="currentLayer" style="">
            <title>Shot glass</title>
            <path d="M1.8970001182556153,-1.525878801089675e-8 c-1.218,0 -1.8970000000000002,0.5800000000000002
             -1.8970000000000002,1.633 l4.989,55.158 c0.07300000000000002,0.502 0.3060000000000001,0.8810000000000002
             0.7520000000000002,1.029 c1.862,0.6190000000000002 7.51,1.812 14.461,1.812 c6.952,0 12.599,-1.193 14.462,-1.812
             c0.4430000000000001,-0.14800000000000005 0.6780000000000004,-0.527 0.7520000000000002,-1.029 l4.9879999999999995,
             -55.158 c0,-1.053 -0.6800000000000004,-1.633 -1.8970000000000002,-1.633 H1.8970001182556153
             zM37.91200011825562,1.813999984741212 c0.4280000000000001,0 0.7350000000000002,0.3560000000000001
             0.7540000000000002,0.6670000000000003 L35.075000118255616,38.95599998474121 c-0.6120000000000002,3.652
             -5.6400000000000015,7.145 -14.873,7.145 s-14.261,-3.492 -14.873,-7.145 l-3.593,-36.476 c0.021000000000000008,
             -0.3110000000000001 0.3280000000000001,-0.6670000000000003 0.7560000000000002,-0.6670000000000003 H37.91200011825562 z"
                id="glass" fill="#B1E5F2" class=""/>
            <path fill="#eb1aeb" id="liquid"
                  d="M67.8187,30.54539L64.89431,62.92805C59.33451,68.70527 44.3676,71.0658 34.69713,62.97529L31.4874,30.49637C43.99309,30.59176
                  55.31301,30.45 67.8187,30.54539z" opacity="0" fill-opacity="0" z-index="-99"/>
          </g>
      </svg>
      <div class="shape" ref="shape" >
        <div class="inner" ref="inner">
          <div class="fill" ref="fill" >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
                <path class="waveShape" ref="wave" d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
                    c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
                    c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    </app-drawer>
    <app-shot :shot="shot"></app-shot>
  </div>
</template>

<script>
  //en shotsvg puedes cambiar el color del vaso con fill: red
  import Drinks from './DrinksJson';
  import Switches from 'vue-switches';
  import Drawer from './components/Drawer';
  import Shot from './components/Shot';
  import { eventBus } from './main.js';

  export default {
    name: 'app',
    data() {
      return {
        options: [{value: 1, description: 'Suave'}, {value: 2, description: 'Medio'}, {value: 3, description: 'Fuerte'}],
        hardcore: false,
        selected: 2,
        colors: ['#5dca31','#EE1A59'],
        shot: {drink1: '',drink2: '',drink3:''},
        favourites: [{name: 'Tantrum', type: 1, drink1: 'Absenta', drink2: 'Vodka', drink3: 'Lima'}],
        drinks: Drinks,
        softDrinks: [],
        mediumDrinks: [],
        hardDrinks: [],
        nonAlcoholicDrinks: [],
        lastX: null,
        lastY: null,
        lastZ: null,
        threshold: 10,
        moveCounter: 0,
        burmaColors: ['#ffd1da','#ff6b89']
      }
    },
    components:{
      Switches,
      'app-drawer':Drawer,
      'app-shot': Shot
    },
    methods: {
      shakingDevice(event){
        var current =event.accelerationIncludingGravity;

        if(current.x >= 1 && current.y>= 1 && current.z>=1) {
          if(this.lastX===null ){
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
          }

          var deltaX = Math.abs(this.lastX - current.x);
          var deltaY = Math.abs(this.lastY - current.y);
          var deltaZ = Math.abs(this.lastZ - current.z);

          if (deltaX + deltaY + deltaZ > 3) {
            this.moveCounter++;
          } else {
            this.moveCounter = Math.max(0, --this.moveCounter);
          }

          if (this.moveCounter > this.threshold) {
            this.moveCounter = 0;
            this.animateShot();
          }

          this.lastX = current.x;
          this.lastY = current.y;
          this.lastZ = current.z;
        }
      },
      animateShot(){

        var svg = this.$refs.svg;
        var fill = this.$refs.fill;
        var shape = this.$refs.shape;
        var inner = this.$refs.inner;
        var wave = this.$refs.wave;

        var left=svg.getBoundingClientRect().left;
        var top=svg.getBoundingClientRect().top;
        var width=svg.getBoundingClientRect().width;
        var height=svg.getBoundingClientRect().height;

        if (window.innerHeight > window.innerWidth) {
          shape.style.setProperty('top',height*0.79+'px');
          fill.style.setProperty('top' ,height*0.79+'px');
          inner.style.setProperty('top',height*0.3+'px');
          shape.style.setProperty('height',height*0.5+'px');
          wave.style.setProperty('opacity',1);
        }
        else{
          shape.style.setProperty('top',height*0.4+'px');
          fill.style.setProperty('top' ,height*0.5+'px');
          inner.style.setProperty('top',height*0.5+'px');
          shape.style.setProperty('height',height*0.5+'px');
          wave.style.setProperty('opacity',1);
        }


        shape.style.setProperty('fill',this.hardcore?this.colors[0]:this.colors[1]);
        wave.style.setProperty('fill',this.hardcore?this.colors[0]:this.colors[1]);
        shape.style.setProperty('animation-name','waveAction');
        wave.style.setProperty('animation-name','waveAction');
        fill.style.setProperty('animation-name' ,'fillAction');
        inner.style.setProperty('animation-name','fillAction');
        this.mixShots();
        setTimeout(function(){
          fill.style.setProperty('animation-name' ,'');
          inner.style.setProperty('animation-name','');
        },2000);
      },
      mixShots() {
        var softDrink = this.softDrinks[Math.floor(Math.random() * this.softDrinks.length)];
        var mediumDrink = this.mediumDrinks[Math.floor(Math.random() * this.mediumDrinks.length)];
        var nonAlcoholicDrink = this.nonAlcoholicDrinks[Math.floor(Math.random() * this.nonAlcoholicDrinks.length)];

        this.shot = {drink1: softDrink.drink,
          drink2: mediumDrink.drink,
          drink3: nonAlcoholicDrink.drink, type: this.hardcore?1:0};

        this.drinks.find(drink => drink.id == softDrink.id).times += 1;
        this.drinks.find(drink => drink.id == mediumDrink.id).times += 1;
        this.drinks.find(drink => drink.id == nonAlcoholicDrink.id).times += 1;

        localStorage.setItem('drinkList', JSON.stringify(this.drinks));
      },
      localStorageOperations(){
        if (localStorage.getItem("drinkList") === null) {
          console.log('setting' + this.drinks[0].drink);
          localStorage.setItem('drinkList', JSON.stringify(this.drinks));
        }
        else {
          console.log("already set");
          this.drinks = JSON.parse(localStorage.getItem('drinkList'));
        }
        if (localStorage.getItem("favouriteShots") === null) {
          localStorage.setItem('favouriteShots', JSON.stringify(this.favourites));
        }
        else {
          console.log("already set");
          this.favourites = JSON.parse(localStorage.getItem('favouriteShots'));
        }
      }
    },
    watch:{
      selected: function(previousValue, newValue){
        console.log("options: "+previousValue+" - "+newValue);
      }
    },
    created() {
      console.log('before created');

      this.localStorageOperations();

      this.softDrinks = this.drinks.filter(drink => drink.type == 1);
      this.mediumDrinks = this.drinks.filter(drink => drink.type == 2);
      this.hardDrinks = this.drinks.filter(drink => drink.type == 3);
      this.nonAlcoholicDrinks = this.drinks.filter(drink => drink.type == 4);

      window.addEventListener('devicemotion', this.shakingDevice);
      //window.addEventListener('MozOrientation', this.shakingDevice);
      //window.addEventListener('deviceorientation', this.shakingDevice);
      this.shot="";
      eventBus.$on('favouriteWasClicked',(data) => {
        this.hardcore=data.type==1?true:false;
        this.animateShot();
        this.shot=data;
      });
      eventBus.$on('addingFavourite',(data) => {
        this.favourites.push(data);
        localStorage.setItem('favouriteShots', JSON.stringify(this.favourites));
      });
      eventBus.$on('deletingFavourite',(data) => {
        var index = this.favourites.indexOf(data);
        if (index > -1) {
          this.favourites.splice(index, 1);
        }
        localStorage.setItem('favouriteShots', JSON.stringify(this.favourites));
      });
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    height:100vh !important;
    max-height:100vh !important;
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

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .vue-switcher-theme--bulma.vue-switcher-color--red div{
    background-color: #31c97850 !important;
  }

  .vue-switcher-theme--bulma.vue-switcher-color--red div:after{
    background-color:#5dca31 !important;
  }
  .vue-switcher-theme--bulma.vue-switcher-color--red.vue-switcher--unchecked div{
    background-color:#ffd1da !important;
  }
  .vue-switcher-theme--bulma.vue-switcher-color--red.vue-switcher--unchecked div:after{
    background-color:#ff6b89 !important;
  }


  /*MODAL STYLES*/
  .modal-content input{
    width: 100%;
    height: 2em;
    font-size: large;
  }
  .button-container{
    position:absolute;
    bottom:1em;
    width:90%;
  }
  .modal-content button{
    border: 0;
    background: none;
    box-shadow: none;
    border-radius: 0px;
  }
  .modal-content button {
    position: relative;
    vertical-align: bottom;
    width: 100%;
    height: 60px;
    padding: 0;
    font-size: 22px;
    color:#454545;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    background: #ecf0f1;
    border: 0;
    border-bottom: 2px solid #dadedf;
    cursor: pointer;
    -webkit-box-shadow: inset 0 -2px #dadedf;
    box-shadow: inset 0 -2px #dadedf;
  }
  .modal-content button:active {
    top: 1px;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  /* Common Shot position */
  #selector {
    position: absolute;
    font-size: 1.7em;
    transform: scaleX(2) scaleY(2);
  }
  .image{
    position:relative;
  }
  #shotSVG{
    cursor: pointer;
  }
  .shape{
    overflow: hidden;
    position: absolute;
    border-bottom-left-radius: 70%;
    border-bottom-right-radius: 50%;
    z-index:-1;
  }

  .inner{
    overflow: hidden;
    width: 250%;
    z-index:-1;
  }
  .fill {
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: cubic-bezier(.2, .6, .8, .4);
    -webkit-animation-duration: 2s;
    -webkit-animation-fill-mode: forwards;
  }

  .shape .fill {
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: cubic-bezier(0.2, 0.6, 0.8, 0.4);
    -webkit-animation-duration: 2s;
    -webkit-animation-fill-mode: forwards;
  }
  .shape .waveShape {
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -webkit-animation-duration: 0.5s;
    width: 600px;
    height: 150px;
    fill: #039be4;
    opacity:0;
  }

  @keyframes waveAction {
    0% {
      -webkit-transform: translate(-150px, 0);
    }
    100% {
      -webkit-transform: translate(0, 0);
    }
  }

  @media screen and (orientation:portrait) {
    /* Portrait styles here */
    #app{
      height:100%;
      max-height:100%;
    }
    #selector {
      top: 8.2em;
      right: 0;
      transform: scaleX(4) scaleY(4);
    }
    #shotSVG{
      position: relative;
      top:25vh;
      left: 5em;
      width:75%;
    }
    .shape{
      width:58.8%;
      height:25vh;
      left:28%;
    }
    @keyframes fillAction {
      0% {
        -webkit-transform: translate(0, 350px);
      }
      100% {
        -webkit-transform: translate(0, 50px);
      }
    }
  }
  /* Landscape */

  @media screen and (orientation:landscape){
    /* Landscape styles here */
    #selector {
      top: 4.2em;
      right: 4em;
    }
    #shotSVG{
      left:10%;
      width:25%;
    }
    .shape{
      width:20.2%;
      height:20%;
      height:20%;
      left:39.6%;
      top:30%;
    }
    @keyframes fillAction {
      0% {
        -webkit-transform: translate(0, 150px);
      }
      100% {
        -webkit-transform: translate(0, 10px);
      }
    }
  }

  @media screen and (min-height:600px) and (orientation:landscape){
    #app{
      padding-top: 5em;
    }
  }
  @media screen and (max-height:600px) and (orientation:landscape){
    #app{
      padding-top: 1em;
    }
  }

</style>

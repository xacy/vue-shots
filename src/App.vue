<template>
  <div id="app">
    <!--<img src="./assets/iconovaso_hdpi.png">-->
    <select v-model="selected" id="selector">
      <option v-for="option in options" :value="option.value">{{option.description}}</option>
    </select>
    <div class="imageContainer">
      <img srcset="./assets/iconovaso_ldpi.png 320w,
             ./assets/iconovaso_ldpi.png 480w,
             ./assets/iconovaso_hdpi.png 800w"
           sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
           src="./assets/iconovaso_hdpi.png" alt="Shot glass" @click="mixShots">

    </div>
    <svg id="trapezoid" viewbox="0 0 100 100" preserveAspectRatio="none" width="20%">
      <path d="M0,0
           L100,20
           L100,80
           L0,100z" fill="green"></path>
    </svg>
    <h1>{{ shot }}</h1>
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
  import Drinks from './DrinksJson';

  export default {
    name: 'app',
    data() {
      return {
        options: [{value: 1,description: 'Suave'},{value: 2,description: 'Medio'},{value: 1,description: 'Fuerte'}],
        selected: 1,
        shot: '',
        drinks: Drinks,
        softDrinks: [],
        mediumDrinks: [],
        hardDrinks: [],
        nonAlcoholicDrinks: []
      }
    },
    methods: {
      mixShots() {
        var softDrink=this.softDrinks[Math.floor(Math.random()*this.softDrinks.length)];
        var mediumDrink = this.mediumDrinks[Math.floor(Math.random() * this.mediumDrinks.length)];
        var nonAlcoholicDrink = this.nonAlcoholicDrinks[Math.floor(Math.random()*this.nonAlcoholicDrinks.length)];

        this.shot = softDrink.drink
                    + ' - ' + mediumDrink.drink
                    + ' - ' + nonAlcoholicDrink.drink;

        this.drinks.find(drink => drink.id==softDrink.id).times+=1;
        this.drinks.find(drink => drink.id==mediumDrink.id).times+=1;
        this.drinks.find(drink => drink.id==nonAlcoholicDrink.id).times+=1;

        localStorage.setItem('drinkList', JSON.stringify(this.drinks));
      }
    },
    created(){
      console.log('before created');
      if (localStorage.getItem("drinkList") === null) {
        console.log('setting'+this.drinks[0].drink);
        localStorage.setItem('drinkList', JSON.stringify(this.drinks));
      }
      else{
        console.log("already set");
        this.drinks=JSON.parse(localStorage.getItem('drinkList'));
      }
      this.softDrinks=this.drinks.filter(drink => drink.type==1);
      this.mediumDrinks=this.drinks.filter(drink => drink.type==2);
      this.hardDrinks=this.drinks.filter(drink => drink.type==3);
      this.nonAlcoholicDrinks=this.drinks.filter(drink => drink.type==4);
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

  #selector{
    position:absolute;
    font-size: 1.7em;
    top:10%;
    right: 25%;
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
  .imageContainer{
    position: relative;
    width: auto;
  }
  .overShot{
    position: absolute;
    top:3em;
    left: 47%;
    border: red 1px solid;
    width:100px;
    height: 100px;
  }

  #animation {
    height: 50px;
    width: 50px;
    border: solid 1px #000;
    border-radius: 0 0 50% 50%;
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin: 20px;
  }
  #animation:before {
    height: 100%;
    width: 1px;
    background: #000;
    content: '';
    display: block;
    left: 50%;
    top: 100%;
    position: absolute;
  }
  #animation:after {
    height: 100%;
    width: 40px;
    height: 1px;
    background: #000;
    content: '';
    display: block;
    left: 50%;
    margin-left: -20px;
    top: 100px;
    position: absolute;
  }
  .two {
    border-width: 6px;
    border-radius: 5px 5px 50% 50%;

  }
  .two:before {
    width: 6px;
    margin-left: -3px;
  }
  .two:after {
    height: 6px;
    border-radius: 6px;
  }
  span {
    position: absolute;
    bottom: -6px;
    left: -6px;
    background: #F00;
    width: 100%;
    border: solid 6px #000;
    border-top: none;
    -webkit-animation: fillGlass 3s infinite;
    animation: fillGlass 3s infinite;
    border-radius: 0 0 50px 50px;
  }
  @-webkit-keyframes fillGlass {
    0% {
      height: 25px;
    }
    50% {
      height: 46px;
    }
    100% {
      height: 25px;
    }
  }
  @keyframes fillGlass {
    0% {
      height: 25px;
    }
    50% {
      height: 46px;
    }
    100% {
      height: 25px;
    }
  }
</style>

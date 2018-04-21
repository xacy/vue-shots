<template>
  <div>
    <transition name="fade">
      <div class="shot" @click="showModal" v-if="shotIsEmpty">
        <h1 >{{ shot.drink1 }} - {{ shot.drink2 }} - {{ shot.drink3 }}</h1>
        <img  src="../assets/noun_256576_cc.svg" width="75em" />
      </div>
    </transition>
    <div class="shot" v-if="!shotIsEmpty">
      <h1>Toca el vaso o agita el móvil para probar un chupito aleatorio.</h1>
    </div>
    <modal name="hello-world">
      <div class="modal-content">
        <h1>Ponle un nombre a tu creación:</h1>
        <p class="error">{{ error }}</p>
        <input :class="inputClass" type="text" v-model="newName" placeholder="Tu nombre increible" />
        <div class="button-container"><button @click="addFavourite()" >Añadir </button></div>
      </div>

    </modal>
  </div>
</template>

<script>
  import { eventBus } from '../main.js';
    export default {

      props: {
        shot: {}
      },
      data: function(){
        return {
          shotIsEmpty: false,
          newName: '',
          error: '',
          inputClass: ''
        }
      },
      watch: {
        shot(){
          if(this.shot.drink1){
            this.shotIsEmpty=true;
          }
          else{
            this.shotIsEmpty= false;
          }
        }
      },
      methods:{
        showModal(){
          console.log("Favorito");
          this.$modal.show('hello-world');
        },
        addFavourite(){
          console.log("New name: "+this.newName);
          if(this.newName===''){
            this.error='¡Ponle un nombre!';
            this.inputClass='input-error'
          }
          else{
            let favourite={name: this.newName,drink1: this.shot.drink1, drink2: this.shot.drink2, drink3: this.shot.drink3, type: this.shot.type};
            eventBus.addFavourite(favourite);
            this.$modal.hide('hello-world');
          }
        }
      }
    }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .shot{
    display: inline-flex;
    cursor: pointer;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top:2em;
  }
  .shot img{
    margin-left: 2.5em;
  }
  .modal-content{
    padding: 2em 2em 2em 2em;
  }
  .error{
    font-size: large;
    color: red;
  }
  .input-error{
    border: solid 1px red;
  }
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
</style>

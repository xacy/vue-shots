<template>
  <div>
    <transition name="fade">
      <div class="shot" @click="showModal" v-if="shotIsEmpty">
        <h1 >{{ shot.drink1 }} - {{ shot.drink2 }} - {{ shot.drink3 }}</h1>
        <img  src="../assets/noun_256576_cc.svg" width="75em" />
      </div>
    </transition>
    <div class="shot" v-if="!shotIsEmpty">
      <h1><b>Toca el vaso o agita el móvil para probar un chupito aleatorio.</b></h1>
    </div>
    <modal name="add-shot">
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
          this.$modal.show('add-shot');
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
            this.$modal.hide('add-shot');
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
  @media screen and (orientation:portrait) {
    .shot{
      position: absolute;
      bottom: 10em;
      left:5%;
      width:100%;
    }
  }
  @media screen and (orientation:landscape){

  }
  @media screen and (min-width:650px) and (orientation:portrait){
    .shot{
      position: absolute;
      bottom:-15em;
      left:5%;
      width:100%;
    }
  }

</style>

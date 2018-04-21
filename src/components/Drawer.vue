<template>
  <div>
    <transition name="drawer">
    <div :class="drawerClasses" ref="drawer">
      <div :class="openerClasses" @click="drawerClick" ref="opener">
        <img src="../assets/noun_1308_cc.svg" id="star" style="width:100px"/>
      </div>
        <div class="list" v-if="showing">

          <h3>Favoritos</h3>
          <ul>
            <li v-for="favourite in favourites" @click="favouriteClick(favourite)">
              <p>{{ favourite.name}} ({{ favourite.drink1}} ,{{ favourite.drink2}} , {{ favourite.drink3}})</p>
            </li>
          </ul>
        </div>
    </div>
    </transition>
    <transition name="content">
      <div :class="contentClasses" ref="content" @click="drawerClick">
      </div>
    </transition>
    <slot></slot>
  </div>


</template>

<script>
  import { eventBus } from '../main.js';
    export default {
      props: {
        favourites: Array
      },
      data: function(){
        return{
            showing: false,
            drawerClasses: 'drawer ',
            contentClasses: 'content ',
            openerClasses: 'opener '
        }
      },
      methods: {
        favouriteClick(favourite){
          eventBus.clickFavourite(favourite);
          console.log("after"+favourite.name);
          this.close();
        },
        drawerClick(){
          console.log("estado: "+this.showing);
          var self = this;
          if(this.showing){
            this.close();
          }
          else{
            this.open();
            setTimeout(function(){self.showing=true;},900);
          }


        },
        open(){
          this.$refs.opener.style.right="-5em";
          this.drawerClasses='drawer drawer-active';
          this.contentClasses='content content-active'

        },
        close(){
          this.drawerClasses='drawer ';
          this.contentClasses='content '
          this.$refs.opener.style.left="4em";
          this.showing=false;
        }
      }
    }
</script>

<style scoped>
  #star{
    width:6em;
    cursor: pointer;
  }
  .opener{
    position: absolute;
    left:4em;
    top:5em;
    cursor: pointer;
    z-index: 99;
  }
  .list{
    position:relative;
    top: 6em;
    font-size: 2em;
  }
  .list li{
    cursor: pointer;
    display: block;
  }
  .drawer{
    width:0;
    height:100%;
    position: absolute;
    top:0;
    left: 0;
    transition: width 1s;
    background-color: #fcfcfc;
    z-index:100;
    padding-left:1.5em;
    padding-right:1.5em;
  }
  .drawer-active{
    width:30%;
    transition: width 1s;
  }
  .separator{
    width:75%;
  }
  .content{
    position: fixed; /* Stay in place */
    z-index: 99; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    visibility: hidden;
    opacity: 0;
    background-color: rgba(0,0,0,0.4); /* Fallback color */
    transition: opacity 1s;
  }
  .content-active{
    opacity: 1;
    visibility: visible;
    transition: opacity 1s;
  }
</style>

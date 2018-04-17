<template>
  <div>
    <div class="drawer" ref="drawer">
      <div class="opener" @click="drawerClick" ref="opener">
        <img src="../assets/star_punk.svg" id="star" />
      </div>
    </div>
    <div class="content" ref="content" @click="drawerClick">
    </div>
    <slot></slot>
  </div>


</template>

<script>
    export default {
      data: function(){
        return{
            showing: false
        }
      },
      methods: {
        drawerClick(){
          console.log("estado: "+this.showing);
          if(this.showing){
            this.close();
          }
          else{
            this.open();
          }
          this.showing=!this.showing;
        },
        open(){
          this.$refs.drawer.style.width="20%";;
          this.$refs.content.style.display="inline-block";;
          this.$refs.opener.style.left="60%";

        },
        close(){
          this.$refs.drawer.style.width="0";;
          this.$refs.content.style.display="none";;
          this.$refs.opener.style.left="4em";
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
    top:4em;
    cursor: pointer;
    z-index: 99;
  }
  .drawer{
    width:0;
    height:100%;
    background-color: red;
    position: absolute;
    top:0;
    left: 0;
  }
  .drawer .active {
    width:20%;
  }
  .content{
    display:none;
    position: fixed; /* Stay in place */
    z-index: 99; /* Sit on top */
    left: 20%;
    top: 0;
    width: 80%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4); /* Fallback color */
  }
</style>

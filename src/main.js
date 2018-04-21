import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'

export const eventBus = new Vue({
  methods: {
    clickFavourite(favourite){
      this.$emit('favouriteWasClicked', favourite);
      console.log("emitted"+favourite);
    },
    addFavourite(favourite){
      this.$emit('addingFavourite',favourite);
    }
  }
});
Vue.use(VModal)
new Vue({
  el: '#app',
  render: h => h(App)
})

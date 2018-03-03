import Vue from 'vue';
import draggable from 'vuedraggable'
import Buefy from 'buefy'

import routes from './routes';

Vue.use(Buefy);
Vue.component('draggable', draggable);

new Vue({
  el: '#wsjf',
  router: routes
})
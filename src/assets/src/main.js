import Vue from 'vue';

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import Modal from './Modal.vue';
import routes from './routes';

Vue.use(Buefy);

Vue.component('wsjf-modal', Modal);

new Vue({
  el: '#wsjf',
  router: routes
})
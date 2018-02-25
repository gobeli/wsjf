import Vue from 'vue';

import Buefy from 'buefy'

import routes from './routes';

Vue.use(Buefy);

new Vue({
  el: '#wsjf',
  router: routes
})
import Vue from 'vue';
import App from './App.vue';
import Modal from './Modal.vue';
import PlanningForm from './planning/PlanningForm.vue';

Vue.component('wsjf-planning-form', PlanningForm);
Vue.component('wsjf-modal', Modal);

new Vue({
  el: '#wsjf',
  render: h => h(App)
})
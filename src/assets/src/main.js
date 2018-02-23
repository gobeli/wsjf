import Vue from 'vue'
import App from './App.vue'
import PlanningForm from './planning/PlanningForm.vue';

Vue.component('wsjf-planning-form', PlanningForm);

new Vue({
  el: '#wsjf',
  render: h => h(App)
})
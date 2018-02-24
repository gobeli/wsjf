import Vue from 'vue';
import Router from 'vue-router';
import PlanningOverview from './planning/PlanningOverview.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: PlanningOverview
    }
  ]
})
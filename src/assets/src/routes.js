import Vue from 'vue';
import Router from 'vue-router';
import PlanningOverview from './planning/PlanningOverview.vue';
import Story from './plan-story/Story.vue';
import BusinessValue from './plan-story/BusinessValue.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: PlanningOverview,
    }, {
      path: '/planning/:id',
      component: Story,
      children: [{
        name: 'business-value',
        path: 'business-value',
        component: BusinessValue
      }, {
        name: 'time-criticallity',
        path: 'time-criticallity',
        component: BusinessValue
      }, {
        name: 'risk-opportunity',
        path: 'risk-opportunity',
        component: BusinessValue
      }]
    }
  ]
})
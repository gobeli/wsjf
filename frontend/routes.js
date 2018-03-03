import Vue from 'vue';
import Router from 'vue-router';
import PlanningOverview from './planning/PlanningOverview.vue';
import Story from './plan-story/Story.vue';
import BusinessValue from './plan-story/wizard/BusinessValue.vue';
import RiskOpportunity from './plan-story/wizard/RiskOpportunity.vue';
import TimeCriticallity from './plan-story/wizard/TimeCriticallity.vue';
import JobSize from './plan-story/wizard/JobSize.vue';

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
        path: '',
        redirect: { name: 'business-value' }
      }, {
        name: 'business-value',
        path: 'business-value',
        component: BusinessValue
      }, {
        name: 'time-criticallity',
        path: 'time-criticallity',
        component: TimeCriticallity
      }, {
        name: 'risk-opportunity',
        path: 'risk-opportunity',
        component: RiskOpportunity
      }, {
        name: 'job-size',
        path: 'job-size',
        component: JobSize
      }]
    }
  ]
})
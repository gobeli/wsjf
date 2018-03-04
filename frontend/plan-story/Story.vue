<template>
  <div>
    <h1 class="title">Plan {{planning.name}}</h1>
    <div class="steps is-centered">
      <div class="step" :class="{'is-active': isActive('business-value')}">
        <router-link :to="{ name: 'business-value',  params: { id: $route.params.id }}">Business Value</router-link>
      </div>
      <div class="step" :class="{'is-active': isActive('time-criticallity')}">
        <router-link :to="{ name: 'time-criticallity',  params: { id: $route.params.id }}">Time Criticallity</router-link>
      </div>
      <div class="step" :class="{'is-active': isActive('risk-opportunity')}">
        <router-link :to="{ name: 'risk-opportunity',  params: { id: $route.params.id }}">Risk / Opportunity</router-link>
      </div>
      <div class="step" :class="{'is-active': isActive('job-size')}">
        <router-link :to="{ name: 'job-size',  params: { id: $route.params.id }}">Job Size</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { request } from '../helper';

  export default {
    data: () => ({
      planning: {}
    }),
    async mounted() {
      this.planning = await request({ url: `/wsjf/planning/${this.$route.params.id}`, method: 'GET' }).then(r => r.json());
    },
    methods: {
      isActive(tab) {
        return this.$route.path.includes(tab);
      }
    }
  }
</script>

<template>
  <form @submit.prevent="submit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name" v-model="planning.name" />
      </div>
    </div>
    <input :disabled="!planning.name" class="button is-primary" type="submit"/>
  </form>
</template>
<script>
import { request } from '../helper';

export default {
  props: ['planning'],
  methods: {
    async submit() {
      await request({ url: '/wsjf/planning', method: 'POST', body: JSON.stringify(this.planning) });
      location.reload();
    }
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name" v-model="name" />
      </div>
    </div>
    <input :disabled="!name" class="button is-primary" type="submit"/>
  </form>
</template>
<script>
import { request } from '../helper';

export default {
  data: () => ({
    name: ''
  }),
  methods: {
    async submit() {
      await request({ url: '/wsjf/planning', method: 'POST', body: JSON.stringify({ name: this.name }) })
      location.reload();
    }
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name" v-model="story.name" />
      </div>
    </div>
    <input :disabled="!story.name" class="button is-primary" type="submit"/>
  </form>
</template>
<script>
import { request } from '../helper';

export default {
  props: ['planningId', 'story'],
  methods: {
    async submit() {
      const story = await request({
        url: '/wsjf/story',
        method: 'POST',
        body: JSON.stringify({ name: this.story.name, planning: {id: this.planningId }})
      }).then(r => r.json());
      this.$emit('storyUpdated', story);
    }
  }
}
</script>

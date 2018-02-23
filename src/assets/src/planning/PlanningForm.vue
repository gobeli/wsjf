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
export default {
  data: () => ({
    name: ''
  }),
  methods: {
    submit() {
      fetch('/wsjf/planning', { 
        method: 'POST', 
        body: JSON.stringify({ name: this.name }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(() => {
          location.reload();
        });
    }
  }
}
</script>

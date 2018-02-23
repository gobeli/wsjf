<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="planning in plannings" :key="planning.id">
          <td>{{planning.name}}</td>
          <td>
            <button class="button is-text" @click="remove(planning)">
              <i class="fas fa-times"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="button is-primary" @click="modalOpen = true">Add</button> 
    <wsjf-modal :open.sync="modalOpen">
      <wsjf-planning-form></wsjf-planning-form>
    </wsjf-modal>
  </div>
</template>
<script>
export default {
  data: () => ({
    plannings: plannings,
    modalOpen: false
  }),
  methods: {
    remove(planning) {

    }
  }
}
</script>

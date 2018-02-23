<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="planning in plannings" :key="planning.id">
          <td>{{planning.name}}</td>
        </tr>
      </tbody>
    </table>
    <button class="button is-primary" @click="modalOpen = true">Add</button> 
    <div class="modal animated fadeIn" style="animation-duration: .3s" :class="{'is-active': modalOpen, 'fadeOut': modalFadeOut}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="content">
            <wsjf-planning-form></wsjf-planning-form>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    plannings: plannings,
    modalOpen: false,
    modalFadeOut: false
  }),
  methods: {
    closeModal() {
      this.modalFadeOut = true;
      setTimeout(() => {
        this.modalFadeOut = false; 
        this.modalOpen = false;
      }, 300)
    }
  }
}
</script>

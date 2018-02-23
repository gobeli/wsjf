<style>
  .modal {
    animation-duration: .3s;
  }
</style>
<template>
  <div class="modal animated fadeIn" :class="{'is-active': open, 'fadeOut': modalFadeOut}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>
<script>
export default {
  props: ['open'],
  data: () => ({
    modalFadeOut: false
  }),
  methods: {
    closeModal() {
      this.modalFadeOut = true;
      setTimeout(() => {
        this.modalFadeOut = false; 
        this.$emit('update:open', false);
      }, 300);
    }
  }
}
</script>


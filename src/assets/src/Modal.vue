<style>
  .modal {
    animation-duration: .3s;
  }
</style>
<template>
  <div class="modal animated fadeIn" :class="{'is-active': open, 'fadeOut': modalFadeOut}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  props: ['open', 'title'],
  data: () => ({
    modalFadeOut: false
  }),
  mounted() {
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.closeModal();
      }
    });
  },
  methods: {
    closeModal() {
      if (!this.open) {
        return;
      }
      this.modalFadeOut = true;
      setTimeout(() => {
        this.modalFadeOut = false;
        this.$emit('update:open', false);
      }, 300);
    }
  }
}
</script>


<template>
  <div>
    <wsjf-compare-stories type="jobSize"></wsjf-compare-stories>
  </div>
</template>
<script>
  import CompareStories from '../CompareStories.vue';

  export default {
    components: {
      'wsjf-compare-stories': CompareStories
    }
  }
</script>
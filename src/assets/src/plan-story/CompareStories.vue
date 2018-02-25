<template>
  <div class="columns">
    <div class="column" v-for="f in fibonacci" :key="f">
      {{f}}
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      fibonacci: [1,2,3,5,8,13,20]
    })
  }
</script>
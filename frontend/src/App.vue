<template>
  <div class="main-content">
    <router-view />
  </div>
</template>
<script>
import 'toastify-js/src/toastify.css';

export default {
  mounted() {
    this.$store.dispatch('getUsers')

  },

  computed: {

  },
}; 
</script>
<style>
body {
  background-color: #112B4A;
}
.main-content {
  margin-left: 210px;
}
</style>
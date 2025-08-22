<template>
  <div :class="{'main-content': !isAdminLogin && !isUserLogin && !isForgotPassword && !isSignup && !isTerms}">
    <router-view />
  </div>
</template>

<script>
import 'toastify-js/src/toastify.css';

export default {
  computed: {
    isAdminLogin() {
      return this.$route.path === '/';
    },
    isUserLogin() {
      return this.$route.path === '/users-login';
    },
    isForgotPassword() {
      return this.$route.path === '/forgot';
    },
    isSignup() {
      return this.$route.path === '/signup';
    },
    isTerms() {
      return this.$route.path === '/terms-and-conditions';
    }
  },
  mounted() {
    this.$store.dispatch('getUsers')
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
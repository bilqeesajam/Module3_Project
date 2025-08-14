<template>
  <Sidebar v-if="showSidebar && showSidebar2 && showSidebar3 && showSidebar4"/>
  <div class="main-content">
    <router-view />
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import 'toastify-js/src/toastify.css';

export default {
  components: {
    Sidebar,
  },
  setup() {
    const route = useRoute();

    const showSidebar = computed(() => route.name !== "login");
    const showSidebar2 = computed(() => route.name !== "learners");
    const showSidebar3 = computed(() => route.name !== "forgot");
    const showSidebar4 = computed(() => route.name !== "signup");

    return {
      showSidebar,
      showSidebar2,
      showSidebar3,
      showSidebar4
    };
  },
  mounted() {
    this.$store.dispatch('getUsers')

  },

  computed: {

  },
}; 
</script>
<style>
body {
  background-color: #112B4A; /* Match card navy */
}
.main-content {
  margin-left: 210px;
}
</style>
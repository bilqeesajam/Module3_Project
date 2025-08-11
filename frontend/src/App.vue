<template>
  <Sidebar v-if="showSidebar && showSidebar2 && showSidebar3"/>
  <router-view/>
</template>
<script>
import Sidebar from "./components/Sidebar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Sidebar,
  },
  setup() {
    const route = useRoute();

    const showSidebar = computed(() => route.name !== "login");
    const showSidebar2 = computed(() => route.name !== "learners");
    const showSidebar3 = computed(() => route.name !== "forgot");

    return {
      showSidebar,
      showSidebar2,
      showSidebar3
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

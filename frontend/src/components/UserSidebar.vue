<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/homeTwo">Home Two</router-link></li>
      <li><router-link to="/courses">Learn how to code</router-link></li>
      <li><router-link to="/pricelist">Packages we offer</router-link></li>
      <li><router-link to="/payments">Payments</router-link></li>
      <li><router-link to="/profile">My Profile</router-link></li>
    </ul>
    <button class="logout-button" @click="handleLogout">Logout</button>
  </nav>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      localStorage.removeItem('token');

      this.$router.replace('/users-login');

      window.history.pushState(null, null, '/users-login');
      window.addEventListener('popstate', function () {
        window.location.replace('/users-login'); 
      });
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 210px;
  height: 100vh;
  background: #000;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  border-right: 3px solid orange;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.sidebar li {
  margin: 1.5rem 0;
  text-align: center;
}

.sidebar a {
  color: orange;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.sidebar a.router-link-exact-active,
.sidebar a:hover {
  color: #fff;
}

.logout-button {
  background: transparent;
  color: orange;
  border: 2px solid orange;
  padding: 0.75rem;
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.logout-button:hover {
  background: orange;
  color: #000;
}
</style>
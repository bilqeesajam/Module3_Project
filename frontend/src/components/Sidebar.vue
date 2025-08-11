<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/Courses">Learn how to code</router-link></li>
      <li><router-link to="/pricelist">Packages we offer </router-link></li>
      <li><router-link to="/users">Our Customers</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 210px;
  height: 100vh;
  background: #205781;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  margin: 1.5rem 0;
  text-align: center;
}
.sidebar a {
  color: #FFA500;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: color 0.2s;
}
.sidebar a.router-link-exact-active,
.sidebar a:hover {
  color:whitesmoke;
}
</style>
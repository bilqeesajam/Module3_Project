<template>
 <div class="card">
  <div class="heading">
  <a href="/">Admin</a>
  <a href="/Learners">Learners</a>
  </div>
  <form @submit.prevent="handleLogin">
    <div class="user">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" v-model="username" required>
      <div class="register">
      <a href="/Signup">Register?</a>
    </div>
    </div>
    <div class="password">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password" required>
      <div class="forgot">
      <a id="forgot" href="/Forgot">Forgot Password?</a>
    </div>
    </div>
    <button type="submit">Login</button>
  </form>
 </div>
</template>
<script>
export default {
  name: "LoginComp",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await fetch("http://localhost:9090/password-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            role: "learner"
          })
        });

        const result = await res.json();

        if (res.ok) {
          console.log("Login successful!");
          this.error = "";
          this.$router.push("/home");
        } else {
          console.warn("Login failed:", result.message);
          this.error = result.message || "Invalid username or password.";
        }

      } catch (error) {
        console.error("Login failed:", error);
        this.error = "Error logging in. Please try again."
      }
    }
  }
};
</script>
<style scoped>
.card {
  width: 300px;
  height: 430px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  background-color: rgba(0, 0, 0, 0.932);
  color: white;
}
a{
  display: flexbox;
  text-decoration: none;
  color: #484848;
  font-weight: bold;
  margin-left: 2rem;
  margin-right: 2rem;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  color: rgba(255, 255, 255, 0.525);
}
a:hover {
  color: #ffffff;
}
.user{
  margin-bottom: 2rem;
  margin-top: 2rem;
}
.password{
  margin-bottom: 3rem;
}
input{
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button{
  width: 7rem;
  padding: 10px;
  padding-bottom: 10px;
  background-color: #585858;
  color: white;
  margin-top: -3rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover{
background-color: #484848;
box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}
.register {
  text-align: right;
  margin-right: -1rem;
  font-size: 0.7rem;
  margin-top: 7px;
}
.forgot{
  text-align: right;
  margin-right: -2rem;
  font-size: 0.7rem;
  margin-top: 7px;
}
</style>

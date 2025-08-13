<template>
  <div class="login-card split">
    <div class="left-side">
      <div class="heading">
        <a href="/" class="Admin">Admin</a>
        <form @submit.prevent="handleLogin">
          <div class="user">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username" required>
          </div>
          <div class="password">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
         <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
      </div>
    </div>
    <div class="right-side">
      <a href="/learners">Learners</a>
      <br>
      <a id="forgot" href="/forgot">Forgot Password?</a>
      <br>
      <a href="/signup">Register?</a>
    </div>
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
            role: "admin"
          })
        });

        const result = await res.json();

        if (res.ok && result.success) {
          console.log("Admin login successful! Token:", result.token);
          localStorage.setItem('token', result.token);
          alert('Admin login successful!');
          this.$router.push("/home");
        } else {
          console.warn("Admin login failed:", result.message);
          this.error = result.message || "Admin access only";
        }
      } catch (error) {
        console.error("Admin login error:", error);
        this.error = "Error logging in. Please try again.";
      }
    }
  }
};
</script>

<style scoped>
.login-card.split {
  display: flex;
  width: 600px;
  height: 350px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  margin: 50px auto;
}

.left-side {
  flex: 1;
  background-color: #4f46e5;
  /* purple */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px;
  padding-bottom: 80px;
  border-top-right-radius: 100px;
  /* Curve inward */
  border-bottom-right-radius: 100px;
}

.right-side {
  flex: 1;
  background-color: #ffffff;
  /* cyan */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

a {
  display: flexbox;
  text-decoration: none;
  color: #405fd0;
  font-weight: bold;
  margin-left: 2rem;
  margin-right: 2rem;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

a:hover {
  color: #000b42ae;
}

.user {
  margin-bottom: 3rem;
  margin-top: 2rem;
}

.password {
  margin-bottom: 3rem;
}

.Admin {
  color: #ffffff;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 7rem;
  padding: 10px;
  padding-bottom: 10px;
  background-color: #1d2081b7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #033246b1;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
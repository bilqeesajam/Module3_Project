<template>
  <div class="login-card split">
    <div class="left-side">
      <div class="heading">
        <a href="/Learners" class="learners">Learners</a>
        <form @submit.prevent="handleLogin">
          <div class="user">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username" required>
            <div class="register">
            </div>
          </div>
          <div class="password">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password" required>
            <div class="forgot">
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
         <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
      </div>
    </div>
    <div class="right-side">
      <a href="/">Admin</a>
      <br>
      <a href="/signup">Register?</a>
      <br>
      <a id="forgot" href="/forgot">Forgot Password?</a>
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
            role: "learner"
          })
        });

        const result = await res.json();

        if (res.ok && result.success) {
          console.log("Learner login successful! Token:", result.token);
          localStorage.setItem('token', result.token);
          alert('Learner login successful!');
          this.$router.push("/homeTwo");
        } else {
          console.warn("Learner login failed:", result.message);
          this.error = result.message || "Learner access only";
        }
      } catch (error) {
        console.error("Learner login error:", error);
        this.error = "Error logging in. Please try again.";
      }
    }
  }
};
</script>
<style scoped>
* {
  font-family: 'Arial', sans-serif;
}

.login-card.split {
  display: flex;
  width: 600px;
  height: 350px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  margin: 50px auto;
}

.learners {
  color: white;
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
  color: #484848;
  font-weight: bold;
  margin-left: 2rem;
  margin-right: 2rem;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  color: #405fd0;
  font-family: 'Arial', sans-serif;
}

a:hover {
  color: #000b42ae;
}

.user {
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.password {
  margin-bottom: 3rem;
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
  margin-top: -3rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #033246b1;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.register {
  text-align: right;
  margin-right: -1rem;
  font-size: 0.7rem;
  margin-top: 7px;
}

.forgot {
  text-align: right;
  margin-right: -2rem;
  font-size: 0.7rem;
  margin-top: 7px;
}
</style>
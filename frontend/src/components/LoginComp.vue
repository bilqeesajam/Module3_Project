<template>
  <div class="login-container">
    <div class="login-card split">
      <div class="left-side">
        <div class="heading">
          <h2>Admin</h2>
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
        <a href="/users-login">User</a>
        <br>
        <a id="forgot" href="/forgot">Forgot Password?</a>
        <br>
        <a href="/terms-and-conditions">Register?</a>
      </div>
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
          console.log("Admin login successful!");
          localStorage.setItem('token', result.token);
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
.login-container {
  min-height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

.login-card.split {
  display: flex;
  width: 600px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-card.split:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
}

.left-side {
  flex: 1;
  background-color: #111;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px;
  padding-bottom: 80px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}

.right-side {
  flex: 1;
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-left: 1px solid #333;
}

a, h2 {
  display: flexbox;
  text-decoration: none;
  color: orange;
  font-weight: bold;
  margin-left: 2rem;
  margin-right: 2rem;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 1rem;
}

a:hover {
  color: #ffb347;
}

.user {
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.password {
  margin-bottom: 2rem;
}

.Admin {
  color: orange;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: block;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 8px;
  background: #222;
  color: white;
  margin-top: 0.5rem;
}

label {
  color: #fff;
  font-weight: bold;
}

button {
  width: 100%;
  padding: 12px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

button:hover {
  background-color: #ffb347;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.text-danger {
  color: #dc3545;
  font-weight: bold;
}

@media (max-width: 768px) {
  .login-card.split {
    flex-direction: column;
    height: auto;
    width: 90%;
  }
  
  .left-side, .right-side {
    padding: 2rem;
    border-radius: 0;
  }
  
  .left-side {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    border-bottom-right-radius: 0;
  }
  
  .right-side {
    border-left: none;
    border-top: 1px solid #333;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
}
</style>
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
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
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
            role: "admin"
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
  height: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgb(0, 0, 0);
  color: white;
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
}

a:hover {
  color: #ffffff;
}

.user {
  margin-bottom: 3rem;
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
  background-color: #585858;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #484848;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

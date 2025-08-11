<template>
  <div class="card">
    <div class="heading">
      <h2>Sign Up</h2>
      <p>Create a new account</p>
    </div>
    <form @submit.prevent="handleSignup">
      <div class="user">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="email">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="phone_number">
        <label for="phone_number">Phone Number</label>
        <input type="tel" id="phone_number" v-model="phone_number" required>
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="confirm-password">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupComp",
  data() {
    return {
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    handleSignup() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      fetch('http://localhost:9090/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          phone_number: this.phone_number,
          password: this.password
        })
      })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
          }
          alert('Signup successful!');
          this.username = '';
          this.email = '';
          this.phone_number = '';
          this.password = '';
          this.confirmPassword = '';
        })
        .catch((error) => {
          alert(`Signup error: ${error.message}`);
        });
    }
  }
};
</script>
<style scoped>
.card {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.heading {
  text-align: center;
  margin-bottom: 20px;
}

.user,
.email,
.password,
.confirm-password {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #535353;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
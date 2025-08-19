<template>
  <div class="card-split">
    <div class="top-half">
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
      </form>
    </div>
    <div class="bottom-half">
      <form @submit.prevent="handleSignup">
        <div class="password">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="confirm-password">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
        <button type="submit">Sign Up</button>
        <a href="/">Already have an account? Login</a>
      </form>
    </div>
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
.card-split {
  max-width: 400px;
  margin: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
}

.top-half {
  flex: 1;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}

.bottom-half {
  flex: 1;
  background-color: #4f46e5;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  padding-bottom: 50px;
  border-top-right-radius: 100px;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
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

a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;

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
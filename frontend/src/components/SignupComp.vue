<template>
  <div class="signup-container">
    <div class="signup-card split">
      <div class="left-side">
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
      <div class="right-side">
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
.signup-container {
  min-height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

.signup-card.split {
  display: flex;
  width: 600px;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.signup-card.split:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
}

.left-side {
  flex: 1;
  background-color: #111;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}

.right-side {
  flex: 1;
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  border-left: 1px solid #333;
}

.heading {
  text-align: center;
  margin-bottom: 20px;
}

.user,
.email,
.phone_number,
.password,
.confirm-password {
  margin-bottom: 1.5rem;
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
  margin-top: 1rem;
}

button:hover {
  background-color: #ffb347;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

a {
  color: orange;
  font-weight: bold;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 1rem;
}

a:hover {
  color: #ffb347;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .signup-card.split {
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

@media (max-width: 480px) {
  .signup-card.split {
    width: 95%;
  }

  .left-side, .right-side {
    padding: 1.5rem;
  }
}
</style>

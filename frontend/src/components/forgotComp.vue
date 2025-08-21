<template>
  <div class="forgot-container">
    <div class="forgot-card split">
      <div class="left-side">
        <div class="heading">
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
        </div>
        <form @submit.prevent="handleForgotPassword">
          <div class="email">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
      <div class="right-side">
        <a href="/">Remembered your password? Login</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotComp",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    async handleForgotPassword() {
      try {
        const response = await fetch('http://localhost:9090/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email })
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          this.email = "";
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('Something went wrong. Please try again later.');
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.forgot-container {
  min-height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

.forgot-card.split {
  display: flex;
  width: 600px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.forgot-card.split:hover {
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
  align-items: center;
  padding: 20px;
  border-left: 1px solid #333;
}

.heading {
  text-align: center;
  margin-bottom: 20px;
}

.email {
  margin-bottom: 2rem;
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

a {
  color: orange;
  font-weight: bold;
  text-decoration: none;
  margin-top: 1rem;
}

a:hover {
  color: #ffb347;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .forgot-card.split {
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
  .forgot-card.split {
    width: 95%;
  }

  .left-side, .right-side {
    padding: 1.5rem;
  }
}
</style>

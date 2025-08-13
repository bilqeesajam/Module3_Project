<template>
  <div class="card">
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
.card {
  display: flex;
  width: 600px;
  height: 350px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  margin: 50px auto;
}
.left-side{
  flex: 1;
  background-color: #ffffff; /* cyan */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}
.right-side{
   flex: 1;
  background-color: #4f46e5; /* purple */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px;
  padding-bottom: 7rem;
  border-top-right-radius: 100px; /* Curve inward */
  border-bottom-right-radius: 100px;
}
.heading {
  text-align: center;
  margin-bottom: 20px;
}
.email {
  margin-bottom: 15px;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
a{
  margin-top: -40px;
  color: white;
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
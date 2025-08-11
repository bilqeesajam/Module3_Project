<template>
    <div class="card">
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
        const response =  await fetch('http://localhost:9090/forgot-password', {
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
.email {
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


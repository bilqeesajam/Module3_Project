<template>
  <div class="container text-center my-5">
    <h1>Courses</h1>
    <div class="row justify-content-center g-4">
      <div class="col-md-4 mb-4">
        <div class="card tech-card">
          <i class='bx bxl-html5'></i>
          <div class="card-body">
            <h5 class="card-title">HTML</h5>
            <p class="card-text">Learn the fundamentals of HTML</p>
            <p>R 400.00</p>
            <router-link to="/register" class="btn register-btn">Register</router-link>
          </div>
        </div>
      </div>

<div class="col-md-4 mb-4">
        <div class="card tech-card">
         <i class='bx bx-data'></i>
          <div class="card-body">
            <h5 class="card-title">MYSQL</h5>
            <p class="card-text">Database management and building APIs</p>
            <p>R 1100.00</p>
            <router-link to="/register" class="btn register-btn">Register</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card tech-card">
          <i class='bx bxs-file-css'></i>
          <div class="card-body">
            <h5 class="card-title">CSS</h5>
            <p class="card-text">Learn how to style websites using CSS</p>
            <p>R 500.00</p>
            <router-link to="/register" class="btn register-btn">Register</router-link>
          </div>
        </div>
      </div>

      

      <div class="col-md-4 mb-4">
        <div class="card tech-card">
          <i class='bx bxl-nodejs'></i>
          <div class="card-body">
            <h5 class="card-title">NODE.JS</h5>
            <p class="card-text">Backend development with Node.js framework</p>
            <p>R 1200.00</p>
            <router-link to="/register" class="btn register-btn">Register</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card tech-card">
          <i class='bx bxl-php'></i>
          <div class="card-body">
            <h5 class="card-title">PHP</h5>
            <p class="card-text">Learn frontend and backend development using PHP.</p>
            <p>R 900.00</p>
            <router-link to="/register" class="btn register-btn">Register</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card tech-card">
          <i class='bx bxl-vuejs'></i>
          <div class="card-body">
            <h5 class="card-title">VUE.JS</h5>
            <p class="card-text">Frontend Javascript framework for building UI's</p>
            <p>R 1000.00</p>
            <router-link to="/register" class="btn register-btn">Register</router-link>
          </div>
        </div>
      </div>

    <div class="col-md-4 mb-4">
        <div class="card tech-card">
          <i class='bx bxl-javascript'></i>
          <div class="card-body">
            <h5 class="card-title">JAVASCRIPT</h5>
            <p class="card-text">Interactive web development with Javascript</p>
            <p>R 800.00</p>
            <router-link to="/register" class="btn register-btn">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="landing-footer">
      <p>© 2025 WEBLAUNCH. All Rights Reserved.</p>
    </footer>
</template>

<style scoped>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #112B4A; /* Match card navy */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  padding: 2rem 1rem;
  max-width: 1200px;
}

h1 {
  color: #FFA500; /* Orange */
  font-weight: 800;
  margin-bottom: 2rem;
}

.card.tech-card {
  background: #112B4A; /* Dark navy for card */
  border-radius: 16px;
  border: 2px solid #FFA500;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  color: #ffffff;
}

.card.tech-card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

i.bx {
  font-size: 64px;
  margin-bottom: 1rem;
  color: #FFA500; /* Orange for icons */
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
}

.card-text {
  font-size: 1rem;
  color: #cccccc;
}

p {
  margin: 0.5rem 0;
  color: #FFA500;
  font-weight: 600;
}

.register-btn {
  margin-top: auto;
  padding: 0.6rem 1.4rem;
  background-color: #FFA500;
  color: #0B1F3A;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.register-btn:hover {
  background-color: #e69500;
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4);
}

/* ICON COLORS (Optional custom if you want to override all to orange) */
i.bxl-html5{
  color: orangered;
}
i.bxs-file-css{
  color: blue;
}
i.bxl-javascript{
  color: orange;
}

i.bxl-nodejs
{
  color: yellow;
}
i.bxl-php{
  color: purple !important;
}
i.bxl-vuejs {
  color: green !important;
}

@media (max-width: 768px) {
  .card.tech-card {
    margin-bottom: 1.5rem;
  }
}

/* Footer */
.landing-footer {
  text-align: center;
  padding: 2rem;
  background: rgb(1, 1, 47);
  color: #fff;
  border-top: 2px solid orange;
  }
</style>


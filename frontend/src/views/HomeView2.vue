<template>
  <section class="landing">
    <header class="hero">
      <h1>Empowering Your Business & Skills</h1>
      <p>We help you learn programming and build beautiful, functional websites for your business.</p>
      <button class="cta-btn" @click="scrollToFeatures">Get Started</button>
    </header>

    <section ref="featuresSection" class="features">
      <div class="feature-card">
        <h2>Learn to Code</h2>
        <p>Interactive lessons in HTML, CSS, JavaScript, PHP, and more to boost your skills.</p>
        <router-link to="/courses" class="feature-btn">Explore Courses</router-link>
      </div>
      <div class="feature-card">
        <h2>Custom Websites</h2>
        <p>We design and develop websites tailored to your business needs.</p>
        <router-link to="/pricelist" class="feature-btn">View Packages</router-link>
      </div>
      <div class="feature-card">
        <h2>View Your Profile</h2>
        <p>Manage your personal information, track your course progress, and update your account settings all in one place.</p>
        <router-link to="/userprofile" class="feature-btn">My Profile</router-link>
      </div>
    </section>

    <footer class="landing-footer">
      <p>© 2025 WEBLAUNCH. All Rights Reserved.</p>
    </footer>
  </section>
</template>

<script setup>
import { ref } from "vue";
const featuresSection = ref(null);

function scrollToFeatures() {
  featuresSection.value?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
.landing {
  padding: 0;
  min-height: 100vh;
  transition: background-color 0.4s, color 0.4s;
}

/* Hero Section */
.hero {
  height: 500px;
  background-color: rgb(1, 1, 47);
  color: orange;
  text-align: center;
  justify-content: center;
  padding: 4rem 2rem;
}
.hero h1 {
  font-size: 2.5rem;
  margin-top: 5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: 1px;
}
.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.cta-btn {
  background: orange;
  color: navy; 
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;
  border: none;
  box-shadow: 0 2px 8px rgba(32, 87, 129, 0.08);
  cursor: pointer;
}
.cta-btn:hover {
  background: orange;
  color: #fff;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  border-color: orange;
  padding: 3rem 2rem;
}
.feature-card {
  background: whitesmoke ;
  padding: 2rem;
  border-radius: 10px;
  border: 3px solid orange;
  transition: transform 0.3s, background 0.3s, color 0.3s;
  box-shadow: 0 4px 16px rgba(32, 87, 129, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.feature-card h2 {
  font-weight: 700;
  margin-bottom: 1rem;
}
.feature-card:hover {
  transform: translateY(-5px) scale(1.03);
  background: orange;
  color: navy;
}
.feature-card:hover h2 {
  color: navy;
}

.feature-btn {
  margin-top: 1.5rem;
  background: orange;
  color: navy;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  transition: background 0.3s, color 0.3s;
  box-shadow: 0 2px 8px rgba(32, 87, 129, 0.08);
  display: inline-block;
}
.feature-btn:hover {
  background: orange;
  color: #fff;
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
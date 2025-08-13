<template>
  <section class="landing">
    <header class="hero">
  <video autoplay muted loop playsinline class="hero-video">
    <source src="../assets/3129957-uhd_3840_2160_25fps.mp4" type="video/mp4">
  </video>
      <h1>Empowering Your Business & Skills</h1>
      <p>We help you learn programming and build beautiful, functional websites for your business.</p>
      <button class="cta-btn" @click="scrollToFeatures">Get Started</button>
    </header>

    <section ref="featuresSection" class="features">
      <div class="feature-card">
        <h2>Learn to Code</h2>
        <p>Interactive lessons in HTML, CSS, JavaScript, PHP, and more to boost your skills.</p>
        <router-link to="/Courses" class="feature-btn">Explore Courses</router-link>
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

<footer class="footer">
  <div class="footer-content">
    <div class="footer-logo">
      <h2>SOON</h2>
      <p>Connecting you with the world.</p>
    </div>

    <div class="footer-social">
      <a href="https://facebook.com" target="_blank" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="_blank" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>

  <div class="footer-bottom">
    <p>&copy; 2025 SOON. All rights reserved.</p>
  </div>
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
  height: 100vh;
  overflow: hidden;
  position: relative;
  color: orange;
  text-align: center;
  justify-content: center;
  padding: 4rem 2rem;
}
.hero::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%; /* how tall the fade is */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #0000004e 75%, #000000c3 85%, #000000 100%);
  pointer-events: none; /* So it doesn't block clicks */
  z-index: 0;
}
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Makes video fill and crop properly */
  z-index: -1; /* Sends it behind the text */
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
  background: #000;
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
.footer {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.944) 0%, #000000 100%);
  color: white;
  padding: 20px 20px;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.footer-logo h2 {
  margin: 0;
}

.footer-social {
  display: flex;
  gap: 15px;
}

.footer-social a {
  color: white;
  font-size: 1.4rem;
  transition: color 0.3s ease;
}

.footer-social a:hover {
  color: #00aced; /* Change to brand color */
}

.footer-bottom {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #aaa;
}

/* Make it nicer on bigger screens */
@media (min-width: 600px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1000px;
    margin: auto;
  }
}
</style>
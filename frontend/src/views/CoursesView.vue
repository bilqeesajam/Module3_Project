<template>
  <UserSidebar />
  <div class="Courses">
    <div class="banner">
      <div class="banner-content">
        <h1>Unlock Your Tech Potential</h1>
        <p class="subtitle">
          Learn in-demand skills with our expert-led courses
        </p>
        <div class="banner-stats">
          <div class="stat-item" v-for="(stat, index) in stats" :key="index">
            <span class="stat-number">{{ stat.number }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <h1 class="section-title">Featured Courses</h1>
      <div class="courses-grid">
        <div class="course-card" v-for="(course, index) in courses" :key="index">
          <div class="course-img-container">
            <img :src="course.image" :alt="course.title" class="course-img" />
            <div class="card-hover-info">
              <h4>{{ course.title }} Course Details</h4>
              <ul>
                <li v-for="(detail, i) in course.details.split('|')" :key="i">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>
          <i :class="course.icon"></i>
          <div class="course-info">
            <h3>{{ course.title }}</h3>
            <p>{{ course.description }}</p>
            <div class="price-section">
              <span class="price">R {{ course.price }}</span>
            </div>
            <button class="enroll-btn" @click="enroll(course.course_id)" :disabled="isEnrolled(course.course_id)">
              {{ isEnrolled(course.course_id) ? 'Already Enrolled' : 'Enroll Now' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <footer class="landing-footer">
      <div class="footer-content">
        <!-- Left: Logo & Rights -->
        <div class="footer-left">
          <h2 class="footer-logo">WEBLAUNCH</h2>
          <p>© 2025 WEBLAUNCH. All Rights Reserved.</p>
        </div>

        <!-- Middle: Contact -->
        <div class="footer-middle">
          <h3>Contact Us</h3>
          <ul>
            <li><i class="bx bx-envelope"></i> <a href="mailto:support@weblaunch.com">support@weblaunch.com</a></li>
            <li><i class="bx bx-phone"></i> <a href="tel:+27123456789">+27 12 345 6789</a></li>
            <li><i class="bx bx-map"></i> 123 Tech Street, Cape Town, South Africa</li>
          </ul>
        </div>

        <!-- Right: Socials -->
        <div class="footer-right">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="#"><i class="bx bxl-twitter"></i></a>
            <a href="#"><i class="bx bxl-linkedin"></i></a>
            <a href="https://www.instagram.com/weblaunch_inc?utm_source=qr" target="_blank"><i
                class="bx bxl-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import axios from "axios";
import UserSidebar from "@/components/UserSidebar.vue";
export default {
  data() {
    return {
      stats: [
        { number: "50,000+", label: "Students" },
        { number: "24/7", label: "Support" },
      ],
      courses: [],
      loading: false,
      error: null,
      userEnrollments: [],
      userData: null
    };
  },
  methods: {
    async fetchCourses() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:9090/courses");
        this.courses = response.data;

        if (this.isAuthenticated()) {
          await this.fetchUserEnrollments();
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        this.error = "Failed to load courses. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    async fetchUserEnrollments() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:9090/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.userEnrollments = response.data.enrollments || [];
        this.userData = response.data.user;
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    },

    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    },

    isEnrolled(courseId) {
      return this.userEnrollments.some(e => e.course_id === courseId);
    },

    async enroll(courseId) {
      if (!this.isAuthenticated()) {
        alert('Please login to enroll in courses');
        this.$router.push('/login');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          "http://localhost:9090/enrollments",
          { course_id: courseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          alert('Successfully enrolled in the course! The course fee has been added to your payment balance.');
          await this.fetchUserEnrollments();
        }
      } catch (error) {
        console.error("Enrollment failed:", error);
        const message = error.response?.data?.message ||
          error.response?.data?.error ||
          'Enrollment failed. Please try again.';
        alert(message);
      }
    }
  },
  mounted() {
    this.fetchCourses();
  },
  components: {
    UserSidebar
  }
};
</script>

<style scoped>
.Courses {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

.banner {
  background: linear-gradient(135deg, #000 0%, #222 100%);
  padding: 4rem 2rem;
  border-bottom: 5px solid orange;
  position: relative;
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.banner h1 {
  font-size: 3rem;
  color: orange;
  margin-bottom: 1rem;
}

.banner .subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.banner-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
}

.stat-number {
  font-size: 2rem;
  color: orange;
  font-weight: bold;
}

/* Courses Grid */
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.section-title {
  color: orange;
  text-align: center;
  margin-bottom: 2rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.course-card {
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
}

.course-img-container {
  height: 180px;
  position: relative;
  overflow: hidden;
}

.course-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-hover-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.course-img-container:hover .card-hover-info {
  opacity: 1;
}

.card-hover-info h4 {
  color: orange;
  margin-bottom: 1rem;
}

.course-info {
  padding: 1.5rem;
}

.course-info h3 {
  color: orange;
  margin-bottom: 0.5rem;
}

.price-section {
  margin: 1rem 0;
}

.enroll-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: orange;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.enroll-btn:hover {
  background: orange;
}

/* Footer */
.landing-footer {
  background: #111;
  padding: 3rem 2rem;
  border-top: 2px solid orange;
  color: #ccc;
  font-size: 0.95rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  text-align: center;
}

.footer-left {
  text-align: center;
}

.footer-logo {
  color: orange;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.footer-middle h3,
.footer-right h3 {
  color: orange;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-middle ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-middle li {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.footer-middle a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-middle a:hover {
  color: orange;
}

.footer-right .social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.footer-right .social-icons a {
  color: orange;
  font-size: 1.5rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.footer-right .social-icons a:hover {
  transform: scale(1.2);
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-middle li {
    justify-content: center;
  }
}
</style>

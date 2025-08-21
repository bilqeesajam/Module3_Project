<template>
  <UserSidebar />
  <section class="PriceList">
    <div class="container">
      <h2 class="section-title">Our Website Packages</h2>
      <div class="packages-grid">

        <!-- Starter Package -->
        <div class="package-card">
          <div class="package-header">
            <h4>Starter</h4>
          </div>
          <div class="package-body">
            <h2 class="price">R1,500</h2>
            <ul>
              <li>1-3 Pages</li>
              <li>Mobile-Friendly</li>
              <li>Basic SEO</li>
              <li>1 Revision</li>
            </ul>
            <button class="enroll-btn" data-bs-toggle="modal" data-bs-target="#packageForm"
              @click="setPackage('Starter')">
              Get Started
            </button>
          </div>
        </div>

        <!-- Professional Package -->
        <div class="package-card highlighted">
          <div class="package-header highlighted">
            <h4>Professional</h4>
          </div>
          <div class="package-body">
            <h2 class="price">R3,500</h2>
            <ul>
              <li>Up to 6 Pages</li>
              <li>Custom Design</li>
              <li>Social Media Integration</li>
              <li>3 Revisions</li>
            </ul>
            <button class="enroll-btn" data-bs-toggle="modal" data-bs-target="#packageForm"
              @click="setPackage('Professional')">
              Choose Plan
            </button>
          </div>
        </div>

        <!-- Business Plus Package -->
        <div class="package-card">
          <div class="package-header">
            <h4>Business Plus</h4>
          </div>
          <div class="package-body">
            <h2 class="price">R6,000</h2>
            <ul>
              <li>Up to 10 Pages</li>
              <li>E-commerce</li>
              <li>Advanced SEO</li>
              <li>Monthly Maintenance</li>
            </ul>
            <button class="enroll-btn" data-bs-toggle="modal" data-bs-target="#packageForm"
              @click="setPackage('Business Plus')">
              Go Premium
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="packageForm" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #000; color: orange;">
            <h5 class="modal-title">Order Your Package</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label class="form-label">Package Selected</label>
                <input type="text" class="form-control" v-model="selectedPackage" readonly>
              </div>
              <div class="mb-3">
                <label class="form-label">Additional Details</label>
                <textarea class="form-control" rows="3" v-model="requirements"></textarea>
              </div>
              <button type="submit" class="enroll-btn">Submit</button>
              <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
              <p v-if="successMessage" class="text-success mt-3 text-center">{{ successMessage }}</p>
            </form>
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
            <a href="https://www.instagram.com/weblaunch_inc?utm_source=qr" target="_blank"><i class="bx bxl-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
import UserSidebar from '@/components/UserSidebar.vue';

export default {
  data() {
    return {
      selectedPackage: '',
      requirements: '',
      error: '',
      successMessage: '',
      packagePrices: {
        'Starter': 1500.00,
        'Professional': 3500.00,
        'Business Plus': 6000.00
      }
    }
  },
  methods: {
    setPackage(name) {
      this.selectedPackage = name;
      this.error = '';
      this.successMessage = '';
    },
    async submitForm() {
      if (!this.selectedPackage) {
        this.error = 'Please select a package';
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        this.error = 'You need to be logged in to submit an order';
        return;
      }

      try {
        const response = await fetch('http://localhost:9090/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            package_type: this.selectedPackage.toLowerCase(),
            requirements: this.requirements,
            price: this.packagePrices[this.selectedPackage]
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit order');
        }

        this.successMessage = 'Your order has been submitted successfully!';
        this.requirements = '';

        // Close modal after 2 seconds
        setTimeout(() => {
          const modal = bootstrap.Modal.getInstance(document.getElementById('packageForm'));
          if (modal) modal.hide();
          this.successMessage = '';
        }, 2000);
      } catch (error) {
        console.error('Order submission error:', error);
        this.error = error.message;
      }
    }
  },
  components: {
    UserSidebar
  }
}
</script>

<style scoped>
h2 {
  padding: 1.5rem;
}

.PriceList {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.section-title {
  color: orange;
  text-align: center;
  margin-bottom: 2rem;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.package-card {
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 2px solid transparent;
}

.package-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
}

.package-header {
  background: #222;
  text-align: center;
  padding: 1rem;
}

.package-header h4 {
  color: orange;
  margin: 0;
}

.package-body {
  padding: 1.5rem;
  text-align: center;
}

.price {
  color: orange;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.package-body ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.package-body li {
  margin: 0.5rem 0;
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
  background: #ff9c33;
}

.highlighted {
  border-color: orange;
}

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
</style>
<template>
  <section class="center-section">
    <div class="container text-center">
      <h2 class="mb-5" style="color: #FFA500;">Our Website Packages</h2>
      <div class="row g-4 w-100">
        <!-- Starter Package -->
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow">
            <div class="card-header text-white" style="background-color: #001F3F;">
              <h4 class="my-2">Starter</h4>
            </div>
            <div class="card-body">
              <h2 style="color: #FF851B;">R1,500</h2>
              <ul class="list-unstyled mt-3 mb-4">
                <li>1–3 Pages</li>
                <li>Mobile-Friendly</li>
                <li>Basic SEO</li>
                <li>1 Revision</li>
              </ul>
              <button
                class="btn text-white"
                style="background-color: #FF851B;"
                data-bs-toggle="modal"
                data-bs-target="#packageForm"
                @click="setPackage('Starter')"
              >Get Started</button>
            </div>
          </div>
        </div>

        <!-- Professional Package -->
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow" style="border: 2px solid #FF851B;">
            <div class="card-header text-white" style="background-color: #FF851B;">
              <h4 class="my-2">Professional</h4>
            </div>
            <div class="card-body">
              <h2 style="color: #001F3F;">R3,500</h2>
              <ul class="list-unstyled mt-3 mb-4">
                <li>Up to 6 Pages</li>
                <li>Custom Design</li>
                <li>Social Media Integration</li>
                <li>3 Revisions</li>
              </ul>
              <button
                class="btn text-white"
                style="background-color: #001F3F;"
                data-bs-toggle="modal"
                data-bs-target="#packageForm"
                @click="setPackage('Professional')"
              >Choose Plan</button>
            </div>
          </div>
        </div>

        <!-- Business Plus Package -->
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow">
            <div class="card-header text-white" style="background-color: #001F3F;">
              <h4 class="my-2">Business Plus</h4>
            </div>
            <div class="card-body">
              <h2 style="color: #FF851B;">R6,000</h2>
              <ul class="list-unstyled mt-3 mb-4">
                <li>Up to 10 Pages</li>
                <li>E-commerce</li>
                <li>Advanced SEO</li>
                <li>Monthly Maintenance</li>
              </ul>
              <button
                class="btn text-white"
                style="background-color: #FF851B;"
                data-bs-toggle="modal"
                data-bs-target="#packageForm"
                @click="setPackage('Business Plus')"
              >Go Premium</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bootstrap Modal Form -->
  <div class="modal fade" id="packageForm" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #001F3F; color: white;">
          <h5 class="modal-title">Order Your Package</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label class="form-label">Your Name</label>
              <input type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Package Selected</label>
              <input type="text" id="packageName" class="form-control" :value="selectedPackage" readonly>
            </div>
            <div class="mb-3">
              <label class="form-label">Additional Details</label>
              <textarea class="form-control" rows="3"></textarea>
            </div>
            <button type="submit" class="btn text-white" style="background-color: #FF851B;">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPackage: ''
    }
  },
  methods: {
    setPackage(name) {
      this.selectedPackage = name;
    },
    submitForm() {
      alert('Your order has been submitted!');
    }
  }
}
</script>

<style>
.center-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #112B4A;
}

.container {
  background: none;
}

.card {
  border-radius: 16px;
}

.modal-content {
  border-radius: 16px;
}
</style>
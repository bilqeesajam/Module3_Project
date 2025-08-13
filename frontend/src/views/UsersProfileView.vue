<template>
  <div class="profile-container">
    <div class="profile-card" v-if="!loading">
      <div class="profile-header">
        <img 
          class="profile-avatar" 
          :src="`https://ui-avatars.com/api/?name=${user.username}&background=205781&color=fff`" 
          alt="User Avatar" 
        />
        <h2>{{ user.username }}</h2>
        <p class="profile-role">{{ user.role }}</p>
      </div>

      <div class="profile-details">
        <h4>Account Details</h4>
        <ul>
          <li><strong>Email:</strong> {{ user.email_address }}</li>
          <li><strong>Phone:</strong> {{ user.phone_number }}</li>
          <li><strong>Joined:</strong> {{ formatDate(user.created_at) }}</li>
        </ul>

        <h4>Enrolled Courses</h4>
        <ul v-if="enrollments.length">
          <li v-for="enrollment in enrollments" :key="enrollment.course_id">
            {{ enrollment.title }} - 
            <span :class="enrollment.status">{{ enrollment.status }}</span>
            <span>({{ enrollment.progress }}% complete)</span>
          </li>
        </ul>
        <p v-else class="empty-text">No courses enrolled yet</p>

        <h4>Recent Orders</h4>
        <ul v-if="orders.length">
          <li v-for="order in orders" :key="order.order_id">
            {{ order.package_type }} package - 
            <span :class="order.status">{{ order.status }}</span> 
            (R{{ order.price }})
          </li>
        </ul>
        <p v-else class="empty-text">No orders yet</p>

        <router-link to="/editprofile" class="edit-btn">Edit Profile</router-link>
      </div>
    </div>

    <div v-else class="loading-text">Loading profile...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const user = ref({});
const enrollments = ref([]);
const orders = ref([]);
const loading = ref(true);

// TEMP: test data (replace with API call later)
async function fetchProfile() {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 500)); // fake delay

  user.value = {
    user_id: 2,
    username: "sarah_m",
    email_address: "sarah.meyer@gmail.com",
    phone_number: "0710000002",
    role: "student",
    created_at: "2025-07-02"
  };

  enrollments.value = [
    { course_id: 1, title: "HTML", progress: 25.0, status: "active" },
    { course_id: 4, title: "Node.js and Express", progress: 0.0, status: "active" },
    { course_id: 7, title: "MySQL and APIs", progress: 10.0, status: "active" },
    { course_id: 3, title: "JavaScript", progress: 20.0, status: "active" }
  ];

  orders.value = [
    { order_id: 1, package_type: "starter", status: "pending", price: 1500.00 },
    { order_id: 2, package_type: "business", status: "in progress", price: 5000.00 }
  ];

  loading.value = false;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

onMounted(fetchProfile);
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: #112B4A;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.profile-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(32, 87, 129, 0.15);
  max-width: 420px;
  width: 100%;
  padding: 2rem 2.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(32, 87, 129, 0.25);
}
.profile-header {
  margin-bottom: 2rem;
}
.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid #205781;
  margin-bottom: 1rem;
}
.profile-role {
  color: #FFA500;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}
.profile-details h4 {
  color: #205781;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.profile-details ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  color: #205781;
  text-align: left;
}
.profile-details li {
  margin-bottom: 0.5rem;
}
.completed {
  color: #28a745;
  font-weight: bold;
}
.active {
  color: #FFA500;
  font-weight: bold;
}
.pending {
  color: #FFA500;
  font-weight: bold;
}
.in\ progress {
  color: #17a2b8;
  font-weight: bold;
}
.empty-text {
  color: #777;
  font-style: italic;
}
.loading-text {
  color: #fff;
  font-size: 1.2rem;
}
.edit-btn {
  display: inline-block;
  margin-top: 1rem;
  background: #FFA500;
  color: #205781;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;
}
.edit-btn:hover {
  background: #205781;
  color: #fff;
}
</style>

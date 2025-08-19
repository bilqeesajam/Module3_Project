<template>
  <UserSidebar/>
  <div class="profile-container">
    <div class="profile-card" v-if="!loading && user">
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
          <li><strong>Member Since:</strong> {{ formatDate(user.created_at) }}</li>
        </ul>

        <h4>Enrolled Courses</h4>
        <ul v-if="enrollments.length">
          <li v-for="enrollment in enrollments" :key="enrollment.enrollment_id">
            {{ enrollment.title }} - 
            <span :class="enrollment.status.toLowerCase()">{{ enrollment.status }}</span>
            <span>({{ enrollment.progress }}% complete)</span>
          </li>
        </ul>
        <p v-else class="empty-text">No courses enrolled yet</p>

        <h4>Recent Orders</h4>
        <ul v-if="orders.length">
          <li v-for="order in orders" :key="order.order_id">
            {{ order.package_type }} package - 
            <span :class="order.status.toLowerCase().replace(' ', '-')">{{ order.status }}</span> 
            (R{{ order.price }})
          </li>
        </ul>
        <p v-else class="empty-text">No orders yet</p>

        <h4 v-if="payments.length">Payment History</h4>
        <ul v-if="payments.length">
          <li v-for="payment in payments" :key="payment.payment_id">
            R{{ payment.amount_paid }} via {{ payment.payment_method }} 
            <span :class="payment.status">{{ payment.status }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="loading" class="loading-text">Loading profile...</div>
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script>
import UserSidebar from "@/components/UserSidebar.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = ref(null);
    const enrollments = ref([]);
    const orders = ref([]);
    const payments = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();

    const fetchProfile = async () => {
      try {
        loading.value = true;
        const token = localStorage.getItem('token');

        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:9090/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch profile data');
        
        const data = await response.json();
        user.value = data.user;
        enrollments.value = data.enrollments;
        orders.value = data.orders;
        payments.value = data.payments;

      } catch (err) {
        error.value = err.message;
        console.error('Profile fetch error:', err);
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    onMounted(fetchProfile);

    return { user, enrollments, orders, payments, loading, error, formatDate };
  },
  components: {
    UserSidebar
  }
};
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  color: #fff;
}

.profile-card {
  background: #111;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.15);
  max-width: 480px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
}

.profile-header {
  margin-bottom: 2rem;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid orange;
  margin-bottom: 1rem;
}

.profile-role {
  color: orange;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.profile-details h4 {
  color: orange;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: left;
}

.profile-details ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  color: #ddd;
  text-align: left;
}

.profile-details li {
  margin-bottom: 0.5rem;
}

/* Status Colors */
.completed { color: #28a745; font-weight: bold; }
.pending { color: #ffc107; font-weight: bold; }
.in-progress { color: #17a2b8; font-weight: bold; }
.active { color: orange; font-weight: bold; }
.failed { color: #dc3545; font-weight: bold; }

.empty-text {
  color: #aaa;
  font-style: italic;
}

.loading-text {
  color: orange;
  font-size: 1.2rem;
}

.error-text {
  color: #dc3545;
  font-weight: bold;
}
</style>

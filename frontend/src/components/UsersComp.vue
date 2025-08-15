<template>
  <div class="orders-container">
    <h2>Orders</h2>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Username</th>
          <th>Package</th>
          <th>Requirements</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order_id">
          <td>{{ order.order_id }}</td>
          <td>{{ order.username }}</td>
          <td>{{ order.package_name }}</td>
          <td>{{ order.requirements }}</td>
          <td>
            <span :class="['status-badge', order.status === 'completed' ? 'completed' : 'in-progress']">
              {{ order.status }}
            </span>
          </td>
          <td>R {{ formatPrice(order.amount) }}</td>
          <td>{{ formatDate(order.created_at) }}</td>
          <td>
            <button v-if="order.status !== 'completed'" @click="markCompleted(order)">
              ✓
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);

const formatPrice = (val) => {
  if (val === null || val === undefined || isNaN(val)) return "0.00";
  return Number(val).toFixed(2);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fetchOrders = async () => {
  try {
    const res = await axios.get("http://localhost:9090/orders");
    orders.value = res.data;
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }
};

const markCompleted = async (order) => {
  try {
    await axios.put(`http://localhost:9090/orders/${order.order_id}`, {
      status: "completed",
    });
    order.status = "completed";
  } catch (err) {
    console.error("Failed to update order:", err);
  }
};

onMounted(fetchOrders);
</script>

<style scoped>
.orders-container {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #001F3F;
  border-bottom: 2px solid #FF851B;
  padding-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #001F3F;
}

th,
td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 0.95rem;
}

th {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #fff;
}

tbody tr:hover {
  background-color: #f0f2f5;
  transition: background-color 0.2s ease;
}

button {
  background-color: #FF851B;
  color: white;
  border: none;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #e07314;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.85rem;
  color: #fff;
}

.status-badge.completed {
  background-color: #001F3F;
}

.status-badge.in-progress {
  background-color: #FF851B;
  color: #001F3F;
}
</style>

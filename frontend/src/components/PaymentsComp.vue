<template>
  <UserSidebar/>
  <div class="payments-container">
    <div class="payments-card">
      <h2>Payments</h2>

      <div class="payment-section">
        <h4>Make a Payment</h4>
        <form @submit.prevent="makePayment" class="payment-form">
          <div class="form-group">
            <label for="amount">Amount:</label>
            <input v-model="payment.amount" id="amount" type="number" required />
          </div>

          <div class="form-group">
            <label for="method">Payment Method:</label>
            <select v-model="payment.method" id="method" required>
              <option value="" disabled>Select method</option>
              <option value="card">Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <button type="submit" class="pay-btn">Pay</button>
        </form>

        <div v-if="paymentResult" class="result-box">
          <p v-if="paymentResult.success" class="success">{{ paymentResult.message }}</p>
          <p v-if="paymentResult.outstanding_balance !== undefined" class="balance">
            Outstanding Balance: 
            <span v-if="paymentResult.outstanding_balance > 0">R{{ paymentResult.outstanding_balance }}</span>
            <span v-else>Nothing to pay off</span>
          </p>
          <p v-if="paymentResult.error" class="error">{{ paymentResult.error }}</p>
        </div>
      </div>

      <div class="payment-section">
        <h4>Payment History</h4>
        <div class="table-wrapper">
          <table class="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount Paid</th>
                <th>Outstanding</th>
                <th>Total</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in history" :key="payment.payment_id">
                <td>{{ payment.payment_id }}</td>
                <td>R{{ payment.amount_paid }}</td>
                <td>R{{ payment.outstanding_balance }}</td>
                <td>R{{ payment.total_amount }}</td>
                <td>{{ payment.payment_method }}</td>
                <td :class="payment.status.toLowerCase().replace(' ', '-')">{{ payment.status }}</td>
                <td>{{ new Date(payment.created_at).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="!history.length" class="empty-text">No payments made yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserSidebar from "./UserSidebar.vue";

export default {
  data() {
    return {
      payment: {
        amount: "",
        method: "",
      },
      paymentResult: null,
      history: [],
    };
  },
  methods: {
    async makePayment() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.post(
          "http://localhost:9090/payments/complete",
          this.payment,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.paymentResult = response.data;
        this.fetchHistory();
      } catch (err) {
        console.error(err);
        this.paymentResult = { error: "Payment failed. Try again." };
      }
    },
    async fetchHistory() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:9090/payments/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.history = response.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetchHistory();
  },
  components: {
    UserSidebar
  }
};
</script>

<style scoped>
.payments-container {
  min-height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  color: #fff;
}

.payments-card {
  background: #111;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.15);
  max-width: 900px;
  width: 100%;
  padding: 2rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.payments-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
}

.payment-section {
  margin-bottom: 2rem;
}

h2, h4 {
  color: orange;
  margin-bottom: 1rem;
}

.payment-form {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 0.3rem;
}

input, select {
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #222;
  color: #fff;
}

input::placeholder {
  color: #aaa;
}

.pay-btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: orange;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.pay-btn:hover {
  background: #ffb347;
}

.result-box {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #222;
}

.success {
  color: #28a745;
  font-weight: bold;
}

.error {
  color: #dc3545;
  font-weight: bold;
}

.balance {
  margin-top: 0.5rem;
  font-weight: bold;
  color: orange;
}

/* Table Styling */
.table-wrapper {
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: #111;
}

.history-table th, .history-table td {
  border: 1px solid #333;
  padding: 0.7rem;
  text-align: center;
  white-space: nowrap;
}

.history-table th {
  background: orange;
  color: #fff;
}

.completed { color: #28a745; font-weight: bold; }
.pending { color: #ffc107; font-weight: bold; }
.failed { color: #dc3545; font-weight: bold; }

.empty-text {
  color: #aaa;
  font-style: italic;
  margin-top: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .payment-form {
    flex-direction: column;
  }

  .pay-btn {
    width: 100%;
  }

  .payments-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .payments-card {
    padding: 1rem;
  }

  h2, h4 {
    font-size: 1.2rem;
  }

  .history-table th, .history-table td {
    padding: 0.5rem;
  }
}
</style>

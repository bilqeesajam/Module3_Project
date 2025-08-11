<template>
  <div class="container py-4">
    <h1 class="text-center mb-2" style="color: #205781; font-weight: 700;">Hello Admin</h1>
    <!-- Stats Cards -->
    <div class="row mb-5">
      <div class="col-md-3" v-for="stat in stats" :key="stat.title">
        <div class="card shadow-sm text-center py-4" style="border-left: 5px solid #FF851B;">
          <h5 style="color: #001F3F;">{{ stat.title }}</h5>
          <h2 style="color: #FF851B;">{{ stat.value }}</h2>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm chart-card">
          <h5 style="color: #001F3F;">Student Enrollments Over Time</h5>
          <canvas id="enrollmentsChart"></canvas>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm chart-card">
          <h5 style="color: #001F3F;">Orders Status Distribution</h5>
          <canvas id="ordersStatusChart"></canvas>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm chart-card">
          <h5 style="color: #001F3F;">Revenue by Package Type</h5>
          <canvas id="revenueChart"></canvas>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm chart-card">
          <h5 style="color: #001F3F;">Top 5 Courses by Enrollment</h5>
          <canvas id="topCoursesChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const stats = ref([
  { title: "Active Students", value: 120 },
  { title: "Total Orders", value: 85 },
  { title: "Completed Orders", value: 60 },
  { title: "Total Revenue (ZAR)", value: "R 250,000" },
]);

onMounted(() => {
  // Enrollment over time (dummy)
  new Chart(document.getElementById("enrollmentsChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Enrollments",
          data: [12, 19, 14, 20, 22, 30, 25],
          borderColor: "#FF851B",
          backgroundColor: "rgba(255, 133, 27, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  // Orders status distribution (dummy)
  new Chart(document.getElementById("ordersStatusChart"), {
    type: "pie",
    data: {
      labels: ["Pending", "In Progress", "Completed"],
      datasets: [
        {
          data: [15, 20, 50],
          backgroundColor: ["#FF851B", "#001F3F", "#FFA65C"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Revenue by package type (dummy)
  new Chart(document.getElementById("revenueChart"), {
    type: "bar",
    data: {
      labels: ["Starter", "Business", "E-commerce"],
      datasets: [
        {
          label: "Revenue (ZAR)",
          data: [35000, 85000, 130000],
          backgroundColor: "#FF851B",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  // Top 5 courses by enrollment (dummy)
  new Chart(document.getElementById("topCoursesChart"), {
    type: "bar",
    data: {
      labels: ["JavaScript", "HTML", "CSS", "Vue.js", "Node.js"],
      datasets: [
        {
          label: "Enrollments",
          data: [45, 40, 38, 32, 25],
          backgroundColor: "#001F3F",
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: "y",
      scales: {
        x: { beginAtZero: true },
      },
    },
  });
});
</script>

<style>
body {
  background-color: #f8f9fa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.card {
  border-radius: 10px;
}
.chart-card {
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chart-card canvas {
  flex: 1 1 auto;
  max-height: 220px;
}
</style>
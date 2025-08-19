<template>
  <AdminSidebar/>
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
import axios from "axios";
import Chart from "chart.js/auto";
import AdminSidebar from "@/components/AdminSidebar.vue";

const stats = ref([]);

onMounted(async () => {
  try {
    // Fetch stats
    const statsRes = await axios.get("http://localhost:9090/dashboard/stats");
    stats.value = [
      { title: "Active Students", value: statsRes.data.activeStudents },
      { title: "Total Orders", value: statsRes.data.totalOrders },
      { title: "Completed Orders", value: statsRes.data.completedOrders },
      { title: "Total Revenue (ZAR)", value: `R ${Number(statsRes.data.totalRevenue).toLocaleString()}` }
    ];

    // Fetch charts
    const enrollmentsRes = await axios.get("http://localhost:9090/dashboard/enrollments-over-time");
    new Chart(document.getElementById("enrollmentsChart"), {
      type: "line",
      data: {
        labels: enrollmentsRes.data.map(row => row.month),
        datasets: [{
          label: "Enrollments",
          data: enrollmentsRes.data.map(row => row.count),
          borderColor: "#FF851B",
          backgroundColor: "rgba(255, 133, 27, 0.2)",
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    const ordersStatusRes = await axios.get("http://localhost:9090/dashboard/orders-status");
    new Chart(document.getElementById("ordersStatusChart"), {
      type: "pie",
      data: {
        labels: ordersStatusRes.data.map(row => row.status),
        datasets: [{
          data: ordersStatusRes.data.map(row => row.count),
          backgroundColor: ["#FF851B", "#111", "#FFA65C"]
        }]
      }
    });

    const revenueRes = await axios.get("http://localhost:9090/dashboard/revenue-by-package");
    new Chart(document.getElementById("revenueChart"), {
      type: "bar",
      data: {
        labels: revenueRes.data.map(row => row.package_type),
        datasets: [{
          label: "Revenue (ZAR)",
          data: revenueRes.data.map(row => row.total_revenue),
          backgroundColor: "#FF851B"
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    const topCoursesRes = await axios.get("http://localhost:9090/dashboard/top-courses");
    new Chart(document.getElementById("topCoursesChart"), {
      type: "bar",
      data: {
        labels: topCoursesRes.data.map(row => row.title),
        datasets: [{
          label: "Enrollments",
          data: topCoursesRes.data.map(row => row.enrollment_count),
          backgroundColor: "#111"
        }]
      },
      options: { responsive: true, indexAxis: "y", scales: { x: { beginAtZero: true } } }
    });

  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
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

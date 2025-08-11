<template>
    <div class="container my-5">
        <h2 class="mb-4">Users & Orders Dashboard</h2>
        <!-- Users Table -->
        <div class="row">
            <div class="col-12">
                <h4>Users</h4>
                <table class="table table-striped table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.user_id">
                            <td>{{ user.user_id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email_address }}</td>
                            <td>{{ user.phone_number }}</td>
                            <td>
                                <span class="badge" :class="{
                                    'bg-primary': user.role === 'admin',
                                    'bg-success': user.role === 'student',
                                    'bg-secondary': user.role === 'consumer'
                                }">
                                    {{ user.role }}
                                </span>
                            </td>
                            <td>{{ user.created_at }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Orders Table -->
        <div class="row mt-5">
            <div class="col-12">
                <h4>Orders</h4>
                <table class="table table-striped table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Package</th>
                            <th>Requirements</th>
                            <th>Status</th>
                            <th>Price (ZAR)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.order_id">
                            <td>{{ order.order_id }}</td>
                            <td>{{ order.username }}</td>
                            <td>{{ order.package_name }}</td>
                            <td>{{ order.requirements }}</td>
                            <td>
                                <span class="badge me-2" :class="{
                                    'bg-warning text-dark': order.status === 'pending',
                                    'bg-info text-dark': order.status === 'in progress',
                                    'bg-success': order.status === 'completed'
                                }">
                                    {{ order.status }}
                                </span>
                                <button v-if="order.status === 'pending' || order.status === 'in progress'"
                                    class="btn btn-sm btn-outline-success ms-2" @click="markCompleted(order)"
                                    title="Mark as Completed">
                                    ✓
                                </button>
                            </td>
                            <td>{{ order.amount.toFixed(2) }}</td>
                            <td>{{ order.created_at }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
    {
        user_id: 1,
        username: "bilal_admin",
        email_address: "bilal.khan@weblaunch.com",
        phone_number: "0710000001",
        role: "admin",
        created_at: "2025-07-01"
    },
    {
        user_id: 2,
        username: "sarah_m",
        email_address: "sarah.meyer@gmail.com",
        phone_number: "0710000002",
        role: "student",
        created_at: "2025-07-02"
    },
    {
        user_id: 3,
        username: "thabo_d",
        email_address: "thabo.dlamini@yahoo.com",
        phone_number: "0710000003",
        role: "student",
        created_at: "2025-07-03"
    },
    {
        user_id: 4,
        username: "amy_lee",
        email_address: "amy.lee@hotmail.com",
        phone_number: "0710000004",
        role: "student",
        created_at: "2025-07-04"
    },
    {
        user_id: 5,
        username: "john_smith",
        email_address: "john.smith@gmail.com",
        phone_number: "0710000005",
        role: "consumer",
        created_at: "2025-07-05"
    },
    {
        user_id: 6,
        username: "fatima_p",
        email_address: "fatima.patel@outlook.com",
        phone_number: "0710000006",
        role: "consumer",
        created_at: "2025-07-06"
    },
    {
        user_id: 7,
        username: "michael_b",
        email_address: "michael.brown@yahoo.com",
        phone_number: "0710000007",
        role: "consumer",
        created_at: "2025-07-07"
    },
    {
        user_id: 8,
        username: "linda_v",
        email_address: "linda.vanrensburg@gmail.com",
        phone_number: "0710000008",
        role: "consumer",
        created_at: "2025-07-08"
    },
    {
        user_id: 9,
        username: "kevin_r",
        email_address: "kevin.ross@gmail.com",
        phone_number: "0710000009",
        role: "consumer",
        created_at: "2025-07-09"
    },
    {
        user_id: 10,
        username: "nadia_k",
        email_address: "nadia.khan@webmail.com",
        phone_number: "0710000010",
        role: "consumer",
        created_at: "2025-07-10"
    }
]);

const orders = ref([
    {
        order_id: 1,
        user_id: 5,
        username: "john_smith",
        package_name: "starter",
        requirements: "Basic company website with contact form",
        status: "pending",
        amount: 1500.0,
        created_at: "2025-07-11"
    },
    {
        order_id: 2,
        user_id: 6,
        username: "fatima_p",
        package_name: "business",
        requirements: "Business portfolio site with blog",
        status: "in progress",
        amount: 5000.0,
        created_at: "2025-07-12"
    },
    {
        order_id: 3,
        user_id: 7,
        username: "michael_b",
        package_name: "e-commerce",
        requirements: "Online shop with 50 products",
        status: "completed",
        amount: 12000.0,
        created_at: "2025-07-13"
    },
    {
        order_id: 4,
        user_id: 8,
        username: "linda_v",
        package_name: "starter",
        requirements: "Personal blog setup",
        status: "pending",
        amount: 1000.0,
        created_at: "2025-07-14"
    },
    {
        order_id: 5,
        user_id: 9,
        username: "kevin_r",
        package_name: "business",
        requirements: "Restaurant website with booking system",
        status: "completed",
        amount: 7500.0,
        created_at: "2025-07-15"
    },
    {
        order_id: 6,
        user_id: 10,
        username: "nadia_k",
        package_name: "starter",
        requirements: "Artist portfolio site",
        status: "in progress",
        amount: 2000.0,
        created_at: "2025-07-16"
    },
    {
        order_id: 7,
        user_id: 5,
        username: "john_smith",
        package_name: "e-commerce",
        requirements: "Shop with payment gateway",
        status: "completed",
        amount: 11000.0,
        created_at: "2025-07-17"
    },
    {
        order_id: 8,
        user_id: 6,
        username: "fatima_p",
        package_name: "business",
        requirements: "Corporate intranet portal",
        status: "pending",
        amount: 8500.0,
        created_at: "2025-07-18"
    },
    {
        order_id: 9,
        user_id: 7,
        username: "michael_b",
        package_name: "starter",
        requirements: "Landing page for campaign",
        status: "completed",
        amount: 900.0,
        created_at: "2025-07-19"
    },
    {
        order_id: 10,
        user_id: 8,
        username: "linda_v",
        package_name: "e-commerce",
        requirements: "Fashion store with payment and delivery tracking",
        status: "in progress",
        amount: 13000.0,
        created_at: "2025-07-20"
    }
]);
</script>

<style scoped>
h2,
h4 {
    color: #0d3b66;
    /* Navy blue */
}

.badge {
    font-weight: 600;
    font-size: 0.9rem;
}
</style>
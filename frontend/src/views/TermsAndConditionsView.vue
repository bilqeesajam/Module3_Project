<template>
    <div class="terms-wrapper">
        <form method="post" class="terms-form">
            <h1>Terms and Conditions</h1>
            <br>
            <section>
                <p><strong>Effective Date:</strong> 22nd August, 2025</p>
                <p><strong>Last Updated:</strong> 22nd August, 2025</p>
                <p>
                    Welcome to <strong>Weblaunch</strong> (“Company,” “we,” “us,” or “our”).
                    By using our website <strong>Weblaunch.com</strong> (“Site”) or purchasing our products and
                    services,
                    you agree to the following terms and conditions (“Terms”). Please read them carefully.
                </p>
            </section>
            <br>
            <hr>
            <br>
            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using our Site, services, or products, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms. If you do not agree, you must not use our Site
                    or purchase our services.
                </p>
            </section>
            <br>
            <section>
                <h2>2. Eligibility</h2>
                <p>
                    You must be at least 18 years old (or the legal age in your jurisdiction) to use our services.
                    By using the Site, you represent and warrant that you meet these eligibility requirements.
                </p>
            </section>
            <br>
            <section>
                <h2>3. Account Registration</h2>
                <ul>
                    <li>Some services, such as online courses, require creating an account.</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
                </ul>
            </section>
            <br>
            <section>
                <h2>4. Services Offered</h2>
                <ul>
                    <li><strong>Website Creation Services:</strong> Custom website design and development, hosting
                        setup, and related services.</li>
                    <li><strong>Online Coding Courses:</strong> Access to courses, tutorials, and related digital
                        content.</li>
                </ul>
                <p>
                    All services are provided “as is,” unless explicitly stated otherwise.
                    We reserve the right to modify, suspend, or discontinue any service at any time.
                </p>
            </section>
            <br>
            <section>
                <h2>5. Ordering and Payment</h2>
                <ul>
                    <li>All orders are subject to acceptance and availability.</li>
                    <li>Payments must be completed using the methods listed on the Site.</li>
                    <li>Prices are subject to change without notice.</li>
                    <li>For online courses, access is granted after full payment.</li>
                    <li>Refunds are provided according to our <strong>Refund Policy</strong> (see Section 6).</li>
                </ul>
            </section>
            <br>
            <section>
                <h2>6. Refunds and Cancellations</h2>
                <ul>
                    <li>All purchases, including website creation services and online coding courses, are final and
                        non-refundable.</li>
                    <li>Once payment is completed, no refunds or cancellations will be issued.</li>
                    <li>In the case of digital content delivery issues, we will work to resolve technical problems, but
                        this does not constitute a refund.</li>
                </ul>
            </section>
            <br>
            <section>
                <h2>7. Intellectual Property</h2>
                <ul>
                    <li>All content on the Site, including text, graphics, logos, and course material, is the property
                        of Weblaunch or its licensors.</li>
                    <li>You may not copy, distribute, modify, or create derivative works without our written consent.
                    </li>
                    <li>Website designs created for clients remain our intellectual property until full payment is
                        received, after which certain usage rights may be transferred.</li>
                </ul>
            </section>
            <br>
            <section>
                <h2>8. User Conduct</h2>
                <p>You agree not to:</p>
                <ul>
                    <li>Use the Site for illegal or fraudulent purposes.</li>
                    <li>Distribute malware or harmful content.</li>
                    <li>Attempt to hack, disrupt, or access restricted areas of our services.</li>
                    <li>Violate any applicable laws or regulations.</li>
                </ul>
            </section>
            <br>
            <section>
                <h2>9. Privacy</h2>
                <p>Your personal data is handled according to our <strong>Privacy Policy</strong>, which is incorporated
                    into these Terms by reference.</p>
            </section>
            <br>
            <section>
                <h2>10. Limitation of Liability</h2>
                <ul>
                    <li>We are not liable for any indirect, incidental, or consequential damages arising from your use
                        of our services.</li>
                    <li>We do not guarantee uninterrupted access or error-free operation.</li>
                    <li>You use our services at your own risk.</li>
                </ul>
            </section>
            <br>
            <section>
                <h2>11. Termination</h2>
                <p>We may suspend or terminate your access for:</p>
                <ul>
                    <li>Violation of these Terms</li>
                    <li>Non-payment</li>
                    <li>Other reasons deemed necessary by the Company</li>
                </ul>
                <p>
                    Upon termination, your access to paid content will be revoked, and any outstanding fees remain
                    payable.
                </p>
            </section>
            <br>
            <section>
                <h2>12. Governing Law</h2>
                <p>
                    These Terms are governed by the laws of South Africa.
                    Any disputes will be resolved in the courts of Cape Town.
                </p>
            </section>

            <section>
                <h2>13. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these Terms at any time. Updates will be posted on the Site with the
                    <strong>“Last Updated”</strong> date. Your continued use of the Site constitutes acceptance of the
                    updated Terms.
                </p>
            </section>
            <br>
            <section>
                <h2>14. Contact Information</h2>
                <p>If you have questions about these Terms, please contact us at:</p>
                <p><strong>Email:</strong> support@weblaunch.com</p>
                <p><strong>Phone:</strong> +27 12 345 6789</p>
                <p><strong>Address:</strong> 123 Tech Street, Cape Town, South Africa</p>
            </section>

            <div class="checkbox">
                <input type="checkbox" id="agreed" v-model="agreed" required />
                <label for="agree"> I agree to the Terms and Conditions</label>
            </div>

            <br>

            <button type="button" class="signup-btn" :disabled="!agreed" @click="$router.push('/signup')">
                Proceed to Sign up
            </button>
        </form>
    </div>
</template>
<script>
export default {
    name: "SignupButton",
    data() {
        return {
            agreed: false
        };
    },
    methods: {
        goToSignup() {
            this.$router.push("/signup");
        },
    },
};
</script>
<style scoped>
h2 {
    font-weight: bold;
}

.terms-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
    padding: 20px;
}

.terms-form {
    width: 90%;
    max-width: 850px;
    padding: 25px 30px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-height: 80vh;
    overflow-y: auto;
    text-align: center;
}

.terms-form h1 {
    margin-bottom: 20px;
    color: #222;
}

.terms-form h2 {
    margin-top: 20px;
    font-size: 1.3rem;
    color: #444;
}

.terms-form ul {
    list-style-type: none;
    margin: 10px auto;
    padding-left: 0;
    display: inline-block;
    text-align: center;
}

.terms-form p {
    margin: 8px 0;
}

.checkbox {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkbox label {
    margin-left: 8px;
}

.signup-btn {
    background-color: #007cf8;
    color: white;
    font-size: 16px;
    padding: 12px 28px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.signup-btn:disabled {
    background-color: #aaa;
    cursor: not-allowed;
    transform: none;
}

.signup-btn:hover:enabled {
    background-color: #003f7e;
    transform: scale(1.05);
}

.signup-btn:active:enabled {
    background-color: #003f7e;
    transform: scale(0.98);
}
</style>

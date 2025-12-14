import React from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';

const PrivacyPolicyScreen: React.FC = () => {
    return (
        <PageLayout title="Privacy Policy">
            <div className="p-4 lg:p-6">
                <Card className="prose dark:prose-invert max-w-none">
                    <h2>Privacy Policy for Venty</h2>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                    <p>
                        Venty Inc. (“we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, Venty (the “App”), and our related services. This policy is compliant with GDPR and other major data protection regulations.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>We may collect information about you in a variety of ways. The information we may collect via the App includes:</p>
                    <ul>
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and phone number, that you voluntarily give to us when you register for an account.</li>
                        <li><strong>Financial Data:</strong> Information related to your finances, such as income, expenses, budget categories, and financial goals, that you provide to use the App's features. This data is essential for the core functionality of the Service.</li>
                        <li><strong>Payment Information:</strong> When you make a purchase or subscribe to a plan, our third-party payment processors (e.g., Stripe, PayPal) collect your payment information. We do not store full payment card details on our servers.</li>
                        <li><strong>Merchant Data:</strong> If you register as a merchant, we collect information about your business, including brand name, address, product details, and store configuration.</li>
                        <li><strong>Device and Usage Data:</strong> Information our servers automatically collect when you access the App, such as your device model, operating system, IP address, and your activity within the App. This helps us improve our service.</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
                    <ul>
                        <li>Create and manage your account, including processing subscriptions and recurring billing.</li>
                        <li>Provide, maintain, and improve our budget tracking and financial management services.</li>
                        <li>Process payments and transactions within the marketplace.</li>
                        <li>Personalize your experience, such as showing relevant financial tips or ads (if applicable).</li>
                        <li>Monitor and analyze usage and trends to improve the App.</li>
                        <li>Communicate with you regarding your account, security alerts, and service updates.</li>
                        <li>Prevent fraudulent transactions and protect against criminal activity.</li>
                    </ul>

                    <h3>3. Disclosure of Your Information</h3>
                    <p>We are committed to not selling your personal data. We may share information we have collected about you in certain situations:</p>
                    <ul>
                        <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who perform services for us, such as payment processing (Stripe, PayPal), data analysis, and cloud hosting. These vendors are contractually obligated to protect your data.</li>
                        <li><strong>By Law or to Protect Rights:</strong> We may disclose your information if required by law or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
                    </ul>

                    <h3>4. Data Security and Encryption</h3>
                    <p>
                        We use administrative, technical, and physical security measures to protect your personal information. We implement strong security protocols, including <strong>AES-256 encryption</strong>, for sensitive data both in transit and at rest. While we have taken reasonable steps to secure your information, no security system is impenetrable.
                    </p>
                    
                    <h3>5. Communication and Fraud Prevention</h3>
                    <p>
                        To protect our users, we may use automated systems to monitor in-app communications to detect and prevent fraud, spam, and attempts to move transactions off-platform, which violates our Terms. This is used solely for the safety and security of the Venty community.
                    </p>

                    <h3>6. Your Data Rights and Choices (GDPR)</h3>
                    <p>
                        You have certain rights regarding the personal information we hold about you. These include the right to:
                    </p>
                    <ul>
                        <li><strong>Access:</strong> Request a copy of your personal data.</li>
                        <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
                        <li><strong>Erasure:</strong> Request that we delete your personal data ("Right to be Forgotten").</li>
                        <li><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format.</li>
                    </ul>
                    <p>You can exercise these rights through the app's settings or by contacting us. We provide tools to download or delete your data directly.</p>

                    <h3>7. Contact Us</h3>
                    <p>If you have questions about this Privacy Policy, please contact our Data Protection Officer at:</p>
                    <p><strong>Email:</strong> privacy@venty.app</p>
                </Card>
            </div>
        </PageLayout>
    );
};

export default PrivacyPolicyScreen;
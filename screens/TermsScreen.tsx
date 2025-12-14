import React from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';

const TermsScreen: React.FC = () => {
    return (
        <PageLayout title="Terms & Conditions">
            <div className="p-4 lg:p-6">
                <Card className="prose dark:prose-invert max-w-none">
                    <h2>Terms and Conditions for Venty</h2>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                    <p>
                        Welcome to Venty! These Terms and Conditions (“Terms”) govern your access to and use of the Venty mobile application (the “App”) and any related services (collectively, the “Services”) provided by Venty Inc. (“we,” “us,” or “our”).
                    </p>
                    <p>
                        By creating an account, accessing, or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services.
                    </p>

                    <h3>1. User Eligibility and Account Registration</h3>
                    <ul>
                        <li><strong>1.1. Eligibility:</strong> You must be at least 18 years old and capable of entering into a legally binding agreement to use our Services.</li>
                        <li><strong>1.2. Account Types:</strong> Venty offers several account types:
                            <ul>
                                <li><strong>Individual Accounts (Free):</strong> For personal use.</li>
                                <li><strong>Merchant Accounts:</strong> For users who wish to sell products on the marketplace.</li>
                                <li><strong>Premium/Pro Tiers:</strong> Paid subscription plans that unlock advanced features.</li>
                            </ul>
                        </li>
                        <li><strong>1.3. Account Security:</strong> You are responsible for safeguarding your account password and for any activities or actions under your account. Enabling Two-Factor Authentication (2FA) is strongly recommended. You must notify us immediately of any unauthorized use.</li>
                    </ul>

                    <h3>2. Subscriptions, Payments, and Refunds</h3>
                     <ul>
                        <li><strong>2.1. Subscription Tiers:</strong> We offer 'Free', 'Premium', and 'Pro' subscription tiers. Features available depend on your selected plan. Details are available on our 'Upgrade Plan' page.</li>
                        <li><strong>2.2. Billing:</strong> Subscriptions are billed on a recurring monthly or annual basis. We use secure third-party payment processors like Stripe and PayPal. By subscribing, you authorize us to charge your selected payment method.</li>
                        <li><strong>2.3. Free Trials & Auto-Renewal:</strong> Free trials may be offered for new users. Unless canceled before the end of the trial, your subscription will automatically convert to a paid plan. All paid plans auto-renew by default. You can manage or cancel your subscription at any time in the app settings.</li>
                        <li><strong>2.4. In-App Purchases (IAP):</strong> Users may purchase one-time boosts, credits, or access to specific features. These are non-refundable.</li>
                        <li><strong>2.5. Refund Policy:</strong> Subscription payments are generally non-refundable, except where required by law. If you cancel, you will retain access to paid features until the end of your current billing cycle.</li>
                    </ul>

                    <h3>3. Marketplace & Merchant Terms</h3>
                     <ul>
                        <li><strong>3.1. Commission Fee:</strong> Venty charges a <strong>5% commission fee</strong> on the total value of each successful transaction completed through the marketplace. This fee is automatically deducted from the merchant's payout.</li>
                        <li><strong>3.2. Escrow Payment System:</strong> To protect both buyers and sellers, funds from a sale are held in escrow by Venty. Funds are released to the merchant after the buyer confirms delivery or after a standard confirmation period has passed.</li>
                        <li><strong>3.3. Verified Merchant Badge:</strong> Merchants can earn a 'Verified' badge through consistent sales performance or by purchasing a verification subscription. This badge increases visibility and trust.</li>
                        <li><strong>3.4. Prohibited Content:</strong> Listing illegal items, counterfeit goods, or engaging in fraudulent activity is strictly prohibited and will result in immediate account termination.</li>
                    </ul>

                    <h3>4. User Conduct and Communication Policy</h3>
                    <ul>
                        <li><strong>4.1. Prohibited Activities:</strong> You agree not to engage in any fraudulent, illegal, or unauthorized activities.</li>
                        <li><strong>4.2. Off-Platform Communication:</strong> To ensure user safety, sharing external contact information (phone numbers, emails, social media) or attempting to move transactions outside of the Venty payment system is strictly forbidden. Violations will lead to account suspension or termination.</li>
                    </ul>
                    
                    <h3>5. Intellectual Property</h3>
                    <p>
                        All materials within the Services, including software, text, graphics, logos, and trademarks, are the exclusive property of Venty Inc. and its licensors.
                    </p>

                    <h3>6. Termination and Account Suspension</h3>
                    <p>
                        We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that violates these Terms, including but not limited to fraudulent activity or repeated violations of our communication policy.
                    </p>

                    <h3>7. Limitation of Liability & Disclaimers</h3>
                    <p>
                        THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. VENTY INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, ARISING FROM YOUR USE OF THE SERVICES.
                    </p>
                    
                    <h3>8. Contact Information</h3>
                    <p>
                        For any questions about these Terms, please contact us at support@venty.app.
                    </p>
                </Card>
            </div>
        </PageLayout>
    );
};

export default TermsScreen;
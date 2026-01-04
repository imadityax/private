"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function PoliciesPage() {
    return (
        <>
            <Navbar />
            <main className="relative min-h-screen text-white px-6 py-10 pt-28 overflow-hidden">
                {/* Background */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-[#0f0f0f] to-neutral-900" />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[160px]" />
                    <div className="absolute top-20 left-10 text-[160px] font-bold text-white/5">
                        結
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">Policies</h1>
                        <p className="text-gray-400">
                            Please read our terms and policies carefully
                        </p>
                    </div>

                    <Tabs defaultValue="terms" className="w-full">
                        <TabsList className="border-b border-white/10 rounded-none bg-transparent p-0 h-auto gap-6 mb-6">
                            <TabsTrigger
                                value="terms"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-400 data-[state=active]:bg-transparent rounded-none pb-2"
                            >
                                Terms of Service
                            </TabsTrigger>
                            <TabsTrigger
                                value="privacy"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-400 data-[state=active]:bg-transparent rounded-none pb-2"
                            >
                                Privacy Policy
                            </TabsTrigger>
                            <TabsTrigger
                                value="community"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-400 data-[state=active]:bg-transparent rounded-none pb-2"
                            >
                                Community Guidelines
                            </TabsTrigger>
                        </TabsList>

                        <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
                            <CardContent className="p-8">
                                <TabsContent value="terms" className="space-y-6">
                                    <TermsOfService />
                                </TabsContent>
                                <TabsContent value="privacy" className="space-y-6">
                                    <PrivacyPolicy />
                                </TabsContent>
                                <TabsContent value="community" className="space-y-6">
                                    <CommunityGuidelines />
                                </TabsContent>
                            </CardContent>
                        </Card>
                    </Tabs>
                </div>
            </main>
        </>
    );
}

function TermsOfService() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                <p className="text-gray-400 text-sm mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>

            <Section
                title="1. Acceptance of Terms"
                content="By accessing and using Musubi, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
            />

            <Section
                title="2. Description of Service"
                content="Musubi is a platform that connects campaigners with promoters to facilitate Instagram marketing campaigns. Campaigners can create campaigns and set budgets, while promoters can join campaigns and earn rewards based on their performance."
            />

            <Section
                title="3. User Accounts"
                content="You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. You are responsible for all activities that occur under your account."
            />

            <Section
                title="4. Campaigner Responsibilities"
                content="Campaigners must provide accurate campaign information, set appropriate budgets, and fulfill payment obligations. Campaigners are responsible for reviewing and approving promoter applications. All campaigns must comply with Instagram's terms of service and applicable laws."
            />

            <Section
                title="5. Promoter Responsibilities"
                content="Promoters must have a valid Instagram account connected to participate in campaigns. Promoters must follow campaign guidelines, provide authentic engagement, and comply with Instagram's terms of service. Promoters are responsible for the content they create and share."
            />

            <Section
                title="6. Payments and Rewards"
                content="Rewards are calculated based on campaign performance metrics. Payments are processed according to the terms specified in each campaign. Musubi reserves the right to withhold payments in cases of fraud, violation of terms, or suspicious activity."
            />

            <Section
                title="7. Prohibited Activities"
                content="You agree not to: (a) use fake accounts or bots, (b) engage in fraudulent activities, (c) violate Instagram's terms of service, (d) spam or harass other users, (e) share inappropriate or illegal content, (f) attempt to manipulate campaign metrics."
            />

            <Section
                title="8. Intellectual Property"
                content="All content on Musubi, including but not limited to text, graphics, logos, and software, is the property of Musubi or its content suppliers and is protected by copyright and other intellectual property laws."
            />

            <Section
                title="9. Limitation of Liability"
                content="Musubi shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We do not guarantee the accuracy, completeness, or usefulness of any information on the service."
            />

            <Section
                title="10. Termination"
                content="We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties."
            />

            <Section
                title="11. Changes to Terms"
                content="We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of the service after such modifications constitutes acceptance of the updated terms."
            />

            <Section
                title="12. Contact Information"
                content="If you have any questions about these Terms of Service, please contact us through the support channels provided in the application."
            />
        </div>
    );
}

function PrivacyPolicy() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <p className="text-gray-400 text-sm mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>

            <Section
                title="1. Information We Collect"
                content="We collect information that you provide directly to us, including: (a) Account information (name, email, profile picture), (b) Instagram account data (username, followers, posts) when you connect your account, (c) Campaign data (campaigns created, campaigns joined, performance metrics), (d) Payment information (processed through secure third-party providers), (e) Usage data (how you interact with our platform)."
            />

            <Section
                title="2. How We Use Your Information"
                content="We use the information we collect to: (a) Provide and improve our services, (b) Process transactions and payments, (c) Match campaigners with promoters, (d) Calculate and distribute rewards, (e) Send you updates and notifications, (f) Detect and prevent fraud, (g) Comply with legal obligations."
            />

            <Section
                title="3. Instagram Data"
                content="When you connect your Instagram account, we access your Instagram Business Account data through Facebook's Graph API. This includes: profile information, follower count, media posts, and engagement metrics. We only access data necessary for campaign participation and performance tracking. You can revoke access at any time through your Instagram settings."
            />

            <Section
                title="4. Data Sharing"
                content="We do not sell your personal information. We may share your information: (a) With other users as necessary for campaign participation (e.g., campaigners can see promoter profiles), (b) With service providers who assist in operating our platform, (c) When required by law or to protect our rights, (d) In connection with a business transfer (merger, acquisition, etc.)."
            />

            <Section
                title="5. Data Security"
                content="We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security."
            />

            <Section
                title="6. Data Retention"
                content="We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. We may retain certain information for longer periods as required by law or for legitimate business purposes."
            />

            <Section
                title="7. Your Rights"
                content="You have the right to: (a) Access your personal information, (b) Correct inaccurate data, (c) Request deletion of your data, (d) Object to processing of your data, (e) Data portability, (f) Withdraw consent for Instagram data access. To exercise these rights, contact us through the support channels."
            />

            <Section
                title="8. Cookies and Tracking"
                content="We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
            />

            <Section
                title="9. Children's Privacy"
                content="Our service is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us."
            />

            <Section
                title="10. International Data Transfers"
                content="Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our service, you consent to the transfer of your information."
            />

            <Section
                title="11. Changes to Privacy Policy"
                content="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date."
            />

            <Section
                title="12. Contact Us"
                content="If you have any questions about this Privacy Policy, please contact us through the support channels provided in the application."
            />
        </div>
    );
}

function CommunityGuidelines() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
                <p className="text-gray-400 text-sm mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>

            <Section
                title="1. Authentic Engagement"
                content="We value authentic engagement and genuine connections. Do not use bots, fake accounts, or automated tools to inflate metrics. All engagement must come from real users and genuine interest."
            />

            <Section
                title="2. Respectful Communication"
                content="Treat all community members with respect and professionalism. Harassment, bullying, hate speech, or discriminatory behavior will not be tolerated. Communicate constructively and professionally in all interactions."
            />

            <Section
                title="3. Content Standards"
                content="All content shared in campaigns must comply with Instagram's Community Guidelines and Terms of Service. Prohibited content includes: illegal activities, violence, hate speech, adult content, spam, or misleading information."
            />

            <Section
                title="4. Campaign Integrity"
                content="Campaigners must provide accurate campaign information and fulfill their commitments. Promoters must follow campaign guidelines and deliver authentic results. Both parties should maintain transparency and honesty throughout the campaign process."
            />

            <Section
                title="5. Fair Competition"
                content="Do not engage in unfair practices such as: (a) Creating fake engagement, (b) Manipulating metrics, (c) Using multiple accounts to game the system, (d) Colluding with other users to inflate performance, (e) Violating campaign rules."
            />

            <Section
                title="6. Payment Integrity"
                content="All payment transactions must be legitimate. Do not attempt to defraud the system or other users. Report any suspicious payment activity immediately. Both campaigners and promoters are expected to honor their financial commitments."
            />

            <Section
                title="7. Account Security"
                content="Maintain the security of your account. Do not share your account credentials with others. Use strong passwords and enable two-factor authentication when available. Report any suspicious account activity immediately."
            />

            <Section
                title="8. Reporting Violations"
                content="If you encounter behavior that violates these guidelines, please report it through our support channels. We take all reports seriously and will investigate promptly. False or malicious reports may result in account suspension."
            />

            <Section
                title="9. Consequences of Violations"
                content="Violations of these guidelines may result in: (a) Warning notifications, (b) Temporary account suspension, (c) Permanent account termination, (d) Withholding of payments, (e) Legal action in severe cases."
            />

            <Section
                title="10. Continuous Improvement"
                content="These guidelines may be updated to reflect changes in our community standards or platform features. We encourage feedback and suggestions for improving our community guidelines."
            />
        </div>
    );
}

function Section({ title, content }: { title: string; content: string }) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-300 leading-relaxed">{content}</p>
        </div>
    );
}


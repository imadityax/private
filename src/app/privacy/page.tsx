"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
            <CardContent className="p-8 space-y-6">
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
            </CardContent>
          </Card>
        </div>
      </main>
    </>
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


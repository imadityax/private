"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
            <CardContent className="p-8 space-y-6">
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


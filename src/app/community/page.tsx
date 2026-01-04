"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function CommunityPage() {
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
            <h1 className="text-4xl font-bold mb-2">Community Guidelines</h1>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="border-white/10 bg-linear-to-br from-black/40 to-neutral-900/60">
            <CardContent className="p-8 space-y-6">
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


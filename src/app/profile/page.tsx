"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Tab = "created" | "joined" | "payments";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("created");

  return (
    <main className="relative min-h-screen text-white px-6 py-10 overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-[#0f0f0f] to-neutral-900" />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/15 rounded-full blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='40' r='1' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='90' r='1.2' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div className="absolute top-20 left-10 text-[160px] font-bold text-white/5">
          人
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-6xl mx-auto space-y-10">

        {/* PROFILE HEADER */}
        <section className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-black/40 to-neutral-900/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-xl font-bold text-red-400">
                結
              </div>
              <div>
                <p className="text-xl font-semibold">Aditya</p>
                <p className="text-sm text-gray-400">
                  Campaigner · Promoter
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Wallet Balance</p>
              <p className="text-2xl font-semibold text-green-400">
                ₹12,450
              </p>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="flex gap-6 border-b border-white/10 pb-2">
          <TabButton
            active={activeTab === "created"}
            onClick={() => setActiveTab("created")}
          >
            Campaigns Created
          </TabButton>
          <TabButton
            active={activeTab === "joined"}
            onClick={() => setActiveTab("joined")}
          >
            Campaigns Joined
          </TabButton>
          <TabButton
            active={activeTab === "payments"}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </TabButton>
        </div>

        {/* TAB CONTENT */}
        <section className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-black/40 to-neutral-900/60">
          {activeTab === "created" && <CampaignsCreated />}
          {activeTab === "joined" && <CampaignsJoined />}
          {activeTab === "payments" && <Payments />}
        </section>
      </div>
    </main>
  );
}

/* ---------- TAB CONTENT ---------- */

function CampaignsCreated() {
  return (
    <div className="space-y-4">
      <Row left="Instagram Growth" center="Running" right="₹10,000" />
      <Row left="Product Launch – SaaS" center="Completed" right="₹40,000" />
    </div>
  );
}

function CampaignsJoined() {
  return (
    <div className="space-y-4">
      <Row left="Community Awareness Drive" center="Approved" right="₹1,200" />
      <Row left="Reels Virality Test" center="Pending" right="—" />
    </div>
  );
}

function Payments() {
  return (
    <div className="space-y-6">
      <Stat title="Available Balance" value="₹9,200" />
      <Stat title="Pending Payments" value="₹3,250" />
      <Stat title="Total Earned / Spent" value="₹41,800" />

      <div className="flex gap-4 pt-4">
        <Button variant="outline">Withdraw Balance</Button>
        <Button variant="outline">View Transactions</Button>
      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function TabButton({
  children,
  active,
  onClick,
}: {
  children: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 text-sm transition ${
        active
          ? "text-red-400 border-b-2 border-red-500"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="border border-white/10 rounded-xl p-5 bg-gradient-to-br from-black/40 to-neutral-900/60">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

function Row({
  left,
  center,
  right,
}: {
  left: string;
  center: string;
  right: string;
}) {
  return (
    <div className="flex justify-between items-center border border-white/10 rounded-lg px-5 py-4 bg-gradient-to-br from-black/40 to-neutral-900/60">
      <span>{left}</span>
      <span className="text-sm text-gray-400">{center}</span>
      <span className="font-medium">{right}</span>
    </div>
  );
}

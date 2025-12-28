"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Applicant = {
  name: string;
  platform: string;
  status: "Pending" | "Approved";
};

type Campaign = {
  id: string;
  name: string;
  days: number;
  budget: number;
  goal: string;
  members: number;
  applicants: Applicant[];
};

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Instagram Growth",
    days: 14,
    budget: 10000,
    goal: "Views",
    members: 25,
    applicants: [
      { name: "@growthhub", platform: "Instagram", status: "Pending" },
      { name: "@viralwave", platform: "Instagram", status: "Approved" },
      { name: "@reachx", platform: "Instagram", status: "Approved" },
    ],
  },
  {
    id: "2",
    name: "YouTube Launch",
    days: 7,
    budget: 5000,
    goal: "Likes",
    members: 10,
    applicants: [
      { name: "@nicheboost", platform: "YouTube", status: "Pending" },
      { name: "@videomax", platform: "YouTube", status: "Approved" },
    ],
  },
  {
    id: "3",
    name: "Twitter Brand Push",
    days: 30,
    budget: 25000,
    goal: "Followers",
    members: 50,
    applicants: [
      { name: "@threadking", platform: "X", status: "Approved" },
      { name: "@dailycrypto", platform: "X", status: "Pending" },
      { name: "@growthloops", platform: "X", status: "Pending" },
    ],
  },
  {
    id: "4",
    name: "Reels Virality Test",
    days: 5,
    budget: 3000,
    goal: "Views",
    members: 15,
    applicants: [],
  },
  {
    id: "5",
    name: "Product Launch – SaaS",
    days: 21,
    budget: 40000,
    goal: "Clicks",
    members: 40,
    applicants: [
      { name: "@saasboost", platform: "LinkedIn", status: "Approved" },
      { name: "@b2bgrowth", platform: "LinkedIn", status: "Approved" },
      { name: "@earlyadopters", platform: "LinkedIn", status: "Pending" },
    ],
  },
  {
    id: "6",
    name: "Community Awareness Drive",
    days: 10,
    budget: 8000,
    goal: "Engagement",
    members: 20,
    applicants: [
      { name: "@communityfirst", platform: "Instagram", status: "Approved" },
    ],
  },
];

export default function CampaignerDashboard() {
  const [selected, setSelected] = useState<Campaign>(mockCampaigns[0]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* NAVBAR */}
        <nav className="mb-8 border border-white/10 rounded-xl px-6 py-4 bg-gradient-to-br from-black to-neutral-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold">
                結
              </div>
              <div>
                <p className="font-semibold">Campaigner Dashboard</p>
                <p className="text-sm text-gray-400">
                  Manage campaigns & promoters
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-red-600 to-red-500">
                + New Campaign
              </Button>
              <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm">
                A
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">

          {/* LEFT: Campaign List */}
          <aside className="col-span-3 border border-white/10 rounded-xl p-4 max-h-[70vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Campaigns</h2>

            <div className="space-y-3">
              {mockCampaigns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                    selected.id === c.id
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 hover:border-red-500/40"
                  }`}
                >
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-400">
                    ₹{c.budget.toLocaleString()} • {c.goal}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          {/* CENTER: Campaign Details */}
          <section className="col-span-6 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              {selected.name}
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <Stat label="Duration" value={`${selected.days} days`} />
              <Stat label="Budget" value={`₹${selected.budget.toLocaleString()}`} />
              <Stat label="Goal" value={selected.goal} />
              <Stat label="Promoters" value={`0 / ${selected.members}`} />
            </div>

            <Button className="bg-gradient-to-r from-red-600 to-red-500">
              Pause Campaign
            </Button>
          </section>

          {/* RIGHT: Applicants */}
          <aside className="col-span-3 border border-white/10 rounded-xl p-4 max-h-[70vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Applications</h2>

            {selected.applicants.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No applications yet.
              </p>
            ) : (
              <div className="space-y-4">
                {selected.applicants.map((a, i) => (
                  <div
                    key={i}
                    className="border border-white/10 rounded-lg p-3"
                  >
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-gray-400 mb-2">
                      {a.platform}
                    </p>
                    <p
                      className={`text-sm ${
                        a.status === "Approved"
                          ? "text-green-400"
                          : "text-amber-400"
                      }`}
                    >
                      {a.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </aside>

        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

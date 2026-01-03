"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function MetaLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(false);

  const handleMetaLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("facebook", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setIsLoading(false);
    }
  };

  const handleInstagramLogin = async () => {
    setIsLoadingInstagram(true);
    try {
      await signIn("instagram", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Error signing in with Instagram:", error);
      setIsLoadingInstagram(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden px-6">
      {/* ===== BACKGROUND ===== */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-[#0f0f0f] to-neutral-900" />

        {/* Rising sun glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[180px]" />

        {/* Secondary ambient glow */}
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[140px]" />

        {/* Washi texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='40' r='1' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='90' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='100' cy='100' r='1.3' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Kanji watermark */}
        <div className="absolute top-20 left-10 text-[180px] font-bold text-white/5">
          結
        </div>
        <div className="absolute bottom-20 right-10 text-[180px] font-bold text-white/5">
          繋
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 text-center max-w-md w-full">
        {/* Brand */}
        <div className="mb-10">
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold text-xl">
            結
          </div>
          <h1 className="text-3xl font-semibold tracking-wide mb-2">
            Welcome to Musubi
          </h1>
          <p className="text-gray-400">
            Enter the space where connections create value
          </p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleMetaLogin}
            disabled={isLoading || isLoadingInstagram}
            className="w-full py-6 text-lg bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Connecting..." : "Log in with Meta"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-500">or</span>
            </div>
          </div>

          <Button
            onClick={handleInstagramLogin}
            disabled={isLoading || isLoadingInstagram}
            variant="outline"
            className="w-full py-6 text-lg border-white/20 hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingInstagram ? "Connecting..." : "Log in with Instagram"}
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-sm text-gray-500">
          We never post without your permission
        </p>
      </div>
    </main>
  );
}

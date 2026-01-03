"use client";

import { Button } from "@/components/ui/button";
import { Zap, Cherry, Scroll, Waves, Mountain } from "lucide-react";
import Link from "next/link";

function ToriiGate(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 4h20" />
      <path d="M3 8h18" />
      <path d="M6 4v14" />
      <path d="M18 4v14" />
      <path d="M3 18h18" />
    </svg>
  );
}

function Bamboo(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 3v18" />
      <path d="M12 5v14" />
      <path d="M16 4v16" />
      <path d="M6 8c2-3 4-3 6 0" />
      <path d="M14 12c2-3 4-3 6 0" />
    </svg>
  );
}

function Samurai(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12c2-6 8-9 10-9s8 3 10 9" />
      <path d="M4 16c4 2 8 2 8 2s4 0 8-2" />
      <path d="M9 9h6" />
      <path d="M8 13h8" />
    </svg>
  );
}

function Shuriken(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
      <path d="M12 12l6-6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-black via-neutral-950 to-black text-white">
      {/* Japanese Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Washi Paper Texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Rising Sun Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-red-600/20 via-red-500/10 to-red-600/20 rounded-full blur-[140px]" />

        {/* Mount Fuji Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.03]">
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-linear-to-t from-white to-transparent clip-path-polygon-[50%_0%,0%_100%,100%_100%]" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-linear-to-t from-white to-transparent clip-path-polygon-[50%_0%,0%_100%,100%_100%]" />
        </div>

        {/* Cherry Blossoms */}
        <div className="absolute top-1/4 right-1/4 opacity-20">
          <Cherry className="w-24 h-24 rotate-12" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-20">
          <Cherry className="w-16 h-16 -rotate-12" />
        </div>

        {/* Kanji Patterns */}
        <div className="absolute top-20 left-10 opacity-[0.02]">
          <span className="text-9xl font-bold text-white">和</span>
        </div>
        <div className="absolute bottom-20 right-10 opacity-[0.02]">
          <span className="text-9xl font-bold text-white">創</span>
        </div>

        {/* Red Seigaiha Waves Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.03] bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40'%3E%3Cpath d='M0,40 Q15,25 30,40 T60,40 T90,40 T120,40' fill='none' stroke='%23dc2626' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '240px 48px'
          }}
        />

        {/* Gold Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-4 lg:py-6">
          {/* Top Bar with Japanese Elements */}
          <div className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-6">
              {/* Musubi Seal */}
              <div className="relative">
                {/* Outer Circle */}
                <div className="absolute inset-0 rounded-full border-2 border-red-600/30 animate-pulse" />

                {/* Inner Circle with Kanji */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-white/20 bg-linear-to-br from-black to-neutral-900 shadow-2xl">
                  {/* Red Sun */}
                  <div className="absolute inset-4 rounded-full bg-linear-to-br from-red-600 to-red-800 opacity-80" />

                  {/* Kanji Character */}
                  <span className="relative text-2xl font-bold text-white tracking-widest">結</span>

                  {/* Decorative Dots */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-amber-500" />
                </div>
              </div>

              {/* Brand Name */}
              <div className="relative">
                <h2 className="text-2xl font-bold tracking-wider bg-linear-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                  結 MUSUBI
                </h2>
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
              </div>
            </div>

            {/* Samurai Crest Badge */}
            <div className="hidden lg:block">
              <div className="relative px-4 py-2 rounded-full border border-white/10 bg-linear-to-r from-black/50 to-neutral-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Samurai className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-medium text-gray-300 tracking-wider">侍 MODE</span>
                  <div className="h-4 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
                  <Shuriken className="w-4 h-4 text-amber-400 animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Japanese Lantern Banner */}
            <div className="relative inline-flex items-center justify-center mb-12">
              {/* Lantern String */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-linear-to-b from-amber-500/50 to-transparent" />

              {/* Lantern */}
              <div className="relative px-6 py-3 rounded-lg border-2 border-red-600/30 bg-linear-to-b from-black/80 to-neutral-900/80">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-red-600/50 rounded-t-lg" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-500/50 rounded-b-lg" />

                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-red-400 animate-pulse" />
                  <span className="text-sm tracking-[0.3em] text-gray-300 font-light">
                    結びの経済
                  </span>
                  <span className="text-xs text-gray-500 tracking-widest">|</span>
                  <span className="text-sm tracking-widest text-gray-400">
                    ECONOMY OF CONNECTION
                  </span>
                </div>
              </div>
            </div>

            {/* Main Title with Japanese Calligraphy Effect */}
            <div className="relative mb-8">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight mb-4">
                <span className="bg-linear-to-b from-white via-red-100 to-red-300 bg-clip-text text-transparent relative">
                  MUSUBI
                  {/* Brush Stroke Effect */}
                  <div className="absolute -bottom-4 left-1/4 w-1/2 h-1 bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
                </span>
              </h1>

              {/* Subtitle with Japanese Characters */}
              <div className="relative inline-block">
                <p className="text-2xl tracking-[0.5em] text-gray-500 font-light mb-2">
                  結び — 創り — 繋ぐ
                </p>
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>

            {/* Japanese Proverb */}
            <div className="relative my-12">
              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <Scroll className="w-6 h-6 text-amber-400/50" />
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <p className="text-lg text-gray-400 italic font-light tracking-wide">
                "The thread of connection weaves the fabric of creation"
              </p>
              <p className="text-sm text-gray-500 mt-2 tracking-wider">
                結びの糸が創造の布を織る
              </p>
            </div>

            {/* Main Description */}
            <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto tracking-wide">
              A sacred space where creators, distributors, and platforms unite through{" "}
              <span className="relative">
                <span className="text-red-300 font-medium">honor</span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-red-500/50 to-transparent" />
              </span>
              ,{" "}
              <span className="relative">
                <span className="text-white font-medium">fair attribution</span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-amber-500/50 to-transparent" />
              </span>
              , and{" "}
              <span className="relative">
                <span className="text-red-200 font-medium">enlightened rewards</span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-white/50 to-transparent" />
              </span>
              .
            </p>

            {/* Action Button with Japanese Aesthetic */}
            <div className="relative inline-block">
              {/* Decorative Elements */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <ToriiGate className="w-8 h-8 text-red-500/30" />
              </div>

              <Button className="group relative px-12 py-7 text-xl rounded-full border-2 border-red-600/30 bg-linear-to-br from-black to-neutral-900 shadow-2xl hover:shadow-red-900/30 transition-all duration-300">
                {/* Button Glow */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-red-600/0 via-red-600/20 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Button Content */}
                <div className="relative flex items-center gap-4">
                  <span className="font-bold tracking-wider bg-linear-to-r from-white to-red-200 bg-clip-text text-transparent">
                    創作を始める
                  </span>
                  <span className="text-sm text-gray-400 tracking-wider">|</span>
                  <Button asChild>
                    <Link href="/dashboard">Start Creating</Link>
                  </Button>


                  {/* Animated Arrow */}
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 rounded-full border border-red-400/30 group-hover:border-red-400 transition-colors" />
                    <div className="absolute inset-1.5 rounded-full bg-linear-to-r from-red-500 to-red-600 group-hover:from-red-400 group-hover:to-red-500 transition-all" />
                  </div>
                </div>
              </Button>

              {/* Bottom Decoration */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-amber-500/50" />
                ))}
              </div>
            </div>

            {/* Bottom Decorative Line */}
            <div className="mt-20">
              <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex justify-center mt-4 gap-6 opacity-50">
                <Bamboo className="w-5 h-5" />
                <Waves className="w-5 h-5" />
                <Mountain className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Add custom styles for clip-path */}
      <style jsx global>{`
        .clip-path-polygon-\[50\%_0\%\,0\%_100\%\,100\%_100\%\] {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </main>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="font-semibold text-lg">ViewPay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isLanding ? (
              <>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How it works
                </Link>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </>
            ) : null}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth?mode=login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth?mode=signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {isLanding && (
              <>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                  How it works
                </Link>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                  Pricing
                </Link>
              </>
            )}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth?mode=login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth?mode=signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

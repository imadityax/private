"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/auth/meta" });
    };

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(path + "/");
    };

    if (status === "loading" || !session) {
        return null;
    }

    return (
        <nav className="sticky top-4 z-50 w-full max-w-340 mx-auto px-6">
            <div className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-lg">
                <div className="flex h-16 items-center justify-between px-6">
                    {/* Musubi Branding */}
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold text-xl">
                            結
                        </div>
                        <span className="text-xl font-bold bg-linear-to-r from-red-400 to-red-200 bg-clip-text text-transparent">
                            Musubi
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    {/* <div className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard">
                            <Button
                                variant="ghost"
                                className={`${isActive("/dashboard")
                                    ? "text-red-400 bg-red-500/10"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/campaigns">
                            <Button
                                variant="ghost"
                                className={`${isActive("/campaigns")
                                    ? "text-red-400 bg-red-500/10"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Campaigns
                            </Button>
                        </Link>
                        <Link href="/profile">
                            <Button
                                variant="ghost"
                                className={`${isActive("/profile")
                                    ? "text-red-400 bg-red-500/10"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Profile
                            </Button>
                        </Link>
                    </div> */}

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 p-0"
                            >
                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-semibold">
                                        {(session.user?.name || session.user?.email || "U")[0].toUpperCase()}
                                    </div>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-black/95 border-white/10" align="end">
                            <DropdownMenuLabel className="text-white">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium">
                                        {session.user?.name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {session.user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                                asChild
                                className="text-white cursor-pointer focus:bg-white/10 focus:text-white"
                            >
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                                className="text-white cursor-pointer focus:bg-white/10 focus:text-white"
                            >
                                <Link href="/campaigns">My Campaigns</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-red-400 cursor-pointer focus:bg-red-500/10 focus:text-red-400"
                            >
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}


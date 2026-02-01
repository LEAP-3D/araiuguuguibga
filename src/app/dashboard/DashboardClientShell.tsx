"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  PawPrint,
  PlusSquare,
  History,
  ArrowLeft,
  Building2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { href: "/dashboard/feed", label: "Feed", icon: Home },
  { href: "/dashboard/ai-assistant", label: "AI Туслах", icon: Sparkles },
  { href: "/dashboard/my-pets", label: "Миний амьтад", icon: PawPrint },
  { href: "/dashboard/add-post", label: "Пост оруулах", icon: PlusSquare },
  { href: "/dashboard/add-clinic", label: "Эмнэлэг нэмэх (Админ)", icon: Building2 },
  { href: "/dashboard/history", label: "Түүх", icon: History },
];

export function DashboardClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white shadow-sm">
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
          <LayoutDashboard className="h-6 w-6 text-[#4f9669]" />
          <span className="font-semibold text-gray-800">Dashboard</span>
        </div>
        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#4f9669]/10 text-[#4f9669]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Нүүр рүү буцах
          </Link>
        </div>
      </aside>
      <main className="ml-64 flex-1 p-6">{children}</main>
    </div>
  );
}

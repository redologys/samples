"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Search,
  MoreVertical,
  Smartphone,
  Wrench,
} from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatPrice } from "@/lib/utils";

// Dummy Data
const STATS = [
  { label: "Total Revenue", value: "$12,450", change: "+12%", icon: DollarSign, color: "text-success-400", bg: "bg-success-500/10" },
  { label: "Active Jobs", value: "8", change: "-2", icon: Wrench, color: "text-primary-400", bg: "bg-primary-500/10" },
  { label: "Pending Bookings", value: "15", change: "+5", icon: Clock, color: "text-warning-400", bg: "bg-warning-500/10" },
  { label: "Completed Today", value: "12", change: "+3", icon: CheckCircle2, color: "text-accent-400", bg: "bg-accent-500/10" },
];

const RECENT_BOOKINGS = [
  {
    id: "ME-2938",
    customer: "Sarah Johnson",
    device: "iPhone 14 Pro",
    issue: "Screen Replacement",
    status: "In Progress",
    time: "2:00 PM",
    price: 329.00,
  },
  {
    id: "ME-2939",
    customer: "Michael Chen",
    device: "Samsung S23",
    issue: "Battery Replacement",
    status: "Pending",
    time: "3:30 PM",
    price: 89.00,
  },
  {
    id: "ME-2940",
    customer: "David Smith",
    device: "iPad Air 4",
    issue: "Charging Port",
    status: "Completed",
    time: "11:00 AM",
    price: 129.00,
  },
  {
    id: "ME-2941",
    customer: "Emma Wilson",
    device: "Pixel 7",
    issue: "Screen Replacement",
    status: "Pending",
    time: "4:00 PM",
    price: 189.00,
  },
  {
    id: "ME-2942",
    customer: "James Brown",
    device: "iPhone 13",
    issue: "Water Damage",
    status: "Diagnostics",
    time: "1:00 PM",
    price: 59.00,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-950 p-6 flex flex-col fixed inset-y-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white leading-none">Admin</h1>
            <p className="text-xs text-neutral-500 mt-1">Mobile Experts</p>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
            { id: "bookings", icon: Calendar, label: "Bookings" },
            { id: "customers", icon: Users, label: "Customers" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                activeTab === item.id
                  ? "bg-primary-500/10 text-primary-400"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-neutral-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
            <p className="text-neutral-400">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {STATS.map((stat) => (
            <GlassCard key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <Badge variant={stat.change.startsWith("+") ? "success" : "neutral"}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-neutral-400">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">Recent Bookings</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-neutral-800">
                      <th className="pb-4 text-xs font-medium text-neutral-500 uppercase">Order ID</th>
                      <th className="pb-4 text-xs font-medium text-neutral-500 uppercase">Customer</th>
                      <th className="pb-4 text-xs font-medium text-neutral-500 uppercase">Service</th>
                      <th className="pb-4 text-xs font-medium text-neutral-500 uppercase">Status</th>
                      <th className="pb-4 text-xs font-medium text-neutral-500 uppercase">Amount</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {RECENT_BOOKINGS.map((booking) => (
                      <tr key={booking.id} className="border-b border-neutral-800/50 last:border-0 hover:bg-neutral-900/50 transition-colors">
                        <td className="py-4 font-mono text-neutral-300">{booking.id}</td>
                        <td className="py-4">
                          <div className="font-medium text-white">{booking.customer}</div>
                          <div className="text-xs text-neutral-500">{booking.time}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-white">{booking.issue}</div>
                          <div className="text-xs text-neutral-500">{booking.device}</div>
                        </td>
                        <td className="py-4">
                          <Badge
                            variant={
                              booking.status === "Completed" ? "success" :
                              booking.status === "In Progress" ? "accent" :
                              booking.status === "Pending" ? "warning" : "neutral"
                            }
                            size="sm"
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-4 font-medium text-white">
                          {formatPrice(booking.price)}
                        </td>
                        <td className="py-4 text-right">
                          <button className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-1">
            <GlassCard className="p-6 h-full">
              <h3 className="font-bold text-white mb-6">Upcoming Schedule</h3>
              <div className="space-y-4">
                {[
                  { time: "09:00 AM", event: "Shop Opening", type: "system" },
                  { time: "10:30 AM", event: "David - Screen Repair", type: "booking" },
                  { time: "01:00 PM", event: "Lunch Break", type: "system" },
                  { time: "02:15 PM", event: "Sarah - Battery", type: "booking" },
                  { time: "04:00 PM", event: "Inventory Delivery", type: "system" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-2 h-2 rounded-full mb-1",
                        item.type === "booking" ? "bg-primary-500" : "bg-neutral-500"
                      )} />
                      <div className="w-px h-full bg-neutral-800 group-last:hidden" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-0.5">{item.time}</p>
                      <p className="text-sm text-white font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}

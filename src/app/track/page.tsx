"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  Sparkles,
  Package,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BUSINESS_INFO, BOOKING_STATUSES } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";

// Sample tracking data (in production, this would come from the database)
const sampleTrackingData = {
  bookingNumber: "ME-M5K2J8-A3B1",
  trackingCode: "X7K9M2P4",
  customerName: "John Smith",
  deviceModel: "iPhone 14 Pro",
  issueType: "Cracked Screen",
  status: "REPAIR_IN_PROGRESS" as keyof typeof BOOKING_STATUSES,
  appointmentDate: "January 8, 2026",
  appointmentTime: "2:00 PM",
  technicianName: "Mike",
  estimatedCompletion: "3:30 PM today",
  updates: [
    {
      status: "COMPLETED",
      title: "Booking Confirmed",
      description: "Your repair appointment has been scheduled",
      timestamp: "Jan 8, 2026 - 10:15 AM",
    },
    {
      status: "COMPLETED",
      title: "Check-In Complete",
      description: "Device received and logged into our system",
      timestamp: "Jan 8, 2026 - 1:58 PM",
    },
    {
      status: "COMPLETED",
      title: "Diagnostics Complete",
      description: "Issue confirmed: Display assembly replacement needed",
      timestamp: "Jan 8, 2026 - 2:15 PM",
    },
    {
      status: "CURRENT",
      title: "Repair in Progress",
      description: "Mike is working on your device",
      timestamp: "Jan 8, 2026 - 2:30 PM",
    },
    {
      status: "UPCOMING",
      title: "Quality Check",
      description: "Final testing and inspection",
      timestamp: "Pending",
    },
    {
      status: "UPCOMING",
      title: "Ready for Pickup",
      description: "You'll receive a notification when ready",
      timestamp: "Pending",
    },
  ],
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get("code") || "";
  
  const [trackingCode, setTrackingCode] = useState(codeFromUrl);
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState<typeof sampleTrackingData | null>(
    codeFromUrl ? sampleTrackingData : null
  );
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError("Please enter a tracking code");
      return;
    }

    setIsSearching(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, always return sample data
    setTrackingResult(sampleTrackingData);
    setIsSearching(false);
  };

  return (
    <main className="min-h-screen bg-neutral-950 py-12 lg:py-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUpVariants} className="inline-flex mb-4">
            <Badge variant="primary" size="lg" icon={<Search className="w-3 h-3" />}>
              Track Repair
            </Badge>
          </motion.div>
          
          <motion.h1 variants={fadeInUpVariants} className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Track Your Repair Status
          </motion.h1>
          
          <motion.p variants={fadeInUpVariants} className="text-neutral-400">
            Enter your tracking code to see real-time updates on your device
          </motion.p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <GlassCard className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter tracking code (e.g., X7K9M2P4)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  error={error}
                  className="text-center sm:text-left font-mono text-lg"
                />
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSearch}
                isLoading={isSearching}
                rightIcon={<Search className="w-5 h-5" />}
              >
                Track
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tracking Result */}
        {trackingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Status Card */}
            <GlassCard className="p-6 lg:p-8 mb-8" glow>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Current Status</p>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        trackingResult.status === "READY_FOR_PICKUP" || trackingResult.status === "COMPLETED"
                          ? "success"
                          : trackingResult.status.includes("PROGRESS")
                          ? "accent"
                          : "primary"
                      }
                      size="lg"
                    >
                      {BOOKING_STATUSES[trackingResult.status].label}
                    </Badge>
                  </div>
                  <p className="text-neutral-500 text-sm mt-2">
                    {BOOKING_STATUSES[trackingResult.status].description}
                  </p>
                </div>
                
                <div className="text-left lg:text-right">
                  <p className="text-sm text-neutral-400 mb-1">Estimated Completion</p>
                  <p className="text-xl font-bold text-white">{trackingResult.estimatedCompletion}</p>
                </div>
              </div>
            </GlassCard>

            {/* Device Info */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <GlassCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Device Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Device</span>
                    <span className="text-white">{trackingResult.deviceModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Issue</span>
                    <span className="text-white">{trackingResult.issueType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Technician</span>
                    <span className="text-white">{trackingResult.technicianName}</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Booking #</span>
                    <span className="text-white font-mono text-sm">{trackingResult.bookingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Date</span>
                    <span className="text-white">{trackingResult.appointmentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Time</span>
                    <span className="text-white">{trackingResult.appointmentTime}</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Timeline */}
            <GlassCard className="p-6 lg:p-8">
              <h3 className="font-semibold text-white mb-6">Repair Progress</h3>
              
              <div className="relative">
                {trackingResult.updates.map((update, index) => {
                  const isCompleted = update.status === "COMPLETED";
                  const isCurrent = update.status === "CURRENT";
                  const isUpcoming = update.status === "UPCOMING";
                  
                  return (
                    <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
                      {/* Vertical Line */}
                      {index < trackingResult.updates.length - 1 && (
                        <div className={cn(
                          "absolute left-[15px] top-10 w-0.5 h-[calc(100%-2.5rem)]",
                          isCompleted || isCurrent ? "bg-primary-500" : "bg-neutral-700"
                        )} />
                      )}
                      
                      {/* Icon */}
                      <div className={cn(
                        "relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        isCompleted && "bg-primary-500",
                        isCurrent && "bg-accent-500 animate-pulse",
                        isUpcoming && "bg-neutral-700"
                      )}>
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {isCurrent && <Wrench className="w-4 h-4 text-white" />}
                        {isUpcoming && <Clock className="w-4 h-4 text-neutral-400" />}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={cn(
                            "font-semibold",
                            isUpcoming ? "text-neutral-500" : "text-white"
                          )}>
                            {update.title}
                          </h4>
                          {isCurrent && (
                            <Badge variant="accent" size="sm">Live</Badge>
                          )}
                        </div>
                        <p className={cn(
                          "text-sm mb-1",
                          isUpcoming ? "text-neutral-600" : "text-neutral-400"
                        )}>
                          {update.description}
                        </p>
                        <p className="text-xs text-neutral-500">{update.timestamp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
                asChild
              >
                <a href={`tel:${BUSINESS_INFO.phoneClean}`}>Call Store</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<MapPin className="w-5 h-5" />}
                asChild
              >
                <a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>
          </motion.div>
        )}

        {/* No Result State */}
        {!trackingResult && !isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-800 flex items-center justify-center">
              <Package className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Enter Your Tracking Code
            </h3>
            <p className="text-neutral-400 max-w-md mx-auto">
              Your tracking code was sent to your phone and email when you booked your repair.
              It looks like this: <span className="font-mono text-primary-400">X7K9M2P4</span>
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default function TrackPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" />
        </div>
      }>
        <TrackingContent />
      </Suspense>
      <Footer />
    </>
  );
}

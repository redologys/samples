"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Battery,
  Droplets,
  PlugZap,
  Camera,
  Wifi,
  Volume2,
  HardDrive,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/Card";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";

const ALL_SERVICES = [
  {
    id: "screen",
    title: "Screen Replacement",
    icon: Smartphone,
    description: "Cracked or unresponsive screen? We replace it with OEM-quality glass.",
    price: "$79+",
    time: "30-45 mins",
    features: ["Gorilla Glass", "True Tone Retention", "Lifetime Warranty"],
    popular: true,
  },
  {
    id: "battery",
    title: "Battery Replacement",
    icon: Battery,
    description: "Phone dying fast? Restore your battery health to 100%.",
    price: "$49+",
    time: "20-30 mins",
    features: ["High Capacity Cells", "Zero Cycle Count", "1-Year Warranty"],
    popular: true,
  },
  {
    id: "water",
    title: "Water Damage Repair",
    icon: Droplets,
    description: "Dropped in water? Turn it off and bring it in immediately.",
    price: "$59+",
    time: "2-24 hours",
    features: ["Ultrasonic Cleaning", "Board Diagnostics", "No Fix No Fee"],
    popular: false,
  },
  {
    id: "charging",
    title: "Charging Port Repair",
    icon: PlugZap,
    description: "Phone not charging or cable loose? We fix broken ports.",
    price: "$39+",
    time: "30 mins",
    features: ["Port Cleaning", "Soldering Repair", "Cable Testing"],
    popular: false,
  },
  {
    id: "camera",
    title: "Camera Repair",
    icon: Camera,
    description: "Blurry photos or broken lens? We fix front and back cameras.",
    price: "$59+",
    time: "45 mins",
    features: ["Lens Replacement", "Focus Calibration", "Testing"],
    popular: false,
  },
  {
    id: "network",
    title: "Signal/WiFi Issues",
    icon: Wifi,
    description: "Weak signal or no WiFi? We diagnose antenna and chip issues.",
    price: "$49+",
    time: "1 hour",
    features: ["Antenna Repair", "Signal Testing", "Board Repair"],
    popular: false,
  },
  {
    id: "audio",
    title: "Speaker & Mic",
    icon: Volume2,
    description: "Can't hear or be heard? We replace blown speakers and mics.",
    price: "$45+",
    time: "45 mins",
    features: ["Cleaning", "Component Swap", "Audio Testing"],
    popular: false,
  },
  {
    id: "data",
    title: "Data Recovery",
    icon: HardDrive,
    description: "Lost photos or contacts? We attempt advanced data recovery.",
    price: "$99+",
    time: "1-3 days",
    features: ["Logic Board Work", "Secure Transfer", "Privacy Guaranteed"],
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-950">
        {/* specific hero for services */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 to-neutral-950" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="container-custom relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" size="lg" className="mb-6">
                Expert Repairs
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                We Fix It All.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                  Fast & Reliable.
                </span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
                From shattered screens to water damage, our expert technicians can restore 
                your device to perfect working condition. Most repairs done in under 30 minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" size="xl" asChild>
                  <Link href="/book">Book Repair Now</Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 relative">
          <div className="container-custom">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {ALL_SERVICES.map((service) => (
                <motion.div key={service.id} variants={fadeInUpVariants}>
                  <GlassCard className="h-full p-6 group" hoverEffect>
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-colors">
                        <service.icon className="w-8 h-8 text-primary-400" />
                      </div>
                      {service.popular && (
                        <Badge variant="accent" size="sm">Popular</Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-neutral-300">
                        <Zap className="w-4 h-4 mr-2 text-warning-400" />
                        Time: {service.time}
                      </div>
                      <div className="flex items-center text-sm text-neutral-300">
                        <ShieldCheck className="w-4 h-4 mr-2 text-success-400" />
                        Warranty Included
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-neutral-500">Starts at</span>
                        <p className="text-lg font-bold text-white">{service.price}</p>
                      </div>
                      <Button variant="primary" size="sm" asChild>
                        <Link href={`/book?issue=${service.id}`}>Book</Link>
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-neutral-900/50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-neutral-400">Simple, transparent, and fast repair process</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Book or Walk In",
                  desc: "Schedule online for priority service or just stop by our shop.",
                },
                {
                  step: "02",
                  title: "Free Diagnostics",
                  desc: "We check your device and give you an exact price. No hidden fees.",
                },
                {
                  step: "03",
                  title: "Fast Repair",
                  desc: "Most repairs are done while you wait. Pay only when satisfied.",
                },
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-3xl bg-neutral-950 border border-neutral-800 text-center">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl font-black text-neutral-800/50 select-none">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 relative z-10">{item.title}</h3>
                  <p className="text-neutral-400 relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-20">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary-900/50 to-accent-900/50 rounded-3xl p-8 lg:p-12 border border-primary-500/20 text-center">
              <MessageSquare className="w-12 h-12 text-primary-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Have Questions?</h2>
              <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                Not sure what's wrong with your device? Chat with us or give us a call instantly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="white" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:9297892786">Call (929) 789-2786</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Heart,
  Wrench,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/Card";
import { fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-950 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 to-neutral-950" />
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Repairing Devices,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                  Restoring Connections.
                </span>
              </h1>
              <p className="text-xl text-neutral-400">
                Since 2009, Mobile Experts has been Brooklyn's trusted destination for 
                reliable, fast, and high-quality device repairs.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
            >
              {[
                { label: "Years in Business", value: "15+" },
                { label: "Devices Repaired", value: "50k+" },
                { label: "Happy Customers", value: "45k+" },
                { label: "5-Star Reviews", value: "1000+" },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </GlassCard>
              ))}
            </motion.div>

            {/* Story Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-neutral-300 leading-relaxed">
                  <p>
                    Mobile Experts started with a simple mission: to provide honest, 
                    transparent, and high-quality phone repairs to our Brooklyn community.
                  </p>
                  <p>
                    We saw too many people overpaying for simple fixes or waiting days 
                    to get their phones back. We knew there had to be a better way. 
                    So we built a shop focused on speed, quality parts, and fair pricing.
                  </p>
                  <p>
                    Today, we are proud to be one of Brooklyn's highest-rated repair 
                    shops. Whether it's a shattered screen, a battery that won't hold 
                    a charge, or water damage, our expert technicians have seen it all 
                    and fixed it all.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-3xl overflow-hidden bg-neutral-800"
              >
                {/* Placeholder for shop image */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                  <Wrench className="w-20 h-20 text-neutral-700" />
                </div>
              </motion.div>
            </div>

            {/* Values Grid */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Award,
                    title: "Quality First",
                    desc: "We use only OEM-quality parts and back every repair with a warranty.",
                  },
                  {
                    icon: Users,
                    title: "Customer Focused",
                    desc: "We treat every device like it's our own and every customer like family.",
                  },
                  {
                    icon: Clock,
                    title: "Speed & Efficiency",
                    desc: "We respect your time. Most repairs are completed in under 30 minutes.",
                  },
                ].map((value, i) => (
                  <GlassCard key={i} className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-6">
                      <value.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-neutral-400">{value.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

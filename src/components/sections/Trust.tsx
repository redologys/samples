"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Zap,
  ShieldCheck,
  DollarSign,
  Clock,
  ThumbsUp,
  Users,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/Card";
import { TRUST_BADGES } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Zap,
  ShieldCheck,
  DollarSign,
};

const extendedTrust = [
  {
    icon: Clock,
    stat: "15+",
    label: "Years Experience",
    description: "Serving Brooklyn since 2009",
  },
  {
    icon: Wrench,
    stat: "500+",
    label: "Repairs Completed",
    description: "iPhones, Samsung, and more",
  },
  {
    icon: ThumbsUp,
    stat: "99%",
    label: "Satisfaction Rate",
    description: "Happy customers every time",
  },
  {
    icon: Users,
    stat: "1000+",
    label: "Happy Customers",
    description: "And growing every day",
  },
];

export function Trust() {
  return (
    <section className="section relative overflow-hidden" id="why-us">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-900" />
      
      {/* Gradient Orb */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="section-header"
        >
          <motion.div variants={fadeInUpVariants} className="inline-flex mb-4">
            <Badge variant="primary" size="lg" icon={<Award className="w-3 h-3" />}>
              Why Choose Us
            </Badge>
          </motion.div>
          
          <motion.h2 variants={fadeInUpVariants} className="section-title">
            The Brooklyn Difference
          </motion.h2>
          
          <motion.p variants={fadeInUpVariants} className="section-subtitle">
            We&apos;re not just another repair shop. We&apos;re your neighbors, committed to 
            providing exceptional service at fair prices.
          </motion.p>
        </motion.div>

        {/* Trust Badges Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {TRUST_BADGES.map((badge, index) => {
            const Icon = iconMap[badge.icon] || Award;
            
            return (
              <motion.div
                key={badge.title}
                variants={fadeInUpVariants}
                custom={index}
              >
                <GlassCard className="p-6 text-center group" hoverEffect>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {badge.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background Card */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-600/20 via-accent-600/10 to-primary-600/20 blur-xl" />
          
          <div className="relative rounded-3xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 p-8 lg:p-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {extendedTrust.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-500/10 mb-4 group-hover:bg-primary-500/20 transition-colors">
                    <item.icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-extrabold text-white mb-1">
                    {item.stat}
                  </div>
                  <div className="text-sm font-semibold text-primary-400 mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-success-500/20">
                <ShieldCheck className="w-6 h-6 text-success-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">We Work With You on Prices</p>
                <p className="text-sm text-neutral-400">Fair, transparent pricing with no hidden fees</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-neutral-700" />
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary-500/20">
                <Award className="w-6 h-6 text-primary-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Quality Parts Guaranteed</p>
                <p className="text-sm text-neutral-400">Premium replacement parts only</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Battery,
  Shield,
  CreditCard,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/lib/constants";
import { cn, formatPrice, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  BatteryFull: Battery,
  Shield,
  CreditCard,
};

export function Services() {
  return (
    <section className="section relative overflow-hidden" id="services">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-[100px]" />

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
            <Badge variant="primary" size="lg" icon={<Sparkles className="w-3 h-3" />}>
              Our Services
            </Badge>
          </motion.div>
          
          <motion.h2 variants={fadeInUpVariants} className="section-title">
            Expert Solutions for Your
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
              Mobile Devices
            </span>
          </motion.h2>
          
          <motion.p variants={fadeInUpVariants} className="section-subtitle">
            From quick screen repairs to premium accessories, we&apos;ve got you covered.
            Quality service, fair prices, and expert technicians.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Smartphone;
            
            return (
              <motion.div
                key={service.id}
                variants={fadeInUpVariants}
                custom={index}
              >
                <GlassCard
                  className="h-full p-6 group cursor-pointer"
                  hoverEffect
                  glow
                >
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary-400" />
                    </div>
                    {/* Decorative dot */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-success-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                    {service.priceFrom > 0 && (
                      <div>
                        <span className="text-xs text-neutral-500">Starting at</span>
                        <div className="text-lg font-bold text-white">
                          {formatPrice(service.priceFrom)}
                        </div>
                      </div>
                    )}
                    <div className={cn(
                      "flex items-center gap-1 text-primary-400 text-sm font-medium",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    )}>
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary-400" />
              <p className="text-neutral-300">
                <span className="font-semibold text-white">Same-day repairs available</span>
                {" "}• Most repairs completed in under an hour
              </p>
            </div>
            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />} asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

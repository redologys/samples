"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";
import { BUSINESS_INFO, BUSINESS_HOURS } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Message sent! We'll get back to you shortly.");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-950 pt-20">
        {/* Page Header */}
        <section className="py-12 lg:py-20 text-center">
          <div className="container-custom">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-neutral-400 max-w-2xl mx-auto"
            >
              Visit our shop in Brooklyn, give us a call, or send us a message.
              We're here to help with all your mobile needs.
            </motion.p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
              {/* Contact Info */}
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <GlassCard className="p-6">
                    <div className="p-3 rounded-xl bg-primary-500/20 w-fit mb-4">
                      <Phone className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">Call Us</h3>
                    <p className="text-sm text-neutral-400 mb-4">Mon-Sat from 9am to 9pm</p>
                    <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="text-primary-400 hover:text-primary-300 font-medium">
                      {BUSINESS_INFO.phone}
                    </a>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="p-3 rounded-xl bg-accent-500/20 w-fit mb-4">
                      <Mail className="w-6 h-6 text-accent-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">Email Us</h3>
                    <p className="text-sm text-neutral-400 mb-4">We'll reply within 24 hours</p>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-accent-400 hover:text-accent-300 font-medium">
                      {BUSINESS_INFO.email}
                    </a>
                  </GlassCard>
                </div>

                {/* Full Address Card */}
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-neutral-800">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">Visit Our Shop</h3>
                      <p className="text-neutral-300 mb-4 leading-relaxed">
                        {BUSINESS_INFO.fullAddress}
                        <br />
                        (Near A Train & Liberty Ave)
                      </p>
                      <Button variant="outline" size="sm" leftIcon={<Navigation className="w-4 h-4" />} asChild>
                        <a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                          Get Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                </GlassCard>

                {/* Hours Card */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <h3 className="font-semibold text-white">Business Hours</h3>
                  </div>
                  <div className="space-y-3">
                    {BUSINESS_HOURS.map((day) => (
                      <div key={day.day} className="flex justify-between text-sm border-b border-neutral-800/50 pb-2 last:border-0 last:pb-0">
                        <span className="text-neutral-400">{day.day}</span>
                        <span className={cn(
                          "font-medium",
                          day.isClosed ? "text-error-400" : "text-white"
                        )}>
                          {day.isClosed ? "Closed" : `${day.open} - ${day.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Socials */}
                <div className="flex gap-4">
                  <a href={`https://facebook.com/${BUSINESS_INFO.facebook}`} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={`https://instagram.com/${BUSINESS_INFO.instagram}`} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              {/* Contact Form & Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                {/* Form */}
                <GlassCard className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input label="Name" placeholder="John Doe" required />
                      <Input label="Phone" placeholder="(555) 123-4567" required />
                    </div>
                    <Input label="Email" type="email" placeholder="john@example.com" />
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      size="lg"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </Button>
                  </form>
                </GlassCard>

                {/* Map */}
                <GlassCard className="h-[300px] overflow-hidden p-0" padding="none">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.8856792482847!2d-73.86843492397566!3d40.67686657139882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25d7c1c8b8f8b%3A0x1234567890abcdef!2s1134%20Liberty%20Ave%2C%20Brooklyn%2C%20NY%2011208!5e0!3m2!1sen!2sus!4v1704700000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(0.9)" }}
                    allowFullScreen
                    loading="lazy"
                    title="Map"
                  />
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

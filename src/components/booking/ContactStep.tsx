"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn, fadeInUpVariants, staggerContainerVariants, formatPhoneNumber, isValidEmail, isValidPhone } from "@/lib/utils";
import type { BookingData } from "@/app/book/page";

interface ContactStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
}

export function ContactStep({ data, onUpdate }: ContactStepProps) {
  const [errors, setErrors] = React.useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  const handleChange = (field: keyof BookingData, value: string) => {
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [field.replace("customer", "").toLowerCase()]: undefined }));
    
    // Format phone number as user types
    if (field === "customerPhone") {
      value = formatPhoneNumber(value);
    }
    
    onUpdate({ [field]: value });
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, name: "Name is required" }));
        } else if (value.trim().length < 2) {
          setErrors((prev) => ({ ...prev, name: "Please enter your full name" }));
        }
        break;
      case "phone":
        if (!value) {
          setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
        } else if (!isValidPhone(value)) {
          setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }));
        }
        break;
      case "email":
        if (!value) {
          setErrors((prev) => ({ ...prev, email: "Email is required" }));
        } else if (!isValidEmail(value)) {
          setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
        }
        break;
    }
  };

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Step Title */}
      <motion.div variants={fadeInUpVariants} className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          How can we reach you?
        </h2>
        <p className="text-neutral-400">
          We&apos;ll send booking confirmation and repair updates to your phone and email
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.div variants={fadeInUpVariants}>
        <GlassCard className="p-8">
          <div className="space-y-6">
            {/* Name Input */}
            <Input
              label="Full Name"
              placeholder="John Smith"
              value={data.customerName}
              onChange={(e) => handleChange("customerName", e.target.value)}
              onBlur={() => validateField("name", data.customerName)}
              error={errors.name}
              leftIcon={<User className="w-5 h-5" />}
            />

            {/* Phone Input */}
            <Input
              type="tel"
              label="Phone Number"
              placeholder="(929) 123-4567"
              value={data.customerPhone}
              onChange={(e) => handleChange("customerPhone", e.target.value)}
              onBlur={() => validateField("phone", data.customerPhone)}
              error={errors.phone}
              leftIcon={<Phone className="w-5 h-5" />}
              hint="We'll send SMS updates about your repair"
            />

            {/* Email Input */}
            <Input
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              value={data.customerEmail}
              onChange={(e) => handleChange("customerEmail", e.target.value)}
              onBlur={() => validateField("email", data.customerEmail)}
              error={errors.email}
              leftIcon={<Mail className="w-5 h-5" />}
              hint="For booking confirmation and receipt"
            />
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 rounded-xl bg-neutral-800/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-400">
              Your information is secure and will only be used to contact you about your repair.
              We will never share your data with third parties. By continuing, you agree to receive
              SMS and email notifications about your booking.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* What to Expect */}
      <motion.div
        variants={fadeInUpVariants}
        className="mt-6"
      >
        <GlassCard className="p-6">
          <h3 className="font-semibold text-white mb-4">What to Expect</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-400">1</span>
              </div>
              <p className="text-sm text-neutral-300">
                <strong className="text-white">Instant Confirmation</strong> — Receive SMS + email with booking details
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-400">2</span>
              </div>
              <p className="text-sm text-neutral-300">
                <strong className="text-white">24-Hour Reminder</strong> — We&apos;ll text you the day before your appointment
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-400">3</span>
              </div>
              <p className="text-sm text-neutral-300">
                <strong className="text-white">Live Updates</strong> — Track repair progress in real-time
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

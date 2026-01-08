"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Wrench,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ISSUE_TYPES, BUSINESS_INFO } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";
import type { BookingData } from "@/app/book/page";

interface ConfirmationStepProps {
  data: BookingData;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function ConfirmationStep({ data, isSubmitting, onSubmit }: ConfirmationStepProps) {
  const selectedIssue = ISSUE_TYPES.find((i) => i.id === data.issueType);

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Step Title */}
      <motion.div variants={fadeInUpVariants} className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Review Your Booking
        </h2>
        <p className="text-neutral-400">
          Please confirm all details are correct before submitting
        </p>
      </motion.div>

      {/* Booking Summary */}
      <motion.div variants={fadeInUpVariants}>
        <GlassCard className="p-6 lg:p-8" glow>
          <div className="space-y-6">
            {/* Device & Issue */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Device */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary-500/20">
                  <Smartphone className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Device</p>
                  <p className="font-semibold text-white">{data.deviceModel}</p>
                  <p className="text-sm text-neutral-500">{data.deviceBrand}</p>
                </div>
              </div>

              {/* Issue */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-500/20">
                  <Wrench className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Issue</p>
                  <p className="font-semibold text-white">{selectedIssue?.name}</p>
                  <p className="text-sm text-neutral-500">{data.estimatedTime}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-neutral-800" />

            {/* Date & Time */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success-500/20">
                  <Calendar className="w-6 h-6 text-success-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Date</p>
                  <p className="font-semibold text-white">
                    {data.appointmentDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-warning-500/20">
                  <Clock className="w-6 h-6 text-warning-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Time</p>
                  <p className="font-semibold text-white">{data.appointmentTime}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-neutral-800" />

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Contact Information</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-300">{data.customerName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-300">{data.customerPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-300">{data.customerEmail}</span>
                </div>
              </div>
            </div>

            {/* Photos */}
            {data.photos.length > 0 && (
              <>
                <div className="h-px bg-neutral-800" />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-5 h-5 text-neutral-500" />
                    <span className="text-sm text-neutral-400">
                      {data.photos.length} photo{data.photos.length > 1 ? "s" : ""} attached
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {data.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="h-px bg-neutral-800" />

            {/* Price Estimate */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-primary-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Estimated Price</p>
                    <p className="text-2xl font-bold text-white">
                      ${data.estimatedPrice.min} - ${data.estimatedPrice.max}
                    </p>
                  </div>
                </div>
                <Badge variant="success">No upfront payment</Badge>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Final price confirmed after in-person diagnosis. Pay only when you pick up.
              </p>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-800/50">
              <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">{BUSINESS_INFO.name}</p>
                <p className="text-sm text-neutral-400">{BUSINESS_INFO.fullAddress}</p>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-400 hover:underline mt-1 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Terms & Submit */}
      <motion.div variants={fadeInUpVariants} className="mt-8">
        <div className="text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-success-400" />
              <span>90-day warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <CheckCircle2 className="w-4 h-4 text-success-400" />
              <span>Free re-repair if needed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <DollarSign className="w-4 h-4 text-success-400" />
              <span>No payment until pickup</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            size="xl"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="min-w-[250px] shadow-glow-md hover:shadow-glow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Confirming Booking...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Confirm Booking
              </>
            )}
          </Button>

          {/* Terms */}
          <p className="text-xs text-neutral-500 mt-4 max-w-md mx-auto">
            By confirming, you agree to our terms of service and consent to receive 
            SMS and email notifications about your repair.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Clock,
  User,
  Camera,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/Card";
import { StepProgress } from "@/components/ui/Progress";
import { BUSINESS_INFO, DEVICE_TYPES, ISSUE_TYPES, DEVICE_MODELS } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";

// Step Components
import { DeviceStep } from "@/components/booking/DeviceStep";
import { IssueStep } from "@/components/booking/IssueStep";
import { DateTimeStep } from "@/components/booking/DateTimeStep";
import { ContactStep } from "@/components/booking/ContactStep";
import { PhotoStep } from "@/components/booking/PhotoStep";
import { ConfirmationStep } from "@/components/booking/ConfirmationStep";

export interface BookingData {
  // Device
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  
  // Issue
  issueType: string;
  issueDescription: string;
  
  // DateTime
  appointmentDate: Date | null;
  appointmentTime: string;
  
  // Contact
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  
  // Photos
  photos: File[];
  
  // Estimate
  estimatedPrice: { min: number; max: number };
  estimatedTime: string;
}

const initialBookingData: BookingData = {
  deviceType: "",
  deviceBrand: "",
  deviceModel: "",
  issueType: "",
  issueDescription: "",
  appointmentDate: null,
  appointmentTime: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  photos: [],
  estimatedPrice: { min: 0, max: 0 },
  estimatedTime: "",
};

const STEPS = [
  { id: 1, name: "Device", icon: Smartphone },
  { id: 2, name: "Issue", icon: Clock },
  { id: 3, name: "Schedule", icon: Clock },
  { id: 4, name: "Contact", icon: User },
  { id: 5, name: "Photos", icon: Camera },
  { id: 6, name: "Confirm", icon: CheckCircle2 },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    bookingNumber: string;
    trackingCode: string;
  } | null>(null);

  const updateBookingData = useCallback((data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate confirmation
      const bookingNumber = `ME-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const trackingCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      setBookingConfirmation({ bookingNumber, trackingCode });
      setBookingComplete(true);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return bookingData.deviceType && bookingData.deviceModel;
      case 2:
        return bookingData.issueType;
      case 3:
        return bookingData.appointmentDate && bookingData.appointmentTime;
      case 4:
        return (
          bookingData.customerName &&
          bookingData.customerPhone &&
          bookingData.customerEmail
        );
      case 5:
        return true; // Photos are optional
      case 6:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DeviceStep
            data={bookingData}
            onUpdate={updateBookingData}
          />
        );
      case 2:
        return (
          <IssueStep
            data={bookingData}
            onUpdate={updateBookingData}
          />
        );
      case 3:
        return (
          <DateTimeStep
            data={bookingData}
            onUpdate={updateBookingData}
          />
        );
      case 4:
        return (
          <ContactStep
            data={bookingData}
            onUpdate={updateBookingData}
          />
        );
      case 5:
        return (
          <PhotoStep
            data={bookingData}
            onUpdate={updateBookingData}
          />
        );
      case 6:
        return (
          <ConfirmationStep
            data={bookingData}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  if (bookingComplete && bookingConfirmation) {
    return (
      <>
        <Header />
        <SuccessPage
          bookingNumber={bookingConfirmation.bookingNumber}
          trackingCode={bookingConfirmation.trackingCode}
          bookingData={bookingData}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-950 py-12 lg:py-20">
        <div className="container-custom">
          {/* Page Header */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUpVariants} className="inline-flex mb-4">
              <Badge variant="primary" size="lg" icon={<Smartphone className="w-3 h-3" />}>
                Book Your Repair
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeInUpVariants} className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Schedule Your Device Repair
            </motion.h1>
            
            <motion.p variants={fadeInUpVariants} className="text-neutral-400 max-w-lg mx-auto">
              Takes under 60 seconds. Most repairs completed same-day.
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <StepProgress
              currentStep={currentStep}
              totalSteps={6}
              labels={STEPS.map((s) => s.name)}
            />
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  leftIcon={<ArrowLeft className="w-5 h-5" />}
                >
                  Back
                </Button>
                
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {currentStep === 5 ? "Review Booking" : "Continue"}
                </Button>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-neutral-800">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-400" />
                <span>Same-day repairs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-400" />
                <span>90-day warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-400" />
                <span>No payment until pickup</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Success Page Component
function SuccessPage({
  bookingNumber,
  trackingCode,
  bookingData,
}: {
  bookingNumber: string;
  trackingCode: string;
  bookingData: BookingData;
}) {
  return (
    <main className="min-h-screen bg-neutral-950 py-20">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-success-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-neutral-400 mb-8">
            We&apos;ve sent a confirmation to your phone and email.
          </p>

          {/* Booking Details Card */}
          <GlassCard className="p-8 text-left mb-8">
            <div className="grid gap-6">
              {/* Booking Number */}
              <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                <p className="text-sm text-neutral-400 mb-1">Booking Number</p>
                <p className="text-2xl font-mono font-bold text-white">{bookingNumber}</p>
              </div>

              {/* Tracking Code */}
              <div className="p-4 rounded-xl bg-neutral-800">
                <p className="text-sm text-neutral-400 mb-1">Tracking Code</p>
                <p className="text-xl font-mono font-bold text-primary-400">{trackingCode}</p>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Device</p>
                  <p className="text-white">{bookingData.deviceModel}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Issue</p>
                  <p className="text-white">
                    {ISSUE_TYPES.find((i) => i.id === bookingData.issueType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Date & Time</p>
                  <p className="text-white">
                    {bookingData.appointmentDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                    {" at "}
                    {bookingData.appointmentTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Estimated Price</p>
                  <p className="text-white">
                    ${bookingData.estimatedPrice.min} - ${bookingData.estimatedPrice.max}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-800">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{BUSINESS_INFO.name}</p>
                  <p className="text-sm text-neutral-400">{BUSINESS_INFO.fullAddress}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </main>
  );
}

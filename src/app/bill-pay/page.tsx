"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  DollarSign,
  Wifi,
  Search,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { cn, fadeInUpVariants, staggerContainerVariants, formatPhoneNumber } from "@/lib/utils";

const CARRIERS = [
  { id: "verizon", name: "Verizon Wireless", color: "#CD040B" },
  { id: "tmobile", name: "T-Mobile", color: "#EA0A8E" },
  { id: "att", name: "AT&T", color: "#00A8E0" },
  { id: "simple", name: "Simple Mobile", color: "#00A900" },
  { id: "ultra", name: "Ultra Mobile", color: "#FF6C2F" },
  { id: "lyca", name: "Lyca Mobile", color: "#0055A5" },
  { id: "h2o", name: "H2O Wireless", color: "#FFD100" },
  { id: "boost", name: "Boost Mobile", color: "#F7901E" },
  { id: "cricket", name: "Cricket Wireless", color: "#008752" },
  { id: "metro", name: "Metro by T-Mobile", color: "#4C0686" },
];

export default function BillPayPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    carrier: "",
    phoneNumber: "",
    amount: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phoneNumber: formatPhoneNumber(e.target.value) });
  };

  const selectedCarrier = CARRIERS.find((c) => c.id === formData.carrier);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate lookup
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep(2);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(3);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-950 py-20">
        <div className="container-custom max-w-2xl">
          {/* Header */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUpVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-500/10 text-success-400 text-xs font-medium mb-4 border border-success-500/20">
              <Wifi className="w-3 h-3" />
              <span>Instant Refill</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUpVariants} className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Pay Your Phone Bill
            </motion.h1>
            
            <motion.p variants={fadeInUpVariants} className="text-neutral-400">
              Securely pay bills for all major carriers. Instant confirmation via SMS.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8">
              {/* Steps Indicator */}
              <div className="flex items-center justify-between mb-8 relative">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300",
                      step >= s ? "bg-primary-500 text-white" : "bg-neutral-800 text-neutral-500"
                    )}>
                      {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                    <span className={cn(
                      "text-xs font-medium transition-colors duration-300",
                      step >= s ? "text-white" : "text-neutral-500"
                    )}>
                      {s === 1 ? "Carrier" : s === 2 ? "Amount" : "Confirm"}
                    </span>
                  </div>
                ))}
                {/* Progress Line */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-neutral-800 -z-0">
                  <motion.div
                    className="h-full bg-primary-500 transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Carrier & Phone */}
              {step === 1 && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleLookup}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-neutral-300">
                      Select Carrier
                    </label>
                    <Select
                      value={formData.carrier}
                      onValueChange={(val) => setFormData({ ...formData, carrier: val })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose provider..." />
                      </SelectTrigger>
                      <SelectContent>
                        {CARRIERS.map((carrier) => (
                          <SelectItem key={carrier.id} value={carrier.id}>
                            <div className="flex items-center gap-2">
                              {carrier.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    leftIcon={<Smartphone className="w-5 h-5" />}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    isLoading={isProcessing}
                    disabled={!formData.carrier || formData.phoneNumber.length < 14}
                    rightIcon={<Search className="w-4 h-4" />}
                  >
                    Find Account
                  </Button>
                </motion.form>
              )}

              {/* Step 2: Amount & Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-400">Carrier</span>
                      <span className="font-semibold text-white">{selectedCarrier?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-400">Phone Number</span>
                      <span className="font-mono text-white">{formData.phoneNumber}</span>
                    </div>
                  </div>

                  <Input
                    label="Payment Amount"
                    type="number"
                    placeholder="0.00"
                    leftIcon={<DollarSign className="w-5 h-5" />}
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />

                  <div className="p-4 rounded-xl bg-primary-500/10 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-300">
                      A standard $3.00 service fee applies to all online bill payments.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      size="lg"
                      onClick={handlePayment}
                      isLoading={isProcessing}
                      disabled={!formData.amount}
                      rightIcon={<CreditCard className="w-4 h-4" />}
                    >
                      Pay Now
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-success-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                  <p className="text-neutral-400 mb-8">
                    Your payment of ${formData.amount} to {selectedCarrier?.name} has been processed.
                    A confirmation SMS has been sent to {formData.phoneNumber}.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep(1);
                      setFormData({ carrier: "", phoneNumber: "", amount: "" });
                    }}
                  >
                    Make Another Payment
                  </Button>
                </motion.div>
              )}
            </GlassCard>
            
            <p className="text-center text-xs text-neutral-500 mt-6 max-w-md mx-auto">
              Payments are processed securely via Stripe. Mobile Experts Inc is an authorized payment center.
              Payments typically post instantly but may take up to 2 hours.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

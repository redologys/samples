"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceStep } from './steps/DeviceStep';
import { IssueStep } from './steps/IssueStep';
import { TimeStep } from './steps/TimeStep';
import { ContactStep } from './steps/ContactStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { BookingData } from './types';
import { cn } from '@/lib/utils';

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    deviceType: null,
    deviceModel: '',
    issueType: '',
    estimatedPrice: 0,
    date: null,
    timeSlot: null,
    contact: {
      name: '',
      phone: '',
      email: '',
      notes: '',
    },
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const updateData = (newData: Partial<BookingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (step === 4) {
      // Submit booking logic would go here
      // e.g. await submitBooking(data);
      setIsCompleted(true);
    } else {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  if (isCompleted) {
    return <ConfirmationStep data={data} />;
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8 md:mb-12">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xl font-black uppercase text-brand-black">Step {step} of 4</span>
          <span className="text-sm font-bold uppercase text-neutral-400">
            {step === 1 && "Device Selection"}
            {step === 2 && "Issue Selection"}
            {step === 3 && "Date & Time"}
            {step === 4 && "Details"}
          </span>
        </div>
        <div className="h-4 w-full bg-neutral-200 border-2 border-brand-black rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-yellow"
            initial={{ width: `${((step - 1) / 4) * 100}%` }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <DeviceStep data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
          )}
          {step === 2 && (
            <IssueStep data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
          )}
          {step === 3 && (
            <TimeStep data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
          )}
          {step === 4 && (
            <ContactStep data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

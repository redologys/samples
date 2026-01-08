"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Tablet, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { DEVICE_TYPES, DEVICE_MODELS } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";
import type { BookingData } from "@/app/book/page";

interface DeviceStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
}

export function DeviceStep({ data, onUpdate }: DeviceStepProps) {
  const handleDeviceTypeSelect = (deviceType: string) => {
    const deviceInfo = DEVICE_TYPES.find((d) => d.id === deviceType);
    onUpdate({
      deviceType,
      deviceBrand: deviceInfo?.name || "",
      deviceModel: "",
    });
  };

  const handleModelSelect = (model: string) => {
    onUpdate({ deviceModel: model });
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
          What device needs repair?
        </h2>
        <p className="text-neutral-400">
          Select your device type and model
        </p>
      </motion.div>

      {/* Device Type Grid */}
      <motion.div variants={fadeInUpVariants} className="mb-8">
        <label className="block text-sm font-medium text-neutral-300 mb-4">
          Device Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {DEVICE_TYPES.map((device) => {
            const isSelected = data.deviceType === device.id;
            
            return (
              <button
                key={device.id}
                onClick={() => handleDeviceTypeSelect(device.id)}
                className={cn(
                  "relative p-4 rounded-2xl border-2 transition-all duration-200",
                  "flex flex-col items-center gap-3 text-center",
                  isSelected
                    ? "bg-primary-500/10 border-primary-500 shadow-glow-sm"
                    : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50"
                )}
              >
                {/* Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                  isSelected ? "bg-primary-500/20" : "bg-neutral-800"
                )}>
                  {device.id === "tablet" ? (
                    <Tablet className={cn(
                      "w-6 h-6",
                      isSelected ? "text-primary-400" : "text-neutral-400"
                    )} />
                  ) : (
                    <Smartphone className={cn(
                      "w-6 h-6",
                      isSelected ? "text-primary-400" : "text-neutral-400"
                    )} />
                  )}
                </div>
                
                {/* Name */}
                <span className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-white" : "text-neutral-300"
                )}>
                  {device.name}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Model Selection */}
      {data.deviceType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard className="p-6">
            <label className="block text-sm font-medium text-neutral-300 mb-4">
              Select Your Model
            </label>
            <Select
              value={data.deviceModel}
              onValueChange={handleModelSelect}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your device model..." />
              </SelectTrigger>
              <SelectContent>
                {DEVICE_MODELS[data.deviceType as keyof typeof DEVICE_MODELS]?.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {data.deviceModel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 rounded-xl bg-success-500/10 border border-success-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-success-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Selected Device</p>
                    <p className="font-semibold text-white">{data.deviceModel}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
}

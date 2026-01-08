"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Battery,
  Droplets,
  PlugZap,
  Camera,
  Layers,
  Volume2,
  HelpCircle,
  Check,
  Clock,
  DollarSign,
} from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ISSUE_TYPES } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";
import type { BookingData } from "@/app/book/page";

interface IssueStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  BatteryLow: Battery,
  Droplets,
  PlugZap,
  Camera,
  Layers,
  Volume2,
  HelpCircle,
};

export function IssueStep({ data, onUpdate }: IssueStepProps) {
  const handleIssueSelect = (issueId: string) => {
    const issue = ISSUE_TYPES.find((i) => i.id === issueId);
    
    if (issue) {
      // Parse price range
      const priceMatch = issue.priceRange.match(/\$(\d+)\s*-\s*\$(\d+)/);
      const minPrice = priceMatch ? parseInt(priceMatch[1]) : 0;
      const maxPrice = priceMatch ? parseInt(priceMatch[2]) : 0;
      
      onUpdate({
        issueType: issueId,
        estimatedPrice: { min: minPrice, max: maxPrice },
        estimatedTime: issue.estimatedTime,
      });
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
          What&apos;s wrong with your {data.deviceModel || "device"}?
        </h2>
        <p className="text-neutral-400">
          Select the issue that best describes your problem
        </p>
      </motion.div>

      {/* Issues Grid */}
      <motion.div 
        variants={fadeInUpVariants}
        className="grid sm:grid-cols-2 gap-4"
      >
        {ISSUE_TYPES.map((issue) => {
          const Icon = iconMap[issue.icon] || HelpCircle;
          const isSelected = data.issueType === issue.id;
          
          return (
            <button
              key={issue.id}
              onClick={() => handleIssueSelect(issue.id)}
              className={cn(
                "relative p-5 rounded-2xl border-2 text-left transition-all duration-200",
                isSelected
                  ? "bg-primary-500/10 border-primary-500 shadow-glow-sm"
                  : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50"
              )}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                  isSelected ? "bg-primary-500/20" : "bg-neutral-800"
                )}>
                  <Icon className={cn(
                    "w-6 h-6",
                    isSelected ? "text-primary-400" : "text-neutral-400"
                  )} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "font-semibold mb-1",
                    isSelected ? "text-white" : "text-neutral-200"
                  )}>
                    {issue.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                    {issue.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={isSelected ? "primary" : "neutral"} size="sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {issue.estimatedTime}
                    </Badge>
                    <Badge variant={isSelected ? "accent" : "neutral"} size="sm">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {issue.priceRange}
                    </Badge>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* Selected Issue Summary */}
      {data.issueType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <GlassCard className="p-6" glow>
            <h3 className="font-semibold text-white mb-4">Estimate Summary</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-neutral-800/50">
                <p className="text-sm text-neutral-400 mb-1">Device</p>
                <p className="font-semibold text-white">{data.deviceModel}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-neutral-800/50">
                <p className="text-sm text-neutral-400 mb-1">Estimated Time</p>
                <p className="font-semibold text-primary-400">{data.estimatedTime}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-neutral-800/50">
                <p className="text-sm text-neutral-400 mb-1">Price Range</p>
                <p className="font-semibold text-accent-400">
                  ${data.estimatedPrice.min} - ${data.estimatedPrice.max}
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-4 text-center">
              * Final price determined after in-person diagnosis. No payment until pickup.
            </p>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BUSINESS_HOURS, TIME_SLOTS } from "@/lib/constants";
import { cn, fadeInUpVariants, staggerContainerVariants, generateTimeSlots } from "@/lib/utils";
import type { BookingData } from "@/app/book/page";

interface DateTimeStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
}

export function DateTimeStep({ data, onUpdate }: DateTimeStepProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  }, [currentMonth]);

  // Get available time slots for selected date
  const availableSlots = useMemo(() => {
    if (!data.appointmentDate) return [];
    return generateTimeSlots(data.appointmentDate);
  }, [data.appointmentDate]);

  const handleDateSelect = (date: Date) => {
    onUpdate({
      appointmentDate: date,
      appointmentTime: "", // Reset time when date changes
    });
  };

  const handleTimeSelect = (time: string) => {
    onUpdate({ appointmentTime: time });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateDisabled = (date: Date | null): boolean => {
    if (!date) return true;
    if (date < today) return true;
    
    const dayOfWeek = date.getDay();
    const hours = BUSINESS_HOURS[dayOfWeek];
    return hours.isClosed;
  };

  const isDateSelected = (date: Date | null): boolean => {
    if (!date || !data.appointmentDate) return false;
    return date.toDateString() === data.appointmentDate.toDateString();
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
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
          When would you like to come in?
        </h2>
        <p className="text-neutral-400">
          Choose a convenient date and time for your repair
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <motion.div variants={fadeInUpVariants}>
          <GlassCard className="p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={prevMonth}
                disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <h3 className="text-lg font-semibold text-white">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
              
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={nextMonth}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                const disabled = isDateDisabled(date);
                const selected = isDateSelected(date);
                const todayDate = isToday(date);
                
                return (
                  <button
                    key={index}
                    onClick={() => date && !disabled && handleDateSelect(date)}
                    disabled={disabled}
                    className={cn(
                      "aspect-square p-2 rounded-xl text-sm font-medium transition-all duration-200",
                      !date && "invisible",
                      disabled && "text-neutral-700 cursor-not-allowed",
                      !disabled && !selected && "text-neutral-300 hover:bg-neutral-800",
                      selected && "bg-primary-500 text-white shadow-glow-sm",
                      todayDate && !selected && "ring-2 ring-primary-500/50"
                    )}
                  >
                    {date?.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary-500" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded ring-2 ring-primary-500/50" />
                <span>Today</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Time Slots */}
        <motion.div variants={fadeInUpVariants}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary-400" />
              <h3 className="text-lg font-semibold text-white">
                {data.appointmentDate 
                  ? `Available Times - ${data.appointmentDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`
                  : "Select a Date First"
                }
              </h3>
            </div>

            {data.appointmentDate ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableSlots.map((time) => {
                  const isSelected = data.appointmentTime === time;
                  
                  return (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isSelected
                          ? "bg-primary-500 text-white shadow-glow-sm"
                          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="w-12 h-12 text-neutral-600 mb-4" />
                <p className="text-neutral-500">
                  Please select a date to see available time slots
                </p>
              </div>
            )}

            {/* Business Hours Note */}
            <div className="mt-6 p-4 rounded-xl bg-neutral-800/50">
              <p className="text-xs text-neutral-400">
                <strong className="text-neutral-300">Business Hours:</strong>
                {" "}Mon-Sat: 9AM-9PM, Sun: 10AM-7PM
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Selected Summary */}
      {data.appointmentDate && data.appointmentTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <GlassCard className="p-4" glow>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success-400" />
                <span className="text-white font-medium">
                  {data.appointmentDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span className="text-neutral-600">•</span>
              <Badge variant="primary" size="lg">
                {data.appointmentTime}
              </Badge>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
}

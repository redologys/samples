import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StepProps } from '../types';

export function TimeStep({ data, updateData, onNext, onBack }: StepProps) {
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    data.date ? data.date.toISOString().split('T')[0] : ''
  );
  
  // Generate next 14 days
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d,
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      value: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
    };
  });

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', 
    '6:00 PM', '7:00 PM'
  ];

  const handleDateSelect = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    const dateObj = new Date(dateStr);
    updateData({ date: dateObj, timeSlot: null }); // Reset time when date changes
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black uppercase text-brand-black">Choose Your Slot</h2>
        <p className="text-neutral-500">When should we expect you?</p>
      </div>

      <div className="space-y-6">
        {/* Date Selection */}
        <div className="bg-white border-2 border-brand-black p-6 relative">
          <div className="absolute top-0 left-0 bg-brand-black text-white px-3 py-1 text-xs font-bold uppercase">
             Select Date
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-4">
            {dates.map((item) => {
              const isSelected = selectedDateStr === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleDateSelect(item.value)}
                  className={cn(
                    "flex flex-col items-center p-3 border-2 transition-all",
                    isSelected 
                      ? "bg-brand-yellow border-brand-black" 
                      : "bg-white border-neutral-200 hover:border-brand-black"
                  )}
                >
                  <span className={cn("text-xs uppercase font-bold", isSelected ? "text-brand-black" : "text-neutral-500")}>
                    {item.dayName}
                  </span>
                  <span className={cn("text-xl font-black", isSelected ? "text-brand-black" : "text-neutral-900")}>
                    {item.dayNum}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div className={cn(
          "bg-white border-2 border-brand-black p-6 relative transition-opacity duration-300",
          !selectedDateStr ? "opacity-50 pointer-events-none" : "opacity-100"
        )}>
          <div className="absolute top-0 left-0 bg-brand-black text-white px-3 py-1 text-xs font-bold uppercase">
             Select Time
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
            {timeSlots.map((time) => {
              const isSelected = data.timeSlot === time;
              return (
                <button
                  key={time}
                  onClick={() => updateData({ timeSlot: time })}
                  className={cn(
                    "py-3 px-2 border-2 text-sm font-bold uppercase transition-all",
                    isSelected 
                      ? "bg-brand-black text-brand-yellow border-brand-black" 
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-brand-black hover:text-brand-black"
                  )}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" className="text-brand-black border-brand-black hover:bg-neutral-100">
           <ChevronLeft className="mr-2 w-4 h-4" /> BACK
        </Button>
        <Button 
          disabled={!data.date || !data.timeSlot} 
          onClick={onNext}
          size="lg"
          variant={data.date && data.timeSlot ? 'primary' : 'secondary'}
          className={cn(data.date && data.timeSlot ? "bg-brand-black text-brand-yellow hover:bg-neutral-800" : "opacity-50")}
        >
          CONTINUE <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

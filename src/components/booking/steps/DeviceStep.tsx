import React from 'react';
import { Smartphone, Tablet, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StepProps } from '../types';

export function DeviceStep({ data, updateData, onNext }: StepProps) {
  const devices = [
    { id: 'iphone', label: 'iPhone', icon: Smartphone },
    { id: 'samsung', label: 'Samsung', icon: Smartphone },
    { id: 'android', label: 'Other Android', icon: Smartphone },
    { id: 'tablet', label: 'iPad / Tablet', icon: Tablet },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black uppercase text-brand-black">What device needs fixing?</h2>
        <p className="text-neutral-500">Select your device type to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {devices.map((device) => {
          const isSelected = data.deviceType === device.id;
          return (
            <button
              key={device.id}
              onClick={() => updateData({ deviceType: device.id as any })}
              className={cn(
                "p-6 h-48 flex flex-col items-center justify-center gap-4 border-2 transition-all duration-200 group",
                isSelected 
                  ? "bg-brand-yellow border-brand-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]" 
                  : "bg-white border-neutral-200 hover:border-brand-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
              )}
            >
              <device.icon className={cn(
                "w-12 h-12 transition-colors",
                isSelected ? "text-brand-black" : "text-neutral-400 group-hover:text-brand-black"
              )} />
              <span className={cn(
                "font-bold uppercase tracking-wide",
                isSelected ? "text-brand-black" : "text-neutral-600 group-hover:text-brand-black"
              )}>
                {device.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          disabled={!data.deviceType} 
          onClick={onNext}
          size="lg"
          variant={data.deviceType ? 'primary' : 'secondary'}
          className={cn(data.deviceType ? "bg-brand-black text-brand-yellow hover:bg-neutral-800" : "opacity-50")}
        >
          CONTINUE <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

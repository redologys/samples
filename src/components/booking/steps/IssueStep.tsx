import React from 'react';
import { Smartphone, Battery, Zap, Droplets, Camera, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StepProps } from '../types';

export function IssueStep({ data, updateData, onNext, onBack }: StepProps) {
  const issues = [
    { id: 'screen', label: 'Cracked Screen', price: 85, icon: Smartphone },
    { id: 'battery', label: 'Battery Draining', price: 45, icon: Battery },
    { id: 'charging', label: 'Charging Issue', price: 55, icon: Zap },
    { id: 'water', label: 'Water Damage', price: 90, icon: Droplets },
    { id: 'camera', label: 'Camera Issue', price: 65, icon: Camera },
    { id: 'other', label: 'Other Problem', price: 0, icon: HelpCircle },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black uppercase text-brand-black">What's the problem?</h2>
        <p className="text-neutral-500">Select the issue you're experiencing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues.map((issue) => {
          const isSelected = data.issueType === issue.id;
          return (
            <button
              key={issue.id}
              onClick={() => updateData({ issueType: issue.id, estimatedPrice: issue.price })}
              className={cn(
                "p-6 flex flex-col items-start gap-4 border-2 transition-all duration-200 group relative overflow-hidden",
                isSelected 
                  ? "bg-brand-black border-brand-black shadow-[4px_4px_0px_0px_rgba(255,214,0,1)]" 
                  : "bg-white border-neutral-200 hover:border-brand-black"
              )}
            >
              <div className="flex justify-between w-full">
                <issue.icon className={cn(
                  "w-8 h-8",
                  isSelected ? "text-brand-yellow" : "text-neutral-400 group-hover:text-brand-black"
                )} />
                <span className={cn(
                  "text-sm font-bold px-2 py-1 border-2",
                  isSelected ? "text-brand-black bg-brand-yellow border-brand-yellow" : "text-neutral-400 border-neutral-200 group-hover:border-brand-black group-hover:text-brand-black"
                )}>
                  {issue.price > 0 ? `~$${issue.price}` : 'Free Quote'}
                </span>
              </div>
              
              <span className={cn(
                "font-bold uppercase tracking-wide text-lg text-left",
                isSelected ? "text-white" : "text-neutral-600 group-hover:text-brand-black"
              )}>
                {issue.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" className="text-brand-black border-brand-black hover:bg-neutral-100">
           <ChevronLeft className="mr-2 w-4 h-4" /> BACK
        </Button>
        <Button 
          disabled={!data.issueType} 
          onClick={onNext}
          size="lg"
          variant={data.issueType ? 'primary' : 'secondary'}
          className={cn(data.issueType ? "bg-brand-black text-brand-yellow hover:bg-neutral-800" : "opacity-50")}
        >
          CONTINUE <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

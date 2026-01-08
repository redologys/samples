import React, { useState } from 'react';
import { User, Phone, Mail, FileText, ChevronLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StepProps } from '../types';

export function ContactStep({ data, updateData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({
      contact: {
        ...data.contact,
        [name]: value,
      }
    });
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.contact.name) newErrors.name = "Name is required";
    if (!data.contact.phone) newErrors.phone = "Phone is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(); // This handles the final booking submission
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      <div className="lg:col-span-2 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-black uppercase text-brand-black">Contact Info</h2>
          <p className="text-neutral-500">How can we reach you?</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase text-brand-black">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
              <input 
                name="name"
                value={data.contact.name}
                onChange={handleChange}
                className={cn(
                  "w-full pl-12 pr-4 py-3 border-2 focus:outline-none focus:border-brand-yellow font-bold text-lg",
                  errors.name ? "border-red-500" : "border-neutral-200"
                )}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name}</p>}
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold uppercase text-brand-black">Phone Number</label>
             <div className="relative">
               <Phone className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
               <input 
                 name="phone"
                 value={data.contact.phone}
                 onChange={handleChange}
                 className={cn(
                   "w-full pl-12 pr-4 py-3 border-2 focus:outline-none focus:border-brand-yellow font-bold text-lg",
                   errors.phone ? "border-red-500" : "border-neutral-200"
                 )}
                 placeholder="(555) 555-5555"
               />
             </div>
             {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold uppercase text-brand-black">Email (Optional)</label>
             <div className="relative">
               <Mail className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
               <input 
                 name="email"
                 value={data.contact.email}
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 focus:outline-none focus:border-brand-yellow font-bold text-lg"
                 placeholder="john@example.com"
               />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold uppercase text-brand-black">Notes / Device Model</label>
             <div className="relative">
               <FileText className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
               <textarea 
                 name="notes"
                 value={data.contact.notes}
                 onChange={handleChange}
                 rows={3}
                 className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 focus:outline-none focus:border-brand-yellow font-bold text-lg resize-none"
                 placeholder="iPhone 13 Pro, screen is flickering..."
               />
             </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline" className="text-brand-black border-brand-black hover:bg-neutral-100">
             <ChevronLeft className="mr-2 w-4 h-4" /> BACK
          </Button>
        </div>
      </div>

      {/* SUMMARY SIDEBAR */}
      <div className="lg:col-span-1">
        <div className="bg-brand-yellow border-4 border-brand-black p-6 sticky top-24 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-black uppercase text-brand-black border-b-2 border-brand-black pb-4">Booking Summary</h3>
          
          <div className="space-y-4 text-sm">
             <div>
               <p className="text-brand-black/60 font-bold uppercase text-xs">Device</p>
               <p className="font-black text-lg uppercase">{data.deviceType || 'Not Selected'}</p>
             </div>
             <div>
               <p className="text-brand-black/60 font-bold uppercase text-xs">Issue</p>
               <p className="font-black text-lg uppercase">{data.issueType || 'Not Selected'}</p>
               {data.estimatedPrice > 0 && (
                 <p className="font-bold text-brand-black">Est. ${data.estimatedPrice}</p>
               )}
             </div>
             <div>
               <p className="text-brand-black/60 font-bold uppercase text-xs">Time</p>
               <p className="font-black text-lg uppercase">
                 {data.date?.toLocaleDateString()}
                 <br/>
                 {data.timeSlot}
               </p>
             </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full bg-brand-black text-brand-yellow hover:bg-white hover:text-black border-2 border-brand-black h-14 text-xl"
            disabled={!data.contact.name || !data.contact.phone}
          >
            CONFIRM BOOKING
          </Button>
          <p className="text-xs text-center font-bold opacity-60">Payment handled in store</p>
        </div>
      </div>
    </div>
  );
}

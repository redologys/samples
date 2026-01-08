import React from 'react';
import Link from 'next/link';
import { Calendar, Check, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BookingData } from '../types';

export function ConfirmationStep({ data }: { data: BookingData }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in py-12">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center border-4 border-brand-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Check className="w-12 h-12 text-white" strokeWidth={4} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-brand-black">Booking Confirmed!</h2>
        <p className="text-xl font-bold text-neutral-600 max-w-md mx-auto">
          We'll see you on {data.date?.toLocaleDateString()} at {data.timeSlot}.
        </p>
        <p className="text-neutral-500">
          You'll receive an SMS confirmation at <span className="font-bold text-brand-black">{data.contact.phone}</span> shortly.
        </p>
      </div>

      <div className="bg-white border-2 border-brand-black p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] text-left">
         <h3 className="font-black uppercase border-b-2 border-brand-black pb-4 mb-4">Booking Details</h3>
         <div className="space-y-3">
           <div className="flex justify-between">
             <span className="text-neutral-500 font-bold uppercase text-sm">Device</span>
             <span className="font-black uppercase">{data.deviceType}</span>
           </div>
           <div className="flex justify-between">
             <span className="text-neutral-500 font-bold uppercase text-sm">Issue</span>
             <span className="font-black uppercase">{data.issueType}</span>
           </div>
           {data.estimatedPrice > 0 && (
             <div className="flex justify-between">
               <span className="text-neutral-500 font-bold uppercase text-sm">Est. Price</span>
               <span className="font-black uppercase">${data.estimatedPrice}</span>
             </div>
           )}
           <div className="flex justify-between border-t-2 border-neutral-100 pt-3 mt-2">
             <span className="text-neutral-500 font-bold uppercase text-sm">Customer</span>
             <span className="font-black uppercase">{data.contact.name}</span>
           </div>
         </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button variant="outline" className="flex-1 border-brand-black hover:bg-neutral-100 font-bold h-12">
          <Calendar className="mr-2 w-4 h-4" /> ADD TO CALENDAR
        </Button>
        <Button asChild size="lg" className="flex-1 bg-brand-yellow text-brand-black border-2 border-brand-black hover:bg-brand-black hover:text-brand-yellow font-bold h-12">
          <Link href="/">
            <Home className="mr-2 w-4 h-4" /> BACK TO HOME
          </Link>
        </Button>
      </div>
    </div>
  );
}

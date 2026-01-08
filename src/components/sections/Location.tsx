
import { Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Location() {
  return (
    <section className="bg-white border-b-4 border-brand-black grid grid-cols-1 md:grid-cols-2 min-h-[700px]">
      
      {/* LEFT: INFO CARD */}
      <div className="p-8 md:p-16 flex flex-col justify-center order-2 md:order-1 bg-brand-black text-white md:bg-white md:text-brand-black">
         <div className="bg-brand-black text-white p-8 md:p-12 border-4 border-white md:border-brand-black shadow-[8px_8px_0px_0px_#ffffff] md:shadow-[12px_12px_0px_0px_#000000] max-w-lg mx-auto md:mx-0 w-full">
            <h2 className="text-4xl font-black uppercase mb-6 text-brand-yellow">Visit Us</h2>
            
            <address className="not-italic space-y-6">
                <div>
                    <h3 className="text-xl font-bold uppercase mb-1">Address</h3>
                    <p className="text-lg opacity-90">123 Bedford Avenue</p>
                    <p className="text-lg opacity-90">Brooklyn, NY 11211</p>
                </div>
                
                <div>
                     <h3 className="text-xl font-bold uppercase mb-1">Phone</h3>
                     <a href="tel:347-555-0100" className="text-lg opacity-90 hover:text-brand-yellow underline transition-colors">
                        347-555-0100
                     </a>
                </div>

                <div>
                    <h3 className="text-xl font-bold uppercase mb-1">Hours</h3>
                    <div className="flex items-center gap-2 text-lg opacity-90">
                        <Zap className="w-5 h-5 text-brand-yellow" />
                        <span>Open 7 Days a Week</span>
                    </div>
                    <p className="text-lg opacity-90 pl-7">10:00 AM — 8:00 PM</p>
                </div>
            </address>

            <div className="mt-8 pt-8 border-t-2 border-white/20">
                <Button className="w-full bg-brand-yellow text-brand-black hover:bg-white border-2 border-transparent hover:border-brand-black font-black uppercase h-12 text-lg transition-all rounded-none">
                    Get Directions
                </Button>
            </div>
         </div>
      </div>

      {/* RIGHT: MAP */}
      <div className="h-[400px] md:h-full bg-neutral-200 border-b-4 md:border-b-0 md:border-l-4 border-brand-black relative order-1 md:order-2">
         {/* Custom Map Styling via CSS Filter */}
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12093.8562725458!2d-73.960248!3d40.718062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259633e9b1d6f%3A0x6e8a4a3a6a8b1d6f!2sBedford%20Ave%2C%20Brooklyn%2C%20NY!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{border:0, filter: 'grayscale(100%) invert(0%) contrast(1.2) brightness(0.9)'}} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
         ></iframe>
         
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <div className="bg-brand-yellow px-4 py-2 border-4 border-brand-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                  <p className="font-black text-xl uppercase">We Are Here</p>
             </div>
             <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-brand-black border-r-[10px] border-r-transparent mx-auto"></div>
         </div>
      </div>
    </section>
  );
}

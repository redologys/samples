
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";

export function Activation() {
  const carriers = [
    "Verizon", "AT&T", "T-Mobile", "Sprint",
    "Metro", "Cricket", "Boost Mobile", "Simple Mobile"
  ];

  return (
    <section className="bg-white border-b-4 border-brand-black flex flex-col lg:flex-row min-h-[600px]">
      
      {/* LEFT: CONTENT & LIST */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-brand-black">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-brand-black mb-8 leading-none tracking-tighter">
          Activate or Top-Up<br/>Any Carrier
        </h2>
        
        <ul className="space-y-4 mb-8">
           {[
             "No appointment needed",
             "Activate new lines or port numbers",
             "International calling plans available",
             "Same-day activation guaranteed"
           ].map((item, i) => (
             <li key={i} className="flex items-center gap-3 text-lg font-bold uppercase">
                <div className="bg-brand-black text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                </div>
                {item}
             </li>
           ))}
        </ul>

        <Button asChild size="lg" className="self-start bg-brand-yellow text-brand-black hover:bg-brand-black hover:text-brand-yellow border-4 border-brand-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold uppercase text-lg px-8 py-6 rounded-none">
            <Link href="/activate" className="flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5"/>
            </Link>
        </Button>
      </div>

      {/* RIGHT: LOGO GRID */}
      <div className="flex-1 bg-neutral-100 p-8 md:p-16 flex flex-col justify-center">
         <div className="grid grid-cols-2 gap-4">
            {carriers.map((carrier, i) => (
                <div key={i} className="aspect-video bg-white border-4 border-brand-black flex items-center justify-center p-4 hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <span className="text-xl md:text-2xl font-black uppercase text-center text-neutral-800">
                        {carrier}
                    </span>
                    {/* In a real app, replace span with next/image logos */}
                </div>
            ))}
         </div>
         <p className="mt-6 text-center text-sm font-bold uppercase text-neutral-500">
            * SIM cards available for all listed carriers
         </p>
      </div>

    </section>
  );
}

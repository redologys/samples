
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function TradeIn() {
  return (
    <section className="bg-brand-yellow border-b-4 border-brand-black min-h-[600px] flex flex-col lg:flex-row">
      {/* LEFT CONTENT */}
      <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-brand-black">
        <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-black leading-none mb-6 tracking-tighter">
          Sell Your<br />Old Devices
        </h2>
        <ul className="space-y-4 mb-8">
          {[
            "Get instant cash for phones, tablets, laptops",
            "Quick evaluation process",
            "Top dollar guaranteed",
            "Environmentally friendly recycling"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-lg md:text-xl font-bold uppercase text-brand-black/90">
              <span className="w-3 h-3 bg-brand-black rotate-45"></span>
              {item}
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="self-start bg-brand-black text-brand-white hover:bg-brand-white hover:text-brand-black border-4 border-transparent hover:border-brand-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none text-xl py-6 px-8">
          <Link href="/sell">GET A QUOTE</Link>
        </Button>
      </div>

      {/* RIGHT CONTENT - VALUES TABLE */}
      <div className="flex-1 bg-white p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
        
        {/* Decorative background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-black opacity-5 -rotate-12 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-yellow opacity-10 rotate-45 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
           {/* Price Cards */}
           {[
             { device: "iPhone 14 Pro", price: "Up to $600" },
             { device: "MacBook Pro M1", price: "Up to $1,200" },
             { device: "iPad Air 5", price: "Up to $400" },
             { device: "Game Consoles", price: "Up to $300" },
           ].map((item, index) => (
             <div key={index} className="flex justify-between items-center p-6 border-4 border-brand-black bg-white hover:bg-neutral-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-xl font-black uppercase tracking-tight">{item.device}</span>
                <span className="text-2xl font-black text-green-600">{item.price}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

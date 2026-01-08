
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShoppingCart } from "lucide-react";

export function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] border-b-4 border-brand-black">
      {/* LEFT HALF - SAME-DAY REPAIRS */}
      <div className="bg-brand-yellow p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-brand-black relative">
        <div className="flex flex-col gap-6 items-start">
          <div className="inline-block border-4 border-brand-black bg-brand-black text-brand-white px-4 py-1 text-sm font-bold uppercase tracking-wider">
            Priority Service
          </div>
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase leading-[0.9] text-brand-black tracking-tighter">
            Same-Day<br />Repairs
          </h1>
          <p className="max-w-md text-lg md:text-xl font-bold uppercase leading-tight text-brand-black/80">
            Screens, Batteries, & Logic Boards fixed in less than 1 hour.
          </p>
        </div>
        
        <div className="mt-12">
            <Button asChild size="lg" className="w-full sm:w-auto h-auto py-4 px-8 bg-brand-black text-brand-white hover:bg-white hover:text-brand-black border-4 border-transparent hover:border-brand-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-xl font-bold uppercase rounded-none">
            <Link href="/book-repair" className="flex items-center justify-center gap-2">
                Book Now <ArrowRight className="w-6 h-6" />
            </Link>
            </Button>
        </div>
      </div>

      {/* RIGHT HALF - ELECTRONICS UNDER $300 */}
      <div className="relative flex min-h-[400px] flex-col justify-end overflow-hidden bg-neutral-900 p-8 md:p-12 lg:p-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1593305841991-05c2e449e316?q=80&w=2070&auto=format&fit=crop")' }}></div>
        <div className="absolute inset-0 z-10 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col gap-6 items-start">
          <div className="inline-block border-2 border-brand-white bg-brand-white text-brand-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Clearance
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter text-brand-white">
            Electronics<br />Under $300
          </h2>
          <p className="max-w-md text-lg font-medium text-brand-white/90">
            Certified refurbished iPhones, MacBooks, and gaming consoles.
          </p>
          <div className="mt-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto h-auto py-4 px-8 bg-brand-yellow text-brand-black border-4 border-brand-yellow hover:bg-brand-white hover:border-brand-white shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-xl font-bold uppercase rounded-none">
              <Link href="/shop" className="flex items-center justify-center gap-2">
                Shop Deals <ShoppingCart className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

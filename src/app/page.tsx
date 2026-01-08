import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star, Zap, ShoppingBag, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { RepairGrid } from "@/components/sections/RepairGrid";
import { ServiceMenu } from "@/components/sections/ServiceMenu";
import { ShopCarousel } from "@/components/sections/ShopCarousel";
import { TradeIn } from "@/components/sections/TradeIn";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Activation } from "@/components/sections/Activation";
import { Accessories } from "@/components/sections/Accessories";
import { Location } from "@/components/sections/Location";

export default function Home() {
  return (
    <div className="bg-brand-black min-h-screen flex flex-col font-sans">
      
      {/* TOP MARQUEE BAR */}
      <div className="bg-brand-black text-brand-yellow py-2 overflow-hidden whitespace-nowrap border-b-2 border-brand-yellow/20">
         <div className="animate-marquee inline-block text-sm font-bold uppercase tracking-widest">
           MOBILE EXPERTS INC • BROOKLYN, NY • OPEN 7 DAYS A WEEK • 347-555-0100 • WALK-INS WELCOME • INSTANT QUOTES • MOBILE EXPERTS INC • BROOKLYN, NY • OPEN 7 DAYS A WEEK • 347-555-0100 •
         </div>
      </div>

      <Header />

      <main className="flex-1 bg-white">
        <Hero />
        <RepairGrid />
        
        {/* SECTION 1: FULL REPAIR SERVICE MENU */}
        <ServiceMenu />
        
        {/* SECTION 2: SHOP ELECTRONICS */}
        <ShopCarousel />
        
        {/* SECTION 3: TRADE-IN PROGRAM */}
        <TradeIn />
        
        {/* SECTION 4: CUSTOMER TESTIMONIALS */}
        <Testimonials />
        
        {/* SECTION 5: WHY CHOOSE US */}
        <WhyChooseUs />
        
        {/* SECTION 6: PHONE ACTIVATION SERVICES */}
        <Activation />
        
        {/* SECTION 7: ACCESSORIES SHOWCASE */}
        <Accessories />
        
        {/* LOCATION SECTION */}
        <Location />
      </main>

      <Footer />
    </div>
  );
}

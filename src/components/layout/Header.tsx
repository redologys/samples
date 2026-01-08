
import Link from "next/link";
import { Zap, Wrench, ShoppingBag, CreditCard, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-col border-b-4 border-brand-black bg-white">
      {/* BRAND & MOBILE ROW */}
      <div className="flex md:flex-row flex-col">
          {/* LOGO */}
          <div className="flex items-center justify-between border-b-4 md:border-b-0 md:border-r-4 border-brand-black bg-brand-yellow px-6 py-4 md:w-auto md:min-w-[300px]">
             <Link href="/" className="flex items-center gap-3 group">
                 <Zap className="w-10 h-10 fill-brand-black stroke-brand-black group-hover:scale-110 transition-transform" />
                 <h1 className="text-2xl font-black uppercase leading-[0.85] tracking-tighter">
                    Mobile<br/>Experts
                 </h1>
             </Link>
             <button className="md:hidden p-2 border-2 border-brand-black bg-white hover:bg-brand-black hover:text-white transition-colors">
                <Menu className="w-6 h-6" />
             </button>
          </div>

          {/* NAV LINKS (Desktop) */}
          <nav className="hidden md:flex flex-1">
             {[
               { name: "Repairs", icon: Wrench, href: "/book-repair" },
               { name: "Shop", icon: ShoppingBag, href: "/shop" },
               { name: "Sell", icon: CreditCard, href: "/sell" },
               { name: "Contact", icon: Mail, href: "/contact" },
             ].map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className={`group flex-1 flex items-center justify-center gap-2 border-r-4 border-brand-black px-6 py-4 text-lg font-bold uppercase hover:bg-brand-black hover:text-brand-yellow transition-all ${index === 3 ? 'border-r-0' : ''}`}
                >
                   <item.icon className="w-5 h-5 group-hover:animate-pulse" />
                   {item.name}
                </Link>
             ))}
          </nav>
      </div>
      
      {/* MOBILE MENU (Hidden by default, simplified for now) */}
      {/* In a real implementation this would be a state-driven dropdown */}
    </header>
  );
}

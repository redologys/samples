
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Cases & Covers",
    price: "From $15",
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&q=80&w=500", // Phone cases
    color: "bg-blue-200"
  },
  {
    title: "Screen Protectors",
    price: "From $10",
    image: "https://images.unsplash.com/photo-1627566141445-07f9c9afef13?auto=format&fit=crop&q=80&w=500", // Glass
    color: "bg-neutral-200"
  },
  {
    title: "Chargers & Cables",
    price: "From $12",
    image: "https://images.unsplash.com/photo-1634542900742-b06f528148b8?auto=format&fit=crop&q=80&w=500", // Cables
    color: "bg-green-200"
  },
  {
    title: "Audio",
    price: "From $25",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=500", // Headphones
    color: "bg-brand-pink/20"
  }
];

export function Accessories() {
  return (
    <section className="bg-neutral-50 border-b-4 border-brand-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-brand-black tracking-tighter leading-none">
            Protect & Accessorize<br/>Your Device
            </h2>
            <Link href="/accessories" className="hidden md:flex items-center gap-2 font-bold uppercase border-b-2 border-brand-black hover:bg-brand-black hover:text-white transition-all px-2 py-1 mb-2">
                View All Accessories <ArrowRight className="w-5 h-5"/>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
                <div key={i} className="group relative border-4 border-brand-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <div className={`h-64 ${cat.color} relative overflow-hidden`}>
                        {/* Image overlay with mix-blend-mode for style */}
                        <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" style={{ backgroundImage: `url('${cat.image}')` }}></div>
                        <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    
                    <div className="p-6 border-t-4 border-brand-black bg-white relative z-10">
                        <h3 className="text-2xl font-black uppercase leading-none mb-2">{cat.title}</h3>
                        <p className="font-bold text-neutral-500 uppercase mb-4">{cat.price}</p>
                        <Link href="/accessories" className="inline-flex items-center font-bold uppercase border-b-2 border-brand-black hover:bg-brand-black hover:text-white transition-colors">
                            Shop Now
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="md:hidden mt-8 text-center">
             <Link href="/accessories" className="inline-flex items-center gap-2 font-bold uppercase border-b-2 border-brand-black">
                View All Accessories <ArrowRight className="w-5 h-5"/>
            </Link>
        </div>
      </div>
    </section>
  );
}

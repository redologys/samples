
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  condition: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "iPhone 13 Pro", price: "$499", condition: "Excellent", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "MacBook Air M1", price: "$699", condition: "Like New", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "iPad Pro 11\"", price: "$449", condition: "Good", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "AirPods Pro", price: "$149", condition: "Refurbished", image: "https://images.unsplash.com/photo-1628210889224-53b2e77b6446?auto=format&fit=crop&q=80&w=500" },
  { id: 5, name: "PlayStation 5", price: "$399", condition: "Used", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=500" },
  { id: 6, name: "Gaming Monitor", price: "$199", condition: "Open Box", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500" },
  { id: 7, name: "Mech Keyboard", price: "$89", condition: "New", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=500" },
  { id: 8, name: "Logitech Webcam", price: "$59", condition: "Like New", image: "https://images.unsplash.com/photo-1587829745563-84b704c48a7c?auto=format&fit=crop&q=80&w=500" },
];

export function ShopCarousel() {
  return (
    <section className="bg-neutral-100 min-h-[700px] py-16 border-b-4 border-brand-black overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
        <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-brand-black tracking-tighter leading-none mb-4">
            Shop Certified<br/>Refurbished Devices
            </h2>
            <div className="h-2 w-32 bg-brand-yellow border-2 border-brand-black"></div>
        </div>
        <Link href="/shop" className="hidden md:flex items-center gap-2 font-bold uppercase border-b-2 border-brand-black hover:bg-brand-black hover:text-white transition-all px-2 py-1">
            View All Products
            <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* CAROUSEL SCROLL CONTAINER */}
      <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 snap-x snap-mandatory scrollbar-hide">
        {products.map((product) => (
            <div key={product.id} className="min-w-[300px] md:min-w-[350px] bg-white border-4 border-brand-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all snap-start flex flex-col">
                {/* Image Area */}
                <div className="h-64 border-b-4 border-brand-black bg-neutral-200 relative overflow-hidden group">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute top-4 left-4 bg-brand-yellow border-2 border-brand-black px-3 py-1 text-xs font-bold uppercase">
                        {product.condition}
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black uppercase leading-tight">{product.name}</h3>
                        <div className="flex">
                            <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                            <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                            <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-brand-black mb-6">{product.price}</p>
                    
                    <Button className="w-full mt-auto bg-brand-black text-white hover:bg-brand-yellow hover:text-brand-black border-2 border-transparent font-bold uppercase rounded-none transition-colors">
                        Add to Cart
                    </Button>
                </div>
            </div>
        ))}
      </div>
      
      <div className="md:hidden px-4 text-center mt-4">
         <Link href="/shop" className="inline-flex items-center gap-2 font-bold uppercase border-b-2 border-brand-black">
            View All Products <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

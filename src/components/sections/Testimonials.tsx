
import { Star } from "lucide-react";
import Link from "next/link";

export function Testimonials() {
  const reviews = [
    {
      text: "Fast, professional, and affordable. Got my screen fixed in 30 minutes!",
      name: "James M.",
      date: "2 days ago",
    },
    {
      text: "They saved my MacBook! Water damage repair was perfect.",
      name: "Sarah K.",
      date: "1 week ago",
    },
    {
      text: "Best prices in Brooklyn. Always my go-to for repairs.",
      name: "Mike D.",
      date: "3 weeks ago",
    },
  ];

  return (
    <section className="bg-white border-b-4 border-brand-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            5.0 Stars From<br />Brooklyn Customers
          </h2>
          <div className="flex justify-center items-center gap-2 mb-4">
             <span className="text-6xl font-black text-brand-black">5.0</span>
             <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-8 h-8 md:w-10 md:h-10 text-brand-yellow fill-brand-yellow stroke-black stroke-2" />
                ))}
             </div>
          </div>
          <p className="font-bold text-neutral-500 uppercase">Based on 500+ Local Reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
                <div key={i} className="bg-neutral-100 border-4 border-brand-black p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                    {/* Quote Icon */}
                    <div className="absolute -top-6 -left-4 bg-brand-yellow border-4 border-brand-black w-12 h-12 flex items-center justify-center">
                        <span className="text-4xl font-black leading-none pt-2">“</span>
                    </div>
                    
                    <p className="text-xl font-bold italic mb-6 leading-tight">
                        &quot;{review.text}&quot;
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                        <span className="font-black uppercase text-lg">{review.name}</span>
                        <div className="flex flex-col items-end">
                            <div className="flex gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-brand-yellow fill-brand-yellow stroke-brand-black" />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-neutral-500 uppercase">{review.date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center mt-16">
            <Link href="https://google.com" target="_blank" className="inline-block font-black uppercase text-xl border-b-4 border-brand-yellow hover:bg-brand-yellow hover:text-brand-black px-2 transition-colors">
                Read More Reviews on Google →
            </Link>
        </div>
      </div>
    </section>
  );
}

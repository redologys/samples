
import { Zap, ShieldCheck, BadgeCheck, Wrench } from "lucide-react";

export function WhyChooseUs() {
  const benefits = [
    {
      title: "Same-Day Service",
      description: "Most repairs completed in under 1 hour",
      icon: Zap,
    },
    {
      title: "Expert Technicians",
      description: "Certified and experienced repair specialists",
      icon: BadgeCheck,
    },
    {
      title: "Quality Parts",
      description: "OEM and premium aftermarket components",
      icon: Wrench,
    },
    {
      title: "90-Day Warranty",
      description: "Guarantee on all repairs for peace of mind",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-neutral-900 border-b-4 border-brand-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16 tracking-tighter">
          The Mobile Experts<br /><span className="text-brand-yellow">Advantage</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-brand-black border-4 border-brand-white group-hover:border-brand-yellow rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                        <benefit.icon className="w-12 h-12 text-white group-hover:text-brand-yellow transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-3 text-brand-yellow">
                        {benefit.title}
                    </h3>
                    <p className="text-lg font-medium text-neutral-300 max-w-xs leading-tight">
                        {benefit.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

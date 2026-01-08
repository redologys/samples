
import { Smartphone, Laptop, Gamepad2, Settings } from "lucide-react";
import Link from "next/link";

const repairs = [
  {
    title: "iPhone Repair",
    subtitle: "From $49",
    icon: Smartphone,
    color: "group-hover:text-brand-yellow",
  },
  {
    title: "Samsung Repair",
    subtitle: "Original Parts",
    icon: Settings, // Android icon replacement
    color: "group-hover:text-green-500", 
  },
  {
    title: "MacBook Repair",
    subtitle: "Logic Boards",
    icon: Laptop,
    color: "group-hover:text-blue-500",
  },
  {
    title: "Game Consoles",
    subtitle: "Xbox & PlayStation",
    icon: Gamepad2,
    color: "group-hover:text-red-500",
  },
];

export function RepairGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b-4 border-brand-black">
      {repairs.map((item, index) => (
        <Link 
          href="/repair" 
          key={index} 
          className={`group flex flex-col items-start gap-4 bg-white p-8 hover:bg-brand-black transition-colors duration-300 border-b-4 sm:border-b-0 ${index !== 3 ? 'lg:border-r-4' : ''} ${index % 2 === 0 ? 'sm:border-r-4 lg:border-r-4' : ''} border-brand-black`}
        >
          <div className={`flex size-14 items-center justify-center border-4 border-brand-black bg-white text-brand-black transition-colors group-hover:border-brand-yellow group-hover:bg-brand-black group-hover:text-brand-yellow`}>
            <item.icon className="text-3xl w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase leading-none text-brand-black group-hover:text-brand-white transition-colors">
              {item.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h3>
            <p className="mt-2 text-sm font-bold uppercase text-brand-black/60 group-hover:text-brand-yellow transition-colors">
              {item.subtitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

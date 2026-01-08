
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ServiceMenu() {
  return (
    <section className="bg-white min-h-[800px] border-b-4 border-brand-black">
      <div className="p-8 md:p-16 border-b-4 border-brand-black">
        <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-black tracking-tighter mb-4">
          Everything We Fix
        </h2>
        <p className="text-xl font-bold uppercase text-brand-black/60">
            Professional Repairs for Every Device
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-brand-black">
        {/* SMARTPHONES */}
        <div className="p-8 md:p-12 hover:bg-neutral-50 transition-colors">
            <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                <span className="w-4 h-4 bg-brand-yellow rounded-full border-2 border-brand-black"></span>
                Smartphones
            </h3>
            <ul className="space-y-4 mb-8">
                {['Screen replacement (All Models)', 'Battery replacement', 'Charging port repair', 'Camera replacement', 'Water damage recovery', 'Back glass replacement'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg font-bold text-brand-black/80">
                        <CheckCircle2 className="w-6 h-6 text-brand-black shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between mt-auto pt-8 border-t-2 border-brand-black/10">
                <span className="text-2xl font-black">From $39</span>
                <Link href="/repairs/smartphone" className="font-bold uppercase border-b-2 border-brand-black hover:bg-brand-black hover:text-white transition-all px-1">
                    View All →
                </Link>
            </div>
        </div>

        {/* COMPUTERS */}
        <div className="p-8 md:p-12 hover:bg-neutral-50 transition-colors">
            <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                <span className="w-4 h-4 bg-blue-500 rounded-full border-2 border-brand-black"></span>
                Computers
            </h3>
            <ul className="space-y-4 mb-8">
                {['MacBook logic board repair', 'Screen replacement', 'Keyboard replacement', 'SSD upgrades', 'RAM upgrades', 'Liquid damage repair'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg font-bold text-brand-black/80">
                        <CheckCircle2 className="w-6 h-6 text-brand-black shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between mt-auto pt-8 border-t-2 border-brand-black/10">
                <span className="text-2xl font-black">From $99</span>
                <Link href="/repairs/computer" className="font-bold uppercase border-b-2 border-brand-black hover:bg-brand-black hover:text-white transition-all px-1">
                    View All →
                </Link>
            </div>
        </div>

        {/* GAMING */}
        <div className="p-8 md:p-12 hover:bg-neutral-50 transition-colors">
            <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                <span className="w-4 h-4 bg-brand-pink rounded-full border-2 border-brand-black"></span>
                Gaming
            </h3>
            <ul className="space-y-4 mb-8">
                {['PS5/Xbox repairs', 'HDMI port replacement', 'Disc drive repair', 'Cooling system cleaning', 'Controller repairs', 'Software troubleshooting'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg font-bold text-brand-black/80">
                        <CheckCircle2 className="w-6 h-6 text-brand-black shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between mt-auto pt-8 border-t-2 border-brand-black/10">
                <span className="text-2xl font-black">From $59</span>
                <Link href="/repairs/gaming" className="font-bold uppercase border-b-2 border-brand-black hover:bg-brand-black hover:text-white transition-all px-1">
                    View All →
                </Link>
            </div>
        </div>
      </div>

      {/* BANNER */}
      <div className="bg-brand-yellow border-t-4 border-brand-black p-4 py-8 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
        {['FREE DIAGNOSTICS', '90-DAY WARRANTY', 'EXPERT TECHNICIANS'].map((text) => (
            <span key={text} className="text-xl md:text-2xl font-black uppercase text-brand-black tracking-wider flex items-center gap-2">
                <span className="w-3 h-3 bg-black rounded-full"></span> {text}
            </span>
        ))}
      </div>
    </section>
  );
}

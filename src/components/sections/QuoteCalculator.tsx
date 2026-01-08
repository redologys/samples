"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Constants for the calculator
const BRANDS = ['Apple', 'Samsung', 'Google', 'Other'];
const MODELS: Record<string, string[]> = {
    'Apple': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone 12 Series', 'Older Models'],
    'Samsung': ['Galaxy S24 Ultra', 'Galaxy S23 Series', 'Galaxy S22 Series', 'Note Series', 'A Series'],
    'Google': ['Pixel 8 Pro', 'Pixel 7', 'Pixel 6', 'Other Pixel'],
    'Other': ['Motorola', 'OnePlus', 'LG', 'Others']
};
const ISSUES = [
    { name: 'Screen Crack/LCD', basePrice: 89 },
    { name: 'Battery Replacement', basePrice: 49 },
    { name: 'Charging Port', basePrice: 59 },
    { name: 'Water Damage', basePrice: 45 },
    { name: 'Camera Issue', basePrice: 69 }
];

export function QuoteCalculator() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [issue, setIssue] = useState('');
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState<number | null>(null);

    const handleCalculate = () => {
        if (!brand || !model || !issue) return;
        setLoading(true);
        // Simulate API calc
        setTimeout(() => {
            const issueObj = ISSUES.find(i => i.name === issue);
            const issueBase = issueObj ? issueObj.basePrice : 50;
            const modelFactor = model.includes('Ultra') || model.includes('Pro Max') ? 1.5 : 1;
            setPrice(Math.round(issueBase * modelFactor));
            setLoading(false);
        }, 800);
    };

    return (
        <section className="py-24 relative overflow-hidden" id="quote">
            <div className="container mx-auto px-4 relative z-10">
                <div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get an Instant Quote</h2>
                            <p className="text-zinc-400">Select your device details to get a price estimate in seconds.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Brand</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer text-sm font-medium"
                                            onChange={e => { setBrand(e.target.value); setModel(''); setPrice(null); }}
                                            value={brand}
                                        >
                                            <option value="" className="bg-zinc-900">Select Brand</option>
                                            {BRANDS.map(b => <option key={b} value={b} className="bg-zinc-900">{b}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Model</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer text-sm font-medium disabled:opacity-50"
                                            disabled={!brand}
                                            onChange={e => { setModel(e.target.value); setPrice(null); }}
                                            value={model}
                                        >
                                            <option value="" className="bg-zinc-900">Select Model</option>
                                            {brand && MODELS[brand].map(m => <option key={m} value={m} className="bg-zinc-900">{m}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Issue</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer text-sm font-medium"
                                        onChange={e => { setIssue(e.target.value); setPrice(null); }}
                                        value={issue}
                                    >
                                        <option value="" className="bg-zinc-900">Select Issue</option>
                                        {ISSUES.map(i => <option key={i.name} value={i.name} className="bg-zinc-900">{i.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div className="pt-6">
                                {!price ? (
                                    <Button
                                        className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-[1.02]"
                                        disabled={!brand || !model || !issue || loading}
                                        onClick={handleCalculate}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Calculating...
                                            </span>
                                        ) : (
                                            "Get Estimate Price"
                                        )}
                                    </Button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
                                    >
                                        <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Estimated Repair Cost</p>
                                        <p className="text-5xl font-black text-white mb-6 tracking-tight">${price}</p>
                                        <a href="tel:9297892786">
                                            <Button className="w-full h-14 text-base bg-white text-black hover:bg-zinc-200 rounded-xl font-bold">Book This Repair Now</Button>
                                        </a>
                                        <p className="text-[10px] text-zinc-500 mt-4">*Final price may vary upon physical inspection at our Brooklyn store.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', glow = false, children, ...props }, ref) => {
        const baseStyles = "relative inline-flex items-center justify-center rounded-full font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group";

        const variants = {
            primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] border border-transparent",
            secondary: "bg-white text-blue-900 hover:bg-zinc-100 shadow-lg",
            outline: "border border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-md",
            ghost: "text-zinc-400 hover:text-white hover:bg-white/5"
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>
                {variant === 'primary' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
            </button>
        );
    }
);
Button.displayName = 'Button';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    price: string;
    time: string;
}

export const ServiceCard = ({ title, description, icon: Icon, price, time }: ServiceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="glass-card p-8 rounded-3xl relative group overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={120} />
            </div>

            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/20">
                    <Icon className="text-blue-400 group-hover:text-blue-300 w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 border-b border-white/5 pb-6">{description}</p>

                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Est. Price</div>
                        <div className="text-lg font-bold text-white">{price}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Turnaround</div>
                        <div className="text-lg font-bold text-blue-400">{time}</div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
        </motion.div>
    );
};

export const SectionHeader = ({ label, title, subtitle, center = false }: { label: string, title: ReactNode, subtitle?: string, center?: boolean }) => (
    <div className={cn("mb-16", center && "text-center mx-auto max-w-3xl")}>
        <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-block"
        >
            <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">{label}</span>
        </motion.span>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 uppercase italic tracking-tighter leading-none"
        >
            {title}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
            >
                {subtitle}
            </motion.p>
        )}
    </div>
);

export const Reveal = ({ children, width = "fit-content" }: { children: React.ReactNode; width?: "fit-content" | "100%" }) => {
    // Simplified reveal animation wrapper
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
        >
            {children}
        </motion.div>
    );
};

export const CursorFollower = () => {
    const cursorRef = React.useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [isVisible]);

    return (
        <motion.div
            className="fixed w-8 h-8 rounded-full bg-blue-500/30 blur-xl pointer-events-none z-50 hidden lg:block mix-blend-screen"
            animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            style={{ display: isVisible ? 'block' : 'none' }}
        />
    );
};

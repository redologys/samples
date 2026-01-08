import { Smartphone, Battery, Droplets, Unlock, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';

export const COMPANAY_NAME = "Mobile Experts Inc";

export const CONTACT_INFO = {
    address: "1134 Liberty Ave, Brooklyn, NY 11208",
    phone: "(929) 789-2786",
    hours: "Monday-Sunday: 9:00 AM - 9:00 PM",
    mapsLink: "https://www.google.com/maps/place/1134+Liberty+Ave,+Brooklyn,+NY+11208",
    email: "contact@mobileexperts.com" // Placeholder if needed
};

export const NAV_LINKS = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#contact' },
];

export const SERVICES = [
    {
        id: 1,
        title: "Screen Restoration",
        icon: Smartphone,
        price: "From $89",
        time: "20-40 Mins",
        description: "Factory-grade OLED & LCD replacement for iPhone, Samsung, and more. color-calibrated precision."
    },
    {
        id: 2,
        title: "Battery Renewal",
        icon: Battery,
        price: "From $49",
        time: "15 Mins",
        description: "Restore peak performance with OEM-spec cells. Includes battery health calibration."
    },
    {
        id: 3,
        title: "Liquid Recovery",
        icon: Droplets,
        price: "Diagnostic Free",
        time: "24-48 Hrs",
        description: "Advanced ultrasonic cleaning and micro-soldering treatment for water-damaged logic boards."
    },
    {
        id: 4,
        title: "Carrier Unlocking",
        icon: Unlock,
        price: "Varies",
        time: "Instant - 24h",
        description: "Freedom to use your device on any network worldwide. Permanent factory unlock."
    },
    {
        id: 5,
        title: "Premium Accessories",
        icon: ShoppingBag,
        price: "Retail",
        time: "Instant",
        description: "Curated selection of military-grade cases, tempered glass, and fast chargers."
    },
    {
        id: 6,
        title: "Digital Services",
        icon: CreditCard,
        price: "Utility",
        time: "Instant",
        description: "Bill payments, prepaid top-ups, and activation services for major carriers."
    }
];

export const REVIEWS = [
    {
        name: "Kiana Santiago",
        text: "Literally saved my life! My iPhone 13 Pro Max screen was completely shattered. They fixed it in 20 minutes and it looks brand new. Best price in Brooklyn.",
        rating: 5,
        date: "1 Month Ago"
    },
    {
        name: "Lisa Desilva Adams",
        text: "I thought my phone was a goner after dropping it in water. Mobile Experts brought it back to life when other shops said no. Truly expert service.",
        rating: 5,
        date: "2 Weeks Ago"
    },
    {
        name: "Jason M.",
        text: "Fast, professional, and honest. They didn't try to upsell me, just fixed what was broken. The new battery works perfectly.",
        rating: 5,
        date: "3 Months Ago"
    }
];

export const STATS = [
    { val: "29+", label: "5-Star Google Reviews" },
    { val: "10k+", label: "Devices Repaired" },
    { val: "15m", label: "Avg Repair Time" }
];

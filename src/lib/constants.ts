// ============================================
// MOBILE EXPERTS INC - BUSINESS CONSTANTS
// ============================================

export const BUSINESS_INFO = {
  name: "Mobile Experts Inc",
  tagline: "Brooklyn's Trusted Phone Repair Experts",
  description: "Expert mobile phone repair, premium accessories, and bill payment services in Brooklyn, NY. 5-star rated service with same-day repairs available.",
  
  // Contact
  phone: "(929) 789-2786",
  phoneClean: "9297892786",
  email: "info@mobileexpertsbrooklyn.com",
  
  // Location
  address: "1134 Liberty Ave",
  city: "Brooklyn",
  state: "NY",
  zipCode: "11208",
  fullAddress: "1134 Liberty Ave, Brooklyn, NY 11208",
  googleMapsUrl: "https://maps.google.com/?q=1134+Liberty+Ave,+Brooklyn,+NY+11208",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.8847!2d-73.8658!3d40.6769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25d29c8b26a11%3A0x1234567890abcdef!2s1134%20Liberty%20Ave%2C%20Brooklyn%2C%20NY%2011208!5e0!3m2!1sen!2sus!4v1234567890",
  
  // Google Business
  googleRating: 5.0,
  googleReviewCount: 29,
  googleReviewUrl: "https://g.page/r/mobile-experts-brooklyn/review",
  
  // Social
  instagram: "@mobileexpertsbrooklyn",
  facebook: "mobileexpertsbrooklyn",
  
  // Website
  website: "https://mobileexpertsbrooklyn.com",
} as const;

export const BUSINESS_HOURS = [
  { day: "Sunday", dayShort: "Sun", open: "10:00 AM", close: "7:00 PM", isClosed: false },
  { day: "Monday", dayShort: "Mon", open: "9:00 AM", close: "9:00 PM", isClosed: false },
  { day: "Tuesday", dayShort: "Tue", open: "9:00 AM", close: "9:00 PM", isClosed: false },
  { day: "Wednesday", dayShort: "Wed", open: "9:00 AM", close: "9:00 PM", isClosed: false },
  { day: "Thursday", dayShort: "Thu", open: "9:00 AM", close: "9:00 PM", isClosed: false },
  { day: "Friday", dayShort: "Fri", open: "9:00 AM", close: "9:00 PM", isClosed: false },
  { day: "Saturday", dayShort: "Sat", open: "9:00 AM", close: "9:00 PM", isClosed: false },
] as const;

// ============================================
// DEVICE TYPES
// ============================================

export const DEVICE_TYPES = [
  { 
    id: "iphone", 
    name: "iPhone", 
    icon: "Smartphone",
    description: "All iPhone models from iPhone 6 to iPhone 15 Pro Max"
  },
  { 
    id: "samsung", 
    name: "Samsung Galaxy", 
    icon: "Smartphone",
    description: "Galaxy S, Note, A, and Z series phones"
  },
  { 
    id: "google-pixel", 
    name: "Google Pixel", 
    icon: "Smartphone",
    description: "Pixel 3 through Pixel 8 Pro"
  },
  { 
    id: "other-android", 
    name: "Other Android", 
    icon: "Smartphone",
    description: "LG, Motorola, OnePlus, and other brands"
  },
  { 
    id: "tablet", 
    name: "Tablet", 
    icon: "Tablet",
    description: "iPad, Samsung Tab, and other tablets"
  },
] as const;

export const DEVICE_MODELS = {
  iphone: [
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini",
    "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini",
    "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
    "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X",
    "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7",
    "iPhone SE (3rd gen)", "iPhone SE (2nd gen)", "iPhone SE (1st gen)",
    "Other iPhone"
  ],
  samsung: [
    "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24",
    "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23",
    "Galaxy S22 Ultra", "Galaxy S22+", "Galaxy S22",
    "Galaxy S21 Ultra", "Galaxy S21+", "Galaxy S21",
    "Galaxy Z Fold 5", "Galaxy Z Fold 4", "Galaxy Z Fold 3",
    "Galaxy Z Flip 5", "Galaxy Z Flip 4", "Galaxy Z Flip 3",
    "Galaxy Note 20 Ultra", "Galaxy Note 20", "Galaxy Note 10+", "Galaxy Note 10",
    "Galaxy A54", "Galaxy A34", "Galaxy A14",
    "Other Samsung"
  ],
  "google-pixel": [
    "Pixel 8 Pro", "Pixel 8", "Pixel 8a",
    "Pixel 7 Pro", "Pixel 7", "Pixel 7a",
    "Pixel 6 Pro", "Pixel 6", "Pixel 6a",
    "Pixel 5", "Pixel 4a", "Pixel 4 XL", "Pixel 4",
    "Other Pixel"
  ],
  "other-android": [
    "OnePlus 12", "OnePlus 11", "OnePlus 10 Pro",
    "Motorola Edge", "Motorola Razr",
    "LG (Various Models)",
    "Other Android"
  ],
  tablet: [
    "iPad Pro 12.9\" (6th gen)", "iPad Pro 12.9\" (5th gen)",
    "iPad Pro 11\" (4th gen)", "iPad Pro 11\" (3rd gen)",
    "iPad Air (5th gen)", "iPad Air (4th gen)",
    "iPad (10th gen)", "iPad (9th gen)",
    "iPad mini (6th gen)", "iPad mini (5th gen)",
    "Samsung Galaxy Tab S9", "Samsung Galaxy Tab S8",
    "Other Tablet"
  ]
} as const;

// ============================================
// ISSUE TYPES
// ============================================

export const ISSUE_TYPES = [
  { 
    id: "cracked-screen", 
    name: "Cracked Screen", 
    icon: "AlertTriangle",
    description: "Screen replacement for cracked, shattered, or unresponsive displays",
    estimatedTime: "30-60 minutes",
    priceRange: "$79 - $329"
  },
  { 
    id: "battery-replacement", 
    name: "Battery Replacement", 
    icon: "BatteryLow",
    description: "New battery for devices with poor battery life or swelling",
    estimatedTime: "15-30 minutes",
    priceRange: "$49 - $99"
  },
  { 
    id: "water-damage", 
    name: "Water Damage", 
    icon: "Droplets",
    description: "Diagnostics and repair for water-damaged devices",
    estimatedTime: "1-3 hours",
    priceRange: "$49 - $199"
  },
  { 
    id: "charging-port", 
    name: "Charging Port", 
    icon: "PlugZap",
    description: "Fix or replace faulty charging ports",
    estimatedTime: "30-45 minutes",
    priceRange: "$49 - $89"
  },
  { 
    id: "camera", 
    name: "Camera Repair", 
    icon: "Camera",
    description: "Front or rear camera replacement and repair",
    estimatedTime: "30-60 minutes",
    priceRange: "$59 - $149"
  },
  { 
    id: "back-glass", 
    name: "Back Glass", 
    icon: "Layers",
    description: "Replace cracked or shattered back glass",
    estimatedTime: "45-90 minutes",
    priceRange: "$69 - $199"
  },
  { 
    id: "speaker-mic", 
    name: "Speaker/Microphone", 
    icon: "Volume2",
    description: "Fix audio issues, muffled sound, or microphone problems",
    estimatedTime: "30-45 minutes",
    priceRange: "$49 - $89"
  },
  { 
    id: "other", 
    name: "Other Issue", 
    icon: "HelpCircle",
    description: "Describe your issue and we'll diagnose it",
    estimatedTime: "Varies",
    priceRange: "Free diagnosis"
  },
] as const;

// ============================================
// SERVICES
// ============================================

export const SERVICES = [
  {
    id: "screen-repair",
    title: "Screen Repair",
    description: "Same-day screen replacements for all major brands. We use high-quality replacement screens with color-accurate displays.",
    icon: "Smartphone",
    features: ["Same-day service", "90-day warranty", "Quality parts"],
    priceFrom: 79,
  },
  {
    id: "battery-replacement",
    title: "Battery Replacement",
    description: "Restore your phone's battery life to like-new condition. We use premium batteries that meet OEM specifications.",
    icon: "BatteryFull",
    features: ["Quick turnaround", "OEM-quality batteries", "Health diagnostic"],
    priceFrom: 49,
  },
  {
    id: "accessories",
    title: "Cases & Accessories",
    description: "Beautiful phone cases, screen protectors, chargers, and more. Protect your device in style.",
    icon: "Shield",
    features: ["Premium brands", "Custom fitting", "Wide selection"],
    priceFrom: 15,
  },
  {
    id: "bill-payment",
    title: "Bill Payment",
    description: "Pay your phone bill conveniently at our location. We support all major carriers.",
    icon: "CreditCard",
    features: ["All carriers", "Quick & easy", "Instant confirmation"],
    priceFrom: 0,
  },
] as const;

// ============================================
// TESTIMONIALS
// ============================================

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Kiana Santiago",
    rating: 5,
    text: "Very good service, amazing customer service beautiful cases",
    source: "Google",
    avatar: null,
  },
  {
    id: 2,
    name: "Lisa Desilva Adams",
    rating: 5,
    text: "He worked with me with prices. Very good with fixing phone screens.",
    source: "Google",
    avatar: null,
  },
  {
    id: 3,
    name: "Rosleidy Zapata",
    rating: 5,
    text: "Amazing customer services!!",
    source: "Google",
    avatar: null,
  },
  {
    id: 4,
    name: "Marcus Johnson",
    rating: 5,
    text: "Fixed my iPhone screen in under an hour. Professional and affordable. Will definitely come back!",
    source: "Google",
    avatar: null,
  },
  {
    id: 5,
    name: "Sarah Chen",
    rating: 5,
    text: "Best phone repair shop in Brooklyn! They were honest about the issue and fixed it quickly. Great prices too.",
    source: "Google",
    avatar: null,
  },
] as const;

// ============================================
// TRUST BADGES
// ============================================

export const TRUST_BADGES = [
  {
    icon: "Award",
    title: "Expert Technicians",
    description: "Certified professionals with years of experience",
  },
  {
    icon: "Zap",
    title: "Same-Day Repairs",
    description: "Most repairs completed while you wait",
  },
  {
    icon: "ShieldCheck",
    title: "90-Day Warranty",
    description: "All repairs backed by our guarantee",
  },
  {
    icon: "DollarSign",
    title: "Fair Pricing",
    description: "Competitive rates, no hidden fees",
  },
] as const;

// ============================================
// SUPPORTED CARRIERS (Bill Payment)
// ============================================

export const CARRIERS = [
  { id: "verizon", name: "Verizon", logo: "/carriers/verizon.png" },
  { id: "att", name: "AT&T", logo: "/carriers/att.png" },
  { id: "tmobile", name: "T-Mobile", logo: "/carriers/tmobile.png" },
  { id: "metro-pcs", name: "Metro PCS", logo: "/carriers/metro.png" },
  { id: "cricket", name: "Cricket", logo: "/carriers/cricket.png" },
  { id: "boost-mobile", name: "Boost Mobile", logo: "/carriers/boost.png" },
  { id: "simple-mobile", name: "Simple Mobile", logo: "/carriers/simple.png" },
] as const;

// ============================================
// PRODUCT CATEGORIES
// ============================================

export const PRODUCT_CATEGORIES = [
  { id: "cases", name: "Phone Cases", icon: "Smartphone" },
  { id: "screen-protectors", name: "Screen Protectors", icon: "Shield" },
  { id: "chargers", name: "Chargers", icon: "PlugZap" },
  { id: "cables", name: "Cables", icon: "Cable" },
  { id: "headphones", name: "Headphones", icon: "Headphones" },
  { id: "power-banks", name: "Power Banks", icon: "BatteryCharging" },
] as const;

// ============================================
// TIME SLOTS
// ============================================

export const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
] as const;

// ============================================
// BOOKING STATUS
// ============================================

export const BOOKING_STATUSES = {
  PENDING: { label: "Pending", color: "warning", description: "Waiting for confirmation" },
  CONFIRMED: { label: "Confirmed", color: "primary", description: "Appointment is confirmed" },
  IN_PROGRESS: { label: "In Progress", color: "accent", description: "Technician is working on your device" },
  DIAGNOSTICS_COMPLETE: { label: "Diagnostics Complete", color: "primary", description: "Issue has been diagnosed" },
  AWAITING_PARTS: { label: "Awaiting Parts", color: "warning", description: "Waiting for replacement parts" },
  REPAIR_IN_PROGRESS: { label: "Repair in Progress", color: "accent", description: "Repair is being performed" },
  QUALITY_CHECK: { label: "Quality Check", color: "primary", description: "Final testing and inspection" },
  READY_FOR_PICKUP: { label: "Ready for Pickup", color: "success", description: "Your device is ready" },
  COMPLETED: { label: "Completed", color: "success", description: "Repair complete and picked up" },
  CANCELLED: { label: "Cancelled", color: "error", description: "Booking was cancelled" },
} as const;

// ============================================
// SEO KEYWORDS
// ============================================

export const SEO_KEYWORDS = [
  "phone repair Brooklyn",
  "iPhone repair Liberty Ave",
  "screen repair near me 11208",
  "Samsung screen replacement Brooklyn",
  "phone battery replacement Brooklyn NY",
  "cracked screen repair East New York",
  "mobile phone repair 11208",
  "cell phone repair Brooklyn",
  "iPad repair Brooklyn",
  "tablet repair near me",
  "same day phone repair Brooklyn",
  "phone case Brooklyn",
  "phone accessories Liberty Ave",
  "phone bill payment Brooklyn",
] as const;

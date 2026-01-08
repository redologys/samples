import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BUSINESS_HOURS } from "./constants";

// ============================================
// CLASSNAME UTILITIES
// ============================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// DATE & TIME UTILITIES
// ============================================

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(time: string): string {
  return time;
}

export function isBusinessOpen(): { isOpen: boolean; message: string } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hours = BUSINESS_HOURS[dayOfWeek];
  
  if (hours.isClosed) {
    return { isOpen: false, message: "Closed today" };
  }
  
  const currentTime = now.toLocaleTimeString("en-US", { 
    hour: "numeric", 
    minute: "2-digit", 
    hour12: true 
  });
  
  const openTime = parseTime(hours.open);
  const closeTime = parseTime(hours.close);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  if (currentMinutes >= openTime && currentMinutes < closeTime) {
    const hoursUntilClose = Math.floor((closeTime - currentMinutes) / 60);
    const minutesUntilClose = (closeTime - currentMinutes) % 60;
    
    if (hoursUntilClose === 0) {
      return { isOpen: true, message: `Open · Closes in ${minutesUntilClose} min` };
    }
    return { isOpen: true, message: `Open · Closes at ${hours.close}` };
  }
  
  if (currentMinutes < openTime) {
    return { isOpen: false, message: `Closed · Opens at ${hours.open}` };
  }
  
  // Find next open day
  for (let i = 1; i <= 7; i++) {
    const nextDay = BUSINESS_HOURS[(dayOfWeek + i) % 7];
    if (!nextDay.isClosed) {
      return { isOpen: false, message: `Closed · Opens ${nextDay.day} at ${nextDay.open}` };
    }
  }
  
  return { isOpen: false, message: "Closed" };
}

function parseTime(timeStr: string): number {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + (minutes || 0);
}

export function generateTimeSlots(date: Date): string[] {
  const dayOfWeek = date.getDay();
  const hours = BUSINESS_HOURS[dayOfWeek];
  
  if (hours.isClosed) return [];
  
  const slots: string[] = [];
  const openMinutes = parseTime(hours.open);
  const closeMinutes = parseTime(hours.close);
  
  for (let minutes = openMinutes; minutes < closeMinutes; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    slots.push(`${displayHour}:${min.toString().padStart(2, "0")} ${period}`);
  }
  
  return slots;
}

// ============================================
// PRICE UTILITIES
// ============================================

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

// ============================================
// PHONE UTILITIES
// ============================================

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned[0] === "1") {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function isValidPhone(phone: string): boolean {
  const cleaned = cleanPhoneNumber(phone);
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === "1");
}

// ============================================
// EMAIL UTILITIES
// ============================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================
// STRING UTILITIES
// ============================================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

// ============================================
// ID GENERATION
// ============================================

export function generateBookingNumber(): string {
  const prefix = "ME";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function generateTrackingCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function generateOrderNumber(): string {
  const prefix = "ORD";
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${prefix}-${timestamp}`;
}

// ============================================
// ANIMATION UTILITIES
// ============================================

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

// ============================================
// DEBOUNCE & THROTTLE
// ============================================

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================
// LOCAL STORAGE
// ============================================

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error("Error saving to localStorage");
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(key);
  } catch {
    console.error("Error removing from localStorage");
  }
}

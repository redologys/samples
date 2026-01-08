"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Phone,
  MapPin,
  Mail,
  Clock,
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BUSINESS_INFO, BUSINESS_HOURS } from "@/lib/constants";

const footerLinks = {
  services: [
    { name: "Screen Repair", href: "/services/screen-repair" },
    { name: "Battery Replacement", href: "/services/battery" },
    { name: "Water Damage Repair", href: "/services/water-damage" },
    { name: "Charging Port Repair", href: "/services/charging-port" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Track Repair", href: "/track" },
    { name: "Bill Payment", href: "/bill-pay" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white pt-20 pb-8 border-t-4 border-brand-yellow">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-brand-yellow border-2 border-white flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform">
                <Smartphone className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase leading-none">
                  Mobile<br/>Experts
                </h3>
              </div>
            </Link>

            <p className="text-neutral-400 font-medium mb-6">
              Brooklyn&apos;s trusted phone repair shop. Fast, reliable, and affordable.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={`https://facebook.com/${BUSINESS_INFO.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-black hover:bg-brand-yellow hover:text-black border-2 border-transparent hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://instagram.com/${BUSINESS_INFO.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-black hover:bg-brand-pink hover:text-white border-2 border-transparent hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-black text-brand-yellow uppercase mb-6 tracking-wide">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-brand-yellow font-bold uppercase text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-black text-brand-yellow uppercase mb-6 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-brand-yellow font-bold uppercase text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-black text-brand-yellow uppercase mb-6 tracking-wide">
              Visit Us
            </h4>
            
            <div className="space-y-4 mb-6 font-bold text-sm">
              {/* Address */}
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand-yellow" />
                <span>{BUSINESS_INFO.fullAddress}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0 text-brand-yellow" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0 text-brand-yellow" />
                <span>{BUSINESS_INFO.email}</span>
              </a>
            </div>

            {/* Quick Hours */}
            <div className="p-4 bg-neutral-900 border-2 border-neutral-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-brand-yellow" />
                <span className="text-sm font-bold text-white uppercase">Hours</span>
              </div>
              <p className="text-neutral-400 text-sm font-medium">
                10AM — 8PM DAILY
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="p-8 bg-brand-yellow border-4 border-white mb-12">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-2xl font-black text-black uppercase mb-2">
                Get Exclusive Deals
              </h4>
              <p className="text-black/80 font-bold">
                Subscribe for discounts. No spam, just savings.
              </p>
            </div>
            <form className="flex gap-3">
              <Input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 bg-white border-2 border-black text-black placeholder:text-neutral-400"
              />
              <Button size="lg" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-bold uppercase">
                Join <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t-2 border-neutral-800">
          <p className="text-neutral-500 text-sm font-bold uppercase">
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ShoppingBag,
  Star,
  ChevronDown,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn, fadeInUpVariants, staggerContainerVariants, formatPrice } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Cases",
  "Screen Protectors",
  "Chargers",
  "Cables",
  "Audio",
  "Mounts",
];

const PRODUCTS = [
  {
    id: 1,
    name: "Ultra-Clear Screen Protector",
    category: "Screen Protectors",
    price: 15.00,
    rating: 4.8,
    reviews: 124,
    image: "/products/screen-protector.jpg",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Heavy Duty Shockproof Case",
    category: "Cases",
    price: 25.00,
    rating: 4.9,
    reviews: 85,
    image: "/products/case-shockproof.jpg",
    tag: "New",
  },
  {
    id: 3,
    name: "20W USB-C Fast Charger",
    category: "Chargers",
    price: 19.99,
    rating: 4.7,
    reviews: 203,
    image: "/products/charger-20w.jpg",
  },
  {
    id: 4,
    name: "Braided Lightning Cable (6ft)",
    category: "Cables",
    price: 14.99,
    rating: 4.6,
    reviews: 156,
    image: "/products/cable-lightning.jpg",
  },
  {
    id: 5,
    name: "MagSafe Clear Case",
    category: "Cases",
    price: 29.99,
    rating: 4.5,
    reviews: 67,
    image: "/products/case-magsafe.jpg",
    tag: "Trending",
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    category: "Chargers",
    price: 34.99,
    rating: 4.4,
    reviews: 42,
    image: "/products/charger-wireless.jpg",
  },
];

export default function AccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-950 pt-20">
        <section className="py-12 border-b border-neutral-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                Premium Accessories
              </h1>
              <p className="text-neutral-400">
                Protect and enhance your device with our curated selection of high-quality accessories.
              </p>
            </motion.div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              {/* Categories */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      activeCategory === cat
                        ? "bg-white text-black"
                        : "bg-neutral-900 text-neutral-400 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container-custom">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUpVariants}
                >
                  <GlassCard className="h-full p-4 group cursor-pointer" hoverEffect glow>
                    {/* Image Area */}
                    <div className="relative aspect-square rounded-xl bg-neutral-800 mb-4 overflow-hidden">
                      {/* Badge */}
                      {product.tag && (
                        <div className="absolute top-2 left-2 z-10">
                          <Badge variant="primary" size="sm">{product.tag}</Badge>
                        </div>
                      )}
                      
                      {/* Image Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 group-hover:scale-105 transition-transform duration-500">
                        <ShoppingBag className="w-12 h-12 text-neutral-700" />
                      </div>
                      
                      {/* Quick Add Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button variant="primary" fullWidth size="sm">
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-neutral-500">{product.category}</span>
                        <div className="flex items-center gap-1 text-xs text-warning-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-neutral-600">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-white mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-neutral-500">No products found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

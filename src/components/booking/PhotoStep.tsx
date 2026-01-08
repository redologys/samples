"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Camera,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn, fadeInUpVariants, staggerContainerVariants } from "@/lib/utils";
import type { BookingData } from "@/app/book/page";

interface PhotoStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
}

export function PhotoStep({ data, onUpdate }: PhotoStepProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPhotos = [...data.photos, ...acceptedFiles].slice(0, 5);
      onUpdate({ photos: newPhotos });
    },
    [data.photos, onUpdate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".heic"],
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removePhoto = (index: number) => {
    const newPhotos = data.photos.filter((_, i) => i !== index);
    onUpdate({ photos: newPhotos });
  };

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Step Title */}
      <motion.div variants={fadeInUpVariants} className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Upload photos of the damage
        </h2>
        <p className="text-neutral-400">
          Optional but helps us prepare for your repair
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div variants={fadeInUpVariants}>
        <GlassCard className="p-8">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer",
              isDragActive
                ? "border-primary-500 bg-primary-500/10"
                : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50"
            )}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center gap-4">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                isDragActive ? "bg-primary-500/20" : "bg-neutral-800"
              )}>
                <Upload className={cn(
                  "w-8 h-8",
                  isDragActive ? "text-primary-400" : "text-neutral-400"
                )} />
              </div>
              
              <div>
                <p className="text-white font-medium mb-1">
                  {isDragActive ? "Drop photos here" : "Drag & drop photos here"}
                </p>
                <p className="text-sm text-neutral-400">
                  or <span className="text-primary-400">browse files</span>
                </p>
              </div>
              
              <p className="text-xs text-neutral-500">
                Up to 5 photos • JPEG, PNG, WEBP • Max 10MB each
              </p>
            </div>
          </div>

          {/* Uploaded Photos */}
          {data.photos.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white">
                  Uploaded Photos ({data.photos.length}/5)
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdate({ photos: [] })}
                >
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {data.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden bg-neutral-800 group"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removePhoto(index)}
                        className="p-2 rounded-full bg-error-500 text-white hover:bg-error-400 transition-colors"
                        aria-label="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* File Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs text-white truncate">
                        {photo.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* Tips */}
      <motion.div variants={fadeInUpVariants} className="mt-6">
        <GlassCard className="p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary-400" />
            Photo Tips
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Clear, well-lit photos</p>
                <p className="text-xs text-neutral-400">Natural lighting works best</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Show the full damage</p>
                <p className="text-xs text-neutral-400">Include close-up and wide shots</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Multiple angles</p>
                <p className="text-xs text-neutral-400">Front, back, and side views</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Screen-on if possible</p>
                <p className="text-xs text-neutral-400">Shows display issues clearly</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Skip Notice */}
      <motion.div variants={fadeInUpVariants} className="mt-6 text-center">
        <p className="text-sm text-neutral-500">
          Photos are optional. You can skip this step and show us the damage in person.
        </p>
      </motion.div>
    </motion.div>
  );
}

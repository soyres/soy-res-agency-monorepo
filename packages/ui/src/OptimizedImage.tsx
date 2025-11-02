// app/components/OptimizedImage.tsx
"use client";

import Image, { ImageProps } from "next/image";
import { BLUR_DATA_URLS } from "@/app/lib/utils/imageUtils";

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  blurColor?: 'dark' | 'light' | 'gray' | 'black' | 'white';
}

/**
 * Wrapper around Next.js Image with built-in blur placeholder
 * Provides better loading experience with minimal setup
 */
export default function OptimizedImage({ 
  blurColor = 'dark',
  ...props 
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URLS[blurColor]}
    />
  );
}
"use client";

import { useState, useEffect, useRef } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  priority?: boolean; // Load immediately
  lazy?: boolean; // Lazy load when in viewport
}

export default function OptimizedVideo({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  controls = false,
  className = '',
  priority = false,
  lazy = true,
}: OptimizedVideoProps) {
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Preload if priority
  useEffect(() => {
    if (priority && videoRef.current) {
      videoRef.current.setAttribute('preload', 'auto');
    }
  }, [priority]);

  return (
    <div className={`relative ${className}`}>
      {/* Poster or placeholder */}
      {poster && !isLoaded && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        preload={priority ? 'auto' : 'none'}
      />
      
      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

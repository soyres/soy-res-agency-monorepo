"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface ViewTransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function ViewTransitionLink({ 
  href, 
  children, 
  className 
}: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if View Transitions API is supported
    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

// app/lib/performance/prefetch.ts - Smart prefetching
export function prefetchImages(urls: string[]) {
  if (typeof window === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

export function prefetchVideos(urls: string[]) {
  if (typeof window === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'video';
    link.href = url;
    document.head.appendChild(link);
  });
}

// app/lib/performance/lazy.ts - Smart lazy loading utilities
export function observeElements(
  selector: string,
  callback: (element: Element) => void,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '50px',
    ...options,
  });

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

// app/lib/performance/webVitals.ts - Core Web Vitals tracking
"use client";

export function reportWebVitals(metric: any) {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
  
  // Send to console in dev
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }
}
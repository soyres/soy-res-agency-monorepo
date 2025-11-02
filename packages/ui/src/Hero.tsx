// app/components/Hero.tsx - Enhanced version
"use client";

import { HeroConfig } from "@/app/config/types";
import { useTheme } from "@/app/config/lib/context/ConfigContext";

type HeroProps = {
  config: HeroConfig;
};

export const Hero = ({ config }: HeroProps) => {
  const theme = useTheme();
  
  // Don't render if it's a hero-nav-overlay (handled separately)
  if (config.type === 'hero-nav-overlay') {
    return null;
  }
  
  const heightClasses = {
    screen: 'min-h-screen',
    tall: 'min-h-[80vh]',
    short: 'min-h-[50vh]',
    auto: 'py-20',
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const backgroundStyle: React.CSSProperties = config.background?.type === 'solid' 
    ? { backgroundColor: config.background.value }
    : config.background?.type === 'gradient'
    ? { background: config.background.value }
    : {};

  const isMediaBackground = config.background?.type === 'video' || config.background?.type === 'image';

  return (
    <section 
      className={[
        'relative px-4 flex items-center justify-center',
        heightClasses[config.height || 'screen'],
      ].join(' ')}
      style={backgroundStyle}
    >
      {config.background?.type === 'video' && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={config.background.value} type="video/mp4" />
        </video>
      )}

      {config.background?.type === 'image' && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.background.value})` }}
        />
      )}

      {isMediaBackground && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      <div 
        className={[
          'relative z-10 max-w-4xl mx-auto',
          alignmentClasses[config.alignment || 'center'],
        ].join(' ')}
      >
        {config.subtitle && (
          <p className="text-sm uppercase tracking-widest mb-4 opacity-80 animate-slideDown">
            {config.subtitle}
          </p>
        )}
        
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-slideUp"
          style={{ 
            color: isMediaBackground ? '#ffffff' : theme.colors.foreground 
          }}
        >
          {config.title}
        </h1>
        
        {config.description && (
          <p 
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slideUp"
            style={{ 
              animationDelay: '0.1s',
              color: isMediaBackground ? '#ffffff' : theme.colors.foreground,
              opacity: 0.9,
            }}
          >
            {config.description}
          </p>
        )}

        {config.cta && config.cta.length > 0 && (
          <div 
            className="flex gap-4 animate-slideUp"
            style={{ 
              animationDelay: '0.2s',
              justifyContent: config.alignment === 'center' ? 'center' : config.alignment === 'right' ? 'flex-end' : 'flex-start'
            }}
          >
            {config.cta.map((cta, i) => (
              <a
                key={i}
                href={cta.href}
                className={[
                  'px-6 py-3 rounded-lg font-medium transition-all',
                  cta.variant === 'primary' 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : cta.variant === 'secondary'
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'border-2 border-current hover:bg-black/10',
                ].join(' ')}
                style={
                  cta.variant === 'primary' 
                    ? { backgroundColor: theme.colors.primary, color: theme.colors.background }
                    : cta.variant === 'outline'
                    ? { color: isMediaBackground ? '#ffffff' : theme.colors.foreground }
                    : {}
                }
              >
                {cta.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
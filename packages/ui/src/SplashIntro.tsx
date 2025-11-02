// app/components/SplashIntro.tsx
'use client';
import { useEffect, useState } from 'react';
import { SplashConfig } from '@/app/config/types';

export type SplashAnimation = 
  | 'fade' 
  | 'scale' 
  | 'slide-up' 
  | 'slide-down'
  | 'zoom'
  | 'blur'
  | 'glow'
  | 'typewriter';

interface SplashIntroProps {
  onComplete: () => void;
  config?: SplashConfig;
}

export const SplashIntro = ({ 
  onComplete,
  config = {
    enabled: true,
    duration: 3500,
    animation: 'scale',
    content: 'Res Pizarro',
    backgroundColor: 'from-black via-gray-900 to-black',
    textColor: 'white'
  }
}: SplashIntroProps) => {
  const [stage, setStage] = useState<'show' | 'fadeOut' | 'done'>('show');
  const [displayText, setDisplayText] = useState('');
  
  const duration = config.duration || 3500;
  const animation = config.animation || 'scale';
  const content = config.content || 'Res Pizarro';
  // Typewriter effect
  useEffect(() => {
    if (animation === 'typewriter' && stage === 'show') {
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= content.length) {
          setDisplayText(content.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }
  }, [animation, content, stage]);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setStage('fadeOut');
    }, duration);

    const fadeTimer = setTimeout(() => {
      setStage('done');
      onComplete();
    }, duration + 800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete, duration]);

  if (stage === 'done') return null;

  const getAnimationClass = () => {
    if (stage === 'fadeOut') return 'opacity-0';
    
    switch (animation) {
      case 'fade':
        return 'animate-fadeIn';
      case 'scale':
        return 'animate-fadeInScale';
      case 'slide-up':
        return 'animate-slideUp';
      case 'slide-down':
        return 'animate-slideDown';
      case 'zoom':
        return 'animate-zoom';
      case 'blur':
        return 'animate-blurIn';
      case 'glow':
        return 'animate-glow';
      case 'typewriter':
        return 'animate-fadeIn';
      default:
        return 'animate-fadeInScale';
    }
  };

  return (
    <div
      className={[
        "fixed inset-0 z-[100]",
        `bg-gradient-to-br ${config.backgroundColor || 'from-black via-gray-900 to-black'}`,
        "flex items-center justify-center",
        "transition-opacity duration-[800ms] ease-out",
        stage === 'fadeOut' ? 'opacity-0' : 'opacity-100',
      ].join(" ")}
    >
      <div className="relative">
        {/* Glow effect for certain animations */}
        {(animation === 'glow' || animation === 'scale') && (
          <div 
            className="absolute inset-0 blur-3xl opacity-30 animate-pulseSoft"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            }}
          />
        )}
        
        {/* Main text */}
        <h1 
          className={[
            "relative z-10",
            `text-${config.textColor || 'white'}`,
            "text-4xl md:text-5xl font-bold tracking-wide",
            getAnimationClass(),
          ].join(" ")}
        >
          {animation === 'typewriter' ? displayText : content}
          {animation === 'typewriter' && displayText.length < content.length && (
            <span className="animate-pulse">|</span>
          )}
        </h1>
      </div>
    </div>
  );
};
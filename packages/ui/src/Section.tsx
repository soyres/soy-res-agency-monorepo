// app/components/Section.tsx
"use client";

import { SectionConfig } from '@/app/config/types';
import { useTheme } from '@/app/config/lib/context/ConfigContext';
import ContactForm from "@/app/components/ContactForm";

export const Section = (config: SectionConfig) => {
  const theme = useTheme();
  
  const spacingClasses = {
    compact: 'py-8',
    normal: 'py-12',
    spacious: 'py-20',
  };

  const getBackgroundStyle = () => {
    if (config.background === 'muted') {
      return { backgroundColor: theme.colors.muted };
    }
    if (config.background === 'accent') {
      return { backgroundColor: theme.colors.accent, color: theme.colors.background };
    }
    return {};
  };

  return (
    <section 
      id={config.id}
      className={[
        'px-4',
        spacingClasses[config.spacing || 'normal'],
      ].join(' ')}
      style={getBackgroundStyle()}
    >
      <div className="max-w-4xl mx-auto">
        {(config.title || config.subtitle) && (
          <div className="text-center mb-12">
            {config.subtitle && (
              <p className="text-sm uppercase tracking-widest mb-2 opacity-70">
                {config.subtitle}
              </p>
            )}
            {config.title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {config.title}
              </h2>
            )}
          </div>
        )}

        {config.content && (
          <div className="prose prose-lg mx-auto">
            {Array.isArray(config.content) ? (
              config.content.map((paragraph, i) => (
                <p key={i} className="mb-4 text-lg leading-relaxed opacity-90">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed opacity-90">
                {config.content}
              </p>
            )}
          </div>
        )}

        {config.type === 'projects' && config.data?.projects && (
          <div className={[
            'grid gap-8 mt-12',
            config.layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : '',
          ].join(' ')}>
            {config.data.projects.map((project: any, i: number) => (
              <a
                key={i}
                href={project.href}
                className="group block overflow-hidden rounded-lg border border-black/10 hover:border-black/20 transition-all"
              >
                {project.image && (
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-70">{project.description}</p>
                  {project.tags && (
                    <div className="flex gap-2 mt-4">
                      {project.tags.map((tag: string, j: number) => (
                        <span 
                          key={j}
                          className="text-xs px-2 py-1 rounded-full bg-black/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        {config.type === 'custom' && config.data?.services && (
          <div className={[
            'grid gap-8 mt-12',
            config.layout === 'three-column' ? 'md:grid-cols-3' : 'md:grid-cols-2',
          ].join(' ')}>
            {config.data.services.map((service: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm opacity-70">{service.description}</p>
              </div>
            ))}
          </div>
        )}
        {config.type === 'contact' && (
          <div className="max-w-2xl mx-auto mt-12">
            <ContactForm
              config={{
                provider: 'resend',
                fields: [
                  { name: 'name', label: 'Name', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'message', label: 'Message', type: 'textarea', required: true },
                ],
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
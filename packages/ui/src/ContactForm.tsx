// app/components/ContactForm.tsx - Universal contact form
"use client";

import { useState } from 'react';

interface ContactFormProps {
  config: {
    provider: 'mailchimp' | 'convertkit' | 'sendgrid' | 'resend' | 'custom';
    endpoint?: string;
    successMessage?: string;
    errorMessage?: string;
    fields: Array<{
      name: string;
      label: string;
      type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
      required?: boolean;
      placeholder?: string;
      options?: string[];
    }>;
  };
  className?: string;
}

export default function ContactForm({ config, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: config.provider,
          data: formData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(config.successMessage || 'Thank you! We\'ll be in touch soon.');
        setFormData({});
      } else {
        setStatus('error');
        setMessage(result.error || config.errorMessage || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(config.errorMessage || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {config.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors"
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors"
            >
              <option value="">Select...</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {message}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {message}
        </div>
      )}
    </form>
  );
}


// .env.example - Environment variables template
/*
# Contact Form Providers (choose one or multiple)

# Resend (recommended - easiest setup)
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=hello@yourdomain.com

# SendGrid
SENDGRID_API_KEY=SG.xxx
CONTACT_EMAIL=hello@yourdomain.com

# Mailchimp
MAILCHIMP_API_KEY=xxx-us1
MAILCHIMP_LIST_ID=xxx
MAILCHIMP_SERVER_PREFIX=us1

# ConvertKit
CONVERTKIT_API_KEY=xxx
CONVERTKIT_FORM_ID=xxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_CONFIG=default
*/

import React, { forwardRef, useImperativeHandle, useEffect } from 'react';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  action?: string;
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onVerify, onExpired, onError, action = "submit" }, ref) => {
    // Your actual Site Key for reCAPTCHA v3
    const SITE_KEY = "6LcO-mErAAAAAGeAng-PWckhg8UfmOKGhT9Lpuh8";

    useEffect(() => {
      // Load reCAPTCHA v3 script
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        // Cleanup script on unmount
        const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`);
        if (existingScript) {
          existingScript.remove();
        }
      };
    }, []);

    const executeRecaptcha = async () => {
      try {
        if (typeof window !== 'undefined' && window.grecaptcha) {
          await window.grecaptcha.ready(() => {
            window.grecaptcha.execute(SITE_KEY, { action }).then((token: string) => {
              onVerify(token);
            }).catch((error: any) => {
              console.error('reCAPTCHA execution error:', error);
              if (onError) onError();
            });
          });
        }
      } catch (error) {
        console.error('reCAPTCHA error:', error);
        if (onError) onError();
      }
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        onVerify(null);
      },
      execute: executeRecaptcha,
    }));

    // Auto-execute reCAPTCHA v3 when component mounts
    useEffect(() => {
      const timer = setTimeout(() => {
        executeRecaptcha();
      }, 1000); // Small delay to ensure script is loaded

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="mb-4">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          Protected by reCAPTCHA
        </div>
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;

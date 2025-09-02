
import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';

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
    const SITE_KEY = "6Lc8-WErAAAAAKbKR3DviHtSajORkPJXJhT1GEzG";
    const [isLoaded, setIsLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      // Check if script already exists
      const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`);
      
      if (existingScript) {
        // Script already exists, check if grecaptcha is available
        if (window.grecaptcha) {
          setIsLoaded(true);
          window.grecaptcha.ready(() => {
            setIsReady(true);
          });
        }
        return;
      }

      // Load reCAPTCHA v3 script
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsLoaded(true);
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            console.log('reCAPTCHA ready');
            setIsReady(true);
          });
        }
      };

      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script');
        if (onError) onError();
      };

      document.head.appendChild(script);

      return () => {
        // Only remove if we added it
        if (!existingScript) {
          const scriptToRemove = document.querySelector(`script[src*="recaptcha/api.js"]`);
          if (scriptToRemove) {
            scriptToRemove.remove();
          }
        }
      };
    }, []);

    const executeRecaptcha = async () => {
      if (!isLoaded || !isReady) {
        console.log('reCAPTCHA not ready yet, isLoaded:', isLoaded, 'isReady:', isReady);
        if (onError) onError();
        return;
      }

      try {
        if (typeof window !== 'undefined' && window.grecaptcha) {
          console.log('Executing reCAPTCHA with action:', action);
          const token = await window.grecaptcha.execute(SITE_KEY, { action });
          console.log('reCAPTCHA token generated successfully');
          onVerify(token);
        } else {
          throw new Error('reCAPTCHA not available');
        }
      } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        if (onError) onError();
      }
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        onVerify(null);
      },
      execute: executeRecaptcha,
    }));

    // Auto-execute reCAPTCHA v3 when ready
    useEffect(() => {
      if (isReady) {
        // Small delay to ensure everything is properly initialized
        const timer = setTimeout(() => {
          executeRecaptcha();
        }, 500);

        return () => clearTimeout(timer);
      }
    }, [isReady]);

    return (
      <div className="mb-4">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            isReady ? 'bg-green-500' : 'bg-gray-400'
          }`}>
            <span className="text-white text-xs">
              {isReady ? '✓' : '...'}
            </span>
          </div>
          Protected by reCAPTCHA {isReady ? '' : '(Loading...)'}
        </div>
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;

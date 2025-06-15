
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onVerify, onExpired, onError }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Replace this with your actual Site Key
    const SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY_HERE";

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      },
      execute: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.execute();
        }
      },
    }));

    return (
      <div className="mb-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={SITE_KEY}
          onChange={onVerify}
          onExpired={onExpired}
          onError={onError}
          size="normal"
          theme="light"
        />
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;

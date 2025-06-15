
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReCaptcha, { ReCaptchaRef } from "../ReCaptcha";

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // For reCAPTCHA v3, execute it before submission if no token exists
    if (!recaptchaToken) {
      recaptchaRef.current?.execute();
      toast({
        title: "Verifying Security",
        description: "Please wait while we verify your request...",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // First, verify reCAPTCHA
      const recaptchaResponse = await fetch(
        "https://kcwybfzphlrsnxxfhvpq.functions.supabase.co/send-email",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "verify-recaptcha",
            recaptchaToken: recaptchaToken,
          }),
        }
      );

      const recaptchaResult = await recaptchaResponse.json();
      
      if (!recaptchaResponse.ok || !recaptchaResult.success) {
        throw new Error("reCAPTCHA verification failed");
      }

      // Store in database
      const { error: dbError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.toLowerCase() }]);

      if (dbError) {
        if (dbError.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive",
          });
          return;
        }
        throw dbError;
      }

      // Send notification email
      const response = await fetch(
        "https://kcwybfzphlrsnxxfhvpq.functions.supabase.co/send-email",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "newsletter",
            subject: "New Newsletter Subscription",
            html: `
              <h2>New Newsletter Subscription</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
            `,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter. You'll receive updates on special offers and travel insights.",
        });
        setEmail('');
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        // Even if email fails, subscription was saved
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input 
          type="email"
          placeholder="Your Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
          disabled={isSubmitting}
        />
        <Button 
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      
      <ReCaptcha
        ref={recaptchaRef}
        onVerify={handleRecaptchaChange}
        onExpired={() => setRecaptchaToken(null)}
        onError={() => setRecaptchaToken(null)}
        action="newsletter_signup"
      />
    </div>
  );
};

export default NewsletterSignup;

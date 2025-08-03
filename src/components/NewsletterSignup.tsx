
import { useState } from 'react'; // Removed React
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
// import { supabase } from '@/lib/supabase'; // Supabase import removed

interface NewsletterSignupProps {
  showTitle?: boolean;
  titleText?: string;
  buttonText?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  showTitle = true, // Default to true to maintain existing behavior elsewhere
  titleText = "Get notified when we launch", // Default title
  buttonText = "Subscribe" // Default button text
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      return;
    }
    
    setIsSubmitting(true);
    console.log('Starting newsletter subscription for:', email);
    
    // Define o endpoint do seu proxy WordPress para a inscrição na newsletter
    const proxyEndpoint = 'https://cms.snyk.store/wp-json/meu-proxy-snyk/v1/subscribe-newsletter';

    try {
      const response = await fetch(proxyEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        toast({
          title: "🎉 Successfully subscribed!",
          description: responseData.message || "Thank you! You'll be the first to know when we launch.",
        });
        setEmail('');
      } else if (response.ok && responseData.alreadySubscribed) {
        toast({
          title: "Already subscribed!",
          description: responseData.message || "This email is already on our list. Thanks for your interest!",
        });
        setEmail('');
      } else {
        // Se response.ok for false, ou success não for true
        throw new Error(responseData.message || 'Failed to subscribe. Please try again.');
      }

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="mb-0 ">
      {showTitle && (
        <h3 className="text-sm uppercase">{titleText}</h3>
      )}
      <div className={`flex gap-2 ${!showTitle ? 'my-4' : ''}`}> {/* Add margin-top if title is hidden */}
        <Input 
          type="email" 
          placeholder="Email"
          className="bg-zinc-900 border-zinc-900 font-thin text-[0.65rem] text-zinc-200 placeholder-gray-100 focus:outline-none focus:border-pink-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <Button 
          type="submit" 
          className="bg-zinc-800 font-thin text-[0.65rem] uppercase text-zinc-200 hover:bg-pink-500 hover:text-white transition-colors"
          disabled={isSubmitting || !email}
        >
          {isSubmitting ? 'Subscribing...' : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterSignup;

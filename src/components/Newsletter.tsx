
import { useState } from 'react'; // Removed React
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
// import { supabase } from '@/lib/supabase'; // Removed Supabase import
// import { supabase } from '@/lib/supabase'; // Supabase import removed

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Define loading state

  const handleSubmit = async (e: React.FormEvent) => { // Encapsulate logic in a handler
    e.preventDefault();
    setLoading(true);

    // const { error } = await supabase
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      setLoading(false);
      return;
    }

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
          title: "🎉 Subscribed!",
          description: responseData.message || "You're now on our newsletter list.",
        });
        setEmail('');
      } else if (response.ok && responseData.alreadySubscribed) {
        toast({
          title: "Already subscribed!",
          description: responseData.message || "This email is already on our list. Thanks for your interest!",
        });
        setEmail('');
      } else {
        throw new Error(responseData.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "Could not subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 text-center ">
      <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
      <p className="text-zinc-400 mb-6">Subscribe to our newsletter for the latest drops and exclusive deals.</p>
      <div className="flex max-w-md mx-auto gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          className="bg-zinc-800 border-zinc-700 text-white focus:border-pink-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <Button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white transition-colors"
          disabled={loading || !email}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  );
};

export default Newsletter;
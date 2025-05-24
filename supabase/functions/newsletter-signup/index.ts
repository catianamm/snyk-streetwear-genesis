
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    const { email }: NewsletterRequest = await req.json();
    
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    const brevoApiKey = Deno.env.get('BREVO_API_KEY');
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log('Adding email to newsletter:', email);
    console.log('API key exists:', !!brevoApiKey);
    console.log('API key length:', brevoApiKey.length);

    // Try to add contact directly first - if the key works, this should succeed
    console.log('Attempting to add contact to Brevo...');
    
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true,
      }),
    });

    const brevoData = await brevoResponse.json();
    console.log('Brevo API response status:', brevoResponse.status);
    console.log('Brevo API response:', brevoData);

    if (brevoResponse.ok) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Successfully subscribed to newsletter' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    } else if (brevoResponse.status === 400 && brevoData.code === 'duplicate_parameter') {
      // Contact already exists
      return new Response(
        JSON.stringify({ 
          alreadySubscribed: true, 
          message: 'Email already subscribed' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    } else {
      console.error('Brevo API error:', brevoData);
      
      // If unauthorized, provide specific guidance
      if (brevoResponse.status === 401) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid API key',
            details: 'Please check your Brevo API key in the Supabase secrets. Make sure it\'s a valid API key with contacts permissions.'
          }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to subscribe to newsletter',
          details: brevoData.message || 'Unknown error',
          statusCode: brevoResponse.status
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
};

serve(handler);

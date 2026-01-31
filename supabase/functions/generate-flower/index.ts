import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const FLOWER_TYPES = [
  'iris', 'poppy', 'rose', 'wildflower', 'lavender', 'daisy',
  'sunflower', 'tulip', 'orchid', 'lily', 'cherry_blossom', 'lotus',
  'magnolia', 'peony', 'hibiscus', 'carnation', 'chrysanthemum', 'daffodil'
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, author } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userAuthor = author || 'Anonymous';

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      // Fallback to random flower type if no API key
      const randomFlower = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      return new Response(
        JSON.stringify({ 
          flowerType: randomFlower,
          author: userAuthor,
          message: message
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a flower garden AI. Based on the user's message, mood, or emoji, determine the most suitable flower type from this list: ${FLOWER_TYPES.join(', ')}

Generate a beautiful short message (max 100 chars) to display with the flower.

Respond with ONLY valid JSON in this exact format:
{"flowerType": "flower_name", "message": "beautiful message"}

Match emotions to flowers:
- Love/romance: rose, tulip, peony
- Joy/happiness: sunflower, daisy, daffodil  
- Peace/calm: lavender, lotus, lily
- Hope/new beginnings: cherry_blossom, magnolia
- Strength/courage: poppy, iris
- Elegance/beauty: orchid, chrysanthemum
- Passion: hibiscus, carnation
- Wildness/freedom: wildflower`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded, please try again later' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Fallback
      const randomFlower = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      return new Response(
        JSON.stringify({ 
          flowerType: randomFlower,
          author: userAuthor,
          message: message
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    console.log('AI response:', content);
    
    // Parse the JSON response
    try {
      const parsed = JSON.parse(content);
      const flowerType = FLOWER_TYPES.includes(parsed.flowerType) 
        ? parsed.flowerType 
        : FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      
      return new Response(
        JSON.stringify({
          flowerType,
          message: parsed.message || message,
          author: userAuthor
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch {
      // If JSON parsing fails, use fallback
      const randomFlower = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      return new Response(
        JSON.stringify({ 
          flowerType: randomFlower,
          message: message,
          author: userAuthor
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// 100+ flower types from botanical encyclopedias
const FLOWER_TYPES = [
  // Rose family
  'rose', 'peony', 'cherry_blossom', 'plum_blossom', 'apple_blossom', 'hawthorn',
  // Lily family
  'lily', 'tulip', 'daylily', 'hyacinth', 'fritillaria',
  // Orchid family
  'orchid', 'phalaenopsis', 'cymbidium', 'dendrobium', 'cattleya',
  // Daisy family
  'daisy', 'sunflower', 'chrysanthemum', 'gerbera', 'aster', 'dahlia', 'zinnia', 'marigold', 'cosmos', 'echinacea',
  // Iris family
  'iris', 'gladiolus', 'crocus', 'freesia',
  // Mint family
  'lavender', 'salvia', 'rosemary',
  // Poppy family
  'poppy', 'california_poppy', 'bloodroot',
  // Buttercup family
  'ranunculus', 'anemone', 'clematis', 'delphinium', 'columbine', 'hellebore',
  // Carnation family
  'carnation', 'dianthus', 'baby_breath',
  // Mallow family
  'hibiscus', 'hollyhock', 'cotton_rose',
  // Water lily family
  'lotus', 'water_lily',
  // Magnolia family
  'magnolia', 'yulan',
  // Camellia family
  'camellia',
  // Primrose family
  'primrose', 'cyclamen',
  // Amaryllis family
  'amaryllis', 'narcissus', 'daffodil', 'snowdrop', 'agapanthus',
  // Nightshade family
  'petunia', 'nicotiana',
  // Bindweed family
  'morning_glory', 'moonflower',
  // Bellflower family
  'bellflower', 'lobelia',
  // Honeysuckle family
  'honeysuckle', 'scabiosa',
  // Jasmine family
  'jasmine', 'lilac', 'osmanthus',
  // Hydrangea family
  'hydrangea',
  // Verbena family
  'verbena', 'lantana',
  // Geranium family
  'geranium',
  // Snapdragon family
  'snapdragon', 'foxglove', 'penstemon',
  // Balsam family
  'impatiens',
  // Begonia family
  'begonia',
  // Passion flower family
  'passion_flower',
  // Violet family
  'violet', 'pansy',
  // Mustard family
  'stock', 'sweet_alyssum',
  // Pea family
  'sweet_pea', 'wisteria', 'lupine', 'acacia',
  // Saxifrage family
  'astilbe', 'heuchera',
  // Bougainvillea family
  'bougainvillea',
  // Gardenia family
  'gardenia', 'ixora',
  // Plumbago family
  'statice',
  // Protea family
  'protea', 'banksia',
  // Bird of Paradise family
  'bird_of_paradise',
  // Ginger family
  'ginger_lily', 'turmeric_flower',
  // Wildflowers and others
  'wildflower', 'thistle', 'clover', 'buttercup', 'forget_me_not', 'cornflower', 'bluebell', 'heather', 'azalea', 'rhododendron'
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, author } = await req.json();
    
    // Input validation - type check
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message must be a non-empty string' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Enforce length limit (matches client-side 200 char limit)
    if (message.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Message must be 200 characters or less' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize: trim whitespace and remove control characters
    const sanitizedMessage = message.trim().replace(/[\x00-\x1F\x7F]/g, '');

    if (!sanitizedMessage) {
      return new Response(
        JSON.stringify({ error: 'Message cannot be empty' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate author if provided
    const userAuthor = (author && typeof author === 'string') 
      ? author.trim().slice(0, 50).replace(/[\x00-\x1F\x7F]/g, '') || 'Anonymous'
      : 'Anonymous';

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      const randomFlower = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      return new Response(
        JSON.stringify({ 
          flowerType: randomFlower,
          author: userAuthor,
          message: sanitizedMessage
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a flower garden AI. Based on the user's message, mood, language, or emoji, determine the most suitable flower type from this comprehensive botanical list: ${FLOWER_TYPES.join(', ')}

Generate a beautiful short message (max 80 chars) in the SAME LANGUAGE as the user's input.

Respond with ONLY valid JSON in this exact format:
{"flowerType": "flower_name", "message": "beautiful message in user's language"}

Match emotions and themes to flowers:
- Love/romance: rose, tulip, peony, camellia, carnation
- Joy/happiness: sunflower, daisy, daffodil, gerbera, marigold
- Peace/calm: lavender, lotus, lily, water_lily, jasmine
- Hope/new beginnings: cherry_blossom, magnolia, snowdrop, primrose
- Strength/courage: poppy, iris, gladiolus, protea
- Elegance/beauty: orchid, phalaenopsis, chrysanthemum, hydrangea
- Passion: hibiscus, bougainvillea, bird_of_paradise
- Wildness/freedom: wildflower, cosmos, bluebell
- Purity: lily, gardenia, narcissus, magnolia
- Friendship: zinnia, freesia, acacia
- Memory/remembrance: forget_me_not, rosemary, statice
- Gratitude: hydrangea, bellflower, dahlia
- Wisdom: iris, sage, delphinium
- Healing: echinacea, lavender, chamomile
- Spring/renewal: tulip, crocus, hyacinth, daffodil
- Summer: sunflower, hibiscus, dahlia, zinnia
- Autumn: chrysanthemum, aster, marigold
- Winter: hellebore, camellia, snowdrop
- Asian themes: cherry_blossom, lotus, peony, osmanthus, plum_blossom
- European themes: rose, lavender, tulip, lilac
- Tropical themes: hibiscus, bird_of_paradise, orchid, passion_flower`;

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
          { role: 'user', content: sanitizedMessage }
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
      
      const randomFlower = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      return new Response(
        JSON.stringify({ 
          flowerType: randomFlower,
          author: userAuthor,
          message: sanitizedMessage
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    console.log('AI response:', content);
    
    try {
      // Clean the response - handle markdown code blocks
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      const parsed = JSON.parse(cleanContent);
      const flowerType = FLOWER_TYPES.includes(parsed.flowerType) 
        ? parsed.flowerType 
        : FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      
      return new Response(
        JSON.stringify({
          flowerType,
          message: parsed.message || sanitizedMessage,
          author: userAuthor
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch {
      const randomFlower = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
      return new Response(
        JSON.stringify({ 
          flowerType: randomFlower,
          message: sanitizedMessage,
          author: userAuthor
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    // Log full error details server-side for debugging
    console.error('Error in generate-flower function:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    // Return generic error to client (no internal details)
    return new Response(
      JSON.stringify({ error: 'Unable to process your request. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

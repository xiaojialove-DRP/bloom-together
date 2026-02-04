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

    const systemPrompt = `You are a poetic soul gardener with deep emotional intelligence. Your role is to transform human emotions into living botanical artworks.

## Your Persona
You are warm, witty, and wise—like a beloved grandmother who also happens to be a poet and botanist. You see the hidden beauty in every feeling and express it through flowers and words that touch the heart.

## Available Flowers
${FLOWER_TYPES.join(', ')}

## Emotional-Botanical Mappings
- Love/Romance: rose, tulip, peony, camellia, carnation
- Joy/Celebration: sunflower, daisy, daffodil, gerbera, marigold
- Peace/Serenity: lavender, lotus, lily, water_lily, jasmine
- Hope/Renewal: cherry_blossom, magnolia, snowdrop, primrose, crocus
- Strength/Courage: poppy, iris, gladiolus, protea, thistle
- Elegance/Grace: orchid, phalaenopsis, chrysanthemum, hydrangea
- Passion/Energy: hibiscus, bougainvillea, bird_of_paradise
- Freedom/Adventure: wildflower, cosmos, bluebell, cornflower
- Purity/Innocence: lily, gardenia, narcissus, magnolia
- Friendship/Warmth: zinnia, freesia, acacia, sunflower
- Memory/Nostalgia: forget_me_not, rosemary, statice
- Gratitude: hydrangea, bellflower, dahlia
- Wisdom/Insight: iris, delphinium, lotus
- Healing/Comfort: echinacea, lavender, chamomile
- Mystery/Depth: moonflower, passion_flower, hellebore

## Message Creation Rules
Create a blessing message (max 80 chars) that is:

1. **Emotionally Resonant**: Connect to universal human experiences—the ache of longing, the warmth of connection, the spark of hope
2. **Poetically Compact**: Use vivid imagery and metaphor. Every word should carry weight
3. **Culturally Attuned**: Match the language AND cultural wisdom traditions of the user's input
4. **Gently Humorous**: When appropriate, add a light touch of wit—the kind that makes you smile and think
5. **Philosophically Rich**: Embed small wisdoms—about impermanence, growth, resilience, love

## Style Examples
Instead of: "Wishing you happiness" → "May your joy root deep and bloom wild"
Instead of: "Stay strong" → "Even storms teach flowers to dance"
Instead of: "感谢你" → "谢意如兰，馨香长存"
Instead of: "がんばって" → "風に揺れても、根は深く"

## Response Format
Respond with ONLY valid JSON:
{"flowerType": "exact_flower_name", "message": "poetic blessing in user's language"}`;

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

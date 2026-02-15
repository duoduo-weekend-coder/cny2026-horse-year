// api/vision.js - Handles image analysis requests
// This file will run securely on the server (Vercel)

export const config = {
  runtime: 'edge', // Using Edge Runtime for speed
};

export default async function handler(req) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get API key from environment variables (Set this in Vercel dashboard)
  const API_KEY = process.env.TOGETHER_API_KEY;
  
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing API Key in server configuration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { base64Image } = await req.json();

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "Qwen/Qwen3-VL-8B-Instruct",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Describe the outfit and key visual traits in this photo. Reply with ONLY a JSON object. Keys: 'short_desc' (2-6 Chinese characters, e.g. '红衣小马'), 'visual_prompt' (English, start with 'wearing', describe clothing/accessories suitable for a cute cartoon horse character, max 30 words). Example: {\"short_desc\":\"蓝帽小马\",\"visual_prompt\":\"wearing a blue baseball cap and a striped scarf\"}" },
              { type: "image_url", image_url: { url: base64Image } }
            ]
          }
        ],
        max_tokens: 300,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vision API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Return the result to the frontend
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
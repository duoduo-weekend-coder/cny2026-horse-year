// api/image.js - Handles image generation requests
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
    const { prompt } = await req.json();

    const response = await fetch('https://api.together.xyz/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'black-forest-labs/FLUX.1-schnell',
        prompt: prompt,
        width: 512,
        height: 512,
        steps: 4,
        n: 1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upstream API error: ${response.status} - ${errorText}`);
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
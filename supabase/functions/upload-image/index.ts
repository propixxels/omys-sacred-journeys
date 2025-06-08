
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { file, fileName } = await req.json()
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const cloudinaryUrl = Deno.env.get('CLOUDINARY_URL')
    if (!cloudinaryUrl) {
      return new Response(
        JSON.stringify({ error: 'Cloudinary configuration not found' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse Cloudinary URL to get credentials
    const cloudinaryConfig = new URL(cloudinaryUrl)
    const apiKey = cloudinaryConfig.username
    const apiSecret = cloudinaryConfig.password
    const cloudName = cloudinaryConfig.hostname

    // Convert base64 to blob
    const base64Data = file.split(',')[1]
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
    
    // Create form data
    const formData = new FormData()
    formData.append('file', new Blob([binaryData]))
    formData.append('upload_preset', 'ml_default') // You may need to create an unsigned upload preset
    formData.append('api_key', apiKey)
    
    // Generate timestamp and signature for signed upload
    const timestamp = Math.floor(Date.now() / 1000)
    formData.append('timestamp', timestamp.toString())
    
    // For basic upload without signature, use unsigned preset
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('Cloudinary upload error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Upload failed', details: errorText }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const result = await uploadResponse.json()
    
    return new Response(
      JSON.stringify({ 
        url: result.secure_url,
        public_id: result.public_id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

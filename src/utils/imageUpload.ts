import { supabase } from "@/integrations/supabase/client";

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const uploadToSupabaseStorage = async (file: File): Promise<string> => {
  // Generate a unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `tour-images/${fileName}`;

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('tour-images')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('tour-images')
    .getPublicUrl(data.path);

  return publicUrl;
};

// Keep the old function for backward compatibility, but use Supabase Storage
export const uploadToCloudinary = uploadToSupabaseStorage;

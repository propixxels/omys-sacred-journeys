
import { supabase } from "@/integrations/supabase/client";

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const { data, error } = await supabase.functions.invoke('upload-image', {
    body: { 
      file: await fileToBase64(file),
      fileName: file.name 
    }
  });

  if (error) throw error;
  return data.url;
};

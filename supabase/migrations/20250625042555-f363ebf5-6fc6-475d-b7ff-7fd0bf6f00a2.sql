
-- Create a storage bucket for tour images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tour-images', 'tour-images', true);

-- Create policy to allow public read access
CREATE POLICY "Public read access for tour images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tour-images');

-- Create policy to allow authenticated uploads
CREATE POLICY "Allow authenticated uploads for tour images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'tour-images');

-- Create policy to allow authenticated updates
CREATE POLICY "Allow authenticated updates for tour images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'tour-images');

-- Create policy to allow authenticated deletes
CREATE POLICY "Allow authenticated deletes for tour images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'tour-images');

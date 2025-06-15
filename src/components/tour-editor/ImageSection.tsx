
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { TourData } from "@/types/tour";
import { uploadToCloudinary } from "@/utils/imageUpload";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ImageSectionProps {
  tourData: TourData;
  onUpdate: (data: Partial<TourData>) => void;
}

const ImageSection = ({ tourData, onUpdate }: ImageSectionProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, isMainImage = false) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      
      if (isMainImage) {
        onUpdate({ image_url: imageUrl });
      } else {
        onUpdate({ gallery: [...tourData.gallery, imageUrl] });
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    onUpdate({
      gallery: tourData.gallery.filter((_, i) => i !== index)
    });
  };

  return (
    <>
      {/* Main Image */}
      <Card>
        <CardHeader>
          <CardTitle>Main Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tourData.image_url && (
            <div className="relative">
              <img src={tourData.image_url} alt="Main tour image" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}
          <div>
            <Label htmlFor="main-image">Upload Main Image</Label>
            <Input
              id="main-image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, true)}
              disabled={uploading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tourData.gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tourData.gallery.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img src={imageUrl} alt={`Gallery image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div>
            <Label htmlFor="gallery-image">Add Gallery Image</Label>
            <Input
              id="gallery-image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, false)}
              disabled={uploading}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ImageSection;

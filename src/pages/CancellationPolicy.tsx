import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-temple font-bold text-orange-600 mb-8 text-center">
            Cancellation Policy
          </h1>
          
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-temple text-orange-600">
                Select Language / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="english" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="kannada">ಕನ್ನಡ</TabsTrigger>
                </TabsList>
                
                <TabsContent value="english" className="space-y-4">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">30 days before travel:</p>
                      <p>Rs 1000 processing fee and flight ticket cancellation fee.</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">Within 15-30 days:</p>
                      <p>25% of the package price and flight ticket cancellation fee.</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">Within 7-15 days:</p>
                      <p>50% of the package price and flight ticket cancellation fee.</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">Within 7 days of travel:</p>
                      <p>75% of the package price and flight ticket cancellation fee.</p>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <p className="font-semibold text-red-700">Within 48 hours of travel:</p>
                      <p className="text-red-600">100% of the package price and flight ticket cancellation fee (no refund).</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="kannada" className="space-y-4">
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">ಪ್ರಯಾಣದ 30 ದಿನ ಮೊದಲು:</p>
                      <p>ರೂಪಾಯಿ 1000 ಪ್ರೊಸೆಸಿಂಗ್ ಫೀ ಹಾಗೂ ವಿಮಾನದ ಟಿಕೆಟ್ ರದ್ಧತಿ ವೆಚ್ಚ.</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">15-30 ದಿನಗಳ ಒಳಗಿನ ವೆಚ್ಚ:</p>
                      <p>25% ಪ್ಯಾಕೇಜ್ ಹಣ ಹಾಗೂ ವಿಮಾನದ ಟಿಕೆಟ್ ರದ್ಧತಿ ವೆಚ್ಚ.</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">7-15 ದಿನಗಳ ಒಳಗಿನ ವೆಚ್ಚ:</p>
                      <p>50% ಪ್ಯಾಕೇಜ್ ಹಣ ಹಾಗೂ ವಿಮಾನದ ಟಿಕೆಟ್ ರದ್ಧತಿ ವೆಚ್ಚ.</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="font-semibold text-orange-700">ಪ್ರಯಾಣದ 7 ದಿನಗಳ ಒಳಗಿನ ವೆಚ್ಚ:</p>
                      <p>75% ಪ್ಯಾಕೇಜ್‌ನ ಹಣ ಹಾಗೂ ವಿಮಾನದ ಟಿಕೆಟ್ ರದ್ಧತಿ ವೆಚ್ಚ.</p>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <p className="font-semibold text-red-700">ಪ್ರಯಾಣದ 48 ಗಂಟೆ ಒಳಗಿನ ವೆಚ್ಚ:</p>
                      <p className="text-red-600">100% ಪ್ಯಾಕೇಜ್ ಹಣ ಹಾಗೂ ವಿಮಾನದ ಟಿಕೆಟ್ ರದ್ಧತಿ ವೆಚ್ಚ (ಯಾವುದೇ ರಿಫಂಡ್ ಇರುವುದಿಲ್ಲ).</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-temple font-bold text-orange-600 mb-8 text-center">
            Terms & Conditions
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
                
                <TabsContent value="english" className="space-y-4 text-gray-700">
                  <div className="space-y-4 leading-relaxed">
                    <p>
                      Omy Travels & Tours is not responsible for any changes in flight timings/flight cancellations and the additional cost if any alternative arrangements are made will be borne by the travelers.
                    </p>
                    
                    <p>
                      In case of any unforeseen natural calamity, bandh/strike or any other reason, the booked flight is missed. The travelers will have to bear the cost of alternative arrangements due to these reasons.
                    </p>
                    
                    <p>
                      In case of health problems, first aid will be provided by the company. If additional treatment is required, the travelers will have to bear the cost.
                    </p>
                    
                    <p>
                      In case of any change in meal and breakfast timings during Shraddha and Puja programs, the travelers are requested to cooperate (request to keep snacks like dry fruits, almonds at such times).
                    </p>
                    
                    <p>
                      Those who have paid and booked their seats in advance will be given the seat of their choice.
                    </p>
                    
                    <p>
                      Since many places have to be visited at a specific time during the sight seeing, we request you to be prepared for the time indicated.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="kannada" className="space-y-4 text-gray-700">
                  <div className="space-y-4 leading-relaxed text-lg">
                    <p>
                      ವಿಮಾನದ ವೇಳೆಯಲ್ಲಾದ ವ್ಯತ್ಯಾಸಗಳಿಗೆ / ವಿಮಾನ ರದ್ಧತಿಯಾದಲ್ಲಿ Omy Travels & Tours ಯಾವುದೇ ರೀತಿಯಲ್ಲೂ ಜವಾಬ್ದಾರಿಯಾಗಿರುವುದಿಲ್ಲ ಹಾಗೂ ಬದಲಿ ವ್ಯವಸ್ಥೆ ಮಾಡುವ ಸಂದರ್ಭ ಬಂದಲ್ಲಿ ಹೆಚ್ಚುವರಿ ವೆಚ್ಚವನ್ನ ಯಾತ್ರಿಕರೇ ಭರಿಸಬೇಕು.
                    </p>
                    
                    <p>
                      ಪ್ರಯಾಣದ ವೇಳೆಯಲ್ಲಿ ಆಕಸ್ಮಿಕವಾಗಿ ಯಾವುದೇ ಪ್ರಕೃತಿ ವಿಕೋಪ, ಬಂದ್‌ / ಮುಷ್ಕರ ಅಥವಾ ಇನ್ನಾವುದೇ ಕಾರಣಗಳಿಂದ ಸಂಚಾರ ದಟ್ಟಣೆಯುಂಟಾಗಿ, ಕಾಯ್ದಿರಿಸಿದ ವಿಮಾನ ತಪ್ಪಿದಲ್ಲಿ, ಓಮಿ ಟ್ರಾವೆಲ್ಸ್‌ & ಟೂರ್ಸ್‌ ಹೊಣೆಯಾಗಿರುವುದಿಲ್ಲ. ಈ ಕಾರಣಗಳಿಂದ ಬದಲಿ ವ್ಯವಸ್ಥೆಗೆ ತಗಲುವ ವೆಚ್ಚವನ್ನು ಪ್ರಯಾಣಿಕರೇ ಭರಿಸಬೇಕು.
                    </p>
                    
                    <p>
                      ಯಾತ್ರಿಕರಿಗೆ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಬಂದಲ್ಲಿ ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಕಂಪನಿಯ ವತಿಯಿಂದ ಮಾಡಿಕೊಡಲಾಗುವುದು. ಹೆಚ್ಚುವರಿ ಚಿಕಿತ್ಸೆಯ ಅವಶ್ಯಕತೆಯಿದ್ದಲ್ಲಿ ಅದರ ವೆಚ್ಚವನ್ನ ಯಾತ್ರಿಕರೇ ಭರಿಸಬೇಕು.
                    </p>
                    
                    <p>
                      ಶ್ರಾದ್ಧ, ಪೂಜೆಯ ಕಾರ್ಯಕ್ರಮದ ವೇಳೆಯಲ್ಲಿ ಊಟ,ಉಪಹಾರ ದ ಸಮಯದಲ್ಲಿ ವ್ಯತ್ಯಾಸವಾದರೆ ಸಹಕರಿಸಲು ವಿನಂತಿ (ಅಂತಹ ಸಮಯದಲ್ಲಿ ಡ್ರೈ ಫ್ರೂಟ್ಸ್‌, ಬಾದಾಮ್‌ ನಂತಹ ಲಘು ಆಹಾರವನ್ನು ಇಟ್ಟುಕೊಳ್ಳಲು ವಿನಂತಿ).
                    </p>
                    
                    <p>
                      ಮೊದಲು ಹಣ ಪಾವತಿಸಿ ಸೀಟ್‌ ಬುಕ್‌ ಮಾಡಿದವರಿಗೆ ಅವರ ಆಯ್ಕೆಯ ಸೀಟ್‌ ಕೊಡಲಾಗುವುದು.
                    </p>
                    
                    <p>
                      ಸೈಟ್‌ ಸೀಯಿಂಗ್‌ ಸಮಯದಲ್ಲಿ ಹಲವು ಸ್ಥಳಗಳನ್ನು ನಿರ್ದಿಷ್ಟ ಸಮಯದಲ್ಲಿ ಸಂದರ್ಶಿಸಬೇಕಾಗಿರುವುದರಿಂದ ನಾವು ಸೂಚಿಸಿದ ಸಮಯಕ್ಕೆ ತಯಾರಿರಬೇಕಾಗಿ ವಿನಂತಿ.
                    </p>
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

export default Terms;


import PageTransition from "@/components/PageTransition";
import TripsWithTabs from "@/components/TripsWithTabs";

const Trips = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-temple-cream">
        {/* Header Section */}
        <section className="relative py-16 bg-gradient-to-r from-temple-maroon to-saffron-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-temple font-bold text-white mb-4">
              Sacred Journeys
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Discover divine destinations and embark on transformative pilgrimage experiences
            </p>
          </div>
        </section>

        {/* Trips with Tabs */}
        <TripsWithTabs />
      </div>
    </PageTransition>
  );
};

export default Trips;

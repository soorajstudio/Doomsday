import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import FrameHero from "./components/FrameHero";
import OriginSection from "./components/OriginSection";
import CharactersSection from "./components/CharactersSection";
import PowersSection from "./components/PowersSection";
import GallerySection from "./components/GallerySection";
import VillainsSection from "./components/VillainsSection";
import TrailersSection from "./components/TrailersSection";
import QuoteSection from "./components/QuoteSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <main className="grain" style={{ background: "#020604" }}>
      <Loader />
      <Navbar />
      <FrameHero />
      <OriginSection />
      <CharactersSection />
      <PowersSection />
      <GallerySection />
      <VillainsSection />
      <TrailersSection />
      <QuoteSection />
      <CTASection />
    </main>
  );
}

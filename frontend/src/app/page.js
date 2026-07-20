import HomeHero from "@/components/HomeHero/HomeHero";
import HomeNFC from "@/components/HomeNFC/HomeNFC";
import HomePreview from "@/components/HomePreview/HomePreview";
import HomeShare from "@/components/HomeShare/HomeShare";
import HomeCTA from "@/components/HomeCTA/HomeCTA";
import HomeFooter from "@/components/HomeFooter/HomeFooter";

import "./home.css";

export default function Home() {
  return (
    <main className="home-page">
      <HomeHero />
      <HomeNFC />
      <HomePreview />
      <HomeShare />
      <HomeCTA />
      <HomeFooter />
    </main>
  );
}
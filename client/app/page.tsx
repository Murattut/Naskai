
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Pricing } from "../components/landing/Pricing";
import { FAQ } from "../components/landing/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
      </main>
    </div>
  );
}

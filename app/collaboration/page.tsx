import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "./components/Hero";
import AboutCollaboration from "./components/AboutCollaboration";
import Workflow from "./components/Workflow";
import Benefits from "./components/Benefits";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import ContactSales from "./components/ContactSales";

export const metadata: Metadata = {
  title: "Collaboration | 5ingular Graphic",
  description:
    "Mulai kolaborasi profesional dengan 5ingular Graphic. Desain, branding, motion, UI/UX, website, dan semua kebutuhan visual brand Anda.",
};

export default function CollaborationPage() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
        <Hero />
        <AboutCollaboration />
        <Workflow />
        <Benefits />
        <Services />
        <Pricing />
        <Faq />
        <ContactSales />
      </main>
      <Footer />
    </>
  );
}

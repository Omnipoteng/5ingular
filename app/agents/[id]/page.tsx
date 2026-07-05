import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentHero from "@/components/agents/AgentHero";
import AgentPortfolio from "@/components/agents/AgentPortfolio";
import {
  AgentAbout,
  AgentSkills,
  AgentExperience,
  AgentServices,
  AgentPricing,
  AgentRules,
  AgentReviews,
  AgentStats,
  AgentHireInfo,
} from "@/components/agents/AgentProfileDetails";
import { agents } from "@/data/agents";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return {
      title: "Agent Not Found | 5ingular Graphic",
    };
  }

  return {
    title: `${agent.name} | ${agent.role} - 5ingular Graphic`,
    description: agent.about,
  };
}

export default async function AgentProfilePage({ params }: PageProps) {
  const { id } = await params;
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white">
        {/* Agent Profile Hero */}
        <AgentHero agent={agent} />

        {/* Detailed Grid Panel */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Main Content Column */}
            <div className="lg:col-span-2 flex flex-col gap-12">
              <AgentStats stats={agent.stats} />
              <AgentAbout agent={agent} />
              <AgentSkills skills={agent.skills} />
              <AgentServices services={agent.services} />
              <AgentExperience experience={agent.experience} />
            </div>

            {/* Sidebar Column */}
            <div className="flex flex-col gap-8 lg:sticky lg:top-24">
              <AgentPricing pricing={agent.pricing} />
              <AgentHireInfo hireInfo={agent.hireInfo} />
            </div>
          </div>
        </div>

        {/* Full-width Portfolio Section */}
        <AgentPortfolio portfolio={agent.portfolio} />

        {/* Rules & Reviews Panel */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-zinc-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AgentRules rules={agent.rules} />
            <AgentReviews reviews={agent.reviews} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

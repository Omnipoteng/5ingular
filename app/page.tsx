"use client";

import React, { useState } from "react";
import Intro from "../components/Intro";
import Landing from "../components/Landing";

export default function Home() {
  const [step, setStep] = useState<"video" | "landing">("video");

  return (
    <main className="flex-1 w-full min-h-screen bg-white">
      {step === "video" && (
        <Intro onComplete={() => setStep("landing")} />
      )}
      {step === "landing" && (
        <Landing />
      )}
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import Portfolio from "./Portfolio";
import WhyChooseUs from "./WhyChooseUs";
import Workflow from "./Workflow";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";

export default function Landing() {
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const handler = () => setTypingDone(true);
    window.addEventListener("typing-done", handler);
    return () => window.removeEventListener("typing-done", handler);
  }, []);

  const fadeIn = (delayMs: number): React.CSSProperties => ({
    opacity: typingDone ? 1 : 0,
    transform: typingDone ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delayMs}ms, transform 0.7s ease ${delayMs}ms`,
  });

  return (
    <>
      {/* Navbar: always visible */}
      <Navbar />

      <div className="w-full min-h-screen bg-white dark:bg-zinc-950">
        {/* Hero manages its own stagger animation */}
        <Hero />

        {/* Sections below fade in after hero animation completes */}
        <div style={fadeIn(0)}><Services /></div>
        <div style={fadeIn(100)}><Portfolio /></div>
        <div style={fadeIn(200)}><WhyChooseUs /></div>
        <div style={fadeIn(300)}><Workflow /></div>
        <div style={fadeIn(400)}><Testimonials /></div>
        <div style={fadeIn(500)}><CTA /></div>
        <div style={fadeIn(600)}><Footer /></div>
      </div>
    </>
  );
}

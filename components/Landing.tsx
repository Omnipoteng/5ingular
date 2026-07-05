"use client";

import { motion, Variants } from "framer-motion";
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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Navbar />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full min-h-screen bg-white"
      >
        <motion.div variants={itemVariants}>
          <Hero />
        </motion.div>
      <motion.div variants={itemVariants}>
        <Services />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Portfolio />
      </motion.div>
      <motion.div variants={itemVariants}>
        <WhyChooseUs />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Workflow />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Testimonials />
      </motion.div>
      <motion.div variants={itemVariants}>
        <CTA />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Footer />
      </motion.div>
      </motion.div>
    </>
  );
}

import React from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import BentoGrid from "@/components/portfolio/BentoGrid";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <BentoGrid />
      <Projects />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;

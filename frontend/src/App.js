import React from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Stats from "@/components/portfolio/Stats";
import Projects from "@/components/portfolio/Projects";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <About />
      <Skills />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;

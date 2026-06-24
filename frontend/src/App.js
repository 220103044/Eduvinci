import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileCtaBar from "./components/MobileCtaBar";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ItalyEducation from "./pages/ItalyEducation";
import SuccessStories from "./pages/SuccessStories";
import Webinar from "./pages/Webinar";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/hizmetler" element={<Services />} />
            <Route path="/italyada-egitim" element={<ItalyEducation />} />
            <Route path="/basari-hikayeleri" element={<SuccessStories />} />
            <Route path="/webinar" element={<Webinar />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
          <MobileCtaBar />
          <Toaster position="top-center" richColors closeButton />
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;

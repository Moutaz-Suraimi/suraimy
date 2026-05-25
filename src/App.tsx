import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import InstallPWA from "./components/InstallPWA";
import PageBackground from "./components/PageBackground";

// Lazy-loaded routes for code splitting
const Index = lazy(() => import("./pages/Index"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ReadyWebsiteDetails = lazy(() => import("./pages/ReadyWebsiteDetails"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Packages = lazy(() => import("./pages/Packages"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Premium minimal fallback page loader
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md">
    <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't re-fetch on window focus — reduces background requests
      refetchOnWindowFocus: false,
      // Data stays fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache persists for 10 minutes after a component unmounts
      gcTime: 10 * 60 * 1000,
      // Only retry once on error (default 3 retries is aggressive)
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageBackground>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/terms" element={<TermsOfUse />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/ready-website/:id" element={<ReadyWebsiteDetails />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageBackground>
          <InstallPWA />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

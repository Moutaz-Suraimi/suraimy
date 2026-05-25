import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import TermsOfUse from "./pages/TermsOfUse";
import ContactUs from "./pages/ContactUs";
import ReadyWebsiteDetails from "./pages/ReadyWebsiteDetails";
import Solutions from "./pages/Solutions";
import Packages from "./pages/Packages";
import Portfolio from "./pages/Portfolio";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import InstallPWA from "./components/InstallPWA";
import PageBackground from "./components/PageBackground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageBackground>
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
          </PageBackground>
          <InstallPWA />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

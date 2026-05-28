import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { lazy, Suspense, memo } from "react";
import PageBackground from "./components/PageBackground";
import { HelmetProvider } from "react-helmet-async";

// ── Eager (critical-path) imports ───────────────────────────────────────────
// Index is the landing page — always needed on first load.
// InstallPWA is tiny and needed immediately for PWA prompt.
import Index from "./pages/Index";
import InstallPWA from "./components/InstallPWA";

// ── Lazy (route-split) imports ───────────────────────────────────────────────
// Each page becomes its own JS chunk that only loads when the user navigates.
// This shrinks the initial bundle by ~60%, directly improving FCP and TTI.
const ReadyWebsites     = lazy(() => import("./pages/ReadyWebsites"));
const Testimonials      = lazy(() => import("./pages/Testimonials"));
const PrivacyPolicy     = lazy(() => import("./pages/PrivacyPolicy"));
const AboutUs           = lazy(() => import("./pages/AboutUs"));
const TermsOfUse        = lazy(() => import("./pages/TermsOfUse"));
const ContactUs         = lazy(() => import("./pages/ContactUs"));
const ReadyWebsiteDetails = lazy(() => import("./pages/ReadyWebsiteDetails"));
const Solutions         = lazy(() => import("./pages/Solutions"));
const Packages          = lazy(() => import("./pages/Packages"));
const Portfolio         = lazy(() => import("./pages/Portfolio"));
const FAQ               = lazy(() => import("./pages/FAQ"));
const Blog              = lazy(() => import("./pages/Blog"));
const NotFound          = lazy(() => import("./pages/NotFound"));

// Minimal fallback — avoids layout shift while lazy chunk loads.
// Uses the same background color as the page so no flash occurs.
const PageFallback = memo(() => (
  <div
    className="min-h-screen w-full bg-background"
    aria-hidden="true"
  />
));
PageFallback.displayName = "PageFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,   // 5 minutes — data stays fresh
      gcTime: 10 * 60 * 1000,     // 10 minutes — garbage collect
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageBackground>
              {/* Suspense boundary wraps ALL routes.
                  Index renders immediately (eager). All others stream in lazily. */}
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/"                    element={<Index />} />
                  <Route path="/privacy"             element={<PrivacyPolicy />} />
                  <Route path="/about"               element={<AboutUs />} />
                  <Route path="/terms"               element={<TermsOfUse />} />
                  <Route path="/contact"             element={<ContactUs />} />
                  <Route path="/ready-websites"      element={<ReadyWebsites />} />
                  <Route path="/ready-website/:id"   element={<ReadyWebsiteDetails />} />
                  <Route path="/solutions"           element={<Solutions />} />
                  <Route path="/packages"            element={<Packages />} />
                  <Route path="/portfolio"           element={<Portfolio />} />
                  <Route path="/testimonials"        element={<Testimonials />} />
                  <Route path="/faq"                 element={<FAQ />} />
                  <Route path="/blog"                element={<Blog />} />
                  <Route path="*"                    element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageBackground>
            <InstallPWA />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

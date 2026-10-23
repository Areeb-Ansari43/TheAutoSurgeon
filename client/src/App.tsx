import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteHeader, SiteFooter } from "./components/Site";
import Home from "./pages/Home";
import Information, { GuideDetail } from "./pages/Information";
import {
  ServicesHub,
  ServiceDetail,
  Tyres,
  Pricing,
  NotFound,
} from "./pages/Services";
import RequestPage from "./pages/Request";
import Contact from "./pages/Contact";
import WhatsApp from "./pages/WhatsApp";
import ThankYou from "./pages/ThankYou";
import Account, { WorkshopManager } from "./pages/Account";
import { getPageMeta } from "@shared/routes";
import { useAuth } from "./_core/hooks/useAuth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesHub} />
      <Route path="/services/:slug">
        {params => <ServiceDetail slug={params.slug} />}
      </Route>
      <Route path="/tyres" component={Tyres} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/whatspp" component={WhatsApp} />
      <Route path="/whatsapp" component={WhatsApp} />
      <Route path="/book">
        {() => <RequestPage key="booking" kind="booking" />}
      </Route>
      <Route path="/quote">
        {() => <RequestPage key="quote" kind="quote" />}
      </Route>
      <Route path="/account" component={Account} />
      <Route path="/login" component={Account} />
      <Route path="/register" component={Account} />
      <Route path="/manage" component={WorkshopManager} />
      {["about", "workshop", "reviews", "faq", "guides", "privacy"].map(
        page => (
          <Route key={page} path={`/${page}`}>
            {() => <Information page={page} />}
          </Route>
        )
      )}
      <Route path="/guides/:slug">
        {params => <GuideDetail slug={params.slug} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
function RouteEffects() {
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    const meta = getPageMeta(location);
    document.title = meta?.title || "Page Not Found — The Auto Surgeon";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      meta?.description || "The page you requested could not be found."
    );
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute(
        "content",
        meta?.private || !meta ? "noindex, nofollow" : "index, follow"
      );
    for (const attr of ["og:title", "twitter:title"])
      document
        .querySelector(`[property="${attr}"],[name="${attr}"]`)
        ?.setAttribute("content", meta?.title || "The Auto Surgeon");
    for (const attr of ["og:description", "twitter:description"])
      document
        .querySelector(`[property="${attr}"],[name="${attr}"]`)
        ?.setAttribute(
          "content",
          meta?.description || "Expert vehicle care in Hayes."
        );
  }, [location]);
  useEffect(() => {
    if (!user || location !== "/") return;
    const target = sessionStorage.getItem("autosurgeon-return");
    if (target === "/account") {
      sessionStorage.removeItem("autosurgeon-return");
      navigate("/account");
    }
  }, [user, location, navigate]);
  return null;
}
export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <RouteEffects />
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            <Router />
          </main>
          <SiteFooter />
          <Toaster theme="dark" />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MuseumLayout from "./components/layout/MuseumLayout";
import MuseumDashboard from "./pages/museum/Dashboard";
import Collection from "./pages/museum/Collection";
import Reaccessioning from "./pages/museum/Reaccessioning";
import Governance from "./pages/museum/Governance";
import Blockchain from "./pages/museum/Blockchain";
import Compliance from "./pages/museum/Compliance";
import Analytics from "./pages/museum/Analytics";
import Stakeholders from "./pages/museum/Stakeholders";
import Community from "./pages/museum/Community";
import MuseumSettings from "./pages/museum/Settings";
import StakeholderLayout from "./components/layout/StakeholderLayout";
import Portfolio from "./pages/stakeholder/Portfolio";
import Discover from "./pages/stakeholder/Discover";
import AssetDetail from "./pages/stakeholder/AssetDetail";
import GovernanceVoting from "./pages/stakeholder/GovernanceVoting";
import Benefits from "./pages/stakeholder/Benefits";
import Onboarding from "./pages/stakeholder/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/museum" element={<MuseumLayout />}>
              <Route index element={<MuseumDashboard />} />
              <Route path="collection" element={<Collection />} />
              <Route path="reaccessioning" element={<Reaccessioning />} />
              <Route path="governance" element={<Governance />} />
              <Route path="blockchain" element={<Blockchain />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="stakeholders" element={<Stakeholders />} />
              <Route path="community" element={<Community />} />
              <Route path="settings" element={<MuseumSettings />} />
            </Route>
            <Route path="/stakeholder" element={<StakeholderLayout />}>
              <Route index element={<Portfolio />} />
              <Route path="discover" element={<Discover />} />
              <Route path="asset/:id" element={<AssetDetail />} />
              <Route path="governance" element={<GovernanceVoting />} />
              <Route path="benefits" element={<Benefits />} />
              <Route path="onboarding" element={<Onboarding />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

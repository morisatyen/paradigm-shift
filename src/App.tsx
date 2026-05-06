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
import AddCollection from "./pages/museum/AddCollection";
import CollectionDetail from "./pages/museum/CollectionDetail";
import VotingListings from "./pages/museum/VotingListings";
import CollectionsGroups from "./pages/museum/CollectionsGroups";
import Experiences from "./pages/museum/Experiences";
import VisitorLogin from "./pages/visitor/VisitorLogin";
import VisitorPoll from "./pages/visitor/VisitorPoll";
import StakeholderLayout from "./components/layout/StakeholderLayout";
import Portfolio from "./pages/stakeholder/Portfolio";
import Discover from "./pages/stakeholder/Discover";
import AssetDetail from "./pages/stakeholder/AssetDetail";
import GovernanceVoting from "./pages/stakeholder/GovernanceVoting";
import Benefits from "./pages/stakeholder/Benefits";
import Onboarding from "./pages/stakeholder/Onboarding";
import ImpactMetrics from "./pages/stakeholder/ImpactMetrics";
import DonorInvestor from "./pages/stakeholder/DonorInvestor";
import SecondaryMarket from "./pages/stakeholder/SecondaryMarket";

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
              <Route path="collection/add" element={<AddCollection />} />
              <Route path="collection/:id" element={<CollectionDetail />} />
              <Route path="collection/:id/edit" element={
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-3xl">🚧</span>
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">Coming Soon</h2>
                  <p className="text-muted-foreground text-sm max-w-xs">The Edit Artwork feature is currently under development and will be available soon.</p>
                  <a href="/museum/collection" className="text-sm text-secondary hover:underline">← Back to Collection</a>
                </div>
              } />
              <Route path="reaccessioning" element={<Reaccessioning />} />
              <Route path="governance" element={<Governance />} />
              <Route path="blockchain" element={<Blockchain />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="stakeholders" element={<Stakeholders />} />
              <Route path="community" element={<Community />} />
              <Route path="settings" element={<MuseumSettings />} />
              <Route path="voting" element={<VotingListings />} />
              <Route path="collections-groups" element={<CollectionsGroups />} />
              <Route path="experiences" element={<Experiences />} />
            </Route>
            <Route path="/stakeholder" element={<StakeholderLayout />}>
              <Route index element={<Portfolio />} />
              <Route path="discover" element={<Discover />} />
              <Route path="asset/:id" element={<AssetDetail />} />
              <Route path="governance" element={<GovernanceVoting />} />
              <Route path="benefits" element={<Benefits />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="impact" element={<ImpactMetrics />} />
              <Route path="donor" element={<DonorInvestor />} />
              <Route path="secondary-market" element={<SecondaryMarket />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/visitor/login" element={<VisitorLogin />} />
            <Route path="/visitor/poll" element={<VisitorPoll />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

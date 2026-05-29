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
import ExperienceDetail from "./pages/museum/ExperienceDetail";
import AddExperience from "./pages/museum/AddExperience";
import ArtworkEditor from "./pages/museum/ArtworkEditor";
import ExperienceEditor from "./pages/museum/ExperienceEditor";
import CollectionGroupEditor from "./pages/museum/CollectionGroupEditor";
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
            <Route path="/Workspace" element={<MuseumLayout />}>
              <Route path="dashboard" element={<MuseumDashboard />} />
              <Route path="collections" element={<CollectionsGroups />} />
              <Route path="collections/add" element={<CollectionGroupEditor mode="add" />} />
              <Route path="collections/:id/edit" element={<CollectionGroupEditor mode="edit" />} />
              <Route path="collections/artworks" element={<Collection />} />
              <Route path="collections/artworks/add" element={<AddCollection />} />
              <Route path="collections/artworks/:id" element={<CollectionDetail />} />
              <Route path="collections/artworks/:id/edit" element={<ArtworkEditor mode="edit" />} />
              <Route path="collections/experiences" element={<Experiences />} />
              <Route path="collections/experiences/add" element={<AddExperience />} />
              <Route path="collections/experiences/:id" element={<ExperienceDetail />} />
              <Route path="collections/experiences/:id/edit" element={<ExperienceEditor mode="edit" />} />
              <Route path="reaccessioning" element={<Reaccessioning />} />
              <Route path="governance" element={<Governance />} />
              <Route path="blockchain" element={<Blockchain />} />
              <Route path="compliance" element={<Compliance />} />
            </Route>
            <Route path="/Insights" element={<MuseumLayout />}>
              <Route path="analytics" element={<Analytics />} />
              <Route path="stakeholders" element={<Stakeholders />} />
              <Route path="community" element={<Community />} />
              <Route path="voting" element={<VotingListings />} />
              <Route path="settings" element={<MuseumSettings />} />
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

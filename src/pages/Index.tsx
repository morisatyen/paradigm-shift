import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Landmark, TrendingUp, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ARTWORKS } from "@/data/mockData";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Index = () => (
  <div className="min-h-screen bg-background">
    {/* Nav */}
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <span className="font-heading font-semibold text-lg text-foreground tracking-tight">Paradigm <span className="text-secondary">Shift</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#artworks" className="hover:text-foreground transition-colors">Artworks</a>
          <a href="#trust" className="hover:text-foreground transition-colors">Trust</a>
        </nav>
        <Link to="/login"><Button size="sm">Get Started <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div>
    </header>

    {/* Hero */}
    <section className="pt-32 pb-20 gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(202 56% 56% / 0.3), transparent 50%), radial-gradient(circle at 80% 50%, hsl(43 74% 49% / 0.2), transparent 50%)" }} />
      <div className="container relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm mb-6">
            <Shield className="w-4 h-4" /> SEC-Compliant Fractional Art Ownership
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            Unlocking a <span className="text-secondary">$4.2 Billion</span> Market Opportunity in Museum Art
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-2xl">
            The institutional-grade platform connecting museums with global investors through blockchain-secured fractional ownership of culturally significant artworks.
          </p>
          <div className="flex gap-4">
            <Link to="/login"><Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Start Investing <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <Link to="/login"><Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">Museum Partners</Button></Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[{ label: "Total Art Value", value: "$1.2B+" }, { label: "Active Investors", value: "12,400+" }, { label: "Museum Partners", value: "24" }, { label: "Avg. Annual Return", value: "14.2%" }].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-heading font-bold text-primary-foreground">{s.value}</div>
              <div className="text-primary-foreground/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Featured Artworks */}
    <section id="artworks" className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold text-foreground">Featured Artworks</h2>
            <p className="text-muted-foreground mt-2">Currently available for fractional investment</p>
          </div>
          <Link to="/login" className="text-secondary text-sm flex items-center gap-1 hover:underline">View All <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ARTWORKS.slice(0, 3).map((a, i) => (
            <motion.div key={a.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="group glass-card rounded-xl overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground mb-1">{a.artist}, {a.year}</div>
                <h3 className="font-semibold text-foreground mb-3">{a.title}</h3>
                <div className="flex justify-between text-sm">
                  <div><span className="text-muted-foreground">Value</span><div className="font-semibold text-foreground">${(a.currentValue / 1e6).toFixed(1)}M</div></div>
                  <div><span className="text-muted-foreground">Yield</span><div className="font-semibold text-success">{a.dividendYield}%</div></div>
                  <div><span className="text-muted-foreground">Token</span><div className="font-semibold text-foreground">${a.pricePerToken.toLocaleString()}</div></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-4">How It Works</h2>
        <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">A seamless process for both museum partners and art investors</p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-6 flex items-center gap-2"><Landmark className="w-5 h-5 text-secondary" /> For Museums</h3>
            <div className="space-y-4">
              {["Submit artwork for reaccessioning review", "Board approval via multi-signature governance", "Tokenize with SEC-compliant structure", "Receive funding while retaining cultural stewardship"].map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">{i + 1}</div>
                  <p className="text-foreground pt-1">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-secondary" /> For Investors</h3>
            <div className="space-y-4">
              {["Complete accredited investor KYC/AML verification", "Browse curated museum-grade artworks", "Purchase fractional tokens at institutional pricing", "Earn dividends and participate in governance"].map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold shrink-0">{i + 1}</div>
                  <p className="text-foreground pt-1">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Trust */}
    <section id="trust" className="py-20">
      <div className="container text-center">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Institutional Trust</h2>
        <p className="text-muted-foreground mb-12">Backed by leading art institutions and regulatory compliance</p>
        <div className="flex flex-wrap justify-center gap-8">
          {["AAM Accredited", "AAMD Member", "SEC Reg D", "GDPR Compliant", "SOC 2 Type II"].map(b => (
            <div key={b} className="flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-foreground">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="py-10 gradient-navy">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded gradient-accent flex items-center justify-center"><span className="text-primary-foreground text-xs font-bold">P</span></div>
          <span className="text-primary-foreground/80 text-sm">© 2024 Paradigm Shift. All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-primary-foreground/50 text-sm">
          <a href="#" className="hover:text-primary-foreground">Privacy</a>
          <a href="#" className="hover:text-primary-foreground">Terms</a>
          <a href="#" className="hover:text-primary-foreground">Contact</a>
        </div>
      </div>
    </footer>
  </div>
);
export default Index;

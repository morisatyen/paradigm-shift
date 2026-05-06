import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { COLLECTIONS, EXPERIENCES, ARTWORKS } from "@/data/mockData";
import { CheckCircle2, CreditCard, Lock, ArrowLeft } from "lucide-react";

const FEELINGS = ["😢 Emotional", "😮 Inspiring", "🤔 Thoughtful", "😌 Peaceful"];
const RATINGS = [1, 2, 3, 4, 5];

const TIMELINE: Record<string, { year: string; event: string }[]> = {
  "1":  [{ year: "1917", event: "Painted by Claude Monet at Giverny" }, { year: "1952", event: "Acquired by Metropolitan Museum of Art" }, { year: "1999", event: "Featured in landmark Impressionism exhibition" }, { year: "2024", event: "Tokenized on Paradigm Shift platform" }],
  "2":  [{ year: "1888", event: "Painted by Van Gogh in Arles, France" }, { year: "1975", event: "Acquired by Musée d'Orsay, Paris" }, { year: "2010", event: "Toured 12 international museums" }, { year: "2024", event: "Tokenized on Paradigm Shift platform" }],
  "3":  [{ year: "1908", event: "Created by Gustav Klimt in Vienna" }, { year: "1908", event: "Acquired directly by Austrian State Gallery" }, { year: "2006", event: "Valued at $135M — most expensive Austrian artwork" }, { year: "2024", event: "Tokenized on Paradigm Shift platform" }],
  "4":  [{ year: "1665", event: "Painted by Johannes Vermeer in Delft" }, { year: "1902", event: "Donated to Mauritshuis by Des Tombe estate" }, { year: "2014", event: "Restored after 2-year conservation project" }, { year: "2024", event: "Tokenized on Paradigm Shift platform" }],
  "5":  [{ year: "1831", event: "Woodblock print by Katsushika Hokusai" }, { year: "1900s", event: "Influenced Western art movements globally" }, { year: "1990", event: "Acquired by Tokyo National Museum" }, { year: "2024", event: "Tokenized on Paradigm Shift platform" }],
  "6":  [{ year: "1923", event: "Painted by Kandinsky at Bauhaus, Germany" }, { year: "1938", event: "Acquired by Solomon R. Guggenheim Museum" }, { year: "2001", event: "Centerpiece of Abstract Art retrospective" }, { year: "2024", event: "Tokenized on Paradigm Shift platform" }],
  "col1": [{ year: "1665", event: "Earliest work — Girl with Pearl Earring created" }, { year: "1908", event: "The Kiss added to Austrian State Gallery" }, { year: "1917", event: "Water Lilies painted — collection theme born" }, { year: "2024", event: "Curated as 'Emotions Through Centuries' collection" }],
  "col2": [{ year: "1888", event: "Van Gogh paints Starry Night Over the Rhône" }, { year: "1923", event: "Kandinsky's Composition VIII created" }, { year: "2020", event: "Both works studied for light & shadow techniques" }, { year: "2024", event: "Curated as 'Light and Shadow Masters' collection" }],
  "col3": [{ year: "1665", event: "Girl with Pearl Earring — Dutch Golden Age masterpiece" }, { year: "1902", event: "Donated to Mauritshuis museum" }, { year: "2003", event: "Film adaptation brought global attention" }, { year: "2024", event: "Curated as 'The Golden Age' collection" }],
  "col4": [{ year: "1831", event: "Hokusai's Great Wave — Japanese woodblock art" }, { year: "1923", event: "Kandinsky's abstract work bridges East-West" }, { year: "2015", event: "Joint exhibition at Tokyo & New York" }, { year: "2024", event: "Curated as 'East Meets West' collection" }],
  "exp1": [{ year: "2019", event: "First private viewing program launched" }, { year: "2021", event: "Program expanded to 20 guests per session" }, { year: "2023", event: "Rated #1 museum experience in New York" }, { year: "2024", event: "Now available to token holders" }],
  "exp2": [{ year: "2015", event: "Dr. Sarah Mitchell appointed Chief Curator" }, { year: "2018", event: "Curator Talk series launched" }, { year: "2022", event: "Series reached 5,000 attendees" }, { year: "2024", event: "Now available to token holders" }],
  "exp3": [{ year: "2020", event: "Virtual tours launched during pandemic" }, { year: "2021", event: "500K+ virtual visitors in first year" }, { year: "2023", event: "Live commentary feature added" }, { year: "2024", event: "Now available to token holders" }],
  "exp4": [{ year: "2010", event: "Conservation workshop program started" }, { year: "2016", event: "UNESCO recognized conservation methods" }, { year: "2022", event: "Workshop capacity expanded to 15 guests" }, { year: "2024", event: "Now available to token holders" }],
};

const DEFAULT_TIMELINE = [
  { year: "1800s", event: "Artwork created by master artist" },
  { year: "1950s", event: "Acquired by museum collection" },
  { year: "2000s", event: "Featured in major international exhibition" },
  { year: "2024", event: "Tokenized on Paradigm Shift platform" },
];

const PaymentScreen = ({ name }: { name: string }) => {
  const [payStep, setPayStep] = useState<"form" | "processing" | "done">("form");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const formatCard = (val: string) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val: string) => { const v = val.replace(/\D/g, "").slice(0, 4); return v.length >= 3 ? `${v.slice(0, 2)}/${v.slice(2)}` : v; };

  const handlePay = () => { setPayStep("processing"); setTimeout(() => setPayStep("done"), 2000); };

  if (payStep === "processing") return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
      <p className="text-sm text-muted-foreground">Processing payment...</p>
    </div>
  );

  if (payStep === "done") return (
    <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-success" />
      </div>
      <h3 className="font-heading font-bold text-foreground text-lg">Payment Successful!</h3>
      <p className="text-sm text-muted-foreground">Token purchase for <span className="font-medium text-foreground">{name}</span> confirmed.</p>
      <div className="w-full p-4 rounded-xl bg-muted space-y-2 text-sm text-left">
        <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-semibold text-foreground">$4,820.00</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Tokens</span><span className="font-semibold text-foreground">1 token</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Ref</span><span className="font-mono text-xs text-muted-foreground">TXN-{Math.random().toString(36).slice(2, 10).toUpperCase()}</span></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-muted">
        <Lock className="w-4 h-4 text-success shrink-0" />
        <span className="text-xs text-muted-foreground">Secure mock payment — no real charge</span>
      </div>
      <div className="p-4 rounded-xl border border-border space-y-1">
        <p className="text-xs text-muted-foreground">Purchasing token for</p>
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xl font-bold text-foreground">$4,820.00</p>
        <p className="text-xs text-muted-foreground">1 token · Dividend yield 4.2%</p>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Card Number</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={card.number} onChange={e => setCard(p => ({ ...p, number: formatCard(e.target.value) }))}
              placeholder="1234 5678 9012 3456" maxLength={19}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Expiry</label>
            <input value={card.expiry} onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
              placeholder="MM/YY" maxLength={5}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">CVV</label>
            <input value={card.cvv} onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
              placeholder="123" maxLength={3} type="password"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Cardholder Name</label>
          <input value={card.name} onChange={e => setCard(p => ({ ...p, name: e.target.value }))}
            placeholder="John Smith"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
        </div>
      </div>
      <button onClick={handlePay} className="w-full py-4 rounded-xl gradient-navy text-white font-semibold text-base">
        Pay $4,820.00
      </button>
      <p className="text-center text-xs text-muted-foreground">Demo only — no real payment processed</p>
    </div>
  );
};

const VisitorPoll = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "collection";
  const id = searchParams.get("id") || "col1";

  const target = type === "collection"
    ? COLLECTIONS.find(c => c.id === id) || COLLECTIONS[0]
    : EXPERIENCES.find(e => e.id === id) || EXPERIENCES[0];

  const name = type === "collection" ? (target as any).name : (target as any).title;
  const timeline = TIMELINE[id] || DEFAULT_TIMELINE;
  const relatedArtwork = type === "collection"
    ? ARTWORKS.find(a => (target as any).artworks?.[0] === a.id)
    : ARTWORKS.find(a => a.id === "1");

  const [activeTab, setActiveTab] = useState<"overview" | "poll" | "donate">("overview");
  const [feeling, setFeeling] = useState("");
  const [rating, setRating] = useState(0);
  const [relevant, setRelevant] = useState("");
  const [recommend, setRecommend] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!feeling || !rating || !relevant || !recommend) { setError("Please answer all questions"); return; }
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Thank You!</h2>
        <p className="text-muted-foreground text-sm mb-6">Your vote has been recorded.</p>
        <div className="glass-card rounded-2xl p-5 text-left mb-6 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">You felt</span><span className="font-medium text-foreground">{feeling}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rating</span><span className="font-medium text-foreground">{"⭐".repeat(rating)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Relevant today</span><span className="font-medium text-foreground">{relevant}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Would recommend</span><span className="font-medium text-foreground">{recommend}</span></div>
        </div>
        <button onClick={() => navigate("/")} className="w-full py-3.5 rounded-xl gradient-navy text-white font-semibold">Done</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="w-full max-w-sm mx-auto">

        {/* Hero Image — full width of container */}
        <div className="relative">
          <img src={target.image} alt={name} className="w-full h-52 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 rounded-xl bg-black/30 text-white">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block ${type === "collection" ? "bg-secondary/80 text-white" : "bg-warning/80 text-white"}`}>
              {type === "collection" ? "Collection" : "Experience"}
            </span>
            <h1 className="text-white font-heading font-bold text-xl leading-tight">{name}</h1>
            <p className="text-white/70 text-xs mt-0.5">{(target as any).museum}</p>
          </div>
        </div>

        {/* Card — exact same width as hero image, no side padding */}
        <div className="glass-card rounded-b-2xl overflow-hidden mt-0">

          {/* 3 Tab Headers */}
          <div className="flex border-b border-border">
            {(["overview", "poll", "donate"] as const).map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors border-r last:border-r-0 border-border ${activeTab === tab ? "gradient-navy text-white" : "text-muted-foreground bg-background hover:bg-muted/50"}`}>
                {tab === "overview" ? "📖 Overview" : tab === "poll" ? "🗳️ Poll" : "💳 Donate"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-5">

            {/* OVERVIEW — History Timeline */}
            {activeTab === "overview" && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">History Timeline</h3>
                <div>
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${i === timeline.length - 1 ? "bg-secondary" : "bg-primary/40"}`} />
                        {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" style={{ minHeight: "28px" }} />}
                      </div>
                      <div className="pb-5">
                        <span className="text-xs font-bold text-secondary">{item.year}</span>
                        <p className="text-sm text-foreground mt-0.5 leading-relaxed">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* POLL — Questions */}
            {activeTab === "poll" && (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">How did this make you feel?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {FEELINGS.map(f => (
                      <button key={f} onClick={() => setFeeling(f)}
                        className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${feeling === f ? "gradient-navy text-white" : "bg-muted text-foreground"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Rate your experience</p>
                  <div className="flex gap-2">
                    {RATINGS.map(r => (
                      <button key={r} onClick={() => setRating(r)}
                        className={`flex-1 py-3 rounded-xl text-lg transition-all ${rating >= r ? "gradient-navy text-white" : "bg-muted text-muted-foreground"}`}>
                        ⭐
                      </button>
                    ))}
                  </div>
                  {rating > 0 && <p className="text-center text-xs text-muted-foreground mt-1">{["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}</p>}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Relevant to today's world?</p>
                  <div className="flex gap-2">
                    {["Yes", "Somewhat", "No"].map(opt => (
                      <button key={opt} onClick={() => setRelevant(opt)}
                        className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${relevant === opt ? "gradient-navy text-white" : "bg-muted text-foreground"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Would you recommend this?</p>
                  <div className="flex gap-2">
                    {["Yes", "Maybe", "No"].map(opt => (
                      <button key={opt} onClick={() => setRecommend(opt)}
                        className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${recommend === opt ? "gradient-navy text-white" : "bg-muted text-foreground"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                {error && <p className="text-xs text-destructive text-center">{error}</p>}
                <button onClick={handleSubmit} className="w-full py-4 rounded-xl gradient-navy text-white font-semibold text-base">
                  Submit Vote
                </button>
                <p className="text-center text-xs text-muted-foreground">Anonymous · Helps improve museum experience</p>
              </div>
            )}

            {/* DONATE — Payment */}
            {activeTab === "donate" && (
              <PaymentScreen name={relatedArtwork?.title || name} />
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
export default VisitorPoll;

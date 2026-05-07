export const ARTWORKS = [
  { id: "1", title: "Water Lilies, Series III", artist: "Claude Monet", year: 1917, medium: "Oil on canvas", dimensions: "200 × 180 cm", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600", estimatedValue: 42500000, currentValue: 48200000, appreciation: 13.4, museumOwnership: 62, investorOwnership: 38, dividendYield: 4.2, museum: "Metropolitan Museum of Art", category: "Impressionism", status: "active", tokenSymbol: "MONET-WL3", totalTokens: 10000, pricePerToken: 4820, provenance: "Private Collection (1917-1952) → Galerie Durand-Ruel → MMA Acquisition (1952)", condition: "Excellent", lastAppraisal: "2024-01-15" },
  { id: "2", title: "Starry Night Over the Rhône", artist: "Vincent van Gogh", year: 1888, medium: "Oil on canvas", dimensions: "72.5 × 92 cm", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", estimatedValue: 128000000, currentValue: 145000000, appreciation: 18.2, museumOwnership: 55, investorOwnership: 45, dividendYield: 3.8, museum: "Musée d'Orsay", category: "Post-Impressionism", status: "active", tokenSymbol: "VG-SNOR", totalTokens: 25000, pricePerToken: 5800, provenance: "Artist Estate → Theo van Gogh → Musée d'Orsay (1975)", condition: "Very Good", lastAppraisal: "2024-03-01" },
  { id: "3", title: "The Kiss", artist: "Gustav Klimt", year: 1908, medium: "Oil and gold leaf on canvas", dimensions: "180 × 180 cm", image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600", estimatedValue: 96000000, currentValue: 108000000, appreciation: 12.5, museumOwnership: 70, investorOwnership: 30, dividendYield: 5.1, museum: "Österreichische Galerie Belvedere", category: "Art Nouveau", status: "active", tokenSymbol: "KLIMT-TK", totalTokens: 15000, pricePerToken: 7200, provenance: "Austrian State Gallery (1908-present)", condition: "Excellent", lastAppraisal: "2024-02-10" },
  { id: "4", title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", year: 1665, medium: "Oil on canvas", dimensions: "44.5 × 39 cm", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600", estimatedValue: 200000000, currentValue: 220000000, appreciation: 10.0, museumOwnership: 80, investorOwnership: 20, dividendYield: 2.8, museum: "Mauritshuis", category: "Dutch Golden Age", status: "active", tokenSymbol: "VERM-GPE", totalTokens: 50000, pricePerToken: 4400, provenance: "Des Tombe Collection → Mauritshuis (1902)", condition: "Good", lastAppraisal: "2024-01-30" },
  { id: "5", title: "The Great Wave off Kanagawa", artist: "Katsushika Hokusai", year: 1831, medium: "Woodblock print", dimensions: "25.7 × 37.9 cm", image: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=600", estimatedValue: 3200000, currentValue: 3800000, appreciation: 18.8, museumOwnership: 50, investorOwnership: 50, dividendYield: 6.2, museum: "Tokyo National Museum", category: "Ukiyo-e", status: "pending", tokenSymbol: "HOK-GW", totalTokens: 5000, pricePerToken: 760, provenance: "Private Collection → Tokyo National Museum", condition: "Very Good", lastAppraisal: "2023-11-20" },
  { id: "6", title: "Composition VIII", artist: "Wassily Kandinsky", year: 1923, medium: "Oil on canvas", dimensions: "140 × 201 cm", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", estimatedValue: 72000000, currentValue: 79000000, appreciation: 9.7, museumOwnership: 65, investorOwnership: 35, dividendYield: 4.5, museum: "Solomon R. Guggenheim Museum", category: "Abstract", status: "active", tokenSymbol: "KAND-C8", totalTokens: 12000, pricePerToken: 6583, provenance: "Galerie Ernst Arnold → Guggenheim (1938)", condition: "Excellent", lastAppraisal: "2024-04-01" },
];

export const MUSEUMS = [
  { id: "m1", name: "Metropolitan Museum of Art", location: "New York, NY", totalArtworks: 24, totalValue: 890000000, activeTokens: 18, status: "verified" },
  { id: "m2", name: "Musée d'Orsay", location: "Paris, France", totalArtworks: 12, totalValue: 1200000000, activeTokens: 8, status: "verified" },
  { id: "m3", name: "Österreichische Galerie Belvedere", location: "Vienna, Austria", totalArtworks: 8, totalValue: 420000000, activeTokens: 6, status: "verified" },
  { id: "m4", name: "Mauritshuis", location: "The Hague, Netherlands", totalArtworks: 6, totalValue: 680000000, activeTokens: 4, status: "pending" },
  { id: "m5", name: "Tokyo National Museum", location: "Tokyo, Japan", totalArtworks: 15, totalValue: 320000000, activeTokens: 10, status: "verified" },
];

export const REVENUE_DATA = [
  { month: "Jan", museumRevenue: 2400000, stakeholderReturns: 1800000, visitors: 142000 },
  { month: "Feb", museumRevenue: 2800000, stakeholderReturns: 2100000, visitors: 158000 },
  { month: "Mar", museumRevenue: 3200000, stakeholderReturns: 2400000, visitors: 175000 },
  { month: "Apr", museumRevenue: 3600000, stakeholderReturns: 2800000, visitors: 192000 },
  { month: "May", museumRevenue: 4100000, stakeholderReturns: 3100000, visitors: 210000 },
  { month: "Jun", museumRevenue: 4800000, stakeholderReturns: 3600000, visitors: 245000 },
  { month: "Jul", museumRevenue: 5200000, stakeholderReturns: 3900000, visitors: 268000 },
  { month: "Aug", museumRevenue: 5600000, stakeholderReturns: 4200000, visitors: 285000 },
  { month: "Sep", museumRevenue: 4900000, stakeholderReturns: 3700000, visitors: 252000 },
  { month: "Oct", museumRevenue: 5100000, stakeholderReturns: 3800000, visitors: 260000 },
  { month: "Nov", museumRevenue: 4700000, stakeholderReturns: 3500000, visitors: 238000 },
  { month: "Dec", museumRevenue: 5400000, stakeholderReturns: 4000000, visitors: 275000 },
];

export const TRANSACTIONS = [
  { id: "tx1", hash: "0x7a3f...8b2c", type: "Token Purchase", amount: "$48,200", tokens: 10, artwork: "Water Lilies", timestamp: "2024-04-10 14:32", status: "confirmed", block: 19234567, gas: "$2.40" },
  { id: "tx2", hash: "0x9c1d...4e7f", type: "Dividend Distribution", amount: "$125,000", tokens: 0, artwork: "The Kiss", timestamp: "2024-04-10 12:15", status: "confirmed", block: 19234520, gas: "$1.80" },
  { id: "tx3", hash: "0x2b5e...1a9c", type: "Governance Vote", amount: "—", tokens: 0, artwork: "Starry Night Over the Rhône", timestamp: "2024-04-10 10:45", status: "pending", block: 19234490, gas: "$0.90" },
  { id: "tx4", hash: "0x6d8a...3f2b", type: "Token Sale", amount: "$29,000", tokens: 5, artwork: "Composition VIII", timestamp: "2024-04-09 16:20", status: "confirmed", block: 19234100, gas: "$2.10" },
  { id: "tx5", hash: "0x1e4c...7d9a", type: "New Listing", amount: "$3,800,000", tokens: 5000, artwork: "The Great Wave", timestamp: "2024-04-09 09:00", status: "confirmed", block: 19233900, gas: "$12.50" },
];

export const STAKEHOLDERS = [
  { id: "s1", name: "Alexander Petrov", email: "a.petrov@fund.com", tier: "Gold", totalInvested: 2400000, holdings: 4, joinDate: "2023-06-15", kycStatus: "verified" },
  { id: "s2", name: "Sarah Chen", email: "s.chen@capital.com", tier: "Collector", totalInvested: 890000, holdings: 3, joinDate: "2023-08-22", kycStatus: "verified" },
  { id: "s3", name: "Marcus Johnson", email: "m.johnson@art.fund", tier: "Patron", totalInvested: 5200000, holdings: 6, joinDate: "2023-03-10", kycStatus: "verified" },
  { id: "s4", name: "Elena Rossi", email: "e.rossi@invest.eu", tier: "Silver", totalInvested: 340000, holdings: 2, joinDate: "2024-01-05", kycStatus: "pending" },
  { id: "s5", name: "James Wright", email: "j.wright@wealth.com", tier: "Gold", totalInvested: 1800000, holdings: 5, joinDate: "2023-09-18", kycStatus: "verified" },
];

export const COMPLIANCE_ITEMS = [
  { id: "c1", regulation: "SEC Regulation D", status: "compliant", score: 100, jurisdiction: "United States", lastAudit: "2024-03-15" },
  { id: "c2", regulation: "GDPR Data Protection", status: "compliant", score: 98, jurisdiction: "European Union", lastAudit: "2024-02-28" },
  { id: "c3", regulation: "AAM Code of Ethics", status: "compliant", score: 100, jurisdiction: "Global", lastAudit: "2024-01-20" },
  { id: "c4", regulation: "AAMD Guidelines", status: "compliant", score: 95, jurisdiction: "United States", lastAudit: "2024-03-01" },
  { id: "c5", regulation: "MiCA (EU Crypto)", status: "review", score: 88, jurisdiction: "European Union", lastAudit: "2024-04-01" },
  { id: "c6", regulation: "Swiss FINMA", status: "compliant", score: 96, jurisdiction: "Switzerland", lastAudit: "2024-03-20" },
];

export const GOVERNANCE_PROPOSALS = [
  { id: "g1", title: "Community Gallery Exhibition — Q2 2024", description: "Allocate $120,000 for a community art exhibition featuring tokenized artworks.", status: "active", votesFor: 8420, votesAgainst: 1230, totalVoters: 12500, deadline: "2024-05-01", proposer: "Museum Board" },
  { id: "g2", title: "Dividend Increase — Water Lilies", description: "Increase quarterly dividend from 4.2% to 4.8% for MONET-WL3 holders.", status: "active", votesFor: 6100, votesAgainst: 890, totalVoters: 10000, deadline: "2024-04-28", proposer: "Treasury Committee" },
  { id: "g3", title: "New Museum Partnership — Louvre Abu Dhabi", description: "Establish tokenization partnership with Louvre Abu Dhabi for 10 artworks.", status: "passed", votesFor: 11200, votesAgainst: 800, totalVoters: 12000, deadline: "2024-03-15", proposer: "Partnerships" },
];

export const COLLECTIONS = [
  { id: "col1", name: "Emotions Through Centuries", museum: "Metropolitan Museum of Art", description: "Five masterworks exploring the full spectrum of human emotion across five centuries.", artworks: ["1", "2", "3"], image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600", totalVotes: 1247, avgRating: 4.6 },
  { id: "col2", name: "Light and Shadow Masters", museum: "Musée d'Orsay", description: "A journey through the Impressionist obsession with capturing fleeting light.", artworks: ["2", "6"], image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", totalVotes: 893, avgRating: 4.8 },
  { id: "col3", name: "The Golden Age", museum: "Mauritshuis", description: "Dutch and Flemish masterpieces from the 17th century golden age of painting.", artworks: ["4"], image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600", totalVotes: 654, avgRating: 4.4 },
  { id: "col4", name: "East Meets West", museum: "Tokyo National Museum", description: "Where Eastern tradition and Western modernism converge in extraordinary works.", artworks: ["5", "6"], image: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=600", totalVotes: 421, avgRating: 4.7 },
];

export const EXPERIENCES = [
  { id: "exp1", title: "Private Viewing — After Hours", museum: "Metropolitan Museum of Art", collectionId: "col1", artworkId: "3", type: "Physical", description: "Exclusive after-hours private viewing of the Emotions Through Centuries collection. Just you and the masterworks.", date: "2024-06-15", time: "7:00 PM", capacity: 20, totalVotes: 342, avgRating: 4.9, image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600" },
  { id: "exp2", title: "Curator Talk — Dr. Sarah Mitchell", museum: "Metropolitan Museum of Art", collectionId: "col1", artworkId: "1", type: "Talk", description: "Join Chief Curator Dr. Sarah Mitchell for an intimate discussion on the emotional power of Impressionism.", date: "2024-06-20", time: "3:00 PM", capacity: 50, totalVotes: 289, avgRating: 4.7, image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600" },
  { id: "exp3", title: "Virtual Gallery Tour — Light Masters", museum: "Musée d'Orsay", collectionId: "col2", artworkId: "2", type: "Digital", description: "A guided virtual tour through the Light and Shadow Masters collection with live commentary.", date: "2024-06-25", time: "5:00 PM", capacity: 500, totalVotes: 567, avgRating: 4.5, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600" },
  { id: "exp4", title: "Conservation Workshop", museum: "Mauritshuis", collectionId: "col3", artworkId: "4", type: "Workshop", description: "Watch our conservation team restore a 17th century Dutch masterpiece up close.", date: "2024-07-05", time: "10:00 AM", capacity: 15, totalVotes: 198, avgRating: 4.8, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600" },
];

export const VISITOR_VOTES = [
  { id: "v1", phone: "+1 ***-***-1234", type: "collection", targetId: "col1", targetName: "Emotions Through Centuries", feeling: "Inspiring", rating: 5, relevant: "Yes", recommend: "Yes", timestamp: "2024-04-10 14:32", museum: "Metropolitan Museum of Art" },
  { id: "v2", phone: "+1 ***-***-5678", type: "experience", targetId: "exp1", targetName: "Private Viewing — After Hours", feeling: "Peaceful", rating: 5, relevant: "Yes", recommend: "Yes", timestamp: "2024-04-10 15:10", museum: "Metropolitan Museum of Art" },
  { id: "v3", phone: "+44 ***-***-9012", type: "collection", targetId: "col2", targetName: "Light and Shadow Masters", feeling: "Emotional", rating: 4, relevant: "Yes", recommend: "Yes", timestamp: "2024-04-10 16:45", museum: "Musée d'Orsay" },
  { id: "v4", phone: "+81 ***-***-3456", type: "experience", targetId: "exp3", targetName: "Virtual Gallery Tour", feeling: "Thoughtful", rating: 4, relevant: "Yes", recommend: "Yes", timestamp: "2024-04-11 09:20", museum: "Musée d'Orsay" },
  { id: "v5", phone: "+31 ***-***-7890", type: "collection", targetId: "col3", targetName: "The Golden Age", feeling: "Inspiring", rating: 5, relevant: "Yes", recommend: "Yes", timestamp: "2024-04-11 11:05", museum: "Mauritshuis" },
  { id: "v6", phone: "+1 ***-***-2345", type: "experience", targetId: "exp2", targetName: "Curator Talk", feeling: "Thoughtful", rating: 5, relevant: "Yes", recommend: "Yes", timestamp: "2024-04-11 14:30", museum: "Metropolitan Museum of Art" },
];

export const BENEFITS_TIERS = [
  { tier: "Patron", minInvestment: 5000000, perks: ["Private gallery tours", "Annual gala invitation", "Direct artist access", "Priority token allocation", "Dedicated account manager", "Board meeting observer rights"], color: "gold" },
  { tier: "Collector", minInvestment: 500000, perks: ["Quarterly curator calls", "Exhibition previews", "NFT certificates", "Priority token allocation"], color: "secondary" },
  { tier: "Gold", minInvestment: 100000, perks: ["Monthly newsletter", "Annual report access", "Voting rights", "Exhibition discounts"], color: "warning" },
  { tier: "Silver", minInvestment: 10000, perks: ["Quarterly newsletter", "Basic voting rights", "Community forum access"], color: "silver" },
];

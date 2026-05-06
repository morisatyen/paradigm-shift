# Scope of Work — Paradigm Shift Platform

---

## Museum Portal Modules

### 1. Museum Dashboard
Provide a high-level overview of the museum's tokenized collection and financial performance.

Features:
- Overview Cards:
  - Total Portfolio Value
  - Active Artworks
  - Revenue This Quarter
  - Active Stakeholders
- Revenue Performance Chart:
  - Museum Revenue vs Stakeholder Returns (monthly area chart)
- Top Performing Artworks:
  - Artwork image, title, artist
  - Appreciation % indicator

---

### 2. Collection Management
Centralized management of tokenized artworks.

Features:
- Collection Listing Screen:
  - Grid view and Table view toggle
  - Search by title or artist
  - Add Collection button
- Add Collection:
  - Artwork Information:
    - Title
    - Artist
    - Year
    - Category
    - Medium
    - Dimensions
    - Condition
    - Museum / Institution
    - Image URL
    - Provenance
  - Valuation & Ownership:
    - Estimated Value
    - Dividend Yield
    - Museum Ownership %
    - Investor Ownership % (auto-calculated)
  - Token Configuration:
    - Token Symbol
    - Total Tokens
    - Price Per Token
    - Live token value preview
- View Collection Detail:
  - Overview Tab:
    - Medium, Dimensions, Condition, Last Appraisal, Category, Museum
    - Ownership Distribution bar
  - Financials Tab:
    - Estimated Value, Current Value, Appreciation
    - Dividend Yield, Price Per Token, Total Token Value
  - Token Info Tab:
    - Token Symbol, Total Supply, Price Per Token
    - Museum Tokens, Investor Tokens, Token Status
    - On-chain verified badge
  - Provenance Tab:
    - Provenance chain timeline
    - On-chain verification badge
  - Edit action (Coming Soon)
  - Delete action with confirmation dialog

---

### 3. Reaccessioning Workflow
7-step institutional approval process for artwork tokenization.

Features:
- Step 1 — Selection:
  - Artwork Title
  - Artist
  - Reason for Reaccessioning
- Step 2 — Valuation:
  - Estimated Value
  - Appraiser
  - Appraisal Report Notes
- Step 3 — Donor Intent:
  - Original Donor
  - Donor Intent Review
  - Deed of gift restriction check
- Step 4 — Board Multi-sig:
  - 3 of 5 board member approvals required
  - Per-member approval status
- Step 5 — Token Configuration:
  - Token Symbol
  - Total Tokens
  - Price Per Token
  - Museum Retention %
- Step 6 — Compliance:
  - SEC Regulation D
  - GDPR Compliance
  - AAM Code of Ethics
  - AML/KYC Requirements
  - Compliance Notes
- Step 7 — Launch:
  - Ready to launch confirmation
  - Launch on Marketplace action
- Progress saved to localStorage

---

### 4. Governance
Digital voting panel for board and committee decisions.

Features:
- Proposals Listing:
  - Proposal title and description
  - Proposer name
  - Status badge (Active / Passed)
  - Vote progress bar
  - Votes For, Votes Against, Total Voters
  - Deadline
- Voting Actions (Active proposals):
  - Approve
  - Reject

---

### 5. Blockchain
Real-time transaction feed and network metrics.

Features:
- Overview Cards:
  - Total Transactions
  - Average Gas Cost
  - Latest Block Number
- Bridge Visualization:
  - Ethereum L1 → Polygon L2 → IPFS
- Transaction Feed Table:
  - Hash, Type, Amount, Artwork, Timestamp, Gas, Status

---

### 6. Compliance
Regulatory compliance overview and jurisdiction management.

Features:
- Overall Compliance Score (gauge chart)
- Status Summary:
  - Compliant count
  - Under Review count
- Jurisdiction Simulator:
  - Select jurisdiction (US, EU, Switzerland, UK, Singapore)
- Compliance Table:
  - Regulation, Jurisdiction, Score, Last Audit, Status

---

### 7. Analytics
Cultural impact and financial performance metrics.

Features:
- Overview Cards:
  - Cultural Impact Score
  - Monthly Visitors
  - Global Reach
  - YoY Growth
- Visitor Trends Chart (line chart)
- Cultural Impact Metrics (progress bars):
  - Educational Programs
  - Community Reach
  - Digital Engagement
  - Cultural Preservation
- Artwork Performance Table:
  - Artwork, Value, Appreciation, Yield, Tokens Sold

---

### 8. Stakeholders
Fractional ownership investor management.

Features:
- Stakeholders Listing with search
- Per Stakeholder:
  - Name, Email
  - Tier (Patron / Collector / Gold / Silver)
  - Total Invested
  - Holdings count
  - Join Date
  - KYC Status
  - Contact via email action

---

### 9. Community — Cultural Infusion
Community engagement and cultural impact tracking.

Features:
- Score Cards:
  - Mission Alignment Score (/100)
  - Community Engagement Score (/100)
- Metric Cards:
  - Community Members
  - Cultural Programs
  - Mission Goals Met
  - Active Initiatives
- Recent Community Initiatives List:
  - Title, Participants, Status (Active / Completed / Planning), Impact level

---

### 10. Settings
API integrations, user roles, and security management.

Features:
- API Integrations:
  - TMS, Artnet, Christie's, Sotheby's
  - Connected / Disconnected status
  - Last sync date
  - Configure / Connect actions
- User Roles:
  - Admin — Full Access
  - Curator — Collection, Analytics
  - Board Member — Governance, View-Only
  - Finance — Revenue, Compliance
- Security Logs Table:
  - Action, User, Timestamp, IP Address

---
---

## Investor Portal Modules

### 1. Portfolio
Investment overview and holdings tracking.

Features:
- Overview Cards:
  - Portfolio Value
  - Total Gain
  - Holdings Count
  - Next Dividend Date
- Portfolio Performance Chart (area chart, 6-month trend)
- Holdings Table:
  - Artwork image, Title, Token Symbol
  - Tokens Owned
  - Average Cost Price
  - Current Price
  - Gain / Loss %
  - Next Dividend Date

---

### 2. Discover
Browse museum-grade artworks available for investment.

Features:
- Search by title or artist
- Sort by:
  - Asset Value
  - Dividend Yield
- Artwork Cards:
  - Image, Museum name, Title, Artist, Year
  - Dividend Yield badge
  - Current Value, Price Per Token, Available %
  - Click to open Asset Detail

---

### 3. Asset Detail
Full artwork detail page for investment decision.

Features:
- Hero Section:
  - Artwork image
  - Museum, Title, Artist, Year
  - Current Value, Price Per Token, Dividend Yield, Appreciation
  - Invest button
- Overview Tab:
  - Medium, Dimensions, Category, Condition, Total Tokens, Last Appraisal
  - Ownership Distribution bar (Museum % vs Investor %)
- Financials Tab:
  - Estimated Value, Current Value, Appreciation
  - Dividend distribution description
- Provenance Tab:
  - Provenance chain text
  - On-chain verified badge
- Benefits Tab:
  - Priority access to private viewings
  - Annual exhibition invitations
  - NFT certificate of ownership
  - Governance voting rights
  - Quarterly dividend payments

---

### 4. Secondary Market
SEC-compliant peer-to-peer token trading.

Features:
- SEC Compliance Banner
- Buy Tokens Tab:
  - Active listings with artwork image, token symbol, seller address
  - Ask price vs floor price comparison
  - Lock-up status badge
  - Buy order form:
    - Quantity selector
    - Price per token
    - Platform fee (1%)
    - Total cost
    - 12-month lock-up notice
- Sell Tokens Tab:
  - Holdings selector with lock/transferable status
  - Transfer restriction enforcement (locked tokens disabled)
  - Ask price input with +15% cap enforcement
  - Net proceeds calculation after 1.5% fee
  - Museum-First Trading Rules panel:
    - Price Stability Cap (+15% max)
    - Right of First Refusal (>1% supply)
    - 12-Month Lock-Up
    - Accredited Investors Only
- Trade History Tab:
  - Type, Artwork, Tokens, Price, Total, Date, Status

---

### 5. Impact Metrics
Cultural and community impact alongside financial performance.

Features:
- Overview Cards:
  - Annual Visitors
  - Cultural Programs
  - Students Reached
  - Cultural Score
- Cultural Impact Score Radar Chart:
  - Community Reach
  - Cultural Preservation
  - Education Impact
  - Public Access
  - Artist Support
  - Heritage Value
- Visitor & Program Growth Bar Chart (monthly)
- Impact Per Artwork Table:
  - Artwork image, Title, Museum
  - Annual Views, Financial Return %, Impact Score

---

### 6. Donor–Investor Tools
Hybrid philanthropic and investment contribution management.

Features:
- Contribution Mode Selection:
  - Investment only
  - Donation only
  - Hybrid (Split)
- Configuration Form:
  - Artwork selector
  - Total Amount
  - Investment / Donation split slider (Hybrid mode)
  - Tax bracket selector
- Contribution Summary:
  - Investment portion
  - Donation portion
  - Estimated tax saving
  - Net cost after tax
  - Investment benefits (tokens, yield, voting rights)
  - Donation benefits (IRS 501(c)(3), donor recognition, impact certificate)
- Contribution History Table:
  - Artwork, Type, Invested, Donated, Tax Saving, Date

---

### 7. Governance
Investor voting on museum-proposed community projects.

Features:
- Proposals Listing:
  - Title, Description, Proposer
  - Status badge (Active / Passed)
  - Vote progress bar
  - Approval % and vote count
  - Deadline
- Voting Actions (Active proposals):
  - Vote Yes
  - Vote No

---

### 8. Benefits
Tiered access levels based on investment amount.

Features:
- Tier Cards:
  - Patron (min $5M)
  - Collector (min $500K)
  - Gold (min $100K)
  - Silver (min $10K)
- Per Tier:
  - Tier icon and name
  - Minimum investment
  - List of perks

---

### 9. KYC / AML Onboarding
5-step investor verification process.

Features:
- Step 1 — Identity:
  - First Name, Last Name, Email, Phone, Country
- Step 2 — Documents:
  - Government ID upload
  - Proof of Address upload
- Step 3 — Accreditation:
  - Annual Income selection
  - Net Worth selection
  - Accreditation documentation upload
- Step 4 — Risk Profile:
  - Investment horizon
  - Risk tolerance
  - Portfolio allocation %
- Step 5 — Biometric:
  - Selfie verification against uploaded ID

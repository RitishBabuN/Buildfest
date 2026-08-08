# AI Meeting-to-Action Compliance Tracker

> **Hakelize Techworks • Build Fest '26**  
> *Decisions made in meetings rarely get tracked, leading to missed compliance deadlines and forgotten commitments. Our multi-agent system automatically extracts, queues, and audits compliance actions with real-time state tracking, fluid UI morphing, and persistent backend database storage.*

---

## 🌟 Key Application Features

1. **AI Multi-Agent Pipeline Simulation**
   - **Transcription Agent**: Parses raw transcript dialogue and attributes speakers.
   - **Action Extractor Agent**: Identifies compliance action items, assignees, and deadlines.
   - **Compliance Evaluator Agent**: Maps requirements to SOC2, HIPAA, and ISO 27001 standards.
   - **Summary Agent**: Generates executive compliance briefs.

2. **Fluid State Morphing (Framer Motion & Tailwind CSS v4)**
   - **Compact View (Meeting Dialogue & AI Summary)**: Minimalist card view displaying live dialogue transcript stream and extracted items.
   - **Expanded View (Action Compliance Tracker)**: Buttery-smooth spring morphing animation (`layoutId`) expanding cards into full table rows with assignee avatars, status badges, and date pickers.

3. **Full State Management & Real-time Audit Trail**
   - **Zustand Action Store**: Manages global application state (`transcript`, `isProcessing`, `actions`, `approvalQueue`, `rejected`, `auditLog`, `summary`).
   - **Automatic Audit Entry Logging**: State changes touching an action automatically record immutable timestamped entries.

4. **Backend Database Integration (PostgreSQL & Prisma ORM)**
   - Relational database models (`Meeting`, `ActionItem`, `AuditLog`).
   - Next.js App Router REST API endpoints (`/api/actions`, `/api/actions/[id]`, `/api/audit-logs`).
   - Persistent database sync on status updates and deadline changes.

5. **Analytics & Risk Panels**
   - Circular progress ring for **Meeting Health Score** (`react-circular-progressbar`).
   - **Compliance Heatmap by Owner** with progress bars.
   - **"What's at Risk" Panel** highlighting high-risk and overdue action items.
   - **JSON Export** & filter controls.

---

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router) & React 18
- **Language**: TypeScript & JavaScript (ESM)
- **Styling**: Tailwind CSS v4 + Glassmorphism Custom Utilities
- **Animations**: Framer Motion 11 (`layoutId`, `AnimatePresence`)
- **State Management**: Zustand
- **Database / ORM**: PostgreSQL / SQLite & Prisma ORM v5
- **Icons & Analytics**: Lucide React, React Circular Progressbar, Canvas Confetti

---

## 📁 Project Directory Architecture

```text
ai-meeting-nextjs-tracker/
├── prisma/
│   ├── dev.db                      # Local SQLite / PostgreSQL database
│   └── schema.prisma               # Prisma Schema (Meeting, ActionItem, AuditLog)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── actions/            # GET & POST compliance actions
│   │   │   │   └── [id]/           # PATCH & DELETE compliance actions
│   │   │   └── audit-logs/         # GET chronological audit timeline
│   │   ├── globals.css             # Tailwind v4 directives & glassmorphism
│   │   ├── layout.tsx              # Root HTML/CSS layout
│   │   └── page.tsx                # Main page entry
│   ├── components/
│   │   ├── MorphingTracker.tsx     # Framer Motion fluid morphing component
│   │   ├── ComplianceDashboard.jsx # Analytics dashboard, health score & heatmap
│   │   ├── AuditTimeline.jsx       # Vertical animated audit log timeline
│   │   └── AuditTimelineHelpers.js # Helper functions & relative time formatting
│   ├── lib/
│   │   └── db.ts                   # Singleton Prisma Client instance
│   └── store/
│       ├── useActionStore.js       # Zustand state management store
│       └── useActionStore.test.js  # Automated unit tests
├── package.json
└── README.md
```

---

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Clone the Repository
```bash
git clone https://github.com/RitishBabuN/Buildfest.git
cd Buildfest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database (Prisma ORM)
```bash
npx prisma db push
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Building

### Run Unit Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

---

## 📜 License
Distributed under the MIT License. Developed for **Hakelize Techworks • Build Fest '26**.

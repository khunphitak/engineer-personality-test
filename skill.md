# skill.md — Engineer Personality Test Web App

## Stack
React 18 + TypeScript + Vite + Tailwind CSS + React Router v6

## Project Structure

```
src/
├── data/
│   ├── questions.ts     # 20 Likert questions with dimension & reversed-score metadata
│   └── types.ts         # Full data for 4 engineer archetypes (traits, quotes, careers, etc.)
├── utils/
│   └── scoring.ts       # Score calculation: dimension averages → binary pattern → nearest-match type
├── components/
│   ├── Nav.tsx          # Sticky top nav with logo + CTA button
│   ├── Footer.tsx       # 4-column footer
│   └── TypeAvatar.tsx   # Inline SVG illustrations for each type
└── pages/
    ├── Home.tsx         # Landing page: hero, how-it-works, type preview cards
    ├── Test.tsx         # 20-question Likert test with animated transitions + localStorage persistence
    ├── Results.tsx      # Full results page: hero banner, score bars (intersection observer animation),
    │                    #   strengths/weaknesses, careers, famous engineers, comments
    ├── AllTypes.tsx     # 2×2 grid of type cards + comparison table
    └── TypeDetail.tsx   # Full article page for a single type (same layout as Results, no score bars)
```

## Routes
| Path            | Page        |
|-----------------|-------------|
| `/`             | Home        |
| `/test`         | Test        |
| `/results`      | Results     |
| `/types`        | AllTypes    |
| `/types/:typeId`| TypeDetail  |

## Scoring Algorithm (`src/utils/scoring.ts`)
1. 20 questions → 5 dimensions (4 questions each), some `reversed: true` → score = `8 - raw`
2. Average each dimension (1–7 scale)
3. Convert to binary pattern: avg > 4 → 1 (dominant pole), else 0
4. Compare to 4 type profiles using Hamming distance, pick minimum
5. Variant (assertive/turbulent) = variance of all answers

**Type profiles** `[depth, systems, process, quality, people]`:
- Architect: `[1, 1, 1, 1, 0]`
- Builder:   `[1, 0, 1, 1, 0]`
- Catalyst:  `[0, 1, 0, 0, 0]`
- Connector: `[0, 0, 0, 0, 1]`

## Key UX Details
- **Test page**: localStorage auto-saves partial progress (`engineertype_answers`); cleared on completion
- **Transitions**: CSS classes `fade-in` / `slide-out` (defined in `index.css`) animate question changes
- **Score bars**: `IntersectionObserver` triggers CSS `width` transition when bars scroll into view
- **Results**: passed via React Router `navigate('/results', { state: result })` — no URL params / backend needed

## Design Tokens
| Token       | Value     |
|-------------|-----------|
| Architect   | `#6B46C1` |
| Builder     | `#0D9488` |
| Catalyst    | `#EA580C` |
| Connector   | `#2563EB` |
| Body text   | `#374151` |
| Headings    | `#111827` |
| Background  | `#F9FAFB` |

## Commands
```bash
npm install        # Install dependencies
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

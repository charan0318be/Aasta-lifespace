## 1. Fix the "small gap / requires extra scroll" issue on section navigation

**Cause:** `scrollIntoView` aligns the section's top with the viewport top (offset 0). On mobile, the fixed top bar (~64px) covers the first part of the section. On desktop, the IntersectionObserver `rootMargin: "-40% 0px -55% 0px"` requires the section to cross 40% of viewport before becoming "active", so the click + smooth-scroll lands a bit short of where the eye expects, and the active-state highlight lags too.

**Fix:**
- Add `scroll-margin-top` to all section anchors so they account for the fixed mobile header (and any desktop spacing). Add a global rule in `src/index.css`:
  ```
  section[id] { scroll-margin-top: 80px; }
  @media (min-width: 1024px) { section[id] { scroll-margin-top: 0; } }
  ```
  And also set `html { scroll-padding-top: 80px; }` for native anchor jumps.
- In `SideRail.tsx`, replace `scrollIntoView` with a manual scroll that subtracts the header offset (80px on mobile, 0 on desktop). This guarantees pixel-perfect landing regardless of section padding.
- Loosen the IntersectionObserver `rootMargin` to `"-20% 0px -70% 0px"` so the active nav state updates as soon as the section's top reaches ~20% from viewport top — feels in sync with the click.

## 2. Pricing: interactive cost estimator with floors + lead capture

Replace the static "Begin a conversation" CTA inside each pricing tier card with a **"Calculate estimate"** button. Add a full estimator experience:

### 2a. Estimator (inline below the 3 tier cards, or opens in a dialog)
A new component `CostEstimator.tsx` with:
- **Plan selector** (chips): Essential ₹1,850/sqft · Signature ₹2,650/sqft · Atelier (custom rate input, default ₹3,500). Pre-selects whichever tier card the user clicked.
- **Number of floors** input (1–10, stepper).
- Dynamic list of floor rows — one per floor — each with a label ("Ground floor", "1st floor"...) and a sqft input.
- Live computed totals at the bottom:
  - Total built-up area (sum of floor sqft)
  - Rate per sqft (from selected plan)
  - **Estimated total cost** in ₹, formatted in Indian lakhs/crores (e.g. "₹4.85 Cr · ₹4,85,25,000")
- "Get detailed estimate" primary button → opens lead-capture dialog.

### 2b. Lead capture dialog (shadcn `Dialog`)
- Fields: Name, Email, Phone, City (all required, validated with `zod`).
- On submit: validate, then transition the dialog body to a **"Your estimate" summary view** showing:
  - Selected plan + rate
  - Floor-by-floor breakdown table
  - Total area + grand total cost (highlighted)
  - Disclaimer: "Indicative estimate. Final pricing depends on site conditions, material selections, and finishes."
  - "Our team will be in touch shortly" + a "Close" / "Start over" action.
- Toast confirmation: "Estimate sent. We'll be in touch shortly."
- Submission is client-side only for now (no backend); contact info + estimate logged to console-free state. If you want it persisted/emailed, we can wire Lovable Cloud in a follow-up.

### 2c. Visual style
- Estimator uses the same ivory/copper/ink editorial language: Fraunces display numerals for the total, hairline dividers between floor rows, copper accent on the active plan chip, ink-on-ivory inputs with bottom-border styling consistent with the Contact form.
- Indian number formatting via `Intl.NumberFormat('en-IN')` plus a helper for Cr/Lakh display.

## Technical details

- New files:
  - `src/components/CostEstimator.tsx` — estimator UI + state (plan, floors[], rate).
  - `src/components/EstimateDialog.tsx` — shadcn Dialog with two views (form → summary), zod validation.
  - `src/lib/format-inr.ts` — `formatINR(n)` and `formatCrLakh(n)` helpers.
- Modified files:
  - `src/index.css` — add `scroll-margin-top` / `scroll-padding-top` rules.
  - `src/components/SideRail.tsx` — offset-aware scroll, looser observer margin.
  - `src/pages/Index.tsx` — Pricing section: each tier's CTA becomes "Calculate estimate" that pre-selects that plan and scrolls to the estimator block rendered below the tier grid.
- Deps: uses existing shadcn `dialog`, `input`, `label`, `button`, plus `zod` (already a dep via shadcn form). No new packages.
- All inputs validated client-side: floor sqft must be positive integer ≤ 100,000; total floors 1–10; phone 7–15 digits; email via `z.string().email()`; name 2–80 chars.

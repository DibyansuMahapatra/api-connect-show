# c-URL Frontend Plan

A single-page, account-free URL shortener UI that talks to your Spring backend (`/compactURL/*`). Minimalist layout with restrained glassmorphism, light/dark toggle, and clean handling of the "shortcode already exists" case.

## 1. Visual direction

- **Layout**: centered single column, generous whitespace. Hero with product name + one-line tagline, shorten form directly below, recent links table further down.
- **Glassmorphism (low–moderate)**: soft frosted cards (`backdrop-blur-md`, semi-transparent surface, 1px subtle border, soft shadow). Applied to: shorten card, result card, history table container. Background uses two soft radial gradient blobs (different hues per theme) behind a subtle noise/grid — this is what makes the glass actually read as glass.
- **Theme**: light + dark via `next-themes` + a header toggle (sun/moon icon). All colors as HSL tokens in `index.css` so both themes share the same component code.
- **Type & spacing**: Inter, tight tracking on headings, comfortable line-height on body. Rounded-2xl on cards, rounded-xl on inputs/buttons.
- **Motion**: minimal — fade/slide-in for the result card, subtle hover lift on table rows. No heavy animation.

## 2. Features & UX

### Shorten form (POST `/compactURL/generate`)
- Single input for the long URL + "Shorten" button. Client-side URL validation (zod).
- On success → result card slides in with:
  - The short URL (large, monospace)
  - **Copy** button (with copied confirmation)
  - **Open** button
  - Meta row: created at, expires at, click count
- **Duplicate handling**: the backend already returns the existing record when the shortcode exists. The UI detects this (either via the `message` field or by comparing `createdAt` to "just now") and shows a subtle info badge on the result card: *"This URL was already shortened — showing the existing link."* No error styling, just informational.
- Errors (network, invalid URL, backend 4xx/5xx) → inline toast + inline message under the input.

### History (GET `/compactURL/fetchAll?page=&size=`)
- Glass-card table: Short URL · Original URL (truncated, hover to reveal full) · Clicks · Created · Expires.
- Each row has copy + open actions.
- Pagination controls (Prev / page n of m / Next) driven by `totalElements`, `page`, `size`. Default size 10.
- Empty, loading (skeleton rows), and error states.
- Auto-refresh after a successful shorten so the new entry appears at the top.

### Redirect
- Short links resolve on the backend (`GET /compactURL/{shortCode}` returns redirect). The UI just opens that URL in a new tab — no client-side routing needed for it.

## 3. Backend integration (clean & safe)

All API code isolated under `src/lib/api/` so future endpoint changes only touch this folder.

```text
src/lib/api/
  types.ts          // UrlShortenerModel, GenericResponseModel<T>, GenericResponseModelList<T>
  client.ts         // fetch wrapper: base URL, JSON, timeout, error normalization
  urlShortener.ts   // createShortUrl, fetchAllShortUrls, buildRedirectUrl
```

- Base URL from `VITE_API_BASE_URL` (`.env.example` provided, default `http://localhost:8080`).
- React Query for fetching/caching/invalidation (history list invalidated after a successful create).
- Zod schemas mirroring the Java DTOs to validate responses at the boundary — protects the UI if the backend shape drifts.
- All user input validated client-side with zod before being sent.
- No secrets in the client; no `dangerouslySetInnerHTML`; URLs rendered as text or via `<a href>` with `rel="noopener noreferrer"` and `target="_blank"`.

**CORS note**: your Spring backend needs `@CrossOrigin` (or a `CorsConfig`) allowing the Lovable preview origin and `http://localhost:5173` for local dev. I'll add a short README section flagging this.

## 4. Files to be added

```text
src/
  components/
    Header.tsx              // logo + theme toggle
    ShortenForm.tsx
    ShortenResultCard.tsx   // includes duplicate-detected badge
    HistoryTable.tsx
    Pagination.tsx
    ThemeToggle.tsx
    GlassCard.tsx           // shared glass surface
    BackgroundGradient.tsx  // ambient blobs behind everything
  lib/api/
    client.ts
    types.ts
    urlShortener.ts
  pages/Index.tsx           // composes Header + Form + Result + History
  providers/ThemeProvider.tsx
index.css                   // HSL tokens for light/dark, glass utility classes
.env.example
```

Plus minor edits to `tailwind.config.ts` (extend with glass tokens) and `main.tsx` (wrap with ThemeProvider + QueryClientProvider).

## 5. Out of scope (for now)

- Auth / user accounts
- Custom shortcodes input (your current endpoint takes only the long URL)
- Analytics charts on `clickCount` (easy to add later)
- Edge-function proxy (calling Spring directly; can add later if CORS becomes painful)

## 6. Future-proofing

When you add/modify endpoints in `UrlShortenerController.java`, only `src/lib/api/urlShortener.ts` (and its types) need updating. Components consume typed functions, so the compiler will point out anything that needs to change in the UI.

---

Approve to build, or tell me what to adjust (visual tweaks, scope changes, different duplicate-detection copy, etc.).
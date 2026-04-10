# Personal academic site (GitHub Pages)

Static portfolio: left sidebar (photo, name, contact, bio, theme toggle) and right column (**Publications**). All placeholder copy and `#` links live in one content file.

## Quick start

- **Local preview:** open `index.html` in a browser, or run a static server from the repo root (for example `python3 -m http.server 8000`) and visit `http://localhost:8000`.
- **Publish:** push to GitHub; with Pages set to deploy from the default branch and root (or `/docs` if you move files), the site updates after the build finishes.

This repo includes a `.nojekyll` file so GitHub Pages serves the site as plain HTML/CSS/JS (no Jekyll build).

## Where to edit text and links

### Main file: `js/content.js`

| What you want to change | Property / location |
|-------------------------|---------------------|
| Profile photo | `profileImage` — path or URL to an image (JPEG/PNG/WebP/SVG). Replace `assets/Profile_Picture.jpg` with your file, or point to an external URL. |
| Name under the photo | `name` |
| Email line (obfuscated text) | `email.display` — e.g. `you [AT] school [DOT] edu` |
| Clickable email | `email.mailto` — use `mailto:you@school.edu`. Set to `""` (empty string) to show text only, with no link. |
| LinkedIn / GitHub / Twitter (or others) | `socialLinks` — array of `{ label, href }`. Add or remove objects to change the row. |
| Bio paragraphs and inline links | `bioHtml` — HTML string: use `<p>...</p>` and normal `<a href="...">` tags. |
| Small text at bottom of sidebar | `footerHtml` — HTML string (credits, etc.). |
| Publication list | `publications` — array of objects (see below). |

### Publication entries

Each item in `publications` can include:

- **`title`** — string; shown bold.
- **`authors`** — array of `{ name: "...", highlight: true }`. Set `highlight: true` on **your** name so it appears in italics like the reference layout.
- **`links`** — array of `{ label: "Paper", href: "..." }`, rendered in one row separated by `|`.
- **`noteHtml`** — optional HTML for venue, awards, or extra links (or `""` to omit).

### Page title and meta description

- **`index.html`** — set `<meta name="description" ...>` in the `<head>` for search snippets. The `<title>` tag is overwritten on load by `name` from `js/content.js`; keep the `<title>` in `index.html` as a fallback before JavaScript runs.

### Styling and layout

- **`css/style.css`** — colors, spacing, breakpoints (for example the two-column vs stacked mobile layout around `800px`), fonts.

### Dark mode behavior

- **`index.html`** — inline script in `<head>` applies saved theme before paint (reads `localStorage` key `portfolio-theme`).
- **`js/theme.js`** — moon/sun button toggles theme and updates `localStorage`.

### Optional: project root URL

If the site is served from a **project** site (`username.github.io/reponame/`), relative links like `css/style.css` still work when you open paths under that base. If you ever switch to absolute paths, use your real base URL in `index.html` and `404.html`.

## Repository layout

```
index.html          # Shell + scripts; tab title / meta here
css/style.css       # Visual design
js/content.js       # ← All copy and hrefs (start here)
js/main.js          # Renders content into the page
js/theme.js         # Dark / light toggle
assets/Profile_Picture.jpg  # Placeholder avatar; replace or change path in content.js
.nojekyll           # Tells GitHub Pages not to run Jekyll
404.html            # Simple not-found page
```

Replace every `#` placeholder in `js/content.js` with real URLs when you are ready.

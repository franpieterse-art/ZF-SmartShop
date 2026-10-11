# ZF SmartShop V6

Four-retailer basket comparison PWA for SPAR, Pick n Pay, Checkers and Woolworths.

## Important
This is a working **manual-price comparison** prototype. It does not automatically retrieve live prices or verify availability. Retailer links open their public sites. No API key is required.

## Local run
Install Node.js 18+; in this directory run `npm start` then visit http://localhost:3000.

## GitHub and Render
Upload the **contents of this folder** to the root of the GitHub repository, not the parent folder or ZIP. GitHub root must contain `package.json`, `server.js`, and `public/`.

Render: New Web Service, Node runtime, root directory blank, build command `npm install`, start command `npm start`. Use `main` branch if that is the repo's default. Render supplies PORT automatically. No environment variables needed for this version.

## PWA
Serve over HTTPS (Render does this) for service worker and add-to-home-screen support. Browser install prompts vary; SVG-only icon support varies across devices. For broad Android install compatibility, add PNG 192x192 and 512x512 icons later.

## Security
No server-side API secrets; shopping list is stored locally in browser localStorage. Do not publish personal data in GitHub.

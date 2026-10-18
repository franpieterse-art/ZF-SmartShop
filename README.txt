ZF SmartShop V9 – Restored V6-style Search & Compare

Deploy to GitHub/Render:
1. Upload server.js, package.json and public/ to the root of the repository.
2. Render service type: Web Service; Build Command: npm install; Start Command: npm start.
3. Add SERPER_API_KEY in Render Environment to enable indexed online price discovery.
4. Redeploy latest commit.

IMPORTANT: Search returns possible price candidates only, NOT automatically verified retailer prices. The user must review each source and select the matching price. This avoids treating arbitrary snippets as genuine prices. Blank prices remain incomplete; basket ranking requires every item priced.

Your old V6 deployment was not changed. This package is a functional rebuild based on the V6 search-and-compare workflow, not a byte-for-byte copy of the old code. Official image logo is not bundled.

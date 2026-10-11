# ZF SmartShop V3

Mobile-friendly South African grocery comparison web app with a Node.js backend.

## Start
1. Install Node.js 18 or newer.
2. Set a Serper.dev Google Search API key (required for automatic search):
   - Windows PowerShell: `$env:SERPER_API_KEY="your-key"`
   - macOS/Linux: `export SERPER_API_KEY="your-key"`
3. In the extracted project folder, run `npm start`.
4. Open `http://localhost:3000` on your computer. To use it on an Android phone on the same Wi-Fi, open `http://YOUR_COMPUTER_LAN_IP:3000` and ensure the firewall allows access.

## Important limitations
- This integration queries Google search snippets via Serper.dev, **not official retailer live-price or inventory APIs**. Results are indicative, may be stale, and can reflect different pack sizes or promotions. They must be confirmed at the linked retailer.
- Unknown prices are left blank. No fake prices, stock statuses, or delivery costs are generated.
- Totals only qualify for a complete-basket comparison when every item has a search-result price. Delivery is excluded.
- Search API charges/quotas may apply; each search performs up to 45 requests.
- For reliable live checkout pricing and store-specific availability, official retailer APIs, permitted data feeds, or licensed aggregators are required. Review retailer terms before deploying commercially.
- This is a web app suitable for Android browsers, not an APK; HTTPS, icons and a service worker would be needed for polished installable PWA support.

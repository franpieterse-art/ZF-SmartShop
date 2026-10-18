ZF SMARTSHOP V7 — BLACK EDITION (RENDER STARTUP FIX)

Upload the CONTENTS of this ZIP to the ROOT of your GitHub repository:
  package.json
  server.js
  public/index.html
Do not place these files inside an extra ZF-SmartShop-V7 folder.

Render settings:
  Service type: Web Service (Node)
  Root Directory: leave blank (if files are in repo root)
  Build Command: npm install
  Start Command: npm start
  Environment: Node

After committing changes: Render > Manual Deploy > Deploy latest commit.
Check Render Logs for 'ZF SmartShop V7 listening on ...'.

If you see 'Not found' after this, confirm you are visiting the URL of the SAME Render service that is connected to this GitHub repository, and verify the deployment commit and Render Root Directory.

Manual sample prices only; no live price API integration. Official image logo not included.

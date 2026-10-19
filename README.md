# Compress50KB — Minimalist Zero-Server Image & PDF Compressor

A minimalist, utility-first web application built with **Next.js (App Router)** and **Tailwind CSS** for **100% pure client-side image and PDF compression**. 

Inspired by the direct, uncluttered philosophy of TinyPNG and CleanPNG: zero textbook paragraphs, zero unnecessary layout elements, and zero server uploads.

> **🔒 100% In-Browser &bull; Zero Uploads &bull; Files never leave your device**

---

## Minimalist Core Features

1. **Clean, High-Impact Header**:
   - Title: **Compress50KB**
   - 1-Line Subtext: *"Free, private image & PDF compressor for online forms."*
   - Subtle Security Pill: *"🔒 100% In-Browser &bull; Zero Uploads"*
   - Lightweight PWA "Add to Home Screen" indicator.

2. **Mobile-First Upload Zone**:
   - Compact drag-and-drop container.
   - Two instant action buttons:
     - **📷 Camera** (direct mobile camera capture with `capture="environment"`)
     - **📁 Browse File** (file picker supporting JPG, PNG, WebP, PDF & multi-file drop)
   - Clipboard paste (`Ctrl+V`) enabled.

3. **Instant 1-Tap Target Presets**:
   - Single-row pill buttons for instantaneous selection:
     * `[ Under 20 KB ]` *(Signatures)*
     * `[ Under 50 KB ]` *(Photos / Forms)*
     * `[ Under 100 KB ]` *(Certificates)*
     * `[ Custom Slider ]` *(Smooth quality & size slider)*
   - Automatic green status badge: **"✓ Under 50 KB (Ready for Upload)"**.

4. **Streamlined Result Card**:
   - Original file size vs. Compressed file size with prominent reduction badge (e.g. `48 KB (-78%)`).
   - Action triggers:
     - **Download** (Primary emerald button)
     - **📋 Copy** (Secondary outline button: copies PNG blob to clipboard for instant pasting on mobile/desktop form portals)
     - **WhatsApp Share** (One-tap referral icon button with pre-filled message)

5. **High-Retention "Recent (3)" Drawer**:
   - Stores the last 3 converted files in local browser storage (`IndexedDB`).
   - One-tap re-download chips without re-compressing or server requests.
   - Discard / Clear button to purge browser memory anytime.

6. **Clean SEO & Monetization (Non-Intrusive)**:
   - Technical SEO: Minimalist JSON-LD `WebApplication` schema targeting *"Compress photo to 50KB"*, *"Signature under 20KB"*, and *"Free PDF compressor"*.
   - CLS-Protected Ad Slots: Fixed min-height placeholders (`ad-slot-header` and `ad-slot-action` near download) preventing layout shift.

---

## Local Development & Production

```bash
# Start development server
npm run dev

# Code quality check (0 errors, 0 warnings)
npm run lint

# Production build test
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to test the streamlined interface.

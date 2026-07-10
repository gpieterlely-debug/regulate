# Regulate — Deploy & Install Guide

**Your ADHD emotion tracker. Now a real app.**

What's in this folder:

1. `index.html` — the whole app
2. `sw.js` — makes it work OFFLINE
3. `manifest.json` — makes it INSTALLABLE
4. Icon files — your home screen icon

---

## Step 1: Put it online (2 minutes, free)

Why? A phone app needs a real web address. One-time setup.

**Easiest way — Netlify Drop:**

1. Go to **app.netlify.com/drop** on your computer
2. Drag this WHOLE FOLDER onto the page
3. Done. You get a link like `something.netlify.app`

That link is yours. It never expires. Bookmark it.

*Alternative: GitHub Pages works too — push the folder to a repo, turn on Pages in Settings.*

---

## Step 2: Install it on your phone (30 seconds)

**iPhone (Safari):**

1. Open your Netlify link in **Safari** (not from an email — type or paste it)
2. Tap the **Share** button
3. Tap **"Add to Home Screen"**
4. Tap **Add**

**Android (Chrome):**

1. Open your link in **Chrome**
2. Tap the **⋮ menu**
3. Tap **"Add to Home Screen"** or **"Install app"**

Now it's an icon. Opens instantly. Works with NO internet.

---

## Step 3: Turn on the daily nudge

1. Open the app → tap the **gear** (top right)
2. Flip on **"Remind me daily"** and pick a time
3. **Do this too:** set a matching daily alarm on your phone named *"Regulate"*

Why both? Web apps can't wake a sleeping phone by themselves.
The alarm is your guarantee. The app nudge is your bonus.

---

## Your data — read this once

- Everything stays **on your phone**. No cloud. No account. Nobody sees it.
- One catch: it lives in the browser. Clearing site data = losing entries.
- The fix: **gear → "Export backup (JSON)"** once a week. Ten seconds.
- Got a new phone? Import that JSON file. All entries come back.
- CSV export opens in Excel if you ever want to chart it yourself.

---

## If something breaks

- **App won't load offline?** Open it once WITH internet first. The service worker caches it on the first visit.
- **Updated the files?** Re-drag the folder to Netlify. The app picks up the new version on the next open (may need one close-and-reopen).
- **Nudge not firing?** Check the gear screen — if notifications are blocked, the app tells you there.

**Momentum beats perfection. Log the first one today.**

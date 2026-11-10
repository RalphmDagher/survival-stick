# Survival Stick — NFC emergency guidance web app

A mobile-first website that opens when a hiker scans the NFC tag on a Survival
Stick. It gives interactive emergency guides, the phone's GPS coordinates,
survival lessons, a pre-hike checklist and information about the stick.

- **Free to host** on GitHub Pages. No server, no database, no accounts, no paid service.
- **Works offline** after the first online visit (Progressive Web App).
- **Plain HTML, CSS and JavaScript.** No build step, no framework, nothing to install.
- **Honest by design.** It never claims to have called rescuers, sent a
  satellite message or talked to the physical stick.

> **Prototype.** The guidance has not yet been reviewed by qualified
> mountain-rescue or medical experts. See [REFERENCES.md](REFERENCES.md).

---

## 1. Publish it on GitHub Pages (no programming needed)

1. Create a free account on <https://github.com> and sign in.
2. Click **+** (top right) → **New repository**.
   - Repository name: `survival-stick`
   - Choose **Public**
   - Click **Create repository**
3. On the new repository page click **uploading an existing file**.
4. Open the `survival-stick` folder on your computer (unzip
   `survival-stick.zip` first if you have the ZIP). Select **everything inside
   the folder** (not the folder itself) and drag it into the browser window.
   Wait until all files are listed, then click **Commit changes**.
   - `index.html` must be at the top level of the repository, next to `README.md`.
   - The file named `.nojekyll` may be hidden on your computer. If it is not
     uploaded, nothing breaks; it only makes publishing slightly faster.
5. Go to **Settings** → **Pages** (left menu).
   - Under **Build and deployment → Source** choose **Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)** → **Save**.
6. Wait one or two minutes, then reload the Pages settings screen. Your address appears:
   `https://YOUR-USERNAME.github.io/survival-stick/`
7. Open that address on your phone. This is the link to write on the NFC tag.

### Writing the NFC tag

Use any NFC writing app (for example "NFC Tools") and write a **URL record**
containing your address, e.g. `https://YOUR-USERNAME.github.io/survival-stick/`.
The tag only stores the address: the phone loads the site over its own internet
connection.

### Updating the site later

1. Change the files you want.
2. Open `offline-manifest.js` and **increase the version** (for example
   `'1.0.0'` → `'1.0.1'`). If you added a new file, add it to the `files` list too.
3. Upload the changed files to GitHub (**Add file → Upload files**).

Phones that already saved the app keep their working copy. The new version
downloads in the background, and the user is offered an **Apply update** button
(Home → Offline guides, or Settings). If you forget to change the version,
phones will keep showing the old copy.

---

## 2. Things you must configure

| What | Where | Why |
|---|---|---|
| **Emergency numbers** | `js/config.js` → `DEPLOYMENT_EMERGENCY_NUMBERS` | The list is empty on purpose. Add only numbers verified with local authorities. Each user can also add their own in **Settings**. |
| **Verified vs proposed features** | `js/content/en/stick.js` → `status` and `evidence` | Every stick feature is marked "Proposed feature". Change one to `'verified'` only after it has really been tested, and describe the test in `evidence`. |
| **Expert review** | `js/content/en/guides.js`, `js/content/en/skills.js` | Have the texts reviewed, then update the wording of the prototype notice in `js/ui.js` (`prototypeNotice`). |
| **Translations** | `js/locales/fr.js`, `js/locales/ar.js`, `js/i18n.js` | French and Arabic are prepared but switched off. Instructions are inside the files. Arabic is already set to right-to-left. |

---

## 3. Test it on your computer

Opening `index.html` by double-clicking shows a blank page, because browsers
block app features on `file://` addresses. Use a small local web server instead:

```bash
python -m http.server 8000
```

Run that command in the folder that **contains** the `survival-stick` folder,
then open <http://localhost:8000/survival-stick/>. This also imitates the
GitHub Pages sub-folder address.

## 4. Test it offline

**On a phone (the real test):**

1. Open the published address with mobile data or Wi-Fi.
2. Go to **More → Pre-hike preparation**. Wait until the status says
   **Offline ready** (or tap **Save emergency guides for offline use**).
3. Switch the phone to **airplane mode**.
4. Close the browser tab, then open the address again (or scan the NFC tag).
   The app should open. Go through a guide, the skills and the checklist.
5. On the Location page tap **Get my location**. GPS can work in airplane mode
   on many phones, but it may take longer.

**On a computer (Chrome or Edge):** open the site, press `F12`, open the
**Application** tab → **Service workers**, tick **Offline**, and reload.

**iPhone note:** Safari may delete saved website data if the site is not opened
for some weeks. For the most reliable offline use, tap **Share → Add to Home
Screen** and re-check "Offline ready" before each trip.

---

## 5. File tree

```
survival-stick/
├── index.html                  The single page that loads the app
├── 404.html                    Sends wrong addresses back to the home page
├── manifest.webmanifest        PWA name, colours and icons
├── service-worker.js           Offline caching and safe updates
├── offline-manifest.js         VERSION NUMBER + list of files saved offline
├── .nojekyll                   Tells GitHub Pages to serve the files as they are
├── README.md                   This file
├── REFERENCES.md               Sources for the emergency guidance
├── css/
│   ├── base.css                Fonts, colours, text sizes
│   ├── layout.css              Top bar, page area, bottom navigation
│   └── components.css          Buttons, cards, checklists, diagrams ...
├── js/
│   ├── app.js                  Start-up
│   ├── router.js               Decides which page to show for each address
│   ├── config.js               Emergency numbers for your deployment (EDIT ME)
│   ├── i18n.js                 Languages (English, French/Arabic prepared)
│   ├── offline.js              Verifies what is saved before saying "Offline ready"
│   ├── geo.js                  GPS (browser Geolocation API)
│   ├── contacts.js             Emergency numbers saved on the phone
│   ├── store.js                Saves settings on the phone (localStorage)
│   ├── ui.js                   Small helpers to build the pages
│   ├── icons.js                Line icons and logo
│   ├── illustrations.js        Diagrams and the stick illustration
│   ├── components/
│   │   ├── location-card.js    Coordinates, accuracy, copy, share
│   │   ├── offline-status.js   Offline badge and download card
│   │   └── contacts-editor.js  Add / remove emergency numbers (validated form)
│   ├── pages/
│   │   ├── home.js             1. Home dashboard
│   │   ├── sos.js              2. Emergency SOS
│   │   ├── guides.js           3. Interactive emergency guides
│   │   ├── location.js         4. Location and navigation
│   │   ├── skills.js           5. Survival skills
│   │   ├── stick.js            6. About the Survival Stick
│   │   ├── prep.js             7. Pre-hike preparation
│   │   ├── settings.js         8. Settings and information
│   │   └── more.js             "More" menu
│   ├── content/en/             ALL THE TEXT CONTENT (edit here)
│   │   ├── guides.js           6 emergency guides, 18 branches, 91 steps
│   │   ├── skills.js           8 lessons with quick checks
│   │   ├── stick.js            7 stick features (proposed / verified)
│   │   └── checklist.js        7 pre-hike checklist items
│   └── locales/
│       ├── fr.js               French (empty template)
│       └── ar.js               Arabic (empty template, right-to-left)
└── assets/
    ├── fonts/                  Inter and Outfit (open licence, stored locally)
    └── icons/                  App icons (192, 512, maskable, Apple) and favicon
```

Page addresses (all work as direct links and after a reload):
`#/` home · `#/sos` · `#/guides` · `#/guides/avalanche` ·
`#/guides/avalanche/caught/1` · `#/location` · `#/skills` · `#/skills/compass` ·
`#/stick` · `#/prep` · `#/settings` · `#/more`

---

## 6. What was tested, and what was not

### Tested (10–11 November 2026, in the Chromium-based browser built into the development tool, served locally from a `/survival-stick/` sub-folder)

- Every internal link was followed automatically: **132 pages/steps**, none
  missing, every page has a heading, no sideways scrolling at 375 px width.
- Every button and link on those pages measures at least 48 × 48 px.
- Direct link + reload on a deep address (`#/guides/lost/stop/3`), also via
  `index.html`. Unknown addresses show a "Page not found" screen.
- No missing files: all 43 files in `offline-manifest.js` exist and load;
  every file in `css/`, `js/` and `assets/` is listed in it.
- **Offline:** after the first visit the status reached "Offline ready"
  (43 of 43 files verified). The web server was then **switched off**, the page
  reloaded on a deep link, and all 132 pages opened from the saved copy with
  both fonts. "Check for updated guides" correctly reported that the server
  could not be reached.
- **Update:** with a new version number, the old version kept running, the new
  one downloaded in the background, "Apply update" switched to it and the old
  cache was removed.
- Emergency-number form: empty fields, letters in the number, valid number,
  saving, the call button turning into a `tel:` link.
- Checklist ticks saved and restored; the "offline" item ticks itself only
  when the offline copy is verified.
- Quiz feedback (right and wrong answers), text-size setting, stick hotspots,
  language selector (French/Arabic shown as not yet translated).
- Location: permission refused → clear error message. Successful position
  tested with a **simulated** GPS position: coordinates, accuracy, degrees/
  minutes/seconds, altitude, copy to clipboard, map buttons.
- Mobile (375 × 812) and desktop (1280 × 800) layouts checked on screenshots.
- JavaScript syntax check of every file; web manifest is valid JSON.

### NOT tested — needs a real phone or the real GitHub Pages address

- iPhone Safari and Android Chrome on physical devices (layout, safe areas,
  "Add to Home Screen", offline start from the home-screen icon).
- The site on the real `https://USERNAME.github.io/survival-stick/` address.
- Real GPS outdoors, including in airplane mode.
- Real phone calls from the SOS button (`tel:` links) and the phone's share menu
  (the Web Share API was not available in the test browser, so only the
  "sharing not available" fallback was seen).
- Scanning a real NFC tag.
- The optional online map (OpenStreetMap) loading on a phone.
- Screen readers (VoiceOver, TalkBack). Labels, live regions and keyboard focus
  are implemented but were not tested with assistive technology.
- Colour contrast was calculated by hand for the main colour pairs (all above
  4.5:1), not measured with an audit tool.
- French, Arabic and right-to-left layout (no translation exists yet).

---

## 7. Known limitations

- **The website is not connected to the stick.** No Bluetooth, no sensor data,
  no SOS relay. The stick page describes design intentions only.
- **First visit needs internet.** NFC only opens a web address. A hiker who
  scans the tag for the first time without signal will not see the app.
- **Offline copies are per browser** and can be deleted by the phone (low
  storage, cleared browsing data, long periods without use on iOS).
- **No emergency numbers are built in.** Until you add verified numbers in
  `js/config.js`, each user must enter their own.
- **No offline maps.** Coordinates work without a map; the optional map needs
  internet and sends the position to openstreetmap.org when the user asks for it.
- **GPS depends on the phone:** accuracy varies and a position can take time.
- **The guidance is general and unreviewed** (see REFERENCES.md).
- Very old browsers (before about 2020) are not supported; they show a short
  message telling the user to call the local emergency number.

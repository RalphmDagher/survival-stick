/*
 * Survival Stick — offline manifest (single source of truth).
 *
 * Loaded by BOTH index.html and service-worker.js.
 *  - `version`: bump this every time you change ANY file of the site.
 *               The service worker then downloads a complete fresh copy in the
 *               background and only replaces the old one when it is complete.
 *  - `files`:   every file needed to run the app offline. If you add a file to
 *               the project, add it here too, otherwise it will not work offline.
 */
self.SS_MANIFEST = {
  version: '1.0.0',
  files: [
    './',
    'index.html',
    'manifest.webmanifest',
    'offline-manifest.js',
    'css/base.css',
    'css/layout.css',
    'css/components.css',
    'js/app.js',
    'js/router.js',
    'js/i18n.js',
    'js/store.js',
    'js/offline.js',
    'js/geo.js',
    'js/ui.js',
    'js/icons.js',
    'js/illustrations.js',
    'js/config.js',
    'js/contacts.js',
    'js/components/location-card.js',
    'js/components/offline-status.js',
    'js/components/contacts-editor.js',
    'js/pages/home.js',
    'js/pages/sos.js',
    'js/pages/guides.js',
    'js/pages/location.js',
    'js/pages/skills.js',
    'js/pages/stick.js',
    'js/pages/prep.js',
    'js/pages/settings.js',
    'js/pages/more.js',
    'js/content/en/guides.js',
    'js/content/en/skills.js',
    'js/content/en/stick.js',
    'js/content/en/checklist.js',
    'js/locales/fr.js',
    'js/locales/ar.js',
    'assets/fonts/inter-latin-wght-normal.woff2',
    'assets/fonts/outfit-latin-wght-normal.woff2',
    'assets/icons/favicon.svg',
    'assets/icons/icon-192.png',
    'assets/icons/icon-512.png',
    'assets/icons/icon-maskable-512.png',
    'assets/icons/apple-touch-icon.png'
  ]
};

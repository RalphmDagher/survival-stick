/* Local line icons (24x24 grid, drawn for this project — no icon font, no network). */
const PATHS = {
  home: '<path d="M3 11l9-7 9 7v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  guides: '<path d="M12 6C10 4.6 7 4 4 4v14c3 0 6 .6 8 2 2-1.4 5-2 8-2V4c-3 0-6 .6-8 2zM12 6v14"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  phone: '<path d="M6 3h3l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  alert: '<path d="M12 3.500 21.500 20h-19zM12 10v4.500M12 17.300v.2"/>',
  avalanche: '<path d="M2 20l7-12 4 6 2-3 7 9zM6.700 12l2.300 1.500 2-2"/>',
  injury: '<rect x="3" y="6" width="18" height="14" rx="2.500"/><path d="M9 6V4h6v2M12 10v6M9 13h6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.500 8.500l-2 5-5 2 2-5z"/>',
  storm: '<path d="M7 16a4 4 0 0 1 .5-8 5.500 5.500 0 0 1 10.600 1.500A3.300 3.300 0 0 1 17.500 16"/><path d="M12.500 12l-2.500 4h3.500l-2.500 4.500"/>',
  cold: '<path d="M12 2v20M4 7l16 10M20 7L4 17M9.500 4l2.500 2.500L14.500 4M9.500 20l2.500-2.500 2.500 2.500"/>',
  heat: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.500M12 19.500V22M2 12h2.500M19.500 12H22M5 5l1.700 1.700M17.300 17.300 19 19M5 19l1.700-1.700M17.300 6.700 19 5"/>',
  check: '<path d="M5 12.500l4.500 4.500L19 7.500"/>',
  chevronRight: '<path d="M9 5l7 7-7 7"/>',
  chevronLeft: '<path d="M15 5l-7 7 7 7"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  share: '<path d="M12 15V3M8 7l4-4 4 4M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/>',
  settings: '<path d="M4 7h9M19 7h1M4 17h1M11 17h9"/><circle cx="16" cy="7" r="2.500"/><circle cx="8" cy="17" r="2.500"/>',
  backpack: '<path d="M7 9a5 5 0 0 1 10 0v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1zM10 4.500V3h4v1.500M9.500 13h5v3.500h-5z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.2"/>',
  download: '<path d="M12 3v12M8 11l4 4 4-4M5 20h14"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.600-5.900M20 4v5h-5"/>',
  offline: '<path d="M3 3l18 18M8.500 16.500a5 5 0 0 1 7 0M5 13a10 10 0 0 1 3.500-2.300M19 13a10 10 0 0 0-5.500-2.900M12 20v.2"/>',
  signal: '<path d="M4 10v4l10 4V6zM17 9.500a4 4 0 0 1 0 5M19.500 7a8 8 0 0 1 0 10"/>',
  warm: '<path d="M12 3c1 4 5 5.500 5 10a5 5 0 0 1-10 0c0-2 1-3.200 2-4 .5 2 1.500 2.500 2 2.500C11 9 10.500 6 12 3z"/>',
  map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
  cloud: '<path d="M7 18a4 4 0 0 1 .5-8 5.500 5.500 0 0 1 10.600 1.500A3.300 3.300 0 0 1 17.500 18z"/>',
  shield: '<path d="M12 3l8 3v6c0 4.500-3.400 8-8 9-4.600-1-8-4.500-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a3.500 3.500 0 0 0 0-7h-4a3.500 3.500 0 0 1 0-7h6" transform="translate(0 2) scale(1 .83)"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  star: '<path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.800L12 16.900l-5.200 2.700 1-5.800-4.300-4.100 5.900-.8z"/>',
  bluetooth: '<path d="M7 7l10 10-5 4V3l5 4L7 17"/>',
  nfc: '<path d="M6 8.500a7 7 0 0 1 0 7M10 6a11 11 0 0 1 0 12M14 3.500a15 15 0 0 1 0 17"/>',
  solar: '<rect x="3" y="6" width="18" height="12" rx="1.500"/><path d="M3 12h18M9 6v12M15 6v12"/>',
  light: '<path d="M9.500 18h5M10.500 21h3M12 3a6 6 0 0 0-4 10.500c.7.700 1 1.500 1 2.500h6c0-1 .3-1.800 1-2.500A6 6 0 0 0 12 3z"/>',
  gps: '<circle cx="12" cy="12" r="6.500"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3.500M12 18.500V22M2 12h3.500M18.500 12H22"/>',
  activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  textSize: '<path d="M3 7V5h11v2M8.500 5v14M6.500 19h4M14 13.500V12h7v1.500M17.500 12v7M16 19h3"/>',
  checklist: '<path d="M10 6h10M10 12h10M10 18h10M3.500 6l1.200 1.200 2-2.200M3.500 12l1.200 1.200 2-2.200M3.500 18l1.200 1.200 2-2.200"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  wind: '<path d="M3 9h10a3 3 0 1 0-3-3M3 15h14a3 3 0 1 1-3 3M3 12h6"/>',
  eye: '<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  users: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20a6.500 6.500 0 0 1 13 0M16 4.800a3.500 3.500 0 0 1 0 6.400M18 14.500a6.500 6.500 0 0 1 3.500 5.500"/>',
  droplet: '<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',
  moon: '<path d="M20 14.500A8 8 0 0 1 9.500 4 8 8 0 1 0 20 14.500z"/>',
  hand: '<path d="M8 12V5.500a1.500 1.500 0 0 1 3 0V11M11 10.500V4a1.500 1.500 0 0 1 3 0v6.500M14 11V5.500a1.500 1.500 0 0 1 3 0V14c0 4-2.500 7-6 7s-5-2-6.500-5L3 13a1.500 1.500 0 0 1 2.500-1.500L8 14"/>'
};

const LOGO =
  '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#253743"/>' +
  '<path d="M8 49 21 29l8 10M35 39l9-14 12 24" fill="none" stroke="#F3F5F4" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M32 23v28" stroke="#FF7417" stroke-width="4.500" stroke-linecap="round"/><circle cx="32" cy="14" r="4.500" fill="#FF7417"/></svg>';

function fromMarkup(markup) {
  const tpl = document.createElement('template');
  tpl.innerHTML = markup; // trusted constant strings defined in this file only
  return tpl.content.firstChild;
}

/** Returns an <svg> element for the named icon (decorative: hidden from screen readers). */
export function icon(name) {
  const body = PATHS[name] || PATHS.info;
  return fromMarkup(
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.800" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>'
  );
}

export function logo() {
  return fromMarkup(LOGO);
}

/** Turn a trusted SVG string (from illustrations.js) into an element. */
export function svgFromString(markup) {
  return fromMarkup(markup);
}

/*
 * Local line diagrams (inline SVG, drawn for this project).
 * Each function receives t() so the few labels can be translated.
 * Colours come from css/components.css (.ill .s / .o / .m ...).
 */
const open = (label) => `<svg class="ill" viewBox="0 0 320 160" role="img" aria-label="${label.replace(/"/g, '&quot;')}">`;

const DIAGRAMS = {
  slopeEscape: (t) =>
    open(t('Diagram: move sideways out of the avalanche path')) +
    '<path class="m dash" d="M135 12 85 150M185 12 235 150"/>' +
    '<path class="m" d="M160 22v44M153 58l7 9 7-9"/>' +
    '<circle class="fs" cx="150" cy="98" r="6"/>' +
    '<path class="o" d="M140 100 72 118M86 107 72 118l17 3"/>' +
    `<text x="214" y="64">${t('Avalanche path')}</text>` +
    `<text class="to" x="8" y="142">${t('Escape to the side')}</text></svg>`,

  searchZone: (t) =>
    open(t('Diagram: search downhill from the last seen point')) +
    '<path class="r" d="M152 16l16 16M168 16l-16 16"/>' +
    '<path class="m dash" d="M160 40 95 150M160 40 225 150"/>' +
    '<path class="o" d="M150 62h20l-34 26h48l-62 28h76"/>' +
    `<text x="178" y="28">${t('Last seen point')}</text>` +
    `<text class="to" x="236" y="112">${t('Search')}</text>` +
    `<text class="to" x="236" y="127">${t('downhill')}</text></svg>`,

  whistle: (t) =>
    open(t('Diagram: six signals in one minute, then one minute of silence')) +
    [20, 42, 64, 86, 108, 130].map((x) => `<rect class="fo" x="${x}" y="44" width="12" height="36" rx="3"/>`).join('') +
    '<path class="m dash" d="M162 62h138"/>' +
    '<path class="m" d="M20 94v7h122v-7M162 94v7h138v-7"/>' +
    `<text class="to" x="20" y="122">${t('6 signals in 1 minute')}</text>` +
    `<text x="162" y="122">${t('1 minute silence')}</text>` +
    `<text x="20" y="146">${t('Then repeat')}</text></svg>`,

  lightning: (t) =>
    open(t('Diagram: leave the ridge and go down to lower ground')) +
    '<path class="s" d="M10 142 80 42l30 30 40-20 160 90"/>' +
    '<path class="o" d="M94 4 80 22h13L82 38"/>' +
    '<path class="o" d="M186 54l76 43M248 95l14 2-6-13"/>' +
    '<circle class="fs" cx="282" cy="116" r="6"/>' +
    `<text x="120" y="34">${t('Exposed')}</text>` +
    `<text class="to" x="222" y="62">${t('Go down')}</text></svg>`,

  wrapLayers: (t) =>
    open(t('Diagram: insulation under the person, dry layers around, windproof layer outside')) +
    '<rect class="fm" x="40" y="12" width="240" height="27" rx="8"/>' +
    '<rect class="fm" x="40" y="45" width="240" height="27" rx="8"/>' +
    '<rect class="o" x="40" y="78" width="240" height="27" rx="8"/>' +
    '<rect class="fm" x="40" y="111" width="240" height="27" rx="8"/>' +
    '<path class="m dash" d="M16 150h288"/>' +
    `<text text-anchor="middle" x="160" y="30">${t('Windproof, waterproof outer layer')}</text>` +
    `<text text-anchor="middle" x="160" y="63">${t('Dry insulating layers')}</text>` +
    `<text class="to" text-anchor="middle" x="160" y="96">${t('Person')}</text>` +
    `<text text-anchor="middle" x="160" y="129">${t('Insulation from the ground')}</text></svg>`,

  coolingPoints: (t) =>
    open(t('Diagram: cool the neck, armpits and groin')) +
    '<circle class="s" cx="110" cy="24" r="12"/>' +
    '<path class="s" d="M110 36v60M110 50 82 84M110 50l28 34M110 96 92 148M110 96l18 52"/>' +
    '<circle class="fo" cx="110" cy="40" r="5"/><circle class="fo" cx="101" cy="58" r="5"/>' +
    '<circle class="fo" cx="119" cy="58" r="5"/><circle class="fo" cx="110" cy="99" r="5"/>' +
    `<text class="to" x="170" y="62">${t('Cool these areas:')}</text>` +
    `<text x="170" y="80">${t('neck, armpits, groin')}</text></svg>`,

  compass: (t) =>
    open(t('Diagram: compass with the red needle pointing north')) +
    '<circle class="s" cx="160" cy="88" r="60"/><circle class="m dash" cx="160" cy="88" r="48"/>' +
    '<path class="r" d="M151 88l9-42 9 42z"/><path class="s" d="M151 88l9 42 9-42"/>' +
    '<path class="o" d="M160 22V4M153 11l7-7 7 7"/>' +
    `<text class="to" x="176" y="14">${t('Travel arrow')}</text>` +
    `<text x="232" y="70">${t('Red end:')}</text><text x="232" y="85">${t('north')}</text></svg>`,

  contours: (t) =>
    open(t('Diagram: contour lines close together mean steep ground')) +
    '<ellipse class="m" cx="150" cy="72" rx="110" ry="62"/><ellipse class="m" cx="140" cy="72" rx="85" ry="48"/>' +
    '<ellipse class="s" cx="130" cy="72" rx="60" ry="34"/><ellipse class="s" cx="122" cy="72" rx="36" ry="20"/>' +
    '<ellipse class="s" cx="116" cy="72" rx="14" ry="8"/><circle class="fo" cx="116" cy="72" r="3.500"/>' +
    `<text class="to" x="8" y="154">${t('Close lines: steep')}</text>` +
    `<text x="196" y="154">${t('Wide lines: gentle')}</text></svg>`
};

export function diagram(name, t) {
  return DIAGRAMS[name] ? DIAGRAMS[name](t) : null;
}

/* Mountain ridge used behind the home page heading. */
export const HERO_RIDGE =
  '<svg class="hero-ridge" viewBox="0 0 400 110" preserveAspectRatio="none" aria-hidden="true">' +
  '<path d="M0 78 60 40l34 22 52-46 48 44 36-22 60 40 46-30 64 34v50H0z" fill="#1B303D"/>' +
  '<path d="M146 16l-14 13 10 3 6-6 8 8 9-4z" fill="#F3F5F4" opacity=".8"/>' +
  '<path d="M0 100 70 70l50 20 70-34 60 30 56-22 94 30v16H0z" fill="#14232D" opacity=".75"/>' +
  '<path d="M300 66V44" stroke="#FF7417" stroke-width="3" stroke-linecap="round"/><circle cx="300" cy="39" r="3.500" fill="#FF7417"/></svg>';

/* The proposed physical stick (hotspots are placed on top by js/pages/stick.js). */
export const STICK_SVG =
  '<svg viewBox="0 0 240 520" aria-hidden="true">' +
  '<path d="M0 470 50 380l35 40 45-80 50 90 30-30 30 40v80H0z" fill="#1B303D"/>' +
  '<path d="M130 340l-13 23 9 5 6-7 9 9 6-4z" fill="#F3F5F4" opacity=".55"/>' +
  // pole
  '<rect x="112" y="250" width="16" height="232" rx="4" fill="#3B5464" stroke="#AABCC7" stroke-width="1.500"/>' +
  '<rect x="112" y="292" width="16" height="10" fill="#FF7417"/><rect x="112" y="410" width="16" height="10" fill="#FF7417"/>' +
  // snow
  '<path d="M0 480q60-16 120-6t120-6v52H0z" fill="#F3F5F4" opacity=".92"/>' +
  // sensor module
  '<rect x="102" y="328" width="36" height="46" rx="9" fill="#253743" stroke="#AABCC7" stroke-width="1.500"/>' +
  '<path d="M108 351h6l4-10 5 20 4-10h6" fill="none" stroke="#FF7417" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
  // antenna
  '<path d="M84 150H70V98" fill="none" stroke="#AABCC7" stroke-width="2.500" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<circle cx="70" cy="91" r="6" fill="#253743" stroke="#AABCC7" stroke-width="2"/>' +
  '<path d="M58 80a17 17 0 0 1 24 0M52 72a26 26 0 0 1 36 0" fill="none" stroke="#AABCC7" stroke-width="1.500" stroke-linecap="round" opacity=".7"/>' +
  // solar panel
  '<path d="M156 132l-4-24 46-20 6 32z" fill="#1A3345" stroke="#AABCC7" stroke-width="1.500" stroke-linejoin="round"/>' +
  '<path d="M154 120l48-21M175 98l5 23" stroke="#AABCC7" stroke-width="1" opacity=".7"/>' +
  // warning light
  '<path d="M104 118v-14a16 16 0 0 1 32 0v14z" fill="#FF7417"/>' +
  '<path d="M120 76V66M96 86l-7-7M144 86l7-7" stroke="#FF7417" stroke-width="2.500" stroke-linecap="round"/>' +
  // head unit
  '<rect x="84" y="118" width="72" height="140" rx="18" fill="#253743" stroke="#AABCC7" stroke-width="1.500"/>' +
  '<circle cx="120" cy="156" r="19" fill="#D93636"/>' +
  '<text x="120" y="160.500" text-anchor="middle" font-family="Outfit, Inter, sans-serif" font-size="11" font-weight="700" fill="#fff">SOS</text>' +
  // NFC zone
  '<path d="M128 199a13 13 0 0 1 0 18M134 195a20 20 0 0 1 0 26M140 191a27 27 0 0 1 0 34" fill="none" stroke="#FF7417" stroke-width="2" stroke-linecap="round"/>' +
  // Bluetooth mark
  '<path d="M97 228l10 10-5 4.500v-19l5 4.500-10 10" fill="none" stroke="#AABCC7" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

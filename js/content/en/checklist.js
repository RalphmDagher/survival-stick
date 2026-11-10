/*
 * Pre-hike checklist (English).
 * auto: 'offline' = this item is ticked by the app itself, only when the
 * offline copy has been verified on this phone. It cannot be ticked by hand.
 */
export default [
  {
    id: 'offline',
    auto: 'offline',
    title: 'Download offline emergency guides',
    detail: 'Save this app on your phone while you still have a connection.'
  },
  {
    id: 'weather',
    title: 'Check the weather forecast',
    detail: 'Use a mountain forecast for the altitude of your route. In snow season, read the avalanche bulletin.'
  },
  {
    id: 'route',
    title: 'Inform someone about the route',
    detail: 'Give your route, your return time and when to raise the alarm.'
  },
  {
    id: 'charge',
    title: 'Charge phone and power bank',
    detail: 'Start at 100% and carry the cable.'
  },
  {
    id: 'supplies',
    title: 'Carry appropriate emergency supplies',
    detail: 'First-aid kit, warm layer, waterproof, light, whistle, extra food and water, emergency blanket.',
    link: { href: '#/skills/backpack', label: 'See the packing lesson' }
  },
  {
    id: 'navigation',
    title: 'Check navigation tools',
    detail: 'Paper map and compass in the bag. Offline maps downloaded in your maps app.'
  },
  {
    id: 'procedures',
    title: 'Understand emergency procedures',
    detail: 'Know the emergency number for the country you are in, and read the emergency guides once.',
    link: { href: '#/guides', label: 'Open the emergency guides' }
  }
];

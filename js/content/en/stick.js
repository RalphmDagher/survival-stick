/*
 * The physical Survival Stick — feature descriptions (English).
 *
 * status: 'proposed'  = concept still being developed (default for everything)
 *         'verified'  = the team has actually demonstrated or tested it
 *
 * Change a status to 'verified' ONLY when the feature has really been tested,
 * and describe the test in `evidence` so visitors can see what was shown.
 *
 * x / y = position of the hotspot on the illustration, in percent.
 */
export default [
  {
    id: 'light',
    title: 'Warning light',
    icon: 'light',
    status: 'proposed',
    x: 50, y: 19.5,
    summary: 'A light at the top of the stick, meant to make it visible and to warn of danger.',
    detail: 'Design intent: the light would help hikers find the stick in poor visibility and could signal an active alert. This website cannot switch the light on and does not know its state.',
    evidence: ''
  },
  {
    id: 'gps',
    title: 'Satellite / GPS location system',
    icon: 'gps',
    status: 'proposed',
    x: 29, y: 17.5,
    summary: 'A positioning and communication module, meant to attach the stick\'s location to an alert.',
    detail: 'Design intent: because each stick is installed at a fixed, known point on the route, an alert could carry that position to rescuers. The coordinates shown in this website come from your own phone, not from the stick.',
    evidence: ''
  },
  {
    id: 'solar',
    title: 'Solar panel',
    icon: 'solar',
    status: 'proposed',
    x: 74, y: 22,
    summary: 'A small panel meant to recharge the stick\'s battery.',
    detail: 'Design intent: solar charging would let the stick run for long periods without maintenance. No battery level or charging data is shown in this website.',
    evidence: ''
  },
  {
    id: 'sos',
    title: 'SOS button',
    icon: 'alert',
    status: 'proposed',
    x: 50, y: 30,
    summary: 'A physical button on the stick, meant to send an emergency alert.',
    detail: 'Design intent: pressing the button would send an alert through the stick\'s own communication system. This website is separate from that button: it cannot press it, trigger it or confirm that an alert was sent.',
    evidence: ''
  },
  {
    id: 'nfc',
    title: 'NFC emergency guidance',
    icon: 'nfc',
    status: 'proposed',
    x: 60, y: 40,
    summary: 'An NFC tag that opens this website when a phone is held against it.',
    detail: 'The tag only stores a web address. The phone then loads the website over its own internet connection, so the first visit needs a signal. After the guides have been saved on the phone, they can be opened without a connection. This website is a working prototype; the tag on the stick has not been recorded here as tested.',
    evidence: ''
  },
  {
    id: 'bluetooth',
    title: 'Bluetooth connectivity',
    icon: 'bluetooth',
    status: 'proposed',
    x: 41, y: 45,
    summary: 'A short-range radio link, meant to connect a nearby phone to the stick.',
    detail: 'Design intent: Bluetooth could let a phone exchange information with the stick at close range. This website does not connect to the stick over Bluetooth and shows no connection status.',
    evidence: ''
  },
  {
    id: 'detect',
    title: 'Fall and avalanche detection',
    icon: 'activity',
    status: 'proposed',
    x: 50, y: 67.5,
    summary: 'Sensors meant to detect a strong impact or an avalanche at the stick.',
    detail: 'Design intent: motion sensors could recognise when the stick is hit or buried and raise an alert automatically. No sensor measurements are shown in this website, and it cannot detect falls or avalanches itself.',
    evidence: ''
  }
];

# References for the emergency guidance

**Status: prototype.** The guides and lessons in this app were written as short,
plain-language summaries of the public guidance listed below. They have **not**
been reviewed by qualified mountain-rescue or medical professionals. Before the
Survival Stick is used by the public, every guide must be checked, corrected
and signed off by such experts, and adapted to local rescue procedures.

Where sources differ (for example, whistle signals differ between Europe and
North America), the app says so instead of choosing one silently.

"Link check" shows the result of an automated request made on 10 November 2026.
"Blocked" means the website refused automated requests, so the link must be
opened by hand to confirm it.

## Medical guidance

| Topic in the app | Source | Link | Link check |
|---|---|---|---|
| Hypothermia (signs, insulation, gentle handling, no alcohol, no rubbing) | UK National Health Service (NHS), "Hypothermia" | https://www.nhs.uk/conditions/hypothermia/ | OK |
| Hypothermia in the field (wrap/insulation layers, gentle horizontal handling, checking breathing for up to one minute) | Wilderness Medical Society, *Clinical Practice Guidelines for the Out-of-Hospital Evaluation and Treatment of Accidental Hypothermia* (2019 update), journal *Wilderness & Environmental Medicine* | https://wms.org/ | OK (home page) |
| Heat exhaustion and heatstroke (cool within 30 minutes, emergency signs, recovery position) | NHS, "Heat exhaustion and heatstroke" | https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/ | OK |
| Heatstroke cooling (rapid cooling, cold-water immersion) | Wilderness Medical Society, *Clinical Practice Guidelines for the Prevention and Treatment of Heat Illness* (2019 update) | https://wms.org/ | OK (home page) |
| Heat illness signs | US Centers for Disease Control and Prevention (CDC), extreme heat pages | https://www.cdc.gov/extreme-heat/ | Blocked |
| Dehydration (small sips, rehydration salts, when to get help) | NHS, "Dehydration" | https://www.nhs.uk/conditions/dehydration/ | OK |
| Bleeding, unresponsive person, CPR "if trained", not moving a suspected spinal injury | International Federation of Red Cross and Red Crescent Societies, *International first aid, resuscitation and education guidelines* | https://www.ifrc.org/ | Blocked |

## Mountain and rescue guidance

| Topic in the app | Source | Link | Link check |
|---|---|---|---|
| Avalanche: escaping to the side, fighting to stay on the surface, air pocket, last seen point, companion rescue, warning signs | Avalanche Canada (public education pages); Avalanche.org / American Avalanche Association (avalanche encyclopedia) | https://avalanche.ca/ and https://avalanche.org/ | OK / Blocked |
| Avalanche rescue and resuscitation | International Commission for Alpine Rescue (ICAR) recommendations; Wilderness Medical Society, *Practice Guidelines for Prevention and Management of Avalanche and Nonavalanche Snow Burial Accidents* | https://www.alpine-rescue.org/ | OK |
| Lightning (descend from high ground, avoid isolated trees and conductors, spread out, 30-minute wait, a struck person is safe to touch) | US National Weather Service, "Lightning Safety Tips and Resources" / "Lightning Safety Outdoors"; Wilderness Medical Society lightning guidelines | https://www.weather.gov/safety/lightning-outdoors | OK |
| Getting lost: S.T.O.P. (Stop, Think, Observe, Plan), staying put | US Forest Service, "If You Get Lost" | https://www.fs.usda.gov/visit/know-before-you-go/if-you-get-lost | Blocked |
| The Ten Essentials (backpack lesson) | US National Park Service, "Ten Essentials" | https://www.nps.gov/articles/10essentials.htm | OK |
| Alpine distress signal (six signals per minute, one-minute pause; reply three per minute), helicopter "Y / N" arm signals, calling for mountain rescue | Mountain Rescue England and Wales; British Mountaineering Council; Alpine club (UIAA member) safety publications | https://www.mountain.rescue.org.uk/ and https://www.thebmc.co.uk/ | OK |
| Compass, map and trip-planning lessons | British Mountaineering Council hill-skills material; US National Park Service trip-planning pages | https://www.thebmc.co.uk/ | OK |

## What reviewers should check first

1. **Local rescue procedures and emergency numbers** for the country where the
   sticks are installed (none are built into the app; see `js/config.js`).
2. **Avalanche guidance** against the local avalanche warning service.
3. **Medical steps** (hypothermia, heat illness, bleeding, CPR wording) against
   current national first-aid guidelines.
4. **Lightning crouch advice.** Sources agree that crouching gives very little
   protection; the app presents it as a last resort only.
5. **Signals.** Confirm which distress signals local rescue teams expect.

## Software credits

- Fonts: **Inter** by Rasmus Andersson (https://rsms.me/inter/) and **Outfit**
  by the Outfit Project Authors (https://fonts.google.com/specimen/Outfit).
  Both are licensed under the SIL Open Font License 1.1, which permits bundling
  the font files with a website. Files were obtained from the Fontsource
  packages `@fontsource-variable/inter` and `@fontsource-variable/outfit`
  (Latin subset).
- Icons, diagrams, the stick illustration and the logo were drawn for this
  project and are stored in `js/icons.js` and `js/illustrations.js`.
- Optional online map: © OpenStreetMap contributors (only loaded when the user
  taps "Show online map").

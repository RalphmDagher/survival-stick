/*
 * Emergency guides (English).
 *
 * PROTOTYPE CONTENT — written from the public guidance listed in REFERENCES.md.
 * It must be reviewed by qualified mountain-rescue and medical professionals
 * before the Survival Stick is used by the public.
 *
 * Shape
 *   guide  = { id, title, short, icon, question, options[], paths{} }
 *   option = { path, label, detail, icon, urgent? }   (urgent = red outline)
 *   path   = { title, steps[] }
 *   step   = { title, instruction, explanation, icon?, ill? }
 *            ill = name of a diagram in js/illustrations.js
 */
export default [
  /* ------------------------------------------------------------------ */
  {
    id: 'avalanche',
    title: 'Avalanche',
    short: 'Caught, witnessed, or avoiding one',
    icon: 'avalanche',
    question: 'What is your situation?',
    options: [
      { path: 'caught', label: 'I am caught, or about to be', detail: 'Snow is moving around or towards me', icon: 'alert', urgent: true },
      { path: 'witness', label: 'I saw someone get caught', detail: 'A person was carried or buried', icon: 'eye', urgent: true },
      { path: 'safe', label: 'I am in a safer place', detail: 'I want to avoid avalanche danger', icon: 'shield' }
    ],
    paths: {
      caught: {
        title: 'Caught in an avalanche',
        steps: [
          {
            title: 'Escape to the side',
            instruction: 'Move sideways out of the sliding snow, towards its nearest edge.',
            explanation: 'The flow is usually fastest and deepest in the middle. Getting to the side early gives the best chance of staying out of it.',
            ill: 'slopeEscape'
          },
          {
            title: 'Shout and free your hands',
            instruction: 'Shout so others see you, and let go of walking or ski poles.',
            explanation: 'Companions need to see where you go. Equipment attached to your hands can drag you under.',
            icon: 'signal'
          },
          {
            title: 'Fight to stay on top',
            instruction: 'Use strong swimming movements and grab trees or rocks if you can.',
            explanation: 'Moving vigorously helps keep you nearer the surface while the snow is still flowing.',
            icon: 'activity'
          },
          {
            title: 'Protect your airway',
            instruction: 'As the snow slows down, bring an arm or hand in front of your mouth and nose to keep a space to breathe.',
            explanation: 'Avalanche snow sets hard when it stops. An air space in front of the face is critical. If you can, push the other hand towards the surface.',
            icon: 'hand'
          },
          {
            title: 'If you are buried',
            instruction: 'Stay as calm as you can and breathe slowly.',
            explanation: 'Calm, slow breathing makes your air last longer. Save shouting for when you hear rescuers close by.',
            icon: 'info'
          }
        ]
      },
      witness: {
        title: 'Someone was caught',
        steps: [
          {
            title: 'Watch the last seen point',
            instruction: 'Keep your eyes on the person and fix the exact place where you last saw them.',
            explanation: 'The search starts from this point and goes downhill along the flow. Use a rock or tree as a landmark.',
            ill: 'searchZone'
          },
          {
            title: 'Check that it is safe',
            instruction: 'Before you go onto the debris, look for further avalanche danger and choose an escape route.',
            explanation: 'A second slide can bury the rescuers. Do not add more victims.',
            icon: 'alert'
          },
          {
            title: 'Call for help now',
            instruction: 'Call the emergency services, give your position, then begin searching immediately.',
            explanation: 'The chances of survival fall quickly in the first minutes, so the people already on scene are the best hope. In a group, one person calls while the others search.',
            icon: 'phone'
          },
          {
            title: 'Search the surface',
            instruction: 'Search downhill of the last seen point. Look for hands, clothing or equipment, and listen.',
            explanation: 'If your group carries avalanche transceivers, switch them all to search. Pull on any visible item: the person may be attached.',
            ill: 'searchZone'
          },
          {
            title: 'Dig fast',
            instruction: 'When you find the person, dig quickly and uncover the head and chest first.',
            explanation: 'Start digging slightly downhill of the person and move snow away to the sides. Clear snow from the mouth and nose.',
            icon: 'activity'
          },
          {
            title: 'Care until help arrives',
            instruction: 'Check breathing, keep the person warm and handle them gently.',
            explanation: 'If they are not breathing normally and you are trained, start CPR. Protect them from the cold and stay with them.',
            icon: 'injury'
          }
        ]
      },
      safe: {
        title: 'Staying out of avalanche danger',
        steps: [
          {
            title: 'Leave avalanche terrain',
            instruction: 'Move away from steep snow slopes and from the flat areas directly below them.',
            explanation: 'Avalanches can run far onto gentle ground. Ridges, dense forest and gentle slopes not connected to steeper ones are usually safer.',
            icon: 'avalanche'
          },
          {
            title: 'Read the warning signs',
            instruction: 'Treat recent avalanches, cracks shooting through the snow and hollow "whumpf" sounds as danger signs.',
            explanation: 'Heavy new snow, strong wind and rapid warming also raise the danger.',
            icon: 'eye'
          },
          {
            title: 'Expose one person at a time',
            instruction: 'If you must cross a suspect slope, go one at a time while the others watch from a safe spot.',
            explanation: 'Spacing out limits how many people can be caught and keeps rescuers available.',
            icon: 'users'
          },
          {
            title: 'When in doubt, turn back',
            instruction: 'Check the local avalanche bulletin before your trip and choose a safer route if you are unsure.',
            explanation: 'No summit is worth the risk. Turning back is a normal, good decision.',
            icon: 'route'
          }
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'injury',
    title: 'Injury / Fall',
    short: 'Serious injury or a fall',
    icon: 'injury',
    question: 'Who is hurt?',
    options: [
      { path: 'other', label: 'Someone else is seriously hurt', detail: 'A fall, heavy bleeding, or not responding', icon: 'users', urgent: true },
      { path: 'self', label: 'I am hurt and alone', detail: 'I cannot continue safely', icon: 'alert', urgent: true },
      { path: 'minor', label: 'A minor injury', detail: 'Able to walk, alert, small wound or sprain', icon: 'injury' }
    ],
    paths: {
      other: {
        title: 'Helping an injured person',
        steps: [
          {
            title: 'Make the area safe',
            instruction: 'Check for danger to yourself before you approach: loose rock, a drop, ice or more people falling.',
            explanation: 'You cannot help if you are injured too.',
            icon: 'alert'
          },
          {
            title: 'Check response and breathing',
            instruction: 'Speak loudly and tap their shoulders. Look at the chest to see if they breathe normally.',
            explanation: 'If they do not respond and are not breathing normally, call the emergency services at once and start CPR if you are trained.',
            icon: 'eye'
          },
          {
            title: 'Call for help early',
            instruction: 'Call the emergency services and give your coordinates.',
            explanation: 'Rescue in the mountains takes time. Call early rather than waiting to see if things improve.',
            icon: 'phone'
          },
          {
            title: 'Stop heavy bleeding',
            instruction: 'Press firmly and directly on the wound with a clean cloth, and keep pressing.',
            explanation: 'If blood soaks through, add more cloth on top and continue the pressure. Do not remove the first layer.',
            icon: 'hand'
          },
          {
            title: 'Do not move them without need',
            instruction: 'After a hard fall, keep the head, neck and back still unless the person is in immediate danger.',
            explanation: 'Movement can worsen a spinal injury. Support the head in the position you found it and ask them to stay still.',
            icon: 'shield'
          },
          {
            title: 'Keep them warm',
            instruction: 'Put insulation under and over the person and stay with them.',
            explanation: 'Injured people cool down fast, even in mild weather. Reassure them and watch their breathing until help arrives.',
            ill: 'wrapLayers'
          }
        ]
      },
      self: {
        title: 'Injured and alone',
        steps: [
          {
            title: 'Stop and stay calm',
            instruction: 'Stay still for a moment, breathe slowly and check that nothing else can fall on you.',
            explanation: 'Move only if you are in immediate danger where you are.',
            icon: 'info'
          },
          {
            title: 'Check yourself',
            instruction: 'Look for bleeding and press firmly on any wound that bleeds heavily.',
            explanation: 'Then check your head, back, arms and legs. Do not stand on a leg that may be broken.',
            icon: 'hand'
          },
          {
            title: 'Call for help',
            instruction: 'Call the emergency services and give your coordinates.',
            explanation: 'If there is no signal, try again from a few metres away or from higher ground, only if you can move safely.',
            icon: 'phone'
          },
          {
            title: 'Keep warm',
            instruction: 'Put on every layer you have and sit on your backpack or anything that insulates you from the ground.',
            explanation: 'Waiting without moving cools the body quickly.',
            ill: 'wrapLayers'
          },
          {
            title: 'Make yourself easy to find',
            instruction: 'Place bright items in the open and signal with a whistle or light.',
            explanation: 'The alpine distress signal is six signals in one minute, then one minute of silence, repeated. Three repeated signals are also widely recognised.',
            ill: 'whistle'
          }
        ]
      },
      minor: {
        title: 'Minor injury',
        steps: [
          {
            title: 'Stop and assess',
            instruction: 'Sit down, rest and look at the injury before you continue.',
            explanation: 'Check whether the person can stand and walk without severe pain.',
            icon: 'eye'
          },
          {
            title: 'Treat what you can',
            instruction: 'Clean and cover wounds. Support a twisted joint with a bandage and rest it.',
            explanation: 'Raising a swollen limb while resting, and cooling it, may reduce swelling.',
            icon: 'injury'
          },
          {
            title: 'Shorten the day',
            instruction: 'Turn back by the easiest and shortest route.',
            explanation: 'A small injury makes slips more likely and slows the whole group. Do not push on to the objective.',
            icon: 'route'
          },
          {
            title: 'Watch for changes',
            instruction: 'Call the emergency services if the person can no longer walk, or if pain, numbness or confusion get worse.',
            explanation: 'After any blow to the head, watch for drowsiness, vomiting or confusion. These need urgent medical help.',
            icon: 'phone'
          }
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'lost',
    title: 'Lost',
    short: 'Unsure of your position or route',
    icon: 'compass',
    question: 'What is happening?',
    options: [
      { path: 'stop', label: 'I do not know where I am', detail: 'I have just realised I am off route', icon: 'compass' },
      { path: 'night', label: 'Darkness or bad weather is coming', detail: 'I cannot find the way in time', icon: 'moon', urgent: true },
      { path: 'missing', label: 'Someone from my group is missing', detail: 'We have lost sight of a person', icon: 'users', urgent: true }
    ],
    paths: {
      stop: {
        title: 'Lost: S.T.O.P.',
        steps: [
          {
            title: 'S — Stop',
            instruction: 'Stop walking. Sit down, drink some water and calm yourself.',
            explanation: 'Walking on while unsure usually makes things worse. Panic is the main danger.',
            icon: 'hand'
          },
          {
            title: 'T — Think',
            instruction: 'Ask yourself: where was I last sure of my position, and how long ago?',
            explanation: 'Remember junctions, landmarks and the direction you have been walking.',
            icon: 'info'
          },
          {
            title: 'O — Observe',
            instruction: 'Get your GPS coordinates and compare what you see with your map.',
            explanation: 'Look for trail markers, footprints, ridges, valleys and streams. Check how much daylight, water and battery you have.',
            icon: 'gps',
            link: { href: '#/location', label: 'Open my coordinates' }
          },
          {
            title: 'P — Plan',
            instruction: 'Only move if you are confident of the way back to your last known point. Otherwise stay where you are.',
            explanation: 'If you walk back, do it on the path you came by. Never take a "shortcut" down unknown terrain.',
            icon: 'route'
          },
          {
            title: 'If you cannot find the way',
            instruction: 'Call the emergency services, give your coordinates and stay in one place.',
            explanation: 'Rescuers find people who stay still much faster. Make yourself visible and keep warm.',
            icon: 'phone'
          }
        ]
      },
      night: {
        title: 'Lost with darkness or bad weather',
        steps: [
          {
            title: 'Stop moving',
            instruction: 'Stay where you are unless the place itself is dangerous.',
            explanation: 'Most serious falls happen when people keep going in darkness or poor visibility.',
            icon: 'hand'
          },
          {
            title: 'Call early',
            instruction: 'Call the emergency services now and give your coordinates.',
            explanation: 'Do not wait until the battery is low or night has fallen. Then reduce screen brightness and keep the phone warm, close to your body.',
            icon: 'phone'
          },
          {
            title: 'Find shelter close by',
            instruction: 'Get out of the wind and rain behind rocks or trees a short distance away.',
            explanation: 'Avoid cliff edges, stream beds, lone trees in a storm and slopes that could avalanche.',
            icon: 'wind'
          },
          {
            title: 'Keep your heat',
            instruction: 'Put on all your layers and sit on your backpack, not on the ground.',
            explanation: 'Stay close together if you are in a group. Eat and drink a little at a time.',
            ill: 'wrapLayers'
          },
          {
            title: 'Signal',
            instruction: 'Use a whistle or light: six signals in one minute, then one minute of silence, and repeat.',
            explanation: 'Keep bright clothing or a reflective blanket visible. Answer any signal you hear.',
            ill: 'whistle'
          }
        ]
      },
      missing: {
        title: 'A group member is missing',
        steps: [
          {
            title: 'Stop and regroup',
            instruction: 'Gather everyone in one safe place and keep the group together.',
            explanation: 'A scattered group creates more missing people.',
            icon: 'users'
          },
          {
            title: 'Fix the facts',
            instruction: 'Note where and when the person was last seen, and what they are wearing and carrying.',
            explanation: 'Rescuers will ask for exactly this information.',
            icon: 'info'
          },
          {
            title: 'Call and listen',
            instruction: 'Shout or whistle, then stay silent and listen. Try their phone.',
            explanation: 'Repeat at regular intervals. Sound carries poorly in wind, so give them time to answer.',
            icon: 'signal'
          },
          {
            title: 'Search only close by',
            instruction: 'Check the path back to the last seen point, never alone, and agree a time to return.',
            explanation: 'Leave someone at the meeting point in case the person comes back.',
            icon: 'route'
          },
          {
            title: 'Call for help',
            instruction: 'If the person is not found quickly, call the emergency services with the last seen position.',
            explanation: 'Call sooner in bad weather, near nightfall, in dangerous terrain, or if the person is a child, unwell or poorly equipped.',
            icon: 'phone'
          }
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'weather',
    title: 'Extreme Weather',
    short: 'Lightning, whiteout, wind and rain',
    icon: 'storm',
    question: 'What kind of weather?',
    options: [
      { path: 'lightning', label: 'Thunderstorm', detail: 'I can hear thunder or see lightning', icon: 'storm', urgent: true },
      { path: 'whiteout', label: 'Snowstorm, whiteout or thick fog', detail: 'I can hardly see the way', icon: 'cloud' },
      { path: 'wind', label: 'Strong wind or heavy rain', detail: 'Conditions are getting dangerous', icon: 'wind' }
    ],
    paths: {
      lightning: {
        title: 'Thunderstorm',
        steps: [
          {
            title: 'Get off high ground',
            instruction: 'Leave summits, ridges and open slopes immediately and go down.',
            explanation: 'If you can hear thunder, lightning is close enough to strike you. Lightning tends to hit the highest points.',
            ill: 'lightning'
          },
          {
            title: 'Keep away from conductors',
            instruction: 'Stay away from lone trees, water, wire fences, cables and metal ladders.',
            explanation: 'Do not shelter under an isolated tree, a rock overhang or in a shallow cave mouth: current travels along them.',
            icon: 'alert'
          },
          {
            title: 'Aim for real shelter',
            instruction: 'Keep moving towards a closed building or a hard-topped vehicle if one is within reach.',
            explanation: 'Tents and open shelters do not protect against lightning. Lower ground and dense, even forest are less exposed than open terrain.',
            icon: 'home'
          },
          {
            title: 'Spread out',
            instruction: 'In a group, keep several metres between each person.',
            explanation: 'Spacing reduces the chance that one strike injures everyone, so someone can still give help.',
            icon: 'users'
          },
          {
            title: 'If strikes are very close',
            instruction: 'Do not lie flat. Keep moving to safer ground if you can; if you cannot, crouch low with your feet together.',
            explanation: 'Crouching does not make you safe. It may only slightly reduce the risk when there is truly nowhere better to go.',
            icon: 'info'
          },
          {
            title: 'Wait, and help the injured',
            instruction: 'Wait 30 minutes after the last thunder before returning to exposed ground.',
            explanation: 'A person struck by lightning carries no electric charge and is safe to touch. Call the emergency services, and start CPR if they are not breathing and you are trained.',
            icon: 'phone'
          }
        ]
      },
      whiteout: {
        title: 'Whiteout or thick fog',
        steps: [
          {
            title: 'Stop before you lose the route',
            instruction: 'Stop as soon as you can no longer see the path or the terrain ahead.',
            explanation: 'In a whiteout you cannot see edges, drops or cornices. Walking blind is how people fall.',
            icon: 'hand'
          },
          {
            title: 'Fix your position',
            instruction: 'Get your coordinates now and mark the position on your map.',
            explanation: 'Knowing where you are lets you choose a safe direction and tell rescuers where to come.',
            icon: 'gps',
            link: { href: '#/location', label: 'Open my coordinates' }
          },
          {
            title: 'Protect yourself from the cold',
            instruction: 'Put on wind and waterproof layers, hat and gloves before you get cold.',
            explanation: 'Wind and wet strip heat quickly, and it is hard to warm up again once chilled.',
            icon: 'cold'
          },
          {
            title: 'Keep the group together',
            instruction: 'Stay within sight and voice of each other at all times.',
            explanation: 'Count the group regularly. Put the slowest person near the front.',
            icon: 'users'
          },
          {
            title: 'Retreat or wait',
            instruction: 'Go back only along a route you can follow with certainty. Otherwise shelter and wait for visibility.',
            explanation: 'Call the emergency services if you are stuck, getting cold, or night is approaching.',
            icon: 'route'
          }
        ]
      },
      wind: {
        title: 'Strong wind or heavy rain',
        steps: [
          {
            title: 'Get lower, out of the wind',
            instruction: 'Leave ridges and exposed slopes and move to sheltered, lower ground.',
            explanation: 'Gusts can knock you off balance on narrow or steep ground.',
            icon: 'wind'
          },
          {
            title: 'Stay dry and warm',
            instruction: 'Put on waterproofs, hat and gloves now, before you are soaked.',
            explanation: 'Wet clothing combined with wind cools the body very quickly, even well above freezing.',
            icon: 'cold'
          },
          {
            title: 'Respect the water',
            instruction: 'Do not cross fast or rising streams, and stay out of gullies and dry river beds.',
            explanation: 'Water levels can rise suddenly during heavy rain. Wait, or find another way.',
            icon: 'droplet'
          },
          {
            title: 'Cut the route short',
            instruction: 'Turn back or take the quickest safe way down.',
            explanation: 'Watch for falling branches and loose rock. Conditions on the way down may be worse than on the way up.',
            icon: 'route'
          }
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'hypothermia',
    title: 'Hypothermia',
    short: 'Dangerous cooling of the body',
    icon: 'cold',
    question: 'How is the cold person?',
    options: [
      { path: 'severe', label: 'Confused, drowsy or no longer shivering', detail: 'Slurred speech, stumbling, very sleepy or unresponsive', icon: 'alert', urgent: true },
      { path: 'mild', label: 'Shivering but alert', detail: 'Awake, talking normally, able to walk', icon: 'cold' },
      { path: 'self', label: 'I am getting very cold myself', detail: 'I want to stop it getting worse', icon: 'warm' }
    ],
    paths: {
      severe: {
        title: 'Severe hypothermia',
        steps: [
          {
            title: 'Call for emergency help',
            instruction: 'Call the emergency services now. This is a medical emergency.',
            explanation: 'Confusion, drowsiness or shivering that has stopped in a cold person are signs that the body can no longer warm itself.',
            icon: 'phone'
          },
          {
            title: 'Handle very gently',
            instruction: 'Keep the person lying flat and move them as little and as gently as possible.',
            explanation: 'Rough handling can disturb the heart of a very cold person. Do not make them walk.',
            icon: 'hand'
          },
          {
            title: 'Stop further heat loss',
            instruction: 'Insulate them from the ground, wrap them in dry layers and cover everything with a windproof, waterproof outer layer.',
            explanation: 'Cover the head and neck. Remove wet clothing only if you have dry replacements and shelter from the wind.',
            ill: 'wrapLayers'
          },
          {
            title: 'What not to do',
            instruction: 'Do not give food or drink to someone who is not fully alert. Do not rub their limbs. Never give alcohol.',
            explanation: 'They could choke, and rubbing or rapid heating can be harmful.',
            icon: 'alert'
          },
          {
            title: 'Watch their breathing',
            instruction: 'Check breathing carefully for up to one minute. If there is none and you are trained, start CPR.',
            explanation: 'Breathing and pulse can be very slow and faint in deep cold. Continue until help arrives.',
            icon: 'activity'
          }
        ]
      },
      mild: {
        title: 'Mild hypothermia',
        steps: [
          {
            title: 'Get out of the wind and wet',
            instruction: 'Move the person to shelter straight away.',
            explanation: 'Stopping the heat loss comes first. Behind rocks, in forest, or inside a tent or hut.',
            icon: 'wind'
          },
          {
            title: 'Dry layers',
            instruction: 'Replace wet clothing with dry layers. If you have none, cover the wet clothing with a windproof layer.',
            explanation: 'Wet clothes keep pulling heat away from the body.',
            icon: 'cold'
          },
          {
            title: 'Insulate',
            instruction: 'Sit or lay the person on a mat or backpack and wrap them, including head and hands.',
            explanation: 'The ground takes a lot of heat. An emergency blanket works best as the outer layer over insulation.',
            ill: 'wrapLayers'
          },
          {
            title: 'Warm drink and food',
            instruction: 'If they are fully alert and can swallow, give warm sweet drinks and high-energy food.',
            explanation: 'Shivering burns a lot of energy. Do not give alcohol.',
            icon: 'warm'
          },
          {
            title: 'Warm gently',
            instruction: 'Place warm (not hot) water bottles, wrapped in cloth, against the chest and armpits.',
            explanation: 'Never put heat directly on bare skin. Do not rub arms and legs.',
            icon: 'hand'
          },
          {
            title: 'Keep watching',
            instruction: 'Call the emergency services if they do not improve, or become confused, drowsy or stop shivering.',
            explanation: 'Do not continue the hike. A person who has been hypothermic cools down again very easily.',
            icon: 'phone'
          }
        ]
      },
      self: {
        title: 'Getting too cold',
        steps: [
          {
            title: 'Act now',
            instruction: 'Stop and deal with the cold while you can still think and use your hands.',
            explanation: 'Clumsy fingers, stumbling and poor decisions arrive quickly once you are chilled.',
            icon: 'alert'
          },
          {
            title: 'Shelter and layers',
            instruction: 'Get out of the wind and put on every dry layer, plus hat and gloves.',
            explanation: 'Change out of wet clothing next to the skin if you have something dry.',
            icon: 'cold'
          },
          {
            title: 'Eat and drink',
            instruction: 'Eat high-energy food and drink, warm if possible.',
            explanation: 'Your body needs fuel to produce heat.',
            icon: 'warm'
          },
          {
            title: 'Decide early',
            instruction: 'Head down by the easiest route while you can still move well. Tell your companions how you feel.',
            explanation: 'If you are alone and getting worse, stay sheltered and insulated rather than exhausting yourself.',
            icon: 'route'
          },
          {
            title: 'Call for help if it gets worse',
            instruction: 'Call the emergency services if shivering becomes violent or stops, or if you stumble or cannot think clearly.',
            explanation: 'Give your coordinates and stay sheltered, insulated from the ground.',
            icon: 'phone'
          }
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'heat',
    title: 'Dehydration / Heat',
    short: 'Thirst, heat exhaustion, heatstroke',
    icon: 'heat',
    question: 'What are the signs?',
    options: [
      { path: 'heatstroke', label: 'Confused, collapsed or very hot', detail: 'Not making sense, fainting, seizure, hot skin', icon: 'alert', urgent: true },
      { path: 'exhaustion', label: 'Weak, dizzy, heavy sweating', detail: 'Headache, nausea, cramps, very tired', icon: 'heat' },
      { path: 'dehydration', label: 'Very thirsty', detail: 'Dry mouth, dark urine, mild headache', icon: 'droplet' }
    ],
    paths: {
      heatstroke: {
        title: 'Possible heatstroke',
        steps: [
          {
            title: 'Call for emergency help',
            instruction: 'Call the emergency services now. Heatstroke is life-threatening.',
            explanation: 'Confusion, collapse or a seizure in a hot person means the body can no longer control its temperature.',
            icon: 'phone'
          },
          {
            title: 'Shade and loosen clothing',
            instruction: 'Move the person into shade and remove outer and tight clothing.',
            explanation: 'Create shade with a jacket or blanket if there is none.',
            icon: 'cloud'
          },
          {
            title: 'Cool as fast as you can',
            instruction: 'Soak their skin and clothes with water and fan them continuously.',
            explanation: 'Rapid cooling is the most important treatment. If cold water such as a stream is safely available, immersing the body up to the neck cools fastest; keep the head above water and hold them at all times.',
            ill: 'coolingPoints'
          },
          {
            title: 'Protect the airway',
            instruction: 'Do not give drinks to someone who is not fully alert. If they are unconscious but breathing, turn them on their side.',
            explanation: 'A drowsy person can choke on fluids. Lying on the side keeps the airway clear.',
            icon: 'alert'
          },
          {
            title: 'Keep cooling until help arrives',
            instruction: 'Continue cooling and watch their breathing.',
            explanation: 'If they stop breathing normally and you are trained, start CPR.',
            icon: 'activity'
          }
        ]
      },
      exhaustion: {
        title: 'Heat exhaustion',
        steps: [
          {
            title: 'Stop and find shade',
            instruction: 'Stop all effort and move to a cool, shaded place.',
            explanation: 'Heat exhaustion can turn into heatstroke if the person keeps going.',
            icon: 'cloud'
          },
          {
            title: 'Lie down',
            instruction: 'Lay the person down, raise their feet slightly and remove unnecessary clothing.',
            explanation: 'This helps blood flow and lets heat escape.',
            icon: 'hand'
          },
          {
            title: 'Drink',
            instruction: 'Give water or a rehydration drink in regular sips.',
            explanation: 'A sports drink or a salty snack with water helps replace the salt lost in sweat.',
            icon: 'droplet'
          },
          {
            title: 'Cool the skin',
            instruction: 'Wet the skin with water and fan it. Put cool packs wrapped in cloth on the neck and armpits.',
            explanation: 'Evaporating water carries heat away from the body.',
            ill: 'coolingPoints'
          },
          {
            title: 'Check after 30 minutes',
            instruction: 'Stay with them. If they are not better within 30 minutes, or get worse, call the emergency services.',
            explanation: 'Confusion, fainting or no longer sweating while still hot are emergency signs.',
            icon: 'phone'
          }
        ]
      },
      dehydration: {
        title: 'Dehydration',
        steps: [
          {
            title: 'Rest in the shade',
            instruction: 'Stop, sit in the shade and loosen your clothing.',
            explanation: 'Continuing to exert yourself makes you lose more water.',
            icon: 'cloud'
          },
          {
            title: 'Drink in small sips',
            instruction: 'Drink water little and often rather than all at once.',
            explanation: 'Small regular sips are absorbed better and are easier on the stomach.',
            icon: 'droplet'
          },
          {
            title: 'Replace salts',
            instruction: 'Have an oral rehydration drink, a sports drink or a salty snack if you have one.',
            explanation: 'Sweat removes salt as well as water.',
            icon: 'backpack'
          },
          {
            title: 'Plan your water',
            instruction: 'Work out how much water remains and where you can safely refill, then shorten the route if needed.',
            explanation: 'Walk in the cooler parts of the day. Treat or filter water from streams when you can.',
            icon: 'route'
          },
          {
            title: 'Get help if it worsens',
            instruction: 'Call the emergency services if there is confusion, fainting, or the person cannot keep fluids down.',
            explanation: 'Children and older people become dehydrated faster.',
            icon: 'phone'
          }
        ]
      }
    }
  }
];

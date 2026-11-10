/*
 * Survival skills lessons (English). PROTOTYPE CONTENT — see REFERENCES.md.
 *
 * lesson  = { id, title, short, icon, minutes, intro, ill?, sections[], quiz }
 * section = { heading, points[] }
 * quiz    = { question, options[{ text, correct?, why }] }
 */
export default [
  {
    id: 'compass',
    title: 'Compass basics',
    short: 'Take and follow a bearing',
    icon: 'compass',
    minutes: 3,
    intro: 'A compass needs no battery and no signal. Learn the three moves below before you need them.',
    ill: 'compass',
    sections: [
      {
        heading: 'Know the parts',
        points: [
          'The magnetic needle: its red end points to magnetic north.',
          'The rotating ring (bezel), marked from 0 to 360 degrees.',
          'The direction-of-travel arrow on the baseplate: it points where you will walk.'
        ]
      },
      {
        heading: 'Take a bearing',
        points: [
          'Hold the compass flat and point the direction-of-travel arrow at your target.',
          'Turn the ring until the outlined orienting arrow sits exactly under the red needle.',
          'Read the number at the index line. That is your bearing.'
        ]
      },
      {
        heading: 'Follow a bearing',
        points: [
          'Turn your whole body until the red needle sits in the orienting arrow again.',
          'Pick a landmark in line with the travel arrow, walk to it, and repeat.',
          'In fog, send a companion ahead as your landmark.'
        ]
      },
      {
        heading: 'Keep it accurate',
        points: [
          'Hold the compass away from phones, metal poles, magnets and vehicles.',
          'Magnetic north and map north differ by a small angle (declination). The value for your area is printed on good maps.'
        ]
      }
    ],
    quiz: {
      question: 'What does the red end of the needle point to?',
      options: [
        { text: 'Magnetic north', correct: true, why: 'Correct. The needle always swings to magnetic north, wherever you are heading.' },
        { text: 'Your destination', why: 'Not quite. The direction-of-travel arrow points to your destination; the needle points to magnetic north.' },
        { text: 'The nearest trail', why: 'No. The needle reacts only to the Earth\'s magnetic field and points to magnetic north.' }
      ]
    }
  },
  {
    id: 'map',
    title: 'Reading a map',
    short: 'Contours, scale and orientation',
    icon: 'map',
    minutes: 3,
    intro: 'A paper map shows the shape of the land at a glance and never runs out of battery.',
    ill: 'contours',
    sections: [
      {
        heading: 'Contour lines',
        points: [
          'Each brown line joins points at the same height.',
          'Lines close together mean steep ground. Lines far apart mean gentle ground.',
          'Closed rings show a summit. V-shapes pointing uphill show a valley or stream.'
        ]
      },
      {
        heading: 'Scale',
        points: [
          'On a 1:25 000 map, 4 cm on the map is 1 km on the ground.',
          'On a 1:50 000 map, 2 cm on the map is 1 km on the ground.',
          'Steep climbs take much longer than the distance suggests.'
        ]
      },
      {
        heading: 'Orient the map',
        points: [
          'Turn the map until its north edge points to north on your compass.',
          'Now what is on your left on the map is on your left on the ground.',
          'Match two or three features (a peak, a stream, a junction) to confirm where you are.'
        ]
      },
      {
        heading: 'Before you leave',
        points: [
          'Learn the symbols for paths, cliffs, water and huts in the legend.',
          'Mark your route, escape routes and water points.'
        ]
      }
    ],
    quiz: {
      question: 'Contour lines are packed very close together. What does that tell you?',
      options: [
        { text: 'The slope is steep', correct: true, why: 'Correct. The closer the lines, the steeper the ground.' },
        { text: 'The ground is flat', why: 'No. Flat or gentle ground has lines that are far apart.' },
        { text: 'There is a forest', why: 'No. Vegetation is shown by colour or symbols, not by contour spacing.' }
      ]
    }
  },
  {
    id: 'weather',
    title: 'Recognizing dangerous weather',
    short: 'Read the sky and act early',
    icon: 'cloud',
    minutes: 2,
    intro: 'Mountain weather changes faster than in the valley, and it is colder and windier the higher you go.',
    sections: [
      {
        heading: 'Warning signs',
        points: [
          'Clouds growing tall and dark quickly, especially in the afternoon.',
          'A sudden change in wind, or a sharp drop in temperature.',
          'Cloud lowering onto ridges and summits.',
          'Thunder, even far away.'
        ]
      },
      {
        heading: 'What to do',
        points: [
          'Start going down as soon as you notice the signs. Do not wait for rain.',
          'If you hear thunder, leave ridges and summits immediately.',
          'Put on warm and waterproof layers before you are cold or wet.'
        ]
      },
      {
        heading: 'Plan for it',
        points: [
          'Check a mountain weather forecast for the right altitude before you leave.',
          'Start early and set a turnaround time.',
          'Know the shorter ways down from your route.'
        ]
      }
    ],
    quiz: {
      question: 'You are on a ridge and hear thunder in the distance. What do you do?',
      options: [
        { text: 'Start descending to lower ground now', correct: true, why: 'Correct. If you can hear thunder you are within reach of lightning.' },
        { text: 'Wait until you see lightning', why: 'No. By then the storm is already dangerously close.' },
        { text: 'Shelter under a lone tree', why: 'No. Isolated trees are frequently struck and are one of the most dangerous places to be.' }
      ]
    }
  },
  {
    id: 'warm',
    title: 'Staying warm',
    short: 'Layers, dryness and fuel',
    icon: 'warm',
    minutes: 2,
    intro: 'Staying warm is mostly about staying dry and out of the wind.',
    ill: 'wrapLayers',
    sections: [
      {
        heading: 'Three layers',
        points: [
          'Base layer next to the skin: moves sweat away. Avoid cotton, which stays wet.',
          'Middle layer: traps warm air (fleece, wool, insulated jacket).',
          'Outer shell: blocks wind and rain.'
        ]
      },
      {
        heading: 'Stay dry',
        points: [
          'Remove a layer before you sweat heavily on climbs.',
          'Add a layer as soon as you stop.',
          'Keep a dry spare layer in a waterproof bag.'
        ]
      },
      {
        heading: 'Protect and fuel',
        points: [
          'Cover head, neck and hands: they lose heat quickly.',
          'Sit on your backpack or a mat, never directly on snow or cold rock.',
          'Eat and drink regularly. Your body needs fuel to make heat.'
        ]
      }
    ],
    quiz: {
      question: 'When should you take off a layer during a climb?',
      options: [
        { text: 'Before you start to sweat heavily', correct: true, why: 'Correct. Sweat-soaked clothing chills you as soon as you stop.' },
        { text: 'Only at the summit', why: 'No. By then your layers are wet and you will cool down fast.' },
        { text: 'Never, more layers are always better', why: 'No. Overheating makes clothing wet, and wet clothing loses its warmth.' }
      ]
    }
  },
  {
    id: 'signaling',
    title: 'Emergency signaling',
    short: 'Be seen and be heard',
    icon: 'signal',
    minutes: 3,
    intro: 'Rescuers must be able to find you. Sound, light and colour all help.',
    ill: 'whistle',
    sections: [
      {
        heading: 'Whistle or light',
        points: [
          'Alpine distress signal: six signals within one minute, then one minute of silence. Repeat.',
          'The reply is three signals within one minute.',
          'Three repeated signals of any kind are also widely understood as a call for help.',
          'A whistle carries much further than your voice and costs no energy.'
        ]
      },
      {
        heading: 'Be visible',
        points: [
          'Spread bright clothing or an emergency blanket on open ground.',
          'At night, use a headlamp or phone light.',
          'Stay in the open where a helicopter or search team can see you, if it is safe.'
        ]
      },
      {
        heading: 'Helicopter',
        points: [
          'Both arms raised in a "Y" means: Yes, we need help.',
          'One arm up and one arm down means: No, we do not need help.',
          'Secure loose items, stay low and do not approach until the crew signals you.'
        ]
      },
      {
        heading: 'Phone',
        points: [
          'Call the emergency number for the country you are in and give your coordinates.',
          'Then save battery: lower the brightness and keep the phone warm.',
          'Stay where you said you were.'
        ]
      }
    ],
    quiz: {
      question: 'What is the alpine distress signal?',
      options: [
        { text: 'Six signals in a minute, then a one-minute pause', correct: true, why: 'Correct. Repeat it until you get the reply: three signals in a minute.' },
        { text: 'One long continuous whistle', why: 'No. A pattern is needed so it cannot be mistaken for a random noise.' },
        { text: 'Two signals every ten minutes', why: 'No. The alpine signal is six per minute followed by a minute of silence.' }
      ]
    }
  },
  {
    id: 'backpack',
    title: 'Preparing a hiking backpack',
    short: 'The essentials, packed well',
    icon: 'backpack',
    minutes: 3,
    intro: 'Pack for the day going wrong, not for the day going to plan.',
    sections: [
      {
        heading: 'The ten essentials',
        points: [
          'Navigation: map, compass and a charged phone.',
          'Light: headlamp with spare batteries.',
          'Sun protection: sunglasses, sunscreen, hat.',
          'First-aid kit.',
          'Knife or multi-tool and repair tape.',
          'Fire: lighter or waterproof matches.',
          'Emergency shelter: bivvy bag or reflective blanket.',
          'Extra food.',
          'Extra water, and a way to treat more.',
          'Extra clothing: warm layer, waterproof, hat and gloves.'
        ]
      },
      {
        heading: 'Pack it well',
        points: [
          'Heavy items close to your back and in the middle.',
          'Waterproof jacket and first-aid kit at the top, where you can reach them.',
          'Whistle attached to a shoulder strap.',
          'Line the pack with a waterproof bag.'
        ]
      }
    ],
    quiz: {
      question: 'Which items should you be able to reach without unpacking?',
      options: [
        { text: 'Waterproof jacket and first-aid kit', correct: true, why: 'Correct. You need them quickly, often in bad conditions.' },
        { text: 'Spare socks and extra food', why: 'Useful, but they can sit deeper. Rain gear and first aid are needed fast.' },
        { text: 'Nothing, the order does not matter', why: 'It does matter: in a storm or an accident, seconds and dry hands count.' }
      ]
    }
  },
  {
    id: 'practices',
    title: 'Safe hiking practices',
    short: 'Habits that prevent emergencies',
    icon: 'shield',
    minutes: 2,
    intro: 'Most mountain emergencies start with small decisions made hours earlier.',
    sections: [
      {
        heading: 'Plan honestly',
        points: [
          'Choose a route that suits the least experienced person in the group.',
          'Start early.',
          'Set a turnaround time and respect it, even close to the top.'
        ]
      },
      {
        heading: 'On the trail',
        points: [
          'Stay together and wait at every junction.',
          'Stay on marked paths.',
          'Eat and drink a little, often.',
          'Deal with hot spots on your feet before they become blisters.'
        ]
      },
      {
        heading: 'Keep checking',
        points: [
          'Watch the sky, the time and how everyone is feeling.',
          'Turn back early when weather, snow, water levels or energy are worse than expected.',
          'Most accidents happen on the way down: stay focused until the end.'
        ]
      }
    ],
    quiz: {
      question: 'Your turnaround time arrives and the summit is 30 minutes away. What now?',
      options: [
        { text: 'Turn back', correct: true, why: 'Correct. The turnaround time exists to keep enough daylight and energy for the descent.' },
        { text: 'Continue quickly to the top', why: 'No. Rushing while tired, then descending late, is a classic route to an accident.' },
        { text: 'Split the group so the fast ones can go', why: 'No. Splitting the group creates two weaker parties and is a common cause of people going missing.' }
      ]
    }
  },
  {
    id: 'remote',
    title: 'Before entering remote terrain',
    short: 'Tell, check, prepare',
    icon: 'route',
    minutes: 2,
    intro: 'In remote terrain, help can be hours away and your phone may have no signal.',
    sections: [
      {
        heading: 'Leave a trip plan',
        points: [
          'Tell a trusted person your route, who is with you and where you parked.',
          'Give a return time and the time at which they should raise the alarm.',
          'Tell them when you are back.'
        ]
      },
      {
        heading: 'Check conditions',
        points: [
          'Mountain weather forecast.',
          'Avalanche bulletin in snow season.',
          'Hours of daylight and trail closures.'
        ]
      },
      {
        heading: 'Prepare to be out of contact',
        points: [
          'Find out and save the emergency number for the country you are in.',
          'Save this guide and your maps for offline use while you still have a connection.',
          'Charge your phone and carry a power bank.',
          'For very remote trips, consider a satellite messenger or personal locator beacon.'
        ]
      },
      {
        heading: 'Know your exits',
        points: [
          'Note escape routes, huts and water sources along the way.',
          'Know the point after which going on is quicker than going back.'
        ]
      }
    ],
    quiz: {
      question: 'What is the most useful thing to leave with a trusted contact?',
      options: [
        { text: 'Your route and the time to raise the alarm', correct: true, why: 'Correct. It tells rescuers where to look and when to start.' },
        { text: 'A photo of your equipment', why: 'It may help, but without a route and a time nobody knows where or when to search.' },
        { text: 'Nothing if you carry a phone', why: 'No. Phones lose signal and battery; a trip plan works regardless.' }
      ]
    }
  }
];

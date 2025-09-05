export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const BASIC_RIGHTS = {
  en: [
    "You have the right to remain silent",
    "You have the right to refuse searches without a warrant",
    "You have the right to ask if you are free to leave",
    "You have the right to an attorney",
    "You have the right to record police interactions in public"
  ],
  es: [
    "Tienes derecho a permanecer en silencio",
    "Tienes derecho a rechazar registros sin una orden judicial",
    "Tienes derecho a preguntar si eres libre de irte",
    "Tienes derecho a un abogado",
    "Tienes derecho a grabar interacciones policiales en público"
  ]
};

export const EMERGENCY_SCRIPTS = {
  en: {
    whatToSay: [
      "I am exercising my right to remain silent",
      "I do not consent to any searches",
      "Am I free to leave?",
      "I want to speak to a lawyer"
    ],
    whatNotToSay: [
      "Don't argue or resist physically",
      "Don't lie or provide false information",
      "Don't consent to searches",
      "Don't answer questions without a lawyer"
    ]
  },
  es: {
    whatToSay: [
      "Estoy ejerciendo mi derecho a permanecer en silencio",
      "No consiento ningún registro",
      "¿Soy libre de irme?",
      "Quiero hablar con un abogado"
    ],
    whatNotToSay: [
      "No discutas o resistas físicamente",
      "No mientas o proporciones información falsa",
      "No consientas registros",
      "No respondas preguntas sin un abogado"
    ]
  }
};

export const PRICING = {
  basicScript: 0.50,
  detailedGuide: 1.00,
  stateSpecificGuide: 2.00,
  premiumAccess: 5.00
};

export const MOCK_LEGAL_GUIDES = [
  {
    guideId: '1',
    state: 'California',
    language: 'en' as const,
    content: 'California-specific legal rights and procedures...',
    scripts: {
      whatToSay: EMERGENCY_SCRIPTS.en.whatToSay,
      whatNotToSay: EMERGENCY_SCRIPTS.en.whatNotToSay
    }
  },
  {
    guideId: '2',
    state: 'Texas',
    language: 'en' as const,
    content: 'Texas-specific legal rights and procedures...',
    scripts: {
      whatToSay: EMERGENCY_SCRIPTS.en.whatToSay,
      whatNotToSay: EMERGENCY_SCRIPTS.en.whatNotToSay
    }
  }
];

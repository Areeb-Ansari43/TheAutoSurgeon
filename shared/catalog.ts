export const business = {
  name: "The Auto Surgeon",
  phone: "07767 909397",
  tel: "tel:07767909397",
  whatsapp: "https://wa.me/447767909397",
  email: "admin@theautosurgeon.co.uk",
  address: "Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ",
  maps: "https://www.google.com/maps/search/?api=1&query=Unit+3+Squirrels+Trading+Estate+Viveash+Close+Hayes+UB3+4RZ",
};

export type Service = {
  slug: string;
  name: string;
  bookingName: string;
  short: string;
  image: string;
  price: number;
  priceLabel: string;
  timing: string;
  tag: string;
  intro: string;
  symptoms: string[];
  includes: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "tyre-fitting",
    name: "Tyre Fitting",
    bookingName: "Tyre Fitting",
    short:
      "From everyday journeys to performance driving. The right tyres, fitted properly.",
    image: "tyre-dunlop-dark",
    price: 10,
    priceLabel: "Puncture repair from",
    timing: "Time confirmed with your quote",
    tag: "EVERY BUDGET",
    intro:
      "Your tyres are the only part of your car touching the road. We help you choose the right size, load rating and tyre type for your vehicle, then fit and balance them in-house. Choose budget, mid-range, premium, performance or run-flat options.",
    symptoms: [
      "Tread wearing low or unevenly",
      "A slow puncture or repeated pressure loss",
      "Cracks, cuts or a bulge in the sidewall",
      "Vibration after a tyre change",
    ],
    includes: [
      "Tyre size and specification check",
      "Advice on the options for your driving and budget",
      "Professional fitting and wheel balancing",
      "Valve and pressure checks",
      "Puncture assessment where suitable",
    ],
    process: [
      "We inspect your tyre and confirm the correct specification.",
      "You approve the tyre choice and full fitted quote before work begins.",
      "We fit, balance and set pressure to your vehicle's requirements.",
    ],
    faqs: [
      {
        question: "Can every puncture be repaired?",
        answer:
          "No. Repair depends on where the damage is, its size and the tyre's condition. Sidewall damage, bulges and some run-flat damage may need replacement. We inspect first.",
      },
      {
        question: "Does £10 include a new tyre?",
        answer:
          "No. £10 is the starting price for a suitable puncture repair. Replacement tyres are quoted by size, brand and specification.",
      },
    ],
  },
  {
    slug: "wheel-alignment",
    name: "Wheel Alignment",
    bookingName: "Wheel Alignment",
    short:
      "Precision four-wheel alignment. Straighter steering. More life from your tyres.",
    image: "wheel-alignment",
    price: 50,
    priceLabel: "Labour from",
    timing: "Typically around 45 minutes",
    tag: "PRECISION SETUP",
    intro:
      "A pothole, kerb impact or worn suspension can leave your wheels pointing in the wrong direction. Our four-wheel alignment checks your geometry against the vehicle's specification and helps restore predictable handling and even tyre wear.",
    symptoms: [
      "The car pulls to one side",
      "Steering wheel sits off-centre on a straight road",
      "Tyres wear more on one edge",
      "Recent pothole or kerb impact",
    ],
    includes: [
      "Initial tyre and suspension condition checks",
      "Four-wheel geometry measurement",
      "Adjustments within the vehicle's available settings",
      "Steering-centre check",
      "Explanation of any wear or seized components",
    ],
    process: [
      "We check for faults that could prevent a correct alignment.",
      "Wheel geometry is measured against the manufacturer's settings.",
      "We adjust what is available and explain the final result.",
    ],
    faqs: [
      {
        question: "Is alignment the same as balancing?",
        answer:
          "No. Alignment changes wheel angles; balancing corrects weight distribution around a wheel. Vibration and pulling can have different causes, so an inspection helps choose the right work.",
      },
      {
        question: "What if a suspension part is worn?",
        answer:
          "We will explain the fault and quote any necessary repair separately. Worn components may need replacement before the alignment can hold correctly.",
      },
    ],
  },
  {
    slug: "brake-service",
    name: "Brake Service",
    bookingName: "Brake Pads",
    short:
      "Pads, discs and thorough checks. Confidence every time you slow down.",
    image: "hero-orange-caliper",
    price: 30,
    priceLabel: "Labour from",
    timing: "Timing depends on vehicle and work",
    tag: "SAFETY FIRST",
    intro:
      "Brake work starts with understanding the fault, not just replacing parts. We inspect pads and discs, discuss suitable replacements and quote the labour and parts before carrying out the approved work.",
    symptoms: [
      "Squealing or grinding when braking",
      "Vibration through the pedal or steering",
      "A brake warning light",
      "A changed pedal feel or longer stopping distance",
    ],
    includes: [
      "Pad and disc condition inspection",
      "Front or rear pad replacement as quoted",
      "Disc and pad replacement where needed",
      "Checks for uneven wear or related faults",
      "Advice on bedding in new braking components",
    ],
    process: [
      "We inspect the braking system and identify what needs attention.",
      "We confirm the parts and labour quote with you.",
      "Approved components are replaced and the brake operation checked.",
    ],
    faqs: [
      {
        question: "What are the labour prices?",
        answer:
          "Brake pads start at £30 labour. Front discs and pads are £50 labour, and rear discs and pads are £50 labour. Parts are quoted separately.",
      },
      {
        question: "Is it safe to drive with a brake problem?",
        answer:
          "If braking performance changes, the pedal feels abnormal or you hear grinding, stop safely and seek professional advice. Do not rely on an online booking if the vehicle may be unsafe.",
      },
    ],
  },
  {
    slug: "engine-oil",
    name: "Engine Oil Service",
    bookingName: "Engine Oil Service",
    short:
      "Grade-correct oil and filter replacement. Protect what powers your drive.",
    image: "engine-oil-pour",
    price: 30,
    priceLabel: "Labour from",
    timing: "Timing confirmed for your vehicle",
    tag: "ENGINE CARE",
    intro:
      "Fresh oil helps protect the moving parts in your engine. We use the specification suitable for your vehicle rather than a one-grade-fits-all approach, and explain which oil-service option is appropriate before work begins.",
    symptoms: [
      "Oil service is due by time or mileage",
      "A service reminder on the dashboard",
      "Oil level regularly needs checking",
      "An uncertain maintenance history",
    ],
    includes: [
      "Vehicle-specific oil specification check",
      "Engine oil replacement as quoted",
      "Oil filter replacement within the agreed service",
      "Final oil-level check",
      "Explanation of the agreed service scope",
    ],
    process: [
      "We confirm your vehicle and the oil specification it needs.",
      "You receive a quote for labour, oil and filter.",
      "We complete the agreed service and check the final level.",
    ],
    faqs: [
      {
        question: "What does a full oil service include?",
        answer:
          "The original labour prices are £30 for engine oil service and £50 for full oil service. We confirm the exact checks, oil and filter supplied for your vehicle when quoting; this is not automatically a full manufacturer scheduled service.",
      },
      {
        question: "How often should oil be changed?",
        answer:
          "Follow the vehicle manufacturer's time and mileage schedule. Engine type, oil specification and driving conditions can change the interval.",
      },
    ],
  },
  {
    slug: "diagnostics",
    name: "Auto Diagnostics",
    bookingName: "Auto Diagnostics",
    short:
      "Warning light? Find the cause with fault-code scanning and live-data analysis.",
    image: "diagnostics-tablet",
    price: 30,
    priceLabel: "Diagnostic scan from",
    timing: "Depends on the fault investigation",
    tag: "KNOW THE CAUSE",
    intro:
      "A warning light is a starting point, not a diagnosis. We read available fault codes and live data to help identify the problem, discuss any further investigation needed and quote repairs separately.",
    symptoms: [
      "An engine or system warning light",
      "Rough running or hesitation",
      "An intermittent fault",
      "Unexpected loss of power",
    ],
    includes: [
      "OBD-II diagnostic scan where supported",
      "Fault-code reading and explanation",
      "Relevant live-data checks",
      "Advice on next diagnostic steps",
      "Separate quote before approved repairs",
    ],
    process: [
      "Tell us what happened, when it started and which warning appeared.",
      "We scan supported systems and compare the information with your symptoms.",
      "We explain findings and any further testing or repair options.",
    ],
    faqs: [
      {
        question: "Will a scan immediately identify the faulty part?",
        answer:
          "Not always. A code describes a detected condition and may have several causes. Further testing can be needed before a part should be replaced.",
      },
      {
        question: "Should I keep driving with a warning light?",
        answer:
          "Check your handbook. Stop safely for a red warning, overheating, oil-pressure warning or serious change in how the vehicle drives. Contact the workshop or roadside assistance rather than waiting for a booking response.",
      },
    ],
  },
  {
    slug: "tesla-alignment",
    name: "Tesla Specialist",
    bookingName: "Tesla Wheel Alignment",
    short:
      "Tesla wheel alignment, with the right settings and EV-aware workshop care.",
    image: "tesla-wheel",
    price: 60,
    priceLabel: "Alignment labour from",
    timing: "Timing confirmed for your model",
    tag: "EV-AWARE CARE",
    intro:
      "Tesla wheel alignment needs the correct vehicle-specific geometry and appropriate handling. We focus on tyres, steering geometry and the mechanical checks relevant to the alignment—not an unverified promise of high-voltage battery repair.",
    symptoms: [
      "Off-centre steering on a straight road",
      "Uneven tyre wear",
      "A change in handling after an impact",
      "New tyres needing a geometry check",
    ],
    includes: [
      "Tesla model and wheel specification check",
      "Tyre and relevant mechanical condition check",
      "Four-wheel alignment measurement",
      "Adjustment to the applicable settings",
      "Explanation of the results and limitations",
    ],
    process: [
      "We confirm your Tesla model and the reason for the visit.",
      "Tyres and geometry are checked before adjustments.",
      "We align to the applicable settings and discuss the result.",
    ],
    faqs: [
      {
        question: "Do you repair Tesla high-voltage batteries?",
        answer:
          "This website offers Tesla wheel alignment and related tyre or mechanical inquiries. High-voltage battery repairs and manufacturer authorisation are not represented as services here.",
      },
      {
        question: "What does the £60 price cover?",
        answer:
          "Tesla alignment labour starts at £60. Any worn parts or additional work are discussed and quoted separately before you approve them.",
      },
    ],
  },
];

export const labourPrices = [
  { name: "Brake Pads", price: 30, service: "Brake Pads", note: "Labour only" },
  {
    name: "Front Brake Discs & Pads",
    price: 50,
    service: "Front Brake Discs & Pads",
    note: "Labour only · front axle",
  },
  {
    name: "Rear Brake Discs & Pads",
    price: 50,
    service: "Rear Brake Discs & Pads",
    note: "Labour only · rear axle",
  },
  {
    name: "Engine Oil Service",
    price: 30,
    service: "Engine Oil Service",
    note: "Labour only",
  },
  {
    name: "Full Oil Service",
    price: 50,
    service: "Full Oil Service",
    note: "Scope confirmed with quote",
  },
  {
    name: "Gearbox Service",
    price: null,
    service: "Gearbox Service",
    note: "Inspect first, quote before work",
  },
  {
    name: "Tyre Puncture Repair",
    price: 10,
    service: "Tyre Puncture Repair",
    note: "Subject to repair suitability",
  },
  {
    name: "Front Suspension Arm",
    price: null,
    service: "Suspension Repair",
    note: "Parts and labour quoted",
  },
  {
    name: "Rear Suspension Arm",
    price: null,
    service: "Suspension Repair",
    note: "Parts and labour quoted",
  },
  {
    name: "TPMS Sensor Change",
    price: 60,
    service: "TPMS Sensor Change",
    note: "Including the part",
  },
  {
    name: "Wheel Alignment",
    price: 50,
    service: "Wheel Alignment",
    note: "Labour only",
  },
  {
    name: "Tesla Wheel Alignment",
    price: 60,
    service: "Tesla Wheel Alignment",
    note: "Labour only",
  },
];
export const bookingServices = [
  "Tyre Fitting",
  "Tyre Puncture Repair",
  "Wheel Alignment",
  "Tesla Wheel Alignment",
  "Brake Pads",
  "Front Brake Discs & Pads",
  "Rear Brake Discs & Pads",
  "Engine Oil Service",
  "Full Oil Service",
  "Auto Diagnostics",
  "TPMS Sensor Change",
  "Gearbox Service",
  "Suspension Repair",
  "MOT Inquiry",
  "Other",
] as const;
export const preferredTimes = [
  "09:30",
  "10:30",
  "11:30",
  "13:00",
  "14:00",
  "15:30",
  "16:30",
];

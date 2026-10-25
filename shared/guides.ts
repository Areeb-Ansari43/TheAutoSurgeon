export type GuideStep = {
  stepNumber: number;
  title: string;
  text: string;
};

export type GuideTrouble = {
  problem: string;
  mistake: string;
  fix: string;
};

export type GuideSubSection = {
  title: string;
  text: string;
};

export type GuideSection = {
  title: string;
  text: string;
  subsections?: GuideSubSection[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideInternalLink = {
  label: string;
  href: string;
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  readTime: string;
  relatedService: string;
  intro: string;
  sections: GuideSection[];
  steps?: GuideStep[];
  troubleshooting?: GuideTrouble[];
  safetyAndUkLaw?: string;
  faqs: GuideFaq[];
  internalLinks: GuideInternalLink[];
  conclusion: string;
};

export const guides: Guide[] = [
  {
    slug: "tyre-safety-checks",
    title: "Simple Tyre Safety Checks for Everyday Driving in Hayes",
    category: "Tyre care",
    summary:
      "A complete pre-journey routine for spotting tread wear, sidewall damage and pressure drops in Hayes before they turn into costly failures.",
    image: "/assets/photos/tyre-dunlop-dark.webp",
    readTime: "6 min read",
    relatedService: "Tyre Fitting",
    intro:
      "Your tyres are the only contact point between your vehicle and the road in Hayes. Ensuring correct inflation, safe tread depth, and structural integrity directly protects braking distance, aquaplaning resilience, and overall handling.",
    sections: [
      {
        title: "1. Visual Walk-Around & Sidewall Inspection",
        text: "Park your vehicle safely on level ground with the handbrake engaged. Turn the steering wheel to full lock to expose the inner and outer tread faces of the front tyres. Inspect all four tyres for cuts, bulges, cracks, exposed cord structure, or embedded nails and glass.",
        subsections: [
          {
            title: "Identifying Sidewall Bulges",
            text: "A bulge or egg-like bubble on the tyre sidewall indicates internal cord failure caused by pothole impacts or kerbing. Bulges cannot be safely repaired and require immediate tyre replacement.",
          },
          {
            title: "Checking for Perished or Cracked Rubber",
            text: "Fine cracking along the tread grooves or sidewalls is a sign of rubber degradation, common on low-mileage vehicles or tyres over 5 years old. Deep cracking compromises structural safety.",
          },
        ],
      },
      {
        title: "2. Legal Tread Depth & Wet Grip Thresholds",
        text: "In Great Britain, the law mandates a minimum tread depth of 1.6 mm across the central three-quarters of the tread width and around the entire outer circumference. However, braking efficiency in wet weather drops significantly below 3.0 mm.",
        subsections: [
          {
            title: "The 20p Coin Quick Check",
            text: "Insert a 20p coin into the main tread grooves. If the outer band of the coin is hidden, your tread is above the 1.6 mm legal minimum. If the band is visible, your tyres are illegal and unsafe.",
          },
        ],
      },
      {
        title: "3. Pressure Maintenance & Cold Checking Protocol",
        text: "Always check tyre pressures when the tyres are cold (driven less than 2 miles). Refer to the manufacturer label located inside the driver-side door frame or fuel filler cap for correct PSI/bar ratings.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Cold Pressure Measurement",
        text: "Remove the valve cap, press an accurate digital pressure gauge firmly onto the valve, and compare the reading against your door-jamb plaque.",
      },
      {
        stepNumber: 2,
        title: "Tread Depth Audit Across All Grooves",
        text: "Measure tread depth in three places across the central 75% zone on each tyre, checking for inner edge scrub.",
      },
      {
        stepNumber: 3,
        title: "Valve Stem & Cap Inspection",
        text: "Ensure plastic or metal valve caps are fitted tightly to exclude dirt and moisture from damaging the Schrader valve internal seal.",
      },
    ],
    troubleshooting: [
      {
        problem: "Tyre wearing heavily on both outer edges",
        mistake: "Ignoring recurring pressure loss and driving chronically under-inflated.",
        fix: "Inflate tyres to correct recommended pressure and check for slow punctures.",
      },
      {
        problem: "Tyre wearing heavily on the center strip only",
        mistake: "Over-inflating tyres thinking higher pressure improves fuel economy.",
        fix: "Reduce pressure to manufacturer specification.",
      },
      {
        problem: "Uneven wear on inner or outer shoulder face",
        mistake: "Assuming a simple tyre rebalance will fix uneven rubber consumption.",
        fix: "Schedule a 4-wheel laser alignment check at our Hayes workshop.",
      },
    ],
    safetyAndUkLaw:
      "UK Law: Driving with tyres below the legal 1.6 mm threshold carries a fine of up to £2,500 and 3 penalty points per illegal tyre (up to £10,000 and 12 points for all four). Spare tyres are not legally required to be carried, but if fitted on an axle they must meet all construction standards.",
    faqs: [
      {
        question: "Can sidewall damage or a tyre bulge be repaired in Hayes?",
        answer:
          "No. According to British Standard BS AU 159, repairs are strictly restricted to the central tread area. Sidewall damage weakens the structural carcass and requires a tyre replacement.",
      },
      {
        question: "How often should I check tyre pressures?",
        answer:
          "Check pressures at least once a month and prior to long journeys or carrying heavy luggage loads.",
      },
    ],
    internalLinks: [
      { label: "Book a Tyre Inspection or Replacement in Hayes", href: "/services/tyre-fitting" },
      { label: "Browse Tyre Brands & Budget Options", href: "/tyres" },
      { label: "Check Wheel Alignment Options", href: "/services/wheel-alignment" },
    ],
    conclusion:
      "Regular tyre safety checks take under five minutes but protect you from unexpected blowouts, costly driving penalties, and reduced wet braking performance. Contact The Auto Surgeon in Hayes for a comprehensive tyre inspection or instant quote.",
  },
  {
    slug: "warning-lights",
    title: "What to Do When a Dashboard Warning Light Appears",
    category: "Diagnostics",
    summary:
      "A safety-first diagnostic guide explaining amber vs red dashboard warnings, stored fault codes, and safe next steps in Hayes.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "7 min read",
    relatedService: "Auto Diagnostics",
    intro:
      "Modern vehicles feature dozens of sensors constantly monitored by onboard computers. When a fault is detected, a warning symbol illuminates on your dashboard to alert you before permanent mechanical damage occurs.",
    sections: [
      {
        title: "1. The Universal Dashboard Colour Code System",
        text: "Dashboard warning lights are color-coded in a traffic light system to communicate severity immediately.",
        subsections: [
          {
            title: "Red Warning Symbols: Critical Safety / Emergency",
            text: "Red lights indicate immediate danger—such as loss of engine oil pressure, brake system failure, engine overheating, or power steering loss. You must safely pull over and switch off the ignition immediately.",
          },
          {
            title: "Amber / Yellow Symbols: Non-Emergency System Warning",
            text: "Amber warnings indicate an active fault that requires diagnostic inspection soon—such as engine emissions issues (Check Engine), ABS malfunction, traction control fault, or DPF blockage.",
          },
        ],
      },
      {
        title: "2. Understanding Diagnostic Trouble Codes (DTCs)",
        text: "When a warning light appears, the engine control module (ECM) stores a diagnostic fault code (e.g. P0300 or P0420). Scanning these codes is the necessary first diagnostic step, followed by live data analysis.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Identify Colour & Symbol",
        text: "Note whether the symbol is Red (stop immediately) or Amber (schedule a diagnostic check). Note if the light is flashing.",
      },
      {
        stepNumber: 2,
        title: "Record Driving Symptoms",
        text: "Document any loss of power, limp home mode, unusual engine knocking, smoke, or pedal vibration.",
      },
      {
        stepNumber: 3,
        title: "Professional OBD-II Scan",
        text: "Visit our Hayes workshop for an electronic scan and diagnostic interpretation.",
      },
    ],
    troubleshooting: [
      {
        problem: "Flashing Check Engine Light (Amber)",
        mistake: "Continuing to drive at high speeds or under high load.",
        fix: "A flashing engine light indicates an active misfire that can destroy the catalytic converter. Reduce speed and visit the workshop immediately.",
      },
      {
        problem: "Red Oil Pressure Light Illuminated",
        mistake: "Topping up oil and driving without investigating pressure loss.",
        fix: "Stop immediately. Low oil pressure causes catastrophic engine breakdown within seconds.",
      },
    ],
    safetyAndUkLaw:
      "UK MOT Test Impact: Since 2018 UK MOT regulations state that an illuminated ABS, airbag, power steering, or main engine warning light results in an automatic MOT failure (Major Defect).",
    faqs: [
      {
        question: "Will disconnecting the battery clear my warning light permanently?",
        answer:
          "No. Disconnecting the battery may temporarily reset the light, but the fault code will return as soon as the onboard monitor runs its self-test. The root cause must be diagnosed and repaired.",
      },
      {
        question: "How long does a diagnostic scan take at The Auto Surgeon Hayes?",
        answer:
          "A full vehicle OBD-II scan and initial live data diagnostic report typically takes 30 to 45 minutes.",
      },
    ],
    internalLinks: [
      { label: "Book Diagnostic Check in Hayes", href: "/services/diagnostics" },
      { label: "View Labour Pricing", href: "/pricing" },
      { label: "Contact Workshop Directly", href: "/contact" },
    ],
    conclusion:
      "Don't ignore dashboard lights or rely on temporary resets. Address amber warnings promptly and treat red warnings as emergencies. Contact The Auto Surgeon in Hayes for professional diagnostic analysis.",
  },
  {
    slug: "wheel-alignment-signs",
    title: "Signs Your Vehicle Needs Wheel Alignment in Hayes",
    category: "Alignment",
    summary:
      "Spot steering pull, off-centre steering wheels and edge tyre wear early to save money on replacement rubber and restore driving handling.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "5 min read",
    relatedService: "Wheel Alignment",
    intro:
      "Potholes, speed bumps, and curb contact slowly knock your vehicle geometry out of alignment. Misaligned toe, camber, or caster angles accelerate tyre wear, reduce fuel economy, and compromise emergency vehicle stability.",
    sections: [
      {
        title: "1. Classic Symptoms of Wheel Misalignment",
        text: "Wheel alignment (tracking) measures and adjusts the angles at which your wheels meet the road and point relative to each other.",
        subsections: [
          {
            title: "Steering Wheel Pull or Drifting",
            text: "On a flat, level road, if your car drifts left or right when relaxing grip on the wheel, geometry angles are uneven.",
          },
          {
            title: "Off-Centre Steering Wheel",
            text: "When driving straight down a level highway, your steering wheel spokes should be perfectly level. An angled wheel indicates incorrect toe setting.",
          },
          {
            title: "Feathered or Shoulder Tyre Scrubbing",
            text: "Running your palm across the tyre tread: if rubber block edges feel sharp in one direction like saw teeth, toe misalignment is scrubbing rubber away.",
          },
        ],
      },
      {
        title: "2. The Difference Between Alignment and Balancing",
        text: "Wheel balancing corrects uneven weight distribution around a wheel assembly to prevent high-speed wheel vibration. Wheel alignment adjusts suspension angles to ensure wheels point straight and flat.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Inspect Tread Wear Uniformity",
        text: "Compare inner vs outer tread depth across all four tyres.",
      },
      {
        stepNumber: 2,
        title: "Test Steering Centre on Level Surface",
        text: "Observe wheel position while travelling straight on a level section of road.",
      },
      {
        stepNumber: 3,
        title: "4-Wheel Laser Geometry Check",
        text: "Have geometric angles measured against exact manufacturer tolerances at our Hayes workshop.",
      },
    ],
    troubleshooting: [
      {
        problem: "Car still pulls after 4-wheel alignment",
        mistake: "Assuming alignment alone can override a worn ball joint or sticking brake caliper.",
        fix: "Inspect suspension bushes, track rod ends, and brake drag before final alignment adjustment.",
      },
    ],
    safetyAndUkLaw:
      "Driving Safety: Misaligned tracking degrades high-speed emergency lane modification response and significantly increases wet road stopping distances.",
    faqs: [
      {
        question: "How much does wheel alignment cost in Hayes?",
        answer:
          "Standard 4-wheel alignment labour starts at £50 at The Auto Surgeon Hayes, while specialist Tesla alignment is £60.",
      },
      {
        question: "How long does a 4-wheel alignment take?",
        answer:
          "Alignment measurement and adjustment typically takes 40 to 50 minutes.",
      },
    ],
    internalLinks: [
      { label: "Book 4-Wheel Alignment in Hayes", href: "/services/wheel-alignment" },
      { label: "Tesla Alignment Services", href: "/services/tesla-alignment" },
      { label: "View Labour Prices", href: "/pricing" },
    ],
    conclusion:
      "Correct wheel alignment extends tyre life by thousands of miles and ensures safe, predictable handling. Visit The Auto Surgeon in Hayes for precision 4-wheel geometry alignment.",
  },
  {
    slug: "emergency-car-repair-hayes",
    title: "Emergency Car Repair in Hayes: Immediate Next Steps",
    category: "Emergency repairs",
    summary:
      "What to do when your car suffers a sudden breakdown, puncture, brake fault or red warning light in Hayes, West London.",
    image: "/assets/photos/hero-orange-caliper.webp",
    readTime: "6 min read",
    relatedService: "Auto Diagnostics",
    intro:
      "A sudden vehicle breakdown or critical red warning light on the road in Hayes requires immediate action to keep you and your passengers safe while securing rapid workshop repair assistance.",
    sections: [
      {
        title: "1. Roadside Safety Checklist",
        text: "If your car suffers a power loss, heavy puncture, smoke, or severe brake fault while driving around Hayes, follow essential emergency safety steps immediately.",
        subsections: [
          {
            title: "Safe Stopping Location",
            text: "Indicate clearly, pull off main traffic lanes onto a hard shoulder, layby, or quiet side street in Hayes, switch on hazard lights, and turn off the engine.",
          },
          {
            title: "Passenger Safety Protocols",
            text: "On busy roads or dual carriageways (such as the A312 Hayes Bypass or M4 junction), ensure all passengers exit through left doors and stand behind safety barriers.",
          },
        ],
      },
      {
        title: "2. Contacting The Auto Surgeon Hayes for Rapid Support",
        text: "Call our workshop line directly on 07767 909397. Describe exact vehicle symptoms, location, make, registration, and whether the car is drivable.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Secure Vehicle & Hazards On",
        text: "Park safely, apply handbrake, activate hazard warning lights.",
      },
      {
        stepNumber: 2,
        title: "Call Direct Workshop Line",
        text: "Contact 07767 909397 rather than submitting online booking forms for active breakdowns.",
      },
      {
        stepNumber: 3,
        title: "Provide Accurate Vehicle Information",
        text: "Share exact registration, make/model, and clear symptom descriptions for fast vehicle triage.",
      },
    ],
    troubleshooting: [
      {
        problem: "Steam or Smoke Coming from Engine Bay",
        mistake: "Opening the radiator cap while the engine is hot.",
        fix: "Never open a hot pressurized cooling system. Allow the engine to cool completely before checking fluid levels.",
      },
    ],
    safetyAndUkLaw:
      "UK Highway Code Rule 274: Never attempt roadside repairs on a motorway or high-speed dual carriageway. Stand well clear of carriageways behind safety barriers while awaiting recovery.",
    faqs: [
      {
        question: "Does an online quote request dispatch recovery automatically?",
        answer:
          "No. Online forms are processed during workshop hours. For immediate breakdown assistance in Hayes, always call 07767 909397 directly.",
      },
      {
        question: "Where is your Hayes workshop located?",
        answer:
          "We are located at Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ.",
      },
    ],
    internalLinks: [
      { label: "Contact Emergency Workshop Line", href: "/contact" },
      { label: "View All Workshop Services", href: "/services" },
      { label: "WhatsApp Direct Message", href: "/whatspp" },
    ],
    conclusion:
      "When unexpected vehicle faults occur in Hayes, prioritize safety first and call the workshop directly for urgent advice and repair priority.",
  },
  {
    slug: "car-maintenance-checklist",
    title: "A Simple Car Maintenance Checklist for Hayes Drivers",
    category: "Maintenance",
    summary:
      "Monthly and pre-long-journey maintenance checklists covering fluids, battery health, wipers, brake condition and oil service.",
    image: "/assets/photos/engine-oil-pour-wide.webp",
    readTime: "7 min read",
    relatedService: "Engine Oil Service",
    intro:
      "Preventive maintenance keeps your vehicle reliable, preserves resale value, and catches small component wear before it causes major roadside breakdowns in Hayes.",
    sections: [
      {
        title: "1. Essential Monthly Checkpoints",
        text: "Perform these 5 basic checks every 4 weeks to maintain optimum engine protection and vehicle roadworthiness.",
        subsections: [
          {
            title: "Engine Oil Dipstick Check",
            text: "Check oil levels with the car parked level and engine cold. Pull the dipstick, wipe clean, reinsert fully, and ensure level sits between MIN and MAX notches.",
          },
          {
            title: "Coolant & Brake Fluid Reservoir",
            text: "Inspect translucent fluid reservoirs under the bonnet. Coolant and brake fluid should remain between MIN and MAX marks with no sign of discolouration.",
          },
          {
            title: "Screenwash & Wiper Blade Condition",
            text: "Top up screenwash with suitable anti-freeze additive and clean rubber wiper blades to prevent smearing.",
          },
        ],
      },
      {
        title: "2. Servicing Schedule & Oil Specifications",
        text: "Always follow manufacturer intervals for oil, air, fuel, and cabin filters. Using grade-correct synthetic oil (e.g. 0W-20, 5W-30 C3) is vital for turbocharger and engine lifespan.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Check Oil Level & Colour",
        text: "Inspect dipstick monthly. Black, sludge-heavy oil indicates an overdue oil and filter service.",
      },
      {
        stepNumber: 2,
        title: "Audit Exterior Lighting",
        text: "Test headlights, full beam, brake lights, indicators, and reverse lights with assistance.",
      },
      {
        stepNumber: 3,
        title: "Inspect Battery Terminals",
        text: "Ensure 12V battery terminals are tight, free from white powder corrosion, and casing shows no swelling.",
      },
    ],
    troubleshooting: [
      {
        problem: "Low engine oil warning light appears on cornering",
        mistake: "Ignoring the warning and waiting until the next annual service.",
        fix: "Top up with recommended oil grade immediately and inspect for oil leaks.",
      },
    ],
    safetyAndUkLaw:
      "UK Road Safety: Driving with smeary windscreen wipers or empty screenwash reservoir is a Highway Code violation and can lead to a £50 spot fine.",
    faqs: [
      {
        question: "What is included in an Engine Oil Service at The Auto Surgeon Hayes?",
        answer:
          "Engine oil service starts at £30 labour and includes draining old oil, replacing with grade-correct specification oil, changing the oil filter, and resetting service indicators.",
      },
    ],
    internalLinks: [
      { label: "Book Engine Oil Service in Hayes", href: "/services/engine-oil" },
      { label: "View Labour Pricing List", href: "/pricing" },
      { label: "Request a Written Quote", href: "/quote" },
    ],
    conclusion:
      "Simple monthly maintenance checks prevent expensive repairs down the line. Schedule your routine oil and brake service at The Auto Surgeon Hayes today.",
  },
  {
    slug: "after-a-pothole-or-kerb-hit",
    title: "What to Check After a Pothole or Kerb Impact in Hayes",
    category: "Safety checks",
    summary:
      "How to inspect your wheels, suspension, steering and tyres after striking a deep pothole or kerb in Hayes.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "6 min read",
    relatedService: "Wheel Alignment",
    intro:
      "Deep potholes and sharp kerb impacts cause substantial force to travel through your tyres, alloy wheels, and suspension components. Spotting impact damage early prevents sudden tyre blowouts or secondary steering failure.",
    sections: [
      {
        title: "1. Immediate Visual & Physical Inspection",
        text: "After hitting a pothole or kerb in Hayes, safely pull over at the earliest opportunity to check for damage.",
        subsections: [
          {
            title: "Tyre Sidewall Inspection",
            text: "Examine inner and outer sidewalls for bulges, impact tears, or immediate pressure loss.",
          },
          {
            title: "Alloy Wheel Rim Crack & Bend Check",
            text: "Inspect the metal rim edge for cracks, bends, or missing wheel balance weights.",
          },
        ],
      },
      {
        title: "2. Driving Symptoms Following an Impact",
        text: "If steering feels off-centre, the vehicle pulls strongly, or high-speed vibration occurs, suspension geometry or wheel balance has been altered.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Visual Tyre & Wheel Rim Check",
        text: "Inspect tyre sidewall and alloy wheel rim lip for cracks or bulges.",
      },
      {
        stepNumber: 2,
        title: "Steering Feel & Pull Test",
        text: "Notice steering wheel alignment when travelling straight on a level road.",
      },
      {
        stepNumber: 3,
        title: "Workshop Geometry & Underside Inspection",
        text: "Have suspension arms, ball joints, wheel bearings, and tracking checked on a lift.",
      },
    ],
    troubleshooting: [
      {
        problem: "Steering wheel vibrates heavily above 40 mph after pothole",
        mistake: "Driving long distances hoping the vibration settles.",
        fix: "A balance weight has knocked off or an alloy wheel rim is bent. Rebalance or repair alloy immediately.",
      },
    ],
    safetyAndUkLaw:
      "UK Claims Guidance: If a deep council road pothole caused severe wheel/tyre damage, document photos of the road pothole, damaged tyre, and receipt for council compensation claims.",
    faqs: [
      {
        question: "Can a cracked alloy wheel be welded or replaced?",
        answer:
          "Hairline cracks can sometimes be professionally welded depending on location, but structural rim bends or hub cracks require alloy wheel replacement.",
      },
    ],
    internalLinks: [
      { label: "Book Alignment & Impact Inspection", href: "/services/wheel-alignment" },
      { label: "Puncture & Tyre Fitting", href: "/services/tyre-fitting" },
      { label: "Contact Workshop", href: "/contact" },
    ],
    conclusion:
      "Don't ignore pothole impacts. A quick inspection protects tyre integrity and prevents costly secondary suspension wear. Visit The Auto Surgeon in Hayes for a complete safety check.",
  },
  {
    slug: "tesla-tyre-warning-and-alignment",
    title: "Tesla Tyre Warnings and Alignment: What to Check in Hayes",
    category: "Tesla care",
    summary:
      "A practical guide to Tesla Model 3 and Model Y tyre pressure alerts, uneven shoulder wear, cold pressure ratings and specialist 4-wheel alignment.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "7 min read",
    relatedService: "Tesla Wheel Alignment",
    intro:
      "Tesla Model 3, Model Y, Model S, and Model X deliver instant electric torque and heavy curb weight due to floor battery packs. This combination subjects tyres to high stresses, making accurate pressure maintenance and 4-wheel laser alignment vital.",
    sections: [
      {
        title: "1. Decoding Tesla TPMS & Tyre Pressure Alerts",
        text: "Tesla vehicles feature precise Bluetooth or 433MHz TPMS sensors displaying individual wheel pressures on the main screen.",
        subsections: [
          {
            title: "Amber Under-Inflation Alert",
            text: "Appears when pressure drops below target cold specification (typically 42 PSI for Model 3 / Y). Top up cold pressures.",
          },
          {
            title: "Red Severe Pressure Warning",
            text: "Indicates rapid pressure loss or flat tyre. Safely stop immediately; do not drive on deflated tyres.",
          },
        ],
      },
      {
        title: "2. EV Heavy Torque & Rapid Shoulder Tyre Wear",
        text: "Because EVs deliver maximum torque instantly, aggressive acceleration or misaligned toe angles cause accelerated inner shoulder rubber wear. Regular rotation and geometry alignment prevent premature tyre replacement.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Verify Plaque Cold Pressure (42 PSI)",
        text: "Check driver B-pillar plaque for exact recommended cold pressures.",
      },
      {
        stepNumber: 2,
        title: "Inspect Inner Shoulder Wear",
        text: "Turn steering wheel to full lock to inspect inner shoulder rubber depth.",
      },
      {
        stepNumber: 3,
        title: "Tesla Specialist Laser Alignment",
        text: "Have 4-wheel alignment calibrated to exact Tesla factory geometry specifications at our Hayes workshop.",
      },
    ],
    troubleshooting: [
      {
        problem: "TPMS warning stays illuminated after inflating tyres",
        mistake: "Assuming the sensor is broken immediately.",
        fix: "Drive Tesla above 15 mph for 5–10 minutes so TPMS auto-learns new cold pressure readings.",
      },
    ],
    safetyAndUkLaw:
      "EV Workshop Scope Notice: The Auto Surgeon Hayes provides specialist Tesla 4-wheel alignment (£60) and tyre services. We do not perform high-voltage battery repairs or internal drivetrain modifications.",
    faqs: [
      {
        question: "What is the cost of Tesla wheel alignment at The Auto Surgeon Hayes?",
        answer:
          "Tesla 4-wheel laser alignment labour starts at £60 at our Hayes workshop.",
      },
      {
        question: "Do Tesla tyres require acoustic foam lining?",
        answer:
          "Tesla factory tyres often include internal polyurethane sound-deadening foam (TO / Silent Technology). Standard tyres can be fitted, but acoustic foam tyres offer lower cabin noise.",
      },
    ],
    internalLinks: [
      { label: "Book Tesla Wheel Alignment in Hayes", href: "/services/tesla-alignment" },
      { label: "Tyre Fitting Services", href: "/services/tyre-fitting" },
      { label: "Request a Written Quote", href: "/quote" },
    ],
    conclusion:
      "Maintain 42 PSI cold pressure and schedule regular 4-wheel laser alignment to maximize Tesla tyre life and maintain highway efficiency. Contact The Auto Surgeon in Hayes for EV-aware alignment care.",
  },
  {
    slug: "toyota-hybrid-warning-lights",
    title: "Toyota Hybrid Warning Lights: Safe Next Steps for Hayes Drivers",
    category: "Toyota care",
    summary:
      "Safe, practical advice on Toyota Yaris, Corolla, Prius and RAV4 hybrid warnings, master warning symbols and brake messages.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "7 min read",
    relatedService: "Auto Diagnostics",
    intro:
      "Toyota Hybrid Synergy Drive vehicles feature sophisticated dual-power powertrain controls combining petrol engines, electric motors, inverter units, and regenerative braking. Understanding warning indicators ensures safe, reliable driving across Hayes.",
    sections: [
      {
        title: "1. Key Toyota Hybrid Warning Indicators",
        text: "Toyota dashboards combine multi-information display messages with dedicated warning icons.",
        subsections: [
          {
            title: "Master Warning Light (Triangle with Exclamation Mark)",
            text: "Accompanied by a message on the multi-information screen indicating a system anomaly ranging from low washer fluid to hybrid system malfunction.",
          },
          {
            title: "Check Hybrid System Warning",
            text: "Indicates an active fault code within the hybrid control unit, traction battery, inverter cooling, or high-voltage relays. Driving may be restricted.",
          },
          {
            title: "Regenerative Braking / ABS Light",
            text: "Indicates a fault in the electronic brake control unit or stroke sensor. Brake pedal effort may feel firm or spongy.",
          },
        ],
      },
      {
        title: "2. Hybrid Inverter Cooling & 12V Auxiliary Battery Importance",
        text: "Many Toyota hybrid faults stem from a weak 12V auxiliary battery or blocked inverter cooling intake filters beneath rear passenger seats.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Record Display Wording & Warning Colour",
        text: "Take a photo of the multi-information display warning message while safely parked.",
      },
      {
        stepNumber: 2,
        title: "Check Inverter Coolant Level",
        text: "Inspect the separate translucent inverter coolant tank in the engine bay.",
      },
      {
        stepNumber: 3,
        title: "OBD-II Hybrid Diagnostic Scan",
        text: "Schedule a diagnostic fault code reading at our Hayes workshop.",
      },
    ],
    troubleshooting: [
      {
        problem: "Car will not enter READY mode",
        mistake: "Assuming the main hybrid traction battery has failed.",
        fix: "A discharged 12V auxiliary battery often prevents the hybrid main relays from energising. Test and charge the 12V battery first.",
      },
    ],
    safetyAndUkLaw:
      "High-Voltage Safety Notice: High-voltage hybrid orange cables carry up to 650V DC. Never touch orange high-voltage cables or attempt to dismantle traction battery casings.",
    faqs: [
      {
        question: "Can I drive my Toyota Hybrid with a Check Hybrid System warning?",
        answer:
          "If the car remains in READY mode and drives normally, you may drive cautiously to a workshop. However, if power is severely restricted or red warning symbols appear, stop safely and arrange recovery.",
      },
    ],
    internalLinks: [
      { label: "Book Toyota Diagnostic Scan in Hayes", href: "/services/diagnostics" },
      { label: "View Workshop Services", href: "/services" },
      { label: "Contact Us Directly", href: "/contact" },
    ],
    conclusion:
      "When a Toyota hybrid warning appears, record exact message details and seek professional diagnostic analysis. Visit The Auto Surgeon in Hayes for reliable vehicle diagnostic support.",
  },
  {
    slug: "mercedes-warning-lights-service",
    title: "Mercedes Warning Lights & Service Messages Explained",
    category: "Mercedes care",
    summary:
      "Demystifying Mercedes A-Class, C-Class, E-Class and GLC ASSYST PLUS service reminders, brake pad wear alerts and engine warnings in Hayes.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "7 min read",
    relatedService: "Auto Diagnostics",
    intro:
      "Mercedes-Benz vehicles utilize advanced multi-system diagnostics communicating through ASSYST PLUS service interval displays and driver instrument clusters. Understanding these alerts helps Hayes drivers distinguish routine maintenance from urgent repairs.",
    sections: [
      {
        title: "1. Mercedes ASSYST PLUS Service Messages",
        text: "Mercedes displays Service A (minor service) or Service B (major service) reminders along with numbered sub-codes.",
        subsections: [
          {
            title: "Service A vs Service B Scope",
            text: "Service A covers synthetic engine oil, oil filter, and multi-point safety checks. Service B adds cabin combination filters, brake fluid replacement, and expanded brake/suspension inspections.",
          },
          {
            title: "Brake Lining Wear Warning",
            text: "Mercedes incorporates wear sensors in brake pads. When 'Check Brake Wear' appears, approximately 1,500 miles of pad friction lining remains.",
          },
        ],
      },
      {
        title: "2. Common Engine & AdBlue Messages on Mercedes Diesels",
        text: "AdBlue countdown messages (e.g. 'Engine Start Not Possible in 500 miles') must be refilled with ISO 22241 specification AdBlue prior to countdown expiry.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Identify Display Wording & Colour",
        text: "Note exact message wording (e.g. Service A due in 20 days, Brake Wear, or Engine Light).",
      },
      {
        stepNumber: 2,
        title: "Check Oil Level via Instrument Cluster",
        text: "On models without a dipstick, check oil level via driver steering controls menu under Service.",
      },
      {
        stepNumber: 3,
        title: "Book Service or Diagnostic Assessment",
        text: "Contact The Auto Surgeon Hayes with exact model, year, and message code.",
      },
    ],
    troubleshooting: [
      {
        problem: "AdBlue warning remains after refilling tank",
        mistake: "Driving off immediately without allowing level sensor re-initialization.",
        fix: "Switch ignition on (Position 2) for 60 seconds without starting engine to allow sensor level update.",
      },
    ],
    safetyAndUkLaw:
      "Brake Safety Notice: Continuing to drive long distances after 'Check Brake Wear' appears can wear friction material down to metal backplates, destroying brake discs and drastically increasing stopping distance.",
    faqs: [
      {
        question: "How much does Mercedes brake pad labour cost in Hayes?",
        answer:
          "Brake pad replacement labour is £30 at The Auto Surgeon Hayes, while front discs & pads labour is £50.",
      },
    ],
    internalLinks: [
      { label: "Book Mercedes Brake Service in Hayes", href: "/services/brake-service" },
      { label: "Book Diagnostic Scan", href: "/services/diagnostics" },
      { label: "View Labour Pricing", href: "/pricing" },
    ],
    conclusion:
      "Address Mercedes service reminders and brake wear messages early to protect performance and maintain vehicle reliability. Contact The Auto Surgeon Hayes for clear, expert maintenance.",
  },
  {
    slug: "common-car-problems-by-make",
    title: "Common Car Problems by Make: Tesla, Toyota, Mercedes, BMW & VW",
    category: "Car problems",
    summary:
      "A complete guide to frequent vehicle faults by make, diagnostic symptoms and practical workshop repair solutions in Hayes.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "9 min read",
    relatedService: "Auto Diagnostics",
    intro:
      "Every vehicle manufacturer has specific common faults related to suspension geometry, braking systems, sensors, or maintenance needs. This guide outlines frequent symptoms by brand to help Hayes drivers identify and fix issues early.",
    sections: [
      {
        title: "1. Tesla Model 3 & Model Y: Tyre Wear & Steering Pull",
        text: "Common issues include rapid inner shoulder tyre scrub, TPMS cold pressure warnings (42 PSI), and steering wheel off-centre drift after hitting speed bumps or kerbs in Hayes.",
      },
      {
        title: "2. Toyota Yaris, Corolla & Prius: Hybrid Messages & Brake Drag",
        text: "Frequent symptoms include Check Hybrid System warning lights (often triggered by weak 12V auxiliary batteries or clogged inverter cooling vents) and rear brake pad sticking from light usage under regenerative braking.",
      },
      {
        title: "3. Mercedes A-Class, C-Class & E-Class: Brake Wear & AdBlue Alerts",
        text: "Common concerns include 'Check Brake Wear' alerts, DPF regeneration soot buildup on short suburban trips, and AdBlue countdown warnings requiring ISO 22241 fluid top-ups.",
      },
      {
        title: "4. BMW 1 Series, 3 Series & 5 Series: Steering Drift & Run-Flat Wear",
        text: "Frequent issues include inner edge tyre wear on run-flat tyres, front control arm bush wear causing steering vibration, and brake pad sensor replacement alerts.",
      },
      {
        title: "5. Volkswagen Golf, Polo & Tiguan: Check Engine Lights & ABS Sensors",
        text: "Common issues include wheel speed ABS sensor failure, DPF clogging from low-speed urban journeys, and engine misfires causing amber flashing check engine lights.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Document Exact Fault Wording & Driving Conditions",
        text: "Note vehicle make, model, year, warning symbol, and whether symptoms occur under acceleration, braking, or high speeds.",
      },
      {
        stepNumber: 2,
        title: "Check Basic Fluids & Pressures",
        text: "Verify cold tyre pressure, engine oil level, and coolant levels.",
      },
      {
        stepNumber: 3,
        title: "Schedule Workshop Inspection",
        text: "Contact The Auto Surgeon in Hayes for targeted diagnostic scanning, alignment checks, or brake servicing.",
      },
    ],
    troubleshooting: [
      {
        problem: "Misfiring engine on VW / Ford / BMW",
        mistake: "Clearing fault codes without replacing faulty ignition coils or spark plugs.",
        fix: "Perform OBD diagnostic scan to identify exact cylinder misfire and replace component.",
      },
    ],
    safetyAndUkLaw:
      "UK Safety Compliance: Illuminated safety system lights (ABS, airbag, engine management) result in an automatic major defect failure under UK MOT test rules.",
    faqs: [
      {
        question: "How do I request a repair quote for my specific make and model in Hayes?",
        answer:
          "Visit our online Quote Request page, enter your vehicle registration, select your service, and receive a clear written quote for parts and labour.",
      },
    ],
    internalLinks: [
      { label: "Request a Written Quote in Hayes", href: "/quote" },
      { label: "Book Vehicle Diagnostics", href: "/services/diagnostics" },
      { label: "View Honest Labour Prices", href: "/pricing" },
    ],
    conclusion:
      "Regardless of your vehicle make, catching symptoms early prevents secondary component failure. Contact The Auto Surgeon in Hayes for expert diagnosis and transparent repairs.",
  },
];

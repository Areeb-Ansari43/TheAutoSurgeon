export type GuideSubsection = {
  title: string;
  text: string;
};

export type GuideSection = {
  title: string;
  text: string;
  subsections?: GuideSubsection[];
};

export type GuideFAQ = {
  question: string;
  answer: string;
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  readTime: string;
  sections: GuideSection[];
  faqs: GuideFAQ[];
  relatedService: string;
  metaTitle?: string;
  metaDescription?: string;
};

export const guides: Guide[] = [
  {
    slug: "tyre-safety-checks",
    title: "How to Check Tyre Tread, Pressure & Safety: UK Driver's Guide",
    category: "Tyre care",
    summary:
      "A complete guide to UK legal tyre tread limits, 20p coin checks, cold pressure settings, identifying slow punctures, and knowing when a damaged tyre must be replaced.",
    image: "/assets/photos/tyre-dunlop-dark.webp",
    readTime: "7 min read",
    relatedService: "Tyre Fitting",
    metaTitle: "How to Check Tyre Tread & Pressure — UK Tyre Safety Guide",
    metaDescription:
      "Learn how to check tyre tread depth with a 20p coin, set correct cold pressures, identify slow punctures, and follow UK legal standards (BS AU 159).",
    sections: [
      {
        title: "1. The 20p Coin Test & UK Legal Tread Depth Limits",
        text: "In Great Britain and Northern Ireland, the legal minimum tread depth for cars and light commercial vehicles is 1.6 mm across the central three-quarters (75%) of the tread breadth and around its entire outer circumference. Driving on tyres below this limit carries penalties of up to £2,500 and 3 penalty points per illegal tyre.",
        subsections: [
          {
            title: "How to perform the 20p coin test",
            text: "Insert a standard 20p coin into the main tread grooves of your tyre. If the outer band of the coin is hidden when inserted, your tread depth is above the legal minimum (1.6 mm). If the outer band remains visible, your tread is likely below the legal limit and your vehicle requires immediate inspection and replacement.",
          },
          {
            title: "Why 3 mm is the safe replacement threshold",
            text: "Although 1.6 mm is the statutory minimum, independent testing by tyre manufacturers demonstrates that wet-weather stopping distances increase significantly once tread wears below 3 mm. Water displacement efficiency drops sharply, increasing the risk of aquaplaning on wet UK roads.",
          },
        ],
      },
      {
        title: "2. Setting Cold Tyre Pressures Correctly",
        text: "Tyre pressures must always be measured when the tyres are cold—meaning the vehicle has been parked for at least 2 hours or driven less than 2 miles at low speed. Driving warms the air inside the tyre, causing pressure to expand by 3 to 5 PSI and leading to inaccurate adjustments if deflated when hot.",
        subsections: [
          {
            title: "Where to find your vehicle's correct pressure",
            text: "Do not use the maximum pressure stamped on the tyre sidewall. The correct recommended cold pressures (in PSI or BAR) are located on a sticker inside the driver's door jamb, inside the fuel filler flap, or in the vehicle handbook. Account for extra load when carrying passengers or heavy luggage.",
          },
          {
            title: "Effects of under-inflation and over-inflation",
            text: "Under-inflated tyres flex excessively, producing heat that can cause internal cord separation, increased fuel consumption, and rapid wear along both outer edges. Over-inflated tyres reduce the contact patch, leading to harsh ride quality and accelerated wear along the centre of the tread.",
          },
        ],
      },
      {
        title: "3. Identifying Slow Punctures and Repair Limits (BS AU 159)",
        text: "A slow puncture causes gradual loss of pressure over days or weeks, often caused by a small nail, screw, or corroded wheel rim bead. In the UK, professional puncture repairs must strictly adhere to British Standard BS AU 159.",
        subsections: [
          {
            title: "When can a puncture be safely repaired?",
            text: "Under BS AU 159, a puncture can only be repaired if the entry hole is 6 mm or smaller and located within the central 60% of the tread width (the minor repair zone). The tyre must be demounted from the rim and inspected internally for structural damage.",
          },
          {
            title: "When is a tyre unsafe to repair?",
            text: "Tyres cannot be repaired if damage exists on the sidewall or shoulder, if cords are exposed, if secondary rubber deterioration has occurred from driving deflated, or if previous temporary string repairs were used without internal patch-plug vulcanisation.",
          },
        ],
      },
      {
        title: "4. Sidewall Damage, Bulges, and Ageing",
        text: "Inspect sidewalls regularly for cuts, cracks, abrasions, and bulges. A sidewall bulge indicates internal carcass cords have snapped—usually after hitting a pothole or kerb—allowing high-pressure air to push out the outer rubber. A bulging tyre can burst unexpectedly at speed and must be replaced immediately.",
      },
    ],
    faqs: [
      {
        question: "How often should I check my tyre pressures?",
        answer:
          "Check pressures at least once a month and always before long journeys or when carrying heavy loads, using an accurate digital gauge when tyres are cold.",
      },
      {
        question: "Can run-flat tyres be repaired after a puncture?",
        answer:
          "Most tyre manufacturers advise against repairing run-flat tyres after deflated driving, because internal structure strength cannot be safely guaranteed once driven on zero pressure.",
      },
      {
        question: "Are budget tyres safe on UK roads?",
        answer:
          "All new tyres sold in the UK must meet E-mark standards for safety and grip. Premium tyres offer superior wet braking and lower noise, but budget tyres fully comply with legal safety standards when properly maintained.",
      },
    ],
  },
  {
    slug: "warning-lights",
    title: "Car Dashboard Warning Light Meanings & What To Do (Red vs Amber)",
    category: "Diagnostics",
    summary:
      "Learn what red and amber warning lights mean on UK vehicle dashboards, when it is unsafe to drive, common engine light triggers, and how diagnostic scans work.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "8 min read",
    relatedService: "Auto Diagnostics",
    metaTitle: "Car Dashboard Warning Light Meanings (Red vs Amber Guide)",
    metaDescription:
      "Understand red and amber dashboard warning lights, check engine lights (EML), brake symbols, and when to pull over safely. Expert diagnostics guide in Hayes.",
    sections: [
      {
        title: "1. The Universal Traffic Light Colour System",
        text: "Modern motor vehicles use an industry-standard colour hierarchy on the instrument cluster to communicate priority levels to the driver.",
        subsections: [
          {
            title: "Red Warning Lights — Urgent Stop Required",
            text: "Red indicates a severe safety or mechanical hazard requiring an immediate, safe stop. Examples include red oil pressure warnings, coolant temperature overheating, brake fluid loss, battery charging failure, or power steering failure. Continuing to drive with a red warning light can cause catastrophic engine destruction or loss of braking power.",
          },
          {
            title: "Amber / Yellow Warning Lights — Inspection Needed Soon",
            text: "Amber warnings indicate a system fault or electronic anomaly that requires investigation by a technician, but typically permits driving safely to a nearby garage provided the vehicle operates normally without misfiring, knocking, or smoke.",
          },
          {
            title: "Green / Blue Lights — Information & Active Systems",
            text: "Green and blue symbols indicate active vehicle functions such as dipped headlights, main beam, indicator signals, or cruise control, and do not represent system faults.",
          },
        ],
      },
      {
        title: "2. Common Engine Management Light (EML) Triggers",
        text: "The Check Engine Light (Engine Management Light) illuminates when the Engine Control Unit (ECU) detects an engine combustion, emission, or sensor reading outside preset parameters.",
        subsections: [
          {
            title: "Oxygen (O2) Sensor and Lambda Sensor Faults",
            text: "Faulty oxygen sensors fail to monitor unburnt oxygen in the exhaust, leading to rich or lean fuel mixtures, reduced fuel economy (MPG), and potential catalytic converter damage over time.",
          },
          {
            title: "Misfires & Ignition Coil Pack Failures",
            text: "A flashing Check Engine Light indicates an active cylinder misfire. Unburnt fuel enters the exhaust system where it can melt the internal structure of the catalytic converter. Pull over and turn off the engine immediately.",
          },
          {
            title: "Diesel Particulate Filter (DPF) & EGR Valve Blockages",
            text: "In diesel cars, frequent short trips prevent exhaust temperatures from reaching DPF regeneration thresholds, causing soot buildup, EGR valve sticking, and limp-home mode activation.",
          },
        ],
      },
      {
        title: "3. Red Oil Pressure & Coolant Overheating Warnings",
        text: "If the red oil can symbol appears while driving, oil pressure has dropped below safe operational levels. Turn off the engine immediately to prevent engine seizure. If the red thermometer symbol appears, the engine is overheating; turn off the ignition and allow the engine to cool fully before checking coolant levels.",
      },
      {
        title: "4. What Happens During a Professional Diagnostic Check?",
        text: "A diagnostic scan retrieves Diagnostic Trouble Codes (DTCs) stored in the vehicle's control modules via the OBD-II port. However, a fault code (such as P0300) identifies the symptom area rather than proving a specific component is broken. Skilled technicians combine live sensor data analysis, oscilloscope scope testing, and physical inspection to verify the root cause before replacing parts.",
      },
    ],
    faqs: [
      {
        question: "Can I clear a warning light by disconnecting the battery?",
        answer:
          "Disconnecting the battery may clear temporary dashboard lights, but it does not fix the underlying fault. The ECU will re-illuminate the light once drive cycles complete and sensor parameters fail again.",
      },
      {
        question: "What should I do if my check engine light starts flashing?",
        answer:
          "A flashing engine light signals a severe engine misfire. Ease off the accelerator, pull over in a safe place, switch off the engine, and arrange recovery to prevent catalytic converter destruction.",
      },
      {
        question: "How much does a diagnostic check cost in Hayes?",
        answer:
          "At The Auto Surgeon in Hayes, initial diagnostic fault code reading starts from £30 labour, providing clear diagnostic reports and guidance.",
      },
    ],
  },
  {
    slug: "wheel-alignment-signs",
    title: "Signs Your Car Needs Wheel Alignment: Vibration, Pulling & Uneven Tyre Wear",
    category: "Alignment",
    summary:
      "Identify off-centre steering, uneven tread feathering, vehicle pulling, and steering wheel vibration caused by misaligned toe, camber, or caster angles.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "6 min read",
    relatedService: "Wheel Alignment",
    metaTitle: "Signs Your Car Needs Wheel Alignment — Steering Pull & Tyre Wear",
    metaDescription:
      "Recognise off-centre steering wheels, vehicle pulling, camber/toe misalignment, and tyre feathering. Learn how 4-wheel laser alignment saves money.",
    sections: [
      {
        title: "1. Common Symptoms of Misaligned Wheels",
        text: "Wheel alignment refers to the precise angles of your vehicle's wheels relative to each other and the road surface. Misalignment occurs after impacts with potholes, kerbs, speed bumps, or after steering and suspension component replacement.",
        subsections: [
          {
            title: "Steering wheel sitting off-centre",
            text: "When driving straight down a level road, your steering wheel spokes should rest completely horizontal. An off-centre steering wheel indicates that the front or rear toe angles are out of balance.",
          },
          {
            title: "Vehicle pulling or drifting to one side",
            text: "If your car consistently pulls to the left or right when you briefly relax your grip on a flat road, steering geometry is dragging the vehicle off course, increasing tyre resistance and driver fatigue.",
          },
          {
            title: "Steering wheel vibration at speed",
            text: "Vibration felt through the steering wheel at 50–70 mph can result from wheel rim imbalance, warped brake discs, or tracking misalignment combined with uneven tyre wear.",
          },
        ],
      },
      {
        title: "2. Understanding Alignment Angles: Toe, Camber, and Caster",
        text: "Suspension geometry relies on three primary measurable angles.",
        subsections: [
          {
            title: "Toe-in and Toe-out",
            text: "Toe represents the direction the tyres point relative to the vehicle centreline when viewed from above. Incorrect toe causes rapid, aggressive scrub wear across the tread surface.",
          },
          {
            title: "Camber Angle",
            text: "Camber is the inward or outward tilt of the wheel when viewed from the front. Excessive negative camber wears the inner edge of the tyre, while positive camber wears the outer shoulder.",
          },
          {
            title: "Caster Angle",
            text: "Caster is the forward or backward tilt of the steering axis viewed from the side, influencing straight-line stability and steering self-centering.",
          },
        ],
      },
      {
        title: "3. Reading Tyre Wear Patterns",
        text: "Feathering—where the tread blocks feel smooth when rubbed one way but sharp when rubbed the opposite way—indicates incorrect toe alignment. Single-edge shoulder wear points to camber or tracking errors, while diagonal cupping wear suggests worn shock absorbers combined with alignment imbalance.",
      },
      {
        title: "4. Benefits of Four-Wheel Alignment",
        text: "Properly aligned wheels reduce rolling resistance, improving fuel economy and EV battery range, while extending tyre life by thousands of miles and restoring crisp, predictable handling response.",
      },
    ],
    faqs: [
      {
        question: "How long does a wheel alignment take?",
        answer:
          "A standard four-wheel laser alignment check and adjustment typically takes 30 to 45 minutes at our Hayes workshop.",
      },
      {
        question: "Should I align my wheels whenever I buy new tyres?",
        answer:
          "Yes. Fitting new tyres to a misaligned vehicle will rapidly ruin the fresh tread patterns within a few thousand miles. Aligning upon fitting protects your investment.",
      },
      {
        question: "Can worn suspension parts affect alignment?",
        answer:
          "Yes. Worn track rod ends, ball joints, or wishbone bushes allow wheel movement that prevents stable alignment. Worn parts must be replaced before setting geometry.",
      },
    ],
  },
  {
    slug: "emergency-car-repair-hayes",
    title: "Emergency Car Breakdown & Urgent Repair Guide in Hayes",
    category: "Emergency repairs",
    summary:
      "What to do when your vehicle suffers a sudden breakdown, severe warning light, puncture, or braking failure in Hayes, UB3, and surrounding West London areas.",
    image: "/assets/photos/hero-orange-caliper.webp",
    readTime: "6 min read",
    relatedService: "Auto Diagnostics",
    metaTitle: "Emergency Car Repair & Breakdown Steps in Hayes UB3",
    metaDescription:
      "Sudden car fault or puncture in Hayes? Follow safe breakdown steps, emergency contacts, and fast workshop advice at The Auto Surgeon in UB3.",
    sections: [
      {
        title: "1. Step-by-Step Emergency Breakdown Procedure",
        text: "If your car develops a critical fault while driving, prioritizing occupant safety is paramount.",
        subsections: [
          {
            title: "Step 1: Move to a safe location",
            text: "Indicate clearly and move off active traffic lanes onto a hard shoulder, layby, side road, or car park. Turn on hazard warning lights immediately.",
          },
          {
            title: "Step 2: Safe exit and visibility",
            text: "If stopped on a high-speed road, exit the vehicle via the passenger doors away from traffic and stand safely behind highway barriers wearing high-visibility clothing if available.",
          },
          {
            title: "Step 3: Assess safety-critical signs",
            text: "Never continue driving if you smell fuel or burning, see smoke, experience complete brake pedal loss, or hear loud metallic grinding.",
          },
        ],
      },
      {
        title: "2. Contacting The Auto Surgeon for Urgent Assistance",
        text: "For urgent vehicle problems in Hayes, call our workshop directly on 07767 909397 or send a direct WhatsApp message. Explain your vehicle registration, current location, exact warning lights, and symptoms so our technicians can prepare priority inspection capacity where parts allow.",
      },
      {
        title: "3. Distinguishing Immediate Recovery Needs from Workshop Repairs",
        text: "Online contact forms are reviewed during business hours and are not live emergency dispatch systems. If your vehicle is stranded in a hazardous live road position, contact official breakdown recovery services or emergency services first.",
      },
    ],
    faqs: [
      {
        question: "Do you accept walk-in emergency visits?",
        answer:
          "Yes, walk-ins and urgent vehicle arrivals are welcome at Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ during opening hours (Mon–Sat 9am–6pm).",
      },
      {
        question: "Can I drive to the workshop with a slow puncture?",
        answer:
          "If the tyre retains adequate pressure (above 20 PSI) and has no sidewall bulge, you may drive carefully at low speed to our garage. If deflated completely, fit a spare wheel or arrange recovery.",
      },
    ],
  },
  {
    slug: "car-maintenance-checklist",
    title: "Essential Car Maintenance Checklist: How Often to Service Your Car",
    category: "Maintenance",
    summary:
      "A complete UK car maintenance schedule: monthly fluid and tyre checks, interim vs full service intervals, brake pad inspection, and winter vehicle preparation.",
    image: "/assets/photos/engine-oil-pour-wide.webp",
    readTime: "7 min read",
    relatedService: "Engine Oil Service",
    metaTitle: "Essential Car Maintenance Checklist — Servicing Intervals UK",
    metaDescription:
      "Monthly DIY car checks, oil change intervals, brake pad thickness rules, and servicing schedules explained for UK motor vehicle owners.",
    sections: [
      {
        title: "1. Monthly DIY Car Safety Checks",
        text: "Preventative monthly maintenance takes less than 10 minutes and prevents major mechanical failures.",
        subsections: [
          {
            title: "Engine Oil Level Check",
            text: "With the car parked on level ground and the engine off for 10 minutes, pull out the dipstick, wipe clean, reinsert fully, and remove again. The oil level must rest between the minimum and maximum indicator notches. Low oil level starves internal bearings, leading to engine failure.",
          },
          {
            title: "Coolant & Brake Fluid Inspection",
            text: "Check semi-transparent reservoir bottles under the bonnet. Coolant level should rest between MIN and MAX marks. Never open a hot coolant cap. Low brake fluid indicates worn brake pads or hydraulic leaks.",
          },
          {
            title: "Windscreen Wipers & Washer Fluid",
            text: "Top up screenwash with anti-freeze additive during winter months. Replace cracked or smearing wiper blades to maintain legal road visibility.",
          },
        ],
      },
      {
        title: "2. Car Servicing Intervals: Interim vs Full Service",
        text: "Regular servicing preserves vehicle reliability, maintains manufacturer warranties, and retains vehicle resale value.",
        subsections: [
          {
            title: "Interim Oil Service (Every 6 months / 6,000 miles)",
            text: "Includes draining contaminated oil, fitting a new OEM-spec oil filter, replacing engine oil with correct viscosity oil, and inspecting essential safety items.",
          },
          {
            title: "Full Service (Every 12 months / 12,000 miles)",
            text: "A comprehensive inspection covering air filters, cabin pollen filters, spark plugs or fuel filters, brake condition, suspension joints, battery health, and diagnostic fault checks.",
          },
        ],
      },
      {
        title: "3. Brake & Suspension Inspection Intervals",
        text: "Brake pads must be checked every 6,000 to 10,000 miles. Replace brake pads when friction material wears down to 3 mm thickness. Brake discs should be measured for minimum thickness and replaced in axle pairs alongside new pads.",
      },
    ],
    faqs: [
      {
        question: "Does an oil service include engine air filters?",
        answer:
          "Basic engine oil service covers engine oil and oil filter replacement. Air filters, cabin filters, and spark plugs are part of full service packages or quoted separately.",
      },
      {
        question: "Why is using the correct engine oil grade vital?",
        answer:
          "Modern engines require specific synthetic oil grades (such as 0W-20, 5W-30 C3) to lubricate tight engine tolerances, protect wet timing belts, and prevent DPF contamination.",
      },
    ],
  },
  {
    slug: "after-a-pothole-or-kerb-hit",
    title: "Pothole & Kerb Damage Inspection Guide: Tyres, Wheels & Suspension",
    category: "Safety checks",
    summary:
      "Check your vehicle after hitting a pothole or kerb: tyre sidewall bulges, cracked alloy wheels, bent suspension arms, and tracking alignment steps.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "5 min read",
    relatedService: "Wheel Alignment",
    metaTitle: "Pothole & Kerb Damage Inspection — Wheels, Tyres & Tracking",
    metaDescription:
      "What to check after a severe pothole impact in the UK: sidewall bulges, cracked alloy wheels, steering pull, and wheel alignment checks.",
    sections: [
      {
        title: "1. Immediate Visual Checks After an Impact",
        text: "Holes and kerb strikes subject wheels and suspension to severe kinetic force.",
        subsections: [
          {
            title: "Inspect tyre sidewalls for bulges and tears",
            text: "Check both inner and outer tyre sidewalls. A bulge indicates structural internal cord breakage requiring immediate tyre replacement.",
          },
          {
            title: "Examine alloy wheel rims for cracks or bends",
            text: "Look for hairline cracks along the inner rim flange or visible buckling. Cracked alloy wheels lose air pressure rapidly and can shatter under stress.",
          },
        ],
      },
      {
        title: "2. Driving Symptoms Following a Hit",
        text: "Note any changes in driving dynamics: a steering wheel off-centre, constant pulling to one side, thumping noises that speed up with velocity, or vibration under acceleration.",
      },
      {
        title: "3. Suspension & Geometry Inspection",
        text: "Pothole strikes often bend track rods, lower wishbone arms, or anti-roll bar links. An alignment check verifies geometry, but bent mechanical components must be replaced before setting tracking.",
      },
    ],
    faqs: [
      {
        question: "Can a cracked alloy wheel be repaired?",
        answer:
          "Minor hairline cracks on structural wheel rims may be weld-repaired by specialists, but severely buckled or damaged wheels must be replaced for safety.",
      },
      {
        question: "Can I claim pothole damage repair costs from the council?",
        answer:
          "In the UK, local councils may reimburse pothole repair costs if you provide photos of the pothole, location details, repair receipts, and proof of council negligence.",
      },
    ],
  },
  {
    slug: "tesla-tyre-warning-and-alignment",
    title: "Tesla Tyre Pressure Warnings & Wheel Alignment: Model 3 & Model Y Guide",
    category: "Tesla care",
    summary:
      "Guide for Tesla Model 3 and Model Y owners: TPMS warnings, cold pressure specs, EV tyre wear patterns, acoustic foam considerations, and 4-wheel laser alignment.",
    image: "/assets/photos/tesla-wheel.webp",
    readTime: "7 min read",
    relatedService: "Tesla Wheel Alignment",
    metaTitle: "Tesla Tyre Pressure Alerts & Alignment Guide — Model 3 / Y",
    metaDescription:
      "Tesla Model 3 and Y tyre pressure warnings, recommended cold PSI, foam-filled tyres, and specialist 4-wheel alignment in Hayes.",
    sections: [
      {
        title: "1. Understanding Tesla TPMS Warnings",
        text: "Tesla vehicles feature precise digital Tire Pressure Monitoring Systems (TPMS).",
        subsections: [
          {
            title: "Amber TPMS Low Pressure Warning",
            text: "Indicates cold tyre pressure has dropped 15% below the recommended setting (typically 42 PSI for Model 3 / Model Y). Check and inflate cold tyres.",
          },
          {
            title: "Red Urgent TPMS Warning",
            text: "Indicates severe pressure loss or rapid deflation. Pull over safely immediately to prevent rim and battery floor pan damage.",
          },
        ],
      },
      {
        title: "2. Heavy EV Weight & Instant Torque Tyre Wear",
        text: "Electric vehicles weigh significantly more than ICE cars due to battery packs, and deliver instant electric motor torque. This accelerates tyre wear on inner tread shoulders if alignment is slightly out.",
      },
      {
        title: "3. Foam-Filled Sound Suppression Tyres & Puncture Repairs",
        text: "Many OEM Tesla tyres feature internal polyurethane acoustic foam layer sound suppression. Punctures can still be repaired under BS AU 159 by cutting back a small section of internal foam to apply an internal patch-plug.",
      },
      {
        title: "4. Tesla 4-Wheel Alignment Specifications",
        text: "At The Auto Surgeon, we perform measured 4-wheel laser alignment specifically calibrated to Tesla Model 3, Model Y, Model S, and Model X factory geometry parameters (£60 labour).",
      },
    ],
    faqs: [
      {
        question: "Do you perform high-voltage Tesla battery repairs?",
        answer:
          "No. Our workshop specializes in Tesla tyres, puncture repairs, and wheel alignment. High-voltage powertrain and battery pack repairs must be performed by Tesla service centres.",
      },
      {
        question: "What is the correct cold tyre pressure for a Tesla Model 3?",
        answer:
          "Standard recommended cold pressure for Tesla Model 3 is 42 PSI (2.9 BAR), listed on the door pillar plaque.",
      },
    ],
  },
  {
    slug: "toyota-hybrid-warning-lights",
    title: "Toyota Hybrid Warning Lights & Dashboard Messages Explained",
    category: "Toyota care",
    summary:
      "A clear guide for Toyota Yaris, Corolla, Auris, and Prius owners: master warning lights, hybrid system alert messages, brake warnings, and diagnostic steps.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "6 min read",
    relatedService: "Auto Diagnostics",
    metaTitle: "Toyota Hybrid Warning Lights & Dashboard Warnings Guide",
    metaDescription:
      "Toyota hybrid master warning light, Check Hybrid System messages, brake alerts, and diagnostic procedures explained for UK drivers.",
    sections: [
      {
        title: "1. Toyota Master Warning Symbol (! in Triangle)",
        text: "The yellow or red triangle containing an exclamation mark is Toyota's Master Warning Light. It illuminates alongside multi-information display messages detailing specific sub-system faults.",
      },
      {
        title: "2. 'Check Hybrid System' Warning Message",
        text: "This message indicates that the hybrid control ECU has detected an irregularity in the high-voltage battery, inverter, cooling fan, or 12V auxiliary battery. Stop safely, do not touch orange high-voltage cables, and arrange diagnostic scanning.",
      },
      {
        title: "3. Regenerative Braking & ABS Warning Lights",
        text: "Toyota hybrids seamlessly blend hydraulic braking with motor regenerative braking. If both the yellow ABS light and red brake warning light illuminate simultaneously, braking assistance may be reduced.",
      },
    ],
    faqs: [
      {
        question: "Can a flat 12V battery cause hybrid warning lights?",
        answer:
          "Yes. A weak 12V auxiliary battery often triggers false 'Check Hybrid System' error messages because electronic control units fail to initialize correctly upon starting.",
      },
      {
        question: "Is it safe to drive with a Toyota master warning light?",
        answer:
          "If accompanied by a red message, power loss, or abnormal braking, stop safely. If amber without performance loss, visit a diagnostic garage promptly.",
      },
    ],
  },
  {
    slug: "mercedes-warning-lights-service",
    title: "Mercedes-Benz Dashboard Warning Lights & Service Code Messages",
    category: "Mercedes care",
    summary:
      "Understand Mercedes A-Class, C-Class, E-Class, and GLC dashboard warnings: ASSYST PLUS Service A/B codes, AdBlue warnings, air suspension alerts, and brake wear.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "7 min read",
    relatedService: "Auto Diagnostics",
    metaTitle: "Mercedes Dashboard Warning Lights & ASSYST Service Codes",
    metaDescription:
      "Mercedes Service A and B code reminders, Check Engine Light, AdBlue countdowns, and brake pad wear warnings explained.",
    sections: [
      {
        title: "1. Mercedes ASSYST PLUS Service Messages (Service A & B)",
        text: "Mercedes vehicles calculate routine service schedules using the ASSYST PLUS system based on time, mileage, and oil condition.",
        subsections: [
          {
            title: "Service A (Minor Service)",
            text: "Typically due at 10,000 miles or 1 year. Covers engine oil and filter replacement, fluid checks, tyre inspection, and brake checks.",
          },
          {
            title: "Service B (Major Service)",
            text: "Typically due at 20,000 miles or 2 years. Includes Service A items plus cabin pollen filter replacement, brake fluid flush, and thorough mechanical inspection.",
          },
        ],
      },
      {
        title: "2. AdBlue / DEF Countdown Messages",
        text: "Diesel Mercedes models display AdBlue level warnings. Ignore countdown warnings at your peril: once the counter reaches zero, the ECU prevents engine restarts by UK law.",
      },
      {
        title: "3. 'Brake Wear — Visit Workshop' Alert",
        text: "This amber alert indicates that acoustic or electronic brake pad wear sensors have contacted the disc surface, leaving approximately 1,500 miles of pad friction material remaining.",
      },
    ],
    faqs: [
      {
        question: "Can any garage reset Mercedes service ASSYST messages?",
        answer:
          "Yes. Qualified technicians can reset the ASSYST PLUS service counter upon completing the required servicing according to manufacturer specifications.",
      },
      {
        question: "What does the red Mercedes battery symbol mean?",
        answer:
          "It indicates a main 12V battery or auxiliary battery charging fault (alternator failure), requiring immediate electrical testing.",
      },
    ],
  },
  {
    slug: "common-car-problems-by-make",
    title: "Common Car Faults & Diagnostic Symptoms by Vehicle Make (UK Driver Guide)",
    category: "Car problems",
    summary:
      "Diagnostic guide covering frequent symptoms for BMW, Volkswagen, Ford, Mercedes, Audi, Toyota, and Tesla: misfires, brake squeal, suspension knocks, and tracking issues.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "9 min read",
    relatedService: "Auto Diagnostics",
    metaTitle: "Common Car Problems by Make — Diagnostic Symptoms UK",
    metaDescription:
      "Troubleshoot common car symptoms for BMW, VW, Ford, Mercedes & Audi. Learn what causes misfires, suspension knocks, and steering vibration.",
    sections: [
      {
        title: "1. BMW 1 Series, 3 Series & 5 Series Common Symptoms",
        text: "Frequent BMW issues include inner rear tyre shoulder wear due to aggressive camber settings, ABS sensor ring corrosion causing traction control light illumination, and warped front brake discs causing steering wheel judder under braking.",
      },
      {
        title: "2. Volkswagen Golf, Polo & Tiguan Symptoms",
        text: "VW owners frequently report engine light misfires caused by failing ignition coils, DPF clogging from city driving, and front lower control arm bush tearing causing clunking over speed bumps.",
      },
      {
        title: "3. Ford Fiesta, Focus & Kuga Symptoms",
        text: "Common Ford issues include front coil spring snaps resulting in metallic scraping sounds, power steering pulling caused by misaligned tracking, and brake pad squeal.",
      },
      {
        title: "4. Practical Next Steps for Any Vehicle Make",
        text: "Whenever your car exhibits unusual noises, vibration, or dashboard lights, note down the exact speed and conditions when it occurs. Contact The Auto Surgeon in Hayes with your vehicle registration for an accurate inspection.",
      },
    ],
    faqs: [
      {
        question: "How do I know if a noise is coming from brakes or wheel bearings?",
        answer:
          "Brake noise usually occurs specifically when pressing the brake pedal. Wheel bearing hum or growling changes pitch when swerving gently left and right at constant speed.",
      },
      {
        question: "Why does my car vibrate only when braking from high speeds?",
        answer:
          "Vibration exclusively under braking is caused by warped brake discs (runout) or uneven pad material deposition on the disc surface.",
      },
    ],
  },
];

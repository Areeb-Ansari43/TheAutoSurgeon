export type GuideSection = {
  title: string;
  text: string;
};
export type Guide = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  readTime: string;
  sections: GuideSection[];
  relatedService: string;
};
export const guides: Guide[] = [
  {
    slug: "tyre-safety-checks",
    title: "Simple tyre safety checks for everyday driving",
    category: "Tyre care",
    summary:
      "A practical before-you-go routine for spotting wear, damage and pressure issues before they become a bigger problem.",
    image: "/assets/photos/tyre-dunlop-dark.webp",
    readTime: "4 min read",
    relatedService: "Tyre fitting & puncture repairs",
    sections: [
      {
        title: "Start with a walk-around",
        text: "With the vehicle parked safely, look across each tyre, including the inner sidewalls where you can see them. Look for cuts, bulges, objects in the tread, cracking and uneven shoulder wear. A bulge, exposed cords or a deep cut needs professional attention; do not rely on a temporary repair for structural damage.",
      },
      {
        title: "Check tread where it matters",
        text: "For cars in Great Britain, the legal minimum tread depth is 1.6 mm across the central three-quarters of the tread and around the entire circumference. Treat that as a minimum, not a target: wet-weather grip reduces before a tyre reaches the limit.",
      },
      {
        title: "Use the right pressure",
        text: "Check pressures when tyres are cold and use the vehicle manufacturer's recommended settings, usually found in the handbook or on the vehicle. Repeated pressure loss or a visibly low tyre should be investigated rather than simply topped up.",
      },
      {
        title: "Know when to ask for a check",
        text: "Uneven wear, steering pull, vibration, kerb impacts and punctures are all reasons to arrange an inspection. Do not assume a run-flat tyre can be safely repaired after it has been driven deflated.",
      },
    ],
  },
  {
    slug: "warning-lights",
    title: "What to do when a dashboard warning light appears",
    category: "Diagnostics",
    summary:
      "A calm, safety-first approach to warning lights: what to note, when to stop, and how a diagnostic check can narrow down the cause.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "5 min read",
    relatedService: "Vehicle diagnostics",
    sections: [
      {
        title: "Read the signal, not just the colour",
        text: "Warning lights are vehicle-specific, so check your handbook for the exact symbol. In general, red warnings can indicate a problem requiring prompt attention, while amber warnings often mean the vehicle needs checking soon. A flashing light or a change in how the car drives is more urgent.",
      },
      {
        title: "Stop safely for serious warnings",
        text: "If a warning is red, the engine is overheating, oil pressure is indicated, braking feels abnormal, or you see smoke or smell burning, find a safe place to stop and follow the handbook guidance. If you are unsure, arrange recovery or seek appropriate assistance.",
      },
      {
        title: "Make a useful note",
        text: "Note the symbol, whether it was steady or flashing, any display message and symptoms such as poor starting, reduced power, vibration or unusual noises. This context helps a technician interpret stored fault information.",
      },
      {
        title: "Use diagnostics as the first step",
        text: "A scan can identify stored fault codes and live information, but a code is a clue rather than an automatic parts list. Good diagnosis combines the scan result with symptoms, visual checks and testing.",
      },
    ],
  },
  {
    slug: "wheel-alignment-signs",
    title: "Signs your vehicle may need wheel alignment",
    category: "Alignment",
    summary:
      "Learn the common signs of alignment concerns and why a measured adjustment can protect tyres, steering feel and day-to-day confidence.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "4 min read",
    relatedService: "Wheel alignment",
    sections: [
      {
        title: "Notice changes in the steering",
        text: "A steering wheel that sits off-centre on a level road, a vehicle that repeatedly drifts to one side, or a new tendency to wander can justify an alignment check. Road camber, tyre pressures and braking can also affect how a vehicle feels.",
      },
      {
        title: "Read the tyre wear pattern",
        text: "Feathering across the tread, rapid wear on one edge or noticeably different wear from one tyre to another can point to an alignment issue. It can also relate to tyre pressure, worn suspension components or driving conditions.",
      },
      {
        title: "Think back to impacts and repairs",
        text: "Potholes, kerb strikes and suspension or steering work can alter alignment angles or reveal a component problem. A visible bent wheel or damaged tyre needs attention before routine alignment work.",
      },
      {
        title: "Ask for measured results",
        text: "Before-and-after readings make the result easier to understand. If worn or damaged steering and suspension parts affect the work, they should be explained before you decide on the next step.",
      },
    ],
  },
  {
    slug: "emergency-car-repair-hayes",
    title: "Emergency car repair in Hayes: what to do first",
    category: "Emergency repairs",
    summary:
      "What to do when your car develops a sudden fault in Hayes, from warning lights and punctures to braking concerns and loss of power.",
    image: "/assets/photos/hero-orange-caliper.webp",
    readTime: "5 min read",
    relatedService: "Vehicle diagnostics",
    sections: [
      {
        title: "Make the vehicle safe",
        text: "If you are on the road, signal, move to a safe place if possible and switch on hazard lights. Do not keep driving if braking, steering, tyre condition, overheating or smoke makes the vehicle unsafe. Contact recovery or emergency services when the situation requires it.",
      },
      {
        title: "Call before travelling",
        text: "For urgent repair enquiries in Hayes, call The Auto Surgeon on 07767 909397 and explain the warning light, noise, impact or loss of performance. We can tell you whether an inspection is appropriate and aim to prioritise urgent cases where workshop capacity and parts allow.",
      },
      {
        title: "Bring the useful details",
        text: "Have the registration, location, vehicle make and model, warning-light colour, symptoms and any recent impact or repair ready. Clear information helps the workshop decide whether diagnostics, tyres, brakes or another first check is needed.",
      },
      {
        title: "Do not treat online forms as recovery",
        text: "Online requests are saved for the workshop but are not a live emergency dispatch service. For an unsafe or stranded vehicle, call the workshop or arrange suitable recovery first.",
      },
    ],
  },
  {
    slug: "car-maintenance-checklist",
    title: "A simple car maintenance checklist for Hayes drivers",
    category: "Maintenance",
    summary:
      "A useful monthly and before-a-long-journey checklist covering tyres, fluids, lights, warning signs and service records.",
    image: "/assets/photos/engine-oil-pour-wide.webp",
    readTime: "6 min read",
    relatedService: "Engine oil service",
    sections: [
      {
        title: "Check the basics monthly",
        text: "Check tyre pressure, visible tyre damage, lights, washer fluid and the engine oil level using the vehicle handbook. Look for new leaks, unusual smells or a change in how the car starts and drives.",
      },
      {
        title: "Before a long journey",
        text: "Check the condition and pressure of all tyres, including the spare if fitted, and make sure lights, wipers and windscreen visibility are good. Do not ignore a warning light that has appeared before travelling.",
      },
      {
        title: "Follow the vehicle schedule",
        text: "Manufacturer service intervals vary by vehicle, engine and usage. Keep service records and use the correct oil specification rather than choosing only by price or colour.",
      },
      {
        title: "Book an inspection when something changes",
        text: "New vibration, pulling, uneven tyre wear, brake noise, fluid loss or warning lights are useful reasons to arrange an inspection. Early advice can prevent a small issue becoming a larger repair.",
      },
    ],
  },
  {
    slug: "after-a-pothole-or-kerb-hit",
    title: "What to check after a pothole or kerb impact",
    category: "Safety checks",
    summary:
      "A post-impact checklist for tyre damage, wheel condition, steering changes and alignment concerns after a pothole or kerb strike.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "4 min read",
    relatedService: "Wheel alignment",
    sections: [
      {
        title: "Inspect before driving normally",
        text: "Look for a tyre bulge, cut, pressure loss, cracked wheel or visible damage. If the tyre is losing pressure or the steering feels unsafe, do not continue driving just to reach a workshop.",
      },
      {
        title: "Pay attention to new symptoms",
        text: "An off-centre steering wheel, pulling, vibration, knocking or uneven tyre wear can follow an impact. Tyre pressure and suspension condition can also affect these symptoms, so a measured inspection matters.",
      },
      {
        title: "Do not assume alignment is the only issue",
        text: "Alignment can be checked and adjusted where the vehicle and components allow it, but a bent wheel, damaged tyre or worn steering/suspension part must be identified and explained first.",
      },
      {
        title: "Keep the details",
        text: "Note when and where the impact happened, whether the vehicle was loaded, and which corner was affected. This helps the workshop focus the initial check.",
      },
    ],
  },
  {
    slug: "tesla-tyre-warning-and-alignment",
    title: "Tesla tyre warnings and alignment: what to check",
    category: "Tesla care",
    summary:
      "A safe, practical guide to Tesla tyre-pressure alerts, cold-pressure checks, tyre damage and when alignment or inspection is needed.",
    image: "/assets/photos/wheel-alignment.webp",
    readTime: "5 min read",
    relatedService: "Tesla wheel alignment",
    sections: [
      {
        title: "Read the alert before driving",
        text: "Tesla's Model 3 manual distinguishes an amber under-inflation alert from a red severe-under-inflation alert. A red alert means pull over safely; do not continue as though the warning is only a dashboard nuisance.",
      },
      {
        title: "Check pressures cold",
        text: "Use the recommended cold pressure shown on the vehicle's tyre-and-loading label, not the maximum pressure printed on the tyre. Tesla advises checking with an accurate gauge when the car has been stationary and not letting air out of a warm tyre to chase a cold-pressure number.",
      },
      {
        title: "Look for damage, not only pressure",
        text: "Inspect the tread and sidewalls for cuts, bulges, foreign objects, unusual wear or exposed cord. Do not drive on a damaged or incorrectly inflated tyre. A pressure warning can have more than one cause, including a leak or TPMS fault.",
      },
      {
        title: "When alignment is worth checking",
        text: "A kerb impact, steering-wheel vibration, off-centre steering or uneven shoulder wear can justify a measured alignment and wheel inspection. Tesla also notes that rotation and alignment requirements vary with wheel and tyre configuration, so the exact vehicle setup matters.",
      },
      {
        title: "What we can and cannot promise",
        text: "The Auto Surgeon can assess Tesla tyre condition and alignment-related symptoms. High-voltage battery, charging-system and other specialist repairs should follow Tesla or appropriately qualified EV service guidance; do not attempt high-voltage work from an online guide.",
      },
    ],
  },
  {
    slug: "toyota-hybrid-warning-lights",
    title: "Toyota hybrid warning lights: safe next steps",
    category: "Toyota care",
    summary:
      "How Toyota owners should respond to hybrid, brake, tyre and master-warning messages without guessing at the repair.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "5 min read",
    relatedService: "Vehicle diagnostics",
    sections: [
      {
        title: "Start with the exact symbol",
        text: "Toyota says its warning lights and sensors are there to inform drivers about possible faults, and directs owners to the vehicle information and owner's manual for the relevant model. A symbol can look similar across cars but mean something different, so record the wording and colour shown on your Toyota.",
      },
      {
        title: "Do not ignore a hybrid-system warning",
        text: "A hybrid-system or master-warning message needs the model-specific manual's instructions and a proper assessment. Do not open high-voltage components or try to repair the hybrid battery yourself. If the car is losing power, behaving abnormally or showing a red safety warning, stop safely and arrange appropriate assistance.",
      },
      {
        title: "Check the ordinary safety items too",
        text: "Hybrid ownership does not remove normal tyre, brake, light, fluid and windscreen checks. UK Highway Code guidance says tyres must be correctly inflated to the manufacturer's specification and cars need at least 1.6 mm of tread across the central three-quarters around the full circumference.",
      },
      {
        title: "Useful details for a diagnostic visit",
        text: "Bring the registration, model and year, the warning text or symbol, whether it was steady or flashing, and any change in braking, steering, starting or power. That information helps separate a sensor message from a broader vehicle fault.",
      },
    ],
  },
  {
    slug: "mercedes-warning-lights-service",
    title: "Mercedes warning lights and service messages explained",
    category: "Mercedes care",
    summary:
      "A sensible first response to Mercedes service reminders, tyre and brake alerts, and model-specific dashboard messages.",
    image: "/assets/photos/diagnostics-tablet.webp",
    readTime: "5 min read",
    relatedService: "Vehicle diagnostics",
    sections: [
      {
        title: "Use the correct Mercedes manual",
        text: "Mercedes-Benz UK provides owner manuals by model and body type. Check the manual for your exact vehicle because the meaning and response for a warning lamp or display message can depend on the model, engine, equipment and model year.",
      },
      {
        title: "Service reminder versus fault warning",
        text: "A routine service reminder is not the same as a red brake, oil-pressure, overheating or steering warning. Record the exact message and colour. If the vehicle feels unsafe or a serious warning remains on after starting, stop safely and follow the manual or recovery guidance.",
      },
      {
        title: "Common tyre and brake symptoms",
        text: "Pressure loss, a tyre-pressure warning, pulling under braking, a soft or changing brake pedal, grinding or a new vibration all deserve prompt inspection. Do not assume a sensor reset has fixed the underlying tyre, brake or suspension issue.",
      },
      {
        title: "Diesel and AdBlue messages",
        text: "AdBlue and diesel-related messages are model-specific. Follow the displayed instruction and owner's manual rather than guessing a quantity or reset procedure. If a countdown or reduced-power warning appears, contact a qualified workshop promptly.",
      },
      {
        title: "Bring the message with you",
        text: "A photo of the dashboard, the exact model and year, recent work, and any new noise or driving change make a first diagnostic conversation more useful. We can assess common service, tyre, brake and diagnostic concerns and explain when Mercedes-specific support is needed.",
      },
    ],
  },
];

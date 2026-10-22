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
];

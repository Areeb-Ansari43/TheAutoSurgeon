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
        text: "For cars in Great Britain, the legal minimum tread depth is 1.6 mm across the central three-quarters of the tread and around the entire circumference. Treat that as a minimum, not a target: wet-weather grip reduces before a tyre reaches the limit. Wear indicators in the main grooves can help you see when tread is getting low.",
      },
      {
        title: "Use the right pressure",
        text: "Check pressures when tyres are cold and use the vehicle manufacturer's recommended settings, usually found in the handbook or on the vehicle. Compare all four tyres and the spare if fitted. A pressure warning light, repeated pressure loss or a visibly low tyre should be investigated rather than simply topped up.",
      },
      {
        title: "Know when to ask for a check",
        text: "Uneven wear, steering pull, vibration, kerb impacts and punctures are all reasons to arrange an inspection. A technician can assess the tyre, wheel and valve area and advise whether replacement, a puncture repair or an alignment check is appropriate. Do not assume a run-flat tyre can be safely repaired after it has been driven deflated.",
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
        text: "Warning lights are vehicle-specific, so check your handbook for the exact symbol. In general, red warnings can indicate a problem requiring prompt attention, while amber warnings often mean the vehicle needs checking soon. A flashing light or a change in how the car drives is more urgent than a light that simply appears with no other symptoms.",
      },
      {
        title: "Stop safely for serious warnings",
        text: "If a warning is red, the engine is overheating, oil pressure is indicated, braking feels abnormal, or you see smoke or smell burning, find a safe place to stop and follow the handbook guidance. Do not continue driving just to reach a workshop if doing so may damage the vehicle or create a safety risk. If you are unsure, arrange recovery or seek appropriate assistance.",
      },
      {
        title: "Make a useful note",
        text: "Before the light disappears, note the symbol, whether it was steady or flashing, when it appeared, any message on the display and any symptoms such as poor starting, reduced power, vibration or unusual noises. This context helps a technician reproduce the issue and interpret stored fault information.",
      },
      {
        title: "Use diagnostics as the first step",
        text: "A scan can identify stored fault codes and live information, but a code is a clue rather than an automatic parts list. Good diagnosis combines the scan result with the vehicle's symptoms, visual checks and, where needed, testing. Ask what the findings mean and what further checks are recommended before authorising work.",
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
        text: "A steering wheel that sits off-centre on a level road, a vehicle that repeatedly drifts to one side, or a new tendency to wander can justify an alignment check. Road camber, tyre pressures and braking can also affect how a vehicle feels, so a measured inspection is more useful than assuming one cause.",
      },
      {
        title: "Read the tyre wear pattern",
        text: "Feathering across the tread, rapid wear on one edge or noticeably different wear from one tyre to another can point to an alignment issue. It can also be related to tyre pressure, worn suspension components or driving conditions. Checking the whole setup before adjustment helps avoid masking another fault.",
      },
      {
        title: "Think back to impacts and repairs",
        text: "Potholes, kerb strikes and suspension or steering work can alter alignment angles or reveal a component problem. If the vehicle has had a hard impact, has started vibrating or the steering has changed, arrange an inspection. A visible bent wheel or damaged tyre needs attention before routine alignment work.",
      },
      {
        title: "Ask for measured results",
        text: "Alignment is an adjustment to manufacturer specifications where the vehicle and its components allow it. Before-and-after readings make the result easier to understand. If worn or damaged steering and suspension parts affect the work, they should be explained before you decide on the next step.",
      },
    ],
  },
];

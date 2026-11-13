/** FAQ content shared by the pages and their FAQPage structured data. */
export type Faq = { question: string; answer: string };

export const siteFaqs: Faq[] = [
  {
    question: "Does sending a booking request confirm my appointment?",
    answer:
      "No. A booking request gives the workshop the details needed to check availability. Your appointment is only confirmed when the workshop confirms it with you.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "The workshop is open Monday to Saturday, 9:00–18:00. Sunday is by appointment only. Do not make an online booking request for Sunday; contact the workshop first to discuss availability.",
  },
  {
    question: "Are the displayed prices inclusive of parts?",
    answer:
      "No, listed prices are labour only unless specifically stated otherwise. The TPMS service is £60 including the part. Tyres, fluids, vehicle-specific parts and additional work are not included in the labour prices shown.",
  },
  {
    question: "Can you help with a puncture or a tyre losing pressure?",
    answer:
      "Yes, contact the workshop for a tyre or puncture inspection. Whether a tyre can be repaired depends on the location and nature of the damage and the condition of the tyre. A bulge, exposed cords or serious damage needs professional assessment.",
  },
  {
    question: "Do you work on Tesla vehicles?",
    answer:
      "Tesla wheel alignment is offered at £60 labour. This is wheel-alignment work, not Tesla battery servicing, battery diagnosis or high-voltage repair.",
  },
  {
    question: "My dashboard light has come on. Should I keep driving?",
    answer:
      "Check the vehicle handbook for the specific symbol. If the warning is red, flashing, linked with overheating, low oil pressure, abnormal braking, smoke or a burning smell, stop safely and follow the handbook advice. For other warnings, contact the workshop to discuss diagnostics as soon as practical.",
  },
  {
    question: "Do you carry out MOTs?",
    answer:
      "MOT enquiries are welcome. Contact the business to discuss what you need. This website does not make an online MOT booking or state that the workshop is an authorised MOT test centre.",
  },
  {
    question: "What should I include when I contact the workshop?",
    answer:
      "Include your vehicle registration, make and model, the service you are interested in, when the problem began and any symptoms or dashboard messages you have noticed. Photos of obvious tyre damage can also be useful, but do not drive a vehicle you believe is unsafe simply to take a photo.",
  },
];

export const homeFaqs: Faq[] = [
  {
    question: "Can I visit without an appointment?",
    answer:
      "Walk-ins are welcome Monday to Saturday, 9 AM to 6 PM. Calling ahead helps us check capacity and any parts or tyre specifications you need.",
  },
  {
    question: "Are the prices for parts and labour?",
    answer:
      "Published prices are labour only unless noted. The £60 TPMS sensor change includes the part. We confirm parts and the full quote before work starts.",
  },
  {
    question: "Does an online request confirm my appointment?",
    answer:
      "No. Your date and time are preferences. We save your request and the workshop must confirm availability before you travel.",
  },
];

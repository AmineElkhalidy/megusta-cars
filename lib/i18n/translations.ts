import type { Locale } from "./types";

/**
 * Complete translation dictionary for the customer-facing experience.
 * Darija is written in Arabic script ("الدارجة") using natural everyday phrasing —
 * not MSA — because that's how Moroccans actually speak.
 *
 * Admin pages stay in English; they're used by staff.
 */
export type Dictionary = {
  nav: { cars: string; myTrips: string; callUs: string };
  floatingHelp: { chat: string; short: string };
  hero: {
    tagline: string;
    headlineBefore: string;
    headlineAccent: string;
    headlineAfter: string;
    subtitle: string;
    seeCars: string;
    callLabel: string;
    noCard: string;
    priceFrom: string;
    priceUnit: string;
  };
  quickBook: { where: string; from: string; until: string; findMyCar: string };
  trust: { items: { label: string; hint: string }[] };
  steps: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stepLabel: string;
    items: { title: string; body: string }[];
  };
  featured: {
    eyebrow: string;
    title: string;
    subtitle: string;
    seeAll: string;
  };
  stats: { items: { value: string; label: string }[] };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { body: string; name: string; city: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    call: string;
    whatsapp: string;
  };
  footer: {
    needHelp: string;
    whatsappCta: string;
    findUs: string;
    findUsCopy: string;
    linkCars: string;
    linkTrips: string;
    legal: string;
  };
  cars: {
    stepLabel: string;
    title: string;
    countAvailable: (count: number) => string;
    bookNow: string;
    emptyTitle: string;
    emptySubtitle: string;
    clearFilters: (count: number) => string;
    filterLabels: { type: string; transmission: string; fuel: string };
    options: {
      type: Record<string, string>;
      transmission: Record<string, string>;
      fuel: Record<string, string>;
    };
  };
  carDetails: {
    back: string;
    stepEyebrow: string;
    goodToKnow: string;
    whatsIncluded: string;
    bookingWhere: string;
    bookingFrom: string;
    bookingUntil: string;
    available: string;
    perDay: string;
    bookThisCar: string;
    noCard: string;
    orCall: string;
    youPay: string;
    dayCount: (n: number) => string;
    specs: {
      transmission: string;
      fuel: string;
      seats: string;
      doors: string;
      climate: string;
      year: string;
      ac: string;
      noAc: string;
    };
  };
  checkout: {
    stepEyebrow: string;
    title: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    emailLabel: string;
    emailPlaceholder: string;
    confirmButton: string;
    submitting: string;
    disclaimer: string;
    alternativeLabel: string;
    callButton: string;
    whatsappButton: string;
    summaryTitle: string;
    datesLabel: string;
    locationsLabel: string;
    returnLabel: string;
    payLabel: string;
    noCardBanner: string;
    dayCount: (n: number) => string;
  };
  success: {
    title: string;
    body: string;
    referenceLabel: string;
    seeTrip: string;
    browseMore: string;
    error: string;
  };
  dashboard: {
    hello: string;
    title: string;
    subtitle: string;
    upcoming: string;
    past: string;
    loading: string;
    emptyTitle: string;
    emptySubtitle: string;
    emptyCta: string;
    datesLabel: string;
    locationsLabel: string;
    totalLabel: string;
    payAtPickup: string;
    cancel: string;
  };
  status: {
    pending: string;
    approved: string;
    rejected: string;
    completed: string;
    cancelled: string;
  };
  language: {
    choose: string;
  };
};

export const translations: Record<Locale, Dictionary> = {
  // ─────────────────────────────────────────────────────────────────────────
  en: {
    nav: { cars: "Cars", myTrips: "My trips", callUs: "Call us" },
    floatingHelp: { chat: "Chat with us", short: "Help" },
    hero: {
      tagline: "Rent a car in three easy steps.",
      headlineBefore: "The easiest way to",
      headlineAccent: "rent a car",
      headlineAfter: "in town.",
      subtitle:
        "Pick your dates, pick your car, and meet us at the desk. No website account needed, no card up-front — just show up and drive away.",
      seeCars: "See our cars",
      callLabel: "Call",
      noCard: "No credit card required · Pay at the agency when you pick up.",
      priceFrom: "From",
      priceUnit: "/ day",
    },
    quickBook: {
      where: "Where?",
      from: "From",
      until: "Until",
      findMyCar: "Find my car",
    },
    trust: {
      items: [
        { label: "Pay at pick-up", hint: "No card needed" },
        { label: "Fully insured", hint: "Safety first" },
        { label: "Open every day", hint: "7 days a week" },
        { label: "We speak your language", hint: "Always kind" },
      ],
    },
    steps: {
      eyebrow: "Simple as 1 · 2 · 3",
      title: "That's it. Really.",
      subtitle: "No surprises, no confusing forms. Just three friendly steps.",
      stepLabel: "Step",
      items: [
        { title: "Pick your dates", body: "Tell us when you need the car. It only takes a few seconds." },
        { title: "Choose your car", body: "Browse our cars and pick the one you like best." },
        { title: "Come pick it up", body: "Meet us at the desk, bring your license, pay, and drive away." },
      ],
    },
    featured: {
      eyebrow: "Our favourites",
      title: "Popular this month",
      subtitle: "Clean, recent, and ready to drive. Tap one to see photos and prices.",
      seeAll: "See all cars",
    },
    stats: {
      items: [
        { value: "12k+", label: "Happy trips" },
        { value: "4.9★", label: "Customer rating" },
        { value: "24/7", label: "Phone support" },
        { value: "3 min", label: "To book a car" },
      ],
    },
    testimonials: {
      eyebrow: "Real people",
      title: "Loved by drivers like you.",
      items: [
        { body: "Easiest rental I've ever done. One call and the car was waiting for me.", name: "Fatima", city: "Rabat" },
        { body: "No card, no stress. The team was so nice and the car was spotless.", name: "David", city: "Barcelona" },
        { body: "I'm not good with websites but this one is so easy. My whole family uses it now.", name: "Amina", city: "Marrakech" },
      ],
    },
    cta: {
      eyebrow: "Prefer to talk to a human?",
      title: "We'd love to hear from you. ☎️",
      subtitle:
        "Call us or send a WhatsApp message — we'll help you pick the right car and book it for you in less than a minute.",
      call: "Call",
      whatsapp: "WhatsApp us",
    },
    footer: {
      needHelp: "Need help?",
      whatsappCta: "Message us on WhatsApp",
      findUs: "Find us",
      findUsCopy: "City center & airport — open 7 days a week.",
      linkCars: "See our cars",
      linkTrips: "My trips",
      legal: "Pay at pick-up. No card required.",
    },
    cars: {
      stepLabel: "Step 1 of 3 · Pick a car",
      title: "Which one do you love? ❤️",
      countAvailable: (n) => `${n} ${n === 1 ? "car" : "cars"} available. Tap one to see more.`,
      bookNow: "Book now",
      emptyTitle: "No cars match those filters",
      emptySubtitle: "Try removing a filter. There's something in the fleet for almost every trip.",
      clearFilters: (n) => `Clear filters (${n})`,
      filterLabels: { type: "Type", transmission: "Gears", fuel: "Fuel" },
      options: {
        type: { Sedan: "Sedan", SUV: "SUV", Coupe: "Coupe", Hatchback: "Hatchback" },
        transmission: { Automatic: "Automatic", Manual: "Manual" },
        fuel: { Gasoline: "Gasoline", Diesel: "Diesel", Electric: "Electric", Hybrid: "Hybrid" },
      },
    },
    carDetails: {
      back: "Back to cars",
      stepEyebrow: "Step 1 of 3",
      goodToKnow: "Good to know",
      whatsIncluded: "What's included",
      bookingWhere: "Pick-up & drop-off",
      bookingFrom: "From",
      bookingUntil: "Until",
      available: "Available",
      perDay: "per day",
      bookThisCar: "Book this car",
      noCard: "No card needed · pay at pick-up",
      orCall: "Or call",
      youPay: "You pay at pick-up",
      dayCount: (n) => `${n} ${n === 1 ? "day" : "days"}`,
      specs: {
        transmission: "Transmission",
        fuel: "Fuel",
        seats: "Seats",
        doors: "Doors",
        climate: "Climate",
        year: "Year",
        ac: "Air Conditioning",
        noAc: "Manual",
      },
    },
    checkout: {
      stepEyebrow: "Almost there",
      title: "Last step. Promise. 🤝",
      formTitle: "Tell us who you are 👋",
      formSubtitle: "Just three quick things so we can hold the car for you.",
      nameLabel: "Your name",
      namePlaceholder: "e.g. Amine Berrada",
      phoneLabel: "Phone number",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      confirmButton: "Confirm my reservation",
      submitting: "Just a moment…",
      disclaimer: "No credit card needed. You'll pay at the agency when you pick up the car.",
      alternativeLabel: "Prefer to book by phone?",
      callButton: "Call us",
      whatsappButton: "WhatsApp",
      summaryTitle: "Your trip",
      datesLabel: "Dates",
      locationsLabel: "Pick-up & drop-off",
      returnLabel: "Return",
      payLabel: "You pay at pick-up",
      noCardBanner: "No credit card required. Pay when you pick up the car.",
      dayCount: (n) => `${n} ${n === 1 ? "day" : "days"}`,
    },
    success: {
      title: "You're all set!",
      body:
        "We're holding the car for you. Bring your driver's license to the desk and pay when you arrive. We'll also call you to confirm.",
      referenceLabel: "Reservation",
      seeTrip: "See my trip",
      browseMore: "Browse more cars",
      error: "Something went wrong. Please try again.",
    },
    dashboard: {
      hello: "Hello there 👋",
      title: "My trips",
      subtitle: "Here's everything you've booked. We'll text you before every pick-up.",
      upcoming: "Upcoming",
      past: "Past & cancelled",
      loading: "Loading your reservations…",
      emptyTitle: "No reservations yet",
      emptySubtitle: "When you book a car, it'll show up right here so you can keep track of your trips.",
      emptyCta: "Browse the fleet",
      datesLabel: "Dates",
      locationsLabel: "Locations",
      totalLabel: "Total",
      payAtPickup: "pay at pick-up",
      cancel: "Cancel",
    },
    status: {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    language: { choose: "Choose language" },
  },

  // ─────────────────────────────────────────────────────────────────────────
  fr: {
    nav: { cars: "Voitures", myTrips: "Mes trajets", callUs: "Appelez-nous" },
    floatingHelp: { chat: "Discuter avec nous", short: "Aide" },
    hero: {
      tagline: "Louez une voiture en trois étapes faciles.",
      headlineBefore: "La façon la plus simple de",
      headlineAccent: "louer une voiture",
      headlineAfter: "en ville.",
      subtitle:
        "Choisissez vos dates, choisissez votre voiture, et retrouvez-nous à l'agence. Pas de compte, pas de carte à l'avance — venez et partez au volant.",
      seeCars: "Voir nos voitures",
      callLabel: "Appeler",
      noCard: "Aucune carte requise · Payez à l'agence le jour du retrait.",
      priceFrom: "À partir de",
      priceUnit: "/ jour",
    },
    quickBook: {
      where: "Où ?",
      from: "Du",
      until: "Au",
      findMyCar: "Trouver ma voiture",
    },
    trust: {
      items: [
        { label: "Payez au retrait", hint: "Sans carte" },
        { label: "Entièrement assurées", hint: "Sécurité avant tout" },
        { label: "Ouvert tous les jours", hint: "7 jours sur 7" },
        { label: "On parle votre langue", hint: "Toujours accueillants" },
      ],
    },
    steps: {
      eyebrow: "Simple comme 1 · 2 · 3",
      title: "Et c'est tout. Vraiment.",
      subtitle: "Aucune surprise, aucun formulaire compliqué. Juste trois étapes sympathiques.",
      stepLabel: "Étape",
      items: [
        { title: "Choisissez vos dates", body: "Dites-nous quand vous voulez la voiture. Quelques secondes suffisent." },
        { title: "Choisissez votre voiture", body: "Parcourez notre flotte et choisissez celle que vous aimez." },
        { title: "Venez la récupérer", body: "Retrouvez-nous à l'agence, apportez votre permis, payez, et partez." },
      ],
    },
    featured: {
      eyebrow: "Nos préférées",
      title: "Populaires ce mois-ci",
      subtitle: "Propres, récentes et prêtes à rouler. Touchez une voiture pour voir photos et prix.",
      seeAll: "Voir toutes les voitures",
    },
    stats: {
      items: [
        { value: "12k+", label: "Trajets heureux" },
        { value: "4.9★", label: "Note des clients" },
        { value: "24/7", label: "Support téléphonique" },
        { value: "3 min", label: "Pour réserver" },
      ],
    },
    testimonials: {
      eyebrow: "Vraies personnes",
      title: "Adoré par des conducteurs comme vous.",
      items: [
        { body: "La location la plus simple que j'ai jamais faite. Un appel et la voiture m'attendait.", name: "Fatima", city: "Rabat" },
        { body: "Sans carte, sans stress. L'équipe était adorable et la voiture impeccable.", name: "David", city: "Barcelone" },
        { body: "Je ne suis pas douée avec les sites, mais celui-ci est si simple. Toute ma famille l'utilise.", name: "Amina", city: "Marrakech" },
      ],
    },
    cta: {
      eyebrow: "Vous préférez parler à un humain ?",
      title: "On serait ravi de vous entendre. ☎️",
      subtitle:
        "Appelez-nous ou envoyez un WhatsApp — on vous aide à choisir la bonne voiture et on la réserve en moins d'une minute.",
      call: "Appeler",
      whatsapp: "WhatsApp",
    },
    footer: {
      needHelp: "Besoin d'aide ?",
      whatsappCta: "Envoyez-nous un WhatsApp",
      findUs: "Nous trouver",
      findUsCopy: "Centre-ville & aéroport — ouvert 7 jours sur 7.",
      linkCars: "Voir nos voitures",
      linkTrips: "Mes trajets",
      legal: "Paiement au retrait. Aucune carte requise.",
    },
    cars: {
      stepLabel: "Étape 1 sur 3 · Choisir une voiture",
      title: "Laquelle vous plaît ? ❤️",
      countAvailable: (n) => `${n} voiture${n === 1 ? "" : "s"} disponible${n === 1 ? "" : "s"}. Touchez pour en voir plus.`,
      bookNow: "Réserver",
      emptyTitle: "Aucune voiture ne correspond",
      emptySubtitle: "Essayez de retirer un filtre. Il y a une voiture pour presque chaque trajet.",
      clearFilters: (n) => `Effacer les filtres (${n})`,
      filterLabels: { type: "Type", transmission: "Boîte", fuel: "Carburant" },
      options: {
        type: { Sedan: "Berline", SUV: "SUV", Coupe: "Coupé", Hatchback: "Citadine" },
        transmission: { Automatic: "Automatique", Manual: "Manuelle" },
        fuel: { Gasoline: "Essence", Diesel: "Diesel", Electric: "Électrique", Hybrid: "Hybride" },
      },
    },
    carDetails: {
      back: "Retour aux voitures",
      stepEyebrow: "Étape 1 sur 3",
      goodToKnow: "Bon à savoir",
      whatsIncluded: "Ce qui est inclus",
      bookingWhere: "Retrait & retour",
      bookingFrom: "Du",
      bookingUntil: "Au",
      available: "Disponible",
      perDay: "par jour",
      bookThisCar: "Réserver cette voiture",
      noCard: "Sans carte · payez au retrait",
      orCall: "Ou appelez",
      youPay: "Vous payez au retrait",
      dayCount: (n) => `${n} ${n === 1 ? "jour" : "jours"}`,
      specs: {
        transmission: "Transmission",
        fuel: "Carburant",
        seats: "Places",
        doors: "Portes",
        climate: "Climatisation",
        year: "Année",
        ac: "Climatisation",
        noAc: "Manuelle",
      },
    },
    checkout: {
      stepEyebrow: "Presque fini",
      title: "Dernière étape. Promis. 🤝",
      formTitle: "Dites-nous qui vous êtes 👋",
      formSubtitle: "Trois informations rapides pour qu'on vous garde la voiture.",
      nameLabel: "Votre nom",
      namePlaceholder: "ex. Amine Berrada",
      phoneLabel: "Numéro de téléphone",
      emailLabel: "E-mail",
      emailPlaceholder: "vous@example.com",
      confirmButton: "Confirmer ma réservation",
      submitting: "Un instant…",
      disclaimer: "Aucune carte nécessaire. Vous payez à l'agence le jour du retrait.",
      alternativeLabel: "Vous préférez par téléphone ?",
      callButton: "Appeler",
      whatsappButton: "WhatsApp",
      summaryTitle: "Votre trajet",
      datesLabel: "Dates",
      locationsLabel: "Retrait & retour",
      returnLabel: "Retour",
      payLabel: "Vous payez au retrait",
      noCardBanner: "Aucune carte requise. Payez au retrait de la voiture.",
      dayCount: (n) => `${n} ${n === 1 ? "jour" : "jours"}`,
    },
    success: {
      title: "C'est bon, tout est prêt !",
      body:
        "On vous garde la voiture. Apportez votre permis à l'agence et payez à votre arrivée. On vous appellera aussi pour confirmer.",
      referenceLabel: "Réservation",
      seeTrip: "Voir mon trajet",
      browseMore: "Voir plus de voitures",
      error: "Une erreur est survenue. Réessayez.",
    },
    dashboard: {
      hello: "Bonjour 👋",
      title: "Mes trajets",
      subtitle: "Voici tout ce que vous avez réservé. On vous écrira avant chaque retrait.",
      upcoming: "À venir",
      past: "Passés & annulés",
      loading: "Chargement de vos réservations…",
      emptyTitle: "Aucune réservation pour l'instant",
      emptySubtitle: "Quand vous réservez une voiture, elle apparaît ici pour vous aider à suivre vos trajets.",
      emptyCta: "Voir la flotte",
      datesLabel: "Dates",
      locationsLabel: "Lieux",
      totalLabel: "Total",
      payAtPickup: "payé au retrait",
      cancel: "Annuler",
    },
    status: {
      pending: "En attente",
      approved: "Confirmée",
      rejected: "Refusée",
      completed: "Terminée",
      cancelled: "Annulée",
    },
    language: { choose: "Choisir la langue" },
  },

  // ─────────────────────────────────────────────────────────────────────────
  ar: {
    nav: { cars: "الطوموبيلات", myTrips: "السفرات ديالي", callUs: "عيّط علينا" },
    floatingHelp: { chat: "تهدر معانا", short: "مساعدة" },
    hero: {
      tagline: "كري طوموبيل ف 3 خطوات ساهلة.",
      headlineBefore: "أسهل طريقة باش",
      headlineAccent: "تكري طوموبيل",
      headlineAfter: "ف المدينة.",
      subtitle:
        "اختار النهارات، اختار الطوموبيل، ونتلاقاو ف المكتب. بلا حساب، بلا كارط — غير جي وتمشي.",
      seeCars: "شوف الطوموبيلات ديالنا",
      callLabel: "عيط",
      noCard: "بلا كارط بنكية · خلّص ف المكتب ملي تجي تأخدها.",
      priceFrom: "من",
      priceUnit: "/ نهار",
    },
    quickBook: {
      where: "فين؟",
      from: "من",
      until: "حتى",
      findMyCar: "لقالي طوموبيل",
    },
    trust: {
      items: [
        { label: "خلّص ف المكتب", hint: "بلا كارط" },
        { label: "مأمنين كاملين", hint: "السلامة قبل كلشي" },
        { label: "محلولين كل نهار", hint: "7 أيام ف السيمانا" },
        { label: "كنهدرو اللغة ديالك", hint: "دائما مرحبا بيك" },
      ],
    },
    steps: {
      eyebrow: "ساهل كيف 1 · 2 · 3",
      title: "صافي، هاد شي هو.",
      subtitle: "بلا مفاجآت، بلا فورمات صعيبة. غير 3 خطوات ساهلة.",
      stepLabel: "خطوة",
      items: [
        { title: "اختار النهارات", body: "قلنا فوقاش بغيتي الطوموبيل. غير شي ثواني." },
        { title: "اختار الطوموبيل", body: "شوف الطوموبيلات واختار اللي عجباتك." },
        { title: "جي خودها", body: "تلاقانا ف المكتب، جيب البيرمي، خلّص، و سير." },
      ],
    },
    featured: {
      eyebrow: "المفضلات ديالنا",
      title: "اللي كيكريوهم بزّاف هاد الشهر",
      subtitle: "نقيين، جداد، و حاضرين للسياقة. كلّي على وحدة باش تشوف التصاور و الأثمنة.",
      seeAll: "شوف كاملين",
    },
    stats: {
      items: [
        { value: "+12k", label: "سفرات فرحت الناس" },
        { value: "★4.9", label: "تقييم الزبناء" },
        { value: "24/7", label: "دعم بالتلفون" },
        { value: "3 دقائق", label: "باش تحجز" },
      ],
    },
    testimonials: {
      eyebrow: "ناس حقيقيين",
      title: "السواقة كيبغيونا.",
      items: [
        { body: "أسهل كراء درتو ف حياتي. عيّطت ليهم و الطوموبيل كانت كتستناني.", name: "فاطمة", city: "الرباط" },
        { body: "بلا كارط، بلا تعب. الفريق كان لطيف و الطوموبيل ناقية.", name: "داوود", city: "برشلونة" },
        { body: "ما كنعرفش مزيان السيتات، ولكن هادا ساهل بزاف. العائلة كاملة كتستعملو.", name: "أمينة", city: "مراكش" },
      ],
    },
    cta: {
      eyebrow: "بغيتي تهدر مع إنسان؟",
      title: "فرحانين نسمعو منك ☎️",
      subtitle:
        "عيّط علينا ولا صيفط واتساب — نعاونوك تختار الطوموبيل المناسبة و نحجزوها ليك ف أقل من دقيقة.",
      call: "عيط",
      whatsapp: "واتساب",
    },
    footer: {
      needHelp: "محتاج مساعدة؟",
      whatsappCta: "صيفط لينا واتساب",
      findUs: "لقينا",
      findUsCopy: "وسط المدينة و المطار — محلولين 7 أيام ف السيمانا.",
      linkCars: "شوف الطوموبيلات",
      linkTrips: "السفرات ديالي",
      legal: "خلّص ف المكتب. بلا كارط.",
    },
    cars: {
      stepLabel: "خطوة 1 من 3 · اختار طوموبيل",
      title: "أشمن وحدة عجباتك؟ ❤️",
      countAvailable: (n) => `${n} طوموبيل${n === 1 ? "" : "ات"} متوفرين. كلّي على وحدة باش تشوف أكثر.`,
      bookNow: "احجز دابا",
      emptyTitle: "ما كاين حتى طوموبيل ف هاد الفلترة",
      emptySubtitle: "جرّب تنحّي شي فلتر. كيكون دائما شي طوموبيل مناسبة.",
      clearFilters: (n) => `نقّي الفلاتر (${n})`,
      filterLabels: { type: "النوع", transmission: "السرعات", fuel: "الكازوال" },
      options: {
        type: { Sedan: "سيدان", SUV: "SUV", Coupe: "كوبي", Hatchback: "صغيرة" },
        transmission: { Automatic: "أوتوماتيك", Manual: "ميكانيك" },
        fuel: { Gasoline: "ليسانس", Diesel: "كازوال", Electric: "كهربائية", Hybrid: "هجينة" },
      },
    },
    carDetails: {
      back: "رجع للطوموبيلات",
      stepEyebrow: "خطوة 1 من 3",
      goodToKnow: "معلومات مفيدة",
      whatsIncluded: "اللي داخل",
      bookingWhere: "البروفونان و الرجوع",
      bookingFrom: "من",
      bookingUntil: "حتى",
      available: "متوفرة",
      perDay: "ف النهار",
      bookThisCar: "احجز هاد الطوموبيل",
      noCard: "بلا كارط · خلّص ف المكتب",
      orCall: "ولا عيط",
      youPay: "كتخلّص ف المكتب",
      dayCount: (n) => `${n} ${n === 1 ? "نهار" : "أيام"}`,
      specs: {
        transmission: "ترانسميسيون",
        fuel: "الكازوال",
        seats: "البلايص",
        doors: "البيبان",
        climate: "المكيّف",
        year: "السنة",
        ac: "مكيّف",
        noAc: "عادي",
      },
    },
    checkout: {
      stepEyebrow: "قربنا نوصلو",
      title: "الخطوة الأخيرة. نوعدك. 🤝",
      formTitle: "قلنا شكون نتا 👋",
      formSubtitle: "غير 3 حوايج صغار باش نسدّو ليك الطوموبيل.",
      nameLabel: "السمية ديالك",
      namePlaceholder: "مثلاً: أمين برادة",
      phoneLabel: "رقم التلفون",
      emailLabel: "الإيميل",
      emailPlaceholder: "you@example.com",
      confirmButton: "أكّد الحجز",
      submitting: "واحد اللحيظة...",
      disclaimer: "بلا كارط. كتخلّص ف المكتب ملي تجي تأخد الطوموبيل.",
      alternativeLabel: "بغيتي تحجز بالتلفون؟",
      callButton: "عيّط علينا",
      whatsappButton: "واتساب",
      summaryTitle: "السفر ديالك",
      datesLabel: "النهارات",
      locationsLabel: "البروفونان و الرجوع",
      returnLabel: "الرجوع",
      payLabel: "كتخلّص ف المكتب",
      noCardBanner: "بلا كارط بنكية. خلّص ملي تجي تأخد الطوموبيل.",
      dayCount: (n) => `${n} ${n === 1 ? "نهار" : "أيام"}`,
    },
    success: {
      title: "صافي، كل شي تدار! 🎉",
      body:
        "حنا كنسدّو ليك الطوموبيل. جيب البيرمي للمكتب و خلّص ملي تجي. غادي نعيطو ليك باش نأكدو.",
      referenceLabel: "الحجز",
      seeTrip: "شوف السفر ديالي",
      browseMore: "شوف طوموبيلات أخرى",
      error: "وقع شي خطأ. عاود جرّب.",
    },
    dashboard: {
      hello: "أهلاً بيك 👋",
      title: "السفرات ديالي",
      subtitle: "هاهي كاع الحجوزات ديالك. غادي نصيفطو ليك رسالة قبل كل لوكاسيون.",
      upcoming: "المقبلة",
      past: "السالفة و الملغية",
      loading: "كنحمّلو الحجوزات ديالك…",
      emptyTitle: "باقي ما حجزتي حتى طوموبيل",
      emptySubtitle: "ملي تحجز، تبان ليك هنا باش تتبّع السفرات ديالك.",
      emptyCta: "شوف الطوموبيلات",
      datesLabel: "النهارات",
      locationsLabel: "الأماكن",
      totalLabel: "المجموع",
      payAtPickup: "كتخلّص ف المكتب",
      cancel: "إلغاء",
    },
    status: {
      pending: "كنستناو",
      approved: "مقبولة",
      rejected: "مرفوضة",
      completed: "خلاصات",
      cancelled: "ملغية",
    },
    language: { choose: "اختار اللغة" },
  },
};

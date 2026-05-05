import type { Locale } from "./types";

/**
 * Translation dictionary for the mobile customer experience. Darija is written
 * in Arabic script ("الدارجة") using natural everyday phrasing — not MSA — so
 * it sounds like how Moroccans actually speak.
 *
 * Admin pages (overview, fleet, bookings, login) stay in English the same way
 * they do in the web app: they're used by agency staff.
 */
export type Dictionary = {
  tabs: {
    fleet: string;
    trips: string;
    profile: string;
  };
  fleet: {
    eyebrow: string;
    headingBody: string;
    headingAccent: string;
    subtitle: string;
    available: string;
    priceFromLabel: string;
    priceUnit: string;
    loading: string;
    emptyTitle: string;
    emptyBody: string;
  };
  trips: {
    eyebrow: string;
    headingBody: string;
    headingAccent: string;
    subtitle: string;
    upcoming: string;
    past: string;
    loading: string;
    emptyTitle: string;
    emptyBody: string;
    browse: string;
  };
  profile: {
    eyebrow: string;
    headingBody: string;
    headingAccent: string;
    subtitle: string;
    guestDriver: string;
    anonymousCustomer: string;
    signedIn: string;
    accountIdLabel: string;
    benefitNoCard: string;
    benefitFriendly: string;
    signInAdmin: string;
    resetSession: string;
    languageLabel: string;
    languageSubtitle: string;
  };
  carCard: {
    tapToView: string;
    priceFromLabel: string;
    priceUnit: string;
    /** Fallback chip label when a car has no `type`. */
    typeFallback: string;
  };
  bookingCard: {
    datesLabel: string;
    pickupLabel: string;
    totalLabel: string;
  };
  status: {
    pending: string;
    approved: string;
    rejected: string;
    completed: string;
    cancelled: string;
  };
};

export const translations: Record<Locale, Dictionary> = {
  // ───────────────────────────────────────────────────────────────────────────
  // Darija (default)
  ar: {
    tabs: {
      fleet: "الطوموبيلات",
      trips: "السفرات",
      profile: "الحساب",
    },
    fleet: {
      eyebrow: "ميغوستا كارز",
      headingBody: "الطوموبيل",
      headingAccent: "المثالية",
      subtitle:
        "طوموبيلات منتقاة بعناية، حاضرة باش تمشي بيها اليوم. خلّص ف المكتب — بلا كارط بنكية.",
      available: "متوفرة",
      priceFromLabel: "من",
      priceUnit: "/ نهار",
      loading: "كنحمّلو الطوموبيلات…",
      emptyTitle: "ما كاين حتى طوموبيل دابا",
      emptyBody:
        "عاود شوف من بعد — كل سيمانا كنزيدو طوموبيلات جداد ف الفلوت.",
    },
    trips: {
      eyebrow: "أهلا بيك",
      headingBody: "السفرات",
      headingAccent: "ديالي",
      subtitle: "كاع الحجوزات ديالك ف بلاصة وحدة. غادي نصيفطو ليك رسالة قبل كل لوكاسيون.",
      upcoming: "المقبلة",
      past: "السالفة و الملغية",
      loading: "كنحمّلو الحجوزات ديالك…",
      emptyTitle: "باقي ما حجزتي حتى طوموبيل",
      emptyBody:
        "ملي تحجز شي طوموبيل، تبان ليك هنا باش تتبّع السفرات ديالك.",
      browse: "شوف الطوموبيلات",
    },
    profile: {
      eyebrow: "الحساب",
      headingBody: "الحساب",
      headingAccent: "ديالك",
      subtitle:
        "تحكّم ف الطريقة اللي بيها التطبيق كيعرفك، ولا بدّل لمود ديال الموظف إلا كنتي من الفريق.",
      guestDriver: "زائر",
      anonymousCustomer: "زبون مجهول",
      signedIn: "متصل",
      accountIdLabel: "رقم الحساب",
      benefitNoCard: "بلا كارط · خلّص ف المكتب",
      benefitFriendly: "دعم لطيف كل نهار",
      signInAdmin: "دخول كموظف",
      resetSession: "إعادة الجلسة",
      languageLabel: "اللغة",
      languageSubtitle: "اختار اللغة اللي بيها بغيتي تستعمل التطبيق.",
    },
    carCard: {
      tapToView: "كلّي باش تشوف",
      priceFromLabel: "من",
      priceUnit: "/نهار",
      typeFallback: "طوموبيل",
    },
    bookingCard: {
      datesLabel: "النهارات",
      pickupLabel: "بلاصة الأخذ",
      totalLabel: "المجموع · كتخلّص ف المكتب",
    },
    status: {
      pending: "كنستناو",
      approved: "مقبولة",
      rejected: "مرفوضة",
      completed: "خلاصات",
      cancelled: "ملغية",
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  fr: {
    tabs: {
      fleet: "Voitures",
      trips: "Trajets",
      profile: "Compte",
    },
    fleet: {
      eyebrow: "Megusta Cars",
      headingBody: "La voiture",
      headingAccent: "parfaite",
      subtitle:
        "Voitures sélectionnées avec soin, prêtes à partir aujourd'hui. Paiement à l'agence — sans carte.",
      available: "disponibles",
      priceFromLabel: "À partir de",
      priceUnit: "/ jour",
      loading: "Chargement des voitures…",
      emptyTitle: "Aucune voiture pour le moment",
      emptyBody:
        "Revenez bientôt — de nouvelles voitures rejoignent la flotte chaque semaine.",
    },
    trips: {
      eyebrow: "Bonjour",
      headingBody: "Mes",
      headingAccent: "trajets",
      subtitle:
        "Toutes vos réservations au même endroit. On vous écrira avant chaque retrait.",
      upcoming: "À venir",
      past: "Passés & annulés",
      loading: "Chargement de vos réservations…",
      emptyTitle: "Aucune réservation pour l'instant",
      emptyBody:
        "Quand vous réservez une voiture, elle apparaît ici pour suivre vos trajets.",
      browse: "Voir la flotte",
    },
    profile: {
      eyebrow: "Compte",
      headingBody: "Votre",
      headingAccent: "profil",
      subtitle:
        "Gérez la façon dont l'app vous reconnaît, et passez en mode staff si vous êtes de l'équipe.",
      guestDriver: "Conducteur invité",
      anonymousCustomer: "Client anonyme",
      signedIn: "Connecté",
      accountIdLabel: "ID du compte",
      benefitNoCard: "Sans carte · Paiement à l'agence",
      benefitFriendly: "Support sympa tous les jours",
      signInAdmin: "Connexion staff",
      resetSession: "Réinitialiser la session",
      languageLabel: "Langue",
      languageSubtitle: "Choisissez la langue dans laquelle utiliser l'app.",
    },
    carCard: {
      tapToView: "Toucher pour voir",
      priceFromLabel: "Dès",
      priceUnit: "/jour",
      typeFallback: "Voiture",
    },
    bookingCard: {
      datesLabel: "Dates",
      pickupLabel: "Lieu de retrait",
      totalLabel: "Total · payé au retrait",
    },
    status: {
      pending: "En attente",
      approved: "Confirmée",
      rejected: "Refusée",
      completed: "Terminée",
      cancelled: "Annulée",
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  en: {
    tabs: {
      fleet: "Fleet",
      trips: "My Trips",
      profile: "Profile",
    },
    fleet: {
      eyebrow: "Megusta Cars",
      headingBody: "The perfect",
      headingAccent: "ride",
      subtitle:
        "Hand-picked cars, ready to drive away today. Pay at pick-up — no card needed.",
      available: "available",
      priceFromLabel: "From",
      priceUnit: "/ day",
      loading: "Loading our fleet…",
      emptyTitle: "No cars available right now",
      emptyBody:
        "Check back soon — new cars rotate into the fleet every week.",
    },
    trips: {
      eyebrow: "Hello there",
      headingBody: "My",
      headingAccent: "trips",
      subtitle:
        "Every reservation in one place. We'll text you before each pick-up.",
      upcoming: "Upcoming",
      past: "Past & cancelled",
      loading: "Loading your reservations…",
      emptyTitle: "No reservations yet",
      emptyBody:
        "When you book a car, it'll show up right here so you can keep track of every trip.",
      browse: "Browse the fleet",
    },
    profile: {
      eyebrow: "Account",
      headingBody: "Your",
      headingAccent: "profile",
      subtitle:
        "Manage how the app remembers you, and switch into staff mode if you're agency crew.",
      guestDriver: "Guest driver",
      anonymousCustomer: "Anonymous customer",
      signedIn: "Signed in",
      accountIdLabel: "Account ID",
      benefitNoCard: "No card needed · Pay at pick-up",
      benefitFriendly: "Friendly support every day",
      signInAdmin: "Sign in as Admin",
      resetSession: "Reset session",
      languageLabel: "Language",
      languageSubtitle: "Choose which language to use the app in.",
    },
    carCard: {
      tapToView: "Tap to view",
      priceFromLabel: "From",
      priceUnit: "/day",
      typeFallback: "Car",
    },
    bookingCard: {
      datesLabel: "Dates",
      pickupLabel: "Pick-up",
      totalLabel: "Total · pay at pick-up",
    },
    status: {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      completed: "Completed",
      cancelled: "Cancelled",
    },
  },
};

export interface AgentPortfolioItem {
  title: string;
  year: string;
  category: string;
  desc: string;
  image: string;
}

export interface AgentExperienceItem {
  year: string;
  title: string;
}

export interface AgentReview {
  client: string;
  rating: number;
  comment: string;
  role: string;
}

export interface Agent {
  id: string;
  number: string;
  name: string;
  role: string;
  status: "Available" | "Busy" | "Fully Booked" | "Vacation";
  location?: string;
  avatar: string;
  about: string;
  skills: string[];
  portfolio: AgentPortfolioItem[];
  experience: AgentExperienceItem[];
  services: string[];
  pricing: {
    starting?: string;
    hourly?: string;
    type: "Project Based" | "Hourly" | "Custom Quote" | "Starting From";
  };
  hireInfo: {
    minimumProject: string;
    responseTime: string;
    communication: string;
    workingHours: string;
    maxActiveProjects: number;
  };
  rules: string[];
  reviews: AgentReview[];
  stats: {
    completed: number;
    clients: number;
    years: number;
    rating: number;
    completion: number;
  };
}

export const agents: Agent[] = [
  {
    id: "arya",
    number: "#01",
    name: "Arya",
    role: "Founder & Creative Director",
    status: "Available",
    location: "Jakarta, Indonesia",
    avatar: "/images/portfolio_brand.png", // Will use visual placeholders mapping the dynamic layout style
    about: "Founder & Creative Director di 5ingular Graphic dengan 6+ tahun pengalaman membangun sistem visual kelas dunia. Mengkhususkan diri pada identitas merek strategis dan desain presentasi korporat.",
    skills: ["Branding", "Graphic Design", "Motion Design", "After Effects", "Photoshop", "Illustrator", "Figma", "UI Design"],
    portfolio: [
      {
        title: "Neomind Platform Rebrand",
        year: "2024",
        category: "Brand Identity",
        desc: "Pembangunan ulang identitas merek digital untuk platform FinTech terkemuka.",
        image: "/images/portfolio_brand.png",
      },
      {
        title: "Sovereign Guidelines",
        year: "2025",
        category: "Brand Guidelines",
        desc: "Sistem desain terperinci dan pedoman visual untuk tim internal Sovereign.",
        image: "/images/portfolio_web.png",
      },
    ],
    experience: [
      { year: "2024", title: "Joined 5ingular Graphic" },
      { year: "2025", title: "Lead Designer" },
      { year: "2026", title: "Creative Director" },
    ],
    services: ["Brand Identity Design", "Corporate Pitch Decks", "Poster Design", "Custom Art Directions"],
    pricing: {
      starting: "$1,200",
      type: "Starting From",
    },
    hireInfo: {
      minimumProject: "$1,000",
      responseTime: "< 4 jam",
      communication: "Slack / Email",
      workingHours: "09:00 - 18:00 WIB",
      maxActiveProjects: 3,
    },
    rules: [
      "Maksimal 3 kali revisi mayor.",
      "Tidak menerima proyek terburu-buru (rush project) tanpa konsultasi awal.",
      "Down Payment 50% wajib sebelum produksi dimulai.",
      "Brief tertulis yang jelas wajib diserahkan di awal.",
    ],
    reviews: [
      {
        client: "Sarah Jenkins",
        rating: 5,
        comment: "Arya benar-benar ahli dalam menangkap visi kami dan mengubahnya menjadi bahasa visual yang luar biasa.",
        role: "VP of Product, Neomind",
      },
    ],
    stats: {
      completed: 124,
      clients: 98,
      years: 6,
      rating: 4.9,
      completion: 98,
    },
  },
  {
    id: "reno",
    number: "#02",
    name: "Reno",
    role: "Senior Motion & Video Editor",
    status: "Available",
    location: "Bandung, Indonesia",
    avatar: "/images/portfolio_motion.png",
    about: "Senior Animator dengan fokus utama pada motion graphics 3D, kinetik, dan penyuntingan video komersial dengan ritme dinamis.",
    skills: ["Motion Design", "Video Editing", "After Effects", "Cinema 4D", "Premiere Pro", "Audio Design"],
    portfolio: [
      {
        title: "Kinetic Brand Intro",
        year: "2025",
        category: "Motion Graphics",
        desc: "Video intro kinetik 3D abstrak bersuara penuh untuk peluncuran lini produk.",
        image: "/images/portfolio_motion.png",
      },
    ],
    experience: [
      { year: "2024", title: "Joined 5ingular Graphic" },
      { year: "2025", title: "Motion Animator" },
      { year: "2026", title: "Senior Motion Designer" },
    ],
    services: ["Motion Graphic Intro", "Commercial Video Editing", "Kinetic Typography", "3D Modeling"],
    pricing: {
      hourly: "$75",
      type: "Hourly",
    },
    hireInfo: {
      minimumProject: "$500",
      responseTime: "< 6 jam",
      communication: "Discord / Email",
      workingHours: "10:00 - 19:00 WIB",
      maxActiveProjects: 2,
    },
    rules: [
      "Klien wajib menyediakan aset audio dan video mentah dengan kualitas tinggi.",
      "Maksimal 2 kali revisi pasca-render.",
      "DP 50% di awal pengerjaan.",
    ],
    reviews: [
      {
        client: "Davit K.",
        rating: 5,
        comment: "Animasi Reno sangat halus dan timing musiknya pas sekali. Hasil kerjanya luar biasa profesional.",
        role: "Lead Content Specialist",
      },
    ],
    stats: {
      completed: 88,
      clients: 72,
      years: 4,
      rating: 4.8,
      completion: 95,
    },
  },
  {
    id: "dania",
    number: "#03",
    name: "Dania",
    role: "UI/UX & Website Designer",
    status: "Busy",
    location: "Yogyakarta, Indonesia",
    avatar: "/images/portfolio_web.png",
    about: "UI/UX Specialist yang bersemangat menciptakan antarmuka produk digital yang bersih, terstruktur, fungsional, dan ramah pengguna.",
    skills: ["UI/UX Design", "Figma", "Web Design", "Next.js", "Tailwind CSS", "Prototyping", "User Research"],
    portfolio: [
      {
        title: "FinTech Dashboard Interface",
        year: "2024",
        category: "UI/UX Design",
        desc: "Desain antarmuka dashboard keuangan minimalis terfokus pada keterbacaan data.",
        image: "/images/portfolio_web.png",
      },
    ],
    experience: [
      { year: "2024", title: "Joined 5ingular Graphic" },
      { year: "2025", title: "UI/UX Designer" },
      { year: "2026", title: "Lead Product Designer" },
    ],
    services: ["Web Dashboard Design", "Landing Page Layouts", "Interactive Wireframes", "Design System"],
    pricing: {
      type: "Project Based",
    },
    hireInfo: {
      minimumProject: "$1,500",
      responseTime: "< 2 jam",
      communication: "Slack / Figma comments",
      workingHours: "09:00 - 17:00 WIB",
      maxActiveProjects: 2,
    },
    rules: [
      "Wajib menyepakati wireframe sebelum proses visual design dimulai.",
      "Iterasi desain dibatasi maksimal 3 putaran umpan balik.",
      "DP 40% sebelum tanda tangan kontrak kerja.",
    ],
    reviews: [
      {
        client: "Michael B.",
        rating: 5,
        comment: "Dania membuat alur pengguna platform kami menjadi jauh lebih mudah dimengerti klien.",
        role: "Product Owner, Apex Corp",
      },
    ],
    stats: {
      completed: 65,
      clients: 54,
      years: 3,
      rating: 4.9,
      completion: 100,
    },
  },
  {
    id: "zack",
    number: "#04",
    name: "Zack",
    role: "Illustrator & Social Media Designer",
    status: "Available",
    location: "Surabaya, Indonesia",
    avatar: "/images/portfolio_brand.png",
    about: "Ilustrator berbakat yang berfokus pada visual branding media sosial, konten karosel interaktif kreatif, dan maskot grafis khas.",
    skills: ["Illustration", "Social Media Design", "Photoshop", "Illustrator", "Digital Painting", "Vector Art"],
    portfolio: [
      {
        title: "Cyberpunk Esport Poster",
        year: "2025",
        category: "Illustration",
        desc: "Seni poster digital bertema esport dengan detail cyberpunk neon.",
        image: "/images/portfolio_brand.png",
      },
    ],
    experience: [
      { year: "2024", title: "Joined 5ingular Graphic" },
      { year: "2025", title: "Illustrator" },
      { year: "2026", title: "Lead Illustrator" },
    ],
    services: ["Digital Character Art", "Social Media Templates", "Concept Illustrations", "Vector Assets"],
    pricing: {
      starting: "$50 / asset",
      type: "Starting From",
    },
    hireInfo: {
      minimumProject: "$300",
      responseTime: "< 8 jam",
      communication: "Telegram / Email",
      workingHours: "13:00 - 22:00 WIB",
      maxActiveProjects: 4,
    },
    rules: [
      "Klien wajib menyediakan deskripsi referensi visual tertulis.",
      "Maksimal 3 kali revisi minor pada sketsa awal.",
      "DP 50% sebelum pengerjaan sketsa.",
    ],
    reviews: [
      {
        client: "Aris S.",
        rating: 5,
        comment: "Karakter maskot yang dibuat Zack sangat orisinal dan disukai oleh komunitas kami.",
        role: "Tournament Manager",
      },
    ],
    stats: {
      completed: 152,
      clients: 112,
      years: 5,
      rating: 4.7,
      completion: 97,
    },
  },
];

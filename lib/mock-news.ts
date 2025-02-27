export const mockNews = [
  {
    id: "1",
    type: "festival",
    title: "Afro Nation Ghana 2024 Announces Groundbreaking Lineup",
    description: "The continent's biggest music festival returns with an unprecedented lineup featuring Burna Boy, Wizkid, and Davido headlining three epic nights.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200",
    artist: {
      name: "Multiple Artists",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400",
      id: "festival-org"
    },
    timestamp: new Date().toISOString(),
    likes: 25890,
    comments: 3987,
    ticketUrl: "https://afronation.com/tickets"
  },
  {
    id: "2",
    type: "achievement",
    title: "Fan Milestone: Diamond Badge Unlocked!",
    description: "Congratulations to Sarah K. for becoming the first fan to unlock the prestigious Diamond Badge by attending 50 virtual concerts!",
    image: "https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?q=80&w=1200",
    artist: {
      name: "Sarah K.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
      id: "sarah-k"
    },
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    likes: 1567,
    comments: 234,
    achievementType: "fan",
    badgeName: "Diamond Listener"
  },
  {
    id: "3",
    type: "album_release",
    title: "Burna Boy's 'Pan-African Giant' Drops Next Week",
    description: "The African Giant returns with his most ambitious project yet. Pre-save now to be the first to experience this groundbreaking album.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200",
    artist: {
      name: "Burna Boy",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400",
      id: "burna-boy"
    },
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    likes: 41567,
    comments: 6987,
    releaseDate: new Date(Date.now() + 604800000).toISOString()
  },
  {
    id: "4",
    type: "collaboration",
    title: "Diamond Platnumz & Alicia Keys Release African Anthem",
    description: "Tanzanian superstar joins forces with 15-time Grammy winner for a groundbreaking fusion of Bongo Flava and R&B that celebrates African unity.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200",
    artist: {
      name: "Diamond Platnumz",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400",
      id: "diamond-platnumz"
    },
    collaborator: {
      name: "Alicia Keys",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
      id: "alicia-keys"
    },
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    likes: 28670,
    comments: 3143
  },
  {
    id: "5",
    type: "achievement",
    title: "Artist Achievement: Platinum Creator Status",
    description: "Wizkid reaches Platinum Creator status after his music has been streamed over 1 million times on the platform!",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200",
    artist: {
      name: "Wizkid",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400",
      id: "wizkid"
    },
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    likes: 19567,
    comments: 2845,
    achievementType: "artist",
    badgeName: "Platinum Creator"
  },
  {
    id: "6",
    type: "innovation",
    title: "Mr Eazi Launches Revolutionary Music Investment Platform",
    description: "Nigerian tech-entrepreneur and artist introduces blockchain-based platform allowing fans to invest in and earn from their favorite artists' music.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200",
    artist: {
      name: "Mr Eazi",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400",
      id: "mr-eazi"
    },
    timestamp: new Date(Date.now() - 345600000).toISOString(),
    likes: 19567,
    comments: 2845
  }
];
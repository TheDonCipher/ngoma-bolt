interface NewsItem {
  id: string;
  type:
    | 'album_release'
    | 'festival'
    | 'award'
    | 'collaboration'
    | 'charity'
    | 'innovation'
    | 'achievement';
  title: string;
  description: string;
  image: string;
  artist: {
    name: string;
    image: string;
    id?: string;
  };
  collaborator?: {
    name: string;
    image: string;
    id?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  releaseDate?: string;
  ticketUrl?: string;
  achievementType?: 'fan' | 'artist';
  badgeName?: string;
}

export const mockNews: NewsItem[] = [
  {
    id: '1',
    type: 'festival',
    title: 'Afro Nation Ghana 2024 Announces Groundbreaking Lineup',
    description:
      "The continent's biggest music festival returns with an unprecedented lineup featuring Burna Boy, Wizkid, and Davido headlining three epic nights.",
    image: '/festival',
    artist: {
      name: 'Multiple Artists',
      image: '/artist1',
      id: 'festival-org',
    },
    timestamp: new Date().toISOString(),
    likes: 25890,
    comments: 3987,
    ticketUrl: 'https://afronation.com/tickets',
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Fan Milestone: Diamond Badge Unlocked!',
    description:
      'Congratulations to Sarah K. for becoming the first fan to unlock the prestigious Diamond Badge by attending 50 virtual concerts!',
    image: '/achievement',
    artist: {
      name: 'Sarah K.',
      image: '/fan1',
      id: 'sarah-k',
    },
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    likes: 1567,
    comments: 234,
    achievementType: 'fan',
    badgeName: 'Diamond Listener',
  },
  {
    id: '3',
    type: 'album_release',
    title: "Burna Boy's 'Pan-African Giant' Drops Next Week",
    description:
      'The African Giant returns with his most ambitious project yet. Pre-save now to be the first to experience this groundbreaking album.',
    image: '/album1',
    artist: {
      name: 'Burna Boy',
      image: '/artist2',
      id: 'burna-boy',
    },
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    likes: 41567,
    comments: 6987,
    releaseDate: new Date(Date.now() + 604800000).toISOString(),
  },
  {
    id: '4',
    type: 'collaboration',
    title: 'Diamond Platnumz & Alicia Keys Release African Anthem',
    description:
      'Tanzanian superstar joins forces with 15-time Grammy winner for a groundbreaking fusion of Bongo Flava and R&B that celebrates African unity.',
    image: '/collaboration',
    artist: {
      name: 'Diamond Platnumz',
      image: '/artist3',
      id: 'diamond-platnumz',
    },
    collaborator: {
      name: 'Alicia Keys',
      image: '/artist4',
      id: 'alicia-keys',
    },
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    likes: 28670,
    comments: 3143,
  },
  {
    id: '5',
    type: 'award',
    title: 'Artist Achievement: Platinum Creator Status',
    description:
      'Wizkid reaches Platinum Creator status after his music has been streamed over 1 million times on the platform!',
    image: '/award-image',
    artist: {
      name: 'Wizkid',
      image: '/artist5',
      id: 'wizkid',
    },
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    likes: 19567,
    comments: 2845,
    achievementType: 'artist',
    badgeName: 'Platinum Creator',
  },
  {
    id: '6',
    type: 'innovation',
    title: 'Mr Eazi Launches Revolutionary Music Investment Platform',
    description:
      "Nigerian tech-entrepreneur and artist introduces blockchain-based platform allowing fans to invest in and earn from their favorite artists' music.",
    image: '/innovation',
    artist: {
      name: 'Mr Eazi',
      image: '/artist6',
      id: 'mr-eazi',
    },
    timestamp: new Date(Date.now() - 345600000).toISOString(),
    likes: 19567,
    comments: 2845,
  },
  {
    id: '7',
    type: 'charity',
    title: "Angelique Kidjo's Education Foundation Reaches 10,000 Children",
    description:
      "The Grammy-winning artist's foundation celebrates a milestone in providing access to education for girls across West Africa.",
    image: '/charity-image',
    artist: {
      name: 'Angelique Kidjo',
      image: '/artist7',
      id: 'angelique-kidjo',
    },
    timestamp: new Date(Date.now() - 432000000).toISOString(),
    likes: 15782,
    comments: 1956,
  },
  {
    id: '8',
    type: 'album_release',
    title: "Tems Announces Debut Album 'Higher Ground'",
    description:
      'After multiple chart-topping collaborations, the Nigerian vocalist is set to release her much-anticipated debut full-length album next month.',
    image: '/album2',
    artist: {
      name: 'Tems',
      image: '/artist8',
      id: 'tems',
    },
    timestamp: new Date(Date.now() - 518400000).toISOString(),
    likes: 32456,
    comments: 4789,
    releaseDate: new Date(Date.now() + 2592000000).toISOString(),
  },
];

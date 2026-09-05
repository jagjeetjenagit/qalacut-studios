// Real QalaCut film catalogue. Posters live in /public/films.
// BASE_URL keeps paths correct under the GitHub Pages subpath.
const base = import.meta.env.BASE_URL
const poster = (file) => `${base}films/${file}`

export const categories = ['All', 'Film']

export const projects = [
  {
    slug: 'state-vs-amit-vyas',
    title: 'State V/S Amit Vyas',
    category: 'Film',
    status: 'released',
    client: 'Parivesh Singh Films',
    year: '2026',
    services: ['Editorial', 'DI & Colour Grading', 'Post Production'],
    tagline: 'A courtroom drama where the verdict cuts deeper than the crime.',
    poster: poster('state-vs-amit-vyas.jpg'),
    thumb: poster('state-vs-amit-vyas.jpg'),
    accent: '#e11123',
    summary:
      'A gripping courtroom drama directed by Parivesh Singh, finished at QalaCut with full editorial, DI and colour grading. Featuring Siddhant Badhani, Manika Sheokand and Ishika Jha. In association with the Madhya Pradesh Tourism Board.',
    gallery: [poster('state-vs-amit-vyas.jpg')],
    stats: [
      { label: 'Director', value: 'Parivesh Singh' },
      { label: 'Category', value: 'Film' },
      { label: 'Post Head', value: 'Megha Purohit' },
    ],
  },
  {
    slug: 'garima',
    title: 'Garima',
    category: 'Film',
    status: 'released',
    client: 'Parivesh Singh Films',
    year: '2026',
    services: ['Editorial', 'DI & Colour Grading', 'Post Production'],
    tagline: 'One woman, one night, and the dignity she refuses to surrender.',
    poster: poster('garima.jpg'),
    thumb: poster('garima.jpg'),
    accent: '#c9782e',
    summary:
      'A tense, atmospheric drama directed by Parivesh Singh, finished at QalaCut with editorial, DI and colour grading. Featuring Ishika Jha, Aadesh Bharadwaj and Archie Singh. In association with the Madhya Pradesh Tourism Board.',
    gallery: [poster('garima.jpg')],
    stats: [
      { label: 'Director', value: 'Parivesh Singh' },
      { label: 'Category', value: 'Film' },
      { label: 'Post Head', value: 'Megha Purohit' },
    ],
  },
  {
    slug: 'bedhai',
    title: 'Bedhai',
    category: 'Film',
    status: 'released',
    client: 'Parivesh Singh Films',
    year: '2026',
    services: ['Editorial', 'DI & Colour Grading', 'Post Production'],
    tagline: 'A warm, sun-soaked slice of small-town life and love.',
    poster: poster('bedhai.jpg'),
    thumb: poster('bedhai.jpg'),
    accent: '#e0a52a',
    summary:
      'A vibrant coming-of-age story directed by Parivesh Singh, finished at QalaCut with editorial, DI and colour grading. Featuring Mahima Raikwar, Gunjan Nailwal and Archie Singh. In association with the Madhya Pradesh Tourism Board.',
    gallery: [poster('bedhai.jpg')],
    stats: [
      { label: 'Director', value: 'Parivesh Singh' },
      { label: 'Category', value: 'Film' },
      { label: 'Post Head', value: 'Megha Purohit' },
    ],
  },
]

export const upcomingProjects = projects.filter((p) => p.status === 'upcoming')
export const releasedProjects = projects.filter((p) => p.status !== 'upcoming' && !p.distribution)
export const distributionProjects = projects.filter((p) => p.distribution)

export const getProject = (slug) => projects.find((p) => p.slug === slug)

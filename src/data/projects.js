// Placeholder portfolio. Swap `poster`/`video` with real assets in /public later.
// Images use Picsum (seeded) so the layout looks real out of the box.
const img = (seed, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const categories = ['All', 'Film', 'Series', 'Commercial', 'Music Video', 'Documentary']

export const projects = [
  {
    slug: 'echoes-of-dust',
    title: 'Echoes of Dust',
    category: 'Film',
    client: 'Meridian Pictures',
    year: '2026',
    services: ['Editorial', 'Color Grading', 'Sound Design'],
    tagline: 'A desert noir where silence speaks louder than gunfire.',
    poster: img('echoes', 1600, 1000),
    thumb: img('echoes', 1200, 1500),
    accent: '#e11123',
    summary:
      'A slow-burn revenge western graded for scorched daylight and ink-black nights. We cut the film to a heartbeat rhythm and built a sonic landscape of wind, dust and dread.',
    gallery: [img('echoes-a'), img('echoes-b'), img('echoes-c')],
    stats: [
      { label: 'Runtime', value: '118 min' },
      { label: 'Format', value: '4K HDR' },
      { label: 'Delivery', value: 'Theatrical + OTT' },
    ],
  },
  {
    slug: 'neon-monsoon',
    title: 'Neon Monsoon',
    category: 'Series',
    client: 'StreamNine Originals',
    year: '2025',
    services: ['Color Grading', 'VFX & CGI', 'DI & Finishing'],
    tagline: 'An eight-part crime saga drenched in rain and neon.',
    poster: img('neon', 1600, 1000),
    thumb: img('neon', 1200, 1500),
    accent: '#1e88ff',
    summary:
      'A stylised streaming series demanding a bold, saturated look. We developed a signature neon-noir grade, delivered 320+ VFX shots and mastered all eight episodes for global OTT.',
    gallery: [img('neon-a'), img('neon-b'), img('neon-c')],
    stats: [
      { label: 'Episodes', value: '8 × 45 min' },
      { label: 'VFX shots', value: '320+' },
      { label: 'Delivery', value: 'Global OTT' },
    ],
  },
  {
    slug: 'kinetic',
    title: 'Kinetic',
    category: 'Commercial',
    client: 'Volt Automotive',
    year: '2026',
    services: ['Editorial', 'Motion Graphics', 'Color Grading'],
    tagline: 'Sixty seconds of pure, electric adrenaline.',
    poster: img('kinetic', 1600, 1000),
    thumb: img('kinetic', 1200, 1500),
    accent: '#f5b800',
    summary:
      'A flagship car launch spot cut to a driving score. Precision-timed edits, kinetic type and a high-contrast grade made every frame feel like horsepower.',
    gallery: [img('kinetic-a'), img('kinetic-b'), img('kinetic-c')],
    stats: [
      { label: 'Duration', value: '60s + cutdowns' },
      { label: 'Reach', value: '40M+ views' },
      { label: 'Delivery', value: 'Broadcast + Digital' },
    ],
  },
  {
    slug: 'silent-tide',
    title: 'Silent Tide',
    category: 'Documentary',
    client: 'Blue Horizon Films',
    year: '2025',
    services: ['Editorial', 'Sound Design', 'Color Grading'],
    tagline: 'The vanishing coastline, told frame by frame.',
    poster: img('tide', 1600, 1000),
    thumb: img('tide', 1200, 1500),
    accent: '#12b3a6',
    summary:
      'A feature documentary on climate and coastline. We assembled 200 hours of footage into a 94-minute journey, with an intimate, natural sound design and a restrained grade.',
    gallery: [img('tide-a'), img('tide-b'), img('tide-c')],
    stats: [
      { label: 'Footage', value: '200+ hrs' },
      { label: 'Runtime', value: '94 min' },
      { label: 'Festivals', value: '12 official' },
    ],
  },
  {
    slug: 'afterglow',
    title: 'Afterglow',
    category: 'Music Video',
    client: 'ALYA',
    year: '2026',
    services: ['Editorial', 'VFX & CGI', 'Color Grading'],
    tagline: 'A dreamlike descent through light and memory.',
    poster: img('afterglow', 1600, 1000),
    thumb: img('afterglow', 1200, 1500),
    accent: '#c04bff',
    summary:
      'A surreal performance video blending practical and CG worlds. Seamless transitions, a lush pastel grade and beat-perfect cutting created a hypnotic four-minute journey.',
    gallery: [img('afterglow-a'), img('afterglow-b'), img('afterglow-c')],
    stats: [
      { label: 'Duration', value: '4:12' },
      { label: 'VFX shots', value: '85' },
      { label: 'Delivery', value: 'YouTube 4K' },
    ],
  },
  {
    slug: 'the-long-game',
    title: 'The Long Game',
    category: 'Film',
    client: 'Northgate Studios',
    year: '2024',
    services: ['Color Grading', 'DI & Finishing', 'Sound Design'],
    tagline: 'A sweeping sports epic, finished for the big screen.',
    poster: img('longgame', 1600, 1000),
    thumb: img('longgame', 1200, 1500),
    accent: '#e11123',
    summary:
      'A period sports drama requiring a warm, filmic grade and thunderous stadium sound. We handled full DI, final mix and theatrical DCP mastering.',
    gallery: [img('longgame-a'), img('longgame-b'), img('longgame-c')],
    stats: [
      { label: 'Runtime', value: '132 min' },
      { label: 'Format', value: '4K Dolby Vision' },
      { label: 'Delivery', value: 'Theatrical DCP' },
    ],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

// News & Events (like Dharma's News page). Placeholder articles.
const img = (seed, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const news = [
  {
    slug: 'echoes-of-dust-premiere',
    title: 'Echoes of Dust Premieres to Standing Ovation',
    date: '2026-08-12',
    category: 'Premiere',
    image: img('news-echoes', 1200, 800),
    excerpt:
      'The desert noir we finished earlier this year opened to a rapturous festival crowd. Here is what the QalaCut team poured into the final cut.',
    body: [
      'Echoes of Dust had its world premiere last night, and the reaction to its scorched, ink-black grade and immersive sound design was everything the team hoped for.',
      'Our colorists spent six weeks developing a look that could hold both blistering desert daylight and near-total darkness without losing detail, while the sound team built a landscape of wind, dust and silence that lets the tension breathe.',
      'It is the kind of project that reminds us why the final 10% matters so much, and we could not be prouder of how it landed.',
    ],
  },
  {
    slug: 'atmos-stage-upgrade',
    title: 'We Upgraded Our Dolby Atmos Stage',
    date: '2026-07-02',
    category: 'Studio',
    image: img('news-atmos', 1200, 800),
    excerpt:
      'A new immersive monitoring setup means richer, more precise mixes for every film that comes through our doors.',
    body: [
      'This month we completed a full upgrade of our primary mix stage to a next-generation Dolby Atmos configuration.',
      'The new room gives our supervising mixers pinpoint control over object-based audio, so every whisper and impact sits exactly where it should in the space.',
      'Booking is open now for feature and series mixes on the new stage.',
    ],
  },
  {
    slug: 'neon-monsoon-emmy-shortlist',
    title: 'Neon Monsoon Shortlisted for Craft Awards',
    date: '2026-05-20',
    category: 'Awards',
    image: img('news-neon', 1200, 800),
    excerpt:
      'Our signature neon-noir grade and 320+ VFX shots earned the series a spot on this year is craft awards shortlist.',
    body: [
      'Neon Monsoon has been shortlisted in both the color grading and visual effects categories at this year is craft awards.',
      'The eight-part series pushed our look development and compositing teams to deliver a bold, rain-soaked world across every episode.',
      'Winners are announced in the autumn. Fingers crossed.',
    ],
  },
  {
    slug: 'welcoming-new-colorist',
    title: 'Welcoming Marcus Vale to the Color Team',
    date: '2026-03-08',
    category: 'Team',
    image: img('news-team', 1200, 800),
    excerpt:
      'A senior colorist with a decade of feature credits joins QalaCut to lead high-end grading projects.',
    body: [
      'We are thrilled to welcome Marcus Vale as a senior colorist.',
      'Marcus brings ten years of feature and premium series experience, and a reputation for looks that feel effortless and emotionally precise.',
      'He is already deep into a slate of exciting projects you will hear about soon.',
    ],
  },
  {
    slug: 'kinetic-hits-40m',
    title: 'Kinetic Crosses 40 Million Views',
    date: '2026-01-15',
    category: 'Milestone',
    image: img('news-kinetic', 1200, 800),
    excerpt:
      'The electric car launch spot we cut and graded has become a breakout digital hit.',
    body: [
      'The Kinetic launch film has now crossed 40 million views across platforms.',
      'Precision-timed editing, kinetic motion graphics and a punchy, high-contrast grade helped the sixty-second spot cut through the noise.',
      'Congratulations to the whole team and to our partners at Volt Automotive.',
    ],
  },
  {
    slug: 'silent-tide-festival-run',
    title: 'Silent Tide Begins Its Festival Run',
    date: '2025-11-03',
    category: 'Festival',
    image: img('news-tide', 1200, 800),
    excerpt:
      'The climate documentary we assembled and mixed is touring twelve festivals this season.',
    body: [
      'Silent Tide, the feature documentary we edited, graded and mixed, has begun a twelve-festival run.',
      'Cutting 200 hours of footage into a taut 94 minutes was a labour of love for our editorial team.',
      'Catch it at a festival near you this season.',
    ],
  },
]

export const getArticle = (slug) => news.find((n) => n.slug === slug)

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export const monthsList = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

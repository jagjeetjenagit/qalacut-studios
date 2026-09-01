// Video gallery, grouped by project (like Dharma's Videos page).
// Thumbnails are seeded placeholders; each clip opens a lightbox player.
// Swap `youtubeId` with your real YouTube/Vimeo IDs later.
const thumb = (seed) => `https://picsum.photos/seed/${seed}/800/450`

// Known-good public YouTube IDs used only as placeholders for the player.
const DEMO = ['aqz-KE-bpKQ', 'ScMzIvxBSi4', 'LXb3EKWsInQ']
const demoId = (i) => DEMO[i % DEMO.length]

export const videoTypes = ['All', 'Trailer', 'Teaser', 'Behind the Scenes', 'Breakdown']

export const videoGroups = [
  {
    project: 'Echoes of Dust',
    slug: 'echoes-of-dust',
    videos: [
      { id: 'ed1', title: 'Official Trailer', type: 'Trailer', duration: '2:14', youtubeId: demoId(0), thumb: thumb('ed-trailer') },
      { id: 'ed2', title: 'Teaser', type: 'Teaser', duration: '0:48', youtubeId: demoId(1), thumb: thumb('ed-teaser') },
      { id: 'ed3', title: 'Grading Breakdown', type: 'Breakdown', duration: '3:30', youtubeId: demoId(2), thumb: thumb('ed-grade') },
      { id: 'ed4', title: 'On the Cut: BTS', type: 'Behind the Scenes', duration: '5:02', youtubeId: demoId(0), thumb: thumb('ed-bts') },
    ],
  },
  {
    project: 'Neon Monsoon',
    slug: 'neon-monsoon',
    videos: [
      { id: 'nm1', title: 'Series Trailer', type: 'Trailer', duration: '1:58', youtubeId: demoId(1), thumb: thumb('nm-trailer') },
      { id: 'nm2', title: 'VFX Breakdown', type: 'Breakdown', duration: '2:40', youtubeId: demoId(2), thumb: thumb('nm-vfx') },
      { id: 'nm3', title: 'Making the Neon Look', type: 'Behind the Scenes', duration: '4:15', youtubeId: demoId(0), thumb: thumb('nm-bts') },
    ],
  },
  {
    project: 'Kinetic',
    slug: 'kinetic',
    videos: [
      { id: 'kn1', title: 'Full Spot (60s)', type: 'Trailer', duration: '1:00', youtubeId: demoId(2), thumb: thumb('kn-spot') },
      { id: 'kn2', title: 'Motion Graphics Reel', type: 'Breakdown', duration: '1:22', youtubeId: demoId(1), thumb: thumb('kn-motion') },
    ],
  },
  {
    project: 'Afterglow',
    slug: 'afterglow',
    videos: [
      { id: 'ag1', title: 'Music Video', type: 'Trailer', duration: '4:12', youtubeId: demoId(0), thumb: thumb('ag-mv') },
      { id: 'ag2', title: 'Transition Breakdown', type: 'Breakdown', duration: '2:05', youtubeId: demoId(2), thumb: thumb('ag-trans') },
      { id: 'ag3', title: 'Behind the Glow', type: 'Behind the Scenes', duration: '3:48', youtubeId: demoId(1), thumb: thumb('ag-bts') },
    ],
  },
  {
    project: 'The Long Game',
    slug: 'the-long-game',
    videos: [
      { id: 'lg1', title: 'Theatrical Trailer', type: 'Trailer', duration: '2:30', youtubeId: demoId(1), thumb: thumb('lg-trailer') },
      { id: 'lg2', title: 'Final Mix: BTS', type: 'Behind the Scenes', duration: '6:10', youtubeId: demoId(0), thumb: thumb('lg-mix') },
    ],
  },
]

// Flat list for search
export const allVideos = videoGroups.flatMap((g) =>
  g.videos.map((v) => ({ ...v, project: g.project, projectSlug: g.slug }))
)

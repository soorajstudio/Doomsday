export interface MovieRecommendation {
  id: string;
  title: string;
  year: string;
  runtime: string;
  phase: string;
  significance: string;
  description: string;
  image: string;
  characters: string[];
  connection: string;
}

export interface SeriesRecommendation {
  id: string;
  title: string;
  year: string;
  seasons: string;
  episodes: string;
  phase: string;
  significance: string;
  description: string;
  image: string;
  characters: string[];
  connection: string;
}

export const RECOMMENDED_MOVIES: MovieRecommendation[] = [
  {
    id: 'movie-01',
    title: 'The Fantastic Four: First Steps',
    year: '2025',
    runtime: '2h 10m',
    phase: 'Phase 6',
    significance: 'Origin & Galactus Crisis',
    description: "Introduces Marvel's First Family in a retro-futuristic alternate 1960s universe, fighting to survive against the world-devourer Galactus before reality fractures.",
    image: './assets/movie-01-fantastic-four.webp',
    characters: ['Reed Richards', 'Sue Storm', 'Johnny Storm', 'Ben Grimm', 'Galactus', 'Silver Surfer'],
    connection: 'Doctor Doom’s arch-rivals. Reed Richards and the Fantastic Four directly cross into Earth-616 and Castle Doom.'
  },
  {
    id: 'movie-02',
    title: 'Avengers: Endgame',
    year: '2019',
    runtime: '3h 01m',
    phase: 'Phase 3',
    significance: 'Multiverse Fracturing',
    description: "The climactic chapter of the Infinity Saga where the Avengers bend quantum mechanics to defeat Thanos, fracturing the timeline continuum and opening the gateway to multiversal chaos.",
    image: './assets/movie-02-avengers-endgame.webp',
    characters: ['Tony Stark / Iron Man', 'Steve Rogers', 'Thor', 'Bruce Banner', 'Thanos'],
    connection: 'Tony Stark’s sacrifice created the void in Earth’s cosmic defense that Victor von Doom now rises to claim.'
  },
  {
    id: 'movie-03',
    title: 'Doctor Strange in the Multiverse of Madness',
    year: '2022',
    runtime: '2h 06m',
    phase: 'Phase 4',
    significance: 'Incursion Cataclysm',
    description: "Doctor Strange travels through alternate dimensions, encounters the Illuminati of Earth-838, and witnesses firsthand the catastrophic destruction of multiversal incursions.",
    image: './assets/movie-03-multiverse-of-madness.webp',
    characters: ['Doctor Strange', 'Wanda Maximoff / Scarlet Witch', 'America Chavez', 'Clea', 'Illuminati'],
    connection: 'Explicitly introduces Incursions—the exact phenomenon that destroys universes and compels Doom to forge Battleworld.'
  },
  {
    id: 'movie-04',
    title: 'Deadpool & Wolverine',
    year: '2024',
    runtime: '2h 08m',
    phase: 'Phase 5',
    significance: 'The Void & Anchor Beings',
    description: "Wade Wilson teams up with a broken Wolverine to save his timeline from a rogue TVA agent using the Time Ripper, traversing the multiversal junkyard of The Void.",
    image: './assets/movie-04-deadpool-wolverine.webp',
    characters: ['Deadpool', 'Wolverine', 'Cassandra Nova', 'Paradox', 'Blade', 'Gambit'],
    connection: 'Introduces Anchor Beings and the concept that dying realities dump into The Void—a precursor domain of Battleworld.'
  },
  {
    id: 'movie-05',
    title: 'Spider-Man: No Way Home',
    year: '2021',
    runtime: '2h 28m',
    phase: 'Phase 4',
    significance: 'Dimensional Breach',
    description: "A catastrophic memory spell breaches the dimensional veil, pulling alternate Spider-Men and legacy villains into Earth-616 before Strange barely seals the fractures.",
    image: './assets/movie-05-spiderman-no-way-home.webp',
    characters: ['Peter Parker', 'Doctor Strange', 'Green Goblin', 'Doc Ock', 'Electro'],
    connection: 'The first time multiversal variants directly infiltrated Earth-616, proving the fragility of reality.'
  },
  {
    id: 'movie-06',
    title: 'Captain America: Brave New World',
    year: '2025',
    runtime: '2h 05m',
    phase: 'Phase 5',
    significance: 'Global Superpower Conflict',
    description: "Sam Wilson faces off against international power struggles over the Celestial Tiamut’s Adamantium deposits, culminating in a clash with President Thaddeus Ross as Red Hulk.",
    image: './assets/movie-06-brave-new-world.webp',
    characters: ['Sam Wilson / Captain America', 'President Ross / Red Hulk', 'The Leader', 'Joaquin Torres'],
    connection: 'Establishes Sam Wilson’s leadership of the grounded Avengers before multiversal war renders national borders obsolete.'
  },
  {
    id: 'movie-07',
    title: 'Thunderbolts*',
    year: '2025',
    runtime: '2h 12m',
    phase: 'Phase 5',
    significance: 'The Sentry & Anti-Hero Unity',
    description: "Contessa Valentina Allegra de Fontaine’s black-ops team of anti-heroes and reformed assassins are forced to survive against the god-like entity Bob / Sentry.",
    image: './assets/movie-07-thunderbolts.webp',
    characters: ['Yelena Belova', 'Bucky Barnes', 'Red Guardian', 'U.S. Agent', 'Ghost', 'Bob / Sentry'],
    connection: 'Introduces the Sentry (one of the few powerhouses capable of standing in Doom’s presence) and unites the anti-hero vanguard.'
  },
  {
    id: 'movie-08',
    title: 'Avengers: Infinity War',
    year: '2018',
    runtime: '2h 29m',
    phase: 'Phase 3',
    significance: 'Cosmic Scale Devastation',
    description: "The Avengers and Guardians of the Galaxy battle across Titan and Wakanda to stop Thanos from assembling the six Infinity Stones to erase half of all life.",
    image: './assets/movie-08-infinity-war.webp',
    characters: ['Iron Man', 'Thor', 'Captain America', 'Doctor Strange', 'Thanos', 'Black Order'],
    connection: 'Demonstrates what happens when a singular unstoppable will bends cosmic reality—a feat Doom will execute on a multiversal level.'
  },
  {
    id: 'movie-09',
    title: 'Iron Man',
    year: '2008',
    runtime: '2h 06m',
    phase: 'Phase 1',
    significance: 'The Legacy of Robert Downey Jr.',
    description: "Billionaire genius Tony Stark builds an armored suit to escape captivity and vows to protect the world, launching the entire Marvel Cinematic Universe.",
    image: './assets/movie-09-iron-man.webp',
    characters: ['Tony Stark / Iron Man', 'Pepper Potts', 'James Rhodes', 'Obadiah Stane'],
    connection: 'The definitive foundation for Robert Downey Jr.’s return as Victor von Doom—the ultimate dark inversion of the hero who started it all.'
  }
];

export const RECOMMENDED_SERIES: SeriesRecommendation[] = [
  {
    id: 'series-01',
    title: 'Loki',
    year: '2021 - 2023',
    seasons: '2 Seasons',
    episodes: '12 Episodes',
    phase: 'Phase 4 - 5',
    significance: 'God of Stories & The Multiverse Tree',
    description: "Loki navigates the Time Variance Authority, meets He Who Remains, and ultimately sacrifices his freedom to replace the Temporal Loom, physically holding the multiverse together as the God of Stories.",
    image: './assets/series-01-loki.webp',
    characters: ['Loki', 'Mobius', 'Sylvie', 'He Who Remains', 'O.B.'],
    connection: 'CRITICAL: Loki is currently the sole anchor of the multiverse branches. Doom’s rise threatens to usurp the throne at the end of time.'
  },
  {
    id: 'series-02',
    title: 'WandaVision',
    year: '2021',
    seasons: '1 Season',
    episodes: '9 Episodes',
    phase: 'Phase 4',
    significance: 'Scarlet Witch & The Darkhold',
    description: "Grief-stricken Wanda Maximoff warps reality around Westview into classic sitcoms, awakening her ancient prophecy as the Scarlet Witch and unleashing Chaos Magic upon the cosmos.",
    image: './assets/series-02-wandavision.webp',
    characters: ['Wanda Maximoff / Scarlet Witch', 'Vision', 'Agatha Harkness', 'Monica Rambeau'],
    connection: 'Unlocks the nexus of Chaos Magic and reality manipulation that Doom weaponizes to reconstruct reality.'
  },
  {
    id: 'series-03',
    title: 'What If...?',
    year: '2021 - 2024',
    seasons: '3 Seasons',
    episodes: '27 Episodes',
    phase: 'Phase 4 - 5',
    significance: 'Infinite Realities & Strange Supreme',
    description: "The Watcher guides viewers through infinite parallel timelines where major MCU moments went differently, showcasing cosmic-level threats like Infinity Ultron and reality-devouring sorcerers.",
    image: './assets/series-03-what-if.webp',
    characters: ['The Watcher', 'Doctor Strange Supreme', 'Captain Carter', 'Infinity Ultron'],
    connection: 'Visualizes the sheer scope of alternate Marvel universes that will be collaged together to form Battleworld.'
  },
  {
    id: 'series-04',
    title: "X-Men '97",
    year: '2024',
    seasons: 'Season 1',
    episodes: '10 Episodes',
    phase: 'Marvel Animation',
    significance: 'Mutant Extinction & Cosmic Judgment',
    description: "The X-Men face a dangerous world after the loss of Professor X, battling the Sentinel genocide on Genosha and Bastion's cybernetic evolution, concluding with timeline dispersal across ancient Egypt and the far future.",
    image: './assets/series-04-xmen-97.webp',
    characters: ['Cyclops', 'Magneto', 'Storm', 'Jean Grey', 'Wolverine', 'Bastion'],
    connection: 'Re-establishes the core X-Men dynamics and temporal displacement leading into the mutant integration during Doomsday.'
  },
  {
    id: 'series-05',
    title: 'Moon Knight',
    year: '2022',
    seasons: '1 Season',
    episodes: '6 Episodes',
    phase: 'Phase 4',
    significance: 'Ancient Gods & Supernatural Avatars',
    description: "Marc Spector and Steven Grant share a body while serving as the avatar of Khonshu, Egyptian god of the moon, navigating mythical underworlds and divine judgment.",
    image: './assets/series-05-moon-knight.webp',
    characters: ['Marc Spector / Moon Knight', 'Khonshu', 'Arthur Harrow', 'Layla El-Faouly'],
    connection: 'Introduces ancient Egyptian sorcery and godly pantheons that Victor von Doom harnesses in his arcane repertoire.'
  },
  {
    id: 'series-06',
    title: 'Agatha All Along',
    year: '2024',
    seasons: '1 Season',
    episodes: '9 Episodes',
    phase: 'Phase 5',
    significance: 'Witches’ Road & Billy Maximoff',
    description: "Agatha Harkness escapes Wanda’s spell and gathers a coven to walk the perilous Witches’ Road, uncovering the rebirth of Billy Maximoff (Wiccan) and the true nature of mystical creation.",
    image: './assets/series-06-agatha-all-along.webp',
    characters: ['Agatha Harkness', 'Billy Maximoff / Wiccan', 'Rio Vidal / Death', 'Jennifer Kale'],
    connection: 'Brings Wiccan (reincarnated son of Scarlet Witch) back into the MCU fold and establishes fundamental dark occult laws.'
  },
  {
    id: 'series-07',
    title: 'Ms. Marvel',
    year: '2022',
    seasons: '1 Season',
    episodes: '6 Episodes',
    phase: 'Phase 4',
    significance: 'Mutant DNA & Interdimensional Bangles',
    description: "Kamala Khan unlocks hard-light cosmic powers through her family’s ancient quantum bangles, uncovering interdimensional portals to the Noor Realm and her own mutant genetic signature.",
    image: './assets/series-07-ms-marvel.webp',
    characters: ['Kamala Khan / Ms. Marvel', 'Bruno Carrelli', 'Kamran', 'Najma'],
    connection: 'Reveals the first MCU mutant genetic mutation and quantum bangles capable of tearing open spatial wormholes.'
  },
  {
    id: 'series-08',
    title: 'Secret Invasion',
    year: '2023',
    seasons: '1 Season',
    episodes: '6 Episodes',
    phase: 'Phase 5',
    significance: 'The Harvest & Super-Skrull DNA',
    description: "Nick Fury uncovers a clandestine invasion of shape-shifting Skrulls infiltrating Earth’s highest governments, leading to the creation of the Harvest containing DNA of all Avengers.",
    image: './assets/series-08-secret-invasion.webp',
    characters: ['Nick Fury', 'Gravik', 'G’iah', 'Talos', 'Sonya Falsworth'],
    connection: 'Leaves Earth in extreme political paranoia and introduces the Harvest DNA reservoir—a prime target for Doctor Doom’s scientific synthesis.'
  },
  {
    id: 'series-09',
    title: 'Daredevil: Born Again',
    year: '2025',
    seasons: 'Season 1',
    episodes: '9 Episodes',
    phase: 'Phase 5',
    significance: 'Street-Level Resistance & NYC Under Siege',
    description: "Matt Murdock and Mayor Wilson Fisk engage in a deadly ideological and physical war for the soul of New York City, testing the limits of street-level vigilante justice.",
    image: './assets/series-09-daredevil-born-again.webp',
    characters: ['Matt Murdock / Daredevil', 'Wilson Fisk / Kingpin', 'Punisher', 'Bullseye'],
    connection: 'Anchors the gritty human reality of New York City before the entire island is quarantined as a sector of Battleworld.'
  },
  {
    id: 'series-10',
    title: 'The Falcon and the Winter Soldier',
    year: '2021',
    seasons: '1 Season',
    episodes: '6 Episodes',
    phase: 'Phase 4',
    significance: 'The New Captain America & Super Soldiers',
    description: "Sam Wilson wrestles with the legacy of Steve Rogers’ shield while teaming with Bucky Barnes to stop the Flag Smashers, culminating in Sam officially becoming Captain America.",
    image: './assets/series-10-falcon-winter-soldier.webp',
    characters: ['Sam Wilson', 'Bucky Barnes', 'John Walker / U.S. Agent', 'Baron Zemo', 'Sharon Carter'],
    connection: 'Sets up Sam Wilson as the moral core of Earth’s remaining defenders against the tyrannical order of Doctor Doom.'
  }
];

export const MOVIE_METADATA = {
  title: "Avengers: Doomsday",
  subtitle: "The Sovereign Era",
  studio: "Marvel Studios",
  year: "2026",
  epoch: "Phase 6 • Multiverse Saga Finale Part I",
  runtime: "2h 55m",
  format: "IMAX 70mm • Dolby Cinema",
  rating: "U/A 16+",
  genres: ["Cosmic Epic", "Dark Fantasy", "Superhero Action", "Multiverse War"],
  synopsis:
    "As cosmic incursions pulverize reality, Earth's Mightiest Heroes and the Fantastic Four face an inescapable truth: gods, kings, and heroes have failed. Into the celestial void steps Victor von Doom. Armed with Beyonder omnipotence, ancient arcane sorcery, and supreme intellect, the Lord of Latveria re-engineers existence into Battleworld. Submit, or be erased.",
  cast: [
    { name: "Robert Downey Jr.", role: "Victor von Doom / God Emperor Doom" },
    { name: "Pedro Pascal", role: "Reed Richards / Mister Fantastic" },
    { name: "Benedict Cumberbatch", role: "Stephen Strange / Sheriff of Agamotto" },
    { name: "Vanessa Kirby", role: "Sue Storm / Invisible Woman" },
    { name: "Anthony Mackie", role: "Sam Wilson / Captain America" },
    { name: "Chris Hemsworth", role: "Thor Odinson" },
    { name: "Florence Pugh", role: "Yelena Belova" },
    { name: "Sebastian Stan", role: "Bucky Barnes" },
    { name: "Tom Holland", role: "Peter Parker / Spider-Man" },
    { name: "Joseph Quinn", role: "Johnny Storm / Human Torch" },
    { name: "Ebon Moss-Bachrach", role: "Ben Grimm / The Thing" }
  ],
  directors: "Anthony & Joe Russo (The Russo Brothers)",
  screenplay: "Stephen McFeely",
  theaters: "May 2026"
};

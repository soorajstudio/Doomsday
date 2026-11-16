export interface CastMember {
  id: string;
  name: string;
  character: string;
  role: string;
  bio: string;
  image: string;
  statusBadge: string;
}

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
  rating: string;
  genres: string;
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
  rating: string;
  genres: string;
}

export const DOOMSDAY_CAST: CastMember[] = [
  {
    id: 'cast-05',
    name: 'Anthony Mackie',
    character: 'Sam Wilson / Captain America',
    role: 'Earth’s Moral Vanguard',
    bio: 'Leads the remaining grounded Avengers in resistance against total multiversal subjugation.',
    image: './assets/cast-05-anthony-mackie.webp',
    statusBadge: 'CONFIRMED'
  },
  {
    id: 'cast-06',
    name: 'Chris Hemsworth',
    character: 'Thor Odinson',
    role: 'The God of Thunder',
    bio: 'Wields Stormbreaker against the cosmic incursions, refusing to kneel before any false god.',
    image: './assets/cast-06-chris-hemsworth.webp',
    statusBadge: 'EARTH-616'
  },
  {
    id: 'cast-07',
    name: 'Tom Holland',
    character: 'Peter Parker / Spider-Man',
    role: 'Earth-616 Protector',
    bio: 'The friendly neighborhood hero thrust into cosmic warfare to save what little remains of home.',
    image: './assets/cast-07-tom-holland.webp',
    statusBadge: 'CONFIRMED'
  },
  {
    id: 'cast-08',
    name: 'Florence Pugh',
    character: 'Yelena Belova',
    role: 'Thunderbolts Infiltrator',
    bio: 'Deadly Black Widow operative navigating the murky alliances of the new world order.',
    image: './assets/cast-08-florence-pugh.webp',
    statusBadge: 'RETURNING'
  },
  {
    id: 'cast-09',
    name: 'Sebastian Stan',
    character: 'Bucky Barnes / Winter Soldier',
    role: 'Battle-Hardened Veteran',
    bio: 'Congressman and covert operative anchoring the Thunderbolts against impending annihilation.',
    image: './assets/cast-09-sebastian-stan.webp',
    statusBadge: 'CONFIRMED'
  },
  {
    id: 'cast-10',
    name: 'Joseph Quinn',
    character: 'Johnny Storm / Human Torch',
    role: 'Cosmic Flame Vanguard',
    bio: 'Blazes with supernova heat against the encroaching darkness of incursion collisions.',
    image: './assets/cast-10-joseph-quinn.webp',
    statusBadge: 'CONFIRMED'
  },
  {
    id: 'cast-11',
    name: 'Ebon Moss-Bachrach',
    character: 'Ben Grimm / The Thing',
    role: 'Unbreakable Rock Titan',
    bio: 'The emotional rock and physical powerhouse of the Fantastic Four standing resolute.',
    image: './assets/cast-11-ebon-moss-bachrach.webp',
    statusBadge: 'CONFIRMED'
  },
  {
    id: 'cast-12',
    name: 'Tom Hiddleston',
    character: 'Loki / God of Stories',
    role: 'Anchor of the Multiverse Tree',
    bio: 'Silently holding together the infinite branches of time from the citadel at the end of reality.',
    image: './assets/cast-12-tom-hiddleston.webp',
    statusBadge: 'CONFIRMED'
  },
  {
    id: 'cast-01',
    name: 'Robert Downey Jr.',
    character: 'Victor von Doom / God Emperor Doom',
    role: 'Supreme Sovereign of Battleworld',
    bio: 'Ascended beyond mortal limits after absorbing the Beyonders’ reality-shaping omnipotence to salvage the dying multiverse.',
    image: './assets/cast-01-robert-downey-jr.webp',
    statusBadge: 'SOVEREIGN'
  },
  {
    id: 'cast-02',
    name: 'Pedro Pascal',
    character: 'Reed Richards / Mister Fantastic',
    role: 'Leader of the Fantastic Four',
    bio: 'The smartest man alive, leading the First Family across the void to confront his ultimate rival.',
    image: './assets/cast-02-pedro-pascal.webp',
    statusBadge: 'FIRST FAMILY'
  },
  {
    id: 'cast-03',
    name: 'Benedict Cumberbatch',
    character: 'Doctor Stephen Strange',
    role: 'Sheriff of Agamotto',
    bio: 'Former Sorcerer Supreme who formed an uneasy cosmic pact with Doom to maintain reality wards.',
    image: './assets/cast-03-benedict-cumberbatch.webp',
    statusBadge: 'EARTH-616'
  },
  {
    id: 'cast-04',
    name: 'Vanessa Kirby',
    character: 'Sue Storm / Invisible Woman',
    role: 'The First Family Vanguard',
    bio: 'Master of psionic forcefields, fighting to protect reality’s remnants and her family.',
    image: './assets/cast-04-vanessa-kirby.webp',
    statusBadge: 'FIRST FAMILY'
  }
];

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
    connection: 'Doctor Doom’s arch-rivals. Reed Richards and the Fantastic Four directly cross into Earth-616 and Castle Doom.',
    rating: '7.3',
    genres: 'Action • Sci-Fi'
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
    connection: 'Tony Stark’s sacrifice created the void in Earth’s cosmic defense that Victor von Doom now rises to claim.',
    rating: '7.5',
    genres: 'Action • Adventure'
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
    connection: 'Explicitly introduces Incursions—the exact phenomenon that destroys universes and compels Doom to forge Battleworld.',
    rating: '7.3',
    genres: 'Action • Fantasy'
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
    connection: 'Introduces Anchor Beings and the concept that dying realities dump into The Void—a precursor domain of Battleworld.',
    rating: '7.6',
    genres: 'Action • Comedy'
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
    connection: 'The first time multiversal variants directly infiltrated Earth-616, proving the fragility of reality.',
    rating: '7.4',
    genres: 'Action • Adventure'
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
    connection: 'Establishes Sam Wilson’s leadership of the grounded Avengers before multiversal war renders national borders obsolete.',
    rating: '7.2',
    genres: 'Action • Thriller'
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
    connection: 'Introduces the Sentry (one of the few powerhouses capable of standing in Doom’s presence) and unites the anti-hero vanguard.',
    rating: '7.5',
    genres: 'Action • Adventure'
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
    connection: 'Demonstrates what happens when a singular unstoppable will bends cosmic reality—a feat Doom will execute on a multiversal level.',
    rating: '7.1',
    genres: 'Action • Adventure'
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
    connection: 'The definitive foundation for Robert Downey Jr.’s return as Victor von Doom—the ultimate dark inversion of the hero who started it all.',
    rating: '7.9',
    genres: 'Action • Sci-Fi'
  },
  {
    id: 'movie-10',
    title: 'Avengers: Age of Ultron',
    year: '2015',
    runtime: '2h 21m',
    phase: 'Phase 2',
    significance: 'Sokovia’s Fall & Technocratic Hubris',
    description: "Tony Stark attempts to jumpstart an artificial intelligence planetary defense initiative, inadvertently creating Ultron and causing the cataclysmic destruction of Sokovia.",
    image: './assets/movie-10-age-of-ultron.webp',
    characters: ['Tony Stark / Iron Man', 'Steve Rogers', 'Wanda Maximoff', 'Vision', 'Ultron'],
    connection: 'Sokovia shares borders with Latveria in Marvel lore. Tony Stark’s flawed vision of "armor around the world" is what Victor von Doom achieves through absolute tyranny.',
    rating: '7.3',
    genres: 'Action • Sci-Fi'
  },
  {
    id: 'movie-11',
    title: 'Captain America: Civil War',
    year: '2016',
    runtime: '2h 27m',
    phase: 'Phase 3',
    significance: 'The Fracturing of Earth’s Guardians',
    description: "Political pressure over the Sokovia Accords tears the Avengers into opposing factions led by Steve Rogers and Tony Stark, expertly exploited by Baron Zemo from within.",
    image: './assets/movie-11-civil-war.webp',
    characters: ['Captain America', 'Iron Man', 'Bucky Barnes', 'Black Panther', 'Spider-Man', 'Baron Zemo'],
    connection: 'Proves that mortal human governments and splintered heroes cannot safeguard Earth from catastrophic global destruction, leaving a vacuum for God Emperor Doom.',
    rating: '7.8',
    genres: 'Action • Thriller'
  },
  {
    id: 'movie-12',
    title: 'Ant-Man and the Wasp: Quantumania',
    year: '2023',
    runtime: '2h 04m',
    phase: 'Phase 5',
    significance: 'The Quantum Realm & The Kang Dynasty',
    description: "Scott Lang and his family are sucked into the Quantum Realm beneath space-time, battling Kang the Conqueror and discovering the infinite Council of Kangs convening for war.",
    image: './assets/movie-12-quantumania.webp',
    characters: ['Scott Lang / Ant-Man', 'Hope van Dyne / Wasp', 'Kang the Conqueror', 'Janet van Dyne', 'Cassie Lang'],
    connection: 'Reveals the mechanics of the Multiversal War. The threat of infinite colliding timelines is the catalyst for Doom taking supreme omnipotent control.',
    rating: '6.1',
    genres: 'Sci-Fi • Adventure'
  },
  {
    id: 'movie-13',
    title: 'Black Panther: Wakanda Forever',
    year: '2022',
    runtime: '2h 41m',
    phase: 'Phase 4',
    significance: 'Vibranium World War & Talokan',
    description: "Following the death of King T’Challa, Wakanda defends its borders against predatory global powers and faces Namor, the feathered serpent god ruler of underwater Talokan.",
    image: './assets/movie-13-wakanda-forever.webp',
    characters: ['Shuri / Black Panther', 'Namor', 'Queen Ramonda', 'Okoye', 'Riri Williams / Ironheart'],
    connection: 'Adapts elements of Marvel’s historic Doomwar comic event. Doom exploits the geopolitical friction between Wakanda and Talokan to harvest Vibranium for his reality engine.',
    rating: '6.7',
    genres: 'Action • Drama'
  },
  {
    id: 'movie-14',
    title: 'The Marvels',
    year: '2023',
    runtime: '1h 45m',
    phase: 'Phase 5',
    significance: 'Spacetime Tear & Fox X-Men Bridge',
    description: "Carol Danvers, Monica Rambeau, and Kamala Khan become quantum-entangled. When villain Dar-Benn tears open an interdimensional portal, Monica sacrifices herself to seal the tear from the other side.",
    image: './assets/movie-14-the-marvels.webp',
    characters: ['Carol Danvers / Captain Marvel', 'Monica Rambeau', 'Kamala Khan / Ms. Marvel', 'Beast (Hank McCoy)', 'Binary'],
    connection: 'CRITICAL INVASION BRIDGE: Monica crosses into Earth-10005 (the Fox X-Men universe), directly triggering the interdimensional convergence into Battleworld.',
    rating: '5.6',
    genres: 'Sci-Fi • Action'
  },
  {
    id: 'movie-15',
    title: 'Shang-Chi and the Legend of the Ten Rings',
    year: '2021',
    runtime: '2h 12m',
    phase: 'Phase 4',
    significance: 'Ancient Cosmic Beacon & Mystic Portals',
    description: "Shang-Chi confronts his past and the immortal warlord Wenwu in the mythical pocket dimension of Ta Lo, unlocking the true cosmic power of the thousand-year-old Ten Rings.",
    image: './assets/movie-15-shang-chi.webp',
    characters: ['Shang-Chi', 'Wenwu / The Mandarin', 'Xialing', 'Katy', 'Wong', 'Bruce Banner'],
    connection: 'The post-credits sequence reveals the Ten Rings are pulsing an ancient homing signal across the multiverse—heralds calling out to primordial cosmic forces.',
    rating: '7.4',
    genres: 'Action • Fantasy'
  },
  {
    id: 'movie-16',
    title: 'Doctor Strange',
    year: '2016',
    runtime: '1h 55m',
    phase: 'Phase 3',
    significance: 'The Origin of Sorcery & Time Manipulation',
    description: "Arrogant neurosurgeon Stephen Strange journeys to Kamar-Taj to heal his shattered hands, discovering the Mystic Arts, the Mirror Dimension, and the Time Stone.",
    image: './assets/movie-16-doctor-strange.webp',
    characters: ['Doctor Strange', 'The Ancient One', 'Karl Mordo', 'Wong', 'Kaecilius', 'Dormammu'],
    connection: 'Establishes the arcane codex of Kamar-Taj and Agamotto. Doctor Doom combines this exact dark dimensional sorcery with quantum hyper-technology.',
    rating: '7.5',
    genres: 'Fantasy • Adventure'
  },
  {
    id: 'movie-17',
    title: 'Eternals',
    year: '2021',
    runtime: '2h 36m',
    phase: 'Phase 4',
    significance: 'Celestial Judgment & The Birth of Adamantium',
    description: "Immortal synthetic beings living secretly on Earth since antiquity emerge to prevent the Emergence of the Celestial Tiamut, leaving his massive petrified marble corpse in the Indian Ocean.",
    image: './assets/movie-17-eternals.webp',
    characters: ['Sersi', 'Ikaris', 'Thena', 'Ajak', 'Druig', 'Arishem the Judge'],
    connection: 'Tiamut’s oceanic corpse is the canon source of Adamantium in Brave New World and reveals the cosmic hierarchy that Doom will ultimately dethrone.',
    rating: '6.3',
    genres: 'Sci-Fi • Action'
  },
  {
    id: 'movie-18',
    title: 'The Avengers',
    year: '2012',
    runtime: '2h 23m',
    phase: 'Phase 1',
    significance: 'Earth’s First Assembly',
    description: "Nick Fury assembles Earth’s Mightiest Heroes to stop Loki and an invading Chitauri army from subjugating humanity with the Tesseract in the historic Battle of New York.",
    image: './assets/movie-18-the-avengers.webp',
    characters: ['Iron Man', 'Captain America', 'Thor', 'Bruce Banner / Hulk', 'Black Widow', 'Hawkeye', 'Loki'],
    connection: 'The origin of Earth’s cosmic defense doctrine. Sets the standard of heroism that Doom claims failed humanity when multiversal extinction arrived.',
    rating: '8.0',
    genres: 'Action • Sci-Fi'
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
    connection: 'CRITICAL: Loki is currently the sole anchor of the multiverse branches. Doom’s rise threatens to usurp the throne at the end of time.',
    rating: '8.2',
    genres: 'Sci-Fi • Multiverse'
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
    connection: 'Unlocks the nexus of Chaos Magic and reality manipulation that Doom weaponizes to reconstruct reality.',
    rating: '7.9',
    genres: 'Mystery • Fantasy'
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
    connection: 'Visualizes the sheer scope of alternate Marvel universes that will be collaged together to form Battleworld.',
    rating: '7.4',
    genres: 'Animation • Sci-Fi'
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
    connection: 'Re-establishes the core X-Men dynamics and temporal displacement leading into the mutant integration during Doomsday.',
    rating: '8.9',
    genres: 'Animation • Action'
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
    connection: 'Introduces ancient Egyptian sorcery and godly pantheons that Victor von Doom harnesses in his arcane repertoire.',
    rating: '7.3',
    genres: 'Fantasy • Action'
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
    connection: 'Brings Wiccan (reincarnated son of Scarlet Witch) back into the MCU fold and establishes fundamental dark occult laws.',
    rating: '7.2',
    genres: 'Dark Comedy • Fantasy'
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
    connection: 'Reveals the first MCU mutant genetic mutation and quantum bangles capable of tearing open spatial wormholes.',
    rating: '6.3',
    genres: 'Adventure • Teen'
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
    connection: 'Leaves Earth in extreme political paranoia and introduces the Harvest DNA reservoir—a prime target for Doctor Doom’s scientific synthesis.',
    rating: '5.9',
    genres: 'Espionage • Sci-Fi'
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
    connection: 'Anchors the gritty human reality of New York City before the entire island is quarantined as a sector of Battleworld.',
    rating: '8.6',
    genres: 'Crime • Vigilante'
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
    connection: 'Sets up Sam Wilson as the moral core of Earth’s remaining defenders against the tyrannical order of Doctor Doom.',
    rating: '7.1',
    genres: 'Action • Political'
  },
  {
    id: 'series-11',
    title: 'Hawkeye',
    year: '2021',
    seasons: '1 Season',
    episodes: '6 Episodes',
    phase: 'Phase 4',
    significance: 'Street-Level Underground & Young Avengers Passing',
    description: "Clint Barton confronts his violent Ronin past during a holiday trip to New York, teaming up with prodigy archer Kate Bishop and uncovering Wilson Fisk’s shadow operations.",
    image: './assets/series-11-hawkeye.webp',
    characters: ['Clint Barton / Hawkeye', 'Kate Bishop', 'Yelena Belova', 'Maya Lopez / Echo', 'Wilson Fisk / Kingpin'],
    connection: 'Bridges Yelena Belova and Kate Bishop into the next generation of heroes and establishes the modern NYC street crime hierarchy.',
    rating: '7.5',
    genres: 'Action • Holiday'
  },
  {
    id: 'series-12',
    title: 'She-Hulk: Attorney at Law',
    year: '2022',
    seasons: '1 Season',
    episodes: '9 Episodes',
    phase: 'Phase 4',
    significance: 'Superhuman Law, Daredevil & Meta Realities',
    description: "Jennifer Walters balances her career as a superhuman attorney with her gamma-powered transformation, encountering Abomination, Wong, Daredevil, and rewriting reality’s story structure.",
    image: './assets/series-12-she-hulk.webp',
    characters: ['Jennifer Walters / She-Hulk', 'Bruce Banner / Smart Hulk', 'Matt Murdock / Daredevil', 'Emil Blonsky / Abomination', 'Skaar'],
    connection: 'Introduces Hulk’s son Skaar, reunites Matt Murdock with the wider MCU, and explores how meta-reality manipulation alters narrative physics.',
    rating: '5.3',
    genres: 'Comedy • Legal'
  },
  {
    id: 'series-13',
    title: 'Werewolf by Night',
    year: '2022',
    seasons: 'Special Presentation',
    episodes: '1 Episode',
    phase: 'Phase 4',
    significance: 'Bloodstone Sorcery & Monster Underworld',
    description: "A secret cabal of monster hunters gather at Bloodstone Manor following their leader’s death, thrust into a deadly competition for an ancient relic that controls supernatural entities.",
    image: './assets/series-13-werewolf-by-night.webp',
    characters: ['Jack Russell / Werewolf by Night', 'Elsa Bloodstone', 'Man-Thing (Ted)', 'Verussa Bloodstone'],
    connection: 'Reveals the existence of ancient relics like the Bloodstone and subterranean monster domains that Doom isolates within The Deadlands on Battleworld.',
    rating: '7.1',
    genres: 'Horror • Supernatural'
  },
  {
    id: 'series-14',
    title: 'Echo',
    year: '2024',
    seasons: '1 Season',
    episodes: '5 Episodes',
    phase: 'Phase 5',
    significance: 'Ancestral Lineage & Kingpin’s NYC Mayoral Bid',
    description: "Maya Lopez returns to her Oklahoma hometown pursued by Wilson Fisk’s criminal syndicate, discovering her Choctaw ancestral spiritual power and defeating Fisk’s hold on her.",
    image: './assets/series-14-echo.webp',
    characters: ['Maya Lopez / Echo', 'Wilson Fisk / Kingpin', 'Matt Murdock / Daredevil', 'Henry Black Crow Lopez'],
    connection: 'Concludes with Kingpin realizing he needs raw political dominance, launching his campaign for Mayor of New York before the incursion crisis.',
    rating: '6.1',
    genres: 'Crime • Gritty'
  },
  {
    id: 'series-15',
    title: 'Ironheart',
    year: '2025',
    seasons: 'Season 1',
    episodes: '6 Episodes',
    phase: 'Phase 5',
    significance: 'Stark Technology vs. Dark Magic',
    description: "MIT prodigy Riri Williams returns home to Chicago to develop next-generation cybernetic armor suits, clashing with Parker Robbins (The Hood) who wields dark demonic sorcery.",
    image: './assets/series-15-ironheart.webp',
    characters: ['Riri Williams / Ironheart', 'Parker Robbins / The Hood', 'Zelma Stanton', 'Natalie Washington'],
    connection: 'The core ideological and operational thesis of Doctor Doom: the fusion and war between bleeding-edge high technology and ancient dark magic.',
    rating: '7.0',
    genres: 'Sci-Fi • Tech'
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
    { name: "Ebon Moss-Bachrach", role: "Ben Grimm / The Thing" },
    { name: "Tom Hiddleston", role: "Loki / God of Stories" }
  ],
  directors: "Anthony & Joe Russo (The Russo Brothers)",
  screenplay: "Stephen McFeely",
  theaters: "May 2026"
};

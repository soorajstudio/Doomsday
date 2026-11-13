export interface DomainItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ruler: string;
  dangerLevel: 'Safe' | 'Guarded' | 'Extreme' | 'Forbidden';
}

export interface ThreatItem {
  id: string;
  name: string;
  alias: string;
  fate: string;
  image: string;
  status: 'Extinguished' | 'Subdued' | 'Exiled' | 'Contained';
}

export const DOMAINS: DomainItem[] = [
  {
    id: 'domain-01',
    title: 'New Latveria',
    subtitle: 'The Imperial Throne',
    description: 'The capital of Battleworld and seat of God Emperor Doom. Crowned by Castle Doom and the World Tree.',
    image: './assets/domain-01-new-latveria.webp',
    ruler: 'Victor von Doom',
    dangerLevel: 'Safe'
  },
  {
    id: 'domain-02',
    title: 'Barony of Agamotto',
    subtitle: 'Arcane Sanctum',
    description: 'The mystical domain overseen by the Sheriff of Agamotto, guarding the occult balance of creation.',
    image: './assets/domain-02-barony-of-agamotto.webp',
    ruler: 'Stephen Strange',
    dangerLevel: 'Guarded'
  },
  {
    id: 'domain-03',
    title: 'The Deadlands',
    subtitle: 'Zombie & Ultron Perimeter',
    description: 'A nightmare wasteland beyond The Shield teeming with zombie hordes and rogue Ultron legions.',
    image: './assets/domain-03-deadlands.webp',
    ruler: 'None (Quarantine Zone)',
    dangerLevel: 'Forbidden'
  },
  {
    id: 'domain-04',
    title: 'The Shield',
    subtitle: 'Colossal Defense Barrier',
    description: 'A 16,000-mile impenetrable wall separating civilized baronies from the horrors of the Deadlands.',
    image: './assets/domain-04-the-shield.webp',
    ruler: 'Commander of the Wall',
    dangerLevel: 'Guarded'
  },
  {
    id: 'domain-05',
    title: 'Manhattan 616',
    subtitle: 'Temporal Quarantine Zone',
    description: 'A preserved shard of Earth-616 frozen moments before the final multiversal incursion collapse.',
    image: './assets/domain-05-manhattan-616.webp',
    ruler: 'Remnant Illuminati',
    dangerLevel: 'Guarded'
  },
  {
    id: 'domain-06',
    title: 'The Warzone',
    subtitle: 'Eternal Conflict Sector',
    description: 'A perpetual combat sector where ideological factions wage unending tactical warfare under Doom.',
    image: './assets/domain-06-the-warzone.webp',
    ruler: 'General of the Front',
    dangerLevel: 'Extreme'
  },
  {
    id: 'domain-07',
    title: 'Barony of Sinister',
    subtitle: 'Mutant Gene Spires',
    description: 'A genetic citadel where Mister Sinister conducts cloning trials under strict imperial decree.',
    image: './assets/domain-07-barony-of-sinister.webp',
    ruler: 'Nathaniel Essex',
    dangerLevel: 'Extreme'
  },
  {
    id: 'domain-08',
    title: "K'un-Lun",
    subtitle: 'Domain of the Iron Fist',
    description: 'The mystical realm of martial mastery and dragon flame, pledged in tribute to Castle Doom.',
    image: './assets/domain-08-kun-lun.webp',
    ruler: 'Grandmaster of K\'un-Lun',
    dangerLevel: 'Guarded'
  },
  {
    id: 'domain-09',
    title: 'Hala City',
    subtitle: 'Cosmic Kree Ruins',
    description: 'The fallen ruins of the Supreme Intelligence empire, rebuilt into an imperial shipyard.',
    image: './assets/domain-09-hala-city.webp',
    ruler: 'Imperial Legate',
    dangerLevel: 'Guarded'
  }
];

export const THREATS: ThreatItem[] = [
  {
    id: 'threat-01',
    name: 'The Beyonders',
    alias: 'Architects of the Incursions',
    fate: 'Stripped of omnipotence by Doom and Molecule Man; energy absorbed into Battleworld foundation.',
    image: './assets/threat-01-beyonders.webp',
    status: 'Extinguished'
  },
  {
    id: 'threat-02',
    name: 'Galactus the World-Eater',
    alias: 'Cosmic Devourer',
    fate: 'Reprogrammed into the silent gargoyle sentinel perched above Castle Doom gates.',
    image: './assets/threat-02-galactus.webp',
    status: 'Subdued'
  },
  {
    id: 'threat-03',
    name: 'Kang the Conqueror',
    alias: 'Council of Kangs',
    fate: 'Every alternate variant hunted through timeline branches and expunged from the chronal lattice.',
    image: './assets/threat-03-kang.webp',
    status: 'Extinguished'
  },
  {
    id: 'threat-04',
    name: 'Ultron Prime Legion',
    alias: 'Singularity Consciousness',
    fate: 'Cast beyond The Shield into the Deadlands to endlessly war against the infected.',
    image: './assets/threat-04-ultron-prime.webp',
    status: 'Exiled'
  },
  {
    id: 'threat-05',
    name: 'Maestro of Dystopia',
    alias: 'Corrupted Gamma Tyrant',
    fate: 'Broken in single combat by God Emperor Doom; banished to the northern perimeter.',
    image: './assets/threat-05-maestro.webp',
    status: 'Exiled'
  },
  {
    id: 'threat-06',
    name: 'The Void & Sentry',
    alias: 'Entity of Absolute Dark',
    fate: 'Bound in quantum containment crypts deep beneath the Latverian bedrock.',
    image: './assets/threat-06-the-void.webp',
    status: 'Contained'
  },
  {
    id: 'threat-07',
    name: 'Thanos of Titan',
    alias: 'The Mad Titan',
    fate: 'His spine ripped out with bare hands upon daring to refuse God Emperor Doom homage.',
    image: './assets/threat-07-thanos.webp',
    status: 'Extinguished'
  },
  {
    id: 'threat-08',
    name: 'The Black Order',
    alias: 'Children of Thanos',
    fate: 'Obliterated in seconds by a synchronized volley from the Thor Corps.',
    image: './assets/threat-08-black-order.webp',
    status: 'Extinguished'
  },
  {
    id: 'threat-09',
    name: 'The Celestials',
    alias: 'Space Gods',
    fate: 'Bowed their cosmic crowns in recognition of Victor von Doom as the True Creator.',
    image: './assets/threat-09-celestials.webp',
    status: 'Subdued'
  },
  {
    id: 'threat-10',
    name: 'Scarlet Witch',
    alias: 'Chaos Magic Nexus',
    fate: 'Power stabilized and redirected to anchor the multiversal boundary wards.',
    image: './assets/threat-10-scarlet-witch.webp',
    status: 'Subdued'
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

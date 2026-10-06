export interface DetectedStream {
  id: string;
  title: string;
  format: 'mp4' | 'hls' | 'dash' | 'mp3' | 'webm';
  resolution: string;
  qualityBadge: string;
  size: string;
  sizeBytes: number;
  duration: string;
  fps?: number;
  bitrate: string;
  url: string;
  isAudioOnly?: boolean;
}

export interface VideoSourceDemo {
  id: string;
  name: string;
  platform: string;
  category: 'student' | 'creator' | 'travel' | 'archive' | 'marketing';
  videoTitle: string;
  pageUrl: string;
  duration: string;
  thumbnail: string;
  institution?: string;
  platformBadge: string;
  streams: DetectedStream[];
}

export interface UserGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  isPrimary?: boolean;
  tag: string;
  description: string;
  keyProblems: string[];
  vdhSolutions: string[];
  idealPlatforms: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const USER_GROUPS: UserGroup[] = [
  {
    id: 'students',
    title: 'Studenten, docenten en academici',
    subtitle: 'Hoorcolleges, instructievideo’s en webinars lokaal opslaan voor offline studie',
    icon: 'GraduationCap',
    isPrimary: true,
    tag: 'Hoofdfocus • Meest gekozen door studenten',
    description:
      'Veel leerplatformen zoals Canvas, Blackboard, Brightspace, Panopto en Kaltura hebben geen officiële downloadknop. Met Vidhauler herken je direct de onderliggende videostroom en sla je colleges lokaal op om offline te studeren, samen te vatten of te luisteren als podcast.',
    keyProblems: [
      'Geen officiële downloadknop op Canvas, Blackboard of Panopto',
      'Portals sluiten aan het einde van het semester: toegang tot aantekeningen gaat verloren',
      'Slechte Wi-Fi in de trein, bus of universiteitsbibliotheek verstoort het studeren',
      'Lange colleges (2+ uur) vreten kostbare mobiele databundels op',
    ],
    vdhSolutions: [
      'Detecteert automatisch verborgen HLS- en MP4-streams op elk educatief portaal',
      'Download volledige colleges in 1080p HD inclusief slides en presentaties',
      'Exporteer direct naar MP3 om colleges op 1.5x snelheid te luisteren onderweg',
      'Levenslang lokaal bewaren op je laptop voor tentamenvoorbereiding',
    ],
    idealPlatforms: ['Canvas LMS', 'Blackboard', 'Panopto', 'Kaltura', 'Brightspace', 'Moodle', 'Zoom & Teams'],
    quote: {
      text: 'Onze universiteit staat geen downloads toe van colleges op Canvas. Dankzij Vidhauler heb ik al mijn tentamenstof offline op mijn laptop staan en kan ik in de trein studeren zonder Wi-Fi!',
      author: 'Lars van der Meer',
      role: 'Student Rechten, Universiteit van Amsterdam',
    },
  },
  {
    id: 'creators',
    title: 'Content creators en video-editors',
    subtitle: 'Bliksemsnel B-roll, memes, interviews en socialmediabeelden verzamelen',
    icon: 'Film',
    tag: 'Creatieve Workflow',
    description:
      'Mensen die snel beeldmateriaal nodig hebben om in een montage (zoals Premiere Pro of DaVinci Resolve) te verwerken. In plaats van ingewikkelde downloadsites vol spam te openen, klik je op de extensie zodra de video afspeelt.',
    keyProblems: [
      'Downloadsites zitten vol pop-ups, virussen en verplichte registraties',
      'Ingewikkelde software vertraagt het creatieve proces tijdens het editen',
      'Lossy downloads van lage kwaliteit verpesten de uiteindelijke montage',
    ],
    vdhSolutions: [
      '1-klik download direct vanuit de browsertoolbar in originele bronkwaliteit',
      'Ondersteuning voor 1080p, 4K UHD en 60fps fragmenten voor soepele tijdlijnen',
      'Directe MP4- en audio-extractie klaar om in Premiere of DaVinci te slepen',
    ],
    idealPlatforms: ['Vimeo', 'X / Twitter', 'TikTok', 'Instagram', 'Dailymotion', 'Nieuwssites'],
    quote: {
      text: 'Als editor heb ik constant actuele quotes en B-roll nodig. Met Vidhauler staat het fragment in 5 seconden in mijn downloadmap.',
      author: 'Sanne Koster',
      role: 'Freelance Video Editor & YouTuber',
    },
  },
  {
    id: 'travelers',
    title: 'Reizigers en pendelaars (offline kijken)',
    subtitle: 'Onderweg in de trein, bus of het vliegtuig kijken zonder mobiele data',
    icon: 'Plane',
    tag: 'Data-besparing & Onderweg',
    description:
      'Gebruikers die onderweg video’s willen kijken zonder afhankelijk te zijn van mobiele data of wisselvallige openbare wifi-verbindingen.',
    keyProblems: [
      'Haperende Wi-Fi in de trein of geen bereik in tunnels en buitengebieden',
      'Vliegtuigen zonder internet of extreem dure wifi-tarieven aan boord',
      'Dure datalimieten bij het streamen van video via 4G/5G',
    ],
    vdhSolutions: [
      'Download je favoriete documentaires en interviews vooraf thuis op je snelle glasvezel',
      'Vlekkeloze offline weergave in VLC, QuickTime of Windows Media Player',
      'Bespaar tot tientallen gigabytes aan mobiele data per maand',
    ],
    idealPlatforms: ['NPO Start', 'VRT MAX', 'Arte', 'Webinars', 'Podcasts', 'Nieuwsportalen'],
    quote: {
      text: 'Ik pendel dagelijks 1,5 uur met de trein. Ik download vooraf colleges met Vidhauler en kijk zonder enige hapering.',
      author: 'Daan Vermeulen',
      role: 'Dagelijkse Treinpendelaar',
    },
  },
  {
    id: 'archivists',
    title: 'Digitale archivarissen en niche-liefhebbers',
    subtitle: 'Bewaar video’s voordat ze definitief van het internet verdwijnen',
    icon: 'Archive',
    tag: 'Cultuur & Behoud',
    description:
      'Mensen die bang zijn dat bepaalde inhoud van het internet verdwijnt: verwijderde livestreams, zeldzame documentaires, niche nieuwssites of forums. Een lokale kopie is vaak de enige manier om het nog terug te zien.',
    keyProblems: [
      'Video’s worden regelmatig offline gehaald wegens auteursrechten of veranderingen',
      'Livestreams worden na afloop niet altijd als replay gepubliceerd',
      'Kleine nieuwssites en fora schonken na enkele maanden hun archief',
    ],
    vdhSolutions: [
      'Leg live videostreams vast op het moment van uitzenden',
      'Bewaar zeldzaam materiaal in de hoogst mogelijke bitsnelheid',
      'Smart Naming slaat datum, bron en titel automatisch gestructureerd op',
    ],
    idealPlatforms: ['Livestreams', 'Onafhankelijke media', 'Historische archieven', 'Lokale omroepen'],
    quote: {
      text: 'Het internet is vergankelijk. Alles wat belangrijk is voor mijn onderzoek sla ik direct lokaal op via Vidhauler.',
      author: 'Prof. E. De Jong',
      role: 'Onderzoeker Mediahistorie',
    },
  },
  {
    id: 'marketers',
    title: 'Marketeers en communicatiemedewerkers',
    subtitle: 'Concurrentie-analyses, video-advertenties en presentaties archiveren',
    icon: 'TrendingUp',
    tag: 'Zakelijk & Strategie',
    description:
      'Professionals die video-advertenties van concurrenten willen analyseren, presentaties voor intern gebruik willen archiveren of videomateriaal van zakelijke evenementen willen bewaren.',
    keyProblems: [
      'Advertenties verdwijnen na een campagne en zijn niet meer terug te vinden',
      'Inspiratieborden missen vaak werkende video-voorbeelden',
      'Zakelijke webinars worden niet altijd gedeeld door de organisator',
    ],
    vdhSolutions: [
      'Sla social media video-advertenties direct op voor concurrentie-analyses',
      'Verzamel referentiebeelden voor briefing aan creatieve bureaus',
      'Knip fragmenten uit beursverslagen en zakelijke conferenties',
    ],
    idealPlatforms: ['LinkedIn Video', 'Meta Ad Library', 'Vimeo', 'Webinar platforms', 'Bedrijfssites'],
    quote: {
      text: 'Vidhauler is onmisbaar voor onze marketingmeetings om campagnes van concurrenten frame-voor-frame te analyseren.',
      author: 'Sophie Brand',
      role: 'Head of Brand Strategy',
    },
  },
];

export const DEMO_VIDEO_SOURCES: VideoSourceDemo[] = [
  {
    id: 'canvas-lecture',
    name: 'Universiteit College (Canvas / Panopto)',
    platform: 'Canvas LMS • Hoorcollege',
    category: 'student',
    institution: 'Universiteit van Amsterdam',
    platformBadge: 'Geen officiële downloadknop',
    videoTitle: 'Hoorcollege 4: Data-Analyse, Machine Learning & Statistiek (Deel 1)',
    pageUrl: 'https://canvas.uva.nl/courses/84920/modules/items/2491028',
    duration: '1:45:20',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    streams: [
      {
        id: 'lecture-1080p',
        title: 'College_Data_Analyse_Machine_Learning_Week4.mp4',
        format: 'mp4',
        resolution: '1080p Full HD (Slides + Docent)',
        qualityBadge: '1080p HD',
        size: '15.8 MB',
        sizeBytes: 16568524,
        duration: '1:45:20',
        fps: 30,
        bitrate: '2.5 Mbps',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      },
      {
        id: 'lecture-720p',
        title: 'College_Data_Analyse_Week4_720p.mp4',
        format: 'mp4',
        resolution: '720p HD (Lichte stream)',
        qualityBadge: '720p',
        size: '8.4 MB',
        sizeBytes: 8808038,
        duration: '1:45:20',
        fps: 30,
        bitrate: '1.2 Mbps',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      },
      {
        id: 'lecture-audio',
        title: 'College_Data_Analyse_Podcast_Audio.mp4',
        format: 'mp3',
        resolution: 'Audio Alleen (Luistercollege)',
        qualityBadge: 'MP3 Audio',
        size: '4.2 MB',
        sizeBytes: 4404019,
        duration: '1:45:20',
        bitrate: '192 kbps',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        isAudioOnly: true,
      },
    ],
  },
  {
    id: 'blackboard-medical',
    name: 'Medisch Webinar (Blackboard / Kaltura)',
    platform: 'Blackboard Learn Portal',
    category: 'student',
    institution: 'Erasmus Universiteit Rotterdam',
    platformBadge: 'Beveiligde Student Portal',
    videoTitle: 'Instructievideo Klinische Vaardigheden & Diagnostiek in de Praktijk',
    pageUrl: 'https://blackboard.eur.nl/webapps/blackboard/content/launchLink.jsp?id=92104',
    duration: '52:10',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    streams: [
      {
        id: 'med-1080p',
        title: 'Klinische_Diagnostiek_Instructie_1080p.mp4',
        format: 'mp4',
        resolution: '1080p Full HD',
        qualityBadge: '1080p',
        size: '1.10 GB',
        sizeBytes: 1181116006,
        duration: '52:10',
        fps: 30,
        bitrate: '3.0 Mbps',
        url: 'https://kaltura.cdn.eur.nl/video/med_diagnostiek.mp4',
      },
      {
        id: 'med-audio',
        title: 'Klinische_Diagnostiek_Samenvatting.mp3',
        format: 'mp3',
        resolution: 'Audio Podcast',
        qualityBadge: 'MP3',
        size: '72 MB',
        sizeBytes: 75497472,
        duration: '52:10',
        bitrate: '192 kbps',
        url: 'https://kaltura.cdn.eur.nl/audio/med_diagnostiek.mp3',
        isAudioOnly: true,
      },
    ],
  },
  {
    id: 'creator-interview',
    name: 'B-Roll & Interview (Vimeo Pro)',
    platform: 'Creative Cloud Media Hub',
    category: 'creator',
    platformBadge: 'Content Creator Bron',
    videoTitle: 'Cinematic B-Roll & Documentary Lighting Behind The Scenes',
    pageUrl: 'https://vimeo.com/channels/cinematography/829104812',
    duration: '08:35',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
    streams: [
      {
        id: 'creator-4k',
        title: 'Cinematic_Lighting_BTS_4K_ProRes.mp4',
        format: 'mp4',
        resolution: '2160p 4K UHD 60fps',
        qualityBadge: '4K UHD',
        size: '1.65 GB',
        sizeBytes: 1771674009,
        duration: '08:35',
        fps: 60,
        bitrate: '28 Mbps',
        url: 'https://player.vimeo.com/video/4k/cinematic_bts.mp4',
      },
      {
        id: 'creator-1080',
        title: 'Cinematic_Lighting_BTS_1080p.mp4',
        format: 'mp4',
        resolution: '1080p Full HD',
        qualityBadge: '1080p',
        size: '340 MB',
        sizeBytes: 356515840,
        duration: '08:35',
        fps: 60,
        bitrate: '5.5 Mbps',
        url: 'https://player.vimeo.com/video/1080p/cinematic_bts.mp4',
      },
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Werkt Vidhauler op Canvas, Blackboard, Panopto en Kaltura?',
    answer:
      'Ja! Dit is een van de populairste toepassingen onder studenten en docenten. Universitaire leeromgevingen (zoals Canvas LMS, Blackboard Learn, Brightspace, Moodle, Panopto en Kaltura) schakelen de officiële downloadknop vaak uit. Zodra jij het college in je browser afspeelt, herkent Vidhauler de onderliggende HLS/MP4 videostroom in het netwerkverkeer. Met één klik download je het college naar je harde schijf.',
  },
  {
    question: 'Kan ik colleges ook als MP3-audio opslaan voor onderweg?',
    answer:
      'Absoluut! Vidhauler heeft een ingebouwde audio-extractor. Als je het hoorcollege liever onderweg in de trein of tijdens het sporten luistert als podcast, selecteer je eenvoudig de MP3-optie. Dit bespaart veel opslagruimte en datakosten.',
  },
  {
    question: 'Wat zijn de prijzen voor Vidhauler Premium?',
    answer:
      'Vidhauler biedt twee voordelige opties: €10 per jaar (ideaal per studiejaar) of slechts €24 eenmalig om voor altijd te kopen (levenslange licentie voor je gehele studie en daarna). Er is ook een gratis basisversie.',
  },
  {
    question: 'Waarom kan de Chrome Web Store-versie geen video’s van YouTube downloaden?',
    answer:
      'Google hanteert een strikt beleid voor de Chrome Web Store dat extensies verbiedt om video’s van YouTube te downloaden. Vidhauler werkt daarentegen op tienduizenden andere websites (leeromgevingen, nieuwssites, Vimeo, Dailymotion, sociale media). Onze gratis Firefox-versie kent deze beperking van Google niet.',
  },
  {
    question: 'Wat is de Companion App (Vidhauler CoApp) en wanneer heb ik die nodig?',
    answer:
      'Voor 90% van MP4-video’s heb je geen extra software nodig. Voor complexe HLS/DASH streams of het samenvoegen van losse audio- en videosporen via FFmpeg voert de gratis Companion App dit razendsnel op de achtergrond uit.',
  },
  {
    question: 'Wat houdt het QR-watermerk in bij de gratis versie?',
    answer:
      'Bij de gratis versie van Vidhauler kan er een klein QR-watermerk verschijnen wanneer een video via de companion app geconverteerd moet worden. Een Premium licentie (€10/jr of €24 om te kopen) verwijdert dit watermerk voor altijd.',
  },
  {
    question: 'Is Vidhauler veilig en privacy-vriendelijk?',
    answer:
      'Ja, 100%. Vidhauler verzamelt geen browsegeschiedenis, injecteert geen advertenties en verkoopt geen gegevens aan derden. Al het downloaden en converteren gebeurt uitsluitend lokaal op jouw eigen computer.',
  },
  {
    question: 'Wat is het verschil tussen €10 per jaar en €24 om te kopen?',
    answer:
      'Met €10 per jaar betaal je een flexibel jaarabonnement (handig voor 1 studiejaar). Met €24 om te kopen betaal je eenmalig en heb je levenslang onbeperkt toegang zonder ooit nog terugkerende kosten te hebben.',
  },
];

export const COMPANION_APP_DOWNLOADS = [
  {
    os: 'Windows 10 / 11',
    icon: 'windows',
    version: '2.0.19',
    description: 'Compatibel met Windows 10 & 11 (64-bit installer)',
    filename: 'vidhauler-coapp-2.0.19-setup.exe',
    fileSize: '48.2 MB',
    badge: 'Aanbevolen',
  },
  {
    os: 'macOS (Apple Silicon & Intel)',
    icon: 'apple',
    version: '2.0.19',
    description: 'Universeel installatiepakket voor M1/M2/M3/M4 & Intel Macs',
    filename: 'vidhauler-coapp-2.0.19.pkg',
    fileSize: '52.1 MB',
    badge: 'Universal',
  },
  {
    os: 'Linux (Debian / Ubuntu)',
    icon: 'linux',
    version: '2.0.19',
    description: 'Debian / Ubuntu pakket (.deb) 64-bit',
    filename: 'vidhauler-coapp-2.0.19-amd64.deb',
    fileSize: '44.8 MB',
    badge: '.deb',
  },
  {
    os: 'Linux (Tarball)',
    icon: 'linux',
    version: '2.0.19',
    description: 'Generieke tarball voor Arch, Fedora, openSUSE',
    filename: 'vidhauler-coapp-2.0.19-linux-x86_64.tar.gz',
    fileSize: '45.4 MB',
    badge: '.tar.gz',
  },
];

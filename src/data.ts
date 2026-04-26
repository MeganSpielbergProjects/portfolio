import { CaseStudy, GameProject } from './types';

const ascherwaldTitle = '/media/ascherwald_logo.png';
const ascherwald_start = '/media/ascherwald_start.png';
const ascherwald_story = '/media/ascherwald_story.png';
const ascherwald_journal = '/media/ascherwald_journal.png';
const catsAgainstDarknessTitle = '/media/cats_against_darkness_logo.png';
const shareplateLogo = '/media/shareplate_logo2.png';
const shareplateDemo = '/media/shareplate_demo.png';
const scalySanctuaryLogo = '/media/scaly_sanctuary_logo.png';
const scalySanctuaryGameLoop = '/media/scaly_sanctuary_game_loop.png';
const scalySanctuaryPreparingSoil = '/media/scaly_sanctuary_preparing_soil.mp4';
const scalySanctuaryScreenshot = '/media/scaly_sanctuary_screens.png';
const myHabitLogo = '/media/myhabit_logo.png';
const fossilCameraPrototypes = '/media/fossil_camera_prototypes.png';
const insectDetectionPipeline = '/media/insect_detection_pipeline.png';
const insectDetectionResults = '/media/insect_detection_results.png';
const myHabitBannerPdf = '/MyHabitBanner.pdf';
const shareplatePoster = '/media/shareplate_poster.png';
const spohfDataCollection = '/media/spohf_dataset.png';
const spohfLogo = '/media/spohf_thumbnail.png';
const cgi_logo = '/media/cgi_thumbnail.png';
const legaSeaLogo = '/media/lega_sea.png';
const cgi_cicd = '/media/cgi_cicd.png';
const cgi_data_synch = '/media/cgi_data_synch.png';
const spohf_poster = '/media/spohf_poster.png';

export const softwareCaseStudies: CaseStudy[] = [
  {
    title: "Food Rescue iOS App",
    context: "University semester project developed in a team of four.",
    role: "Contributed to iOS development, UX decisions, and overall product design.",
    challenge:
      "Design a reliable and intuitive platform that enables people to share surplus food while building trust and encouraging community participation.",
    outcome:
      "Developed a native iOS prototype that simplifies food sharing into a fast, community-driven interaction.",
    stack: ["Swift (iOS)", "UIKit", "Team collaboration", "Agile project work"],
    imagePath: shareplateLogo,
    imageCaption: "SharePlate project logo and banner.",
    mediaItems: [
      {
        src: shareplateDemo,
        alt: "SharePlate iOS app demo screens",
        caption: "SharePlate mobile app flow showing home feed and map view.",
        type: "image",
      },
      {
        src: shareplatePoster,
        alt: "SharePlate project poster",
        caption: "SharePlate project poster.",
        type: "image",
      },
    ],
    mediaPlaceholder:
      "Add app screenshots, core flow GIF, and architecture sketch.",
  },
  {
    title:
      "Enhancing Test Quality and Automation for a Cross-Border Data Synchronization Project",
    context:
      "Internship at CGI Germany, an international IT and business consulting firm, as part of a project for a German authority. Worked in a global team to synchronize veterinary product data between a German database and the central European database.",
    role: "Led test quality improvements for a Java-based application, focusing on unit and integration testing, test automation, and CI/CD pipeline integration.",
    challenge:
      "Analyzed and expanded test coverage to close gaps, automated test data creation and execution in the CI/CD pipeline, developed visualizations to communicate quality metrics, and delivered project documentation (project plan, mid-term report, and final report) for university requirements.",
    outcome:
      "Improved automated test coverage and CI/CD reliability while providing clear quality reporting for the project team.",
    stack: [
      "Java",
      "Spring Boot",
      "WireMock",
      "Mockito",
      "Liquibase",
      "GitLab",
      "CI/CD",
      "Test Automation",
    ],
    imagePath: cgi_logo,
    mediaItems: [
      {
        src: cgi_cicd,
        alt: "CI/CD pipeline integration diagram",
        caption:
          "CI/CD Pipeline with Test Automation. (More detailed implementation details confidential)",
        type: "image",
      },
      {
        src: cgi_data_synch,
        alt: "Data synchronization architecture diagram",
        caption:
          "ETL pipeline from source to target database. (More detailed implementation details confidential)",
        type: "image",
      },
    ],
    mediaPlaceholder:
      "Add sanitized pipeline screenshots, redacted test dashboards, and sample diagrams (business processes, components, sequences).",
  },
  {
    title: "SPoHF insect detection CNN research",
    context:
      "Bachelor thesis for the SPoHF (Sustainable Production of Healthy Foods) research project at Fontys University of Applied Sciences.",
    role: "Developed a two-stage AI pipeline for detecting and classifying insects on yellow card traps.",
    challenge:
      "Design a practical, license-free workflow that could reduce manual insect counting, improve dataset quality, and support reliable detection in a real agricultural setting.",
    outcome:
      "Produced a working research direction and repeatable experimentation pipeline.",
    stack: ["Python", "OpenCV", "CNNs", "PyTorch", "Data processing"],
    mediaPlaceholder: "",
    imagePath: spohfLogo,
    mediaItems: [
      {
        src: insectDetectionPipeline,
        alt: "Insect detection model pipeline diagram",
        caption:
          "Two-stage pipeline: computer vision finds candidate objects first, then a CNN classifies each one as insect or non-insect.",
        type: "image",
      },
      {
        src: insectDetectionResults,
        alt: "Insect detection experiment results",
        caption: "Results from the insect detection pipeline.",
        type: "image",
      },
      {
        src: spohfDataCollection,
        alt: "SPoHF public insect detection dataset",
        caption:
          "Dataset of yellow-card trap images used for training, validation, and testing.",
        type: "image",
      },
      {
        src: spohf_poster,
        alt: "SPoHF research poster",
        caption: "Poster summarizing the SPoHF research.",
        type: "image",
      },
    ],
  },
  {
    title: "Fossil citizen-science photo improvement app",
    context: "Masters semester 1 research project.",
    role: "Built application logic to improve quality of submitted fossil photos.",
    challenge:
      "Help non-experts capture more useful, consistent field images that improve scientific value.",
    outcome:
      "Shipped an application prototype on practical capture guidance and photo quality improvement.",
    stack: ["Research software", "Python", "React", "User guidance design"],
    mediaPlaceholder:
      "Add before/after sample images and short usage walkthrough GIF.",
    imagePath: legaSeaLogo,
    projectUrl: "https://meganspielberg.github.io/fossil-ai-feedback/",
    githubUrl: "https://github.com/MeganSpielberg/fossil-ai-feedback",
    mediaItems: [
      {
        src: fossilCameraPrototypes,
        alt: "Fossil camera prototype iterations",
        caption: "Three prototype screens compared in the research.",
        type: "image",
      },
      {
        src: "https://www.youtube.com/embed/NLDBz3CPx-8",
        alt: "Fossil project demo and results",
        caption:
          "Demo of the fossil prototype used for testing and data collection.",
        type: "youtube",
        videoId: "NLDBz3CPx-8",
      },
    ],
  },
];

export const gameJourney: GameProject[] = [
  {
    title: 'Scaly Sanctuary: A reptile caretaking game',
    arc: 'Ongoing long-form game in development. 2026.',
    tools: ['Godot', 'Game design', 'Research project', 'Iterative prototyping'],
    details:
      'Scaly Sanctuary is an ongoing research-driven prototype focused on teaching proper reptile care through play. Current prototype functions include terrarium building and setup, feeding and routine care interactions, and contextual guidance delivered by an interactive Vet NPC who explains why each action matters to animal health.',
    imagePath: scalySanctuaryLogo,
    imageCaption: 'Scaly Sanctuary logo and visual identity.',
    mediaItems: [
      {
        src: scalySanctuaryLogo,
        alt: 'Scaly Sanctuary game logo',
        caption: 'Studio branding for the Scaly Sanctuary project.',
        type: 'image',
      },
      {
        src: scalySanctuaryGameLoop,
        alt: 'Scaly Sanctuary game loop diagram',
        caption: 'Core gameplay loop showing care routines and progression systems.',
        type: 'image',
      },
      {
        src: scalySanctuaryScreenshot,
        alt: 'Scaly Sanctuary in game view',
        caption: 'In-game screenshot showing the games interface.',
        type: 'image',
      },
      {
        src: scalySanctuaryPreparingSoil,
        alt: 'Scaly Sanctuary gameplay preview',
        caption: 'Preparation phase gameplay showing the reptile care mechanics in action.',
        type: 'video',
      },
    ],
    mediaPlaceholder: '',
  },
  {
    title: 'Ascherwald',
    arc: 'Rapid prototyping phase. 2025.',
    tools: ['Urban Legends Jam entry', 'GDevelop', 'Narrative RPG'],
    details: 'Designed and published Ascherwald for the Urban Legends Jam: a short narrative RPG prototype centered on atmosphere, exploration, and folklore-inspired storytelling.',
    projectUrl: 'https://ghostpan.itch.io/ascherwald',
    imagePath: ascherwaldTitle,
    imageCaption: 'Atmospheric title art used for the game page card.',
    mediaPlaceholder: '',
    mediaItems: [
      {
        src: ascherwald_start,
        alt: 'Ascherwald starting screen',
        caption: 'The initial screen of the Ascherwald game.',
        type: 'image',
      },
      {
        src: ascherwald_story,
        alt: 'Ascherwald NPC interaction',
        caption: 'The player talking to an old man NPC.',
        type: 'image',
      },
      {
        src: ascherwald_journal,
        alt: 'Ascherwald journal',
        caption: 'The journal system in Ascherwald is a picture-based log of the locations visited. All pictures were taken by the developers on a field trip.',
        type: 'image',
      },
    ],
  },
  {
    title: 'Cats Against Darkness',
    arc: 'Rapid prototyping phase. 2025.',
    tools: ['AI NPC Jam entry', 'Godot', 'NPC interaction design'],
    details: 'Designed and published Cats Against Darkness for the AI NPC Jam: a dark, cat-themed prototype built to explore NPC-driven interactions and a combat-focused style. Used this project as an opportunity to learn Godot.',
    projectUrl: 'https://ghostpan.itch.io/cats-against-darkness',
    imagePath: catsAgainstDarknessTitle,
    imageCaption: 'Pixel-art title banner representing the jam tone and combat fantasy.',
    mediaPlaceholder: '',
  },
  {
    title: 'MyHabit',
    arc: 'Bachelor project with an external client. 2024.',
    tools: ['GDevelop', 'n8n', 'Baserow'],
    details:
      'Built a no-code game for an external client focused on mental health learning and habit building. The concept, presented as MyHabit: Garden of Growth, guides players through entering their garden, choosing core virtues (courage, honesty, kindness), and protecting their plants as a metaphor for maintaining healthy routines.',
    imagePath: myHabitLogo,
    imageCaption: 'MyHabit pixel-art title logo.',
    mediaItems: [
      {
        src: 'https://www.youtube.com/embed/9l4GjBcOcbI',
        alt: 'MyHabit gameplay demo',
        caption: 'Live gameplay demo of the MyHabit experience.',
        type: 'youtube',
        videoId: '9l4GjBcOcbI',
      },
      {
        src: myHabitBannerPdf,
        alt: 'MyHabit project banner PDF',
        caption: 'Project banner and visual summary for MyHabit.',
        type: 'pdf',
      },
    ],
    mediaPlaceholder: '',
  },
];

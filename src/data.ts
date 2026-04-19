import { CaseStudy, GameProject } from './types';

const ascherwaldTitle = '/media/ascherwald_logo.png';
const catsAgainstDarknessTitle = '/media/cats_against_darkness_logo.png';
const scalySanctuaryLogo = '/media/scaly_sanctuary_logo.png';
const scalySanctuaryGameLoop = '/media/scaly_sanctuary_game_loop.png';
const scalySanctuaryPreparingSoil = '/media/scaly_sanctuary_preparing_soil.mp4';
const fossilCameraPrototypes = '/media/fossil_camera_prototypes.png';

export const softwareCaseStudies: CaseStudy[] = [
  {
    title: 'Food rescue iOS app',
    context: 'University semester project, team of 4.',
    role: 'iOS app contributor across product and implementation.',
    challenge:
      'Create a trustworthy way for people to offer leftover food and connect quickly with people nearby who can use it.',
    outcome:
      'Delivered a native iOS app prototype that framed food sharing as a simple, community-first interaction.',
    stack: ['iOS native', 'Team collaboration', 'University project'],
    mediaPlaceholder: 'Add app screenshots, core flow GIF, and architecture sketch.',
  },
  {
    title: 'Confidential system integration at CGI Germany',
    context: 'Internship in an international team.',
    role: 'Owned test quality improvements for a Java Spring Boot application.',
    challenge:
      'Improve confidence in a system that connected two data ecosystems while preserving delivery speed.',
    outcome:
      'Expanded test coverage, introduced automation, and added coverage reporting insights to make quality visible.',
    stack: ['Java', 'Spring Boot', 'Testing', 'CI insight reporting'],
    mediaPlaceholder: 'Add sanitized pipeline screenshot and redacted test dashboard.',
  },
  {
    title: 'SPoHF insect detection LLM research',
    context: 'Research-focused project.',
    role: 'Built and iterated on an LLM-centered detection approach.',
    challenge: 'Design a practical workflow for insect detection using Python-heavy experimentation.',
    outcome: 'Produced a working research direction and repeatable experimentation pipeline.',
    stack: ['Python', 'ML research', 'Data processing'],
    mediaPlaceholder: 'Add model pipeline diagram and experiment result chart.',
  },
  {
    title: 'Fossil citizen-science photo improvement app',
    context: 'Masters semester 1 research project.',
    role: 'Built application logic to improve quality of submitted fossil photos.',
    challenge:
      'Help non-experts capture more useful, consistent field images that improve downstream scientific value.',
    outcome: 'Shipped an application concept focused on practical capture guidance and photo quality improvement.',
    stack: ['Research software', 'Python', 'User guidance design'],
    mediaPlaceholder: 'Add before/after sample images and short usage walkthrough GIF.',
    projectUrl: 'https://meganspielberg.github.io/fossil-ai-feedback/',
    githubUrl: 'https://github.com/MeganSpielberg/fossil-ai-feedback',
    mediaItems: [
      {
        src: fossilCameraPrototypes,
        alt: 'Fossil camera prototype iterations',
        caption: 'Physical camera prototype designs used for field testing and photo quality improvement.',
        type: 'image',
      },
      {
        src: 'https://www.youtube.com/embed/NLDBz3CPx-8',
        alt: 'Fossil project demo and results',
        caption: 'Research presentation showing the app demo and experimental results.',
        type: 'youtube',
        videoId: 'NLDBz3CPx-8',
      },
    ],
  },
];

export const gameJourney: GameProject[] = [
  {
    title: 'Masters final project: reptile caretaking game',
    arc: 'Current long-form game production. 2026.',
    tools: ['Godot', 'Game design systems', 'Web branding'],
    details:
      'Developing a learning-focused game that teaches proper reptile care, plus a dedicated studio website around the project.',
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
    tools: ['Game jam workflow', 'Public release on itch.io'],
    details: 'Designed and shipped a playable jam project under tight constraints and published it publicly.',
    projectUrl: 'https://ghostpan.itch.io/ascherwald',
    imagePath: ascherwaldTitle,
    imageCaption: 'Atmospheric title art used for the game page card and external listing.',
    mediaPlaceholder: '',
  },
  {
    title: 'Cats Against Darkness',
    arc: 'Rapid prototyping phase. 2025.',
    tools: ['Game jam workflow', 'Public release on itch.io'],
    details: 'Built and published a second jam game with a different style and mechanics direction.',
    projectUrl: 'https://ghostpan.itch.io/cats-against-darkness',
    imagePath: catsAgainstDarknessTitle,
    imageCaption: 'Pixel-art title banner representing the jam tone and combat fantasy.',
    mediaPlaceholder: '',
  },
  {
    title: 'MyHabit',
    arc: 'Bachelor phase: first shipped game project. 2024.',
    tools: ['GDevelop', 'n8n', 'Baserow'],
    details:
      'Built a no-code game for a client who wanted players to learn about mental health and reinforce healthier routines.',
    mediaPlaceholder: 'Add gameplay loop GIF, mission screen, and client brief excerpt.',
  },
];

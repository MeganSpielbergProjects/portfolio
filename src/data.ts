import { CaseStudy, GameProject } from './types';

const ascherwaldTitle = '/media/ascherwald_logo.png';
const catsAgainstDarknessTitle = '/media/cats_against_darkness_logo.png';
const shareplateLogo = '/media/shareplate_logo2.png';
const shareplateDemo = '/media/shareplate_demo.png';
const scalySanctuaryLogo = '/media/scaly_sanctuary_logo.png';
const scalySanctuaryGameLoop = '/media/scaly_sanctuary_game_loop.png';
const scalySanctuaryPreparingSoil = '/media/scaly_sanctuary_preparing_soil.mp4';
const myHabitLogo = '/media/myhabit_logo.png';
const fossilCameraPrototypes = '/media/fossil_camera_prototypes.png';
const insectDetectionPipeline = '/media/insect_detection_pipeline.png';
const insectDetectionResults = '/media/insect_detection_results.png';
const myHabitBannerPdf = '/MyHabitBanner.pdf';
const shareplatePoster = '/media/shareplate_poster.png';

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
    imagePath: shareplateLogo,
    imageCaption: 'SharePlate project logo and banner.',
    mediaItems: [
      {
        src: shareplateDemo,
        alt: 'SharePlate iOS app demo screens',
        caption: 'SharePlate mobile app flow showing home feed and map view.',
        type: 'image',
      },
      {
        src: shareplatePoster,
        alt: 'SharePlate project poster',
        caption: 'SharePlate project poster.',
        type: 'image',
      }
    ],
    mediaPlaceholder: 'Add app screenshots, core flow GIF, and architecture sketch.',
  },
  {
    title: 'Test quality improvements at CGI Germany',
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
    title: 'SPoHF insect detection CNN research',
    context: 'Research-focused project.',
    role: 'Built and iterated on an CNN-centered detection approach.',
    challenge: 'Design a practical workflow for insect detection using Python-heavy experimentation.',
    outcome: 'Produced a working research direction and repeatable experimentation pipeline.',
    stack: ['Python', 'ML/DL research', 'Data processing'],
    mediaPlaceholder: '',
    projectUrl: '/NWO%20Poster.pdf',
    mediaItems: [
      {
        src: insectDetectionPipeline,
        alt: 'Insect detection model pipeline diagram',
        caption: 'Two stage process from using computer vision and CNNs to detect insects in images.',
        type: 'image',
      },
      {
        src: insectDetectionResults,
        alt: 'Insect detection experiment results',
        caption: 'Results from the insect detection pipeline.',
        type: 'image',
      },
    ],
  },
  {
    title: 'Fossil citizen-science photo improvement app',
    context: 'Masters semester 1 research project.',
    role: 'Built application logic to improve quality of submitted fossil photos.',
    challenge:
      'Help non-experts capture more useful, consistent field images that improve scientific value.',
    outcome: 'Shipped an application prototype on practical capture guidance and photo quality improvement.',
    stack: ['Research software', 'Python', 'React', 'User guidance design'],
    mediaPlaceholder: 'Add before/after sample images and short usage walkthrough GIF.',
    projectUrl: 'https://meganspielberg.github.io/fossil-ai-feedback/',
    githubUrl: 'https://github.com/MeganSpielberg/fossil-ai-feedback',
    mediaItems: [
      {
        src: fossilCameraPrototypes,
        alt: 'Fossil camera prototype iterations',
        caption: 'Three prototype screens compared in the research.',
        type: 'image',
      },
      {
        src: 'https://www.youtube.com/embed/NLDBz3CPx-8',
        alt: 'Fossil project demo and results',
        caption: 'Demo of the fossil prototype used for testing and data collection.',
        type: 'youtube',
        videoId: 'NLDBz3CPx-8',
      },
    ],
  },
];

export const gameJourney: GameProject[] = [
  {
    title: 'Scaly Sanctuary: A reptile caretaking game',
    arc: 'Current long-form game in development. 2026.',
    tools: ['Godot', 'Game design', 'Research project'],
    details:
      'Developing a learning-focused game that teaches proper reptile care, plus a dedicated studio website around the project.',
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
    tools: ['Game jam entry', 'Public release on itch.io'],
    details: 'Designed and published a playable jam project.',
    projectUrl: 'https://ghostpan.itch.io/ascherwald',
    imagePath: ascherwaldTitle,
    imageCaption: 'Atmospheric title art used for the game page card.',
    mediaPlaceholder: '',
  },
  {
    title: 'Cats Against Darkness',
    arc: 'Rapid prototyping phase. 2025.',
    tools: ['Game jam entry', 'Public release on itch.io'],
    details: 'Built and published a second jam game with a different style and mechanics direction.',
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
      'Built a no-code game for a client who wanted players to learn about mental health and reinforce healthier habits.',
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

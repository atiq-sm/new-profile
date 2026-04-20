// Single source of truth for portfolio content.
// TODO: tagline, about, linkedin, and email still need real values.

export const site = {
  name: 'Atiq Mohammed',
  // TODO: replace with your real tagline (one line, what you do).
  tagline: 'Short tagline — what you do, in one line.',
  // TODO: replace with a 2–3 sentence bio.
  about:
    'A short paragraph about you: your background, what you work on, ' +
    'and what you care about. Two or three sentences is plenty.',
  links: {
    github: 'https://github.com/atiq-sm',
    // TODO: replace with your LinkedIn URL.
    linkedin: 'https://www.linkedin.com/in/your-handle/',
    // TODO: replace with your contact email.
    email: 'you@example.com',
  },
  projects: [
    {
      title: 'MR POCUS Training System',
      description:
        'Mixed-reality ultrasound trainer for Meta Quest 3: instructors calibrate spatial anchors on a manikin, then controller pose-matching cues the right pathology clip in-world. Built in Unity 6 for pediatric POCUS learners.',
      href: 'https://github.com/atiq-sm/MR-POCUS',
      tags: ['Unity 6', 'Meta Quest 3', 'Mixed Reality', 'C#'],
    },
    {
      title: 'Lending Club Analysis',
      description:
        'ML on Lending Club loan data: predicting loan grades, surfacing the features that drive them, and exploring the shape of the dataset.',
      href: 'https://github.com/atiq-sm/Lending-Club-Analysis',
      tags: ['Python', 'ML', 'Jupyter'],
    },
    {
      title: 'CS 5330 Final Project',
      // TODO: describe the problem and approach (CS 5330 = Pattern Recognition & Computer Vision).
      description: 'Graduate computer-vision coursework capstone in Python.',
      href: 'https://github.com/atiq-sm/CS-5330-Final-Project',
      tags: ['Python', 'Computer Vision'],
    },
    {
      title: 'ZombieGame',
      // TODO: describe what makes this prototype interesting.
      description: 'Zombie-survival game prototype built in Unity.',
      href: 'https://github.com/atiq-sm/ZombieGame',
      tags: ['Unity', 'C#'],
    },
    {
      title: 'Portfolio Site',
      description:
        'This site — a Vite + React portfolio with live GitHub repo metadata, animated scroll reveals, and a tuned type + color system.',
      href: 'https://github.com/atiq-sm/new-profile',
      tags: ['React', 'Vite', 'Framer Motion'],
    },
  ],
};

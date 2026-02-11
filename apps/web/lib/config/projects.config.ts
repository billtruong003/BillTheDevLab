import type { ProjectConfig } from '@billthedevlab/shared-types';

export const projectsConfig: Record<string, ProjectConfig> = {
  'shmackle-vr': {
    slug: 'shmackle-vr',
    title: 'Shmackle VR',
    tagline: 'A VR Social Sandbox Game where physics meets chaos',
    genre: 'VR Sandbox',
    engine: 'Unity',
    status: 'Live',
    heroImage: '/images/projects/shmackle-hero.webp',
    accentColor: '#FF8C42',
    sections: [
      {
        id: 'features',
        type: 'features',
        title: 'Key Features',
        items: [
          { title: '90 FPS Optimization', description: 'Optimized render pipeline for Quest standalone' },
          { title: 'Networking', description: 'Core networking features using Photon Fusion' },
          { title: 'Dynamic FOV', description: 'Implemented technical solutions to minimize motion sickness' },
        ],
      },
    ],
  },
  'animal-push-royale': {
    slug: 'animal-push-royale',
    title: 'Animal Push Royale',
    tagline: 'GameVerse 2024 Finalist - A chaotic multiplayer push battle',
    genre: 'Multiplayer Party',
    engine: 'Unity',
    status: 'Completed',
    heroImage: '/images/projects/animal-push-hero.webp',
    accentColor: '#34D399',
    sections: [
      {
        id: 'features',
        type: 'features',
        title: 'Highlights',
        items: [
          { title: 'Multithreading', description: 'Substantial performance gains via DOTS/Jobs' },
          { title: 'GameVerse Finalist', description: 'Recognized as one of the top indie games of 2024' },
        ],
      },
    ],
  },
  'kindlys-promise': {
    slug: 'kindlys-promise',
    title: "Kindly's Promise",
    tagline: 'Narrative Sci-Fi Adventure with Advanced URP Rendering',
    genre: 'Adventure',
    engine: 'Unity (URP)',
    status: 'Prototype',
    heroImage: '/videos/kindlypromise.gif',
    accentColor: '#A78BFA',
    sections: [
      {
        id: 'features',
        type: 'features',
        title: 'Tech Stack',
        items: [
          { title: 'Custom Shaders', description: 'Hand-written HLSL shaders for unique visual style' },
          { title: 'URP Optimization', description: 'Pushing mobile graphics to the limit' },
        ],
      },
    ],
  },
  'applaydu': {
    slug: 'applaydu',
    title: 'Applaydu',
    tagline: 'Edutainment App with 50M+ Downloads (Gameloft)',
    genre: 'Edutainment',
    engine: 'Unity',
    status: 'Released',
    heroImage: '/images/projects/applaydu.jpg',
    accentColor: '#FBBF24',
    sections: [],
  },
  'bills-devsprint': {
    slug: 'bills-devsprint',
    title: "Bill's DevSprint",
    tagline: 'SaaS Platform for Developer Productivity',
    genre: 'SaaS',
    engine: 'React',
    status: 'Live',
    heroImage: '/images/projects/billdevsprint.png',
    accentColor: '#3B82F6',
    sections: [],
  },
  'responsive-webgl': {
    slug: 'responsive-webgl',
    title: 'Responsive WebGL Template',
    tagline: 'Open Source Unity WebGL Template for Mobile',
    genre: 'Tool',
    engine: 'Unity',
    status: 'Open Source',
    heroImage: '/videos/responsive-webgl.gif',
    accentColor: '#10B981',
    sections: [],
  },
  'suika-game': {
    slug: 'suika-game',
    title: 'Suika Game Clone',
    tagline: 'Physics-based Fruit Merging Game',
    genre: 'Puzzle',
    engine: 'Unity',
    status: 'Completed',
    heroImage: '/images/projects/suikagame.webp',
    accentColor: '#84CC16',
    sections: [],
  },
  'puffy-gmtk': {
    slug: 'puffy-gmtk',
    title: 'Puffy (GMTK Jam 2024)',
    tagline: 'Entry for GMTK Game Jam 2024',
    genre: 'Game Jam',
    engine: 'Unity',
    status: 'Completed',
    heroImage: '/videos/puffy.gif',
    accentColor: '#06B6D4',
    sections: [],
  },
    'keystream-gemini': {
    slug: 'keystream-gemini',
    title: 'KeyStream-Gemini',
    tagline: 'High-performance reverse proxy for Gemini API with intelligent key rotation',
    genre: 'AI Tool',
    engine: 'Node.js',
    status: 'Open Source',
    heroImage: '/images/projects/keystream.png',
    accentColor: '#8E24AA', // Gemini Purple
    sections: [
      {
        id: 'video',
        type: 'custom',
        title: 'Video Tutorial',
        content: `
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; background: #000; border: 1px solid var(--color-border);">
            <iframe 
              src="https://www.youtube.com/embed/C7CeLLUwUDg?si=X0U0Cvjl0cvRIdAb" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            ></iframe>
          </div>
        `,
      },
      {
        id: 'features',
        type: 'features',
        title: 'Core Features',
        items: [
          { title: 'Dynamic Key Rotation', description: 'Automatically cycles through API keys to maintain continuous availability.' },
          { title: 'Real-time Observability', description: 'Web dashboard for traffic metrics and key health status.' },
          { title: 'OpenAI Compatibility', description: 'Standardized interface for seamless integration with tools like Continue.dev.' },
          { title: 'Native Streaming', description: 'Optimized SSE handling for fluid AI interactions.' },
        ],
      },
      {
        id: 'faq',
        type: 'custom',
        title: 'FAQ & Insights',
        content: `
          <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--color-text-primary);">Why KeyStream-Gemini?</h3>
          <p>Unlike complex DevOps tools, this is a <strong>plug-and-play</strong> solution for developers. It runs locally, keeping your keys and data secure on your machine.</p>

          <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--color-text-primary);">Bypassing Rate Limits</h3>
          <p>By rotating through a pool of "Billing-enabled" free tier keys, you can achieve thousands of requests per day—perfect for heavy coding sessions.</p>

          <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--color-text-primary);">Integration</h3>
          <p>Compatible with any tool supporting custom OpenAI endpoints (VS Code, CLI, Python scripts).</p>
        `,
      },
      {
        id: 'devlog',
        type: 'devlog',
        title: 'Development Log',
        items: [
          { title: 'Project Release Github (Give Me A Star!)', date: '2024-03-20', link: 'https://github.com/billtruong003/KeyStream-Gemini' },
        ],
      },
    ],
  },
};

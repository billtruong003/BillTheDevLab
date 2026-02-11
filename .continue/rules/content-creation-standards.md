---
globs: |-
  apps/web/content/**/*.mdx
  apps/web/lib/config/projects.config.ts
description: >-
  Ensure consistency when adding new content to the website.

  For Blog Posts:

  - Create new .mdx files in 'apps/web/content/posts/'.

  - Always include Frontmatter: title, description, date, tags, coverImage,
  layout ('post'), featured (boolean), estimatedReadTime (number).

  - Use components like <Callout>, <CodeSnippet> for enhanced content.


  For Projects:

  - Add entry to 'projectsConfig' in 'apps/web/lib/config/projects.config.ts'.

  - Define slug, title, tagline, genre, engine, status, heroImage.

  - Define sections: gallery, features, devlog (links to related blog posts).
alwaysApply: false
---

Follow specific formats for creating Blog Posts (MDX) and Projects (Config).
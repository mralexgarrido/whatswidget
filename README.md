# WhatsWidget

**Create, preview, and embed a customizable WhatsApp contact widget for your website.**

[![Continuous integration](https://github.com/mralexgarrido/whatswidget/actions/workflows/ci.yml/badge.svg)](https://github.com/mralexgarrido/whatswidget/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/mralexgarrido/whatswidget/actions/workflows/deploy.yml/badge.svg)](https://github.com/mralexgarrido/whatswidget/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/mralexgarrido/whatswidget/actions/workflows/codeql.yml/badge.svg)](https://github.com/mralexgarrido/whatswidget/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Live app:** [https://mralexgarrido.github.io/whatswidget/](https://mralexgarrido.github.io/whatswidget/)

## Overview

WhatsWidget is a free, open-source, browser-based generator for website owners who want to add a WhatsApp contact option without installing a large plugin or building a custom integration. Configure the widget, review the live preview, copy the generated snippet, and place it in your website's custom-code area.

The maintained application is intentionally lightweight. It does not require an account, a project-owned backend, or a paid service.

## Features

- Interactive widget configuration with a live preview
- Custom text, colors, placement, agents, triggers, and working hours
- Copy-ready, standalone embed code
- Responsive React and TypeScript interface
- Static GitHub Pages deployment
- Automated type checking, linting, formatting, tests, dependency review, and CodeQL analysis
- MIT-licensed source code

## Use the generator

1. Open the [live generator](https://mralexgarrido.github.io/whatswidget/).
2. Enter a WhatsApp-enabled number in international format, including the country code and without spaces or punctuation.
3. Configure the message, appearance, placement, and optional behavior.
4. Review the preview at desktop and mobile sizes.
5. Select **Get Code**, then copy the generated snippet.
6. Install the snippet in your website's approved custom HTML or global code area.
7. Publish and test the final page.

See [Embedding and testing guidance](docs/EMBEDDING.md) for implementation notes and troubleshooting.

## Local development

### Requirements

- Node.js 24, as declared in [`.nvmrc`](.nvmrc)
- npm 10 or newer

### Setup

```bash
git clone https://github.com/mralexgarrido/whatswidget.git
cd whatswidget
npm ci
npm run dev
```

The development server starts at `http://localhost:3000`.

### Quality checks

```bash
npm run check
```

This command runs TypeScript validation, ESLint, Prettier verification, automated tests, and a production build.

### Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Validate TypeScript |
| `npm run lint` | Run ESLint |
| `npm run format:check` | Verify formatting |
| `npm run test` | Run the Vitest suite |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run check` | Run the complete quality gate |

## Project structure

```text
.github/             GitHub Actions, issue forms, and repository automation
docs/                Architecture, embedding, and release documentation
public/              Static metadata and public assets
src/                 React and TypeScript application source
index.html           Application shell and search/social metadata
vite.config.ts       Vite, Tailwind CSS, aliases, and test configuration
```

Read [Architecture](docs/ARCHITECTURE.md) for the runtime and deployment boundaries.

## Deployment

Changes merged into `main` are validated and deployed through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow publishes only Vite's compiled `dist` directory. Source TypeScript files are not served as the production application.

The production URL is:

```text
https://mralexgarrido.github.io/whatswidget/
```

## Privacy and security

WhatsWidget is delivered as a static client-side application. Read [PRIVACY.md](PRIVACY.md) for data-handling boundaries and [SECURITY.md](SECURITY.md) for responsible vulnerability reporting.

Never include credentials, API keys, private customer information, or confidential messages in generated code or public issues.

## Support

Read [SUPPORT.md](SUPPORT.md) before opening an issue. Reproducible bug reports and clearly explained feature requests are welcome.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and use the repository's issue forms before proposing a substantial change.

## Trademark notice

WhatsApp is a trademark of Meta Platforms, Inc. WhatsWidget is an independent open-source project. It is not affiliated with, endorsed by, or sponsored by WhatsApp or Meta.

## License

Released under the [MIT License](LICENSE).

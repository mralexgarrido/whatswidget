# Architecture

## Overview

WhatsWidget is a static single-page application built with React, TypeScript, Vite, and Tailwind CSS. It is compiled into static HTML, CSS, and JavaScript and published through GitHub Pages.

## Design goals

- Keep the generator fast and understandable.
- Avoid a backend unless a future requirement cannot be met safely in the browser.
- Keep user configuration local to the browser.
- Generate portable embed code with minimal dependencies.
- Make deployment reproducible from the repository.

## Runtime boundaries

### Build time

GitHub Actions installs locked npm dependencies, runs quality checks and tests, executes the Vite production build, and uploads only the `dist` directory as the Pages artifact.

### Browser runtime

React renders the generator interface. User-entered configuration updates the preview and generated snippet. The maintained application does not rely on a project-owned API.

### Generated widget

The copied snippet runs on the adopting website. The adopting site owner is responsible for placement, styling conflicts, Content Security Policy, privacy disclosures, and validation in the production environment.

## Quality and security controls

- Locked npm installation with `npm ci`
- TypeScript type checking
- ESLint and Prettier validation
- Vitest test suite
- Reproducible Vite production build
- CodeQL scanning for JavaScript and TypeScript
- Dependabot updates for npm and GitHub Actions

## Deployment

The production workflow is `.github/workflows/deploy.yml`. The GitHub Pages environment records the deployed commit. Code rollback is performed by reverting the relevant merge commit and allowing the workflow to deploy the restored state.

## Architecture decisions

Significant changes should favor the least complex maintainable option. A backend, database, authentication layer, analytics service, or new framework should be introduced only with a documented requirement, privacy impact, security model, operating cost, and rollback plan.

# Contributing to WhatsWidget

Thank you for helping improve WhatsWidget. Contributions should keep the project lightweight, accessible, secure, and easy for website owners to use.

## Before opening a pull request

- Search existing issues and pull requests to avoid duplicate work.
- Use the bug or feature issue form for a change that needs discussion.
- Report vulnerabilities privately by following [SECURITY.md](SECURITY.md).
- Keep each pull request focused on one problem.
- Do not include secrets, personal information, or real customer data.

## Development setup

```bash
git clone https://github.com/mralexgarrido/whatswidget.git
cd whatswidget
npm ci
npm run dev
```

Use the Node.js version declared in `.nvmrc`.

## Branch and commit conventions

Use a descriptive branch name:

```text
feat/widget-position-options
fix/phone-number-validation
docs/embedding-guide
chore/dependency-maintenance
```

Prefer concise, imperative commit messages. Conventional Commit prefixes are encouraged:

```text
feat: add a compact widget style
fix: preserve encoded message characters
docs: clarify WordPress embedding
test: cover phone-number normalization
```

## Required validation

Run the complete local check before requesting review:

```bash
npm run check
```

A pull request should not be merged while CI, tests, type checking, linting, formatting, security checks, or the production build are failing.

## Product standards

### Accessibility

- Use semantic HTML before ARIA.
- Support keyboard interaction and visible focus states.
- Associate every form control with a clear label.
- Maintain sufficient contrast.
- Respect reduced-motion preferences.
- Test meaningful interface changes at narrow and wide viewport sizes.

### Security and privacy

- Treat browser code as public.
- Never add credentials or privileged API keys to frontend code.
- Validate and encode user-controlled values before placing them in generated markup or URLs.
- Use `rel="noopener noreferrer"` with links that open a new tab.
- Avoid adding analytics or third-party scripts without documenting the privacy impact.
- Do not weaken a site's Content Security Policy to accommodate a feature.

### Scope and maintainability

- Prefer focused React components and straightforward browser APIs.
- Avoid adding a dependency when a small, well-tested implementation is clearer.
- Preserve existing behavior unless the issue or pull request explicitly proposes a breaking change.
- Update documentation and tests when behavior changes.
- Respect the existing npm lockfile.

## Pull request checklist

The pull request template asks for the reason for the change, validation performed, screenshots when the interface changes, accessibility considerations, security and privacy impact, and rollback information. Complete the relevant sections rather than deleting them.

## Code of Conduct

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

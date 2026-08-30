# Security Policy

## Supported version

WhatsWidget is a continuously deployed web application. Security fixes are applied to the current `main` branch and the live GitHub Pages deployment.

| Version | Supported |
| --- | --- |
| Current `main` and live deployment | Yes |
| Older commits, forks, and modified embeds | No |

## Report a vulnerability privately

Do not disclose a suspected vulnerability in a public issue, discussion, pull request, screenshot, or social post.

1. Open the repository's **Security** tab.
2. Use **Report a vulnerability** when private vulnerability reporting is available.
3. Include the affected URL or commit, reproduction steps, expected impact, and a safe proof of concept.
4. Remove credentials, personal information, and real customer data from the report.

When the private reporting form is unavailable, contact the repository owner through the GitHub profile at `https://github.com/mralexgarrido` and request a private reporting channel. Do not send exploit details publicly.

## Response targets

The maintainer aims to acknowledge a complete report within three business days, assess severity within seven business days, and coordinate disclosure after a fix is available. Complex reports may require additional time.

## Scope

Relevant reports include:

- Unsafe handling or encoding of values in generated widget code
- Cross-site scripting or markup injection
- Dependency or workflow compromise affecting the published application
- Exposure of secrets, tokens, or private data
- A deployment path that publishes unintended repository content

Third-party behavior inside WhatsApp, GitHub, browsers, hosting providers, or modified downstream copies is generally outside this project's control. Reports that demonstrate a direct WhatsWidget impact are still welcome.

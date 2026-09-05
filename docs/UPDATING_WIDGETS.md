# Updating an installed WhatsWidget

## Two different updates

The generator is the application where you configure and copy a widget. The installed widget is the standalone snippet you placed in another website. A generator deployment does not edit that external website or automatically replace its copied snippet.

An improvement to the generator's interface may not require changing an installed widget. A change to generated behavior may require regenerating and replacing the snippet. Release notes should make that distinction explicit.

## Replace a snippet safely

Record the website, installation location, and approved contact number. Save the existing snippet in your normal site backup or change log before replacing it. Do not post customer-specific code or contact details in public issues.

Generate the replacement, compare the number, message, placement, working hours, and other configured options, and test it on a preview page. Replace the original snippet in the approved code location; do not leave both versions active.

Use the [embedding checklist](EMBEDDING.md) to test a single visible widget, keyboard access, mobile placement, the destination number, prepared-message encoding, and interaction with consent banners or other fixed controls. A correct generator preview does not prove compatibility with the destination site's script restrictions or Content Security Policy.

Only publish changes to a website you are authorized to administer. Do not weaken its security settings as a shortcut to make the widget appear.

## Roll back a website installation

Restore the previous snippet in the same installation location and remove the replacement. Clear only the relevant site cache through the site's approved process, then retest the published page. Reverting the generator repository alone does not restore code already copied into another website.

## Reporting an update problem

Explain whether the issue is in the generator, copied snippet, or published host page. Include the browser, configuration that reproduces it, expected behavior, and actual behavior. Use fictional contact data and a minimal example. Follow [SUPPORT.md](../SUPPORT.md) and report vulnerabilities privately under [SECURITY.md](../SECURITY.md).

## Maintainer release handoff

Follow the existing [release checklist](RELEASE_CHECKLIST.md). Before publishing an announcement, identify the exact tested commit and explain:

- What improved for a website owner or visitor.
- Whether existing installations need a regenerated snippet.
- Any compatibility limitation and the replacement/rollback steps.

Use `npm ci` and `npm run check` with the repository's declared runtime, then test generated output on an isolated host page. Match the production build's `/whatswidget/` base path when validating the Pages artifact. Record tests actually run, and await approval before merge, deployment, or release publication.

Suggested About description: **Create, preview, and embed a customizable WhatsApp contact widget for your website.** Suggested topics: `whatsapp`, `chat-widget`, `embed-generator`, `react`, `typescript`, `github-pages`. Use the verified live generator for the website field and a real screenshot for a repository social preview. These settings are separate from README and website metadata; this guide does not change them.

# Release and deployment checklist

WhatsWidget uses continuous deployment from `main`. Treat each merge to `main` as a production release.

## Before merge

- [ ] The pull request has a focused purpose and clear rollback path.
- [ ] `npm run check` succeeds locally.
- [ ] GitHub Actions checks are successful.
- [ ] New or changed behavior has automated coverage where practical.
- [ ] Keyboard, focus, labels, contrast, zoom, and reduced motion were considered.
- [ ] No credentials, private data, analytics identifiers, or environment-specific values were committed.
- [ ] Documentation and the changelog were updated when user-facing behavior changed.
- [ ] Interface changes were tested at mobile and desktop widths.

## After deployment

- [ ] Open [the live app](https://mralexgarrido.github.io/whatswidget/) in a private browser window.
- [ ] Confirm the application renders without console errors.
- [ ] Exercise the primary configure, preview, copy, and WhatsApp handoff flow.
- [ ] Confirm critical links, metadata, favicon, and manifest requests succeed.
- [ ] Confirm the raw homepage HTML includes the social title, description, and absolute HTTPS image URL without running JavaScript. Request the image and verify its MIME type and dimensions match the metadata.
- [ ] Paste the public homepage URL into a new WhatsApp message, wait for the preview, and verify the graphic and copy before sending. Check that link previews are enabled on the test device.
- [ ] Test keyboard navigation and visible focus.
- [ ] Verify the deployed GitHub Pages environment references the intended commit.

## Rollback

Revert the merge commit that introduced the regression. Do not restore an obsolete or conflicting deployment workflow. After the revert is merged, confirm that the Pages workflow publishes the restored state and repeat the smoke test.

## Social link previews

The homepage defines Open Graph and Twitter Card metadata directly in `index.html`. Vite copies the preview image from `public/` to the published site. Keep the image URL absolute and publicly accessible, and update its filename when replacing the artwork so crawlers can request a new asset. The current JPEG is `public/whatswidget-social-preview-v2.jpg` at 1200 by 630 pixels. The earlier `public/og-image.png` remains available for older cached previews.

Website metadata cannot guarantee a preview on every device. WhatsApp controls its own preview generation and caching, and its [Disable link previews setting](https://faq.whatsapp.com/445453537819972) prevents previews for links the user sends. A crawler-style HTTP check verifies public access, but it does not prove that a particular WhatsApp client has displayed the card. If a newly pasted link still shows an older preview, retry after the client refreshes its cached data; already-sent messages may keep their original card.

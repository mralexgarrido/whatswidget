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
- [ ] Test keyboard navigation and visible focus.
- [ ] Verify the deployed GitHub Pages environment references the intended commit.

## Rollback

Revert the merge commit that introduced the regression. Do not restore an obsolete or conflicting deployment workflow. After the revert is merged, confirm that the Pages workflow publishes the restored state and repeat the smoke test.

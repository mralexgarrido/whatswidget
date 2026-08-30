# Embedding and testing WhatsWidget output

## Before generating the widget

Use a WhatsApp-enabled number in international format. Include the country code and omit the plus sign, spaces, parentheses, and punctuation unless the generator explicitly says otherwise.

Example format:

```text
19565550123
```

Use a default message that is useful but does not contain confidential information. The message may appear in the visitor's browser address bar or WhatsApp handoff flow.

## Where to place the code

Paste the generated snippet into a location that permits custom HTML and JavaScript. Common locations include:

- A global footer or site-wide custom-code field
- A theme template immediately before the closing `</body>` tag
- A tag-management or code-injection area approved by the website administrator

Avoid installing the snippet more than once on the same page.

## Content Security Policy

A strict Content Security Policy may block inline styles, inline scripts, external fonts, or third-party URLs used by a widget. Review the generated snippet and allow only the minimum required origins. Do not weaken a site-wide security policy simply to make a widget work.

## Test checklist

After publishing, verify:

- The button appears once and does not cover navigation, consent controls, or essential content.
- Keyboard users can reach and activate it.
- The focus indicator is visible.
- The button remains usable at narrow mobile widths and high zoom levels.
- The destination number is correct.
- The prepared message preserves spaces, punctuation, and non-English characters.
- Opening a new tab does not give the destination access to the originating page.
- The page has no new console errors or layout shifts.
- The widget does not conflict with an existing chat, accessibility, or cookie-consent control.

## Troubleshooting

### The button does not appear

Confirm that the code was saved in a field that permits scripts, then inspect the browser console for content-security, syntax, or blocked-resource errors. Some hosted site builders sanitize custom code.

### The wrong page opens

Verify the international number and test the final published page. Preview environments may rewrite or block external navigation.

### The message is incomplete

Regenerate the snippet and confirm that the message is URL-encoded. Avoid manually editing encoded characters unless you understand the resulting URL.

### The widget overlaps another control

Change the available position or spacing settings. Test against mobile navigation, cookie banners, accessibility widgets, and other fixed-position elements.

## Getting help

Follow [SUPPORT.md](../SUPPORT.md) and provide a minimal, non-sensitive reproduction.

# Wedding Invitation

A lightweight, static wedding invitation that can be reused for another event by editing `event-config.js`.

## Preview locally

No build step or package manager is required.

1. Clone the repository.
2. Open `index.html` in a browser, or serve the folder with any static HTTP server.
3. Edit `event-config.js` to customize the invitation.

## Customize an event

The configuration includes:

- Site title, eyebrow, invitation heading, couple names, and date.
- Optional invitation message.
- Venue name, address lines, and map URL.
- Ordered schedule entries.
- Optional gallery entries with image paths, alt text, and captions.
- Theme accent/card colors and background image.
- Visibility toggles for location, schedule, and gallery sections.

Keep event-specific content in `event-config.js` where possible; avoid editing `index.html` for ordinary content changes. Images should be optimized for mobile and used with permission.

## Current scope

This is a static template. It does not currently provide an admin panel, RSVP storage, guest-specific invitations, analytics, or a backend. Add those only when the requirements justify them.

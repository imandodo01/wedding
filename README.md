# Reusable Wedding Invitation

A lightweight, static wedding invitation website. Reuse it for another couple by editing `event-config.js`; ordinary event content and optional sections should not require changes to the HTML or CSS.

## Preview locally

No build step, package manager, or backend is required.

1. Clone the repository.
2. Open `index.html` in a browser, or serve the folder with any static HTTP server.
3. Edit `event-config.js` and refresh the page.

Some browser features behave more reliably when served over HTTP rather than opened directly as a local file. Any image paths you configure should point to assets available in the deployed folder or to valid public URLs.

## What the invitation supports

- **Hero / cover:** event title, couple names, subtitle, date, background image, and primary link.
- **Couple section:** two or more configurable people, roles, optional descriptions, and optional portraits.
- **Invitation message:** a short welcome message.
- **Our story:** one or more paragraphs.
- **Event details:** date/time labels, venue name, address lines, and a map link.
- **Schedule:** ordered events with time, title, and description.
- **Gallery:** images with alternative text and optional captions.
- **Countdown:** days, hours, minutes, and seconds when a future ISO date is configured.
- **RSVP:** an optional form that prepares a message and opens WhatsApp. It does not store submissions in a database.
- **Gift details:** optional bank or delivery information.
- **Theme:** accent, paper, background, and text colors.
- **Decorative details:** configurable ornamental dividers, portrait framing, and typography flourishes.
- **Motion:** gentle cover entrance and scroll reveals, disabled when reduced motion is preferred.
- **Envelope opening:** an optional interactive envelope-and-card intro before the invitation microsite.
- **Responsive layout:** desktop/mobile breakpoints, keyboard-friendly links and form controls, and reduced-motion support.

## Configure a new event

All normal customization lives in `event-config.js`.

### 1. Event identity

Update `siteTitle`, `metaDescription`, `eyebrow`, `title`, `subtitle`, `coupleNames`, `date`, and `intro`.

Set `eventDateISO` in ISO 8601 format with the correct timezone, for example:

```js
eventDateISO: "2027-06-12T10:00:00+07:00"
```

The countdown appears only when its section is enabled and the configured event date is in the future.

### 2. Images

Set `hero.image` or `theme.backgroundImage` to a relative image path (for example `assets/cover.jpg`) or a public URL. Place local image files in the repository and keep their paths accurate. For couple portraits, set each person's `photo` and `photoAlt`. For gallery entries, use this shape:

```js
gallery: [
    {
        src: "assets/moment-01.jpg",
        alt: "The couple walking together",
        caption: "A favourite memory"
    }
]
```

Use appropriately sized images and ensure you have permission to publish them.

### 3. Event details and schedule

- `venue.dateLabel` and `venue.timeLabel` are display labels.
- `venue.address` is an array so each address line is rendered separately.
- `venue.mapUrl` should be a complete HTTP or HTTPS link.
- `schedule` is an ordered array of `{ time, title, description }` objects.

### 4. Optional sections

Use `effects` to switch decorative details and animations on or off without editing CSS:

```js
effects: {
    decorations: true,
    animations: true,
    envelope: true
}
```

Animations respect the device's reduced-motion preference and fall back to visible content when IntersectionObserver is unavailable. The envelope intro can be disabled with `envelope: false`; visitors can also skip it at any time.

Use `sections` to enable or disable each major section without removing its markup:

```js
sections: {
    hero: true,
    countdown: true,
    couple: true,
    story: true,
    location: true,
    schedule: true,
    gallery: false,
    rsvp: false,
    gift: false
}
```

A section also stays hidden when it has no usable content. For example, the RSVP section needs a configured WhatsApp number.

### 5. RSVP via WhatsApp

Set `rsvp.whatsappNumber` to the destination's international phone number using digits, including the country code (for Indonesia, start with `62`, not `0`). The page opens WhatsApp with a prefilled RSVP message; the guest must still press Send. This static implementation does not verify attendance or save responses, and it does not send messages automatically.

If you need guest-specific invitation links, private guest lists, saved RSVP responses, exportable attendance lists, or an admin dashboard, that requires a backend and a separate scope decision.

### 6. Gift details

The gift section can display a bank name, account name, account number, and/or delivery address. Only configure and publish details that the couple explicitly wants to share.

## Design approach

This is an invitation microsite rather than a single card. The cover introduces the event, the page unfolds into the couple's story and practical details, and optional sections can be switched on as needed. The CSS provides a consistent visual foundation while `event-config.js` keeps the event-specific content separate.

## Current limitations

- Static files only; there is no database, admin panel, authentication, or CMS.
- RSVP is a WhatsApp handoff, not a saved submission.
- No guest-specific access control, analytics, or automated calendar invitation.
- No browser/mobile visual QA has been completed for this expanded version yet.

The decorative and motion enhancements are progressive: the page remains readable if JavaScript motion features are unavailable, and animations are skipped when the visitor prefers reduced motion. Before publishing, replace sample event details and complete desktop/mobile visual QA.

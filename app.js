(() => {
    const config = window.WEDDING_CONFIG || {};
    const sections = config.sections || {};
    const byId = (id) => document.getElementById(id);
    const setText = (id, value) => {
        const element = byId(id);
        if (element) element.textContent = value || "";
    };
    const setVisible = (id, visible) => {
        const element = byId(id);
        if (element) element.hidden = !visible;
    };
    const make = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined && text !== null) element.textContent = text;
        return element;
    };
    const validExternalUrl = (value) => {
        try {
            const url = new URL(value);
            return ["https:", "http:"].includes(url.protocol) ? url.href : "";
        } catch {
            return "";
        }
    };

    document.title = config.siteTitle || config.title || "Wedding Invitation";
    const description = document.querySelector('meta[name="description"]');
    if (description && config.metaDescription) description.content = config.metaDescription;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = config.metaDescription || config.subtitle || "";
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && config.hero?.image) ogImage.content = config.hero.image;
    setText("brand-names", config.coupleNames || "Our Wedding");
    setText("invitation-eyebrow", config.eyebrow);
    setText("invitation-title", config.title || "You're invited");
    setText("invitation-subtitle", config.subtitle);
    setText("couple-names", config.coupleNames);
    setText("event-date", config.date);
    setText("intro-message", config.intro);
    setText("footer-names", config.coupleNames);
    setText("invitation-footer", config.footer);

    const hero = config.hero || {};
    const heroImage = validExternalUrl(hero.image) || (hero.image && !hero.image.startsWith("javascript:") ? hero.image : "");
    const heroImageElement = document.querySelector(".hero-image");
    if (heroImageElement && heroImage) {
        heroImageElement.style.backgroundImage = 'url("' + heroImage.replace(/["\\\\]/g, "\\$&") + '")';
        heroImageElement.setAttribute("aria-label", hero.imageAlt || "Wedding image");
    }
    const heroAction = byId("hero-action");
    if (heroAction) {
        heroAction.textContent = hero.primaryActionLabel || "View Invitation";
        heroAction.href = /^#[a-z0-9_-]+$/i.test(hero.primaryActionTarget || "") ? hero.primaryActionTarget : "#couple";
    }
    setVisible("home", sections.hero !== false);
    document.body.classList.toggle("without-hero", sections.hero === false);

    const theme = config.theme || {};
    const root = document.documentElement;
    const themeProperties = {
        accentColor: "--accent-color",
        accentDark: "--accent-dark",
        paperColor: "--paper-color",
        backgroundColor: "--background-color",
        textColor: "--text-color"
    };
    Object.entries(themeProperties).forEach(([key, property]) => {
        if (theme[key]) root.style.setProperty(property, theme[key]);
    });
    if (theme.backgroundImage) {
        document.body.style.backgroundImage = 'linear-gradient(rgba(0,0,0,.68), rgba(0,0,0,.82)), url("' +
            theme.backgroundImage.replace(/["\\\\]/g, "\\$&") + '")';
    }

    const couple = config.couple || {};
    setText("couple-heading", couple.heading || "The Couple");
    setText("couple-description", couple.description);
    const coupleGrid = byId("couple");
    if (coupleGrid && Array.isArray(couple.people)) {
        coupleGrid.replaceChildren();
        couple.people.forEach((person) => {
            if (!person || !person.name) return;
            const article = make("article", "person");
            const portrait = make("div", "person-portrait");
            if (person.photo) {
                const image = make("img");
                image.src = person.photo;
                image.alt = person.photoAlt || person.name;
                image.loading = "lazy";
                image.addEventListener("error", () => image.remove(), { once: true });
                portrait.appendChild(image);
            } else {
                portrait.appendChild(make("span", "person-monogram", person.name.trim().charAt(0).toUpperCase()));
            }
            article.append(portrait, make("p", "person-role", person.role || ""), make("h3", "person-name", person.name));
            if (person.description) article.appendChild(make("p", "person-description", person.description));
            coupleGrid.appendChild(article);
        });
    }
    setVisible("couple-section", sections.couple !== false && !!coupleGrid?.children.length);
    setVisible("intro-message", !!config.intro);

    const story = config.story || {};
    setText("story-heading", story.heading || "Our Story");
    const storyContent = byId("story-content");
    if (storyContent) {
        storyContent.replaceChildren();
        (Array.isArray(story.paragraphs) ? story.paragraphs : []).filter(Boolean).forEach((paragraph) => {
            storyContent.appendChild(make("p", "", paragraph));
        });
    }
    setVisible("story-section", sections.story !== false && !!storyContent?.children.length);

    const venue = config.venue || {};
    setText("venue-date", venue.dateLabel || config.date);
    setText("venue-time", venue.timeLabel);
    setText("venue-name", venue.name);
    const address = byId("venue-address");
    if (address) {
        address.replaceChildren();
        (Array.isArray(venue.address) ? venue.address : []).filter(Boolean).forEach((line) => {
            address.appendChild(make("p", "", line));
        });
    }
    const mapLink = byId("map-link");
    const mapUrl = validExternalUrl(venue.mapUrl);
    if (mapLink && mapUrl) {
        mapLink.href = mapUrl;
        mapLink.hidden = false;
    }
    setVisible("location-section", sections.location !== false && !!(venue.name || venue.address?.length));

    const schedule = byId("schedule");
    if (schedule) {
        schedule.replaceChildren();
        (Array.isArray(config.schedule) ? config.schedule : []).forEach((item, index) => {
            if (!item || (!item.time && !item.title)) return;
            const row = make("article", "schedule-item");
            row.appendChild(make("span", "schedule-number", String(index + 1).padStart(2, "0")));
            const content = make("div", "schedule-copy");
            content.append(make("p", "schedule-time", item.time || ""), make("h3", "schedule-title", item.title || ""));
            if (item.description) content.appendChild(make("p", "schedule-description", item.description));
            row.appendChild(content);
            schedule.appendChild(row);
        });
    }
    setVisible("schedule-section", sections.schedule !== false && !!schedule?.children.length);

    const gallery = byId("gallery");
    if (gallery) {
        gallery.replaceChildren();
        (Array.isArray(config.gallery) ? config.gallery : []).forEach((item) => {
            if (!item || !item.src) return;
            const figure = make("figure", "gallery-item");
            const image = make("img");
            image.src = item.src;
            image.alt = item.alt || item.caption || "Wedding gallery image";
            image.loading = "lazy";
            image.addEventListener("error", () => figure.remove(), { once: true });
            figure.appendChild(image);
            if (item.caption) figure.appendChild(make("figcaption", "", item.caption));
            gallery.appendChild(figure);
        });
    }
    setVisible("gallery-section", sections.gallery !== false && !!gallery?.children.length);

    const rsvp = config.rsvp || {};
    setText("rsvp-heading", rsvp.heading || "Will You Join Us?");
    setText("rsvp-message", rsvp.message);
    setText("rsvp-deadline", rsvp.deadline ? "Kindly respond by " + rsvp.deadline + "." : "");
    const phone = String(rsvp.whatsappNumber || "").replace(/[^0-9]/g, "");
    const rsvpForm = byId("rsvp-form");
    const guestCountField = byId("guest-count-field");
    if (guestCountField) guestCountField.hidden = rsvp.allowGuestCount === false;
    const attendance = byId("guest-attendance");
    if (attendance && guestCountField) {
        attendance.addEventListener("change", () => {
            guestCountField.hidden = rsvp.allowGuestCount === false || attendance.value !== "Yes, I will attend";
        });
        guestCountField.hidden = true;
    }
    if (rsvpForm && phone) {
        rsvpForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(rsvpForm);
            const guestName = String(formData.get("guestName") || "").trim();
            const response = String(formData.get("attendance") || "");
            const guestCount = rsvp.allowGuestCount === false || response !== "Yes, I will attend"
                ? "Not applicable"
                : String(formData.get("guestCount") || "1");
            if (!guestName || !response) return;
            const message = [
                "Wedding RSVP",
                "Name: " + guestName,
                "Response: " + response,
                "Number of guests: " + guestCount,
                "Event: " + (config.coupleNames || "Wedding")
            ].join("\n");
            window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
        });
    } else {
        const note = byId("rsvp-note");
        if (note) note.textContent = "RSVP is not configured yet. Add a WhatsApp number in event-config.js.";
        if (rsvpForm) rsvpForm.addEventListener("submit", (event) => event.preventDefault());
    }
    setVisible("rsvp-section", sections.rsvp !== false && !!phone);

    const gift = config.gift || {};
    setText("gift-heading", gift.heading || "Wedding Gift");
    setText("gift-message", gift.message);
    const giftDetails = byId("gift-details");
    if (giftDetails) {
        giftDetails.replaceChildren();
        [
            ["Bank", gift.bankName],
            ["Account name", gift.accountName],
            ["Account number", gift.accountNumber],
            ["Delivery address", gift.address]
        ].forEach(([label, value]) => {
            if (!value) return;
            const item = make("div", "gift-detail");
            item.append(make("span", "gift-label", label), make("p", "gift-value", value));
            giftDetails.appendChild(item);
        });
    }
    setVisible("gift-section", sections.gift !== false && !!(gift.message || gift.bankName || gift.accountName || gift.accountNumber || gift.address));

    const countdownSection = byId("countdown-section");
    const countdown = byId("countdown");
    const eventTimestamp = Date.parse(config.eventDateISO || "");
    if (countdownSection && countdown && sections.countdown !== false && Number.isFinite(eventTimestamp) && eventTimestamp > Date.now()) {
        const units = [
            ["days", 86400000],
            ["hours", 3600000],
            ["minutes", 60000],
            ["seconds", 1000]
        ];
        const renderCountdown = () => {
            const remaining = eventTimestamp - Date.now();
            if (remaining <= 0) {
                countdown.replaceChildren(make("p", "countdown-complete", "Today is the day!"));
                window.clearInterval(countdownTimer);
                return;
            }
            let rest = remaining;
            countdown.replaceChildren();
            units.forEach(([label, size]) => {
                const value = Math.floor(rest / size);
                rest %= size;
                const unit = make("div", "countdown-unit");
                unit.append(make("span", "countdown-value", String(value).padStart(2, "0")), make("span", "countdown-label", label));
                countdown.appendChild(unit);
            });
        };
        let countdownTimer;
        renderCountdown();
        countdownTimer = window.setInterval(renderCountdown, 1000);
        setVisible("countdown-section", true);
    } else {
        setVisible("countdown-section", false);
    }

    const nav = byId("site-nav");
    if (nav) {
        nav.replaceChildren();
        [
            ["couple-section", "couple", "The Couple"],
            ["story-section", "story-section", "Our Story"],
            ["location-section", "location-section", "The Event"],
            ["schedule-section", "schedule-section", "Schedule"],
            ["gallery-section", "gallery-section", "Gallery"],
            ["rsvp-section", "rsvp-section", "RSVP"]
        ].forEach(([sectionId, targetId, label]) => {
            const section = byId(sectionId);
            if (!section || section.hidden) return;
            const link = make("a", "", label);
            link.href = "#" + targetId;
            nav.appendChild(link);
        });
    }
})();

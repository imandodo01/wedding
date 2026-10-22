(() => {
    const config = window.WEDDING_CONFIG || {};
    const byId = (id) => document.getElementById(id);
    const setText = (id, value) => {
        const element = byId(id);
        if (element) element.textContent = value || "";
    };
    const setVisible = (id, visible) => {
        const element = byId(id);
        if (element) element.hidden = !visible;
    };

    const names = config.coupleNames || "You're invited";
    document.title = config.siteTitle || config.title || "Wedding Invitation";
    setText("invitation-eyebrow", config.eyebrow);
    setText("invitation-title", config.title || "You're invited");
    setText("invitation-subtitle", config.subtitle);
    setText("event-date", config.date);
    setText("couple-names", names);
    setText("venue-name", config.venue && config.venue.name);

    const address = byId("venue-address");
    if (address && config.venue && Array.isArray(config.venue.address)) {
        address.replaceChildren();
        config.venue.address.forEach((line) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = line;
            address.appendChild(paragraph);
        });
    }

    const mapLink = byId("map-link");
    if (mapLink && config.venue && config.venue.mapUrl) {
        mapLink.href = config.venue.mapUrl;
        mapLink.hidden = false;
    }

    const message = byId("invitation-message");
    if (message && config.invitationMessage) {
        message.textContent = config.invitationMessage;
        message.hidden = false;
    }

    const schedule = byId("schedule");
    if (schedule && Array.isArray(config.schedule)) {
        config.schedule.forEach((item) => {
            const row = document.createElement("article");
            row.className = "schedule-item";
            const time = document.createElement("p");
            time.className = "time";
            time.textContent = item.time || "";
            const description = document.createElement("p");
            description.className = "description";
            description.textContent = item.title || "";
            row.append(time, description);
            schedule.appendChild(row);
        });
    }
    setVisible("schedule-section", config.sections?.schedule !== false && !!config.schedule?.length);
    setVisible("location-section", config.sections?.location !== false && !!config.venue);

    const gallery = byId("gallery");
    if (gallery && Array.isArray(config.gallery) && config.gallery.length) {
        config.gallery.forEach((item) => {
            if (!item || !item.src) return;
            const figure = document.createElement("figure");
            const image = document.createElement("img");
            image.src = item.src;
            image.alt = item.alt || "";
            image.loading = "lazy";
            figure.appendChild(image);
            if (item.caption) {
                const caption = document.createElement("figcaption");
                caption.textContent = item.caption;
                figure.appendChild(caption);
            }
            gallery.appendChild(figure);
        });
    }
    setVisible("gallery-section", config.sections?.gallery !== false && !!gallery?.children.length);
    setText("invitation-footer", config.footer);

    if (config.theme) {
        const root = document.documentElement;
        if (config.theme.accentColor) root.style.setProperty("--accent-color", config.theme.accentColor);
        if (config.theme.cardColor) root.style.setProperty("--card-color", config.theme.cardColor);
        if (config.theme.backgroundImage) {
            document.body.style.backgroundImage = `url("${config.theme.backgroundImage}")`;
        }
    }
})();

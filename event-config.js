/*
 * Change this file to reuse the invitation for another event.
 * Dates should use a readable display string for now. A machine-readable
 * date/time can be added later if countdowns or calendar links are needed.
 */
window.WEDDING_CONFIG = {
    siteTitle: "Wedding Invitation",
    eyebrow: "Save the Date",
    title: "We Are Getting Married",
    coupleNames: "IMAN & FITRI",
    date: "07 December 2024",
    invitationMessage: "",
    venue: {
        name: "Ikan Bakar 1000 Pulau Restaurant",
        address: [
            "Jl. Siliwangi No. 7J",
            "Kec. Pancoran Mas, Kota Depok",
            "Jawa Barat"
        ],
        mapUrl: "https://maps.app.goo.gl/XoEKL4M8hwoFuZyXA"
    },
    schedule: [
        { time: "12.00 PM", title: "Akad Nikah" },
        {
            time: "13.00 PM",
            title: "Lunch, Messages to the Bride & Groom, Sharing happiness."
        }
    ],
    gallery: [],
    footer: "",
    theme: {
        backgroundImage: "wedding-bg.png",
        accentColor: "#0044ad",
        cardColor: "#f1ede4"
    },
    sections: {
        location: true,
        schedule: true,
        gallery: false
    }
};

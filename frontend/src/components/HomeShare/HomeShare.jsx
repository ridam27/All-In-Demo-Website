import {
    FaAddressCard,
    FaBriefcase,
    FaFileLines,
    FaGithub,
    FaGlobe,
    FaInstagram,
    FaLinkedinIn,
    FaPhone,
    FaWhatsapp,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

import { FaEnvelope, FaLink } from "react-icons/fa";

import "./HomeShare.css";

const shareItems = [
    {
        label: "Contact",
        description: "Phone, email and WhatsApp in one place.",
        icon: FaAddressCard,
    },
    {
        label: "Phone",
        description: "Let visitors start a call instantly.",
        icon: FaPhone,
    },
    {
        label: "Email",
        description: "Open a new email with one tap.",
        icon: FaEnvelope,
    },
    {
        label: "WhatsApp",
        description: "Start a direct conversation immediately.",
        icon: FaWhatsapp,
    },
    {
        label: "LinkedIn",
        description: "Share your complete professional presence.",
        icon: FaLinkedinIn,
    },
    {
        label: "GitHub",
        description: "Show your projects and source code.",
        icon: FaGithub,
    },
    {
        label: "Portfolio",
        description: "Present your best work without extra navigation.",
        icon: FaBriefcase,
    },
    {
        label: "Resume",
        description: "Keep your latest resume one tap away.",
        icon: FaFileLines,
    },
    {
        label: "Website",
        description: "Send visitors directly to your website.",
        icon: FaGlobe,
    },
    {
        label: "Instagram",
        description: "Share your photos, updates and creative work.",
        icon: FaInstagram,
    },
    {
        label: "YouTube",
        description: "Highlight your videos and long-form content.",
        icon: FaYoutube,
    },
    {
        label: "X",
        description: "Connect visitors with your latest posts.",
        icon: FaXTwitter,
    },
    {
        label: "Custom links",
        description: "Add any platform or resource that matters.",
        icon: FaLink,
    },
];

export default function HomeShare() {
    return (
        <section
            className="home-share"
            aria-labelledby="home-share-title"
        >
            <div className="home-share__background" aria-hidden="true">
                <div className="home-share__glow" />
                <div className="home-share__line" />
            </div>

            <div className="home-section home-share__inner">
                <header className="home-share__header">
                    <div>
                        <span className="home-section__eyebrow">
                            Everything in one place
                        </span>

                        <h2 id="home-share-title">
                            Share what matters.
                            <span>Nothing more.</span>
                        </h2>
                    </div>

                    <p>
                        Your profile only shows the information you choose to add.
                        Empty fields remain hidden, keeping every profile clean,
                        focused and personal.
                    </p>
                </header>

                <div className="home-share__list">
                    {shareItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.label}
                                className="home-share__row"
                            >
                                <span className="home-share__number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span
                                    className="home-share__icon"
                                    aria-hidden="true"
                                >
                                    <Icon />
                                </span>

                                <div className="home-share__content">
                                    <h3>{item.label}</h3>
                                    <p>{item.description}</p>
                                </div>

                                <span
                                    className="home-share__arrow"
                                    aria-hidden="true"
                                >
                                    ↗
                                </span>
                            </article>
                        );
                    })}
                </div>

                <div className="home-share__closing">
                    <span className="home-share__closing-line" />

                    <p>
                        One profile can represent a student, developer, creator,
                        freelancer, founder or business—without changing the card.
                    </p>
                </div>
            </div>
        </section>
    );
}
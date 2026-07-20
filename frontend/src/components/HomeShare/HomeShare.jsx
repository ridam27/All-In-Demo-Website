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

import {
    FaEnvelope,
    FaLink,
} from "react-icons/fa";

import "./HomeShare.css";

const shareItems = [
    {
        label: "Contact",
        description: "Phone, email and WhatsApp",
        icon: FaAddressCard,
    },
    {
        label: "Phone",
        description: "Start a call instantly",
        icon: FaPhone,
    },
    {
        label: "Email",
        description: "Open a new email",
        icon: FaEnvelope,
    },
    {
        label: "WhatsApp",
        description: "Start a direct conversation",
        icon: FaWhatsapp,
    },
    {
        label: "LinkedIn",
        description: "Professional identity",
        icon: FaLinkedinIn,
    },
    {
        label: "GitHub",
        description: "Projects and source code",
        icon: FaGithub,
    },
    {
        label: "Portfolio",
        description: "Showcase your best work",
        icon: FaBriefcase,
    },
    {
        label: "Resume",
        description: "Share your latest resume",
        icon: FaFileLines,
    },
    {
        label: "Website",
        description: "Open your personal website",
        icon: FaGlobe,
    },
    {
        label: "Instagram",
        description: "Photos and updates",
        icon: FaInstagram,
    },
    {
        label: "YouTube",
        description: "Videos and content",
        icon: FaYoutube,
    },
    {
        label: "X",
        description: "Posts and conversations",
        icon: FaXTwitter,
    },
    {
        label: "Custom links",
        description: "Add anything important",
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
                <div className="home-share__grid" />
            </div>

            <div className="home-section home-share__inner">
                <header className="home-share__header">
                    <div>
                        <span className="home-section__eyebrow">
                            Everything in one place
                        </span>

                        <h2 id="home-share-title">
                            Share what matters.
                            <span>Hide what doesn’t.</span>
                        </h2>
                    </div>

                    <p>
                        Every profile adapts to the information you add. Empty fields stay
                        hidden, so the final experience always feels clean and intentional.
                    </p>
                </header>

                <div className="home-share__grid-list">
                    {shareItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.label}
                                className="home-share__item"
                                style={{
                                    "--share-delay": `${index * 45}ms`,
                                }}
                            >
                                <div className="home-share__item-top">
                                    <span className="home-share__icon">
                                        <Icon aria-hidden="true" />
                                    </span>

                                    <span className="home-share__index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="home-share__item-content">
                                    <h3>{item.label}</h3>
                                    <p>{item.description}</p>
                                </div>

                                <span
                                    className="home-share__item-accent"
                                    aria-hidden="true"
                                />
                            </article>
                        );
                    })}
                </div>

                <div className="home-share__note">
                    <span className="home-share__note-mark" aria-hidden="true" />

                    <div>
                        <strong>Built around your identity.</strong>
                        <p>
                            A student, developer, creator, freelancer or business owner can
                            share a completely different profile using the same All In Card.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
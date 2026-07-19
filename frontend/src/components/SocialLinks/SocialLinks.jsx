import {
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

import "./SocialLinks.css";

const platforms = {
    linkedin: {
        label: "LinkedIn",
        description: "Professional profile",
        icon: FaLinkedinIn,
    },
    github: {
        label: "GitHub",
        description: "Projects and source code",
        icon: FaGithub,
    },
    instagram: {
        label: "Instagram",
        description: "Photos and updates",
        icon: FaInstagram,
    },
};

export default function SocialLinks({ socialLinks }) {
    const links = Object.entries(socialLinks || {})
        .filter(([platform, url]) => platforms[platform] && url)
        .map(([platform, url]) => ({
            platform,
            url,
            ...platforms[platform],
        }));

    if (!links.length) {
        return null;
    }

    return (
        <section className="links-section">
            <div className="links-section__header">
                <span>Connect</span>
                <p>Find me online</p>
            </div>

            <div className="profile-links">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-link"
                            aria-label={`Open ${link.label}`}
                        >
                            <span className="profile-link__icon">
                                <Icon />
                            </span>

                            <span className="profile-link__content">
                                <strong>{link.label}</strong>
                                <small>{link.description}</small>
                            </span>

                            <span className="profile-link__arrow" aria-hidden="true">
                                ↗
                            </span>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
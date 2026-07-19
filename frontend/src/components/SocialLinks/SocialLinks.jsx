import {
    FaGithub,
    FaGlobe,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

import "./SocialLinks.css";

const PLATFORM_CONFIG = {
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

    x: {
        label: "X",
        description: "Latest posts and updates",
        icon: FaXTwitter,
    },

    youtube: {
        label: "YouTube",
        description: "Videos and content",
        icon: FaYoutube,
    },

    website: {
        label: "Website",
        description: "Official website",
        icon: FaGlobe,
    },
};

const DEFAULT_PLATFORM = {
    label: "Visit Link",
    description: "Open external profile",
    icon: FaGlobe,
};

function normalizeLinks(socialLinks) {
    if (!socialLinks) {
        return [];
    }

    /*
      Future array format:
  
      [
        {
          platform: "linkedin",
          url: "https://...",
          label: "LinkedIn",
          description: "Professional profile"
        }
      ]
    */
    if (Array.isArray(socialLinks)) {
        return socialLinks
            .filter((link) => {
                return (
                    link &&
                    typeof link.url === "string" &&
                    link.url.trim() !== ""
                );
            })
            .map((link) => {
                const platformKey = String(link.platform || "")
                    .trim()
                    .toLowerCase();

                const config =
                    PLATFORM_CONFIG[platformKey] || DEFAULT_PLATFORM;

                return {
                    platform: platformKey || "custom",
                    url: link.url.trim(),
                    label: link.label?.trim() || config.label,
                    description:
                        link.description?.trim() || config.description,
                    icon: config.icon,
                };
            });
    }

    /*
      Current object format:
  
      {
        linkedin: "https://...",
        github: "https://...",
        instagram: null
      }
    */
    if (typeof socialLinks === "object") {
        return Object.entries(socialLinks)
            .filter(([platform, url]) => {
                return (
                    PLATFORM_CONFIG[platform] &&
                    typeof url === "string" &&
                    url.trim() !== ""
                );
            })
            .map(([platform, url]) => ({
                platform,
                url: url.trim(),
                ...PLATFORM_CONFIG[platform],
            }));
    }

    return [];
}

export default function SocialLinks({ socialLinks }) {
    const links = normalizeLinks(socialLinks);

    if (links.length === 0) {
        return null;
    }

    return (
        <section
            className="links-section"
            aria-labelledby="social-links-heading"
        >
            <div className="links-section__header">
                <span id="social-links-heading">Connect</span>
                <p>Find me online</p>
            </div>

            <div className="profile-links">
                {links.map((link, index) => {
                    const Icon = link.icon;

                    return (
                        <a
                            key={`${link.platform}-${link.url}-${index}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-link"
                            aria-label={`Open ${link.label}`}
                        >
                            <span
                                className="profile-link__icon"
                                aria-hidden="true"
                            >
                                <Icon />
                            </span>

                            <span className="profile-link__content">
                                <strong>{link.label}</strong>
                                <small>{link.description}</small>
                            </span>

                            <span
                                className="profile-link__arrow"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
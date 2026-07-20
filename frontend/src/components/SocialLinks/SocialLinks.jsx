import { FaGlobe } from "react-icons/fa6";

import { SOCIAL_PLATFORMS } from "@/constants/socialPlatforms";

import "./SocialLinks.css";

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
            .map((link, index) => {
                const platformKey = String(link.platform || "")
                    .trim()
                    .toLowerCase();

                const config =
                    SOCIAL_PLATFORMS[platformKey] || DEFAULT_PLATFORM;

                return {
                    id:
                        link.id ||
                        `${platformKey || "custom"}-${link.url.trim()}-${index}`,
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
      Current backend object format:
  
      {
        linkedin: "https://...",
        github: "https://...",
        instagram: null,
        x: "",
        youtube: "https://...",
        website: "https://..."
      }
    */
    if (typeof socialLinks === "object") {
        return Object.entries(socialLinks)
            .filter(([platform, url]) => {
                return (
                    SOCIAL_PLATFORMS[platform] &&
                    typeof url === "string" &&
                    url.trim() !== ""
                );
            })
            .map(([platform, url]) => ({
                id: platform,
                platform,
                url: url.trim(),
                ...SOCIAL_PLATFORMS[platform],
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
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <a
                            key={link.id}
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
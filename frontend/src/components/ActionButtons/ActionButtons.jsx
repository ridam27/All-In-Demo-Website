import {
    FaEnvelope,
    FaPhoneAlt,
    FaWhatsapp,
} from "react-icons/fa";

import "./ActionButtons.css";

export default function ActionButtons({ profile }) {
    const actions = [
        {
            label: "Call",
            href: `tel:${profile.phone}`,
            icon: FaPhoneAlt,
        },
        {
            label: "Email",
            href: `mailto:${profile.email}`,
            icon: FaEnvelope,
        },
        {
            label: "WhatsApp",
            href: `https://wa.me/${profile.whatsapp}`,
            icon: FaWhatsapp,
            external: true,
        },
    ];

    return (
        <nav className="quick-actions" aria-label="Contact actions">
            {actions.map((action) => {
                const Icon = action.icon;

                return (
                    <a
                        key={action.label}
                        href={action.href}
                        target={action.external ? "_blank" : undefined}
                        rel={action.external ? "noopener noreferrer" : undefined}
                        className="quick-action"
                        aria-label={`${action.label} ${profile.fullName}`}
                        title={action.label}
                    >
                        <Icon />
                        <span>{action.label}</span>
                    </a>
                );
            })}
        </nav>
    );
}
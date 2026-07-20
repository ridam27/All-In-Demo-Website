import Link from "next/link";
import {
    FaEnvelope,
    FaGithub,
    FaLinkedinIn,
    FaPhone,
    FaWhatsapp,
} from "react-icons/fa6";

import "./HomePreview.css";

const profileLinks = [
    {
        label: "Call",
        icon: FaPhone,
    },
    {
        label: "Email",
        icon: FaEnvelope,
    },
    {
        label: "WhatsApp",
        icon: FaWhatsapp,
    },
];

const socialLinks = [
    {
        label: "LinkedIn",
        description: "Professional profile",
        icon: FaLinkedinIn,
    },
    {
        label: "GitHub",
        description: "Projects and source code",
        icon: FaGithub,
    },
];

export default function HomePreview() {
    return (
        <section
            className="home-preview"
            aria-labelledby="home-preview-title"
        >
            <div className="home-preview__background" aria-hidden="true">
                <div className="home-preview__glow home-preview__glow--one" />
                <div className="home-preview__glow home-preview__glow--two" />
                <div className="home-preview__ring" />
            </div>

            <div className="home-section home-preview__layout">
                <div className="home-preview__content">
                    <span className="home-section__eyebrow">
                        Your profile, instantly
                    </span>

                    <h2 id="home-preview-title">
                        More than a link.
                        <span>A complete digital identity.</span>
                    </h2>

                    <p>
                        Every All In profile brings together your contact details,
                        professional identity and online presence in one polished,
                        mobile-first experience.
                    </p>

                    <div className="home-preview__points">
                        <div>
                            <span>01</span>

                            <div>
                                <strong>Built for first impressions</strong>
                                <p>
                                    A clean, elegant profile that feels professional from the
                                    moment it opens.
                                </p>
                            </div>
                        </div>

                        <div>
                            <span>02</span>

                            <div>
                                <strong>Everything in one place</strong>
                                <p>
                                    Contact details, social links, portfolio and resume without
                                    unnecessary navigation.
                                </p>
                            </div>
                        </div>

                        <div>
                            <span>03</span>

                            <div>
                                <strong>Always up to date</strong>
                                <p>
                                    Edit your information once and every NFC card continues to
                                    open the latest version.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link href="/ridam27" className="home-preview__button">
                        Open complete demo profile
                        <span aria-hidden="true">↗</span>
                    </Link>
                </div>

                <div className="home-preview__visual">
                    <div className="home-preview__orbit" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>

                    <article className="home-preview__phone">
                        <div className="home-preview__phone-frame">
                            <div className="home-preview__phone-speaker" />

                            <div className="home-preview__screen">
                                <div className="home-preview__banner">
                                    <div className="home-preview__banner-grid" />

                                    <span className="home-preview__theme-icon" />
                                </div>

                                <div className="home-preview__profile-head">
                                    <div className="home-preview__avatar">
                                        <span>RS</span>
                                    </div>

                                    <div className="home-preview__powered">
                                        <small>Powered by</small>
                                        <strong>ALL IN</strong>
                                    </div>
                                </div>

                                <div className="home-preview__identity">
                                    <span>@ridam27</span>

                                    <h3>Ridam Satkar</h3>

                                    <p>Full Stack Developer</p>

                                    <small>
                                        Building modern, responsive and secure digital products.
                                    </small>
                                </div>

                                <div className="home-preview__actions">
                                    {profileLinks.map((link) => {
                                        const Icon = link.icon;

                                        return (
                                            <div key={link.label}>
                                                <Icon aria-hidden="true" />
                                                <span>{link.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="home-preview__save-contact">
                                    <span className="home-preview__save-icon">
                                        +
                                    </span>

                                    <div>
                                        <strong>Save Contact</strong>
                                        <small>Add directly to your phone</small>
                                    </div>

                                    <span aria-hidden="true">↗</span>
                                </div>

                                <div className="home-preview__socials">
                                    <div className="home-preview__social-heading">
                                        <strong>Connect</strong>
                                        <span>Find me online</span>
                                    </div>

                                    {socialLinks.map((link) => {
                                        const Icon = link.icon;

                                        return (
                                            <div
                                                key={link.label}
                                                className="home-preview__social-link"
                                            >
                                                <span>
                                                    <Icon aria-hidden="true" />
                                                </span>

                                                <div>
                                                    <strong>{link.label}</strong>
                                                    <small>{link.description}</small>
                                                </div>

                                                <span aria-hidden="true">↗</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="home-preview__floating-card home-preview__floating-card--top">
                        <span className="home-preview__floating-icon">
                            <FaWhatsapp aria-hidden="true" />
                        </span>

                        <div>
                            <strong>Instant connection</strong>
                            <small>One tap away</small>
                        </div>
                    </div>

                    <div className="home-preview__floating-card home-preview__floating-card--bottom">
                        <span className="home-preview__floating-check">
                            ✓
                        </span>

                        <div>
                            <strong>Contact saved</strong>
                            <small>Always up to date</small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
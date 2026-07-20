import Link from "next/link";
import Image from "next/image";
import {
    FaArrowRight,
    FaShieldHalved,
    FaWifi,
} from "react-icons/fa6";

import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

import "./HomeHero.css";

export default function HomeHero() {
    return (
        <section className="home-hero">
            <div className="home-hero__background" aria-hidden="true">
                <div className="home-hero__grid" />
                <div className="home-hero__glow home-hero__glow--one" />
                <div className="home-hero__glow home-hero__glow--two" />
                <div className="home-hero__ring home-hero__ring--one" />
                <div className="home-hero__ring home-hero__ring--two" />
            </div>

            <div className="home-hero__theme">
                <ThemeToggle />
            </div>

            <div className="home-section home-hero__layout">
                <div className="home-hero__content">
                    <div className="home-hero__brand">
                        <Image
                            src="/brand/logo-light.svg"
                            alt="All In Cards"
                            width={122}
                            height={42}
                            priority
                            className="home-hero__logo home-hero__logo--light"
                        />

                        <Image
                            src="/brand/logo-dark.svg"
                            alt="All In Cards"
                            width={122}
                            height={42}
                            priority
                            className="home-hero__logo home-hero__logo--dark"
                        />
                    </div>

                    <span className="home-section__eyebrow">
                        Your identity, simplified
                    </span>

                    <h1>
                        One tap.
                        <span>One identity.</span>
                    </h1>

                    <p className="home-hero__description">
                        Share your complete professional profile, contact details and
                        social presence instantly through one elegant NFC card.
                    </p>

                    <div className="home-hero__actions">
                        <Link
                            href="/ridam27"
                            className="home-hero__button home-hero__button--primary"
                        >
                            <span>Try live demo</span>
                            <FaArrowRight aria-hidden="true" />
                        </Link>

                        <Link
                            href="/admin"
                            className="home-hero__button home-hero__button--secondary"
                        >
                            Admin panel
                        </Link>
                    </div>

                    <div className="home-hero__trust">
                        <div>
                            <FaWifi aria-hidden="true" />
                            <span>NFC enabled</span>
                        </div>

                        <div>
                            <FaShieldHalved aria-hidden="true" />
                            <span>Secure profile sharing</span>
                        </div>
                    </div>
                </div>

                <div className="home-hero__visual" aria-label="All In NFC card preview">
                    <div className="home-hero__card-glow" aria-hidden="true" />

                    <div className="home-hero__card-stage">
                        <div className="home-hero__card-shadow" aria-hidden="true" />

                        <article className="home-hero__card">
                            <div className="home-hero__card-top">
                                <Image
                                    src="/brand/logo-dark.svg"
                                    alt="All In Cards"
                                    width={100}
                                    height={34}
                                    className="home-hero__card-logo"
                                />

                                <FaWifi
                                    className="home-hero__nfc-icon"
                                    aria-label="NFC enabled"
                                />
                            </div>

                            <div className="home-hero__card-middle">
                                <span className="home-hero__card-label">
                                    Digital identity card
                                </span>

                                <strong>Tap. Connect. Remember.</strong>
                            </div>

                            <div className="home-hero__card-bottom">
                                <span>ALL IN</span>
                                <span className="home-hero__card-dot" />
                            </div>
                        </article>

                        <div className="home-hero__tap-indicator" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>

                    <div className="home-hero__mini-profile">
                        <div className="home-hero__mini-avatar">
                            <span>RS</span>
                        </div>

                        <div>
                            <strong>Ridam Satkar</strong>
                            <small>Full Stack Developer</small>
                        </div>

                        <span className="home-hero__mini-status" />
                    </div>
                </div>
            </div>

            <a
                href="#nfc-experience"
                className="home-hero__scroll"
                aria-label="Scroll to see how it works"
            >
                <span />
                Explore the experience
            </a>
        </section>
    );
}
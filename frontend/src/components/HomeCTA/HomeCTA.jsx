import Link from "next/link";
import { FaArrowRight, FaNfcSymbol } from "react-icons/fa6";

import "./HomeCTA.css";

export default function HomeCTA() {
    return (
        <section
            className="home-cta"
            aria-labelledby="home-cta-title"
        >
            <div className="home-cta__background" aria-hidden="true">
                <div className="home-cta__grid" />
                <div className="home-cta__glow home-cta__glow--one" />
                <div className="home-cta__glow home-cta__glow--two" />
                <div className="home-cta__ring home-cta__ring--one" />
                <div className="home-cta__ring home-cta__ring--two" />
            </div>

            <div className="home-section home-cta__inner">
                <div className="home-cta__icon" aria-hidden="true">
                    <FaNfcSymbol />
                </div>

                <span className="home-section__eyebrow">
                    Experience All In
                </span>

                <h2 id="home-cta-title">
                    Make your first impression
                    <span>before you say a word.</span>
                </h2>

                <p>
                    Open the live demo and experience how one NFC tap can turn into a
                    complete, polished and memorable digital introduction.
                </p>

                <div className="home-cta__actions">
                    <Link
                        href="/ridam27"
                        className="home-cta__button home-cta__button--primary"
                    >
                        <span>Open demo profile</span>
                        <FaArrowRight aria-hidden="true" />
                    </Link>

                    <Link
                        href="/admin"
                        className="home-cta__button home-cta__button--secondary"
                    >
                        Admin panel
                    </Link>
                </div>

                <div className="home-cta__meta">
                    <span>No app required</span>
                    <span aria-hidden="true">•</span>
                    <span>Works through a browser</span>
                    <span aria-hidden="true">•</span>
                    <span>Designed for mobile</span>
                </div>
            </div>
        </section>
    );
}
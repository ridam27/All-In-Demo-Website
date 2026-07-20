import {
    FaAddressCard,
    FaCheck,
    FaMobileScreenButton,
    FaNfcSymbol,
    FaWifi,
} from "react-icons/fa6";

import "./HomeNFC.css";

const steps = [
    {
        number: "01",
        title: "Tap the card",
        description: "Bring the NFC card close to any compatible smartphone.",
        icon: FaNfcSymbol,
    },
    {
        number: "02",
        title: "Open instantly",
        description: "The phone opens the linked digital profile in the browser.",
        icon: FaMobileScreenButton,
    },
    {
        number: "03",
        title: "Connect",
        description: "Save the contact, call, message or open any shared profile.",
        icon: FaAddressCard,
    },
];

export default function HomeNFC() {
    return (
        <section
            id="nfc-experience"
            className="home-nfc"
            aria-labelledby="home-nfc-title"
        >
            <div className="home-nfc__background" aria-hidden="true">
                <div className="home-nfc__glow home-nfc__glow--one" />
                <div className="home-nfc__glow home-nfc__glow--two" />
                <div className="home-nfc__lines" />
            </div>

            <div className="home-section home-nfc__inner">
                <header className="home-nfc__header">
                    <span className="home-section__eyebrow">
                        How it works
                    </span>

                    <h2 id="home-nfc-title">
                        From a physical card
                        <span>to your complete identity.</span>
                    </h2>

                    <p>
                        No app installation. No complicated setup. Just one tap that opens
                        a complete digital profile within seconds.
                    </p>
                </header>

                <div className="home-nfc__experience">
                    <div
                        className="home-nfc__visual"
                        aria-label="Illustration showing an NFC card opening a digital profile on a phone"
                    >
                        <div className="home-nfc__card-area">
                            <article className="home-nfc__card">
                                <div className="home-nfc__card-head">
                                    <span className="home-nfc__card-brand">
                                        ALL IN
                                    </span>

                                    <FaWifi
                                        className="home-nfc__card-nfc"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="home-nfc__card-copy">
                                    <small>Digital identity card</small>
                                    <strong>
                                        One tap.
                                        <span>Everything about you.</span>
                                    </strong>
                                </div>

                                <div className="home-nfc__card-foot">
                                    <span>NFC</span>
                                    <span className="home-nfc__card-accent" />
                                </div>
                            </article>

                            <div className="home-nfc__signal" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        <div className="home-nfc__connection" aria-hidden="true">
                            <span className="home-nfc__connection-line" />
                            <span className="home-nfc__connection-dot">
                                <FaNfcSymbol />
                            </span>
                            <span className="home-nfc__connection-line" />
                        </div>

                        <div className="home-nfc__phone-area">
                            <div className="home-nfc__phone">
                                <div className="home-nfc__phone-speaker" />

                                <div className="home-nfc__phone-screen">
                                    <div className="home-nfc__phone-banner">
                                        <span className="home-nfc__phone-theme" />
                                    </div>

                                    <div className="home-nfc__phone-avatar">
                                        RS
                                    </div>

                                    <div className="home-nfc__phone-profile">
                                        <span>@ridam27</span>
                                        <strong>Ridam Satkar</strong>
                                        <small>Full Stack Developer</small>
                                    </div>

                                    <div className="home-nfc__phone-actions">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    <div className="home-nfc__phone-save">
                                        <FaCheck aria-hidden="true" />
                                        <span>Save Contact</span>
                                    </div>
                                </div>
                            </div>

                            <div className="home-nfc__success">
                                <span className="home-nfc__success-icon">
                                    <FaCheck aria-hidden="true" />
                                </span>

                                <div>
                                    <strong>Profile opened</strong>
                                    <small>Ready to connect</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="home-nfc__steps">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.number}
                                    className="home-nfc__step"
                                >
                                    <div className="home-nfc__step-top">
                                        <span className="home-nfc__step-number">
                                            {step.number}
                                        </span>

                                        <span className="home-nfc__step-icon">
                                            <Icon aria-hidden="true" />
                                        </span>
                                    </div>

                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
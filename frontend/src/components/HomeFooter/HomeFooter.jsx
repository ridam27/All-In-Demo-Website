import Image from "next/image";
import Link from "next/link";

import "./HomeFooter.css";

export default function HomeFooter() {
    return (
        <footer className="home-footer">
            <div className="home-section home-footer__inner">

                <div className="home-footer__brand">

                    <Image
                        src="/brand/logo-light.svg"
                        alt="All In Cards"
                        width={170}
                        height={52}
                        className="home-footer__logo home-footer__logo--light"
                    />

                    <Image
                        src="/brand/logo-dark.svg"
                        alt="All In Cards"
                        width={170}
                        height={52}
                        className="home-footer__logo home-footer__logo--dark"
                    />

                    <p>
                        Modern NFC powered digital identities built for
                        professionals, creators and businesses.
                    </p>

                </div>

                <div className="home-footer__links">

                    <Link href="/">
                        Home
                    </Link>

                    <Link href="/ridam27">
                        Demo
                    </Link>

                    <Link href="/admin">
                        Admin
                    </Link>

                </div>

            </div>

            <div className="home-section home-footer__bottom">

                <span>
                    © {new Date().getFullYear()} All In Cards
                </span>

                <span className="home-footer__divider" />

                <span>
                    One Tap. One Identity.
                </span>

                <span className="home-footer__divider" />

                <span>
                    Made with ❤ in India
                </span>

            </div>
        </footer>
    );
}
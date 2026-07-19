import Image from "next/image";

import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

import "./ProfileHero.css";

export default function ProfileHero({ profile }) {
    const bannerStyle = profile.bannerImage
        ? {
            backgroundImage: `
          linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.08),
            hsl(0 0% 0% / 0.5)
          ),
          url("${profile.bannerImage}")
        `,
        }
        : undefined;

    return (
        <header className="profile-hero">
            <div
                className="profile-hero__banner"
                style={bannerStyle}
            >
                <div className="profile-hero__banner-grid" />

                <div className="profile-hero__theme">
                    <ThemeToggle />
                </div>
            </div>

            <div className="profile-hero__body">
                <div className="profile-hero__top-row">
                    <div className="profile-hero__avatar-wrapper">
                        <div className="profile-hero__avatar-border">
                            <Image
                                src={profile.profilePhoto}
                                alt={`${profile.fullName}'s profile photo`}
                                width={152}
                                height={152}
                                priority
                                className="profile-hero__avatar"
                            />
                        </div>

                        <span
                            className="profile-hero__status"
                            aria-label="Profile active"
                            title="Profile active"
                        />
                    </div>

                    <div className="profile-hero__powered">
                        <span>Powered by</span>

                        <img
                            src="/brand/logo-light.svg"
                            alt="All In Cards"
                            className="
                            profile-hero__powered-logo
                            profile-hero__powered-logo--light
                            "
                        />

                        <img
                            src="/brand/logo-dark.svg"
                            alt="All In Cards"
                            className="
                            profile-hero__powered-logo
                            profile-hero__powered-logo--dark
                            "
                        />
                    </div>
                </div>

                <div className="profile-hero__identity">
                    <span className="profile-hero__username">
                        @{profile.username}
                    </span>

                    <h1>{profile.fullName}</h1>

                    <p className="profile-hero__title">
                        {profile.professionalTitle}
                    </p>

                    <p className="profile-hero__bio">
                        {profile.bio}
                    </p>
                </div>
            </div>
        </header>
    );
}
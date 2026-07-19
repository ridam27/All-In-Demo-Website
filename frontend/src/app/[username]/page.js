import { notFound } from "next/navigation";

import ActionButtons from "@/components/ActionButtons/ActionButtons";
import ProfileHero from "@/components/ProfileHero/ProfileHero";
import SaveContact from "@/components/SaveContact/SaveContact";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { getProfile } from "@/services/profileService";

import "./profile.css";

export default async function ProfilePage({ params }) {
    const { username } = await params;

    const profile = await getProfile(username);

    if (!profile) {
        notFound();
    }

    return (
        <main className="profile-page">
            <article className="profile-container">
                <ProfileHero profile={profile} />

                <div className="profile-content">
                    <div className="profile-primary-actions">
                        <SaveContact
                            username={profile.username}
                            fullName={profile.fullName}
                        />

                        <ActionButtons profile={profile} />
                    </div>

                    <SocialLinks socialLinks={profile.socialLinks} />

                    <footer className="profile-footer">
                        <div className="profile-footer__brand">
                            <img
                                src="/brand/logo-light.svg"
                                alt="All In Cards"
                                className="profile-footer__logo profile-footer__logo--light"
                            />

                            <img
                                src="/brand/logo-dark.svg"
                                alt="All In Cards"
                                className="profile-footer__logo profile-footer__logo--dark"
                            />
                        </div>

                        <div className="profile-footer__tagline">
                            <span>One tap.</span>
                            <strong>One identity.</strong>
                        </div>

                        <span
                            className="profile-footer__accent"
                            aria-hidden="true"
                        />
                    </footer>
                </div>
            </article>
        </main>
    );
}
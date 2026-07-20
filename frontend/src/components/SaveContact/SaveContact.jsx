import { FaAddressCard } from "react-icons/fa";

import { getContactDownloadUrl } from "@/services/profileService";

import "./SaveContact.css";

export default function SaveContact({ username, fullName }) {
    const contactUrl = getContactDownloadUrl(username);

    return (
        <a
            href={contactUrl}
            className="save-contact"
            aria-label={`Save ${fullName} to contacts`}
        >
            <span className="save-contact__icon">
                <FaAddressCard />
            </span>

            <span className="save-contact__content">
                <strong>Save Contact</strong>
                <small>Add directly to your phone</small>
            </span>

            <span className="save-contact__arrow" aria-hidden="true">
                ↗
            </span>
        </a>
    );
}
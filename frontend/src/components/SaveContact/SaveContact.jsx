import { FaAddressCard } from "react-icons/fa";

import "./SaveContact.css";

export default function SaveContact({ username, fullName }) {
    return (
        <a
            href={`/contacts/${username}.vcf`}
            download
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
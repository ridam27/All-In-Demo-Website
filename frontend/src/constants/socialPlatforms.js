import {
    FaEnvelope,
    FaGithub,
    FaGlobe,
    FaInstagram,
    FaLinkedinIn,
    FaPhone,
    FaWhatsapp,
    FaYoutube,
    FaXTwitter,
} from "react-icons/fa6";

export const SOCIAL_PLATFORMS = {

    phone: {
        label: "Phone",
        description: "Call directly",
        icon: FaPhone,
    },

    email: {
        label: "Email",
        description: "Send an email",
        icon: FaEnvelope,
    },

    whatsapp: {
        label: "WhatsApp",
        description: "Start a conversation",
        icon: FaWhatsapp,
    },

    linkedin: {
        label: "LinkedIn",
        description: "Professional profile",
        icon: FaLinkedinIn,
    },

    github: {
        label: "GitHub",
        description: "Projects & source code",
        icon: FaGithub,
    },

    website: {
        label: "Website",
        description: "Visit website",
        icon: FaGlobe,
    },

    instagram: {
        label: "Instagram",
        description: "Photos & updates",
        icon: FaInstagram,
    },

    youtube: {
        label: "YouTube",
        description: "Videos & content",
        icon: FaYoutube,
    },

    x: {
        label: "X",
        description: "Posts & updates",
        icon: FaXTwitter,
    },

};
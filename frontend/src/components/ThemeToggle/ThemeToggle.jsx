"use client";

import { useEffect, useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

import "./ThemeToggle.css";

const THEME_STORAGE_KEY = "all-in-theme";
const THEME_OPTIONS = ["system", "light", "dark"];

const themeDetails = {
    system: {
        label: "System",
        icon: FiMonitor,
    },
    light: {
        label: "Light",
        icon: FiSun,
    },
    dark: {
        label: "Dark",
        icon: FiMoon,
    },
};

function applyThemePreference(theme) {
    const root = document.documentElement;

    if (theme === "light" || theme === "dark") {
        root.setAttribute("data-theme", theme);
    } else {
        root.removeAttribute("data-theme");
    }
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState("system");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

        const initialTheme = THEME_OPTIONS.includes(savedTheme)
            ? savedTheme
            : "system";

        setTheme(initialTheme);
        applyThemePreference(initialTheme);
        setMounted(true);
    }, []);

    function changeTheme() {
        const currentIndex = THEME_OPTIONS.indexOf(theme);

        const nextTheme =
            THEME_OPTIONS[(currentIndex + 1) % THEME_OPTIONS.length];

        setTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyThemePreference(nextTheme);
    }

    const displayedTheme = mounted ? theme : "system";
    const Icon = themeDetails[displayedTheme].icon;

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={changeTheme}
            aria-label={`Current theme: ${themeDetails[displayedTheme].label}. Click to change theme.`}
            title={`Theme: ${themeDetails[displayedTheme].label}`}
        >
            <Icon aria-hidden="true" />

            <span className="theme-toggle__label">
                {themeDetails[displayedTheme].label}
            </span>
        </button>
    );
}
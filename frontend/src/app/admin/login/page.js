"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    FiArrowRight,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
} from "react-icons/fi";

import {
    getSession,
    login,
    logout,
} from "@/services/authService";
import { verifyAdminAccess } from "@/services/adminService";

import "./login.css";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let active = true;

        async function checkExistingSession() {
            try {
                const session = await getSession();

                if (!session) {
                    if (active) setIsChecking(false);
                    return;
                }

                await verifyAdminAccess();

                if (active) {
                    router.replace("/admin/dashboard");
                }
            } catch {
                try {
                    await logout();
                } catch {
                    // Ignore logout failure during session cleanup.
                }

                if (active) {
                    setIsChecking(false);
                }
            }
        }

        checkExistingSession();

        return () => {
            active = false;
        };
    }, [router]);

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await login(email, password);
            await verifyAdminAccess();

            router.replace("/admin/dashboard");
            router.refresh();
        } catch (error) {
            try {
                await logout();
            } catch {
                // Ignore logout failure after rejected login.
            }

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to sign in."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isChecking) {
        return (
            <main className="admin-login admin-login--loading">
                <p>Checking session...</p>
            </main>
        );
    }

    return (
        <main className="admin-login">
            <div
                className="admin-login__background"
                aria-hidden="true"
            >
                <span className="admin-login__glow admin-login__glow--one" />
                <span className="admin-login__glow admin-login__glow--two" />
                <span className="admin-login__grid" />
            </div>

            <section className="admin-login__panel">
                <div className="admin-login__brand">
                    <Image
                        src="/brand/logo-dark.svg"
                        alt="All In Cards"
                        width={150}
                        height={48}
                        priority
                        className="admin-login__logo"
                    />

                    <span>Administration</span>
                </div>

                <header className="admin-login__header">
                    <span className="admin-login__eyebrow">
                        Secure access
                    </span>

                    <h1>Welcome back.</h1>

                    <p>
                        Sign in to manage your All In demo profiles.
                    </p>
                </header>

                <form
                    className="admin-login__form"
                    onSubmit={handleSubmit}
                >
                    <label className="admin-login__field">
                        <span>Email address</span>

                        <div className="admin-login__input">
                            <FiMail aria-hidden="true" />

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="admin@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </label>

                    <label className="admin-login__field">
                        <span>Password</span>

                        <div className="admin-login__input">
                            <FiLock aria-hidden="true" />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="admin-login__password-toggle"
                                onClick={() =>
                                    setShowPassword((current) => !current)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </label>

                    {errorMessage && (
                        <div
                            className="admin-login__error"
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="admin-login__submit"
                        disabled={isSubmitting}
                    >
                        <span>
                            {isSubmitting
                                ? "Signing in..."
                                : "Sign in"}
                        </span>

                        <FiArrowRight aria-hidden="true" />
                    </button>
                </form>

                <p className="admin-login__note">
                    Access is restricted to the authorised
                    administrator.
                </p>
            </section>
        </main>
    );
}
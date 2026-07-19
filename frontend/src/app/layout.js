import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "All In Cards",
  description: "One tap. One identity.",
};

const initialThemeScript = `
(() => {
  try {
    const theme = localStorage.getItem("all-in-theme");

    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  } catch (e) {
    document.documentElement.removeAttribute("data-theme");
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >
          {initialThemeScript}
        </Script>

        {children}
      </body>
    </html>
  );
}
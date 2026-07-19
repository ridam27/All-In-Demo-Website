import "./globals.css";

export const metadata = {
  title: "All In Cards",
  description: "One tap. One identity.",
};

const initialThemeScript = `
  (() => {
    try {
      const savedTheme = localStorage.getItem("all-in-theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    } catch {
      document.documentElement.removeAttribute("data-theme");
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: initialThemeScript,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
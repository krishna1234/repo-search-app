import "./globals.css";

export const metadata = {
  title: "GitHub Repository Search",
  description: "Search GitHub repositories with filters and pagination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

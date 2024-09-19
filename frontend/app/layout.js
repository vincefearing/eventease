import "./globals.css";

export const metadata = {
  title: "EventEase",
  description: "Manage your events with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

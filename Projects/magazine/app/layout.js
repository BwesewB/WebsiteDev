import "./globals.css";

export const metadata = {
  title: "Reimagining Spaces",
  description: "Reimagining Spaces in Japan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

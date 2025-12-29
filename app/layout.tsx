import "./globals.css";
import { Navbar } from "./components/Navbar";
import { teko } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es"  className={teko.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import { Navbar } from "./components/Navbar";
import { teko, inter } from "./fonts";
import CartDrawer from "./components/CartDrawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${teko.variable}`}>
      <body>
        <Navbar />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}

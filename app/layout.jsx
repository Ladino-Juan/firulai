import "./globals.css";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Poppins } from "next/font/google";
import Favicon from '../public/favicon.ico';

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Firulais",
  description:
    "Play for a purpose. Firulais merges virtual pets with real-world change. Experience fun with a meaningful impact on sheltered animals' lives",
    icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <body className={`bg-darkGray text-blanco ${poppins.className}`}>
          <Header />
          <main>
            <div className="flex items-start justify-center min-h-screen">
              <div>{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./components/Footer";
import { Poppins } from "next/font/google";
import NavBar from "./components/NavBar";
import { getlocales } from "../actions";
import { enUS, esES } from "@clerk/localizations";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Firulai",
    template: "%s - Firulai"
  },
  description:
    "Encuentra a tu mascota ideal y hazla parte de tu vida, ya sea adoptando o apoyando su bienestar de forma responsable.",
  keywords: [
    "crowdfunding para mascotas",
    "Adoptar Pereira",
    "Firulai Pereira",
    "Perros Pereira",
    "apadrinar mascotas",
    "salvar animales abandonados",
    "donaciones para mascotas",
    "mascotas sin hogar",
    "rescate de mascotas",
    "Gatos Pereira",
  ],
  twitter: {
    card: "summary_large_image",
  }
};

export default function RootLayout({ children, params }) {
  return (
    <ClerkProvider localization={params.locale === "en" ? enUS : esES} appearance={{
      variables: { colorPrimary: 'green' },
    
    }}>
      <Analytics />
      <html lang={params.locale ?? defaultLocale}>
        <body className={poppins.className}>
          <NavBar lang={params.locale} />
          <main>
            <div>{children}</div>
          </main>
          <Footer lang={params.locale} />
        </body>
      </html>
    </ClerkProvider>
  );
}

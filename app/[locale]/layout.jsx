import "./globals.css";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./components/Footer";
import { Poppins } from "next/font/google";
import Favicon from "../../public/favicon.ico";
import NavBar from "./components/NavBar";
import { getlocales } from "../actions";
import { enUS, esES } from "@clerk/localizations";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Firulai",
  description:
    "Firulai te permite apadrinar mascotas para contribuir de manera eficiente y segura a fundaciones que cuidan de animales abandonados. Juntos, podemos transformar la vida de estas mascotas, brindándoles nuevas oportunidades y promoviendo una sociedad más empática y solidaria.",
    keywords: [
      "crowdfunding",
      "fundaciones de mascotas",
      "bienestar animal",
      "ayudar a mascotas",
      "apadrinar mascotas",
      "apoyo a animales abandonados",
      "donaciones para mascotas",
      "proteger animales",
      "mascotas sin hogar",
      "hacer una diferencia",
      
    ],
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children, params }) {
  return (
    <ClerkProvider localization={params.locale === "en" ? enUS : esES}>
      <html lang={params.locale ?? defaultLocale}>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `,
          }}
        />

        <body className={`${poppins.className}`}>
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

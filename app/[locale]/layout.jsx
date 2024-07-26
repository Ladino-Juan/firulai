import "./globals.css";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./components/Footer";
import { Poppins } from "next/font/google";
import Favicon from "../../public/favicon.ico";
import NavBar from "./components/NavBar";
import { enUS, esES } from "@clerk/localizations";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Firulai",
  description:
    "Play for a purpose. Firulais merges virtual pets with real-world change. Experience fun with a meaningful impact on sheltered animals' lives",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children, params }) {
  return (
    <ClerkProvider
      localization={params.locale === "en" ? enUS : esES}
    >
      
      <html lang={params.locale ?? defaultLocale}>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `,
          }} />
        <body className={`${poppins.className}`}>
          <NavBar lang={params.locale} />
          <main>    
              <div>{children}</div>
          </main>
          <Footer lang={params.locale}/>
        </body>
      </html>
    </ClerkProvider>
  );
}

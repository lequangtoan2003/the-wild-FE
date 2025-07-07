import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import "./_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    default: "Welcome / The Wild",
    template: "%s / The Wild",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>The Wild</title>
      </head>
      <body className={`${josefin.className} flex flex-col bg-primary-900 text-primary-100 min-h-screen relative`}>
        <div className="sticky top-0 left-0 right-0 z-30 bg-primary-900 ">
              <Header />
        </div>
        

       <div className="flex-1 px-8 pt-12 grid">
         <main className="max-w-9xl mx-auto w-full">
          <ReservationProvider>
          {children}
          </ReservationProvider>
        </main>
       </div>
      </body>
    </html>
  );
}

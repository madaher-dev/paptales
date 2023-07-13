import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { light } from "@clerk/themes";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paptales",
  description: "Stories about us",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: light,
        elements: {
          formButtonPrimary:
            "bg-purple-500 hover:bg-purple-400 text-sm normal-case",
        },
        variables: {
          colorPrimary: "#374151",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="container mx-auto">
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20 mx-5">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

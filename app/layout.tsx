import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ApolloClientProvider from "@/providers/ApolloProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "JAMstack todo app with Next.js, GraphQL, and Apollo Client",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen antialiased`}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}

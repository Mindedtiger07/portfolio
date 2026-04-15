import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaurav Kumar Rai | Aspiring Software Developer",
  description:
    "Portfolio of Gaurav Kumar Rai — Aspiring Software Developer skilled in Java, C++, Web Development, Data Structures & Algorithms, and AI/ML. Computer Science student at Galgotias University.",
  keywords: [
    "Gaurav Kumar Rai",
    "Software Developer",
    "Portfolio",
    "Java",
    "C++",
    "Web Development",
    "AI/ML",
    "Computer Science",
  ],
  authors: [{ name: "Gaurav Kumar Rai" }],
  openGraph: {
    title: "Gaurav Kumar Rai | Aspiring Software Developer",
    description:
      "Portfolio of Gaurav Kumar Rai — Aspiring Software Developer skilled in Java, C++, Web Development, DSA, and AI/ML.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to set dark mode before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

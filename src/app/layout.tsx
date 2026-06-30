import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "A&N Dev | 소프트웨어 & 펌웨어 개발 의뢰",
  description: "웹/앱 소프트웨어 개발, 펌웨어/임베디드 개발, 기술지원까지. 전문적인 개발 의뢰는 A&N Dev에 맡기세요.",
  keywords: ["개발 의뢰", "펌웨어 개발", "임베디드", "웹 개발", "앱 개발", "소프트웨어", "A&N Dev"],
  openGraph: {
    title: "A&N Dev | 소프트웨어 & 펌웨어 개발 의뢰",
    description: "웹/앱부터 펌웨어까지, 전문 개발팀이 함께합니다.",
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
      lang="ko"
      className={`${outfit.variable} ${notoSansKr.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-[#1e2438] bg-white">
        {children}
      </body>
    </html>
  );
}


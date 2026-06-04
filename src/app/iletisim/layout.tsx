import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "İletişim",
  description:
    "İstanbul Esenler'deki iPhone Tamir Atölyesi ile teknik analiz, iPhone anakart tamiri ve mikro lehimleme hizmetleri için iletişime geçin.",
  path: "/iletisim",
  image: "/tech_lab_overview_v2.png",
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

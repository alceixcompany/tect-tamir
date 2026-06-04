import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hakkımızda",
  description:
    "2014'ten bu yana İstanbul'da iPhone anakart, mikro lehimleme ve hassas elektronik kart onarımı yapan teknik laboratuvarımızı tanıyın.",
  path: "/hakkimizda",
  image: "/tech_lab_overview_v2.png",
});

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

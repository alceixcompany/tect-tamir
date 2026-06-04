import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hizmet Bölgelerimiz",
  description:
    "İstanbul ve Türkiye genelinde iPhone anakart tamiri, mikro lehimleme ve elektronik kart onarımı için hizmet bölgelerimiz.",
  path: "/hizmet-bolgelerimiz",
  image: "/realistic_hero.png",
});

export default function ServiceAreasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

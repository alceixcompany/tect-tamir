import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hizmetlerimiz",
  description:
    "iPhone anakart tamiri, mikro lehimleme, veri kurtarma ve elektronik kart onarımı için İstanbul'da profesyonel laboratuvar hizmetleri.",
  path: "/hizmetlerimiz",
  image: "/bga_rework_1778396487205.png",
});

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

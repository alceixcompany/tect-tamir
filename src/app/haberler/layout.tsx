import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Teknik Analizler",
  description:
    "iPhone anakart tamiri, mikro lehimleme, elektronik kart onarımı ve laboratuvar süreçleri hakkında teknik analizler.",
  path: "/haberler",
  image: "/micro_soldering_lab_1778397801389.png",
});

export default function NewsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

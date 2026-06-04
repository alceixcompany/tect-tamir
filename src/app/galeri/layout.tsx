import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Galeri",
  description:
    "iPhone Tamir Atölyesi laboratuvarı, BGA rework istasyonu, mikro lehimleme alanı ve hassas elektronik onarım ekipmanları.",
  path: "/galeri",
  image: "/lab_workstation_1778396468117.png",
});

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

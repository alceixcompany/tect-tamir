import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getServiceAreaBySlug } from "@/lib/firestore-data";
import { titleFromSlug } from "@/lib/slug";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);
  const areaName = area?.name || titleFromSlug(slug);

  return createMetadata({
    title: `${areaName} iPhone Tamiri`,
    description: area?.description || `${areaName} bölgesinde iPhone anakart tamiri, mikro lehimleme, veri kurtarma ve elektronik kart onarımı için teknik servis desteği.`,
    path: `/hizmet-bolgelerimiz/${slug}`,
    image: area?.imageUrl || "/realistic_hero.png",
  });
}

export default function ServiceAreaDetailLayout({ children }: Props) {
  return children;
}

import type { Metadata } from "next";
import { createMetadata, servicePages } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) {
    return createMetadata({
      title: "Hizmet Detayı",
      path: `/hizmetlerimiz/${slug}`,
    });
  }

  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/hizmetlerimiz/${service.slug}`,
    image:
      service.slug === "iphone-anakart-tamiri"
        ? "/iphone_motherboard_repair_1778397775835.png"
        : service.slug === "mikro-lehimleme"
          ? "/micro_soldering_lab_1778397801389.png"
          : "/pcb_card_repair_1778397751635.png",
  });
}

export default function ServiceDetailLayout({ children }: Props) {
  return children;
}

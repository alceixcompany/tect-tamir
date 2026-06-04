import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getNewsBySlug } from "@/lib/firestore-data";
import { resolveNewsImage } from "@/lib/images";
import { titleFromSlug } from "@/lib/slug";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  const title = news?.title || titleFromSlug(slug);

  return createMetadata({
    title,
    description: news?.description ||
      "iPhone anakart tamiri, mikro lehimleme ve elektronik kart onarımı hakkında iPhone Tamir Atölyesi teknik analizi.",
    path: `/haberler/${slug}`,
    image: resolveNewsImage(news?.imageUrl),
    type: "article",
  });
}

export default function NewsDetailLayout({ children }: Props) {
  return children;
}

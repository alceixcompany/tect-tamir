import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createSlug } from "@/lib/slug";

export interface NewsItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  content?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  slug?: string;
  isActive: boolean;
}

export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  maps?: Array<{
    id: string;
    url: string;
    title: string;
  }>;
}

export interface GalleryImage {
  id: string;
  url?: string;
  imageUrl?: string;
  alt?: string;
  title?: string;
  caption?: string;
  isActive?: boolean;
}

export async function getActiveNews() {
  const snapshot = await getDocs(collection(db, "haberler"));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as NewsItem)
    .filter((item) => item.isActive)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getNewsBySlug(slug: string) {
  const news = await getActiveNews();
  return news.find((item) => (item.slug || createSlug(item.title)) === slug) || null;
}

export async function getActiveServiceAreas() {
  const snapshot = await getDocs(collection(db, "hizmet_bolgeleri"));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as ServiceArea)
    .filter((area) => area.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getServiceAreaBySlug(slug: string) {
  const q = query(
    collection(db, "hizmet_bolgeleri"),
    where("slug", "==", slug),
    where("isActive", "==", true),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as ServiceArea;
}

export async function getGalleryImages(maxItems = 6) {
  const snapshot = await getDocs(collection(db, "galeri"));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as GalleryImage)
    .filter((item) => item.isActive !== false)
    .slice(0, maxItems);
}

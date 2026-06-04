import type { Metadata } from "next";

export const siteConfig = {
  name: "iPhone Tamir Atölyesi",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.iphonetamiratolyesi.com",
  locale: "tr_TR",
  language: "tr",
  phone: "+90 551 367 81 34",
  phoneHref: "+905513678134",
  address: "Esenler / İstanbul",
  city: "İstanbul",
  district: "Esenler",
  country: "TR",
  coordinates: {
    latitude: 41.0363056,
    longitude: 28.8828611,
  },
  logo: "/iphonetamiratolyesi_logo.png",
  icon: "/iphonetamiratolyesi_icon.png",
  defaultImage: "/realistic_hero.png",
  description:
    "İstanbul Esenler'de iPhone anakart tamiri, mikro lehimleme, veri kurtarma ve elektronik kart onarımı için profesyonel teknik laboratuvar.",
};

export const servicePages = [
  {
    slug: "iphone-anakart-tamiri",
    title: "iPhone Anakart Tamiri",
    description:
      "İstanbul'da sıvı teması, şebeke, açılmama, NAND ve Audio IC arızaları için profesyonel iPhone anakart tamiri.",
  },
  {
    slug: "mikro-lehimleme",
    title: "Mikro Lehimleme Laboratuvarı",
    description:
      "BGA reballing, SMD entegre değişimi ve mikroskop altında hassas mikro lehimleme işlemleri.",
  },
  {
    slug: "elektronik-kart-tamiri",
    title: "Elektronik Kart Tamiri",
    description:
      "Çok katmanlı PCB, endüstriyel kontrol kartı ve hassas elektronik kart arızalarında çip seviyesinde onarım.",
  },
] as const;

export const fallbackServiceAreas = [
  {
    slug: "esenler",
    name: "Esenler",
  },
  {
    slug: "bagcilar",
    name: "Bağcılar",
  },
  {
    slug: "gungoren",
    name: "Güngören",
  },
  {
    slug: "istanbul",
    name: "İstanbul Geneli",
  },
] as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.defaultImage,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
} = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | İstanbul iPhone Anakart Tamiri ve Mikro Lehimleme`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      url: absoluteUrl(path),
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.defaultImage),
    logo: absoluteUrl(siteConfig.logo),
    telephone: siteConfig.phone,
    priceRange: "$$",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.district,
      addressRegion: siteConfig.city,
      addressCountry: siteConfig.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "İstanbul",
      },
      {
        "@type": "Country",
        name: "Türkiye",
      },
    ],
    makesOffer: servicePages.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        areaServed: "İstanbul",
        url: absoluteUrl(`/hizmetlerimiz/${service.slug}`),
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    publisher: {
      "@id": `${siteConfig.url}/#localbusiness`,
    },
  };
}

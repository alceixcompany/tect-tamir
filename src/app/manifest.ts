import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: siteConfig.language,
    icons: [
      {
        src: siteConfig.icon,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteConfig.icon,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

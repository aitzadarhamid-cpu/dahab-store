import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DAHAB دهب - Bijoux Maroc",
    short_name: "DAHAB",
    description:
      "Bijoux tendance et accessibles pour la femme marocaine moderne. Livraison partout au Maroc.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#C9A84C",
    orientation: "portrait",
    categories: ["shopping", "lifestyle"],
    lang: "fr",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

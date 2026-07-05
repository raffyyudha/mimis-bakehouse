import fs from "fs";
import path from "path";
import AlbumGalleryClient from "./AlbumGalleryClient";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function AlbumPage({ params }: PageProps) {
  const { category } = await params;

  // Map directory folder/slug to the human readable displayName
  const categoryNames: Record<string, string> = {
    "macarons": "Macarons",
    "cakes": "Cakes",
    "cookies": "Cookies",
    "cupcakes": "Cupcakes",
    "cny-cookies": "Chinese New Year Cookies",
    "christmas-treats": "Christmas Treats",
    "special-occasions": "Special Occasions",
    "handy-treats": "Handy Treats",
    "workshops": "Workshops",
    "rollcake": "Roll Cakes",
  };

  const displayName = categoryNames[category] || category;
  const albumDir = path.join(process.cwd(), "public", "albums", category);

  let photos: string[] = [];
  try {
    if (fs.existsSync(albumDir)) {
      const files = fs.readdirSync(albumDir);
      // Filter valid image extensions and map to static URL path
      photos = files
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
        })
        .map(file => `/albums/${category}/${file}`);
    }
  } catch (error) {
    console.error("Error reading album directory:", error);
  }

  return (
    <AlbumGalleryClient 
      category={category} 
      displayName={displayName} 
      photos={photos} 
    />
  );
}

export async function generateStaticParams() {
  return [
    { category: "macarons" },
    { category: "cakes" },
    { category: "cookies" },
    { category: "cupcakes" },
    { category: "cny-cookies" },
    { category: "christmas-treats" },
    { category: "special-occasions" },
    { category: "handy-treats" },
    { category: "workshops" },
    { category: "rollcake" },
  ];
}

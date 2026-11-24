import { MediaDetails } from "@/components/MediaDetails";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const mediaJsonPath = path.join(process.cwd(), "public", "api", "v1", "media.json");
  if (fs.existsSync(mediaJsonPath)) {
    try {
      const items = JSON.parse(fs.readFileSync(mediaJsonPath, "utf-8"));
      return items.map((item: { id: string }) => ({ id: item.id }));
    } catch {
      // fallback
    }
  }

  const mediaDir = path.resolve(process.cwd(), "..", "..", "dataset", "data", "media");
  if (fs.existsSync(mediaDir)) {
    const files = fs.readdirSync(mediaDir);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => ({ id: file.replace(/\.json$/, "") }));
  }

  return [];
}

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MediaDetails mediaId={id} />;
}

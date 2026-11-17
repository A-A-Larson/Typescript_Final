import { NextResponse } from "next/server";
import { hasApiKey, isValidId, perenualFetch } from "../../../../../lib/perenual";

// GET /api/plants/:id/hardiness-map  and  /api/plants/:id/care-guide
// Proxies Perenual endpoints that require the key, so links in the UI can
// point here instead of exposing the key in a URL.
const RESOURCES: Record<string, { path: string; params: (id: string) => Record<string, string> }> = {
  "hardiness-map": {
    path: "/hardiness-map",
    params: (id) => ({ species_id: id, size: "og" }),
  },
  "care-guide": {
    path: "/species-care-guide-list",
    params: (id) => ({ species_id: id }),
  },
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string; resource: string }> }
) {
  const { id, resource } = await params;
  const target = RESOURCES[resource];

  if (!target || !isValidId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!hasApiKey()) {
    return NextResponse.json({ error: "API key not configured" }, { status: 503 });
  }

  try {
    const upstream = await perenualFetch(target.path, target.params(id));
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/octet-stream",
      },
    });
  } catch (error) {
    console.error(`Perenual ${resource} error:`, error);
    return NextResponse.json({ error: "Upstream request failed" }, { status: 502 });
  }
}

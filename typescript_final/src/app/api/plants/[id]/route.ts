import { NextResponse } from "next/server";
import type PlantDetailsUI from "../../../Module/PlantDetailsUI";
import localDetails from "../../../../../server/data/response.json";
import { hasApiKey, isValidId, perenualFetch, stripKeys } from "../../../../lib/perenual";

// GET /api/plants/:id
// Live details when PERENUAL_API_KEY is set; otherwise (or on upstream failure)
// the bundled sample data. The key never appears in the response: links that
// need it are rewritten to this app's own proxy routes, or blanked when unavailable.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  let plant: PlantDetailsUI | undefined;
  let live = false;

  if (hasApiKey()) {
    try {
      const upstream = await perenualFetch(`/species/details/${id}`);
      if (upstream.ok) {
        plant = await upstream.json();
        live = true;
      } else {
        console.error(`Perenual details failed: ${upstream.status}`);
      }
    } catch (error) {
      console.error("Perenual details error:", error);
    }
  }

  if (!plant) {
    plant = (localDetails as unknown as PlantDetailsUI[]).find((p) => p.id === Number(id));
  }
  if (!plant) return NextResponse.json({ error: "Plant not found" }, { status: 404 });

  const safe = stripKeys(plant);
  safe.hardiness_location = {
    full_url: live ? `/api/plants/${id}/hardiness-map` : "",
    full_iframe: "",
  };
  safe["care-guides"] = live ? `/api/plants/${id}/care-guide` : "";

  return NextResponse.json(safe, {
    headers: { "x-data-source": live ? "live" : "local-sample" },
  });
}

import { NextResponse } from "next/server";
import type PlantsListUI from "../../Module/PlantsListUI";
import localPlants from "../../../../server/data/plantList.json";
import { hasApiKey, perenualFetch, stripKeys } from "../../../lib/perenual";

// GET /api/plants?q=apple
// Uses the live Perenual API when PERENUAL_API_KEY is set; otherwise (or if the
// upstream call fails, e.g. rate limit) serves the bundled sample data.
export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").trim();

  if (hasApiKey()) {
    try {
      const upstream = await perenualFetch("/species-list", { q });
      if (upstream.ok) {
        return NextResponse.json(stripKeys(await upstream.json()), {
          headers: { "x-data-source": "live" },
        });
      }
      console.error(`Perenual species-list failed: ${upstream.status}`);
    } catch (error) {
      console.error("Perenual species-list error:", error);
    }
  }

  const local = localPlants as unknown as PlantsListUI;
  const needle = q.toLowerCase();
  const data = needle
    ? local.data.filter((plant) => plant.common_name.toLowerCase().includes(needle))
    : local.data;

  return NextResponse.json(
    { ...local, data, total: data.length, to: data.length },
    { headers: { "x-data-source": "local-sample" } }
  );
}

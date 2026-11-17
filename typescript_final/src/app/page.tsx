"use client"
import React, { useState } from "react";
import PlantsList from "./components/plants-list";
import type PlantsListUI from "./Module/PlantsListUI";


export default function Home() {

  const [plantsList, setPlantsList] = useState<PlantsListUI | null>(null);
  const [plantName, setPlantName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Goes through our own API route, which holds the Perenual key server-side.
      const response = await fetch(`/api/plants?q=${encodeURIComponent(plantName.trim())}`);

      if (!response.ok) {
        throw new Error("Failed to fetch plant data.");
      }

      setPlantsList(await response.json());
    } catch {
      setPlantsList(null);
      setError("Failed to fetch plant data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="hero">
        <h1>Find your next plant</h1>
        <p className="heroSub">
          Search for a plant to explore its care needs, propagation methods and harvest details.
        </p>
        <form className="searchForm" method="post" onSubmit={handleSubmit}>
          <input
            className="searchInput"
            type="text"
            id="plantInput"
            aria-label="Plant name"
            placeholder="Search by plant name…"
            value={plantName}
            onChange={e => setPlantName(e.target.value)}
          />
          <button className="searchSubmitButton" type="submit">
            Search
          </button>
        </form>
        {error && <div className="formError">{error}</div>}
      </section>
      {loading && <div className="statusText">Loading…</div>}
      {!loading && plantsList && plantsList.data.length === 0 && (
        <div className="statusText">No plants found. Try another name.</div>
      )}
      {plantsList && <PlantsList {...plantsList}/>}
    </main>
  );
}

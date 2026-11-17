"use client"
import React from "react";
import PlantsListUI from "../Module/PlantsListUI";
import { useRouter } from "next/navigation"; // Use Next.js App Router for navigation

export default function PlantsList(props: PlantsListUI) {
    const router = useRouter(); // Instantiate the router

    // Function to handle navigation to plant details
    const handleViewDetails = (plantID: number) => {
        router.push(`/plant-details?id=${plantID}`); // Navigate to the plant details page with the plant ID as a query parameter
    };

    const plants = (props?.data ?? []).filter((plant) => plant.id && plant.common_name);

    if (plants.length === 0) return null;

    return (
        <section>
            <div className="resultsHeader">
                <h2>Search Results</h2>
                <span className="resultsCount">{plants.length} plants found</span>
            </div>
            <div className="apiResultsContainer">
                {plants.map((result) => (
                    <button
                        key={result.id}
                        className="plantCard"
                        onClick={() => handleViewDetails(result.id)}
                    >
                        <div className="plantCardArt" aria-hidden="true">🌱</div>
                        <div className="plantCardBody">
                            <div>
                                <div className="plantCardName">{result.common_name}</div>
                                <div className="plantCardId">ID #{result.id}</div>
                            </div>
                            <span className="plantCardArrow" aria-hidden="true">→</span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}

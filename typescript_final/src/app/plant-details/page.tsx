"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type PlantDetailsUI from '../Module/PlantDetailsUI';
import PlantDetails from '../components/plant-details';


const PlantDetailsPage = () => {
    const searchParams = useSearchParams();
    const plantID = searchParams.get('id');
    const [response, setResponse] = useState<PlantDetailsUI | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
      if (!plantID) return;

      let cancelled = false;

      // Goes through our own API route, which holds the Perenual key server-side.
      const loadDetails = async () => {
        try {
          const result = await fetch(`/api/plants/${encodeURIComponent(plantID)}`);

          if (!result.ok) {
            throw new Error("Failed to fetch plant data.");
          }

          const data: PlantDetailsUI = await result.json();
          if (!cancelled) {
            setResponse(data);
            setError('');
          }
        } catch {
          if (!cancelled) {
            setResponse(null);
            setError("Couldn't load this plant. Please try again.");
          }
        }
      };

      loadDetails();

      return () => { cancelled = true; };
    }, [plantID]);

    return (
        <div className='plantDetailsContainer'>
            <Link href="/" className="backLink">← Back to search</Link>
            {!plantID ? (
                <p className="statusText">No plant selected. Go back and pick one.</p>
            ) : error ? (
                <p className="formError">{error}</p>
            ) : response ? (
                <PlantDetails {...response}/>
            ) : (
                <p className="statusText">Loading…</p>
            )}
        </div>
    );
};

// useSearchParams needs a Suspense boundary for production builds.
const PlantDetailsPageWithSuspense = () => (
    <Suspense fallback={<p className="statusText">Loading…</p>}>
        <PlantDetailsPage />
    </Suspense>
);

export default PlantDetailsPageWithSuspense;

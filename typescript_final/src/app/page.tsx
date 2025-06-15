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

    //Fetch code removed to bypass API rate limit
    // setError(''); 
    // if (!plantName) {
    //   setError("Please enter a plant name.");
    //   return;
    // }
    // setLoading(true);
    
    // try {
    //   const response = await fetch(`https://perenual.com/api/species-list?key=sk-rYdM67a8d22d1dc7d8565&q=${plantName}`);
      
    //   // Check if the response is successful
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch plant data.");
    //   }
      
    //   const data = await response.json(); 
    //   setPlantsList(data);
    //   console.log(plantsList);
    // } catch (error) {
    //   setError("Failed to fetch plant data. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
    
    const response: PlantsListUI = require('../../server/data/plantList.json');

    setPlantsList(response);
    
};

  return (
    <main className="">
      <div className="searchSection">
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor='plantInput'>
            Plant Name: 
            <input 
              className='searchInput border border-foreground'
              type='text' 
              id='plantInput' 
              value={plantName}
              onChange={e => setPlantName(e.target.value)}
              size={17}
            />    
            <button 
              className='searchSubmitButton inputButton border border-foreground' 
              type='submit' 
              value="Submit"
            >
              Submit
            </button>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </label>           
        </form>
        {/* <p className="intro">I ran into a bug on the last day that caused my plant details page to get stuck in a reload loop. This caused me to hit my limit of 100 free API calls a day so my API calls wouldn't work anymore. My last minute fix was to make some JSON data and use that instead of API calls. So the search input is disabled and the search button returns a list of some plants I've collected.</p> */}
        
      </div>      
      <div>{loading && <div style={{ textAlign: 'center' }}>Loading...</div>} {plantsList && <PlantsList {...plantsList}/>}</div>    
    </main>
  );
}

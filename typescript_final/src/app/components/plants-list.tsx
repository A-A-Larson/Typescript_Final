"use client"
import React, { useState } from "react";
import PlantsListUI from "../Module/PlantsListUI";
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation"; // Use Next.js App Router for navigation




export default function PlantsList(props: PlantsListUI) {
    const [response, setResponse] = useState(null);

    const router = useRouter(); // Instantiate the router

    // Function to handle navigation to plant details
    const handleViewDetails = (plantID: number) => {
        router.push(`/plant-details?id=${plantID}`); // Navigate to the plant details page with the plant ID as a query parameter
    };
    
    const loadDetails = async (plantID: number) => {    
        try {
            const result = await axios.get(`https://perenual.com/api/species/details/${plantID}?key=sk-9HUZ679976f54331b8380`); // Replace the data with your actual payload
            setResponse(result.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
            // Type-safe access to AxiosError properties
            const axiosError = error as AxiosError;
            console.error('Axios Error:', axiosError.message);
            if (axiosError.response) {
                console.error('Status:', axiosError.response.status);
                console.error('Data:', axiosError.response.data);
            }
            } else {
            // Handle other types of errors
            console.error('General Error:', error);
            }
        }
        
    };

    return(
    <div>
        {props && props.data && props.data.length > 0 && (
            <div className='apiResultsContainer'>
                <h2>Search Results:</h2>            
                {props.data.map((result, index) => {
                    if (result.id && result.common_name) {
                        return (                            
                            <div key={index} className="plantListButtonContainer">
                                <button className="plantListButton" onClick={() => handleViewDetails(result.id)}>
                                    {result.common_name}
                                </button>
                            </div>                             
                        );
                    }
                    return null;
                })}
                    
            </div>
        )}          
    </div>
);}
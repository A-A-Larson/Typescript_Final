"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type PlantDetailsUI from '../Module/PlantDetailsUI';
import PlantDetails from '../components/plant-details';


const PlantDetailsPage = () => {
    const searchParams = useSearchParams();
    const plantID = searchParams.get('id'); 
    const [response, setResponse] = useState<PlantDetailsUI | null>({
        "id": 362,
        "common_name": "Gala Apple",
        "scientific_name": [
          "Malus 'Gala'"
        ],
        "other_name": [],
        "family": null,
        "origin": [
          "New Zealand",
          "Australia",
          "United States",
          "United Kingdom"
        ],
        "type": "tree",
        "dimension": "Height:  20 feet",
        "dimensions": {
          "type": "Height",
          "min_value": 20,
          "max_value": 20,
          "unit": "feet"
        },
        "cycle": "Perennial",
        "attracts": [],
        "propagation": [
          "Grafting Propagation",
          "Budding",
          "Layering Propagation",
          "Budding",
          "Budding",
          "Whip Grafting Propagation",
          "Cleft Grafting Propagation",
          "Splice Grafting Propagation",
          "Inarching"
        ],
        "hardiness": {
          "min": "6",
          "max": "6"
        },
        "hardiness_location": {
          "full_url": "https://perenual.com/api/hardiness-map?species_id=362&size=og&key=sk-9HUZ679976f54331b8380",
          "full_iframe": "<iframe frameborder=0 scrolling=yes seamless=seamless width=1000 height=550 style='margin:auto;' src='https://perenual.com/api/hardiness-map?species_id=362&size=og&key=sk-9HUZ679976f54331b8380'></iframe>"
        },
        "watering": "Frequent",
        "depth_water_requirement": [],
        "volume_water_requirement": [],
        "watering_period": null,
        "watering_general_benchmark": {
          "value": "7-10",
          "unit": "days"
        },
        "plant_anatomy": [
          {
            "part": "trunk",
            "color": [
              "brown"
            ]
          },
          {
            "part": "branches",
            "color": [
              "brown"
            ]
          }
        ],
        "sunlight": [
          "full sun"
        ],
        "pruning_month": [
          "March",
          "April",
          "May",
          "February",
          "June",
          "July"
        ],
        "pruning_count": [],
        "seeds": 1,
        "maintenance": null,
        "care-guides": "http://perenual.com/api/species-care-guide-list?species_id=362&key=sk-9HUZ679976f54331b8380",
        "soil": [],
        "growth_rate": "High",
        "drought_tolerant": false,
        "salt_tolerant": false,
        "thorny": false,
        "invasive": false,
        "tropical": false,
        "indoor": false,
        "care_level": null,
        "pest_susceptibility": [],
        "pest_susceptibility_api": "Coming Soon",
        "flowers": false,
        "flowering_season": null,
        "flower_color": "",
        "cones": false,
        "fruits": true,
        "edible_fruit": true,
        "edible_fruit_taste_profile": "Coming Soon",
        "fruit_nutritional_value": "Coming Soon",
        "fruit_color": [],
        "harvest_season": "Fall",
        "leaf": true,
        "leaf_color": [
          "green"
        ],
        "edible_leaf": false,
        "cuisine": true,
        "medicinal": false,
        "poisonous_to_humans": 0,
        "poisonous_to_pets": 0,
        "description": "Malus 'Gala' is an amazing apple variety with a unique sweet-tart flavor. It is one of the most widely grown apples in the United States and is a favorite for backyard orchards. Its size, color, and crunch make it an excellent apple for eating fresh or baking. The thin skin of the Gala apple allows it to easily absorb flavors when cooked, creating delicious dishes like apple pies and tarts. It is also a great choice for juicing, jams, and sauces. With its superior flavor, attractive appearance, and ease of use, the Gala apple is a great choice for any kitchen.",
        "default_image": {
          "license": 4,
          "license_name": "Attribution License",
          "license_url": "https://creativecommons.org/licenses/by/2.0/",
          "original_url": "https://perenual.com/storage/species_image/362_malus_gala/og/50860295937_612a404fc9_b.jpg",
          "regular_url": "https://perenual.com/storage/species_image/362_malus_gala/regular/50860295937_612a404fc9_b.jpg",
          "medium_url": "https://perenual.com/storage/species_image/362_malus_gala/medium/50860295937_612a404fc9_b.jpg",
          "small_url": "https://perenual.com/storage/species_image/362_malus_gala/small/50860295937_612a404fc9_b.jpg",
          "thumbnail": "https://perenual.com/storage/species_image/362_malus_gala/thumbnail/50860295937_612a404fc9_b.jpg"
        },
        "other_images": "Upgrade Plan To Supreme For Access https://perenual.com/subscription-api-pricing. Im sorry"
      });
    

    useEffect(() => {
      if (!plantID) return;
      
      const plantDetailsList: PlantDetailsUI[] = require('../../../server/data/response.json');

      for (let data of plantDetailsList) {
        if (data.id === Number(plantID)) {
          setResponse(data);
        }
      }

      //Fetch code removed to bypass API rate limit
      // const loadDetails = async () => {
      //     try {
      //         const result = await fetch(
      //             `https://perenual.com/api/species/details/${plantID}?key=sk-rYdM67a8d22d1dc7d8565`
      //         );
  
      //         if (!result.ok) {
      //           throw new Error("Failed to fetch plant data.");
      //         }
              
      //         const data = await result.json(); 
      //         setResponse(data);
      //         console.log(response);
      //       } catch (error) {
      //         console.error("Failed to fetch plant data. Please try again.");
      //       }     
      // };
  
      // loadDetails();

  }, [plantID]);  
  

    return (
        <div className='plantDetailsContainer'>
            <h1>Plant Specs:</h1>
            <div>
              {response ? (
                  <div>
                      {/* <h3>{response.common_name}</h3>
                      <pre>{JSON.stringify(response, null, 2)}</pre> */}
                      <PlantDetails {...response}/>
                  </div>
              ) : (
                  <p>Loading...</p>
              )}
            </div>
        </div>
    );
};

export default PlantDetailsPage;
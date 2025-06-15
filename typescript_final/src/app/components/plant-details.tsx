"use client"
import PlantDetailsUI from '../Module/PlantDetailsUI';
import Image from 'next/image';

const PlantDetails = (props: PlantDetailsUI) => {
    return (
    <div className="mainGrid">
        <div className='imageSection'>
            <Image 
                className='plantImage'
                src={props.default_image.original_url}
                alt='Image of the selected plant'
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
            />
        </div>
        <div className="idSection">
            <p>ID #: {props.id && props.id}</p>
            <p>Common Name: {props.common_name && props.common_name}</p>
            <p>Scientific Name: {props.scientific_name && props.scientific_name}</p>
            <p>Other Name: {props.other_name && props.other_name.map((result, index) => {return <span key={index}>{result}, </span>})}</p>
            <p>Family: {props.family && props.family}</p>
            <p>Type: {props.type && props.type}</p>
            <p>Leaf Color: </p>{props.leaf_color && props.leaf_color.map((result, index) => {return <span key={index}>{result}, </span>})}
            <h3>Description:</h3>
            <p className='description'>{props.description && props.description}</p>
        </div>
        <div className="preparationSection">
            <div className='preparationSectionContainer'>
                <h2>Preparation</h2>
                <p>Dimensions: {props.dimension && props.dimension}</p>
                <p>Growth Rate: {props.growth_rate && props.growth_rate}</p>
                <p>{props.dimensions.type && props.dimensions.type}: {props.dimensions.min_value && props.dimensions.min_value}-{props.dimensions.max_value && props.dimensions.max_value} {props.dimensions.unit && props.dimensions.unit}</p>
                <p>Life Cycle: {props.cycle && props.cycle}</p>
                <p>Hardiness: {props.hardiness.min && props.hardiness.min}-{props.hardiness.max && props.hardiness.max}</p>
                <a href={props.hardiness_location.full_url && props.hardiness_location.full_url}>Hardiness Map</a>
                <p>Sunlight: {props.sunlight && props.sunlight}</p>
                <p>Soil: {props.soil && props.soil.length > 0 ? props.soil : 'N/A'}</p>
                <p>Drought Tolerance: {`${props.drought_tolerant && props.drought_tolerant}`}</p>
                <p>Salt Tolerance: {`${props.salt_tolerant && props.salt_tolerant}`}</p>
                <p>Invasive: {`${props.invasive && props.invasive}`}</p>
                <p>Tropical: {`${props.tropical && props.tropical}`}</p>
                <p>Poisonous to Humans: {`${props.poisonous_to_humans && props.poisonous_to_humans}`}</p>
                <p>Poisonous to Pets: {`${props.poisonous_to_pets && props.poisonous_to_pets}`}</p>
            </div>
        </div>
        <div className="preventionSection">
            <div className='preventionSectionContainer'>
                <h2>Maintenance</h2>
                <p>Watering: {props.watering && props.watering}</p>
                <p>{props.depth_water_requirement && props.depth_water_requirement}</p>
                <p>{props.volume_water_requirement && props.volume_water_requirement}</p>
                <span>{props.watering_general_benchmark.value && props.watering_general_benchmark.value}</span><span>{props.watering_general_benchmark.unit && props.watering_general_benchmark.unit}</span>
                <p>Attracts: {props.attracts && props.attracts.length > 0 ? props.attracts : 'None'}</p>
                <div className='pruningMonth'>
                    <h3>Pruning Month: </h3>
                    <span>{props.pruning_month && props.pruning_month.map((result, index) => {return <span key={index}>{result}, </span>})}</span>
                </div>
                <p>Pruning Count: {props.pruning_count && props.pruning_count}</p>
                <a href={props['care-guides']}>Care Guide</a>
            </div>
        </div>
        <div className="propagationSection">
            <div className='propagationSectionContainer'>
                <h2>Propagation</h2>
                <div className='propagationMethods'>
                    <h3>Propagation methods: </h3> 
                    <span>{props.propagation && props.propagation.map((result, index) => {return <span key={index}>{result}, </span>})}</span>            
                </div>
                <p>Flowers: {`${props.flowers && props.flowers}`}</p>
                <p>Flowering season: {`${props.flowering_season && props.flowering_season}`}</p>
                <p>Cones: {`${props.cones && props.cones}`}</p>
            </div>
        </div>
        <div className="pickingSection">
            <div className='pickingSectionContainer'>
                <h2>Harvesting</h2>
                <p>Edible Fruit: {`${props.edible_fruit && props.edible_fruit}`}</p>
                <p>Edible Leaf: {`${props.edible_leaf && props.edible_leaf}`}</p>
                <p>Medicinal: {`${props.medicinal && props.medicinal}`}</p>
                <p>Harvest Season: {props.harvest_season && props.harvest_season}</p>
                <span>Fruit Color: <span>{props.fruit_color && props.fruit_color.length > 0 ? props.fruit_color : 'N/A'}</span></span>            
            </div>
        </div>        
    </div>
)};

export default PlantDetails;
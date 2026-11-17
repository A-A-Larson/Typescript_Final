"use client"
import React from 'react';
import PlantDetailsUI from '../Module/PlantDetailsUI';
import Image from 'next/image';

const toList = (value: unknown): string[] =>
    Array.isArray(value) ? value.map(String).filter(Boolean) : value ? [String(value)] : [];

const Chips = ({ items, empty = 'N/A' }: { items: unknown; empty?: string }) => {
    const list = toList(items);
    if (list.length === 0) return <>{empty}</>;
    return (
        <span className="chips">
            {list.map((item, index) => <span className="chip" key={index}>{item}</span>)}
        </span>
    );
};

const Flag = ({ value }: { value: unknown }) => (
    <span className={value ? 'badgeYes' : 'badgeNo'}>{value ? 'Yes' : 'No'}</span>
);

const Fact = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="fact">
        <dt>{label}</dt>
        <dd>{children}</dd>
    </div>
);

const text = (value: unknown, fallback = 'N/A') => {
    const list = toList(value);
    return list.length > 0 ? list.join(', ') : fallback;
};

const PlantDetails = (props: PlantDetailsUI) => {
    const imageUrl = props.default_image?.original_url;

    return (
    <div className="mainGrid">
        <div className='imageSection'>
            {imageUrl ? (
                <Image
                    className='plantImage'
                    src={imageUrl}
                    alt={`Image of ${props.common_name}`}
                    priority={true}
                    sizes="(max-width: 720px) 100vw, 50vw"
                    fill
                />
            ) : (
                <span aria-hidden="true">🌿</span>
            )}
        </div>

        <div className="card idSection">
            <h1 className="plantTitle">{props.common_name}</h1>
            <p className="scientificName">{text(props.scientific_name, '')}</p>
            <div className="chips">
                {props.type && <span className="chip">{props.type}</span>}
                {props.cycle && <span className="chip">{props.cycle}</span>}
                {props.family && <span className="chip">{props.family}</span>}
                <span className="chip chipMuted">ID #{props.id}</span>
            </div>
            {toList(props.other_name).length > 0 && (
                <>
                    <h3 className="sectionLabel">Also known as</h3>
                    <p>{text(props.other_name)}</p>
                </>
            )}
            {toList(props.leaf_color).length > 0 && (
                <>
                    <h3 className="sectionLabel">Leaf color</h3>
                    <p>{text(props.leaf_color)}</p>
                </>
            )}
            <h3 className="sectionLabel">Description</h3>
            <p className='description'>{props.description}</p>
        </div>

        <div className="card preparationSection">
            <h2>Preparation</h2>
            <dl className="factList">
                <Fact label="Size">{props.dimensions?.min_value ? `${props.dimensions.type}: ${props.dimensions.min_value}${props.dimensions.max_value !== props.dimensions.min_value ? `–${props.dimensions.max_value}` : ''} ${props.dimensions.unit}` : text(props.dimension)}</Fact>
                <Fact label="Growth rate">{text(props.growth_rate)}</Fact>
                <Fact label="Hardiness zone">{props.hardiness?.min === props.hardiness?.max ? props.hardiness?.min : `${props.hardiness?.min}–${props.hardiness?.max}`}</Fact>
                <Fact label="Sunlight">{text(props.sunlight)}</Fact>
                <Fact label="Soil">{text(props.soil)}</Fact>
                <Fact label="Drought tolerant"><Flag value={props.drought_tolerant} /></Fact>
                <Fact label="Salt tolerant"><Flag value={props.salt_tolerant} /></Fact>
                <Fact label="Invasive"><Flag value={props.invasive} /></Fact>
                <Fact label="Tropical"><Flag value={props.tropical} /></Fact>
                <Fact label="Poisonous to humans"><Flag value={props.poisonous_to_humans} /></Fact>
                <Fact label="Poisonous to pets"><Flag value={props.poisonous_to_pets} /></Fact>
            </dl>
            {props.hardiness_location?.full_url && (
                <a className="cardLink" href={props.hardiness_location.full_url} target="_blank" rel="noreferrer">View hardiness map →</a>
            )}
        </div>

        <div className="card preventionSection">
            <h2>Maintenance</h2>
            <dl className="factList">
                <Fact label="Watering">{text(props.watering)}</Fact>
                {props.watering_general_benchmark?.value && (
                    <Fact label="Water every">{props.watering_general_benchmark.value} {props.watering_general_benchmark.unit}</Fact>
                )}
                {toList(props.depth_water_requirement).length > 0 && <Fact label="Water depth">{text(props.depth_water_requirement)}</Fact>}
                {toList(props.volume_water_requirement).length > 0 && <Fact label="Water volume">{text(props.volume_water_requirement)}</Fact>}
                <Fact label="Attracts">{text(props.attracts, 'None')}</Fact>
                <Fact label="Pruning count">{text(props.pruning_count)}</Fact>
            </dl>
            <h3 className="sectionLabel">Pruning months</h3>
            <div style={{ marginTop: '0.4rem' }}><Chips items={props.pruning_month} /></div>
            {props['care-guides'] && (
                <a className="cardLink" href={props['care-guides']} target="_blank" rel="noreferrer">Read care guide →</a>
            )}
        </div>

        <div className="card propagationSection">
            <h2>Propagation</h2>
            <h3 className="sectionLabel" style={{ marginTop: 0 }}>Methods</h3>
            <div style={{ margin: '0.4rem 0 0.75rem' }}><Chips items={Array.from(new Set(toList(props.propagation)))} /></div>
            <dl className="factList">
                <Fact label="Flowers"><Flag value={props.flowers} /></Fact>
                <Fact label="Flowering season">{text(props.flowering_season)}</Fact>
                <Fact label="Cones"><Flag value={props.cones} /></Fact>
            </dl>
        </div>

        <div className="card pickingSection">
            <h2>Harvesting</h2>
            <dl className="factList">
                <Fact label="Edible fruit"><Flag value={props.edible_fruit} /></Fact>
                <Fact label="Edible leaf"><Flag value={props.edible_leaf} /></Fact>
                <Fact label="Medicinal"><Flag value={props.medicinal} /></Fact>
                <Fact label="Harvest season">{text(props.harvest_season)}</Fact>
                <Fact label="Fruit color">{text(props.fruit_color)}</Fact>
            </dl>
        </div>
    </div>
)};

export default PlantDetails;

import { ErrorResponse, sendRequest } from "./baseApi";
import { FactionSymbol } from "./factionsApi";

export interface Waypoint {
    systemSymbol: string;
    symbol: string;
    type: WaypointType;
    x: number;
    y: number;
    orbitals: {
        symbol: string
    }[];
    orbits?: string;
    traits: WaypointTrait[];
    modifiers?: WaypointModifier[];
    chart?: Chart;
    faction?: {
        symbol: FactionSymbol;
    };
    isUnderConstruction: boolean;
}

export interface WaypointTrait {
    symbol: WaypointTraitSymbol;
    name: string;
    description: string;
}

export interface WaypointModifier {
    symbol: WaypointModifierSymbol;
    name: string;
    description: string;
}

export interface Chart {
    waypointSymbol?: string;
    submittedBy?: string;
    submittedOn?: string;
}

export enum WaypointType {
    'PLANET',
    'GAS_GIANT',
    'MOON',
    'ORBITAL_STATION',
    'JUMP_GATE',
    'ASTEROID_FIELD',
    'ASTEROID',
    'ENGINEERED_ASTEROID',
    'ASTEROID_BASE',
    'NEBULA',
    'DEBRIS_FIELD',
    'GRAVITY_WELL',
    'ARTIFICIAL_GRAVITY_WELL',
    'FUEL_STATION'
}

export enum WaypointTraitSymbol {
    UNCHARTED = "UNCHARTED",
    UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
    MARKETPLACE = "MARKETPLACE",
    SHIPYARD = "SHIPYARD",
    OUTPOST = "OUTPOST",
    SCATTERED_SETTLEMENTS = "SCATTERED_SETTLEMENTS",
    SPRAWLING_CITIES = "SPRAWLING_CITIES",
    MEGA_STRUCTURES = "MEGA_STRUCTURES",
    PIRATE_BASE = "PIRATE_BASE",
    OVERCROWDED = "OVERCROWDED",
    HIGH_TECH = "HIGH_TECH",
    CORRUPT = "CORRUPT",
    BUREAUCRATIC = "BUREAUCRATIC",
    TRADING_HUB = "TRADING_HUB",
    INDUSTRIAL = "INDUSTRIAL",
    BLACK_MARKET = "BLACK_MARKET",
    RESEARCH_FACILITY = "RESEARCH_FACILITY",
    MILITARY_BASE = "MILITARY_BASE",
    SURVEILLANCE_OUTPOST = "SURVEILLANCE_OUTPOST",
    EXPLORATION_OUTPOST = "EXPLORATION_OUTPOST",
    MINERAL_DEPOSITS = "MINERAL_DEPOSITS",
    COMMON_METAL_DEPOSITS = "COMMON_METAL_DEPOSITS",
    PRECIOUS_METAL_DEPOSITS = "PRECIOUS_METAL_DEPOSITS",
    RARE_METAL_DEPOSITS = "RARE_METAL_DEPOSITS",
    METHANE_POOLS = "METHANE_POOLS",
    ICE_CRYSTALS = "ICE_CRYSTALS",
    EXPLOSIVE_GASES = "EXPLOSIVE_GASES",
    STRONG_MAGNETOSPHERE = "STRONG_MAGNETOSPHERE",
    VIBRANT_AURORAS = "VIBRANT_AURORAS",
    SALT_FLATS = "SALT_FLATS",
    CANYONS = "CANYONS",
    PERPETUAL_DAYLIGHT = "PERPETUAL_DAYLIGHT",
    PERPETUAL_OVERCAST = "PERPETUAL_OVERCAST",
    DRY_SEABEDS = "DRY_SEABEDS",
    MAGMA_SEAS = "MAGMA_SEAS",
    SUPERVOLCANOES = "SUPERVOLCANOES",
    ASH_CLOUDS = "ASH_CLOUDS",
    VAST_RUINS = "VAST_RUINS",
    MUTATED_FLORA = "MUTATED_FLORA",
    TERRAFORMED = "TERRAFORMED",
    EXTREME_TEMPERATURES = "EXTREME_TEMPERATURES",
    EXTREME_PRESSURE = "EXTREME_PRESSURE",
    DIVERSE_LIFE = "DIVERSE_LIFE",
    SCARCE_LIFE = "SCARCE_LIFE",
    FOSSILS = "FOSSILS",
    WEAK_GRAVITY = "WEAK_GRAVITY",
    STRONG_GRAVITY = "STRONG_GRAVITY",
    CRUSHING_GRAVITY = "CRUSHING_GRAVITY",
    TOXIC_ATMOSPHERE = "TOXIC_ATMOSPHERE",
    CORROSIVE_ATMOSPHERE = "CORROSIVE_ATMOSPHERE",
    BREATHABLE_ATMOSPHERE = "BREATHABLE_ATMOSPHERE",
    THIN_ATMOSPHERE = "THIN_ATMOSPHERE",
    JOVIAN = "JOVIAN",
    ROCKY = "ROCKY",
    VOLCANIC = "VOLCANIC",
    FROZEN = "FROZEN",
    SWAMP = "SWAMP",
    BARREN = "BARREN",
    TEMPERATE = "TEMPERATE",
    JUNGLE = "JUNGLE",
    OCEAN = "OCEAN",
    RADIOACTIVE = "RADIOACTIVE",
    MICRO_GRAVITY_ANOMALIES = "MICRO_GRAVITY_ANOMALIES",
    DEBRIS_CLUSTER = "DEBRIS_CLUSTER",
    DEEP_CRATERS = "DEEP_CRATERS",
    SHALLOW_CRATERS = "SHALLOW_CRATERS",
    UNSTABLE_COMPOSITION = "UNSTABLE_COMPOSITION",
    HOLLOWED_INTERIOR = "HOLLOWED_INTERIOR",
    STRIPPED = "STRIPPED"
}

export enum WaypointModifierSymbol {
    'STRIPPED',
    'UNSTABLE',
    'RADIATION_LEAK',
    'CRITICAL_LIMIT',
    'CIVIL_UNREST'
}

export async function getWaypointInfo(token: string, symbol: string): Promise<Waypoint | ErrorResponse> {
    // Waypoint symbols are made up of three sections: the sector, system, and location
    const symbolSections = symbol.split('-');

    const url = `https://api.spacetraders.io/v2/systems/${symbolSections[0]}-${symbolSections[1]}/waypoints/${symbol}`;

    const response = await sendRequest<Waypoint>({
        method: 'GET',
        token: token,
        url: url
    });

    return response;
}
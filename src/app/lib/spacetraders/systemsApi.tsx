import { ErrorResponse, sendRequest } from "./baseApi";

export interface Waypoint {
    systemSymbol: string;
    symbol: string;
    type: WaypointType;
    x: number;
    y: number;
    orbitals: string[];
    traits: {
        symbol: string;
        name: string;
        description: string;
    }[];
    modifiers: {};
    chart: {
        submittedBy: string;
        submittedOn: string;
    };
    faction: {
        symbol: string;
    };
    isUnderConstruction: boolean;
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
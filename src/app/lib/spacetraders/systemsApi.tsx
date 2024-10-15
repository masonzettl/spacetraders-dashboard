import { ErrorResponse, sendRequest } from "./baseApi";

export interface Waypoint {
    systemSymbol: string;
    symbol: string;
    type: string;
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
        submittedOn: Date;
    };
    faction: {
        symbol: string;
    };
    isUnderConstruction: boolean;
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
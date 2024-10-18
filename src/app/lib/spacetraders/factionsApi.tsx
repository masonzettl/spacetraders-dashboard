import { ErrorResponse, QueryParameters, sendRequest } from "./baseApi";

export enum FactionSymbol {
    'COSMIC',
    'VOID',
    'GALACTIC',
    'QUANTUM',
    'DOMINION',
    'ASTRO',
    'CORSAIRS',
    'OBSIDIAN',
    'AEGIS',
    'UNITED',
    'SOLITARY',
    'COBALT',
    'OMEGA',
    'ECHO',
    'LORDS',
    'CULT',
    'ANCIENTS',
    'SHADOW',
    'ETHEREAL'
}

export interface Faction {
    symbol: FactionSymbol;
    name: string;
    description: string;
    headquarters: string;
    traits: [{
        symbol: string;
        name: string;
        description: string;
    }];
    isRecruiting: boolean;
}

export async function listFactions({ token, parameters }: { token?: string, parameters?: QueryParameters }): Promise<Faction[] | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/factions
        ${parameters?.limit ? `?limit=${parameters.limit}` : ""}
        ${parameters?.page ? `?page=${parameters.page}` : ""}
    `;

    const response = await sendRequest<Faction[]>({
        method: 'GET',
        ...token && { token: token },
        url: url
    });

    return response;
}

export async function getFaction({ token, factionSymbol }: { token: string, factionSymbol: FactionSymbol }): Promise<Faction | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/factions/${factionSymbol}`;

    const response = await sendRequest<Faction>({
        method: 'GET',
        token: token,
        url: url
    });

    return response;
}
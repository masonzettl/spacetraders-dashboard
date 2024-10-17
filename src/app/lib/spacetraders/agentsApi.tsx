import { ErrorResponse, sendRequest } from "./baseApi";
import { FactionSymbol } from "./factionsApi";

export interface Agent {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: FactionSymbol;
    shipCount: number;
}

export async function getAgent(token: string): Promise<Agent | ErrorResponse> {
    const response = await sendRequest<Agent>({
        method: 'GET',
        token: token,
        url: 'https://api.spacetraders.io/v2/my/agent'
    });

    return response;
}


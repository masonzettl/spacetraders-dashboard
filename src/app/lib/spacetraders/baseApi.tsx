import { Ship } from "./fleetApi";
import { Faction } from "./factionsApi";
import { Agent } from "./agentsApi";
import { Contract } from "./contractsApi";

export interface ApiResponse<T> {
    data: T;
    meta?: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface ErrorResponse {
    error: {
        message: string;
        code: number;
    };
}

export interface RegisterResponse {
    agent: Agent;
    contract: Contract;
    faction: Faction;
    ship: Ship;
    token: string;
}

export async function sendRequest<T>({ method, token, parameters, url }: { method: "POST" | "GET"; token?: string; parameters?: Object; url: string; }): Promise<T | ErrorResponse> {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...token && { 'Authorization': `Bearer ${token}` }
        },
        ...parameters && { body: JSON.stringify(parameters) }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorResponse = await response.json() as ErrorResponse;
        console.error(errorResponse.error.message);
        return errorResponse;
    }

    const json = await response.json() as ApiResponse<T>;

    return json.data;
}

export async function registerAgent(parameters: { symbol: string; faction: string; email?: string; }): Promise<RegisterResponse | ErrorResponse> {
    const response = await sendRequest<RegisterResponse>({
        method: 'POST',
        parameters: parameters,
        url: 'https://api.spacetraders.io/v2/register'
    });

    return response;
}


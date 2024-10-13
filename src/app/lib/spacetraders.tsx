interface ApiResponse<T> {
    data: T,
    meta?: {
        total: number,
        page: number,
        limit: number
    }
}

interface ErrorResponse {
    error: {
        message: string,
        code: number
    }
}

export async function sendRequest<T>({ method, token, parameters, url }: { method: "POST" | "GET", token?: string, parameters?: Object, url: string }): Promise<T | ErrorResponse> {
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

export interface Agent {
    accountId: string,
    symbol: string,
    headquarters: string,
    credits: number,
    startingFaction: string,
    shipCount: number
}

export interface Contract {
    id: string,
    factionSymbol: string,
    type: "PROCUREMENT" | "TRANSPORT" | "SHUTTLE",
    terms: {
        deadline: string,
        payment: {
            onAccepted: number,
            onFulfilled: number
        },
        deliver: [{
            tradeSymbol: string,
            destinationSymbol: string,
            unitsRequired: number,
            unitsFulfilled: number
        }],
        accepted: boolean,
        fulfilled: boolean,
        deadlineToAccept: string
    }
}

export interface Faction {
    symbol: string,
    name: string,
    description: string,
    headquarters: string,
    traits: {
        symbol: string,
        name: string,
        description: string
    },
    isRecruiting: boolean
}

export interface Ship {
    symbol: string,
    registration: {
        name: string,
        factionSymbol: string,
        role: string
    },
    nav: {
        systemSymbol: string,
        waypointSymbol: string,
        route: {
            destination: {
                symbol: string,
                type: string,
                systemSymbol: string,
                x: number,
                y: number
            },
            origin: {
                symbol: string,
                type: string,
                systemSymbol: string,
                x: number,
                y: number
            },
            departureTime: string,
            arrival: string
        },
        status: string,
        flightMode: string
    },
    crew: {
        current: number,
        required: number,
        capacity: number,
        rotation: string,
        morale: number,
        wages: number
    },
    frame: {
        symbol: string,
        name: string,
        description: string,
        condition: number,
        integrity: number,
        moduleSlots: number,
        mountingPoints: number,
        fuelCapacity: number,
        requirements: {
            power?: number,
            crew?: number,
            slots?: number
        }
    },
    reactor: {
        symbol: string,
        name: string,
        description: string,
        condition: number,
        integrity: number,
        powerOutput: number,
        requirements: {
            power?: number,
            crew?: number,
            slots?: number
        }
    },
    engine: {
        symbol: string,
        name: string,
        description: string,
        condition: number,
        integrity: number,
        speed: number,
        requirements: {
            power?: number,
            crew?: number,
            slots?: number
        }
    },
    cooldown: {
        shipSymbol: string,
        totalSeconds: number,
        remainingSeconds: number,
        expiration?: string
    },
    modules: [{
        symbol: string,
        capacity?: number,
        range?: number,
        name: string,
        description: string,
        requirements: {
            power?: number,
            crew?: number,
            slots?: number
        }
    }],
    mounts: [{
        symbol: string,
        name: string,
        description?: string,
        strength?: string,
        desposits?: string[],
        requirements: {
            power?: number,
            crew?: number,
            slots?: number
        }
    }],
    cargo: {
        capacity: number,
        units: number,
        inventory: [{
            symbol: string,
            name: string,
            description: string,
            units: number
        }]
    },
    fuel: {
        current: number,
        capacity: number,
        consumed?: {
            amount: number,
            timestamp: string
        }
    }
}

export interface Waypoint {
    systemSymbol: string,
    symbol: string,
    type: string,
    x: number,
    y: number,
    orbitals: string[],
    traits: {
        symbol: string,
        name: string,
        description: string
    }[],
    modifiers: {},
    chart: {
        submittedBy: string,
        submittedOn: Date
    },
    faction: {
        symbol: string
    },
    isUnderConstruction: boolean
}

export interface RegisterResponse {
    agent: Agent,
    contract: Contract,
    faction: Faction,
    ship: Ship,
    token: string
}

export async function registerAgent(parameters: { symbol: string; faction: string; email?: string }): Promise<RegisterResponse | ErrorResponse> {
    const response = await sendRequest<RegisterResponse>({
        method: 'POST',
        parameters: parameters,
        url: 'https://api.spacetraders.io/v2/register'
    });

    return response;
}

export async function getAgent(token: string): Promise<Agent | ErrorResponse> {
    const response = await sendRequest<Agent>({
        method: 'GET',
        token: token,
        url: 'https://api.spacetraders.io/v2/my/agent'
    });

    return response;
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
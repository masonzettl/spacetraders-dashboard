interface ApiResponse<T> {
    data: T
}

export interface AgentDetails {
    accountId: string,
    symbol: string,
    headquarters: string,
    credits: number,
    startingFaction: string,
    shipCount: number
}

export interface WaypointProps {
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

export async function getAgentDetails(token: string): Promise<AgentDetails> {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch('https://api.spacetraders.io/v2/my/agent', options);

    if (!response.ok) {
        const message = `An error occurred: ${response.status}`;
        throw new Error(message);
    }

    const json = await response.json() as ApiResponse<AgentDetails>;
    return json.data;
}

export async function getWaypointInfo(token: string, symbol: string): Promise<WaypointProps> {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    // Waypoint symbols are made up of three sections: the sector, system, and location
    const symbolSections = symbol.split('-');
    if (symbolSections.length != 3) throw new Error('An error occurred: Invalid waypoint symbol');

    const response = await fetch(`https://api.spacetraders.io/v2/systems/${symbolSections[0]}-${symbolSections[1]}/waypoints/${symbol}`, options);

    if (!response.ok) {
        const message = `An error occurred: ${response.status}`;
        throw new Error(message);
    }

    const json = await response.json() as ApiResponse<WaypointProps>;
    return json.data;
}
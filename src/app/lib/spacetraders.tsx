export type AgentDetails = {
    accountId: string,
    symbol: string,
    headquarters: string,
    credits: number,
    startingFaction: string,
    shipCount: number
}

export async function getAgentDetails(token: String): Promise<AgentDetails> {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const response = await fetch('https://api.spacetraders.io/v2/my/agent', options);

    if (!response.ok) {
        const message = `An error occurred: ${response.status}`;
        throw new Error(message);
    }

    const json = await response.json();
    return json.data;
}
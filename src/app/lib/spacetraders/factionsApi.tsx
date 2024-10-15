
export interface Faction {
    symbol: string;
    name: string;
    description: string;
    headquarters: string;
    traits: {
        symbol: string;
        name: string;
        description: string;
    };
    isRecruiting: boolean;
}

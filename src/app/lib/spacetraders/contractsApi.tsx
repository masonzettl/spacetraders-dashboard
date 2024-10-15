import { ApiResponse, ErrorResponse, sendRequest } from "./baseApi";

export interface Contract {
    id: string;
    factionSymbol: string;
    type: "PROCUREMENT" | "TRANSPORT" | "SHUTTLE";
    terms: {
        deadline: string;
        payment: {
            onAccepted: number;
            onFulfilled: number;
        };
        deliver: [{
            tradeSymbol: string;
            destinationSymbol: string;
            unitsRequired: number;
            unitsFulfilled: number;
        }];
    };
    accepted: boolean;
    fulfilled: boolean;
    deadlineToAccept?: string;
}

type GetContractParameters = {
    limit?: number,
    page?: number
}

export function getContracts({ token, parameters }: { token: string, parameters?: GetContractParameters }): Promise<Contract[] | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/contracts
        ${parameters?.limit ? `?limit=${parameters.limit}` : ""}
        ${parameters?.page ? `?page=${parameters.page}` : ""}
    `;

    const response = sendRequest<Contract[]>({
        method: 'GET',
        token: token,
        url: url
    });

    return response;
}
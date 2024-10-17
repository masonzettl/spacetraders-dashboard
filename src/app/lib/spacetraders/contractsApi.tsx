import { Agent } from "./agentsApi";
import { ApiResponse, ErrorResponse, QueryParameters, sendRequest } from "./baseApi";

// ~ CONTRACT INTERFACES ~

// Contract details.
export interface Contract {
    id: string;
    factionSymbol: string;
    type: "PROCUREMENT" | "TRANSPORT" | "SHUTTLE";
    terms: ContractTerms;
    accepted: boolean;
    fulfilled: boolean;
    deadlineToAccept?: string;
}

// The terms to fulfill the contract.
export interface ContractTerms {
    deadline: string;
    payment: ContractPayment;
    deliver: ContractDeliverGood[];
}

// Payments for the contract.
export interface ContractPayment {
    onAccepted: number;
    onFulfilled: number;
}

// The details of a delivery contract. Includes the type of good, units needed, and the destination.
export interface ContractDeliverGood {
    tradeSymbol: string;
    destinationSymbol: string;
    unitsRequired: number;
    unitsFulfilled: number;
}

// ~ CONTRACT TYPES ~
type AcceptContractReponse = {
    agent: Agent,
    contract: Contract
}

// ~ CONTRACT REQUESTS ~

export function getContracts({ token, parameters }: { token: string, parameters?: QueryParameters }): Promise<Contract[] | ErrorResponse> {
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

export function acceptContract({ token, contract }: { token: string, contract: Contract }): Promise<AcceptContractReponse | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/contracts/${contract.id}/accept`;

    const response = sendRequest<AcceptContractReponse>({
        method: 'POST',
        token: token,
        url: url
    });

    return response;
}
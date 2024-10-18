import { Agent } from "./agentsApi";
import { ApiResponse, ErrorResponse, QueryParameters, sendRequest } from "./baseApi";

// ~ CONTRACT INTERFACES ~

// Contract details.
export interface Contract {
    id: string;
    factionSymbol: string;
    type: ContractType;
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

// ~ CONTRACT ENUMS ~
enum ContractType {
    "PROCUREMENT",
    "TRANSPORT",
    "SHUTTLE"
}

// ~ CONTRACT TYPES ~
type AcceptContractReponse = {
    agent: Agent,
    contract: Contract
}

// ~ CONTRACT REQUESTS ~

export async function getContracts({ token, parameters }: { token: string, parameters?: QueryParameters }): Promise<Contract[] | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/contracts
        ${parameters?.limit ? `?limit=${parameters.limit}` : ""}
        ${parameters?.page ? `?page=${parameters.page}` : ""}
    `;

    const response = await sendRequest<Contract[]>({
        method: 'GET',
        token: token,
        url: url
    });

    return response;
}

export async function acceptContract({ token, contract }: { token: string, contract: Contract }): Promise<AcceptContractReponse | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/contracts/${contract.id}/accept`;

    const response = await sendRequest<AcceptContractReponse>({
        method: 'POST',
        token: token,
        url: url
    });

    return response;
}
import { Agent } from "./agentsApi";
import { ErrorResponse, QueryParameters, sendRequest } from "./baseApi";
import { ShipCargo } from "./fleetApi";
import { TradeSymbol } from "./tradingApi";

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

interface UpdateContractResponse {
    agent: Agent,
    contract: Contract
}

interface NegotiateContractResponse {
    contract: Contract
}

export interface DeliverCargoParameters {
    shipSymbol: string,
    tradeSymbol: TradeSymbol,
    units: number
}

interface DeliverCargoResponse {
    contract: Contract,
    cargo: ShipCargo
}

// ~ CONTRACT ENUMS ~
enum ContractType {
    PROCUREMENT = "PROCUREMENT",
    TRANSPORT = "TRANSPORT",
    SHUTTLE = "SHUTTLE"
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

export async function acceptContract({ token, contract }: { token: string, contract: Contract }): Promise<UpdateContractResponse | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/contracts/${contract.id}/accept`;

    const response = await sendRequest<UpdateContractResponse>({
        method: 'POST',
        token: token,
        url: url
    });

    return response;
}

export async function deliverCargo({ token, contract, parameters }: { token: string, contract: Contract, parameters: DeliverCargoParameters }): Promise<DeliverCargoResponse | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/contracts/${contract.id}/deliver`;

    const response = await sendRequest<DeliverCargoResponse>({
        method: 'POST',
        token: token,
        parameters: parameters,
        url: url
    });

    return response;
}

export async function fulfillContract({ token, contract }: { token: string, contract: Contract }): Promise<UpdateContractResponse | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/contracts/${contract.id}/fulfill`;

    const response = await sendRequest<UpdateContractResponse>({
        method: 'POST',
        token: token,
        url: url
    });

    return response;
}

export async function negotiateContract({ token, shipSymbol }: { token: string, shipSymbol: string }): Promise<NegotiateContractResponse | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/negotiate/contract`;

    const response = await sendRequest<NegotiateContractResponse>({
        method: 'POST',
        token: token,
        url: url
    });

    return response;
}
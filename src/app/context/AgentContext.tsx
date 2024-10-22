import { createContext, Dispatch, SetStateAction } from "react";
import { Agent } from "../lib/spacetraders/agentsApi";

export interface AgentContextValue {
    agent: Agent,
    setAgent: Dispatch<SetStateAction<Agent>>
}

export const AgentContext = createContext<AgentContextValue>({} as AgentContextValue);
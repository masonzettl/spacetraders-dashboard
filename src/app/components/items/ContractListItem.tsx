import { Contract } from "@/app/lib/spacetraders/contractsApi";
import { MouseEventHandler, useContext } from "react";

export default function ContractListItem({ contract, onView }: { contract: Contract, onView: Function }) {
    return (
        <tr>
            <td>{contract.id}</td>
            <td>{contract.type}</td>
            <td>{contract.factionSymbol}</td>
            <td>{contract.accepted ? "In-Progress" : "Pending Approval"}</td>
            <td>
                <button onClick={() => onView(contract)} className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-1 rounded-md text-sm font-bold">View</button>
            </td>
        </tr>
    );
}
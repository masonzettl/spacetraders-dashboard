import { Contract } from "@/app/lib/spacetraders/contractsApi";

export default function ContractListItem({ contract, onView, className }: { contract: Contract, onView: Function, className?: string }) {
    let status;
    if (contract.accepted != true) status = "Pending Approval";
    else if (contract.fulfilled != true) status = "In-Progress";
    else status = "Fulfilled";

    return (
        <tr className={className ? className : ''}>
            <td className="px-2 py-1">{contract.id}</td>
            <td className="px-2 py-1">{contract.type}</td>
            <td className="px-2 py-1">{contract.factionSymbol}</td>
            <td className="px-2 py-1">{status}</td>
            <td className="px-2 py-1">
                <button onClick={() => onView(contract)} className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-1 rounded-md text-sm font-bold">View</button>
            </td>
        </tr>
    );
}
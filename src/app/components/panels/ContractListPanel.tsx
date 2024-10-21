import BasePanel from "./BasePanel";
import { Contract } from "@/app/lib/spacetraders/contractsApi";
import ContractListItem from "../items/ContractListItem";

export default function ContractListPanel({ contracts, onSelect, onNegotiate }: { contracts: Contract[], onSelect: Function, onNegotiate: Function }) {
  const negotiateFormSubmit = (data: FormData) => {
    const shipSymbol = data.get("shipSymbol");
    console.log(shipSymbol?.toString());
    if (shipSymbol != null) onNegotiate(shipSymbol.toString());
  }

  return (
    <BasePanel className="flex-initial w-1/2" title="Contract List">
      <div className="border border-gray-500 rounded-md overflow-x-scroll shadow-md">
        <table className="table-auto w-full divide-y divide-gray-600">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="px-2 py-1">Identifier</th>
              <th className="px-2 py-1">Contract Type</th>
              <th className="px-2 py-1">Faction</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {contracts.sort(compareContracts).map((contract, index) =>
              <ContractListItem key={contract.id} contract={contract} onView={onSelect}
              className={index % 2 == 0 ? 'bg-gray-700' : 'bg-gray-600'} />)
            }
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Negotiate Contract</h2>
        <form action={negotiateFormSubmit} className="mt-1">
          <input name="shipSymbol" type="text" placeholder="Ship Symbol" className="bg-gray-800 px-2 py-0.5 rounded-md me-2" required></input>
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-0.5 rounded-md font-bold">Submit</button>
        </form>
      </div>
    </BasePanel>
  );
}

function compareContracts(a: Contract, b: Contract): number {
  // Show non-fulfilled contracts first
  if (a.fulfilled < b.fulfilled) {
    return -1;
  }
  if (a.fulfilled > b.fulfilled) {
    return 1;
  }

  // If they have the fulfillment status, then sort by closest deadline
  const deadlineA = a.terms.deadline;
  const deadlineB = b.terms.deadline;

  if (deadlineA < deadlineB) {
    return -1;
  }
  if (deadlineA > deadlineB) {
    return 1;
  }

  // Otherwise, they have the same fulfillment status and have the exact same deadline
  return 0;
}
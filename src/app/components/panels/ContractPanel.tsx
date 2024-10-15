import { Contract } from "@/app/lib/spacetraders/contractsApi";
import BasePanel from "./BasePanel";
import Moment from "react-moment";

export default function ContractPanel({ contract }: { contract: Contract }) {
  return (
    <BasePanel className="flex-initial w-[40%]">
      <h1 className="text-2xl font-bold mb-1">Contract <span className="text-gray-400 text-lg font-normal">{contract.id}</span></h1>
      <ul className="space-y-0.5">
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Identifier
          </div>
          <div className="content-center">
            {contract.id}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Type
          </div>
          <div className="content-center">
            {contract.type}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Faction
          </div>
          <div className="content-center">
            {contract.factionSymbol}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Status
          </div>
          <div className="content-center">
            {contract.accepted ? "In-Propress" : "Pending Approval"}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Deadline
          </div>
          <div className="content-center">
            <Moment date={contract.terms?.deadline} fromNow />
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5 h-max">
            Payments
          </div>
          <div className="pt-0.5 text-right">
            <div>
              {contract.terms?.payment.onAccepted.toLocaleString()} (On Acceptance)
            </div>
            <div>
              {contract.terms?.payment.onFulfilled.toLocaleString()} (On Fulfillment)
            </div>
          </div>
        </li>
      </ul>
    </BasePanel>
  );
}
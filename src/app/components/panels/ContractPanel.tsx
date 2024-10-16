import BasePanel from "./BasePanel";
import Moment from "react-moment";
import { acceptContract, Contract } from "@/app/lib/spacetraders/contractsApi";
import { toProperCase } from "@/app/lib/util";
import { useContext } from "react";
import { TokenContext } from "@/app/context/TokenContext";

export default function ContractPanel({ contract, updateContractCallback }: { contract: Contract, updateContractCallback?: Function }) {
  const token = useContext(TokenContext);

  const onAccept = async () => {
    const response = await acceptContract({ token: token, contract: contract });

    if ('contract' in response) {
      contract = response.contract
      if (updateContractCallback) updateContractCallback(contract);
    }
  }

  return (
    <BasePanel className="flex-initial w-[40%]">
      <h1 className="text-2xl font-bold mb-1">{contract.factionSymbol}: {toProperCase(contract.type)} Contract</h1>
      <ul className="space-y-0.5">
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Identifier
          </div>
          <div className="bg-gray-800 px-2 py-0.5">
            {contract.id}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Type
          </div>
          <div className="bg-gray-800 px-2 py-0.5">
            {contract.type}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Faction
          </div>
          <div className="bg-gray-800 px-2 py-0.5">
            {contract.factionSymbol}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Status
          </div>
          <div className="bg-gray-800 px-2 py-0.5">
            {contract.accepted ? "In-Progress" : "Pending Approval"}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Deliver
          </div>
          <div className="bg-gray-800 px-2 py-0.5">
            {contract.terms?.deliver.map((delivery) =>
              <div>
                {delivery.unitsRequired} {delivery.tradeSymbol} to {delivery.destinationSymbol} {contract.accepted ? `(${delivery.unitsRequired - delivery.unitsFulfilled} Remaining)` : ""}
              </div>
            )}
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5">
            Deadline
          </div>
          <div className="bg-gray-800 px-2 py-0.5">
            <Moment date={contract.terms?.deadline} fromNow />
          </div>
        </li>
        <li className="flex justify-between">
          <div className="font-bold bg-gray-600 px-2 py-0.5 h-max">
            Payments
          </div>
          <div className="bg-gray-800 px-2 py-0.5 text-right">
            <div>
              {contract.terms?.payment.onAccepted.toLocaleString()} (On Acceptance)
            </div>
            <div>
              {contract.terms?.payment.onFulfilled.toLocaleString()} (On Fulfillment)
            </div>
          </div>
        </li>
        {!contract.accepted ?
          <li className="flex justify-between">
            <div className="font-bold bg-gray-600 px-2 py-0.5">
              Deadline to Accept
            </div>
            <div className="bg-gray-800 px-2 py-0.5">
              <Moment date={contract.deadlineToAccept} fromNow />
            </div>
          </li>
          : <></>
        }
      </ul>

      <div className="mt-2 flex flex-row space-x-2 justify-end">
        {!contract.accepted ? <button onClick={() => onAccept()} className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-0.5 rounded-md font-bold">Accept</button> : null}
      </div>
    </BasePanel>
  );
}
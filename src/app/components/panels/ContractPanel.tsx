import BasePanel from "./BasePanel";
import Moment from "react-moment";
import { acceptContract, Contract } from "@/app/lib/spacetraders/contractsApi";
import { toProperCase } from "@/app/lib/util";
import { ReactNode, useContext } from "react";
import { TokenContext } from "@/app/context/TokenContext";
import PanelList from "../PanelList";
import PanelListItem from "../items/PanelListItem";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function ContractPanel({ contract, updateContractCallback }: { contract: Contract, updateContractCallback: Function }) {
  const token = useContext(TokenContext);

  const onAccept = async () => {
    const response = await acceptContract({ token: token, contract: contract });

    if ('contract' in response) {
      updateContractCallback(contract);
    }
  }

  const noContractElement = (
    <BasePanel className="flex-initial w-2/5">
      <div className="text-gray-400 text-center flex flex-col justify-center items-center h-full">
        <ExclamationCircleIcon className="size-10" />
        <span className="w-1/2">Select a contract to view more details.</span>
      </div>
    </BasePanel>
  );

  if (Object.keys(contract).length == 0) {
    return noContractElement;
  }

  return (
    <BasePanel title={`${contract.factionSymbol}: ${toProperCase(contract.type)} Contract`} className="flex-initial w-2/5 transition-transform">
      <PanelList>
        <PanelListItem key="identifier" title="Identifier">
          {contract.id}
        </PanelListItem>
        <PanelListItem key="type" title="Type">
          {contract.type}
        </PanelListItem>
        <PanelListItem key="faction" title="Faction">
          {contract.factionSymbol}
        </PanelListItem>
        <PanelListItem key="status" title="Status">
          {contract.accepted ? "In-Progress" : "Pending Approval"}
        </PanelListItem>
        <PanelListItem key="deliver" title="Deliver">
          {contract.terms?.deliver.map((delivery) =>
            <div>
              {delivery.unitsRequired} {delivery.tradeSymbol} to {delivery.destinationSymbol} {contract.accepted ? `(${delivery.unitsRequired - delivery.unitsFulfilled} Remaining)` : ""}
            </div>
          )}
        </PanelListItem>
        <PanelListItem key="deadline" title="Deadline">
          <Moment date={contract.terms?.deadline} fromNow />
        </PanelListItem>
        <PanelListItem key="payments" title="Payments">
          <div>
            {contract.terms?.payment.onAccepted.toLocaleString()} (On Acceptance)
          </div>
          <div>
            {contract.terms?.payment.onFulfilled.toLocaleString()} (On Fulfillment)
          </div>
        </PanelListItem>
        {!contract.accepted ?
          <PanelListItem key="deadlineToAccept" title="Deadline to Accept">
            <Moment date={contract.deadlineToAccept} fromNow />
          </PanelListItem>
          : <></>
        }
      </PanelList>

      <div className="mt-2 flex flex-row space-x-2 justify-end">
        {!contract.accepted ? <button onClick={() => onAccept()} className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-0.5 rounded-md font-bold">Accept</button> : null}
      </div>
    </BasePanel>
  );
}
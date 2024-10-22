import BasePanel from "./BasePanel";
import Moment from "react-moment";
import { Contract, DeliverCargoParameters } from "@/app/lib/spacetraders/contractsApi";
import { toProperCase } from "@/app/lib/util";
import PanelList from "../PanelList";
import PanelListItem from "../items/PanelListItem";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";
import { useState } from "react";
import { TradeSymbol } from "@/app/lib/spacetraders/tradingApi";

export default function ContractPanel({ contract, onAccept, onFulfill, onDeliver }: { contract: Contract, onAccept: Function, onFulfill: Function, onDeliver: Function }) {
  const [showDeliverModal, setShowDeliverModal] = useState(false);

  const noContractElement = (
    <BasePanel className="flex-initial w-1/2">
      <div className="text-gray-400 text-center flex flex-col justify-center items-center h-full">
        <ExclamationCircleIcon className="size-10" />
        <span className="w-1/2">Select a contract to view more details.</span>
      </div>
    </BasePanel>
  );

  const deliverCargoFormSubmit = async (data: FormData) => {
    const shipSymbol = data.get("shipSymbol")?.toString();
    const tradeSymbol = data.get("tradeSymbol")?.toString();
    const quantity = data.get("quantity")?.toString();

    if (shipSymbol == undefined || tradeSymbol == undefined || quantity == undefined) return;

    const parameters: DeliverCargoParameters = {
      shipSymbol: shipSymbol,
      tradeSymbol: tradeSymbol as unknown as TradeSymbol,
      units: parseInt(quantity)
    }

    await onDeliver(parameters);

    setShowDeliverModal(false);
  }

  if (Object.keys(contract).length == 0) {
    return noContractElement;
  }

  let status;
  if (contract.accepted != true) status = "Pending Approval";
  else if (contract.fulfilled != true) status = "In-Progress";
  else status = "Fulfilled";

  return (
    <BasePanel title={`${contract.factionSymbol}: ${toProperCase(contract.type)} Contract`} className="flex-initial w-1/2 transition-transform">
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
          {status}
        </PanelListItem>
        <PanelListItem key="deliver" title="Deliver">
          {contract.terms?.deliver.map((delivery) =>
            <div key={delivery.tradeSymbol}>
              {delivery.unitsRequired} {delivery.tradeSymbol} to {delivery.destinationSymbol} {contract.accepted ? `(${delivery.unitsRequired - delivery.unitsFulfilled} Remaining)` : ""}
            </div>
          )}
        </PanelListItem>
        <PanelListItem key="payments" title="Payments">
          <div>
            {contract.terms?.payment.onAccepted.toLocaleString()} (On Acceptance)
          </div>
          <div>
            {contract.terms?.payment.onFulfilled.toLocaleString()} (On Fulfillment)
          </div>
        </PanelListItem>
        <PanelListItem key="deadline" title="Deadline">
          <Moment date={contract.terms?.deadline} fromNow />
        </PanelListItem>
        {!contract.accepted ?
          <PanelListItem key="deadlineToAccept" title="Deadline to Accept">
            <Moment date={contract.deadlineToAccept} fromNow />
          </PanelListItem>
          : <></>
        }
      </PanelList>

      <Modal open={showDeliverModal} onClose={() => setShowDeliverModal(false)}>
        <div className="w-96">
          <h1 className="text-2xl font-bold">Deliver Cargo</h1>
          <h2 className="text-gray-300">Deliver the specified cargo to its destination.</h2>
          <form action={deliverCargoFormSubmit} className="mt-4">
            <div className="flex flex-col space-y-1 bg-gray-600 px-2 py-2 rounded-lg border border-gray-500 shadow-md">
              <label>
                <span className="font-semibold">Ship Symbol:</span>
                <input name="shipSymbol" type="text" placeholder="Ship Symbol" className="bg-gray-800 px-2 py-0.5 rounded-md ms-2" required></input> 
              </label>
              <label>
                <span className="font-semibold">Trade Symbol:</span>
                <select name="tradeSymbol" className="bg-gray-800 px-2 py-1 rounded-md ms-2" required>
                  {contract.terms.deliver.map(good => 
                    <option key={good.tradeSymbol} value={good.tradeSymbol}>{good.tradeSymbol}</option>
                  )}
                </select>
              </label>
              <label>
                <span className="font-semibold">Quantity:</span>
                <input name="quantity" type="number" min="0" defaultValue="0" className="bg-gray-800 px-2 py-0.5 rounded-md ms-2" required></input>
              </label>
            </div>
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-1 rounded-md font-bold mt-4">Deliver</button>
          </form>
        </div>
      </Modal>

      <div className="mt-2 flex flex-row space-x-2 justify-end">
        {!contract.accepted ? <button onClick={() => onAccept()} className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-0.5 rounded-md font-bold">Accept</button> : null}
        {contract.accepted && !contract.fulfilled ? <button onClick={() => setShowDeliverModal(true)} className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-0.5 rounded-md font-bold">Deliver</button>: null}
        {!contract.fulfilled && contract.accepted ? <button onClick={() => onFulfill()} className="bg-cyan-600 hover:bg-cyan-700 transition-colors px-2 py-0.5 rounded-md font-bold">Fulfill</button> : null}
      </div>
    </BasePanel>
  );
}
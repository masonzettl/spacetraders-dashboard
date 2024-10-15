import { Agent } from "../lib/spacetraders/agentsApi";
import WaypointPanel from "../components/panels/WaypointPanel";
import BasePanel from "../components/panels/BasePanel";

export default function Overview({ agent }: { agent: Agent }) {
  return (
    <>
      <h1 className="text-5xl font-bold my-4">Overview</h1>

      <div className="flex space-x-4">
        <BasePanel className="w-[20%]">
          <h1 className="text-2xl font-bold mb-2">Agent Details</h1>
          <ul>
            <li className="flow-root">
              <div className="float-left font-bold">
                Account ID
              </div>
              <div className="float-right">
                {agent.accountId}
              </div>
            </li>
            <li className="flow-root">
              <div className="float-left font-bold">
                Headquarters
              </div>
              <div className="float-right">
                {agent.headquarters}
              </div>
            </li>
            <li className="flow-root">
              <div className="float-left font-bold">
                Credits
              </div>
              <div className="float-right">
                {agent.credits?.toLocaleString(undefined, { maximumFractionDigits: 2 })} {/* toLocale breaks format if passed undefined value */}
              </div>
            </li>
            <li className="flow-root">
              <div className="float-left font-bold">
                Starting Faction
              </div>
              <div className="float-right">
                {agent.startingFaction}
              </div>
            </li>
            <li className="flow-root">
              <div className="float-left font-bold">
                Ship Count
              </div>
              <div className="float-right">
                {agent.shipCount}
              </div>
            </li>
          </ul>
        </BasePanel>

        {agent.headquarters ? <WaypointPanel symbol={agent.headquarters} /> : <></>}
      </div>
    </>
  );
}
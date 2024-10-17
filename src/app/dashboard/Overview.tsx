import { Agent } from "../lib/spacetraders/agentsApi";
import WaypointPanel from "../components/panels/WaypointPanel";
import BasePanel from "../components/panels/BasePanel";
import FactionPanel from "../components/panels/FactionPanel";
import PanelList from "../components/PanelList";
import PanelListItem from "../components/items/PanelListItem";

export default function Overview({ agent }: { agent: Agent }) {
  return (
    <>
      <h1 className="text-5xl font-bold my-4">Overview</h1>

      <div className="flex space-x-4">
        <BasePanel title="Agent Details" className="w-[20%]">
          <PanelList>
            <PanelListItem key="id" title="ID">
              {agent.accountId}
            </PanelListItem>
            <PanelListItem key="headquarters" title="Headquarters">
              {agent.headquarters}
            </PanelListItem>
            <PanelListItem key="credits" title="Credits">
              {agent.credits?.toLocaleString(undefined, { maximumFractionDigits: 2 })} {/* toLocale breaks format if passed undefined value */}
            </PanelListItem>
            <PanelListItem key="startingFaction" title="Starting Faction">
              {agent.startingFaction}
            </PanelListItem>
            <PanelListItem key="shipCount" title="Ship Count">
              {agent.shipCount}
            </PanelListItem>
          </PanelList>
        </BasePanel>

        {agent.headquarters ? <WaypointPanel symbol={agent.headquarters} /> : <></>}

        {agent.headquarters ? <FactionPanel symbol={agent.startingFaction} /> : <></>}
      </div>
    </>
  );
}
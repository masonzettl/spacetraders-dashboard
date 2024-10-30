import { Agent } from "../lib/spacetraders/agentsApi";
import WaypointPanel from "../components/panels/WaypointPanel";
import BasePanel from "../components/panels/BasePanel";
import FactionPanel from "../components/panels/FactionPanel";
import PanelList from "../components/PanelList";
import PanelListItem from "../components/items/PanelListItem";
import { useContext } from "react";
import { AgentContext } from "../context/AgentContext";
import SystemPanel from "../components/panels/SystemPanel";

export default function Explore() {
  const agentContext = useContext(AgentContext);
  const agent = agentContext.agent;

  return (
    <>
      <h1 className="text-5xl font-bold my-4">Explore</h1>

      <div className="flex space-x-4">
        {agent.headquarters ? <SystemPanel symbol={agent.headquarters.split('-', 2).join('-')} /> : <></>}

        {agent.headquarters ? <WaypointPanel symbol={agent.headquarters} /> : <></>}
      </div>
    </>
  );
}
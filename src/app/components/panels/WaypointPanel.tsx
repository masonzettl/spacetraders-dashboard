import { useContext, useEffect, useState } from "react"
import { getWaypointInfo } from "@/app/lib/spacetraders/systemsApi";
import { Waypoint } from "@/app/lib/spacetraders/systemsApi";
import { TokenContext } from "../../context/TokenContext"
import Tooltip from "../Tooltip";
import BasePanel from "./BasePanel";
import PanelList from "../PanelList";
import PanelListItem from "../items/PanelListItem";

export default function WaypointPanel({ symbol }: { symbol: string }) {
  const token = useContext(TokenContext);

  const [waypointData, setWaypointData] = useState({} as Waypoint);

  useEffect(() => {
    // Async cannot be used in the useEffect itself, so we define an async function inside of it as a workaround
    const fetchData = async () => {
      const data = await getWaypointInfo(token, symbol);

      if ('symbol' in data)
        setWaypointData(data);
    }

    fetchData();
  }, [token]);

  return (
    <BasePanel title={`Waypoint ${waypointData.symbol}`} className="w-[20%]">
      <PanelList>
        <PanelListItem key="type" title="Type">
          {waypointData.type}
        </PanelListItem>
        <PanelListItem key="system" title="System">
          {waypointData.systemSymbol}
        </PanelListItem>
        <PanelListItem key="faction" title="Faction">
          {waypointData.faction?.symbol}
        </PanelListItem>
        <PanelListItem key="traits" title="Traits">
          <ul className="list-none p-0 m-0">
            {waypointData.traits?.map(trait =>
              <li key={trait.symbol} className="flex justify-end w-full">
                <Tooltip text={trait.description}>
                  {trait.name}
                </Tooltip>
              </li>)}
          </ul>
        </PanelListItem>
      </PanelList>
    </BasePanel>
  )
}
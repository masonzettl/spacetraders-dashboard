import { useContext, useEffect, useState } from "react"
import { getWaypointInfo } from "@/app/lib/spacetraders/systemsApi";
import { Waypoint } from "@/app/lib/spacetraders/systemsApi";
import { TokenContext } from "../../context/TokenContext"
import Tooltip from "../Tooltip";
import BasePanel from "./BasePanel";

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
        <BasePanel className="w-[20%]">
            <h1 className="text-2xl font-bold mb-1">Waypoint {waypointData.symbol}</h1>
            <ul>
                <li className="flex justify-between">
                    <div className="font-bold">
                        Type
                    </div>
                    {waypointData.type}
                </li>
                <li className="flex justify-between">
                    <div className="font-bold">
                        System
                    </div>
                    {waypointData.systemSymbol}
                </li>
                <li className="flex justify-between">
                    <div className="font-bold">
                        Faction
                    </div>
                    {waypointData.faction?.symbol}
                </li>
                <li className="flex justify-between">
                    <div className="font-bold">
                        Traits
                    </div>
                    <div>
                        <ul className="list-none p-0 m-0">
                            {waypointData.traits?.map(trait =>
                                <li key={trait.symbol} className="flex justify-end w-full">
                                    <Tooltip text={trait.description}>
                                        {trait.name}
                                    </Tooltip>
                                </li>)}
                        </ul>
                    </div>
                </li>
            </ul>
        </BasePanel>
    )
}
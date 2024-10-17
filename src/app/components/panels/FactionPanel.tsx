import { TokenContext } from "@/app/context/TokenContext";
import { Faction, FactionSymbol, getFaction } from "@/app/lib/spacetraders/factionsApi";
import { useContext, useEffect, useState } from "react";
import BasePanel from "./BasePanel";
import { toProperCase } from "@/app/lib/util";
import PanelList from "../PanelList";
import PanelListItem from "../items/PanelListItem";
import Tooltip from "../Tooltip";

export default function FactionPanel({ symbol }: { symbol: FactionSymbol }) {
  const token = useContext(TokenContext);

  const [factionData, setFactionData] = useState({} as Faction);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFaction({ token: token, factionSymbol: symbol });

      if ('symbol' in data) {
        setFactionData(data);
      }
    }

    fetchData();
  }, [token]);

  return (
    <BasePanel title={`${factionData.name} Faction`} className="w-2/5">
      <PanelList>
        <PanelListItem key="symbol" title="Symbol">
          {factionData.symbol}
        </PanelListItem>
        <PanelListItem key="name" title="Name">
          {factionData.name}
        </PanelListItem>
        <PanelListItem key="description" title="Description">
          {factionData.description}
        </PanelListItem>
        <PanelListItem key="headquarters" title="Headquarters">
          {factionData.headquarters}
        </PanelListItem>
        <PanelListItem key="traits" title="Traits">
          <ul className="list-none p-0 m-0">
            {factionData.traits?.map(trait =>
              <li key={trait.symbol} className="flex justify-end w-full">
                <Tooltip text={trait.description}>
                  {trait.name}
                </Tooltip>
              </li>)}
          </ul>
        </PanelListItem>
        <PanelListItem key="isRecruiting" title="Is Recruiting">
          {factionData.isRecruiting ? "True" : "False"}
        </PanelListItem>
      </PanelList>
    </BasePanel>
  );
}
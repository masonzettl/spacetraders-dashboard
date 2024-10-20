import { TokenContext } from "@/app/context/TokenContext";
import { getMarket, Market, MarketTradeGoodType, TradeGood } from "@/app/lib/spacetraders/tradingApi";
import { useContext, useEffect, useState } from "react";
import BasePanel from "./BasePanel";
import TradeGoodItem from "../items/TradeGoodItem";

export default function MarketPanel({ systemSymbol, waypointSymbol }: { systemSymbol: string, waypointSymbol: string }) {
  const token = useContext(TokenContext);

  const [market, setMarket] = useState({} as Market);
  const [tradeType, setTradeType] = useState(MarketTradeGoodType.EXPORT);
  const [tradeGoods, setTradeGoods] = useState([] as TradeGood[]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMarket({ token: token, systemSymbol: systemSymbol, waypointSymbol: waypointSymbol });

      if ('symbol' in data) {
        setMarket(data);
        console.log(data);
      }
    }

    fetchData();
  }, [waypointSymbol]);

  useEffect(() => {
    switch (tradeType) {
      case MarketTradeGoodType.EXPORT:
        setTradeGoods(market.exports);
        break;
      case MarketTradeGoodType.IMPORT:
        setTradeGoods(market.imports);
        break;
      case MarketTradeGoodType.EXCHANGE:
        setTradeGoods(market.exchange);
    }
  }, [tradeType])

  return (
    <BasePanel title={`${waypointSymbol} Marketplace`} className="w-[70%]">
      <div className="flex space-x-1 my-2">
        <button onClick={() => setTradeType(MarketTradeGoodType.EXPORT)} className={`${tradeType == MarketTradeGoodType.EXPORT ? 'bg-cyan-600' : 'bg-gray-900 hover:bg-cyan-600'} transition-colors px-3 py-1 rounded-3xl font-bold`}>Exports</button>
        <button onClick={() => setTradeType(MarketTradeGoodType.IMPORT)} className={`${tradeType == MarketTradeGoodType.IMPORT ? 'bg-cyan-600' : 'bg-gray-900 hover:bg-cyan-600'} transition-colors px-3 py-1 rounded-3xl font-bold`}>Imports</button>
        <button onClick={() => setTradeType(MarketTradeGoodType.EXCHANGE)} className={`${tradeType == MarketTradeGoodType.EXCHANGE ? 'bg-cyan-600' : 'bg-gray-900 hover:bg-cyan-600'} transition-colors px-3 py-1 rounded-3xl font-bold`}>Exchange</button>
      </div>

      {/* <div className="grid grid-cols-3 gap-2">
        {tradeGoods?.map(tradeGood => (
          <TradeGoodItem key={tradeGood.symbol} tradeGood={tradeGood} />
        ))}
      </div> */}

      <div className="border border-gray-500 rounded-md overflow-hidden shadow-md">
        <table className="w-full divide-y divide-gray-600">
          <thead className="bg-gray-800 text-left">
            <th className="px-2 py-1">Symbol</th>
            <th className="px-2 py-1">Trade Volume</th>
            <th className="px-2 py-1">Activity</th>
            <th className="px-2 py-1">Supply</th>
            <th className="px-2 py-1">Buy Price</th>
            <th className="px-2 py-1">Sell Price</th>
          </thead>
          <tbody>
            {market.tradeGoods?.filter(tradeGood => tradeGood.type == tradeType).map((tradeGood, index) => (
              <tr key={index} className={index % 2 == 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                <td className="px-2 py-1">{tradeGood.symbol}</td>
                <td className="px-2 py-1">{tradeGood.tradeVolume}</td>
                <td className="px-2 py-1">{tradeGood.activity}</td>
                <td className="px-2 py-1">{tradeGood.supply}</td>
                <td className="px-2 py-1">{tradeGood.purchasePrice.toLocaleString()}</td>
                <td className="px-2 py-1">{tradeGood.sellPrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BasePanel>
  );
}
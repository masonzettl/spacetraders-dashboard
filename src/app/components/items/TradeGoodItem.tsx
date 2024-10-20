import { TradeGood } from "@/app/lib/spacetraders/tradingApi";
import BasePanel from "../panels/BasePanel";

export default function TradeGoodItem({ tradeGood }: { tradeGood: TradeGood }) {
  return (
    <BasePanel className="bg-gray-800 bg-opacity-50">
      <h1 className="text-lg font-bold">{tradeGood.name}</h1>
      <p>{tradeGood.description}</p>
    </BasePanel>
  );
}
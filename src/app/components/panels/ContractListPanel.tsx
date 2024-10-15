import { useContext, useEffect, useState } from "react";
import { TokenContext } from "@/app/context/TokenContext";
import BasePanel from "./BasePanel";
import { Contract, getContracts } from "@/app/lib/spacetraders/contractsApi";
import ContractListItem from "../items/ContractListItem";

export default function ContractListPanel({ onSelect }: { onSelect: Function }) {
  const token = useContext(TokenContext);

  const [contracts, setContracts] = useState([] as Contract[]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContracts({ token: token });

      if (Array.isArray(data)) {
        setContracts(data);
      }
    }

    fetchData();
  }, [token]);

  return (
    <BasePanel className="flex-initial w-[60%]">
      <table className="table-auto w-full">
        <thead className="text-left">
          <tr>
            <th>Identifier</th>
            <th>Contract Type</th>
            <th>Faction</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => <ContractListItem key={contract.id} contract={contract} onView={(contract: Contract) => onSelect(contract)} />)}
        </tbody>
      </table>
    </BasePanel>
  );
}
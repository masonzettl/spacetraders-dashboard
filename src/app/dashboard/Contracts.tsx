import { useState } from "react";
import ContractListPanel from "../components/panels/ContractListPanel";
import { Contract } from "../lib/spacetraders/contractsApi";
import ContractPanel from "../components/panels/ContractPanel";

export default function Contracts() {
  const [currentContract, setCurrentContract] = useState({} as Contract);

  return (
    <>
      <h1 className="text-5xl font-bold my-4">Contracts</h1>

      <div className="flex space-x-4">
        <ContractListPanel onSelect={(contract: Contract) => setCurrentContract(contract)} />
        <ContractPanel contract={currentContract} updateContractCallback={(contract: Contract) => setCurrentContract(contract)} />
      </div>
    </>
  );
}
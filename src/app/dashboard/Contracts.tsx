import { useContext, useEffect, useState } from "react";
import ContractListPanel from "../components/panels/ContractListPanel";
import { acceptContract, Contract, fulfillContract, getContracts, negotiateContract } from "../lib/spacetraders/contractsApi";
import ContractPanel from "../components/panels/ContractPanel";
import { TokenContext } from "../context/TokenContext";

export default function Contracts() {
  const token = useContext(TokenContext);

  const [contracts, setContracts] = useState([] as Contract[]);
  const [selectedContract, setSelectedContract] = useState({} as Contract);

  // Fetch agent's contracts when token is set
  useEffect(() => {
    const fetchData = async () => {
      const data = await getContracts({ token: token });

      if (Array.isArray(data)) {
        setContracts(data);
      }
    }

    fetchData();
  }, [token]);

  // Update the selected contract if the contracts list has been updated
  useEffect(() => {
    const newSelectedContract = contracts.find(contract => contract.id == selectedContract.id);
    if (newSelectedContract != undefined) setSelectedContract(newSelectedContract);
  }, [contracts]);

  const updateContract = (contract: Contract) => {
    // Copy the current contracts state
    const newContracts = [...contracts];

    // Attempt to find the contract in the array using its ID
    const existingIndex = newContracts.findIndex(c => c.id == contract.id);
    
    // If the ID was found, update the existing entry
    if (existingIndex != -1) newContracts[existingIndex] = contract;
    // Otherwise, add it to the list
    else newContracts.push(contract);

    // Update the contracts state with the new content
    setContracts(newContracts);
  }

  const negotiateContractCallback = async (shipSymbol: string) => {
    const data = await negotiateContract({ token: token, shipSymbol: shipSymbol });

    if ('contract' in data)
      updateContract(data.contract);
  }

  const acceptContractCallback = async () => {
    const data = await acceptContract({ token, contract: selectedContract });

    if ('contract' in data)
      updateContract(data.contract);
  }

  const fulfillContractCallback = async () => {
    const data = await fulfillContract({ token: token, contract: selectedContract });

    if ('contract' in data)
      updateContract(data.contract);
  }

  return (
    <>
      <h1 className="text-5xl font-bold my-4">Contracts</h1>

      <div className="flex space-x-4">
        <ContractListPanel contracts={contracts} onSelect={setSelectedContract} onNegotiate={negotiateContractCallback} />
        <ContractPanel contract={selectedContract} onAccept={acceptContractCallback} onFulfill={fulfillContractCallback} />
      </div>
    </>
  );
}
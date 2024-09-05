"use client"; // This is a client component

import { useEffect, useState } from "react";
import { getAgentDetails, AgentDetails } from "../lib/spacetraders";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const cookies = useCookies();

  const token = cookies.get("token") || "";

  if (token == "") {
    redirect("/");
  }

  const [agentDetails, setAgentDetails] = useState({} as AgentDetails);
  
  useEffect(() => {
    // Async cannot be used in the useEffect itself, so we define an async function inside of it as a workaround
    const fetchData = async () => {
      const result = await getAgentDetails(token);

      console.log(result);

      setAgentDetails(result);
    }

    fetchData();
  }, []);

  return (
    <main className="text-white px-10">
      <section className="h-screen">
        <nav className="px-4 py-3 mt-1 mb-2 rounded-xl flex justify-between bg-gray-800">
          <h1 className="text-xl">SpaceTraders Dashboard</h1>
          <ul className="flex items-center">
            <li>
              {agentDetails.symbol}
            </li>
          </ul>
        </nav>

        <h1 className="text-5xl font-bold my-4">Overview</h1>

        <div className="flex">
          <div className="flex-auto max-w-fit bg-gray-800 px-4 py-2 rounded-lg">
            <h1 className="text-2xl font-bold mb-1">Agent Details</h1>
            <ul>
              <li>Account ID: {agentDetails.accountId}</li>
              <li>Headquarters: {agentDetails.headquarters}</li>
              <li>Credits: {agentDetails.credits?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</li> {/* toLocale breaks format if passed undefined value */}
              <li>Starting Faction: {agentDetails.startingFaction}</li>
              <li>Ship Count: {agentDetails.shipCount}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

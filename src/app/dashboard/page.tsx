"use client"; // This is a client component

import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import ArrowRightStartOnRectangleIcon from "@heroicons/react/24/outline/esm/ArrowRightStartOnRectangleIcon";
import { getAgent } from "../lib/spacetraders/agentsApi";
import { Agent } from "../lib/spacetraders/agentsApi";
import { TokenContext } from "../context/TokenContext";
import Overview from "./Overview";
import Contracts from "./Contracts";
import Trading from "./Trading";
import { AgentContext } from "../context/AgentContext";

enum Tab {
  Overview,
  Contracts,
  Trading
}

export default function Dashboard() {
  const cookies = useCookies();

  const token = cookies.get("token") || "";

  if (token == "") {
    redirect("/");
  }
  
  const [agentDetails, setAgentDetails] = useState({} as Agent);
  const [currentTab, setCurrentTab] = useState(Tab.Overview);
  
  useEffect(() => {
    // Async cannot be used in the useEffect itself, so we define an async function inside of it as a workaround
    const fetchData = async () => {
      const agent = await getAgent(token);

      if ('accountId' in agent)
        setAgentDetails(agent);
    }

    fetchData();
  }, [cookies]);

  function logout() {
    cookies.remove("token");
    redirect("/");
  }

  const renderTab = () => {
    switch(currentTab) {
      case Tab.Overview : return <Overview />
      case Tab.Contracts : return <Contracts />
      case Tab.Trading : return <Trading waypointSymbol={agentDetails.headquarters} />
    }
  }

  return (
    <TokenContext.Provider value={token}>
      <AgentContext.Provider value={{ agent: agentDetails, setAgent: setAgentDetails }}>
        <main className="text-white h-screen px-10 pt-1">
          <section>
            <nav className="px-4 py-3 mb-2 rounded-xl flex justify-between bg-gray-950 shadow-md">
              <div className="flex items-center space-x-6">
                <h1 className="text-xl">SpaceTraders Dashboard</h1>
                <ul className="flex space-x-2">
                  <li className={currentTab == Tab.Overview ? "text-cyan-300 underline" : "text-gray-400 hover:text-white transition-colors"}>
                    <a onClick={() => setCurrentTab(Tab.Overview)} className="font-semibold">Overview</a>
                  </li>
                  <li className={currentTab == Tab.Contracts ? "text-cyan-300 underline" : "text-gray-400 hover:text-white transition-colors"}>
                    <a onClick={() => setCurrentTab(Tab.Contracts)} className="font-semibold">Contracts</a>
                  </li>
                  <li className={currentTab == Tab.Trading ? "text-cyan-300 underline" : "text-gray-400 hover:text-white transition-colors"}>
                    <a onClick={() => setCurrentTab(Tab.Trading)} className="font-semibold">Trading</a>
                  </li>
                </ul>
              </div>
              <ul className="flex items-center space-x-2">
                <li className="flex flex-col text-right">
                  <span className="text-xs text-gray-300">{agentDetails?.symbol}</span>
                  <span className="text-sm">${agentDetails?.credits?.toLocaleString()}</span>
                </li>
                <li>
                  <button className="flex items-center" onClick={logout}>
                    <ArrowRightStartOnRectangleIcon className="size-6 stroke-white hover:stroke-red-500 transition-colors duration-200" />
                  </button>
                </li>
              </ul>
            </nav>

            {renderTab()}
          </section>
        </main>
      </AgentContext.Provider>
    </TokenContext.Provider>
  );
}

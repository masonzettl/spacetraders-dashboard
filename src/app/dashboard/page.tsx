"use client"; // This is a client component

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { getAgentDetails, AgentDetails, getWaypointInfo, Waypoint } from "../lib/spacetraders";
import logoutIcon from "../../../public/logout-arrow.svg";
import Tooltip from "../components/Tooltip";

export default function Dashboard() {
  const cookies = useCookies();

  const token = cookies.get("token") || "";

  if (token == "") {
    redirect("/");
  }

  const [agentDetails, setAgentDetails] = useState({} as AgentDetails);
  const [startingLocation, setStartingLocation] = useState({} as Waypoint);
  
  useEffect(() => {
    // Async cannot be used in the useEffect itself, so we define an async function inside of it as a workaround
    const fetchData = async () => {
      const agent = await getAgentDetails(token);

      const headquartersWaypoint = await getWaypointInfo(token, agent.headquarters);

      console.log(headquartersWaypoint);

      setAgentDetails(agent);
      setStartingLocation(headquartersWaypoint);
    }

    fetchData();
  }, []);

  function logout() {
    cookies.remove("token");
    redirect("/");
  }

  return (
    <main className="text-white px-10">
      <section className="h-screen">
        <nav className="px-4 py-3 mt-1 mb-2 rounded-xl flex justify-between bg-gray-950 shadow-md">
          <h1 className="text-xl">SpaceTraders Dashboard</h1>
          <ul className="flex items-center space-x-2">
            <li>
              {agentDetails?.symbol}
            </li>
            <li>
              <button className="flex items-center" onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-white hover:stroke-red-500 transition-colors duration-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>

        <h1 className="text-5xl font-bold my-4">Overview</h1>

        <div className="flex space-x-4">
          <div className="flex-initial w-[20%] bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Agent Details</h1>
            <ul>
              <li className="flow-root">
                <div className="float-left font-bold">
                  Account ID
                </div>
                <div className="float-right">
                  {agentDetails.accountId}
                </div>
              </li>
              <li className="flow-root">
                <div className="float-left font-bold">
                  Headquarters
                </div>
                <div className="float-right">
                  {agentDetails.headquarters}
                </div>
              </li>
              <li className="flow-root">
                <div className="float-left font-bold">
                  Credits
                </div>
                <div className="float-right">
                {agentDetails.credits?.toLocaleString(undefined, { maximumFractionDigits: 2 })} {/* toLocale breaks format if passed undefined value */}
                </div>
              </li>
              <li className="flow-root">
                <div className="float-left font-bold">
                  Starting Faction
                </div>
                <div className="float-right">
                  {agentDetails.startingFaction}
                </div>
              </li>
              <li className="flow-root">
                <div className="float-left font-bold">
                  Ship Count
                </div>
                <div className="float-right">
                  {agentDetails.shipCount}
                </div>
              </li>
            </ul>
          </div>

          <div className="flex-initial w-[20%] bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-1">Waypoint {startingLocation.symbol}</h1>
            <ul>
              <li className="flex justify-between">
                <div className="font-bold">
                  Type
                </div>
                {startingLocation.type}
              </li>
              <li className="flex justify-between">
                <div className="font-bold">
                  System
                </div>
                {startingLocation.systemSymbol}
              </li>
              <li className="flex justify-between">
                <div className="font-bold">
                  Faction
                </div>
                {startingLocation.faction?.symbol}
              </li>
              <li className="flex justify-between">
                <div className="font-bold">
                  Traits
                </div>
                <div>
                  <ul className="list-none p-0 m-0">
                    {startingLocation.traits?.map(trait =>
                    <li key={trait.symbol} className="flex justify-end w-full">
                      <Tooltip text={trait.description}>
                        {trait.name}
                      </Tooltip>
                    </li>)}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from 'next/image';
import loginIcon from "../../public/login-arrow.svg";
import { getAgentDetails, AgentDetails } from './lib/spacetraders';
import { redirect } from 'next/navigation';
import { useCookies } from 'next-client-cookies';

export default function Home() {
  const cookies = useCookies();

  console.log(cookies.get());

  async function handleLogin(data: FormData) {
    // Get the token from the form's data
    const token = data.get("token")?.toString() || "";

    const agentDetails = await getAgentDetails(token).catch(() => { return null; });
    
    if(agentDetails != null) {
        cookies.set("token", token, { secure: true, path: '/' });
        redirect('/dashboard');
    }
  }

  return (
    <main className="text-white px-10">
      <section className="h-screen flex flex-col">
        <section className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-extrabold">SpaceTraders Dashboard</h1>
          <h2 className="text-xl text-gray-400">Login to get started.</h2>
          <form className="mt-4" action={handleLogin}>
            <div className="relative">
              <input className="bg-gray-700 text-xl px-2 py-1 rounded-md" placeholder="API Token" type="text" name="token" required></input>
              <button className="absolute right-1.5 top-1 bg-cyan-600 hover:bg-cyan-700 transition ease-in-out text-lg px-1 py-0.5 rounded-md" type='submit'>
                <Image className='invert' src={loginIcon} alt="Login"/>
              </button>
            </div>
          </form>
        </section>
        <footer className="my-2">
          <h4 className="text-center">Developed by Mason Zettlemoyer</h4>
        </footer>
      </section>
    </main>
  );
}
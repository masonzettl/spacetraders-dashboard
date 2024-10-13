"use client";

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import loginIcon from "../../public/login-arrow.svg";
import { getAgent, Agent, registerAgent, RegisterResponse } from './lib/spacetraders';
import Modal from "./components/Modal";
import CodeBlock from "./components/CodeBlock";
import { useState } from 'react';

export default function Home() {
  const cookies = useCookies();

  async function handleLogin(data: FormData) {
    // Get the token from the form's data
    const token = data.get("token")?.toString() || "";

    const agentDetails = await getAgent(token).catch(() => { return null; });
    
    if(agentDetails != null) {
        cookies.set("token", token, { secure: true, path: '/' });
        redirect('/dashboard');
    }
  }

  async function register(data: FormData) {
    const agentSymbol = data.get("call-sign")?.toString() || "";
    const factionSymbol = "COSMIC";

    const registerResponse = await registerAgent({ symbol: agentSymbol, faction: factionSymbol }).catch(() => { return null; });
    if (registerResponse != null && 'token' in registerResponse) {
      setRegisteredToken(registerResponse.token);
    }

    setOpenRegister(false);
    setOpenRegisterConfirm(true);
  }

  const [openRegister, setOpenRegister] = useState(false);
  const [openRegisterConfirm, setOpenRegisterConfirm] = useState(false);
  const [registeredToken, setRegisteredToken] = useState("");

  return (
    <main className="text-white">
      <section className="h-screen flex flex-col">
        <section className="flex-1 flex flex-col justify-center items-center px-10">
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
          <a onClick={() => setOpenRegister(true)} className='cursor-pointer mt-1 text-gray-300 transition-colors hover:text-blue-400'>Register as a new agent</a>
        </section>

        <footer className="my-2">
          <h4 className="text-center">Developed by Mason Zettlemoyer</h4>
        </footer>

        <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
          <div className='max-w-100'>
            <h1 className='text-2xl font-bold'>Register</h1>
            <h3 className='text-md text-gray-200'>Enter a call sign to create a new agent.</h3>
            <form className='mt-2' action={register}>
              <h2 className='text-lg font-bold mb-2'>Call Sign</h2>
              <input type='text' className='bg-gray-600 text-md rounded-md block px-1 font-light' name='call-sign' required></input>
              <button className='bg-cyan-600 hover:bg-cyan-700 transition-colors text-lg font-bold px-3 py-1 rounded-md mt-8' type='submit'>Register</button>
            </form>
          </div>
        </Modal>

        <Modal open={openRegisterConfirm} onClose={() => setOpenRegisterConfirm(false)}>
          <div className='max-w-xl'>
            <h1 className='text-2xl font-bold'>Agent Registered</h1>
            <h3 className='text-md text-gray-200'>New agent has been registered with the following API key:</h3>
            <CodeBlock className='max-h-20' code={registeredToken} />
            <h3 className='text-md text-gray-200'>Store this key somewhere safe. <span className='text-red-400'>There will be no way of recovering this key.</span></h3>
          </div>
        </Modal>
      </section>
    </main>
  );
}
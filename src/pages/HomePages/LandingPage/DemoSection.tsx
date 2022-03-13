import React from 'react';

import changeDevnet from 'style/Assets/LandingPage/changeDevnet.png';
import solfaucet from 'style/Assets/LandingPage/solfaucet.png';

export default function DemoSection(): JSX.Element {
  return (
    <div>
      <div className=" max-w-max mx-auto">
        <h2
          className="text-center text-3xl leading-8 font-extrabold tracking-tight 
        text-primary sm:text-4xl">
          How to use this demo
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-secondary">
          This is platform is currently a demo, you will need to have your
          wallet on the Devnet Network and have Devnet Solana if you want to get
          a membership.
        </p>
      </div>
      <div className=" mt-8">
        <div className="">
          <img
            className="max-w-xl mx-auto"
            src={changeDevnet}
            alt="changeDevnet"
          />
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-secondary">
            Switch your wallet to Devnet.
          </p>
          <img
            className="max-w-xl mx-auto mt-5 rounded-lg"
            src={solfaucet}
            alt="solfaucet"
          />
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-secondary">
            Airdrop yourself Solana Devnet.
          </p>
          <div className="flex justify-center">
            <a
              href="https://solfaucet.com/"
              className="mt-1 max-w-3xl mx-auto text-center text-2xl text-link">
              https://solfaucet.com/
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

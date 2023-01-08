import React, { useEffect, useState } from 'react'
import NavButton from "./NavButton"
import * as ethers from 'ethers';
import { currency,contractAddress } from '../constants'
import { useAddress,
  useContract,
  useContractRead, 
  ChainId,
  useNetworkMismatch,
  useNetwork,
  useChainId
 } from '@thirdweb-dev/react'
import ConnectWallet from './ConnectWallet'


function Header() {
  const { contract } = useContract(contractAddress);
  const address = useAddress()
  const { data: winnings , isLoading} = useContractRead(contract, "getAddressBalance", address)
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network

  useEffect(() => {
    // Check if the user is connected to the wrong network
    if (isMismatched && switchNetwork) {
      // Prompt their wallet to switch networks
      switchNetwork(ChainId.BinanceSmartChainTestnet); // the chain you want here
    }
  }, [address]); // This above block gets run every time "address" changes (e.g. when the user connects)


  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
      <div className="flex items-center space-x-2">
        <img 
          className="h-20 w-22" 
          src="https://i.ibb.co/BL21qX9/logo.png"
          alt="" />
      
        <div>
          <h1 className="text-3xl text-white font-bold"> LotteryHub </h1>
          <p className="text-xs text-emerald-500 truncate">User: {address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)} </p>
          <p className="text-xs text-emerald-500 truncate">Winnings: {winnings === undefined ? 0 : ethers.utils.formatEther(winnings).toString()} {currency} </p>
        </div>
      </div>

      <div className='hidden md:flex md:col-span-3 items-center justify-center rounded-md'>
      </div>  
      <div className='flex flex-col ml-auto mr-5'>
        
      <ConnectWallet accentColor="#036756" colorMode="dark"  />
        
        <span className='md:hidden'>
          
        </span>
      </div>
    </header>
  )
}

export default Header
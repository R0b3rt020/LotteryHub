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
import DropDown from './DropDown';


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
      switchNetwork(ChainId.BinanceSmartChainMainnet); // the chain you want here
    }
  }, [address]); // This above block gets run every time "address" changes (e.g. when the user connects)


  return (
<header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5 w-full'>
  <div className="flex items-center space-x-2">
    <img 
      className="h-32 w-32" 
      src="https://i.ibb.co/BL21qX9/logo.png"
      alt="" />
  
    <div>
      <h1 className="text-3xl text-white font-bold"> LotteryHub </h1>
      <p className="text-xs text-emerald-500 truncate">User: {address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)} </p>
      <p className="text-xs text-emerald-500 truncate">Winnings: {winnings === undefined ? 0 : ethers.utils.formatEther(winnings).toString()} {currency} </p>
      <div className='mt-2'>
        <DropDown />
      </div>

    </div>
  </div>

  <div className='md:flex md:col-span-3 items-center justify-center rounded-md'>
  </div>  
  <div className='flex flex-col ml-auto mr-5'>
    
  <ConnectWallet accentColor="#036756" colorMode="dark" className="md:hidden" />

    <span className='md:hidden block'>
      
    </span>
  </div>
</header>
  )
}

export default Header
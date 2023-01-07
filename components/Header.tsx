import React, { useEffect, useState } from 'react'
import NavButton from "./NavButton"
import * as ethers from 'ethers';
import { currency, contractAddress } from '../constants'
import { useAddress, useContract, useContractRead, useDisconnect, useMetamask } from '@thirdweb-dev/react'


function Header() {
  const { contract } = useContract(contractAddress);
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const { data: winnings , isLoading} = useContractRead(contract, "getAddressBalance", address)
  const disconnect = useDisconnect()

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
      {!address && (
      <button onClick={connectWithMetamask} className='bg-white px-8 py-5 mt-2 rounded-lg shadow-lg font-bold'>
                Login with MetaMask
            </button>
        )}
        {address && (
                  <NavButton onClick={disconnect} title = 'Logout'/> 
        )}
        
        <span className='md:hidden'>
          
        </span>
      </div>
    </header>
  )
}

export default Header
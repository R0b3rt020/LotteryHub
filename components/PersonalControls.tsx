import React from 'react'
import { ethers } from 'ethers'
import { currency,contractAddress } from '../constants'
import { StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon } from "@heroicons/react/24/solid"
import { useContract, useContractWrite,useContractRead,useAddress } from '@thirdweb-dev/react'
import toast from 'react-hot-toast'

function AdminControls() {
    const { contract, isLoading, error } = useContract(contractAddress);
    const address = useAddress()
    const { data: winnings } = useContractRead(contract, "getAddressBalance", address)
    const { mutateAsync: getWinnings } = useContractWrite(contract, "getWinnings")

    

    const onWithdrawCommissions = async () =>{
        if(winnings <= 0 ){
            const notification = toast.error("No winnings to withdraw...");
            return () => {
              }
        }
        const notification = toast.loading("Withdrawing comissions...");
        
        try{
          
          const data = await getWinnings([{}]);
    
          toast.success("Commissions withdrawn sucessfully!",{
            id: notification,
          });
          console.info("Contract call sucess", data)
        }catch(err){
          toast.error("Whoops something went wrong!",{
            id:notification,
          });
          console.error("Contract call failure", err)
        }
    
    }


  return (
    <div className='text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border'>
        <p className='mb-5'>Total winnings to be withdrawn:  {winnings === undefined ? 0 : ethers.utils.formatEther(winnings).toString()} {currency}</p>
        <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            <button onClick={onWithdrawCommissions} className='admin-button'>
                <CurrencyDollarIcon className='h-6 mx-auto mb-2' />
                Withdraw winnings</button>
        </div>
    </div>

  )
}

export default AdminControls
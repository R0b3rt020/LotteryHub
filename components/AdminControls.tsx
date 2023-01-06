import React, { useState } from 'react'
import { ethers } from 'ethers'
import { currency } from '../constants'
import { StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon } from "@heroicons/react/24/solid"
import { useContract, useContractWrite,useContractRead, useAddress } from '@thirdweb-dev/react'
import toast from 'react-hot-toast'

function AdminControls() {
    const { contract, isLoading, error } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    const address = useAddress()
    const { data: HubOwnerFees } = useContractRead(contract, "HubOwnerFees", address)
    const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")

    const { mutateAsync: getHubOwnerComissions } = useContractWrite(contract, "getHubOwnerComissions")

    const [LotteryID, setLotteryID] = useState(0);


    const onDrawWinner = async () =>{
        const notification = toast.loading("Picking a lucky winner...");
    
        try{
          const data = await DrawWinnerTicket([ LotteryID ]);
    
          toast.success("A Winner has been selected!",{
            id: notification,
          });
          console.info("Contract call sucess", data)
        }catch(err){
          toast.error("Whoops something went wrong!",{
            id:notification,
          });
          console.error("Contract call failure", err)
        }
    
      };

    const onWithdrawCommissions = async () =>{
        const notification = toast.loading("Withdrawing comissions...");
    
        try{
          const data = await getHubOwnerComissions([{}]);
    
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
        <h2>Admin Controls</h2>
        <p className='mb-5'>Total comission to be withdrawn: {HubOwnerFees && ethers.utils.formatEther(HubOwnerFees.toString())} {" "} {currency}</p>
       
        <div className='items-center grid-cols-3 border-[#004337] border p-4'>
        <p className='text-left'>Lottery Id</p>
        <button onClick={() => setLotteryID(LotteryID-1)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
        <input
          className='form-input bg-transparent outline-none text-center'
          type="number"
          step="1"
          min='0'
          max='999999'
          placeholder='0'
          value={LotteryID}
          onChange={(e) => setLotteryID(Number(e.target.value))}
        />
        <button onClick={() => setLotteryID(LotteryID+1)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
        <button onClick={onDrawWinner} className='admin-button'>
                <StarIcon className='h-6 mx-auto mb-2' />

                Draw Winner</button>
        </div>
        <div className='mt-5 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            

            <button onClick={onWithdrawCommissions} className='admin-button'>
                <CurrencyDollarIcon className='h-6 mx-auto mb-2' />
                Withdraw commissions</button>
            
        </div>
    </div>
  )
}

export default AdminControls
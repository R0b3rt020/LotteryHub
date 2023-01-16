import {useContract, useContractWrite,useAddress,useNetwork,useNetworkMismatch,ChainId,ConnectWallet } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import * as ethers from 'ethers';
import { currency,contractAddress } from '../constants'
import toast from "react-hot-toast";
import NavButton from "./NavButton"




function BuyLottery() {
  const { contract, isLoading: contractLoading, error} = useContract(contractAddress);
  const { mutateAsync: newLottery } = useContractWrite(contract, "newLottery");
  const address = useAddress(); // Get connected wallet address
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const [CostPerLottery] = useState(50000000000000000);
  const [GasLimit] = useState(310000);
  const [pricePerTicket, setPricePerTicket] = useState(0.01);
  const [maxTickets, setMaxTickets] = useState(10);
  const [maxTicketsPerAddress, setMaxTicketsPerAddress] = useState(10);
  const [fees, setFees] = useState(1);
  const [duration, setDuration] = useState(0);
  const [durationDays, setDurationDays] = useState(1);
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);


  useEffect(() => {
    setDurationDays(1);
    setDurationHours(0);
    setDurationMinutes(0);
    setDuration((durationDays * 86400) + (durationHours * 3600) + (durationMinutes*60));
  }, []); 

  useEffect(() => {
    setDuration((durationDays * 86400) + (durationHours * 3600) + (durationMinutes*60));
  }, [durationDays,durationHours,durationMinutes]); 



const handleBuyLottery = async () => {

  if(!address){

    toast.error("Please connect your wallet first")
    return
  }
  if(isMismatched){
    toast.error("Please switch you wallet to BSC")
    return
  }

  const notification = toast.loading("Creating new lottery...");
  if (pricePerTicket > 0 && pricePerTicket > 0 && maxTickets > 0 && maxTicketsPerAddress > 0 && (durationDays > 0 || durationHours > 0 || durationMinutes > 0)) {
    
    contract?.interceptor.overrideNextTransaction(() => ({
      gasLimit: GasLimit,
    }));


    try {
      

      const data = await newLottery([
        fees.toString(), 
        ethers.utils.parseEther(pricePerTicket.toString()), 
        duration.toString(), 
        maxTickets.toString(),
        maxTicketsPerAddress.toString(),
        {
          value: CostPerLottery.toString(),
        },
      ]);
    
      console.info("contract call success", data);
      toast.success("New lottery created successfully!",{
        id: notification,
      });
    
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Error creating new lottery",{
        id: notification,
      });
    }
  } else {
    toast.error("There are fields that must be more than 0",{
      id: notification,
    });
  }
};


return (
<div className='text-white px-5 py-3 rounded-md border-emerald-300/20 border'>
  <div className="card m-3">
    <h1 className='text-5xl text-white font-semibold text-center mb-5'>New Lottery</h1>
    <h2 className='text-xl text-white font-semibold text-center mb-5'>Current cost: {ethers.utils.formatEther(CostPerLottery?.toString()).toString()} {currency}</h2>

    <div className="card-body">
      <div className='grid gap-4 grid-cols-2 bg-[#091B18] border-[#004337] border p-4'>
        
        <label className='form-label text-left border-[#004337] border p-4'>Price Per Ticket</label>

        <div className='items-center grid-cols-3 border-[#004337] border p-4'>
        <button onClick={() => setPricePerTicket(pricePerTicket-0.01)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
        <input
          className='form-input bg-transparent outline-none'
          type="number"
          step="0.01"
          min='0.001'
          max='10'
          placeholder='0.01'
          value={pricePerTicket}
          onChange={(e) => setPricePerTicket(Number(e.target.value))}
        />
        <button onClick={() => setPricePerTicket(pricePerTicket+0.01)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
        <label className='text-left'>{currency}</label>
        </div>
        
        <label className='form-label text-left border-[#004337] border p-4'>Number of max tickets</label>
        <div className='grid-cols-3 border-[#004337] border p-4 flex items-center'>
        <button onClick={() => setMaxTickets(maxTickets-5)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
        <input
          className='form-input bg-transparent outline-none'
          type="number"
          placeholder='10'
          min='2'
          max='9999999'
          value={maxTickets}
          onChange={(e) => setMaxTickets(Number(e.target.value))}
        />
        <button onClick={() => setMaxTickets(maxTickets+5)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
        </div>
        
        <label className='form-label text-left border-[#004337] border p-4'>Number of max tickets per address</label>
        <div className='grid-cols-3 border-[#004337] border p-4 flex items-center'>
        <button onClick={() => setMaxTicketsPerAddress(maxTicketsPerAddress-5)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
        <input
          className='form-input bg-transparent outline-none'
          type="number"
          placeholder='10'
          min='1'
          max='9999999'
          value={maxTicketsPerAddress}
          onChange={(e) => setMaxTicketsPerAddress(Number(e.target.value))}
        />
        <button onClick={() => setMaxTicketsPerAddress(maxTicketsPerAddress+5)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
        </div>


        <label className='form-label text-left border-[#004337] border p-4'>Fees (deducted from total pot)</label>

        <div className='grid-cols-2 border-[#004337] border p-4'>
        <button onClick={() => setFees(fees-1)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
          <input
            className='form-input bg-transparent outline-none '
            type="number"
            step="1"
            min='0'
            max='100'
            placeholder='1'
            value={fees}
            onChange={(e) => setFees(Number(e.target.value))}
          />
          <button onClick={() => setFees(fees+1)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
          <label className='text-right'>%</label>
        </div>

        <label className='form-label text-left border-[#004337] border p-4 flex items-center'>Duration</label>

        <div className='grid-cols-2 border-[#004337] border p-4'>
        <button onClick={() => setDurationDays(durationDays-1)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
        <input
          className='text-align-center form-input bg-transparent'
          type="number"
          placeholder='1'
          min='0'
          max='30'
          value={durationDays}
          onChange={(e) => setDurationDays(Number(e.target.value))}
        />
        
        <button onClick={() => setDurationDays(durationDays+1)} className='w-5 h-7 rounded top-0 right-0 ml-2 mr-2 mt-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
        <span className='input-group-text'>Days</span>
        
        <div className='my-4'>
        <hr className='w-full border-[#004337] border-solid border-2' />
        </div>
  
        <button onClick={() => setDurationHours(durationHours-1)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
        <input
          className='text-align-center form-input bg-transparent'
          type="number"
          placeholder='0'
          min='0'
          max='24'
          value={durationHours}
          onChange={(e) => setDurationHours(Number(e.target.value))}
        />
        <button onClick={() => setDurationHours(durationHours+1)} className='w-5 h-7 rounded top-0 right-0 ml-2 mr-2 mt-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
        <span className='input-group-text'>Hours</span>
        
        <div className='my-4'>
        <hr className='w-full border-[#004337] border-solid border-2' />
        </div>
        
        <button onClick={() => setDurationMinutes(durationMinutes-10)} className='w-5 h-7 rounded bottom-0 right-0 mr-2 mb-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>-</button>
        <input
          className='text-align-center form-input bg-transparent'
          type="number"
          placeholder='0'
          min='2'
          max='60'
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
        />
        <button onClick={() => setDurationMinutes(durationMinutes+10)} className='w-5 h-7 rounded top-0 right-0 ml-2 mr-2 mt-1 text-lg bg-[#036756] hover:bg-[#036756] text-white'>+</button>
        <span className='input-group-text'>Min.</span>
        </div>

      </div>

    </div>
  </div>
  <div className='flex justify-center '>
    <NavButton isActive onClick={handleBuyLottery} title='Buy Lottery'  /> 
  </div>

</div>

);}
export default BuyLottery;
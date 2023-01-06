import React from "react";
import {useEffect, useState} from "react";
import * as ethers from 'ethers';
import { useAddress, useContract, useContractWrite,useContractRead } from '@thirdweb-dev/react'
import Countdowntimer from '../components/CountdownTimer'
import { currency } from '../constants'
import toast from "react-hot-toast";
import NavButton from "./NavButton"

type Props = {
  tab: number;
};

const LotteryCards: React.FC<Props> = (props) => {
  const { tab } = props;
  const { contract, isLoading, error } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress()
  const { data: getAllLottery } = useContractRead(contract, "getAllLottery")
  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets")
  const { data: isHubOwner } = useContractRead(contract, "HubOwner")
  const [GasLimit] = useState(310000)
  const currentTime = new Date().getTime()/1000;


  useEffect(()=>{
    const fetchData = async () => {

      const data = await getAllLottery;
    }
    fetchData()

  }, []); 

  const handleBuyTickets = async (lotteryKey:Number,CostPerTicket:Number) => {
    const notification = toast.loading("Buying ticket...");
      contract?.interceptor.overrideNextTransaction(() => ({
        gasLimit: GasLimit,
      }));
      try { 
        const data = await BuyTickets([
          lotteryKey.toString(),
          {
            value: CostPerTicket.toString(),
          },
        ]);

        console.info("contract call success", data);
        toast.success("Ticket bought successfully!",{
          id: notification,
        });
      } catch (err) {
        console.error("contract call failure", err);
        toast.error("Error buying ticket",{
          id: notification,
        });
      }
    
  };
  
  const activeLotteries = getAllLottery?.filter((Lottery: { isActive: any; started: any; }) => Lottery.isActive && Lottery.started);
  const upcomingLotteries = getAllLottery?.filter((Lottery: { isActive: any; started: boolean; }) => Lottery.isActive && Lottery.started==false);
  const expiredLotteries = getAllLottery?.filter((Lottery: { isActive: boolean; }) => Lottery.isActive == false);

if(tab==1){
    if(activeLotteries?.length === 0){
        return(
        <div className="text-white">No active lotteries</div>
        )
    }
    else{
    return(
<div id="main" className="grid grid-cols-3 gap-1 justify-evenly">      

{activeLotteries?.map((lottery: { 
LotteryId: { toString: () => number }, 
Duration: { toString: () => number }, 
Fees: { toString: () => number }, 
CostPerTicket: { toString: () => number }, 
MaxTickets: { toString: () => number }, 
Tickets: number[] }) => (    

  <div className="w-full md:w-26/12">
    <div className="p-2">
      <div className="p-4 rounded-3xl bg-green-200">
          <div className="flex items-center justify-b">
            <h2 className='text-2xl'>Lottery #{lottery?.LotteryId.toString()}</h2>
          </div>
        <div className="text-center mb-4 mt-5">
          
        <h1 className="font-bold opacity-70">Current lottery pot {ethers.utils.formatEther((Number(lottery?.Tickets.length)* Number(lottery?.CostPerTicket)).toString()).toString()} {currency}</h1>
          <p className="text-xs opacity-70 mt-2">*Creator fees of {lottery?.Fees.toString()}% will be deducted from the final pot</p>
          <p className="text-xs opacity-70 mt-2">Max. winnings: {ethers.utils.formatEther((Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket)).toString()).toString()} - {lottery?.Fees.toString()}% = 
          {ethers.utils.formatEther((Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket) - ((Number(lottery?.Fees)/100) * Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket))).toString())} {currency}</p>
        </div>

          <Countdowntimer {...lottery?.LotteryId}/>

        <div>
          <p className="pt-4 text-sm font-bold m-0">Tickets left {(Number(lottery?.MaxTickets) - Number(lottery?.Tickets.length)).toString()} of {lottery?.MaxTickets.toString()}</p>
          <div className="w-full h-1 rounded-md overflow-hidden bg-white my-2 mx-0">
            <span className="block h-1 rounded-md bg-green-700" style={{ width: `${(Number(lottery?.Tickets.length)/Number(lottery?.MaxTickets) * 100)}%` }} />
          </div>
          <p className="text-right m-0 text-sm font-bold">{(Number(lottery?.Tickets.length)/Number(lottery?.MaxTickets) * 100).toFixed(0).toString()}%</p>
        </div>
        <div className="pt-4 grid grid-cols-2 gap-4">
          <div className="text-sm justify-start rounded-lg flex flex-grow-0 py-2 px-4 font-bold text-green-700">
              Ticket price: {ethers.utils.formatEther(lottery?.CostPerTicket.toString())} {currency}
            </div>
          <div className='flex justify-end flex-shrink-0'>
          {Number(currentTime) > Number(lottery?.Duration.toString()) ? <h2 className='text-base text-center animate-pulse'>
                                    Waiting for draw!
                                </h2> : <NavButton isActive onClick={() => handleBuyTickets(lottery?.LotteryId.toString(), lottery?.CostPerTicket.toString())} title='Buy ticket'  />}
          </div>
        </div>

      </div>
    </div>
  </div>      
  
))}
  </div>
    );
  }
}

  if(tab==2){
    if(upcomingLotteries?.length === 0){
      return(
      <div className="text-white">No upcoming lotteries</div>
      )
  }
  else{
    return(
      <div id="main" className="grid grid-cols-3 gap-1 justify-evenly">      

        {upcomingLotteries?.map((lottery: { 
        LotteryId: { toString: () => number }, 
        Duration: { toString: () => number }, 
        Fees: { toString: () => number }, 
        CostPerTicket: { toString: () => number }, 
        MaxTickets: { toString: () => number }, 
        Tickets: number[] }) => (    

          <div className="w-full md:w-26/12">
    <div className="p-2">
      <div className="p-4 rounded-3xl bg-green-200">
          <div className="flex items-center justify-b">
            <h2 className='text-2xl'>Lottery #{lottery?.LotteryId.toString()}</h2>
          </div>
        <div className="text-center mb-4 mt-5">
          
        <h1 className="font-bold opacity-70">Current lottery pot {ethers.utils.formatEther((Number(lottery?.Tickets.length)* Number(lottery?.CostPerTicket)).toString()).toString()} {currency}</h1>
          <p className="text-xs opacity-70 mt-2">*Creator fees of {lottery?.Fees.toString()}% will be deducted from the final pot</p>
          <p className="text-xs opacity-70 mt-2">Max. winnings: {ethers.utils.formatEther((Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket)).toString()).toString()} - {lottery?.Fees.toString()}% = 
          {ethers.utils.formatEther((Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket) - ((Number(lottery?.Fees)/100) * Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket))).toString())} {currency}</p>
        </div>
          <Countdowntimer {...lottery?.LotteryId}/>

        <div>
          <p className="pt-4 text-sm font-bold m-0">Tickets left {(Number(lottery?.MaxTickets) - Number(lottery?.Tickets.length)).toString()} of {lottery?.MaxTickets.toString()}</p>
          <div className="w-full h-1 rounded-md overflow-hidden bg-white my-2 mx-0">
            <span className="block h-1 rounded-md bg-green-700" style={{ width: `${(Number(lottery?.Tickets.length)/Number(lottery?.MaxTickets) * 100)}%` }} />
          </div>
          <p className="text-right m-0 text-sm font-bold">{(Number(lottery?.Tickets.length)/Number(lottery?.MaxTickets) * 100).toFixed(0).toString()}%</p>
        </div>
        <div className="pt-4 grid grid-cols-2 gap-4">
        <div className="text-sm justify-start rounded-lg flex flex-grow-0 py-2 px-4 font-bold text-green-700">
            Ticket price: {ethers.utils.formatEther(lottery?.CostPerTicket.toString())} {currency}
          </div>
          <div className='flex justify-end flex-shrink-0'>
          <NavButton isActive onClick={() => handleBuyTickets(lottery?.LotteryId.toString(), lottery?.CostPerTicket.toString())} title='Buy ticket'  />
             
          </div>
        </div>
      

      </div>
    </div>
  </div>        
          
        ))}
      </div>
    );
    }
  }

  if(tab==3){
    if(expiredLotteries?.length === 0){
        return(
        <div className="text-white">No expired lotteries</div>
        )
    }
    else{
    return(

<div id="main" className="grid grid-cols-3 gap-1 justify-evenly">      

{expiredLotteries?.map((lottery: { 
LotteryId: { toString: () => number }, 
Duration: { toString: () => number }, 
Fees: { toString: () => number }, 
CostPerTicket: { toString: () => number }, 
MaxTickets: { toString: () => number },
winner: { toString: () => String }, 
Tickets: number[] }) => (    

  <div className="w-full md:w-26/12">
    <div className="p-2">
      <div className="p-4 rounded-3xl bg-gray-300">
        <div className="flex items-center justify-b">
        <h2 className='text-2xl'>Lottery #{lottery?.LotteryId.toString()}</h2>
        </div>
        <div className="text-center mb-4 mt-5">
          
        <h1 className="font-bold opacity-70">Current lottery pot {ethers.utils.formatEther((Number(lottery?.Tickets.length)* Number(lottery?.CostPerTicket)).toString()).toString()} {currency}</h1>
          <p className="text-xs opacity-70 mt-2">*Creator fees of {lottery?.Fees.toString()}% will be deducted from the final pot</p>
          <p className="text-xs opacity-70 mt-2">Max. winnings: {ethers.utils.formatEther((Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket)).toString()).toString()} - {lottery?.Fees.toString()}% = 
          {ethers.utils.formatEther((Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket) - ((Number(lottery?.Fees)/100) * Number(lottery?.MaxTickets)*Number(lottery?.CostPerTicket))).toString())} {currency}</p>
        </div>
        
        <h2 className='text-2xl text-center'>Winner {lottery?.winner.toString().substring(0,5)}...{lottery?.winner.toString().substring(lottery?.winner.toString().length, lottery?.winner.toString().length - 5)}</h2>
        <h3 className="text-center">Amount won: &nbsp;{ethers.utils.formatEther((Number(lottery?.Tickets.length)*Number(lottery?.CostPerTicket) - ((Number(lottery?.Fees)/100) * Number(lottery?.Tickets.length)*Number(lottery?.CostPerTicket))).toString())} {currency}
           </h3>
        <div>
          <p className="pt-4 text-sm font-bold m-0">Tickets sold {(Number(lottery?.MaxTickets) - Number(lottery?.Tickets.length)).toString()} of {lottery?.MaxTickets.toString()}</p>
          <div className="w-full h-1 rounded-md overflow-hidden bg-white my-2 mx-0">
            <span className="block h-1 rounded-md bg-green-700" style={{ width: `${(Number(lottery?.Tickets.length)/Number(lottery?.MaxTickets) * 100)}%` }} />
          </div>
          <p className="text-right m-0 text-sm font-bold">{(Number(lottery?.Tickets.length)/Number(lottery?.MaxTickets) * 100).toFixed(0).toString()}%</p>
        </div>



          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="text-sm justify-start rounded-lg flex flex-grow-0 py-2 px-4 font-bold text-green-700">
                Ticket price: {ethers.utils.formatEther(lottery?.CostPerTicket.toString())} {currency}
            </div>
          </div>



      </div>
    </div>
  </div>        
  ))}
  </div>
  );
  }
}

    else{
      return(
      <div></div>
      )
    }
    <div></div>
};

export default LotteryCards;
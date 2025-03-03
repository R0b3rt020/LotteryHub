import React from 'react'
import {useContract, useContractRead } from '@thirdweb-dev/react'
import Countdown from 'react-countdown';
import {contractAddress} from '../constants'

type Props = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};

function convertSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    console.log("days", days);
    return {
      seconds: seconds % 60,
      minutes: minutes % 60,
      hours: hours % 24,
      days
    };
  }


function Countdowntimer(number:any) {
    const { contract } = useContract(contractAddress);
    const { data: LotteryById, isLoading: isLoadingExpiration  } = useContractRead(contract, "getLotteryById", number)
    
    console.log("lottery Counter", LotteryById)

    const renderer = ({ days, hours, minutes, seconds, completed }: Props) => {

        if(!LotteryById?.started){
            const time = convertSeconds(LotteryById?.Duration.toString());

            return (
                <div>
                    <h2 className='text-xl text-center animate-bounce'>Waiting for participants! </h2>
                    <div className='flex space-x-1'>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{time.days}</div>
                            <div className='countdown-label'>days</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{time.hours}</div>
                            <div className='countdown-label'>hours</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{time.minutes}</div>
                            <div className='countdown-label'>minutes</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{time.seconds}</div>
                            <div className='countdown-label'>seconds</div>
                        </div>
                    </div>
                </div>
            )
        }

        if(completed){
            return(
                <div>
                <h2 className='text-xl text-center animate-bounce'>
                    Ticket sales are now CLOSED for this draw!
                </h2>
                <div className='flex space-x-1'>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{days}</div>
                            <div className='countdown-label'>days</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{hours}</div>
                            <div className='countdown-label'>hours</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{minutes}</div>
                            <div className='countdown-label'>minutes</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{seconds}</div>
                            <div className='countdown-label'>seconds</div>
                        </div>

                    </div>

            </div>
            );
        }
        else {
            return (
                <div>
                    <h3 className='text-sm mb-2 italic'>Time Remaining </h3>
                    <div className='flex space-x-1'>
                    <div className='flex-1'>
                            <div className='countdown animate-pulse'>{days}</div>
                            <div className='countdown-label'>days</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{hours}</div>
                            <div className='countdown-label'>hours</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{minutes}</div>
                            <div className='countdown-label'>minutes</div>
                        </div>
                        <div className='flex-1'>
                            <div className='countdown animate-pulse'>{seconds}</div>
                            <div className='countdown-label'>seconds</div>
                        </div>
                    </div>
                </div>
            )
            
        }
    }
  return (
    <div>
        
        <Countdown date={new Date (Number(LotteryById?.Duration) * 1000) } renderer={renderer}/>
    </div>
  );
}

export default Countdowntimer
import React from "react";
import BuyLottery from './BuyLottery'
import LotteryCards from './LotteryCards'
import { useEffect, useState } from 'react'
import { useAddress, useContract, useContractWrite,useContractRead } from '@thirdweb-dev/react'
import {contractAddress} from '../constants'

const SubTabs = () => {
  const { contract, isLoading, error } = useContract(contractAddress);
  const { data: getAllLottery } = useContractRead(contract, "getAllLottery")
  const [openTab, setOpenTab] = React.useState(1);
  const [tab, setTab] = useState<number>(1);

  useEffect(()=>{
    const fetchData = async () => {

      const data = await getAllLottery;
    }
    fetchData()

  }, []); 
  const activeLotteries = getAllLottery?.filter((Lottery: { isActive: any; started: any; }) => Lottery.isActive && Lottery.started).length;
  const upcomingLotteries = getAllLottery?.filter((Lottery: { isActive: any; started: boolean; }) => Lottery.isActive && Lottery.started==false).length;
  const expiredLotteries = getAllLottery?.filter((Lottery: { isActive: boolean; }) => Lottery.isActive == false).length;


  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-[#036756]"
                    : "text-[#036756] bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                  setTab(1);
                }}
                data-toggle="tab"
                href="active"
                role="tablist"
              >
                Active ({activeLotteries})
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-[#036756]"
                    : "text-[#036756] bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                  setTab(2);
                }}
                data-toggle="tab"
                href="upcoming"
                role="tablist"
              >
                Upcoming ({upcomingLotteries})
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-[#036756]"
                    : "text-[#036756] bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                  setTab(3);
                }}
                data-toggle="tab"
                href="expired"
                role="tablist"
              >
                Expired ({expiredLotteries})
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <LotteryCards tab={tab}/>
                </div>
                <div className={openTab === 2 ? "block" : "hidden" } id="link2">
                <LotteryCards tab={tab}/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <LotteryCards tab={tab}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubTabs;
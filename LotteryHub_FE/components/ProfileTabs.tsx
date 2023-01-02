import React, { useState } from "react";
import BuyLottery from './BuyLottery'
import SubTabs from './SubTabs'
import AdminControls from "./AdminControls";
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
import PersonalControls from "./PersonalControls";
import LotteryCardsPersonal from "./LotteryCardsPersonal";


const ProfileTabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const { contract, isLoading, error } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress()
  const { data: isHubOwner } = useContractRead(contract, "HubOwner")
  const [tab, setTab] = useState<number>(1);

  return (
    <>
      <div className="flex flex-wrap ">

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
                href="lotteries"
                role="tablist"
              >
                Profile
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
                href="createlottery"
                role="tablist"
              >
                Entered lotteries
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
                href="profile"
                role="tablist"
              >
                Created Lotteries
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                {isHubOwner === address && (
                  <div className='flex justify-center'>
                    
                    <AdminControls />
                    
                  </div>
                )}
                <div className="mr-64 ml-64 mt-10">
                <PersonalControls />
                </div>
                
                </div>
                <div className={openTab === 2 ? "block" : "hidden" } id="link2">
                  <LotteryCardsPersonal tab={tab}/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <LotteryCardsPersonal tab={tab}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTabs;
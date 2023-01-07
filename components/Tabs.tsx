import React from "react";
import BuyLottery from './BuyLottery'
import SubTabs from './SubTabs'
import AdminControls from "./AdminControls";
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
import PersonalControls from "./PersonalControls";
import ProfileTabs from "./ProfileTabs";
import { contractAddress } from '../constants'


const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const { contract, isLoading, error } = useContract(contractAddress);
  const address = useAddress()
  const { data: isHubOwner } = useContractRead(contract, "HubOwner")


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
                }}
                data-toggle="tab"
                href="lotteries"
                role="tablist"
              >
                Lotteries
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
                }}
                data-toggle="tab"
                href="createlottery"
                role="tablist"
              >
                Create New Lottery
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
                }}
                data-toggle="tab"
                href="profile"
                role="tablist"
              >
                Profile
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <SubTabs />
                </div>
                <div className={openTab === 2 ? "block" : "hidden" } id="link2">
                  <div className="lg:mr-32 lg:ml-32">
                  <BuyLottery />
                  </div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <ProfileTabs />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
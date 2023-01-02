import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Login from '../components/Login'
import Loading from '../components/Loading'
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react'
import AdminControls from '../components/AdminControls'
import {StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon} from "@heroicons/react/24/solid"
import Tabs from '../components/Tabs'


const Home: NextPage = () => {
  const { contract, isLoading, error } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress()
  const { data: getAllLottery } = useContractRead(contract, "getAllLottery")
  const { data: isHubOwner } = useContractRead(contract, "HubOwner")

  useEffect(()=>{
    const fetchData = async () => {

      const data = await getAllLottery;
    }
    fetchData()

  }, []);  


  if(isLoading) return <Loading />;

  if(!address) return <Login />;
  console.log("array: ", getAllLottery)
  
  return (
    <div className="bg-[#091B18] min-h-screen ">
      <Head>
        <title>LotteryHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
     <Header />
     
      
      <Tabs />

        </div>
    )}


export default Home

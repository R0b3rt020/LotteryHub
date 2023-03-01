import { useAddress,
  useContract,
  useContractRead,
  ChainId,
  useNetworkMismatch,
  useNetwork,
  useChainId, } from '@thirdweb-dev/react'
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
import Footer from '../components/Footer'
import { contractAddress } from '../constants'


const Home: NextPage = () => {
  const { contract, isLoading, error } = useContract(contractAddress);
  const address = useAddress()
  const { data: getAllLottery } = useContractRead(contract, "getAllLottery")
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network

  useEffect(()=>{
    const fetchData = async () => {

      const data = await getAllLottery;
    }
    fetchData()

  }, []);  


  if(isLoading) return <Loading />;

  return (

    <div className="bg-[#091B18] min-h-screen ">

<div className="flex bg-yellow-100 rounded-lg p-4 mb-4">
  <svg className="w-5 h-5 text-yellow-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <p className="ml-3 text-sm text-yellow-700">
    <span className="font-medium">Important Note!</span> This app is running on PulsechainTestnetV2b, there might be some performance issues or incorrect information.
  </p>
</div>


      <Head>
        <title>LotteryHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Header />
          
      <Tabs />
      <Footer />
        </div>

    )}


export default Home

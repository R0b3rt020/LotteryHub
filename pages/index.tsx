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

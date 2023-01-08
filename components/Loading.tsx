import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'

function Loading() {
  return (
    <div className="bg-[#091B18] h-screen flex flex-col items-center justify-center">
    <div className="flex item-center space-x-2 mb-10">
      

      <h1 className='text-lg text-white font-bold '>Loading LotteryHub</h1>
    </div>
    <PropagateLoader color="white" size={25}/>
  </div>
  )
}

export default Loading
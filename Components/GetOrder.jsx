import React, { useState } from 'react'
import { Str1 } from '.';

const GetOrder = ({ getModal, setGetModal, getOrder }) => {
  const [index, setIndex] = useState(0);
  const [singleOrderData, setSingleOrderData] = useState();
  const getOrderData = async () => {
    const getData = await getOrder(index);
    setSingleOrderData(getData);
    console.log(getData);
  }
  console.log(setSingleOrderData)
  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(newTime);
    return dataTime
  }
  return getModal ? (
    
    <div className=' fixed inset-0 z-10 overflow-y-auto'>
      <div className=' fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => setGetModal(false)}
      ></div>
      <div className='flex items-center  min-h-screen px-4 py-8'>
        <div className=' relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='flex justify-end'>
            <button className=' p2 text-gray-400 rounded-md hover:bg-gray-100'
              onClick={() => setGetModal(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className=' max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className=' text-lg font-medium text-gray-800'>
              Medicine Tracing Details
            </h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='relative mt-3'>
                <input
                  type='number'
                  placeholder='Id'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border
                focus:border-indigo-600 shadow-sm rounded-lg'
                  onChange={(e) => setIndex(e.target.value)}
                >
                </input>
              </div>

              <button
                onClick={() => getOrderData()}
                className='block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white
              bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2'
              >
                Get Details
              </button>
            </form>
            {singleOrderData == undefined ? (
              ""
            ) : (
              <div className=' text-left '>
                <p> Sender: {singleOrderData.sender.slice(0, 25)}...</p>
                <p> Receiver: {singleOrderData.receiver.slice(0, 25)}...</p>
                <p> PickupTime: {converTime(singleOrderData.pickupTime)}</p>
                <p> DeliveryTime: {converTime(singleOrderData.deliveryTime)}</p>
                <p> Distance: {singleOrderData.distance}</p>
                <p> Price: {singleOrderData.price}</p>
                <p> Status: {singleOrderData.status}</p>
                <p>
                 Sold: {singleOrderData.isSold ? "Sold" : "Not Sold"}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>

  ) : (
    ""
  )
}

export default GetOrder
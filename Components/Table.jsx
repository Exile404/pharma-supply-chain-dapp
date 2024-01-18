import React from 'react'

const Table = ({
  setCreateOrderModel,
  allOrdersData

}) => {
  const converTime =(time) =>{
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US",{
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(newTime);
    return dataTime
  };
  console.log(allOrdersData)
  return (
    <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
      <div className='items-start justify-between md:flex'>
        <div className='max-w-lg'>
          <h3 className='text-gray-800 text-xl font-bold sm:text-2xl'>
              Create Tracking
          </h3>
          <p className='text-gray-600 mt-2'>
            Hi there
          </p>
        </div>
        <div className='mt-3 md:mt-0'>
          <p
          onClick={()=> setCreateOrderModel(true)} 
          href=""
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 
          active:bg-gray-900 md:text-sm rounded-lg md:inline-flex cursor-pointer"
          >
              Add Tracking
          </p>
        </div>
      </div>
      <div className='mt-12 shadow-sm border rounded-lg oveflow-x-auto'>
        <table className='w-full table-auto text-sm text-left'>
          <thead className='bg-gray-50 text-gray-600 font-medium border-b text-center'>
            <tr>
              <th className='py-3 px-6'>Sender</th>
              <th className='py-3 px-6'>Receiver</th>
              <th className='py-3 px-6'>Pickup Time</th>
              <th className='py-3 px-6'>Distance</th>
              <th className='py-3 px-6'>Price</th>
              <th className='py-3 px-6'>Deliverty Time</th>
              <th className='py-3 px-6'>Sold</th>
              <th className='py-3 px-6'>Status</th>
            </tr>
          </thead>
        <tbody className='text-gray-600 divide-y text-center'>
          {allOrdersData?.map((order,idx)=>(
            <tr key={idx}>
              <td className='px-6 py-4 whitespace-nowrap'>
                {order.sender.slice(0,15)}...
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {order.receiver.slice(0,15)}...
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {converTime(order.pickupTime)}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {order.distance} km
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {order.price}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                { order.deliveryTime}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                { order.isSold? "Sold":"Not Sold"}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                { order.status ==0 ? "Pending" : order.status ==1 ? "On The Way": "Sold"}
              </td>
            </tr>
          ))
          }
        </tbody>
        </table>

      </div>
    </div>
  )
}

export default Table
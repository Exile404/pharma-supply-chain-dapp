import React from 'react'

import Image from 'next/image';


const Services = ({
  setOpenProfile,
  setCompleteModal,
  setGetModal,
  setStartModal,
  }) => {
  const team = [
    {
      name: "Complete Order",
    },
    {
      name: "Get Order",
    },
    {
      name: "Start Order",
    },
    {
      name: "User Profile",
    },
    {
      name: "Order Count",
    },
    {
      name: "Send Order",
    },

  ]

  const openModelBox = (text) => {
    if(text === 1){
      setCompleteModal(true);
    }else if(text===2){
      setGetModal(true);
    }else if(text===3){
      setStartModal(true);
    }else if(text===4){
      setOpenProfile(true);
    }
  };


  return (
    <section className='py-0 pb-14'>
      <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
        <div className='mt-12'>
          <ul className='grid gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {team.map((item,i)=> (
              <li key={i}>
                <div
                onClick={()=> openModelBox(i+1)}
                className='w-full  h-60 sm:h-52 md:h-56 cursor-pointer'
                >
                  <div className="block h-48 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                  <h5 className="mb-2 mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-white justify-center text-center">{item.name}</h5>
                 
                  </div>
                </div>
              </li>
            ))}

          </ul>
        </div>

      </div>
    </section>
  )
}

export default Services
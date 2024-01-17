import React, {useState, useEffect, useContext} from 'react';

import { 
  Table, 
  Form, 
  Services, 
  Profile, 
  CompleteOrder, 
  GetOrder, 
  StartOrder } from '@/Components';

import { TrackingContext } from '@/Context/Tracking';

const index = () => {

  const {
    currentUser,
    createOrder,
    getAllOrder,
    completeOrder,
    getOrder,
    startOrder,
    getOrdersCount
  } = useContext(TrackingContext);

  const [createOrderModel, setCreateOrderModel] =  useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  //DATA STATE
  const [allOrdersData, setAllOrdersData] = useState();

  useEffect(()=> {
    const getCampaignData = getAllOrder();

    return async () => {
      const allData = await getCampaignData;
      setAllOrdersData(allData);
    };
  },[])
 
  return (
    <>
    <Services
    setOpenProfile = {setOpenProfile}
    setCompleteModal = {setCompleteModal}
    setGetModal = {setGetModal}
    setStartModal = {setStartModal}
    />
    <Table 
    setCreateOrderModel = {setCreateOrderModel}
    allOrdersData = {allOrdersData}
    />
    <Form 
    createOrderModel = {createOrderModel}
    createOrder = {createOrder}
    setCreateOrderModel = {setCreateOrderModel}
    />
    <Profile 
    openProfile = {openProfile}
    setOpenProfile = {setOpenProfile}
    currentUser = {currentUser}
    getOrdersCount = {getOrdersCount}    
    />
    <CompleteOrder 
    completeModal = {completeModal}
    setCompleteModal = {setCompleteModal}
    completeOrder = {completeOrder}
    />
    <GetOrder 
    getModal = {getModal}
    setGetModal = {setGetModal}
    getOrder = {getOrder}
    />

    <StartOrder
    startModal = {startModal}
    setStartModal = {setStartModal}
    startOrder = {startOrder}
    />

    
    </>
  )
}

export default index;
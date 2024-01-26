import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import tracking from "./Tracking.json";

const ContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ContractABI = tracking.abi;

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {

    const DappName = "Medicine Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const createOrder = async (items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price } = items;

        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createOrder(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                }
            );
            await createItem.wait();
            console.log(createItem);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }


    const getAllOrder = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const orders = await contract.getAllTransactions();
            const allOrders = orders.map((order) => ({
                sender: order.sender,
                receiver: order.receiver,
                price: ethers.utils.formatEther(order.price.toString()),
                pickupTime: order.pickupTime.toNumber(),
                deliveryTime: order.deliveryTime.toNumber(),
                distance: order.distance.toNumber(),
                isSold: order.isSold,
                status: order.status,
            }));

            return allOrders;

        } catch (error) {
            console.log("error want, getting order");
        }
    }

    const getOrdersCount = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const ordersCount = await contract.getOrdersCount(accounts[0]);
            return ordersCount.toNumber();


        } catch (error) {
            console.log("error in getting order");
        }
    };

    const completeOrder = async (completOrd) => {
        console.log(completOrd);
        const { receiver, index } = completOrd;
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const transaction = await contract.completeOrder(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 300000,
                }
            );
            transaction.wait()
            console.log(transaction)

        } catch (error) {
            console.log("wrong complete order", error);
        }
    }

    const getOrder = async (index) => {
        console.log(index * 1);
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const order = await contract.getOrder(accounts[0], index * 1);


            const singleOrder = {
                sender: order[0],
                receiver: order[1],
                pickupTime: order[2].toNumber(),
                deliveryTime: order[3].toNumber(),
                distance: order[4].toNumber(),
                price: ethers.utils.formatEther(order[5].toString()),
                status: order[6],
                isSold: order[7],
            };
            return singleOrder;

        } catch (error) {

        }
    }

    const startOrder = async (getMedicine) => {
        const { receiver, index } = getMedicine;
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const order = await contract.startOrder(
                accounts[0],
                receiver,
                index * 1
            )

            order.wait();
            console.log(order)

        } catch (error) {
            console.log("Sorry No shopment", error);
        }
    }

    // CHECK A WALLET CONNECTED

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentUser(accounts[0]);
            }
            else {
                return "No account"
            }
        } catch (error) {
            return "Not connected"
        }
    }

    // CONNECT WALLET FUNCTION

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentUser(accounts[0])
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createOrder,
                getAllOrder,
                completeOrder,
                getOrder,
                startOrder,
                getOrdersCount,
                DappName,
                currentUser,
            }}
        >
            {children}

        </TrackingContext.Provider>
    );
}
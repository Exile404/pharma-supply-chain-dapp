// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tracking {
    enum DeliveryStatus { PENDING, IN_TRANSIT, SOLD }

    struct Order {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        DeliveryStatus status;
        bool isSold;
    }
    mapping (address => Order[]) public orders;
    uint256 public ordersCount;

    struct TypeOrder{
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        DeliveryStatus status;
        bool isSold;
    }
    TypeOrder[] typeorders;

    event OrderCreated(address indexed sender, address indexed receiver, uint256 pickupTime,
    uint256 distance, uint256 price);
    event OrderInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event OrderDelivered(address indexed sender, address indexed receiver, uint256 pickupTime);
    event OrderPaid(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 amount);

    constructor(){

        ordersCount = 0;
    }

    function createOrder(address _receiver, uint256 _pickupTIme, uint256 _distance, uint256 _price) public payable{
        require(msg.value == _price, "Payment amount must match the price.");

        Order memory order = Order(msg.sender, _receiver, _pickupTIme, 0, _distance, _price, DeliveryStatus.PENDING, false);
        orders[msg.sender].push(order);
        ordersCount++;
        typeorders.push(
            TypeOrder(
                msg.sender,
                _receiver,
                _pickupTIme,
                0,
                _distance,
                _price,
                DeliveryStatus.PENDING,
                false
            )
        );
        emit OrderCreated(msg.sender,_receiver,_pickupTIme, _distance, _price);
    }
    function startShipment(address _sender, address _receiver, uint256 _index) public{
        Order storage order = orders[_sender][_index];
        TypeOrder storage typeorders = typeorders[_index];
        
        require(order.receiver == _receiver, "Invalid Receiver.");
        require(order.status == DeliveryStatus.PENDING, "Medicine already on the way.");
        order.status = DeliveryStatus.IN_TRANSIT;
        typeorders.status = DeliveryStatus.IN_TRANSIT;
        emit OrderInTransit(_sender, _receiver, order.pickupTime)
    }

}